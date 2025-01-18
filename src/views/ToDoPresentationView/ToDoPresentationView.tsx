import { ToDoPresentantionButton } from "../../components/ToDoPresentationButton/ToDoPresentantionButton";

import { useAppSelector } from "../../constants/redux";

import "./todopresentation.css";

export const ToDoPresentationView = (): JSX.Element => {
  const { categories } = useAppSelector((state) => state.toDos);

  return (
    <main className="main__presentation">
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
