import AddBlogForm from "@/app/forms/createBlogs";
import React from "react";

export default function CreateBlog() {
  return (
    <div className="mx-10 my-5">
      <div className="text-lg text-primary-color underline font-semibold">
        Create Blog
      </div>
      <div>
        <AddBlogForm />
      </div>
    </div>
  );
}
