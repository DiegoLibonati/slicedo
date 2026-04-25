import type { JSX } from "react";

import PresentantionButton from "@/components/PresentationButton/PresentantionButton";

import { useToDosStore } from "@/hooks/useToDosStore";

import "@/views/PresentationView/PresentationView.css";

const PresentationView = (): JSX.Element => {
  const { toDosState } = useToDosStore();

  return (
    <main className="main-presentation-view">
      <section className="categories">
        {toDosState.categories.map((category) => {
          return (
            <PresentantionButton
              key={category.id}
              idCategory={category.id}
              category={category.category}
              icon={category.icon}
            ></PresentantionButton>
          );
        })}
      </section>
    </main>
  );
};

export default PresentationView;
