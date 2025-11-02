"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { fetchAllUsers } from "@/lib/store/auth/auth-slice";

const AdminCustomerTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.authSlice);

  // search
  const [searchTerm, setSearchTerm] = useState("");

  // edit/delete modal placeholders (for later if you add modals)
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // user might not be an array if API changed structure — ensure safety
  const customers: IUserData[] = Array.isArray(user) ? user : [];

  const filteredUsers = customers.filter((u) => {
    const name = u.userName?.toLowerCase() || "";
    const email = u.userEmail?.toLowerCase() || "";
    const phone = u.userPhoneNumber?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return name.includes(search) || email.includes(search) || phone.includes(search);
  });

  return (
    <div className="p-6 bg-sky-100 min-h-screen text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers Dashboard</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          className="w-full md:w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-sky-200 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400">
            <tr>
              {["Name", "Email", "Phone", "Actions"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-gray-700 text-xs font-semibold uppercase tracking-wide"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-blue-300 transition duration-150 ease-in-out"
              >
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {u.userName || "—"}
                </td>
                <td className="px-4 py-3 text-gray-700">{u.userEmail}</td>
                <td className="px-4 py-3 text-gray-700">
                  {u.userPhoneNumber || "—"}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex justify-start gap-3">
                  <button
                    onClick={() => setSelectedUser(u)}
                    aria-label="Edit"
                    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 focus:outline-none"
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-600 transition-colors duration-200 focus:outline-none"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-400 italic text-sm"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomerTable;
