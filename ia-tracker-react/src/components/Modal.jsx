import Icon, { ICONS } from "./Icon";
import "./Modal.css";

const Modal = ({ title, onClose, children }) => {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdrop}>
      <div className="modal-box animate-scaleIn">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <Icon d={ICONS.plus} size={16} color="currentColor" strokeWidth={2.5}
              style={{ transform: "rotate(45deg)" }} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
