import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "Confirm"}>
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-danger" />
        </div>
        <p className="text-text-primary dark:text-text-primary-dark font-medium mb-2">{message || "Are you sure?"}</p>
        <p className="text-text-secondary dark:text-text-secondary-dark text-sm mb-6">This action cannot be undone.</p>
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} className="btn-danger flex-1">Delete</button>
        </div>
      </div>
    </Modal>
  );
}
