'use client'; // Required for client-side interactivity in Next.js

interface ConfirmationModalProps {
  onDiscard: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ onDiscard, onCancel }: ConfirmationModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Unsaved Data</h4>
        <p>Do you want to discard the changes and switch to the new feature?</p>
        <button 
          className="btn btn-danger" 
          onClick={onDiscard}
          aria-label="Discard changes"
        >
          Discard
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onCancel}
          aria-label="Cancel and keep changes"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;