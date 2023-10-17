import Link from "next/link";

const BoardCard = ({ data }: { data: any }) => {
  return (
    <Link
      href={`/dashboard/${data.id}`}
      className="max-w-[256px] rounded-md border border-slate-700 bg-slate-800 p-2"
    >
      <div>
        <h4 className="text-lg font-medium">{data.title}</h4>

        <div className="h-2" />

        <p className="text-slate-50/80">{data.description}</p>
      </div>
    </Link>
  );
};

export default BoardCard;
