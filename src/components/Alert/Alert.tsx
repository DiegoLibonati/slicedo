import { AiOutlineCloseCircle } from "react-icons/ai";

import { resetAlert } from "@src/store/global/globalSlice";
import { useAppDispatch, useAppSelector } from "@src/constants/redux";

import "@src/components/Alert/Alert.css";

export const Alert = (): JSX.Element => {
  const { alert } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(resetAlert());
  };

  return (
    <div className={alert.message ? `alert ${alert.type}` : "alert"}>
      <h2 className="alert__text">{alert.message}</h2>
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
