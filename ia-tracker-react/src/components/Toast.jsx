import { useEffect } from "react";
import Icon, { ICONS } from "./Icon";
import "./Toast.css";

const Toast = ({ message, type = "ok", onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast toast--${type}`}>
      <Icon
        d={type === "error" ? ICONS.alert : ICONS.check}
        size={15}
        color={type === "error" ? "var(--red)" : "var(--green)"}
      />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
