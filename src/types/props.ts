import type { ToDo } from "@/types/app";

// interface DefaultProps {
//   className?: string;
//   children?: React.ReactNode;
// }

export interface ModalManageToDoProps {
  idCategory: string;
  icon: string;
  category: string;
}

export interface SidebarItemProps {
  icon: string;
  category: string;
  quantity: number;
  onOpenCategoryToDo: React.MouseEventHandler<HTMLHeadingElement>;
}

export interface ToDoItemProps {
  id: string;
  content: string;
  done: boolean;
  idCategory: string;
  category: string;
}

export interface PresentantionButtonProps {
  idCategory: string;
  category: string;
  icon: string;
}

export interface ToDoViewProps {
  icon: string;
  idCategory: string;
  category: string;
  toDos: ToDo[];
}
