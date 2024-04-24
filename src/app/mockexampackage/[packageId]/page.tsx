"use client";
import { apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MockPackage_basic_components from "./package_components/package_basic_components";
import Link from "next/link";
import DataTableGenerator from "@/main_components/data-table";
import { columns } from "./columns";
import useMockPackageStore from "@/store/mockpackageStore";
import Mock_Package_thumbnail_image_manage from "./package_components/package_thumbnail_image_manage";
import Mock_package_discount_managment from "./package_components/package_discount_managment";
import DeleteDialog from "@/my_components/delete_dialog";

export default function MockPackageDetails({ params }: any) {
  const [data, setData] = useState<any>([]);

  const setPackageToStore = useMockPackageStore(
    (state) => state.setMockPackageId
  );
  setPackageToStore(params.packageId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/mockexampackage/${params.packageId}`
        ); // Replace with your API endpoint
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Tabs defaultValue="basic" className="w-full mx-8">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="delete" className="text-red-600">
            Delete
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <MockPackage_basic_components
            packageId={params?.packageId}
            packageName={data?.title}
            packagePrice={data?.price}
            packageDescription={data?.description}
            packageStatus={data?.status}
            packageDisplayOnHomeStatus={data?.displayHome}
            group={data?.group}
            group2={data?.group2}
          />
        </TabsContent>

        <TabsContent value="exams">
          <div>
            <Link href={`/mockexampackage/connectexam/${params.packageId}`}>
              <span className="text-blue-900 font-semibold">
                {" "}
                Add Exam to Package
              </span>
            </Link>

            <div>
              <DataTableGenerator
                columns={columns}
                data={data?.Exams}
                filterBy="courseName"
                type="exams"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="thumbnail">
          <div>
            <Mock_Package_thumbnail_image_manage
              ThumbnailLocation={data?.thumbnail}
              packageId={data?.id}
              imgUrl={data?.imgUrl}
            />
          </div>
        </TabsContent>

        <TabsContent value="discount">
          <div>
            <Mock_package_discount_managment
              discountExpiryDate={data?.discountExpiryDate}
              PackageId={data?.id}
              packageDiscountStatus={data?.discountStatus}
              packageDiscountPrice={data?.temporaryPrice}
              packagePrice={data?.price}
            />
          </div>
        </TabsContent>

        <TabsContent value="delete">
          <div>
            <div>
              <h1>This will permanently remove the package form the system!</h1>
            </div>
            <div className=" text-red-300 w-fit px-1">
              <DeleteDialog
                type="mockexampackage"
                id={data?.id}
                backTo="/mockexampackage"
                buttonTitle="Delete Package"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
