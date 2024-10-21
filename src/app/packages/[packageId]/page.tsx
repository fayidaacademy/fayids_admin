"use client";
import { apiUrl } from "@/api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";
import Link from "next/link";
import usePackageStore from "@/store/connectCoursePackage";
import { fetchPackage } from "../../../lib/course_package_relation";
import { DropdownComponent } from "../connectcourse/[packageId]/dropdowncomponent";
import DeleteDialog from "@/my_components/delete_dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SwitchDialog from "@/my_components/switch_dialog";
import UploadPackageThumbnail from "./uploadPackackeThumbnail";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { CalanderForm } from "../package_components/discountmanagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Package_basic_components from "../package_components/package_basic_components";
import Package_thumbnail_image_manage from "../package_components/package_thumbnail_image_manage";
import Package_discount_managment from "../package_components/package_discount_managment";
import useRefetchPackageStore from "../../../store/refetchPackageDetails";

export default function PackageDetails({ params }: any) {
  const PackageId = params.packageId;

  const fetchPackageStatus = useRefetchPackageStore(
    (state) => state.packageFetch
  );
  // const setPackageToStore = usePackageStore((state) =>
  //  state.setPackageId(PackageId)
  // );
  const setPackageToStore = usePackageStore((state) => state.setPackageId);
  setPackageToStore(PackageId);

  //var  = "";
  const [PackageNameVariable, setPackageNameVariable] = useState("");
  const [PackageDescriptionVariable, setPackageDescriptionVariable] =
    useState("");
  const [CoursesVariable, setCoursesVariable] = useState([]);
  const [StatusVariable, setStatusVariable] = useState(false);

  const [PriceVariable, setPriceVariable] = useState("");
  const [PriceVariable2, setPriceVariable2] = useState("");
  const [PriceVariable3, setPriceVariable3] = useState("");

  const [CreatedAtVariable, setCreatedAtVariable] = useState("");
  const [ThumbnailLocation, setThumbNailLocation] = useState("");

  const [temporaryPrice, setTemporaryPrice] = useState("");
  const [temporaryPrice2, setTemporaryPrice2] = useState("");
  const [temporaryPrice3, setTemporaryPrice3] = useState("");
  const [Group, setGroup] = useState("");
  const [Group2, setGroup2] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [discountStatus, setDiscountStatus] = useState(false);
  const [discountExpiryDate, setDiscountExpiryDate] = useState(new Date());
  const [displayOnHome, setDisplayOnHome] = useState(false);
  const [tagFetched, setTagFetched] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [featured, setFeatured] = useState(false);

  const hadleSwitchStatus = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    // console.log("hello");
  };

  useEffect(() => {
    //const PackageId = "; // Replace with the actual package ID
    fetchPackage(PackageId)
      .then(
        ({
          PackageName,
          PackageId,
          PackageDescription,
          Price,
          Price2,
          Price3,
          Status,
          CreatedAt,
          Courses,
          ThumbNail,
          DiscountStatus,
          TemporaryPrice,
          TemporaryPrice2,
          TemporaryPrice3,
          DiscountExpiryDate,
          DisplayOnHome,
          group,
          group2,
          imgUrl,
          tag,
          featured,
        }) => {
          setPackageNameVariable(PackageName);
          // setPackageId(PackageId);
          setPackageDescriptionVariable(PackageDescription);
          setPriceVariable(Price);
          setPriceVariable2(Price2);
          setPriceVariable3(Price3);
          setStatusVariable(Status);
          setCreatedAtVariable(CreatedAt);
          setCoursesVariable(Courses);
          setThumbNailLocation(ThumbNail);
          setDiscountStatus(DiscountStatus);
          console.log("DED: " + TemporaryPrice);
          setDiscountExpiryDate(DiscountExpiryDate);
          setTemporaryPrice(TemporaryPrice);
          setTemporaryPrice2(TemporaryPrice2);
          setTemporaryPrice3(TemporaryPrice3);
          setDisplayOnHome(DisplayOnHome);
          setGroup(group);
          setGroup2(group2);
          setImgUrl(imgUrl);
          setTagFetched(tag);
          setFeatured(featured);
        }
      )
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error(error);
      });
  }, [fetchPackageStatus]);

  //const discountExpiryDate: Date = /* retrieve your expiry date */;

  return (
    <div className="space-y-2 mx-3">
      <LoadProfileAuth />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="delete" className="text-red-600">
            Delete
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <div className="py-5">
            <Package_basic_components
              packageId={PackageId}
              packageName={PackageNameVariable}
              packagePrice={PriceVariable}
              packagePrice2={PriceVariable2}
              packagePrice3={PriceVariable3}
              packageDescription={PackageDescriptionVariable}
              packageStatus={StatusVariable}
              packageCreatedAt={CreatedAtVariable}
              packageDisplayOnHomeStatus={displayOnHome}
              group={Group}
              group2={Group2}
              tag={tagFetched}
              featured={featured}
            />
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div>
            <Link href={`/packages/connectcourse/${PackageId}`}>
              <span className="text-blue-900 font-semibold">
                {" "}
                Add Course to Package
              </span>
            </Link>

            <div>
              <DataTableGenerator
                columns={columns}
                data={CoursesVariable}
                filterBy="courseName"
                type="course"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discount">
          <div>
            <Package_discount_managment
              discountExpiryDate={discountExpiryDate}
              PackageId={PackageId}
              packageDiscountStatus={discountStatus}
              packageDiscountPrice={temporaryPrice}
              packageDiscountPrice2={temporaryPrice2}
              packageDiscountPrice3={temporaryPrice3}
              packagePrice={PriceVariable}
              packagePrice2={PriceVariable2}
              packagePrice3={PriceVariable3}
            />
          </div>
        </TabsContent>

        <TabsContent value="thumbnail">
          <div>
            <Package_thumbnail_image_manage
              ThumbnailLocation={ThumbnailLocation}
              packageId={PackageId}
              imgUrl={imgUrl}
            />
          </div>
        </TabsContent>
        <TabsContent value="delete">
          <div>
            <div>
              <h1>This will permanently remove the package form the system!</h1>
            </div>
            <div className="text-red-500  w-fit px-1">
              <DeleteDialog
                type="packages"
                id={PackageId}
                backTo="/packages"
                buttonTitle="Delete Package"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* <div>
        {" "}
        <form
          method="POST"
          // action="http://localhost:5000/packages/upload_package_thumbnail/${packageId}"
          action={`${apiUrl}/packages/upload_package_thumbnail/${PackageId}`}
          id="myForm"
          encType="multipart/form-data"
        >
          <label
            htmlFor="package_image"
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
            id="package_image"
            name="package_image"
          />
          <input type="submit" />
        </form>
      </div> */}
    </div>
  );
}
