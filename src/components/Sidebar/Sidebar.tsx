import { Fragment } from "react/jsx-runtime";
import { FaPlus } from "react-icons/fa";

import type { JSX } from "react";

import ModalAddCategory from "@/components/ModalAddCategory/ModalAddCategory";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import Loader from "@/components/Loader/Loader";

import { useToDosStore } from "@/hooks/useToDosStore";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useMediaQuery } from "@/hooks/useMatchMedia";

import { MEDIA_QUERY_1024 } from "@/constants/vars";

import "@/components/Sidebar/Sidebar.css";

const Sidebar = (): JSX.Element => {
  const { toDosState, handleSetViewIdCategory } = useToDosStore();
  const { globalState, handleOpenSidebar, handleOpenModalAddCategory } = useGlobalStore();

  const { matches } = useMediaQuery(MEDIA_QUERY_1024);

  const onOpenCategoryToDo = (idCategory: string): void => {
    if (!matches) handleOpenSidebar();
    handleSetViewIdCategory(idCategory);
  };

  const handleClickOpenModalAddCategory: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleOpenModalAddCategory();
  };

  return (
    <header className="sidebar">
      {toDosState.loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="sidebar__header">
            <h2 className="sidebar__title">Die Redux ToDo</h2>
          </div>

          <nav className="sidebar__nav">
            <ul className="sidebar__list">
              {toDosState.categories.map((category, index) => {
                return (
                  <Fragment key={category.id}>
                    <SidebarItem
                      onOpenCategoryToDo={() => {
                        onOpenCategoryToDo(category.id);
                      }}
                      category={category.category}
                      icon={category.icon}
                      quantity={category.toDos.length}
                    ></SidebarItem>

                    {index === 2 && <hr className="sidebar__hr"></hr>}
                  </Fragment>
                );
              })}
            </ul>
          </nav>

          {globalState.modal.modalAddCategory && <ModalAddCategory></ModalAddCategory>}

          <button
            type="button"
            onClick={handleClickOpenModalAddCategory}
            aria-label="Add new category"
            className="sidebar__btn-open-modal-add-category"
          >
            <FaPlus className="sidebar__btn-open-modal-add-category-icon"></FaPlus>
          </button>
        </Fragment>
      )}
    </header>
  );
};

export default Sidebar;
