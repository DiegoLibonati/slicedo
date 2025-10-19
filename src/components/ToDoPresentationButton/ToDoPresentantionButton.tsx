import { ToDoPresentantionButtonProps } from "@src/entities/props";

import { useToDosStore } from "@src/hooks/useToDosStore";

import "@src/components/ToDoPresentationButton/ToDoPresentationButton.css";

export const ToDoPresentantionButton = ({
  idCategory,
  icon,
  category,
}: ToDoPresentantionButtonProps): JSX.Element => {
  const { handleSetViewIdCategory } = useToDosStore();

  const handleClickCategory: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    handleSetViewIdCategory(idCategory);
  };

  return (
    <article className="category">
      <button
        className="category__btn-name"
        onClick={handleClickCategory}
        aria-label="todo category button"
      >
        {icon}
        {category}
      </button>
    </article>
  );
};
