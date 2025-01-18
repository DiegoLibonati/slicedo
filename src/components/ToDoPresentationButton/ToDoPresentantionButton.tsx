import { useAppDispatch } from "../../constants/redux";

import { setViewIdCategory } from "../../store/toDos/toDosSlice";

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
        className="category__btn"
        onClick={handleClickCategory}
        aria-label="todo category button"
      >
        {icon}
        {category}
      </button>
    </article>
  );
};
