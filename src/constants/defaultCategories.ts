import type { ToDoCategory } from "@/types/app";

const defaultCategories: ToDoCategory[] = [
  {
    id: "my_day",
    category: "My Day",
    toDos: [
      {
        id: "my_day_todo_1",
        content: "Este es un todo de my day",
        done: false,
      },
    ],
    icon: "☀️",
  },
  {
    id: "important",
    category: "Important",
    toDos: [],
    icon: "⚠️",
  },
  {
    id: "tasks",
    category: "Tasks",
    toDos: [],
    icon: "🎯",
  },
];

export default defaultCategories;
