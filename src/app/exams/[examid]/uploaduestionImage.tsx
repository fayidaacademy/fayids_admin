"use client";
import { apiUrl } from "@/api_config";
import React, { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { getAccessToken } from "@/lib/tokenManager";

export default function UploadQuestionImage(params: any) {
  const QuestionId = params.questionId;
  const accessToken = getAccessToken();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Automatically submit when file is selected
      handleSubmit(file);
    }
  };

  const handleSubmit = async (file: File) => {
    if (!file) {
      toast({
        title: "Error!",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append(QuestionId, file);

      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      // Handle completion
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          toast({
            title: "Success!",
            description: "Question image uploaded successfully",
          });
          setSelectedFile(null);
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          // Refresh the page to show the new image
          window.location.reload();
        } else {
          const errorData = JSON.parse(xhr.responseText || "{}");
          console.error("Upload failed:", errorData);
          toast({
            title: "Upload Failed!",
            description: errorData.message || `Server error: ${xhr.status}`,
            variant: "destructive",
          });
        }
        setUploading(false);
        setUploadProgress(0);
      };

      // Handle errors
      xhr.onerror = () => {
        console.error("Network error during upload");
        toast({
          title: "Upload Failed!",
          description: "Network error. Please check your connection.",
          variant: "destructive",
        });
        setUploading(false);
        setUploadProgress(0);
      };

      // Send request
      xhr.open(
        "POST",
        `${apiUrl}/questionimageupload/upload_question_image/${QuestionId}`
      );
      
      // Add auth header if available
      if (accessToken) {
        xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
      }
      
      xhr.send(formData);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error!",
        description: "Failed to upload image",
        variant: "destructive",
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {uploading && (
        <div className="mb-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Uploading...</span>
            <span className="text-primaryColor font-semibold">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        id={`question-img-${QuestionId}`}
        name={QuestionId}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <button
        type="button"
        onClick={triggerFileInput}
        disabled={uploading}
        className="w-full px-4 py-2.5 bg-primaryColor hover:bg-primaryColor/90 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {uploading ? "Uploading..." : "Upload Question Image"}
      </button>
    </div>
  );
}
