import { FaTrash, FaEdit, FaStar, FaCalendar, FaCalendarCheck } from "react-icons/fa";

import type { JSX } from "react";
import type { ToDo } from "@/types/app";
import type { ToDoItemProps } from "@/types/props";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

import "@/components/ToDoItem/ToDoItem.css";

const ToDoItem = ({ id, content, done, idCategory, category }: ToDoItemProps): JSX.Element => {
  const { handleDisplayAlert, handleOpenModalManageToDo } = useGlobalStore();
  const { handleDoneToDo, handleRemoveToDo, handleSetEditToDo, handleGoToImportantToDo } =
    useToDosStore();

  const toDo: ToDo = {
    id: id,
    content: content,
    done: done,
  };

  const handleClickUnDoneToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleDoneToDo(idCategory, toDo.id);
  };

  const handleClickDoneToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleDoneToDo(idCategory, toDo.id);
  };

  const handleClickRemoveToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleRemoveToDo(idCategory, toDo.id);
    handleDisplayAlert(`${toDo.id} was successfully removed from ${category}!`, "alert--bad");
  };

  const handleEditToDo: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleSetEditToDo(toDo.id);
    handleOpenModalManageToDo();
  };

  const handleMoveToImportant: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleGoToImportantToDo(idCategory, toDo);
    handleDisplayAlert(`${toDo.id} was successfully moved to Important!`, "alert--good");
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
            aria-label="Mark to-do as incomplete"
            className="todo-item__btn-undone"
          >
            <FaCalendarCheck className="todo-item__btn-undone-icon"></FaCalendarCheck>
          </button>
        )}

        {!toDo.done && (
          <button
            type="button"
            onClick={handleClickDoneToDo}
            aria-label="Mark to-do as complete"
            className="todo-item__btn-done"
          >
            <FaCalendar className="todo-item__btn-done-icon"></FaCalendar>
          </button>
        )}

        <h3 className={toDo.done ? "todo-item__content--done" : "todo-item__content"}>
          {toDo.content}
        </h3>
      </div>

      <div className="todo-item__options">
        <button
          type="button"
          onClick={handleClickRemoveToDo}
          aria-label="Delete to-do"
          className="todo-item__btn-remove"
        >
          <FaTrash
            className={
              toDo.done ? "todo-item__btn-remove-icon--done" : "todo-item__btn-remove-icon"
            }
          ></FaTrash>
        </button>

        {!toDo.done && (
          <button
            type="button"
            onClick={handleEditToDo}
            aria-label="Edit to-do"
            className="todo-item__btn-edit"
          >
            <FaEdit className="todo-item__btn-edit-icon"></FaEdit>
          </button>
        )}

        {idCategory !== "important" && !done && (
          <button
            type="button"
            onClick={handleMoveToImportant}
            aria-label="Move to-do to Important"
            className="todo-item__btn-move-important"
          >
            <FaStar className="todo-item__btn-move-important-icon"></FaStar>
          </button>
        )}
      </div>
    </article>
  );
};

export default ToDoItem;
