import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export async function postRequest(
  examId: string,
  mockPackageId: string,
  relation: boolean
): Promise<any> {
  console.log("from postRequest");
  console.log(
    "from PostReq: examId:" +
      examId +
      "mockexampackageid: " +
      mockPackageId +
      "boolean data: " +
      relation
  );
  const connectData = {
    Exams: {
      connect: { id: examId },
    },
  };
  const disConnectData = {
    Exams: {
      disconnect: { id: examId },
    },
  };

  try {
    console.log("printed");
    const response = await fetch(`${apiUrl}/mockexampackage/${mockPackageId}`, {
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
          ? "Exam Added to Package!"
          : "Exam Removed from Package",
      });

      return true;
    } else {
      // File deletion failed
      console.error("Failed to Add Exam");
    }
  } catch (error) {
    console.error("Error Managing Exam", error);
  }
}

// export async function fetchMockPackage(PackageId: any): Promise<{
//   Title: string;
//   PackageId: string;
//   //   Price: string;
//   //   Price2: string;
//   //   Price3: string;
//   //   Status: boolean;
//   //   CreatedAt: string;
//   Exams: any;
//   //   ThumbNail: any;
//   //   PackageDescription: string;
//   //   DiscountStatus: boolean;
//   //   TemporaryPrice: string;
//   //   TemporaryPrice2: string;
//   //   TemporaryPrice3: string;
//   //   DiscountExpiryDate: Date;
//   //   DisplayOnHome: boolean;
// }> {
//   try {
//     console.log(PackageId);
//     const response = await fetch(`${apiUrl}/packages/${PackageId}`);

//     if (response.ok) {
//       const data = await response.json();
//       const packageData = {
//         Title: data.packageName,
//         PackageId: data.packageId,
//         // PackageDescription: data.packageDescription,
//         // Price: data.price,
//         // Price2: data.price2,
//         // Price3: data.price3,
//         // Status: data.status,
//         // CreatedAt: data.createdAt,
//         Exams: data.Exams,
//         // ThumbNail: data.thumbnail,
//         // DiscountStatus: data.discountStatus,
//         // TemporaryPrice: data.temporaryPrice,
//         // TemporaryPrice2: data.temporaryPrice2,
//         // TemporaryPrice3: data.temporaryPrice3,
//         // DiscountExpiryDate: data.discountExpriyDate,
//         // DisplayOnHome: data.displayOnHome,
//       };
//       console.log(packageData);

//       return packageData;
//     } else {
//       console.error("Failed to fetch package");
//       return {
//         Title: "",
//         PackageId: "",
//         Exams: "",
//         // PackageDescription: "",
//         // Price: "",
//         // Price2: "",
//         // Price3: "",
//         // Status: false,
//         // CreatedAt: "",
//         // Courses: null,
//         // ThumbNail: "",
//         // TemporaryPrice: "",
//         // TemporaryPrice2: "",
//         // TemporaryPrice3: "",
//         // DiscountStatus: false,
//         // DiscountExpiryDate: new Date(),
//         // DisplayOnHome: false,
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching package", error);
//     return {
//       Title: "",
//       PackageId: "",
//       Exams: "",
//       //   PackageDescription: "",
//       //   Price: "",
//       //   Price2: "",
//       //   Price3: "",
//       //   Status: false,
//       //   CreatedAt: "",
//       //   Courses: null,
//       //   ThumbNail: "",
//       //   TemporaryPrice: "",
//       //   TemporaryPrice2: "",
//       //   TemporaryPrice3: "",
//       //   DiscountStatus: false,
//       //   DiscountExpiryDate: new Date(),
//       //   DisplayOnHome: false,
//     };
//   }
// }
