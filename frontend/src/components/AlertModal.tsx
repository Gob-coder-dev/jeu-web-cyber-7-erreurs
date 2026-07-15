import "./AlertModal.css";

type AlertModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  type?: "error" | "success" | "warning";
};

function AlertModal({ title, message, onClose, type = "error" }: AlertModalProps) {
  return (
    <div className="alert-modal__overlay" onClick={onClose}>
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-modal__content alert-modal__content--${type}`}>
          <h2 className="alert-modal__title">{title}</h2>
          <p className="alert-modal__message">{message}</p>
          <button className="alert-modal__button" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
