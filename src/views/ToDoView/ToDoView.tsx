import { Fragment } from "react/jsx-runtime";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaRegPaperPlane } from "react-icons/fa";

import { ToDo } from "../../entities/entities";

import { Loader } from "../../components/Loader/Loader";
import { ModalManageToDo } from "../../components/ModalManageToDo/ModalManageToDo";
import { ToDoItem } from "../../components/ToDoItem/ToDoItem";

import {
  closeSidebar,
  openModalManageToDo,
} from "../../store/global/globalSlice";
import { useAppDispatch, useAppSelector } from "../../constants/redux";

import "./todo.css";

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
          ? "main_container open-sidebar animate__animated animate__fadeIn"
          : "main_container animate__animated animate__fadeIn"
      }
    >
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <section className="todo_title">
            <h2>
              {icon}
              {category.toUpperCase()}
            </h2>

            <h2 className="dateString-Date">{new Date().toUTCString()}</h2>
            {sidebar.sidebarMobile && (
              <button
                type="button"
                onClick={handleClickCloseSidebar}
                aria-label="close sidebar"
              >
                <AiOutlineCloseCircle className="todo-icon close-icon"></AiOutlineCloseCircle>
              </button>
            )}
          </section>

          <hr className="hr-todo"></hr>

          {toDos.length > 0 && (
            <section className="todos_container">
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
            >
              <FaPlus className="add_todo"></FaPlus>
            </button>
          ) : (
            <section className="add_first_todo_container">
              <h1>
                ADD YOUR FIRST TODO <br></br>IN {category.toUpperCase()}
              </h1>
              <button
                type="button"
                onClick={handleClickAddToDo}
                aria-label="add todo"
              >
                <FaRegPaperPlane className="plane-todo-icon"></FaRegPaperPlane>
              </button>
            </section>
          )}
        </Fragment>
      )}
    </main>
  );
};
