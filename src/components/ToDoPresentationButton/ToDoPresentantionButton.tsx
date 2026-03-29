import { ToDoPresentantionButtonProps } from "@/types/props";

import { useToDosStore } from "@/hooks/useToDosStore";

import "@/components/ToDoPresentationButton/ToDoPresentationButton.css";

const ToDoPresentantionButton = ({ idCategory, icon, category }: ToDoPresentantionButtonProps) => {
  const { handleSetViewIdCategory } = useToDosStore();

  const handleClickCategory: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleSetViewIdCategory(idCategory);
  };

  return (
    <article className="category">
      <button
        className="category__btn-name"
        onClick={handleClickCategory}
        aria-label={`Select ${category} category`}
      >
        {icon}
        {category}
      </button>
    </article>
  );
};

export default ToDoPresentantionButton;
