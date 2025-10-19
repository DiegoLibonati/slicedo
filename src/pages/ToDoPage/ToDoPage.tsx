import { useEffect, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

import { ToDoCategory } from "@src/entities/app";

import { Alert } from "@src/components/Alert/Alert";
import { Sidebar } from "@src/components/Sidebar/Sidebar";

import { ToDoView } from "@src/views/ToDoView/ToDoView";
import { ToDoPresentationView } from "@src/views/ToDoPresentationView/ToDoPresentationView";

import { useGlobalStore } from "@src/hooks/useGlobalStore";
import { useToDosStore } from "@src/hooks/useToDosStore";
import { useMediaQuery } from "@src/hooks/useMatchMedia";

import { getCategoryById } from "@src/helpers/getCategoryById";
import { setLocalStorage } from "@src/helpers/setLocalStorage";

import {
  LOCAL_STORAGE_KEY_CATEGORIES,
  MEDIA_QUERY_1024,
} from "@src/constants/vars";

import "@src/pages/ToDoPage/ToDoPage.css";

export const ToDoPage = () => {
  const { globalState } = useGlobalStore();
  const { toDosState } = useToDosStore();
  const { matches } = useMediaQuery(MEDIA_QUERY_1024);

  const currentCategory: ToDoCategory = useMemo(() => {
    return getCategoryById(toDosState.categories, toDosState.viewIdCategory);
  }, [toDosState.categories, toDosState.viewIdCategory]);

  useEffect(() => {
    setLocalStorage(LOCAL_STORAGE_KEY_CATEGORIES, toDosState.categories);
  }, [toDosState.categories]);

  return (
    <Fragment>
      <Sidebar></Sidebar>

      {toDosState.viewIdCategory && currentCategory && (
        <ToDoView
          idCategory={currentCategory.id}
          icon={currentCategory.icon}
          category={currentCategory.category}
          toDos={currentCategory.toDos}
        ></ToDoView>
      )}

      {matches && !toDosState.viewIdCategory && (
        <ToDoPresentationView></ToDoPresentationView>
      )}

      {globalState.alert.message && <Alert></Alert>}
    </Fragment>
  );
};
