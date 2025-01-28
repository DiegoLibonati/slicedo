import { useMemo } from "react";
import { FaWindowClose } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { useForm } from "../../hooks/useForm";
import {
  closeModalManageToDo,
  displayAlert,
} from "../../store/global/globalSlice";
import {
  addToDo,
  editToDo,
  resetIdToDoToEdit,
} from "../../store/toDos/toDosSlice";
import { getToDoById } from "../../helpers/getToDoById";
import { useAppDispatch, useAppSelector } from "../../constants/redux";

import "./ModalManageToDo.css";

interface ModalManageToDoProps {
  idCategory: string;
  icon: string;
  category: string;
}

export const ModalManageToDo = ({
  idCategory,
  category,
  icon,
}: ModalManageToDoProps): JSX.Element => {
  const { categories, idToDoToEdit } = useAppSelector((state) => state.toDos);
  const dispatch = useAppDispatch();

  const toDo = useMemo(() => {
    const toDos =
      categories.find((category) => category.id === idCategory)?.toDos! || [];

    return getToDoById(toDos, idToDoToEdit);
  }, [categories, idToDoToEdit, idCategory]);

  const { onTextAreaChange, formState } = useForm<{ toDoContent: string }>({
    toDoContent: toDo?.content || "",
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!toDo) {
      const newToDo = {
        id: uuidv4(),
        content: formState.toDoContent,
        done: false,
      };

      dispatch(addToDo({ idCategory: idCategory, newToDo: newToDo }));

      dispatch(
        displayAlert({
          message: `${newToDo.id} was successfully added!`,
          type: "alert--good",
        })
      );
    } else {
      const toDoEdited = {
        id: toDo.id,
        content: formState.toDoContent,
        done: toDo.done,
      };

      dispatch(editToDo({ idCategory: idCategory, toDo: toDoEdited }));

      dispatch(
        displayAlert({
          message: `${toDo.id} was successfully edited!`,
          type: "alert--good",
        })
      );
    }

    dispatch(closeModalManageToDo());
    dispatch(resetIdToDoToEdit());
  };

  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(closeModalManageToDo());
    dispatch(resetIdToDoToEdit());
  };

  return (
    <div className="modal-manage-todo">
      <button
        type="button"
        aria-label="close modal"
        onClick={handleCloseModal}
        className="modal-manage-todo-btn-close"
      >
        <FaWindowClose className="modal-manage-todo-btn-close-icon"></FaWindowClose>
      </button>

      <form
        className="modal-manage-todo__form animate__animated animate__fadeIn"
        onSubmit={onSubmit}
      >
        <h2 className="modal-manage-todo__form-category">
          {icon}
          {category}
        </h2>
        <textarea
          name="toDoContent"
          placeholder="Insert a content..."
          onChange={onTextAreaChange}
          value={formState.toDoContent}
          className="modal-manage-todo__form-textarea"
        ></textarea>

        <button
          type="submit"
          aria-label="submit form"
          className="modal-manage-todo__form-submit"
        >
          {toDo ? "EDIT TODO" : "ADD TODO"}
        </button>
      </form>
    </div>
  );
};
