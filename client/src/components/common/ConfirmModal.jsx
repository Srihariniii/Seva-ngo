import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDestructive = true,
  loading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="text-center sm:text-left">
        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDestructive ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-secondary py-2.5 text-sm"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm transition-all focus:outline-none disabled:opacity-50 ${
              isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-seva-600 hover:bg-seva-700'
            }`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
