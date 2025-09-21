import { useAppDispatch } from "@src/constants/redux";

import { setViewIdCategory } from "@src/store/toDos/toDosSlice";

import "@src/components/ToDoPresentationButton/ToDoPresentationButton.css";

interface ToDoPresentantionButtonProps {
  idCategory: string;
  category: string;
  icon: string;
}

export const ToDoPresentantionButton = ({
  idCategory,
  icon,
  category,
}: ToDoPresentantionButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClickCategory: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(setViewIdCategory(idCategory));
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
