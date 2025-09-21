import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Picker, { IEmojiData } from "emoji-picker-react";
import { v4 as uuidv4 } from "uuid";

import { ToDoCategory } from "@src/entities/entities";

import {
  closeModalAddCategory,
  displayAlert,
} from "@src/store/global/globalSlice";
import { newCategoryToDo } from "@src/store/toDos/toDosSlice";
import { useForm } from "@src/hooks/useForm";

import { useAppDispatch } from "@src/constants/redux";

import "@src/components/ModalAddCategory/ModalAddCategory.css";

export const ModalAddCategory = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

  const { formState, onInputChange, onResetForm } = useForm<{
    categoryName: string;
  }>({
    categoryName: "",
  });

  const onEmojiClick: (
    event: React.MouseEvent<Element, MouseEvent>,
    data: IEmojiData
  ) => void = (_, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(closeModalAddCategory());
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const emoji = chosenEmoji?.emoji;
    const categoryName = formState.categoryName;

    const category: ToDoCategory = {
      id: uuidv4(),
      category: categoryName,
      toDos: [],
      icon: emoji!,
    };

    dispatch(newCategoryToDo(category));

    onResetForm();

    dispatch(
      displayAlert({
        message: `${emoji} ${categoryName} was successfully added!`,
        type: "alert--good",
      })
    );
    dispatch(closeModalAddCategory());
  };

  return (
    <div className="modal-add-category">
      <button
        type="button"
        onClick={handleClickClose}
        aria-label="close modal add category"
        className="modal-add-category__btn-close"
      >
        <FaWindowClose className="modal-add-category__btn-close-icon"></FaWindowClose>
      </button>
      <form
        className="modal-add-category__form animate__animated animate__fadeIn"
        onSubmit={onSubmit}
      >
        <Picker onEmojiClick={onEmojiClick} />
        <input
          className="modal-add-category__form-input"
          placeholder="Category Name"
          onChange={onInputChange}
          name="categoryName"
          value={formState.categoryName}
        ></input>
        <button
          className="modal-add-category__form-btn-create"
          type="submit"
          aria-label="create category"
        >
          CREATE
        </button>
      </form>
    </div>
  );
};
