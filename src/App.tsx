import { useEffect, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

import { ToDoCategory } from "@src/entities/entities";

import { Alert } from "@src/components/Alert/Alert";
import { Sidebar } from "@src/components/Sidebar/Sidebar";

import { ToDoView } from "@src/views/ToDoView/ToDoView";
import { ToDoPresentationView } from "@src/views/ToDoPresentationView/ToDoPresentationView";

import { useMediaQuery } from "@src/hooks/useMatchMedia";
import { getCategoryById } from "@src/helpers/getCategoryById";
import { setLocalStorage } from "@src/helpers/setLocalStorage";
import { useAppSelector } from "@src/constants/redux";
import {
  LOCAL_STORAGE_KEY_CATEGORIES,
  MEDIA_QUERY_1024,
} from "@src/constants/config";

import "@src/App.css";
import "animate.css";

function App(): JSX.Element {
  const { alert } = useAppSelector((state) => state.global);
  const { categories, viewIdCategory } = useAppSelector((state) => state.toDos);

  const { matches } = useMediaQuery(MEDIA_QUERY_1024);

  const currentCategory: ToDoCategory = useMemo(() => {
    return getCategoryById(categories, viewIdCategory);
  }, [categories, viewIdCategory]);

  useEffect(() => {
    setLocalStorage(LOCAL_STORAGE_KEY_CATEGORIES, categories);
  }, [categories]);

  return (
    <Fragment>
      <Sidebar></Sidebar>

      {viewIdCategory && currentCategory && (
        <ToDoView
          idCategory={currentCategory.id}
          icon={currentCategory.icon}
          category={currentCategory.category}
          toDos={currentCategory.toDos}
        ></ToDoView>
      )}

      {matches && !viewIdCategory && (
        <ToDoPresentationView></ToDoPresentationView>
      )}

      {alert.message && <Alert></Alert>}
    </Fragment>
  );
}

export default App;
