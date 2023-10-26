"use client";

/* React imports */
import { useMemo, useState } from "react";

/* Components imports */
import List from "./list";

/* DnD Kit imports */
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/* Types imports */
import { type Database } from "../types/database";
import {
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

/* Board type */
type List = Database["public"]["Tables"]["lists"]["Row"];
type Card = Database["public"]["Tables"]["cards"]["Row"];
type Data = List & { cards: Card[] };

export default function Board({ data }: { data: Data[] }) {
  const [lists, setLists] = useState(data);
  const listsIds = useMemo(() => lists.map((list) => list.index), [lists]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active.id) {
      console.log(active);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      console.log(active, over);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");
  }

  return (
    <div className="flex gap-x-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {lists.map((list, index) => (
          <List key={index} data={list} />
        ))}
      </DndContext>
    </div>
  );
}
