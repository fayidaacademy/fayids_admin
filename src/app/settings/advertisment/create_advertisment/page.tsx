import AddAdvertismentForm from "@/app/forms/createAdvertisment";
import AddBlogForm from "@/app/forms/createBlogs";
import React from "react";

export default function CreateAdvertisment() {
  return (
    <div>
      <div>Create An Advertisment</div>
      <div>
        <AddAdvertismentForm />
      </div>
    </div>
  );
}
