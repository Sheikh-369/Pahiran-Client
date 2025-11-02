"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { ICategoryData } from "@/lib/store/admin/category/category-slice-type";
import { updateCategory } from "@/lib/store/admin/category/category-slice";

interface EditCategoryModalProps {
  category: ICategoryData;
  closeModal: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, closeModal }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ICategoryData>({
    categoryName: category.categoryName,
    categoryDescription: category.categoryDescription ?? ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!category.id) {
      console.error("Category ID is missing — cannot update.");
      return;
    }

    dispatch(updateCategory(formData, category.id));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Category</h2>

        {/* Category Name */}
        <label className="text-sm font-medium">Category Name</label>
        <input
          type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1 mb-3"
          placeholder="Enter category name"
        />

        {/* Category Description */}
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="categoryDescription"
          value={formData.categoryDescription ?? ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mt-1 mb-4"
          placeholder="Enter description"
          rows={4}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
