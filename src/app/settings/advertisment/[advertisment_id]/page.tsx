import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import React from "react";
import UploadAdvertismentImage from "./uploadAdvertismentImage";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import DeleteDialog from "@/my_components/delete_dialog";

export default async function BlogDetials({ params }: any) {
  const advertismentId = params.advertisment_id;
  console.log("Advertisment Id 01: " + advertismentId);

  const res = await fetch(`${apiUrl}/advertisment/${advertismentId}`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return (
    <div className="space-y-3 mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg font-semibold underline">
        Advertisment Details
      </h1>

      <div className="flex space-x-2">
        <h1>Home Page Visiblity: {data?.displayOnHome}</h1>

        {data?.displayOnHome == "false" && (
          <div className="bg-blue-600 text-white w-fit py-1 px-2">
            <EditSwitch
              id={advertismentId}
              //   backTo=""
              buttonTitle="Activate"
              recivedField="displayOnHome"
              type="advertisment"
              changeTo="true"
            />
          </div>
        )}

        {data?.displayOnHome == "true" && (
          <div className="bg-blue-600 text-white w-fit py-1 px-2">
            <EditSwitch
              id={advertismentId}
              //   backTo=""
              buttonTitle="Deactivate"
              recivedField="displayOnHome"
              type="advertisment"
              changeTo="false"
            />
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        {" "}
        <h1>Advertisment Index: {data?.advertisementIndex}</h1>
        <div className="">
          <EditCellDialog
            type={"advertisment"}
            id={advertismentId}
            field={"advertisementIndex"}
            content={data?.advertisementIndex}
            dataType="number"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <h1>Title: {data?.title}</h1>
        <div className="">
          <EditCellDialog
            type={"advertisment"}
            id={advertismentId}
            field={"title"}
            content={data?.title}
            dataType="text"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <h1>Sub Title: {data?.subtitle}</h1>
        <div className="">
          <EditCellDialog
            type={"advertisment"}
            id={advertismentId}
            field={"subtitle"}
            content={data?.subtitle}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <h1>Text: {data?.text}</h1>
        <div className="">
          <EditCellDialog
            type={"advertisment"}
            id={advertismentId}
            field={"text"}
            content={data?.text}
            dataType="text"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <h1>Info: {data?.info}</h1>
        <div className="">
          <EditCellDialog
            type={"advertisment"}
            id={advertismentId}
            field={"info"}
            content={data?.info}
            dataType="text"
          />
        </div>
      </div>

      {/* <div>Image: {data?.image}</div> */}

      <UploadAdvertismentImage advertisment_id={advertismentId} />

      {/* http://localhost:5000/upload_assets/images/blog_images/1702803436118.jpg
      http://localhost:5000/upload_assets/images/blog_images/1702820316622.jpg */}
      <div>
        <h1>
          <span className="text-blue-900 font-semibold">Thumbnail</span>
        </h1>
        <img
          // src={`${apiUrl}/upload_assets/images/advertisement_images/${data?.image}`}
          src={data?.imgUrl}
          alt="Advertisment Image"
        />
        {/* <h1>{`${apiUrl}/upload_assets/images/advertisment_images/${data?.image}`}</h1> */}
        {/* {data?.image} */}
      </div>
      <div>
        <div>
          <DeleteDialog
            backTo="/settings/advertisment"
            buttonTitle="Delete Ad"
            id={advertismentId}
            type="advertisment"
          />
        </div>{" "}
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
