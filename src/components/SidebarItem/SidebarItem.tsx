import type { JSX } from "react";
import type { SidebarItemProps } from "@/types/props";

import "@/components/SidebarItem/SidebarItem.css";

const SidebarItem = ({
  icon,
  category,
  quantity,
  onOpenCategoryToDo,
}: SidebarItemProps): JSX.Element => {
  return (
    <li className="sidebar-item">
      <h2 onClick={onOpenCategoryToDo} className="sidebar-item__category">
        {icon}
        {category}
      </h2>
      <h2 className="sidebar-item__quantity">{quantity}</h2>
    </li>
  );
};

export default SidebarItem;
