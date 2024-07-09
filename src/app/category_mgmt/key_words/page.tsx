import AddKeywordForm from "@/app/forms/createKeyWord";
import React from "react";
import ListKeywords from "../components/list_keywords";

export default function KeyWords() {
  return (
    <div className="space-y-6">
      <div>
        <AddKeywordForm />
      </div>

      <div>
        <ListKeywords />
      </div>
    </div>
  );
}
