import {
  FaTrash,
  FaEdit,
  FaStar,
  FaCalendar,
  FaCalendarCheck,
} from "react-icons/fa";

import { ToDo } from "../../entities/entities";

import {
  doneToDo,
  goToImportantToDo,
  setEditToDo,
  removeToDo,
} from "../../store/toDos/toDosSlice";
import {
  displayAlert,
  openModalManageToDo,
} from "../../store/global/globalSlice";
import { useAppDispatch } from "../../constants/redux";

import "./ToDoItem.css";

interface ToDoItemProps {
  id: string;
  content: string;
  done: boolean;
  idCategory: string;
  category: string;
}

export const ToDoItem = ({
  id,
  content,
  done,
  idCategory,
  category,
}: ToDoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const toDo: ToDo = {
    id: id,
    content: content,
    done: done,
  };

  const handleClickUnDoneToDo: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(doneToDo({ idCategory: idCategory, idToDo: toDo.id }));
  };

  const handleClickDoneToDo: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(doneToDo({ idCategory: idCategory, idToDo: toDo.id }));
  };

  const handleClickRemoveToDo: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(removeToDo({ idCategory: idCategory, idToDo: toDo.id }));
    dispatch(
      displayAlert({
        message: `${toDo.id} was successfully removed from ${category}!`,
        type: "alert--bad",
      })
    );
  };

  const handleEditToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setEditToDo(toDo.id));
    dispatch(openModalManageToDo());
  };

  const handleMoveToImportant: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(goToImportantToDo({ idCategory: idCategory, toDo: toDo }));
    dispatch(
      displayAlert({
        message: `${toDo.id} was successfully moved to Important!`,
        type: "alert--good",
      })
    );
  };

  return (
    <article
      className={
        toDo.done
          ? "todo-item todo-item--done animate__animated animate__fadeIn"
          : "todo-item animate__animated animate__fadeIn"
      }
    >
      <div className="todo-item__header">
        {toDo.done && (
          <button
            type="button"
            onClick={handleClickUnDoneToDo}
            aria-label="undone todo"
            className="todo-item__header-btn-undone"
          >
            <FaCalendarCheck className="todo-item__header-btn-undone-icon"></FaCalendarCheck>
          </button>
        )}

        {!toDo.done && (
          <button
            type="button"
            onClick={handleClickDoneToDo}
            aria-label="done todo"
            className="todo-item__header-btn-done"
          >
            <FaCalendar className="todo-item__header-btn-done-icon"></FaCalendar>
          </button>
        )}

        <h3
          className={
            toDo.done
              ? "todo-item__header-content--done"
              : "todo-item__header-content"
          }
        >
          {toDo.content}
        </h3>
      </div>

      <div className="todo-item__options">
        <button
          type="button"
          onClick={handleClickRemoveToDo}
          aria-label="remove todo"
          className="todo-item__options-btn-remove"
        >
          <FaTrash
            className={
              toDo.done
                ? "todo-item__options-btn-remove-icon--done"
                : "todo-item__options-btn-remove-icon"
            }
          ></FaTrash>
        </button>

        {!toDo.done && (
          <button
            type="button"
            onClick={handleEditToDo}
            aria-label="edit todo"
            className="todo-item__options-btn-edit"
          >
            <FaEdit className="todo-item__options-btn-edit-icon"></FaEdit>
          </button>
        )}

        {idCategory !== "important" && !done && (
          <button
            type="button"
            onClick={handleMoveToImportant}
            aria-label="move todo to important"
            className="todo-item__options-btn-move-important"
          >
            <FaStar className="todo-item__options-btn-move-important-icon"></FaStar>
          </button>
        )}
      </div>
    </article>
  );
};
