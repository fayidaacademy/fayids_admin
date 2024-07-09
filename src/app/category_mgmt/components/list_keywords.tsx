"use client";
import { apiUrl } from "@/api_config";
import SimpleRemoveButton from "@/my_components/simple_remove";

import React from "react";
import { useEffect, useState } from "react";
import useRefetchStore from "@/store/autoFetch";

export default function ListKeywords() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const setKeywordFetch = useRefetchStore((state) => state.setKeywordFetch);
  const keywordFetch = useRefetchStore((state) => state.keyWordFetch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/keywordslist`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keywordFetch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h1 className="py-4 text-xl underline">List of Keywords</h1>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {data.map((d: any) => (
          <div key={d.id} className="flex space-x-3">
            <div className="my-auto h-fit">
              {" "}
              <h1>{d.word}</h1>
            </div>
            <div className="my-auto h-fit">
              <SimpleRemoveButton id={d.id} type="keywordslist" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
