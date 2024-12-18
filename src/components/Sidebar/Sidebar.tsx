import { Fragment } from "react/jsx-runtime";
import { FaPlus } from "react-icons/fa";

import { ModalAddCategory } from "../ModalAddCategory/ModalAddCategory";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { Loader } from "../Loader/Loader";

import {
  openModalAddCategory,
  openSidebar,
} from "../../store/global/globalSlice";
import { setViewIdCategory } from "../../store/toDos/toDosSlice";
import { useMediaQuery } from "../../hooks/useMatchMedia";
import { useAppSelector, useAppDispatch } from "../../constants/redux";
import { MEDIA_QUERY_1024 } from "../../constants/config";

import "./sidebar.css";

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
    <header className="header_container">
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="sidebar_title">
            <h2>Die Redux ToDo</h2>
          </div>

          <nav className="sidebar_nav">
            <ul className="sidebar_nav_list">
              {categories.map((category, index) => {
                return (
                  <Fragment key={category.id}>
                    <SidebarItem
                      onOpenCategoryToDo={() => onOpenCategoryToDo(category.id)}
                      category={category.category}
                      icon={category.icon}
                      quantity={category.toDos.length}
                    ></SidebarItem>

                    {index === 2 && <hr className="hr-sidebar"></hr>}
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
          >
            <FaPlus className="add-category"></FaPlus>
          </button>
        </Fragment>
      )}
    </header>
  );
};
