import { ToDoPresentantionButton } from "@src/components/ToDoPresentationButton/ToDoPresentantionButton";

import { useToDosStore } from "@src/hooks/useToDosStore";

import "@src/views/ToDoPresentationView/ToDoPresentationView.css";

export const ToDoPresentationView = (): JSX.Element => {
  const { toDosState } = useToDosStore();

  return (
    <main className="main-todo-presentation-view">
      <section className="categories">
        {toDosState.categories.map((category) => {
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
