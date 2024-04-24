import { apiUrl } from "@/api_config";
import React from "react";
import UploadPackageThumbnail from "../[packageId]/uploadPackackeThumbnail";

export default function Package_thumbnail_image_manage({
  ThumbnailLocation,
  packageId,
  imgUrl,
}: any) {
  return (
    <div>
      <div>
        <h1>Package Thumbnail Manage</h1>
      </div>
      <div>
        <div>
          <img
            // src={`${apiUrl}/upload_assets/images/package_thumbnails/${ThumbnailLocation}`}
            src={imgUrl}
            alt="ThumbNail Image"
          />
        </div>
        <div>
          <UploadPackageThumbnail packageId={packageId} />
        </div>
      </div>
    </div>
  );
}
