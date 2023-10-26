/* DnD Kit imports */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* Types imports */
import { type Database } from "../types/database";

/* Card type */
type Card = Database["public"]["Tables"]["cards"]["Row"];

export default function Card({ data }: { data: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-md bg-slate-900 p-2"
    >
      <h4>{data.title}</h4>
    </div>
  );
}
