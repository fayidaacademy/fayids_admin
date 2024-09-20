"use client";
import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

export default function UploadVideo(params: { videoId: string }) {
  const VideoId = params.videoId;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
    xhr.open("POST", `${apiUrl}/videos/upload_video/${VideoId}`, true);

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
    <div>
      <div>
        {uploading && (
          <div className="my-4">
            <h1 className="text-lg font-bold">Uploading In Progress...</h1>
            <Progress value={uploadProgress} max={100} />
            <p>{uploadProgress.toFixed(2)}%</p> {/* Display numeric progress */}
          </div>
        )}
        {uploadError && <p className="text-red-500">{uploadError}</p>}
      </div>
      <form
        method="POST"
        id="myForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="course_video"
          className="px-3 bg-yellow-300 cursor-pointer"
        >
          <span className="text-blue-900 font-semibold">Upload Video</span>
        </label>
        <input
          type="file"
          className="hidden"
          id="course_video"
          name="course_video"
          required
        />
        <input
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 cursor-pointer"
          value="Upload"
        />
      </form>
    </div>
  );
}
