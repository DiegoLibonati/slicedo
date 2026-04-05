import type { UseGlobalStore } from "@/types/hooks";

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

  const handleResetAlert = (): void => {
    dispatch(resetAlert());
  };

  const handleCloseModalAddCategory = (): void => {
    dispatch(closeModalAddCategory());
  };

  const handleDisplayAlert = (message: string, type: string): void => {
    dispatch(
      displayAlert({
        message: message,
        type: type,
      })
    );
  };

  const handleCloseModalManageToDo = (): void => {
    dispatch(closeModalManageToDo());
  };

  const handleOpenSidebar = (): void => {
    dispatch(openSidebar());
  };

  const handleCloseSidebar = (): void => {
    dispatch(closeSidebar());
  };

  const handleOpenModalAddCategory = (): void => {
    dispatch(openModalAddCategory());
  };

  const handleOpenModalManageToDo = (): void => {
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
