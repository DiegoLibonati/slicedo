import { useMemo } from "react";
import { FaWindowClose } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { ModalManageToDoProps } from "@/types/props";

import { useToDosStore } from "@/hooks/useToDosStore";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useForm } from "@/hooks/useForm";

import { getToDoById } from "@/helpers/getToDoById";

import "@/components/ModalManageToDo/ModalManageToDo.css";

const ModalManageToDo = ({ idCategory, category, icon }: ModalManageToDoProps) => {
  const { toDosState, handleResetIdToDoToEdit, handleAddToDo, handleEditToDo } = useToDosStore();
  const { handleDisplayAlert, handleCloseModalManageToDo } = useGlobalStore();

  const toDo = useMemo(() => {
    const toDos = toDosState.categories.find((category) => category.id === idCategory)?.toDos ?? [];

    return getToDoById(toDos, toDosState.idToDoToEdit);
  }, [toDosState.categories, toDosState.idToDoToEdit, idCategory]);

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

      handleAddToDo(idCategory, newToDo);
      handleDisplayAlert(`${newToDo.id} was successfully added!`, "alert--good");
    } else {
      const toDoEdited = {
        id: toDo.id,
        content: formState.toDoContent,
        done: toDo.done,
      };

      handleEditToDo(idCategory, toDoEdited);
      handleDisplayAlert(`${toDo.id} was successfully edited!`, "alert--good");
    }

    handleCloseModalManageToDo();
    handleResetIdToDoToEdit();
  };

  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleCloseModalManageToDo();
    handleResetIdToDoToEdit();
  };

  return (
    <div className="modal-manage-todo">
      <button
        type="button"
        aria-label="Close to-do dialog"
        onClick={handleCloseModal}
        className="modal-manage-todo__btn-close"
      >
        <FaWindowClose className="modal-manage-todo__btn-close-icon"></FaWindowClose>
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
          aria-label={toDo ? "Save to-do edits" : "Add new to-do"}
          className="modal-manage-todo__form-submit"
        >
          {toDo ? "EDIT TODO" : "ADD TODO"}
        </button>
      </form>
    </div>
  );
};

export default ModalManageToDo;
