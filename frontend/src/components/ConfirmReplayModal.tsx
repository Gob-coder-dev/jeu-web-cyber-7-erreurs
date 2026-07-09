import { useTranslation } from "../i18n/useTranslation";
import "./ConfirmReplayModal.css";

type ConfirmReplayModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmReplayModal({
  onCancel,
  onConfirm,
}: ConfirmReplayModalProps) {
  const t = useTranslation();

  return (
    <div className="replay-modal-overlay" onClick={onCancel}>
      <div className="replay-modal" onClick={(event) => event.stopPropagation()}>
        <h2>{t.replayModal.title}</h2>

        <p>
          {t.replayModal.body}
        </p>

        <div className="replay-modal__actions">
          <button
            className="button confirm-replay-modal__button--cancel"
            type="button"
            onClick={onCancel}
          >
            {t.replayModal.cancel}
          </button>

          <button
            className="button confirm-replay-modal__button--play"
            type="button"
            onClick={onConfirm}
          >
            {t.replayModal.play}
          </button>
        </div>
      </div>
    </div>
  );
}
