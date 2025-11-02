"use client";
import React, { useState, useEffect } from "react";
import { ISubCategoryData } from "@/lib/store/admin/sub-category/sub-category-slice-type";

interface EditSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subCategory: ISubCategoryData | null;
  onSave: (updatedData: ISubCategoryData) => void;
}

const EditSubCategoryModal: React.FC<EditSubCategoryModalProps> = ({
  isOpen,
  onClose,
  subCategory,
  onSave,
}) => {
  const [formData, setFormData] = useState<ISubCategoryData>({
    subCategoryName: "",
  });

  useEffect(() => {
    if (subCategory) setFormData(subCategory);
  }, [subCategory]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (formData.subCategoryName.trim()) {
      onSave(formData);
    } else {
      alert("Subcategory name cannot be empty!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Edit SubCategory</h2>

        <input
          type="text"
          value={formData.subCategoryName || ""}
          onChange={(e) =>
            setFormData({ ...formData, subCategoryName: e.target.value })
          }
          className="w-full border px-3 py-2 mb-3 rounded focus:ring-2 focus:ring-indigo-500"
          placeholder="SubCategory Name"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategoryModal;
