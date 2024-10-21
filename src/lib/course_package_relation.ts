import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export async function postRequest(
  courseId: string,
  packageId: string,
  relation: boolean
): Promise<any> {
  const connectData = {
    courses: {
      connect: { id: courseId },
    },
  };
  const disConnectData = {
    courses: {
      disconnect: { id: courseId },
    },
  };

  try {
    console.log("printed");
    const response = await fetch(`${apiUrl}/packages/${packageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: relation
        ? JSON.stringify(connectData)
        : JSON.stringify(disConnectData),

      // Add any necessary headers or authentication tokens
    });

    if (response.ok) {
      // File successfully deleted
      console.log("File Updated");

      // router.push(window.location.href);
      // setOpen(false);
      //  router.refresh();
      toast({
        title: "Success!",
        description: relation
          ? "Course Added to Package!"
          : "Course Removed from Package",
      });

      return true;
    } else {
      // File deletion failed
      console.error("Failed to Add Course");
    }
  } catch (error) {
    console.error("Error Managing Course", error);
  }
}

export async function fetchPackage(PackageId: any): Promise<{
  PackageName: string;
  PackageId: string;
  Price: string;
  Price2: string;
  Price3: string;
  Status: boolean;
  CreatedAt: string;
  Courses: any;
  ThumbNail: any;
  PackageDescription: string;
  DiscountStatus: boolean;
  TemporaryPrice: string;
  TemporaryPrice2: string;
  TemporaryPrice3: string;
  DiscountExpiryDate: Date;
  DisplayOnHome: boolean;
  group: string;
  group2: string;
  imgUrl: string;
  tag: string;
  featured: boolean;
}> {
  try {
    console.log(PackageId);
    const response = await fetch(`${apiUrl}/packages/${PackageId}`);

    if (response.ok) {
      const data = await response.json();
      const packageData = {
        PackageName: data.packageName,
        PackageId: data.packageId,
        PackageDescription: data.packageDescription,
        Price: data.price,
        Price2: data.price2,
        Price3: data.price3,
        Status: data.status,
        CreatedAt: data.createdAt,
        Courses: data.courses,
        ThumbNail: data.thumbnail,
        DiscountStatus: data.discountStatus,
        TemporaryPrice: data.temporaryPrice,
        TemporaryPrice2: data.temporaryPrice2,
        TemporaryPrice3: data.temporaryPrice3,
        DiscountExpiryDate: data.discountExpriyDate,
        DisplayOnHome: data.displayOnHome,
        group: data.group,
        group2: data.group2,
        imgUrl: data.imgUrl,
        tag: data.tag,
        featured: data.featured,
      };
      console.log(packageData);

      return packageData;
    } else {
      console.error("Failed to fetch package");
      return {
        PackageName: "",
        PackageId: "",
        PackageDescription: "",
        Price: "",
        Price2: "",
        Price3: "",
        Status: false,
        CreatedAt: "",
        Courses: null,
        ThumbNail: "",
        TemporaryPrice: "",
        TemporaryPrice2: "",
        TemporaryPrice3: "",
        DiscountStatus: false,
        DiscountExpiryDate: new Date(),
        DisplayOnHome: false,
        group: "",
        group2: "",
        imgUrl: "",
        tag: "",
        featured: false,
      };
    }
  } catch (error) {
    console.error("Error fetching package", error);
    return {
      PackageName: "",
      PackageId: "",
      PackageDescription: "",
      Price: "",
      Price2: "",
      Price3: "",
      Status: false,
      CreatedAt: "",
      Courses: null,
      ThumbNail: "",
      TemporaryPrice: "",
      TemporaryPrice2: "",
      TemporaryPrice3: "",
      DiscountStatus: false,
      DiscountExpiryDate: new Date(),
      DisplayOnHome: false,
      group: "",
      group2: "",
      imgUrl: "",
      tag: "",
      featured: false,
    };
  }
}
