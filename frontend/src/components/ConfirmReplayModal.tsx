import "./ConfirmReplayModal.css";

type ConfirmReplayModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmReplayModal({
  onCancel,
  onConfirm,
}: ConfirmReplayModalProps) {
  return (
    <div className="replay-modal-overlay" onClick={onCancel}>
      <div className="replay-modal" onClick={(event) => event.stopPropagation()}>
        <h2>Rejouer ce scénario ?</h2>

        <p>
          Tu as déjà terminé ce scénario. Cette nouvelle tentative ne
          modifiera pas ton premier score ni ton score global.
        </p>

        <div className="replay-modal__actions">
          <button
            className="button confirm-replay-modal__button--cancel"
            type="button"
            onClick={onCancel}
          >
            Annuler
          </button>

          <button
            className="button confirm-replay-modal__button--play"
            type="button"
            onClick={onConfirm}
          >
            Jouer
          </button>
        </div>
      </div>
    </div>
  );
}
