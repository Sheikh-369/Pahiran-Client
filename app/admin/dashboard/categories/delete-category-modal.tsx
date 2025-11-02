"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { deleteCategory } from "@/lib/store/admin/category/category-slice"; // adjust path

interface Props {
  categoryId: string | undefined;
  categoryName?: string | null;
  onClose: () => void;
}

const DeleteCategoryModal: React.FC<Props> = ({ categoryId, categoryName, onClose }) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // close on ESC
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleDelete = async () => {
    if (!categoryId) {
      setError("Category id missing.");
      return;
    }

    setError(null);
    setIsDeleting(true);
    try {
      // dispatch returns a promise — await it so we can show loading
      await dispatch(deleteCategory(categoryId) as any);
      // the thunk already refreshes categories; close modal
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete. Try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* click outside to close — using an absolute backdrop but transparent so page remains visible */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Delete Category</h3>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete{" "}
          <strong className="text-red-600">{categoryName ?? "this category"}</strong>?
          This action cannot be undone.
        </p>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
