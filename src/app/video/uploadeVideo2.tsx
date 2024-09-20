"use client";
import { apiUrl } from "@/api_config";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

export default function UploadVideo(params: any) {
  const VideoId = params.videoId;
  console.log("VideoId: " + VideoId);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setUploading(true);
    setUploadError(null);

    const formData = new FormData(event.target);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${apiUrl}/videos/upload_video/${VideoId}`, true);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setUploadProgress(percent);
        console.log(`Upload Progress: ${percent}%`);
      }
    };

    // Handle response
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log("Upload response:", data);
        toast({
          title: "Success!",
          description: "File Uploaded",
        });
        setUploadProgress(0); // Reset progress after upload
      } else {
        setUploadError(`Upload failed with status: ${xhr.status}`);
        console.error("Upload error:", xhr.statusText);
      }
    };

    // Handle errors
    xhr.onerror = () => {
      setUploading(false);
      setUploadError("Upload failed. Please try again.");
      console.error("Upload error:", xhr.statusText);
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
