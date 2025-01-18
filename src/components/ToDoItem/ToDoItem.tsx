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
import { displayAlert, openModalManageToDo } from "../../store/global/globalSlice";
import { useAppDispatch } from "../../constants/redux";

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
        type: "bad-alert",
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
        type: "good-alert",
      })
    );
  };

  return (
    <article
      className={
        toDo.done
          ? "todo done animate__animated animate__fadeIn"
          : "todo animate__animated animate__fadeIn"
      }
    >
      <div className="todo__header">
        {toDo.done && (
          <button
            type="button"
            onClick={handleClickUnDoneToDo}
            aria-label="undone todo"
          >
            <FaCalendarCheck className="icon__calendar-check"></FaCalendarCheck>
          </button>
        )}

        {!toDo.done && (
          <button
            type="button"
            onClick={handleClickDoneToDo}
            aria-label="done todo"
          >
            <FaCalendar className="icon__calendar"></FaCalendar>
          </button>
        )}

        <h3 className={toDo.done ? "todo__content--done" : "todo__content"}>
          {toDo.content}
        </h3>
      </div>

      <div className="todo__options">
        <button
          type="button"
          onClick={handleClickRemoveToDo}
          aria-label="remove todo"
        >
          <FaTrash
            className={toDo.done ? "icon__todo icon__todo-done" : "icon__todo"}
          ></FaTrash>
        </button>

        {!toDo.done && (
          <button type="button" onClick={handleEditToDo} aria-label="edit todo">
            <FaEdit className="icon__todo"></FaEdit>
          </button>
        )}

        {idCategory !== "important" && !done && (
          <button
            type="button"
            onClick={handleMoveToImportant}
            aria-label="move todo to important"
          >
            <FaStar className="icon__todo"></FaStar>
          </button>
        )}
      </div>
    </article>
  );
};
