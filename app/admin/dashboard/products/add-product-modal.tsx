import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { IAdminProductData } from "@/lib/store/admin/product/product-slice-type";
import { fetchAllCategories } from "@/lib/store/admin/category/category-slice";
import { fetchAllSubCategories } from "@/lib/store/admin/sub-category/sub-category-slice";


interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (product: IAdminProductData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categorySlice);
  const { subCategories } = useAppSelector((state) => state.subCategorySlice);

  const [formData, setFormData] = useState<IAdminProductData>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productBrand: "",
    productStock: 0,
    isFeatured: false,
    categoryId: "",
    subCategoryId: "",
    productImage: null,
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.productName || !formData.productPrice || !formData.categoryId) {
      alert("Please fill in product name, price, and category.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl animate-fadeIn">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h2>

    {/* Product Name */}
    <label className="block text-gray-700 font-medium mb-1">Product Name</label>
    <input
      type="text"
      name="productName"
      placeholder="Enter product name"
      className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      value={formData.productName}
      onChange={handleChange}
    />

    {/* Description */}
    <label className="block text-gray-700 font-medium mb-1">Description</label>
    <textarea
      name="productDescription"
      placeholder="Enter product description"
      className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      value={formData.productDescription}
      onChange={handleChange}
    />

    {/* Price and Stock */}
    <div className="flex gap-3 mb-3">
      <div className="w-1/2">
        <label className="block text-gray-700 font-medium mb-1">Price</label>
        <input
          type="number"
          name="productPrice"
          placeholder="0"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={formData.productPrice || 0}
          onChange={handleChange}
        />
      </div>
      <div className="w-1/2">
        <label className="block text-gray-700 font-medium mb-1">Stock</label>
        <input
          type="number"
          name="productStock"
          placeholder="0"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={formData.productStock || 0}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Brand */}
    <label className="block text-gray-700 font-medium mb-1">Brand (optional)</label>
    <input
      type="text"
      name="productBrand"
      placeholder="Enter brand"
      className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      value={formData.productBrand}
      onChange={handleChange}
    />

    {/* Category and Subcategory */}
    <div className="flex gap-3 mb-3">
      <div className="w-1/2">
        <label className="block text-gray-700 font-medium mb-1">Category</label>
        <select
          name="categoryId"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/2">
        <label className="block text-gray-700 font-medium mb-1">SubCategory</label>
        <select
          name="subCategoryId"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={formData.subCategoryId}
          onChange={handleChange}
        >
          <option value="">Select SubCategory</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.subCategoryName}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Image Upload */}
    <label className="block text-gray-700 font-medium mb-1">Product Image</label>
    <input
      type="file"
      name="productImage"
      className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
    />

    {/* Featured Checkbox */}
    <label className="flex items-center gap-2 mb-4 text-sm">
      <input
        type="checkbox"
        name="isFeatured"
        checked={formData.isFeatured}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600"
      />
      Featured Product
    </label>

    {/* Buttons */}
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Create Product
      </button>
    </div>
  </div>
</div>

  );
};

export default AddProductModal;
