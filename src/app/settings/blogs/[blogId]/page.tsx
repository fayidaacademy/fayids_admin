import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import React from "react";
import UploadBlogImage from "./uploadBlogImage";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default async function BlogDetials({ params }: any) {
  const blogId = params.blogId;

  const res = await fetch(`${apiUrl}/blogs/${blogId}`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return (
    <div className="mx-10 my-5 space-y-2">
      <LoadProfileAuth />
      <h1 className="text-lg text-primary-color underline font-semibold">
        Blog Details
      </h1>

      <div className="flex space-x-2">
        <h1>Home Page Visiblity: {data?.displayOnHome}</h1>

        {data?.displayOnHome == "false" && (
          <div className="bg-blue-600 text-white w-fit py-1 px-2">
            <EditSwitch
              id={blogId}
              //   backTo=""
              buttonTitle="Activate"
              recivedField="displayOnHome"
              type="blogs"
              changeTo="true"
            />
          </div>
        )}

        {data?.displayOnHome == "true" && (
          <div className="bg-blue-600 text-white w-fit py-1 px-2">
            <EditSwitch
              id={blogId}
              //   backTo=""
              buttonTitle="Deactivate"
              recivedField="displayOnHome"
              type="blogs"
              changeTo="false"
            />
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        {" "}
        <h1>Blog Index: {data?.blogIndex}</h1>
        <div className="">
          <EditCellDialog
            type={"blogs"}
            id={blogId}
            field={"blogIndex"}
            content={data?.blogIndex}
            dataType="number"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <h1>Title: {data?.title}</h1>
        <div className="">
          <EditCellDialog
            type={"blogs"}
            id={blogId}
            field={"title"}
            content={data?.title}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <h1>SubTitle: {data?.subTitle}</h1>
        <div className="">
          <EditCellDialog
            type={"blogs"}
            id={blogId}
            field={"subTitle"}
            content={data?.subTitle}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <h1>Text: {data?.text}</h1>
        <div className="">
          <EditCellDialog
            type={"blogs"}
            id={blogId}
            field={"text"}
            content={data?.text}
            dataType="text"
          />
        </div>
      </div>
      {/* <div>Image: {data?.image}</div> */}

      <UploadBlogImage blogId={blogId} />

      {/* http://localhost:5000/upload_assets/images/blog_images/1702803436118.jpg
      http://localhost:5000/upload_assets/images/blog_images/1702820316622.jpg */}
      <div>
        <h1>
          <span className="text-blue-900 font-semibold">Thumbnail</span>
        </h1>
        <img
          //  src={`${apiUrl}/upload_assets/images/blog_images/${data?.image}`}
          src={data?.imgUrl}
          alt="Blog Image"
        />
        {/* <h1>{`${apiUrl}/upload_assets/images/blog_images/${data?.image}`}</h1>
        {data?.image} */}
      </div>
      <div>
        {" "}
        {/* <form
          method="POST"
          // action="http://localhost:5000/packages/upload_package_thumbnail/${packageId}"
          action={`${apiUrl}/blogs/upload_blog_images/${blogId}`}
          id="myForm"
          encType="multipart/form-data"
        >
          <label
            htmlFor="blog_image"
            className="px-3 bg-yellow-300 cursor-pointer"
          >
            <span className="text-blue-900 font-semibold">
              {" "}
              Update Thumbnail{" "}
            </span>
          </label>
          <input
            type="file"
            className="hidden"
            id="blog_image"
            name="blog_image"
          />
          <input type="submit" />
        </form> */}
      </div>
    </div>
  );
}
