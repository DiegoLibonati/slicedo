import "@src/components/SidebarItem/SidebarItem.css";

interface SidebarItemProps {
  icon: string;
  category: string;
  quantity: number;
  onOpenCategoryToDo: React.MouseEventHandler<HTMLHeadingElement>;
}

export const SidebarItem = ({
  icon,
  category,
  quantity,
  onOpenCategoryToDo,
}: SidebarItemProps) => {
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
