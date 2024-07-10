import { apiUrl } from "@/api_config";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
//import useRefetchStore from "@/store/autoFetch";

// const setCategoryFolderFetch = useRefetchStore(
//   (state) => state.setCategoryFolderFetch
// );
// const categoryFolderFetch = useRefetchStore(
//   (state) => state.categoryFolderFetch
// );

export async function postRequestCategoryKeyword(
  folderId: number,
  keywordId: number,
  relation: boolean
): Promise<boolean> {
  console.log("from postRequest");
  console.log(
    "from PostReq: folderId:" +
      folderId +
      "keywordId: " +
      keywordId +
      "boolean data: " +
      relation
  );
  const connectData = {
    KeyWords: {
      connect: { id: keywordId },
    },
  };
  const disConnectData = {
    KeyWords: {
      disconnect: { id: keywordId },
    },
  };

  try {
    console.log("printed");
    const response = await fetch(`${apiUrl}/categoryfolders/${folderId}`, {
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
          ? "KeyWord Added to Folder!"
          : "Keyword Removed from Folder",
      });

      return true;
    } else {
      // File deletion failed
      console.error("Failed to Add KeyWord");
    }
  } catch (error) {
    console.error("Error Managing Keyword", error);
  }
  return false;
}
