"use client";
import { fetchAllAdminProducts } from "@/lib/store/admin/product/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import AddProductModal from "./add-product-modal";
import { createProduct } from "@/lib/store/product/product-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminProductTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector(
    (state) => state.adminProductSlice
  );
  //adding product
  const [showModal, setShowModal] = useState(false);
  //search product
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllAdminProducts());
  }, [dispatch]);

const filteredProducts = product.filter((p) => {
  const name = p.productName?.toLowerCase() || "";
  const brand = p.productBrand?.toLowerCase() || "";
  const description = p.productDescription?.toLowerCase() || "";
  const search = searchTerm.toLowerCase();

  return name.includes(search) || brand.includes(search) || description.includes(search);
});


  return (
    <div className="p-6 bg-gray-50 min-h-screen text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          + Add Product
        </button>
        {showModal && (
          <AddProductModal
            onClose={() => setShowModal(false)}
            onSubmit={(newProduct) => dispatch(createProduct(newProduct))}
          />
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or brand..."
          className="w-full md:w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "",
                "Name",
                "Description",
                "Price",
                "Brand",
                "Stock",
                "Featured",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-gray-600 text-xs font-semibold uppercase tracking-wide"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="px-4 py-3">
                  <img
                    src={
                      typeof p.productImage === "string" ? p.productImage : ""
                    }
                    alt={p.productName}
                    className="w-10 h-10 object-cover rounded-md shadow-sm border border-gray-200"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {p.productName}
                </td>
                <td className="px-4 py-3 text-gray-600 truncate max-w-[180px]">
                  {p.productDescription}
                </td>
                <td className="px-4 py-3 text-gray-800 font-semibold">
                  ${p.productPrice}
                </td>
                <td className="px-4 py-3 text-gray-700">{p.productBrand}</td>
                <td className="px-4 py-3 text-gray-700">{p.productStock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      p.isFeatured
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.isFeatured ? "Yes" : "No"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button
                    aria-label="Edit"
                    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 focus:outline-none"
                  >
                    <EditIcon className="h-5 w-5" />
                  </button>

                  <button
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-600 transition-colors duration-200 focus:outline-none"
                  >
                    <DeleteIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-400 italic text-sm"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductTable;
