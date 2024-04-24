import DeleteDialog from "@/my_components/delete_dialog";
import React from "react";
import { apiUrl } from "../../../api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import UploadPrizeImage from "./uploadPrizeImage";
import EditSwitch from "@/my_components/edit_switch";

//async function getData(): Promise<[]> {
// Fetch data from  API .
// return res.json();
//}

export default async function PrizeDetails({ params }: any) {
  const prizeId = params.prize_id;
  console.log("prizeIdform Page: " + prizeId);

  const res = await fetch(`${apiUrl}/prizes/${prizeId}`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  console.log(res);
  console.log("printed");
  return (
    <div>
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg font-semibold underline pb-3">
        Prize Details
      </h1>
      <div className="space-y-2">
        <div>
          <h1>
            <span className="text-primary-color font-semibold"> Status:</span>{" "}
            {data?.visiblity}
          </h1>
        </div>

        <div>
          {" "}
          {data?.visiblity == "inactive" && (
            <div>
              <EditSwitch
                type="prizes"
                id={prizeId}
                recivedField="visiblity"
                buttonTitle="Activate"
                changeTo="active"
              />
            </div>
          )}
          {data?.visiblity == "active" && (
            <div>
              <EditSwitch
                type="prizes"
                id={prizeId}
                recivedField="visiblity"
                buttonTitle="Diactivate"
                changeTo="inactive"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-6">
        <h1 className="text-primary-color font-semibold">Item Name:</h1>
        <h1>{data.itemName}</h1>

        <div className="">
          <EditCellDialog
            type={"prizes"}
            id={prizeId}
            field={"itemName"}
            content={data.itemName}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-6">
        <h1 className="text-primary-color font-semibold">Prize Index:</h1>
        <h1>{data.prizeIndex}</h1>
        <div className="">
          <EditCellDialog
            type={"prizes"}
            id={prizeId}
            field={"prizeIndex"}
            content={data.prizeIndex}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-6">
        <h1 className="text-primary-color font-semibold">Prize Description:</h1>
        <h1>{data.itemDecription}</h1>
        <div className="">
          <EditCellDialog
            type={"prizes"}
            id={prizeId}
            field={"itemDecription"}
            content={data.itemDecription}
            dataType="text"
          />
        </div>
      </div>

      <div className="flex space-x-6">
        <h1 className="text-primary-color font-semibold">Points:</h1>
        <h1>{data.points}</h1>
        <div className="">
          <EditCellDialog
            type={"prizes"}
            id={prizeId}
            field={"points"}
            content={data.points}
            dataType="number"
          />
        </div>
      </div>

      <div className="flex space-x-6 ">
        <h1 className="text-primary-color font-semibold">Visible at point:</h1>
        <h1>{data.visibleAtPoint}</h1>
        <div className="">
          <EditCellDialog
            type={"prizes"}
            id={prizeId}
            field={"visibleAtPoint"}
            content={data.visibleAtPoint}
            dataType="text"
          />
        </div>
      </div>
      {/************************/}
      <div>
        <UploadPrizeImage prizeId={prizeId} />

        <div>
          <h1>
            <span className="text-blue-900 font-semibold">Image</span>
          </h1>
          <img
            //  src={`${apiUrl}/upload_assets/images/prize_images/${data?.image}`}
            src={data?.imgUrl}
            alt="Prize Image"
          />
          {/* <h1>{`${apiUrl}/upload_assets/images/prize_images/${data?.image}`}</h1>
          {data?.image} */}
        </div>
      </div>

      <DeleteDialog
        type={"prizes"}
        id={prizeId}
        backTo="/prize"
        buttonTitle="Delete Prize"
      />
    </div>
  );
}
