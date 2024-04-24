import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import React from "react";

export default function OtherSettings() {
  return (
    <div className="mx-3">
      <LoadProfileAuth />
      <div>
        <h1 className="text-blue-800 font-semibold">Other Settings</h1>
      </div>
      <div className="my-2">
        <Link href={"/settings/languages/"}>Languages</Link>
      </div>
      <div className="my-2">
        <Link href={"/settings/payment_options/"}>Payment Methods</Link>
      </div>
    </div>
  );
}
