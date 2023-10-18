/* Next imports */
import Link from "next/link";

/* Types imports */
import { type Database } from "../types/database";

type Board = Database["public"]["Tables"]["boards"]["Row"];

export default function BoardCard({ data }: { data: Board }) {
  return (
    <Link
      href={`/dashboard/${data.id}`}
      className="rounded-md border border-slate-700 bg-slate-800 p-2"
    >
      <div>
        <h4 className="text-lg font-medium">{data.title}</h4>

        <div className="h-2" />

        <p className="text-slate-50/80">{data.description}</p>
      </div>
    </Link>
  );
}
