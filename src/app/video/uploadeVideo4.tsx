"use client";
import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

export default function UploadVideo({ videoId, onSuccess }: { videoId: string; onSuccess?: (videoId?: string) => void }) {
  const VideoId = videoId;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      toast({
        title: "File Added",
        description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setUploadError(null);
    const formData = new FormData(event.target as HTMLFormElement);
    const file = (event.target as HTMLFormElement).course_video.files[0];

    if (!file) {
      setUploadError("No file selected.");
      setUploading(false);
      return;
    }

    const xhr = new XMLHttpRequest();
    const uploadUrl = VideoId ? `${apiUrl}/videos/upload_video/${VideoId}` : `${apiUrl}/videos/upload_video/new`;
    xhr.open("POST", uploadUrl, true);

    // Handle response
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        toast({
          title: "Success!",
          description: "File Uploaded",
        });
        setUploadProgress(100); // Set to 100% on success
        onSuccess?.(data.videoId || data.id); // Call the success callback with the video ID
      } else {
        setUploadError(`Upload failed with status: ${xhr.status}`);
        console.error("Upload error:", xhr.statusText);
      }
    };

    // Handle errors
    xhr.onerror = () => {
      setUploading(false);
      setUploadError("Upload failed. Please try again.");
    };

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        let progress = Math.round((event.loaded / event.total) * 100);

        // Simulate a slowing down effect around 86%
        if (progress >= 86 && progress < 100) {
          progress = 86 + (progress - 86) * 0.2; // Slow down between 86% and 100%
        }

        setUploadProgress(progress);

        // If progress is near 100%, delay the last bit
        if (progress >= 100) {
          setTimeout(() => setUploadProgress(100), 500); // Smooth finish to 100%
        }
      }
    };

    // Send the request
    xhr.send(formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-8">
        <div className="space-y-6">
          {uploading && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <h1 className="text-xl font-bold text-gray-900">Uploading Video...</h1>
              </div>
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-3" />
                <p className="text-sm text-gray-600 text-center font-medium">{uploadProgress.toFixed(1)}% Complete</p>
              </div>
            </div>
          )}
          
          {uploadError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-red-700 font-medium">{uploadError}</p>
              </div>
            </div>
          )}

          <form
            method="POST"
            id="myForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-3">
              <label
                htmlFor="course_video"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                      Click to upload video
                    </p>
                    <p className="text-sm text-gray-500">
                      MP4, MOV, AVI up to 500MB
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="course_video"
                  name="course_video"
                  required
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
              
              {selectedFile && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">File Added</p>
                      <p className="text-green-600 text-sm">{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span>Upload Video</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
