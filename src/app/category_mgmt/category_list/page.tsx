import AddCategoryList from "@/app/forms/createCategoryList";
import React from "react";
import ListCategories from "../components/category_lists";

export default function CategoryList() {
  return (
    <div>
      <div>
        <h1>Create Category List</h1>
        <div>
          <AddCategoryList />
        </div>
      </div>

      <div>
        <ListCategories />
      </div>
    </div>
  );
}
