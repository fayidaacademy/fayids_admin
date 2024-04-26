import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/exam_mockpackage_relation";
import { CreditCard, User } from "lucide-react";
import useMockPackageStore from "@/store/mockpackageStore";

export type Exams = {
  id: string;
  assesmentTitle: string;
};

type CellProps = {
  row: {
    original: Exams;
  };
};

const Cell: React.FC<CellProps> = ({ row }) => {
  const Exams = row.original;
  const ExamTitle = Exams.assesmentTitle;
  const ExamId = Exams.id;
  const PackageId = useMockPackageStore((state) => state.mockPackageId);

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{ExamTitle}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                console.log(ExamTitle);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <Link href={`../exams/${ExamId}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(ExamTitle);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <Button
                onClick={() => {
                  postRequest(ExamId, PackageId, false);
                }}
              >
                Remove
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<Exams>[] = [
  {
    id: "actions",
    cell: Cell,
  },
  {
    header: "Exam Title",
    accessorKey: "assesmentTitle",
  },
  {
    header: "Points",
    accessorKey: "assesmentPoints",
  },
  {
    header: "Duration",
    accessorKey: "duration",
  },
];
