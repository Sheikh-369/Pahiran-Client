'use client';
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { ISubCategoryData } from "@/lib/store/admin/sub-category/sub-category-slice-type";
import { createNewSubCategory, deleteSubCategory, fetchAllSubCategories, updateSubCategory } from "@/lib/store/admin/sub-category/sub-category-slice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditSubCategoryModal from "./edit-sub-category-modal";
import DeleteSubCategoryModal from "./delete-sub-category-modal";

const SubCategoryDashboard = () => {
  const dispatch = useAppDispatch();
  const { subCategories } = useAppSelector((state) => state.subCategorySlice);
  //add sub-category
  const [showModal, setShowModal] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState<ISubCategoryData>({ subCategoryName: "" });
  // edit sub-category
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategoryData | null>(null);
  //delete sub-category
  // delete sub-category
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<ISubCategoryData | null>(null);

  
  //search sub-category
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllSubCategories() as any);
  }, [dispatch]);

  const handleCreateSubCategory = () => {
    if (subCategoryData.subCategoryName.trim()) {
      dispatch(createNewSubCategory(subCategoryData) as any);
      setShowModal(false);
      setSubCategoryData({ subCategoryName: "" });
    } else {
      alert("Subcategory name is required!");
    }
  };

  const filteredSubCategories = subCategories.filter((sub) =>
    sub.subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    alert(`Delete subcategory with id: ${id}`);
  };

  return (
    <div className="p-6 bg-sky-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">SubCategories</h1>
        <button
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          onClick={() => setShowModal(true)}
        >
          + Add SubCategory
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search subcategories..."
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 bg-sky-300 rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-500 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-8 py-4 text-left font-semibold">Subcategory Name</th>
                <th className="px-8 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubCategories.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-indigo-50 transition-all border-b border-gray-100 last:border-none"
                >
                  <td className="px-8 py-4 text-gray-800 font-medium">{sub.subCategoryName}</td>
                  <td className="px-8 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedSubCategory(sub);
                          setShowEditModal(true);
                        }}
                        aria-label="Edit"
                        className="p-2 bg-sky-200 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      {/* Edit Modal */}
                      {showEditModal && (
                          <EditSubCategoryModal
                            isOpen={showEditModal}
                            onClose={() => setShowEditModal(false)}
                            subCategory={selectedSubCategory}
                            onSave={(updatedData) => {
                              if (selectedSubCategory?.id) {
                                dispatch(updateSubCategory(updatedData, selectedSubCategory.id) as any);
                                setShowEditModal(false);
                              }
                            }}
                          />
                        )}
                      <button
                        onClick={() => {
                          setSelectedToDelete(sub);
                          setShowDeleteModal(true);
                        }}
                        aria-label="Delete"
                        className="p-2 bg-sky-200 hover:bg-red-300 text-red-600 rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                      {/* Delete Modal */}
                      {showDeleteModal && (
                        <DeleteSubCategoryModal
                          isOpen={showDeleteModal}
                          onClose={() => setShowDeleteModal(false)}
                          subCategoryName={selectedToDelete?.subCategoryName}
                          onConfirm={() => {
                            if (selectedToDelete?.id) {
                              dispatch(deleteSubCategory(selectedToDelete.id) as any);
                              setShowDeleteModal(false);
                            }
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubCategories.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-6 text-gray-400">
                    No subcategories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Add SubCategory</h2>
            <input
              type="text"
              placeholder="SubCategory Name"
              className="w-full border px-3 py-2 mb-3 rounded focus:ring-2 focus:ring-indigo-500"
              value={subCategoryData.subCategoryName}
              onChange={(e) =>
                setSubCategoryData({ ...subCategoryData, subCategoryName: e.target.value })
              }
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={handleCreateSubCategory}
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

export default SubCategoryDashboard;
