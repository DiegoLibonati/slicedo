import { useEffect, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

import type { JSX } from "react";

import Alert from "@/components/Alert/Alert";
import Sidebar from "@/components/Sidebar/Sidebar";

import ToDoView from "@/views/ToDoView/ToDoView";
import ToDoPresentationView from "@/views/ToDoPresentationView/ToDoPresentationView";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";
import { useMediaQuery } from "@/hooks/useMatchMedia";

import { getCategoryById } from "@/helpers/getCategoryById";
import { setLocalStorage } from "@/helpers/setLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES, MEDIA_QUERY_1024 } from "@/constants/vars";

import "@/pages/ToDoPage/ToDoPage.css";

const ToDoPage = (): JSX.Element => {
  const { globalState } = useGlobalStore();
  const { toDosState } = useToDosStore();
  const { matches } = useMediaQuery(MEDIA_QUERY_1024);

  const currentCategory = useMemo(() => {
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

      {matches && !toDosState.viewIdCategory && <ToDoPresentationView></ToDoPresentationView>}

      {globalState.alert.message && <Alert></Alert>}
    </Fragment>
  );
};

export default ToDoPage;
