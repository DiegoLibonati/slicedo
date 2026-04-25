import type { ToDoCategory } from "@/types/app";

export const mockCategories: ToDoCategory[] = [
  {
    id: "cat-1",
    category: "Work",
    icon: "💼",
    toDos: [
      { id: "todo-1", content: "Buy groceries", done: false },
      { id: "todo-2", content: "Read book", done: true },
    ],
  },
  {
    id: "important",
    category: "Important",
    icon: "⚠️",
    toDos: [],
  },
  {
    id: "tasks",
    category: "Tasks",
    icon: "🎯",
    toDos: [],
  },
];
