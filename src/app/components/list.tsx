"use client";

/* React imports */
import { useMemo, useState } from "react";

/* Components imports */
import TaskCard from "./card";

/* DnD Kit imports */
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

/* Types imports */
import { type Database } from "../types/database";

/* Board type */
type List = Database["public"]["Tables"]["lists"]["Row"];
type Card = Database["public"]["Tables"]["cards"]["Row"];
type Data = List & { cards: Card[] };

export default function List({ data }: { data: Data }) {
  const [cards, setCards] = useState(data.cards);
  const cardsIds = useMemo(() => {
    return data.cards.map((card) => card.id);
  }, [data.cards]);

  return (
    <div className="w-64 rounded-md bg-slate-800 p-2">
      {/* List title */}
      <h4>{data.title}</h4>

      <div className="h-2" />

      {/* List card container */}
      <div className="flex flex-grow flex-col gap-y-2">
        <SortableContext
          items={cardsIds}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <TaskCard key={card.id} data={card} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
