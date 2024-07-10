"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  Ticket,
  UserCheck,
  Table,
  Blocks,
  BookCopy,
  LayoutPanelTop,
  Award,
  Globe,
  Megaphone,
  FileText,
  Mail,
  CoinsIcon,
  StickyNote,
  LandPlot,
  MapPin,
  Group,
  Folder,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/api_config";

export function AccordionMenu() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.accountType);
        setLoading(false);
        //  setUserName(data.firstName + " " + data.lastName);
        console.log("message: " + data.firstName);
      });
  }, []);

  return (
    <div className="h-full ">
      <Accordion type="single" collapsible className="w-full">
        {data == "Admin" && (
          <AccordionItem value="item-0">
            <AccordionTrigger>
              <div className="flex gap-1">
                {" "}
                <Ticket /> <h1></h1> Purchase List
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/purchaselist_managment/purchase_list">
                New Course Package Purchase List
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/purchaselist_managment/purchase_update_list">
                Update Course Package Purchase List
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/purchase_list_mock_package">
                Mock Package Purchase List
              </Link>
            </AccordionContent>
          </AccordionItem>
        )}
        {data == "Admin" && (
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {" "}
              <div className="flex gap-1">
                {" "}
                <UserCheck /> <h1></h1> Students
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/students">Students List</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/examtaker">Exam Takers List</Link>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {" "}
            <div className="flex gap-1">
              {" "}
              <Group /> <h1></h1> Mock Exam Packages
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link href="/mockexampackage">Mock Package List</Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/mockexampackage/createpackage">
              Create Mock Package
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            {" "}
            <div className="flex gap-1">
              {" "}
              <StickyNote /> <h1></h1> Exams
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link href="/exams/examlist">Exams List</Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/exams/createexam">Create Exam</Link>
          </AccordionContent>
          {/* <AccordionContent>
            <Link href="/exams/examtakers">Exam Takers</Link>
          </AccordionContent> */}
        </AccordionItem>
        {data == "Admin" && (
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex gap-1">
                {" "}
                <Table /> <h1></h1> LeaderBoard
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/leaderboard">Leader Board</Link>
            </AccordionContent>
          </AccordionItem>
        )}

        {data == "Admin" && (
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <div className="flex gap-1">
                {" "}
                <Blocks /> <h1></h1> Packages
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/packages">Packages List</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/packages/createpackage">Add a Package</Link>
            </AccordionContent>
          </AccordionItem>
        )}

        {data == "Admin" && (
          <AccordionItem value="item-6">
            <AccordionTrigger>
              {" "}
              <div className="flex gap-1">
                {" "}
                <BookCopy /> <h1></h1> Courses
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/courses">Courses List</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/courses/addcourse">Add a Course</Link>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value="item-7">
          <AccordionTrigger>
            <div className="flex gap-1">
              {" "}
              <LayoutPanelTop /> <h1></h1> Sections
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link href="/sections">Section List</Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/sections/addsection">Add a Section</Link>
          </AccordionContent>
        </AccordionItem>

        {data == "Admin" && (
          <AccordionItem value="item-8">
            <AccordionTrigger>
              {" "}
              <div className="flex gap-1">
                {" "}
                <Award /> <h1></h1> Prizes
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/prize/orderedprizelist">Prize Orders</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/prize">Prizes List</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/prize/addprize">Add a Prize</Link>
            </AccordionContent>
          </AccordionItem>
        )}
        {data == "Admin" && (
          <AccordionItem value="item-9">
            <AccordionTrigger>
              {" "}
              <div className="flex gap-1">
                {" "}
                <Award /> <h1>Manage Categories</h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link href="/category_mgmt/key_words">Key Words</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/category_mgmt/folder_list">Folder List</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href="/category_mgmt/category_list">Category List</Link>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value="item-10">
          <AccordionTrigger>More</AccordionTrigger>
          <AccordionContent>
            <Link href="/settings/languages">
              <div className="flex gap-1">
                {" "}
                <Globe /> <h1>Languages</h1>
              </div>
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/settings/packagefolders/packagefolderslist">
              <div className="flex gap-1">
                {" "}
                <Folder /> <h1>Package Folders</h1>
              </div>
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/settings/city/citylist">
              <div className="flex gap-1">
                {" "}
                <MapPin /> <h1>City</h1>
              </div>
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/settings/regions/regionlist">
              <div className="flex gap-1">
                {" "}
                <LandPlot /> <h1>Region</h1>
              </div>
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/settings/advertisment">
              {" "}
              <div className="flex gap-1">
                {" "}
                <Megaphone /> <h1>Advertisment</h1>
              </div>
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/settings/blogs">
              <div className="flex gap-1">
                {" "}
                <FileText /> <h1>Blogs</h1>
              </div>
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/settings/messages">
              {" "}
              <div className="flex gap-1">
                {" "}
                <Mail /> <h1>Messages</h1>
              </div>
            </Link>
          </AccordionContent>

          {data == "Admin" && (
            <AccordionContent>
              <Link href="/settings/payment_options">
                <div className="flex gap-1">
                  {" "}
                  <CoinsIcon /> <h1>Payment Methods</h1>
                </div>
              </Link>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
