import { Fragment } from "react/jsx-runtime";
import { FaPlus } from "react-icons/fa";

import { ModalAddCategory } from "@src/components/ModalAddCategory/ModalAddCategory";
import { SidebarItem } from "@src/components/SidebarItem/SidebarItem";
import { Loader } from "@src/components/Loader/Loader";

import {
  openModalAddCategory,
  openSidebar,
} from "@src/store/global/globalSlice";
import { setViewIdCategory } from "@src/store/toDos/toDosSlice";
import { useMediaQuery } from "@src/hooks/useMatchMedia";
import { useAppSelector, useAppDispatch } from "@src/constants/redux";
import { MEDIA_QUERY_1024 } from "@src/constants/config";

import "@src/components/Sidebar/Sidebar.css";

export const Sidebar = (): JSX.Element => {
  const { categories, loading } = useAppSelector((state) => state.toDos);
  const { modal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const { matches } = useMediaQuery(MEDIA_QUERY_1024);

  const onOpenCategoryToDo = (idCategory: string): void => {
    if (!matches) dispatch(openSidebar());
    dispatch(setViewIdCategory(idCategory));
  };

  const handleClickOpenModalAddCategory: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(openModalAddCategory());
  };

  return (
    <header className="sidebar">
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="sidebar__header">
            <h2 className="sidebar__title">Die Redux ToDo</h2>
          </div>

          <nav className="sidebar__nav">
            <ul className="sidebar__list">
              {categories.map((category, index) => {
                return (
                  <Fragment key={category.id}>
                    <SidebarItem
                      onOpenCategoryToDo={() => onOpenCategoryToDo(category.id)}
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

          {modal.modalAddCategory && <ModalAddCategory></ModalAddCategory>}

          <button
            type="button"
            onClick={handleClickOpenModalAddCategory}
            aria-label="open modal add category"
            className="sidebar__btn-open-modal-add-category"
          >
            <FaPlus className="sidebar__btn-open-modal-add-category-icon"></FaPlus>
          </button>
        </Fragment>
      )}
    </header>
  );
};
