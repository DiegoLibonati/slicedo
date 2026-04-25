import type { JSX } from "react";
import type { PresentantionButtonProps } from "@/types/props";

import { useToDosStore } from "@/hooks/useToDosStore";

import "@/components/PresentationButton/PresentationButton.css";

const PresentantionButton = ({
  idCategory,
  icon,
  category,
}: PresentantionButtonProps): JSX.Element => {
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

export default PresentantionButton;
