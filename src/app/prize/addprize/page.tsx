import React from "react";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import AddPrizeForm from "./addform";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift } from "lucide-react";

export default function AddPrize() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/prize">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Gift className="h-8 w-8 text-primary" />
            Add New Prize
          </h1>
          <p className="text-gray-500 mt-1">
            Create a new prize for students to redeem
          </p>
        </div>
      </div>

      {/* Form */}
      <AddPrizeForm />
    </div>
  );
}
