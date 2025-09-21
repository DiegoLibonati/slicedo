import { Fragment } from "react/jsx-runtime";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaRegPaperPlane } from "react-icons/fa";

import { ToDo } from "@src/entities/entities";

import { Loader } from "@src/components/Loader/Loader";
import { ModalManageToDo } from "@src/components/ModalManageToDo/ModalManageToDo";
import { ToDoItem } from "@src/components/ToDoItem/ToDoItem";

import {
  closeSidebar,
  openModalManageToDo,
} from "@src/store/global/globalSlice";
import { useAppDispatch, useAppSelector } from "@src/constants/redux";

import "@src/views/TodoView/ToDoView.css";

interface ToDoViewProps {
  icon: string;
  idCategory: string;
  category: string;
  toDos: ToDo[];
}

export const ToDoView = ({
  icon,
  idCategory,
  category,
  toDos,
}: ToDoViewProps): JSX.Element => {
  const { sidebar, modal } = useAppSelector((state) => state.global);
  const { loading } = useAppSelector((state) => state.toDos);
  const dispatch = useAppDispatch();

  const handleClickCloseSidebar: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(closeSidebar());
  };

  const handleClickAddToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(openModalManageToDo());
  };

  return (
    <main
      className={
        sidebar.sidebarMobile
          ? "main-todo-view main-todo-view--sidebar-open animate__animated animate__fadeIn"
          : "main-todo-view animate__animated animate__fadeIn"
      }
    >
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <section className="category-header">
            <h2 className="category-header__name">
              {icon}
              {category.toUpperCase()}
            </h2>

            <h2 className="category-header__date">
              {new Date().toUTCString()}
            </h2>
            {sidebar.sidebarMobile && (
              <button
                type="button"
                onClick={handleClickCloseSidebar}
                aria-label="close sidebar"
                className="category-header__btn-close"
              >
                <AiOutlineCloseCircle className="category-header__btn-close-icon"></AiOutlineCloseCircle>
              </button>
            )}
          </section>

          <hr className="category-hr"></hr>

          {toDos.length > 0 && (
            <section className="category-todos">
              {toDos?.map((toDo) => {
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

          {modal.modalManageToDo && (
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
              aria-label="add todo"
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
                aria-label="add todo"
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
