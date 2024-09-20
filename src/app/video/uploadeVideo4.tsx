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
  const [progressInterval, setProgressInterval] = useState<number | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setUploadError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${apiUrl}/videos/upload_video/${VideoId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      // Start polling for progress
      const interval = setInterval(async () => {
        try {
          const progressResponse = await fetch(
            `${apiUrl}/videos/progressvalue`
          );
          const data = await progressResponse.json();
          setUploadProgress(data.progress); // Update the progress from the server
          console.log(`Fetched Progress: ${data.progress}%`);
          if (data.progress >= 100) {
            clearInterval(interval); // Stop polling if 100%
          }
        } catch (err) {
          console.error("Error fetching progress:", err);
        }
      }, 2000); // Fetch progress every 2 seconds

      setProgressInterval(interval as unknown as number); // Type assertion for compatibility

      const data = await response.json();
      console.log("Upload response:", data);
      toast({
        title: "Success!",
        description: "File Uploaded",
      });
    } catch (error) {
      console.error("Upload error:", error);
      //  setUploadError(error.message); // Set error message for display
    } finally {
      setUploading(false);
      if (progressInterval) clearInterval(progressInterval); // Clear the interval on complete
    }
  };

  useEffect(() => {
    // Clean up the interval on unmount
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [progressInterval]);

  return (
    <div>
      <div>
        {uploading && (
          <div className="my-4">
            <h1 className="text-lg font-bold">Uploading In Progress...</h1>
            <Progress value={uploadProgress} max={100} />
            <p>{uploadProgress}%</p> {/* Display numeric progress */}
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
