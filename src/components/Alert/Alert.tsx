import { AiOutlineCloseCircle } from "react-icons/ai";

import { useGlobalStore } from "@src/hooks/useGlobalStore";

import "@src/components/Alert/Alert.css";

export const Alert = (): JSX.Element => {
  const { globalState, handleResetAlert } = useGlobalStore();

  const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleResetAlert();
  };

  return (
    <div
      className={globalState.alert.message ? `alert ${globalState.alert.type}` : "alert"}
    >
      <h2 className="alert__text">{globalState.alert.message}</h2>
      <button
        type="button"
        onClick={handleClickClose}
        aria-label="close alert"
        className="alert__btn-close"
      >
        <AiOutlineCloseCircle className="alert__btn-close-icon"></AiOutlineCloseCircle>
      </button>
    </div>
  );
};
