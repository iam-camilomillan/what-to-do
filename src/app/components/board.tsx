import { Reorder } from "framer-motion";

export default function Board({ lists }: { lists: any[] }) {
  function onDragEnd(result: any) {
    const { source, destination } = result;
  }

  console.log(lists);

  return (
    <div>
      {lists.map(async (list, index) => (
        <div className="rounded-md border border-slate-700 bg-slate-800 p-2">
          <h4 className="font-medium">{list.title}</h4>

          <div className="h-2" />

          {/* Cards mapping */}
          {list.cards.map((card: any, index: number) => (
            /* Card */
            <div className="rounded-md border border-slate-700 p-2">
              <div>{card.title}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
