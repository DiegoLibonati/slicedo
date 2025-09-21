import { ToDoPresentantionButton } from "@src/components/ToDoPresentationButton/ToDoPresentantionButton";

import { useAppSelector } from "@src/constants/redux";

import "@src/views/ToDoPresentationView/ToDoPresentationView.css";

export const ToDoPresentationView = (): JSX.Element => {
  const { categories } = useAppSelector((state) => state.toDos);

  return (
    <main className="main-todo-presentation-view">
      <section className="categories">
        {categories.map((category) => {
          return (
            <ToDoPresentantionButton
              key={category.id}
              idCategory={category.id}
              category={category.category}
              icon={category.icon}
            ></ToDoPresentantionButton>
          );
        })}
      </section>
    </main>
  );
};
