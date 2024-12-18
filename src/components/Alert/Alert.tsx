import { AiOutlineCloseCircle } from "react-icons/ai";

import { resetAlert } from "../../store/global/globalSlice";
import { useAppDispatch, useAppSelector } from "../../constants/redux";

import "./Alert.css";

export const Alert = (): JSX.Element => {
  const { alert } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(resetAlert());
  };

  return (
    <div
      className={
        alert.message ? `alert_container ${alert.type}` : "alert_container"
      }
    >
      <h2>{alert.message}</h2>
      <button type="button" onClick={handleClickClose} aria-label="close alert">
        <AiOutlineCloseCircle className="alert-close"></AiOutlineCloseCircle>
      </button>
    </div>
  );
};
