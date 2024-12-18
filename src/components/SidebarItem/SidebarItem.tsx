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
    <li className="sidebar_nav_list_item">
      <h2 onClick={onOpenCategoryToDo}>
        {icon}
        {category}
      </h2>
      <h2>{quantity}</h2>
    </li>
  );
};
