import { ToDoCategory } from "../entities/entities";

export const LOCAL_STORAGE_KEY_CATEGORIES = "categories";

export const defaultCategories: ToDoCategory[] = [
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

export const MEDIA_QUERY_1024 = "@media only screen and (min-width: 1024px)"