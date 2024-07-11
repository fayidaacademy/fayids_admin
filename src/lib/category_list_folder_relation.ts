import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";


export async function postRequestCategoryListFolder(
    listId: number,
  folderId: number,
 
  relation: boolean
): Promise<boolean> {
  console.log("from postRequest");
  console.log(
    "from PostReq: folderId:" +
      folderId +
      "keywordId: " +
      listId +
      "boolean data: " +
      relation
  );
  const connectData = {
    CategoryFolders: {
      connect: { id: folderId },
    },
  };
  const disConnectData = {
    CategoryFolders: {
      disconnect: { id: folderId },
    },
  };

  try {
    console.log("printed");
    const response = await fetch(`${apiUrl}/categorylist/${listId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: relation
        ? JSON.stringify(connectData)
        : JSON.stringify(disConnectData),
      credentials: "include",

      // Add any necessary headers or authentication tokens
    });

    if (response.ok) {
      // File successfully deleted
      console.log("File Updated");
      //   setCategoryFolderFetch(!categoryFolderFetch);
      // router.push(window.location.href);
      // setOpen(false);
      //  router.refresh();
      toast({
        title: "Success!",
        description: relation
          ? "Folder Added to List!"
          : "Folder Removed from List",
      });

      return true;
    } else {
      // File deletion failed
      console.error("Failed to Add Folder");
    }
  } catch (error) {
    console.error("Error Managing Folder", error);
  }
  return false;
}
