import ToDoPresentantionButton from "@/components/ToDoPresentationButton/ToDoPresentantionButton";

import { useToDosStore } from "@/hooks/useToDosStore";

import "@/views/ToDoPresentationView/ToDoPresentationView.css";

const ToDoPresentationView = () => {
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

export default ToDoPresentationView;
