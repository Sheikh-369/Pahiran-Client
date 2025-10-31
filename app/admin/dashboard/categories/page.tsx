'use client';
import { createNewCategory, fetchAllCategories } from "@/lib/store/admin/category/category-slice";
import { ICategoryData } from "@/lib/store/admin/category/category-slice-type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CategoryDashboard = () => {
    const dispatch = useAppDispatch();
    const { categories, status } = useAppSelector((state) => state.categorySlice);
    const [showModal, setShowModal] = useState(false);
    const [categoryData, setCategoryData] = useState<ICategoryData>({ categoryName: "", categoryDescription: "" });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAllCategories() as any);
    }, [dispatch]);

    const handleCreateCategory = () => {
        if (categoryData.categoryName.trim()) {
            dispatch(createNewCategory(categoryData) as any);
            setShowModal(false);
            setCategoryData({ categoryName: "", categoryDescription: "" });
        } else {
            alert("Category name is required!");
        }
    };

    const handleDelete = (id: string) => {
        // Implement delete logic here
        alert(`Delete category with id: ${id}`);
    };

    const filteredCategories = categories.filter(cat =>
        cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                <button
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                    onClick={() => setShowModal(true)}
                >
                    Add Category
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full md:w-1/3 border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{cat.categoryName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{cat.categoryDescription || "-"}</td>
<td className="px-6 py-4 text-center flex justify-center gap-4">
  {/* Edit Icon */}
  <button
    onClick={() => alert(`Edit category with id: ${cat.id}`)}
    aria-label="Edit"
    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 focus:outline-none"
  >
    <EditIcon className="h-6 w-6" />
  </button>

  {/* Delete Icon */}
  <button
    onClick={() => handleDelete(cat.id!)}
    aria-label="Delete"
    className="text-red-500 hover:text-red-600 transition-colors duration-200 focus:outline-none"
  >
    <DeleteIcon className="h-6 w-6" />
  </button>
</td>

                            </tr>
                        ))}
                        {filteredCategories.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Add Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="w-full border px-3 py-2 mb-3 rounded focus:ring-2 focus:ring-indigo-500"
                            value={categoryData.categoryName}
                            onChange={(e) => setCategoryData({ ...categoryData, categoryName: e.target.value })}
                        />
                        <textarea
                            placeholder="Description (optional)"
                            className="w-full border px-3 py-2 mb-3 rounded focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setCategoryData({ ...categoryData, categoryDescription: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={handleCreateCategory}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDashboard;
