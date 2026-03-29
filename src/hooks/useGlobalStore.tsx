import { UseGlobalStore } from "@/types/hooks";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import {
  closeModalAddCategory,
  closeModalManageToDo,
  closeSidebar,
  displayAlert,
  openModalAddCategory,
  openModalManageToDo,
  openSidebar,
  resetAlert,
} from "@/features/global/globalSlice";

export const useGlobalStore = (): UseGlobalStore => {
  const globalState = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const handleResetAlert = () => {
    dispatch(resetAlert());
  };

  const handleCloseModalAddCategory = () => {
    dispatch(closeModalAddCategory());
  };

  const handleDisplayAlert = (message: string, type: string) => {
    dispatch(
      displayAlert({
        message: message,
        type: type,
      })
    );
  };

  const handleCloseModalManageToDo = () => {
    dispatch(closeModalManageToDo());
  };

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleOpenModalAddCategory = () => {
    dispatch(openModalAddCategory());
  };

  const handleOpenModalManageToDo = () => {
    dispatch(openModalManageToDo());
  };

  return {
    globalState: globalState,
    handleResetAlert: handleResetAlert,
    handleCloseModalAddCategory: handleCloseModalAddCategory,
    handleDisplayAlert: handleDisplayAlert,
    handleCloseModalManageToDo: handleCloseModalManageToDo,
    handleOpenSidebar: handleOpenSidebar,
    handleCloseSidebar: handleCloseSidebar,
    handleOpenModalAddCategory: handleOpenModalAddCategory,
    handleOpenModalManageToDo: handleOpenModalManageToDo,
  };
};
