import { Fragment } from "react/jsx-runtime";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaRegPaperPlane } from "react-icons/fa";

import type { JSX } from "react";
import type { ToDoViewProps } from "@/types/props";

import Loader from "@/components/Loader/Loader";
import ModalManageToDo from "@/components/ModalManageToDo/ModalManageToDo";
import ToDoItem from "@/components/ToDoItem/ToDoItem";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

import "@/views/TodoView/ToDoView.css";

const ToDoView = ({ icon, idCategory, category, toDos }: ToDoViewProps): JSX.Element => {
  const { globalState, handleOpenModalManageToDo, handleCloseSidebar } = useGlobalStore();
  const { toDosState } = useToDosStore();

  const handleClickCloseSidebar: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleCloseSidebar();
  };

  const handleClickAddToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleOpenModalManageToDo();
  };

  return (
    <main
      className={
        globalState.sidebar.sidebarMobile
          ? "main-todo-view main-todo-view--sidebar-open animate__animated animate__fadeIn"
          : "main-todo-view animate__animated animate__fadeIn"
      }
    >
      {toDosState.loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <section className="category-header">
            <h2 className="category-header__name">
              {icon}
              {category.toUpperCase()}
            </h2>

            <h2 className="category-header__date">{new Date().toUTCString()}</h2>
            {globalState.sidebar.sidebarMobile && (
              <button
                type="button"
                onClick={handleClickCloseSidebar}
                aria-label="Close to-do view"
                className="category-header__btn-close"
              >
                <AiOutlineCloseCircle className="category-header__btn-close-icon"></AiOutlineCloseCircle>
              </button>
            )}
          </section>

          <hr className="category-hr"></hr>

          {toDos.length > 0 && (
            <section className="category-todos">
              {toDos.map((toDo) => {
                return (
                  <ToDoItem
                    key={toDo.id}
                    id={toDo.id}
                    content={toDo.content}
                    done={toDo.done}
                    idCategory={idCategory}
                    category={category}
                  ></ToDoItem>
                );
              })}
            </section>
          )}

          {globalState.modal.modalManageToDo && (
            <ModalManageToDo
              idCategory={idCategory}
              category={category}
              icon={icon}
            ></ModalManageToDo>
          )}

          {toDos.length > 0 ? (
            <button
              type="button"
              onClick={handleClickAddToDo}
              aria-label="Add new to-do"
              className="category-btn-add"
            >
              <FaPlus className="category-btn-add__icon"></FaPlus>
            </button>
          ) : (
            <section className="category-first-add">
              <h1 className="category-first-add__title">
                ADD YOUR FIRST TODO <br></br>IN {category.toUpperCase()}
              </h1>
              <button
                type="button"
                onClick={handleClickAddToDo}
                aria-label="Add your first to-do"
                className="category-first-add__btn-add"
              >
                <FaRegPaperPlane className="category-first-add__btn-add-icon"></FaRegPaperPlane>
              </button>
            </section>
          )}
        </Fragment>
      )}
    </main>
  );
};

export default ToDoView;
