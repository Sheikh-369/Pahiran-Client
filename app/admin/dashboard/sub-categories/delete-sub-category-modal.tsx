"use client";
import React from "react";

interface DeleteSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subCategoryName?: string;
}

const DeleteSubCategoryModal: React.FC<DeleteSubCategoryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subCategoryName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Delete SubCategory</h2>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-600">
            {subCategoryName || "this subcategory"}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubCategoryModal;
