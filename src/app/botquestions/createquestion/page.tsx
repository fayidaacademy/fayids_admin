import CreateBotQuestion from "@/app/forms/createBotQuestion";
import React from "react";

export default function CreateQuestion() {
  return (
    <div>
      <CreateBotQuestion />{" "}
    </div>
  );
}
// text String? @db.Text
// image String?
// period String?
// status String? @default("down")
// studentLimit String?
// createdAt DateTime @default(now())
// grade String?
// answers BotQuestionAnswer[]
