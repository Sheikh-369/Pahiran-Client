"use client";
import React from "react";
import { IAdminProductData } from "@/lib/store/admin/product/product-slice-type";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { deleteAdminProduct } from "@/lib/store/admin/product/product-slice";

interface DeleteProductModalProps {
  product: IAdminProductData;
  onClose: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();

  const handleConfirmDelete = () => {
    if (product.id) {
      dispatch(deleteAdminProduct(product.id));
      onClose(); // Close modal after dispatch
    }
  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Modal box */}
  <div className="bg-black text-white rounded-lg shadow-lg w-96 p-6">
    <h2 className="text-lg font-bold mb-4">Delete Product</h2>
    <p className="mb-6">
      Are you sure you want to delete <strong className="text-red-500">{product.productName}</strong>? This action cannot be undone.
    </p>
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-200 hover:bg-gray-700 transition"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmDelete}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  </div>
</div>


  );
};

export default DeleteProductModal;
