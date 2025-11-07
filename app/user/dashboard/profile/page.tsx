// "use client";

// import React, { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/lib/store/hooks/hooks";
// import { PencilIcon, CameraIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
// import { fetchCurrentUser, updateUserProfile } from "@/lib/store/auth/auth-slice";
// import { myOrders } from "@/lib/store/user/my-orders/my-orders-slice";
// import { fetchCartItems } from "@/lib/store/user/cart/cart-slice";

// interface UserProfileForm {
//   userName: string;
//   userPhoneNumber: string;
//   bio: string;
// }

// export default function UserProfilePage() {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.authSlice);
//   //orders + cart items fetching
//   const { orders } = useAppSelector((state) => state.myOrdersSlice);
//   const { items: cartItems } = useAppSelector((state) => state.cartSlice);

//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState<UserProfileForm>({
//     userName: user?.userName || "",
//     userPhoneNumber: user?.userPhoneNumber || "",
//     bio: user?.bio || "",
//   });

//   useEffect(() => {
//     if (user?.id) 
//         dispatch(fetchCurrentUser(user.id));
//         dispatch(myOrders());
//         dispatch(fetchCartItems());
//   }, [dispatch, user?.id]);

//   useEffect(() => {
//     setForm({
//       userName: user?.userName || "",
//       userPhoneNumber: user?.userPhoneNumber || "",
//       bio: user?.bio || "",
//     });
//   }, [user]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     if (!user?.id) return;
//     const formData = new FormData();
//     formData.append("userName", form.userName);
//     formData.append("userPhoneNumber", form.userPhoneNumber);
//     formData.append("bio", form.bio);

//     await dispatch(updateUserProfile(user.id, formData));
//     setEditing(false);
//   };

//   const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fileList = e.target.files;
//     if (!fileList || fileList.length === 0 || !user?.id) return;

//     const file = fileList[0];
//     const formData = new FormData();
//     formData.append("profileImage", file);

//     await dispatch(updateUserProfile(user.id, formData));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">
//       {/* PROFILE HEADER */}
//       <div className="relative bg-linear-to-r from-purple-600 to-indigo-500 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
//         {/* Avatar */}
//         <div className="relative">
//           <div className="w-40 h-40 rounded-full p-1 bg-linear-to-tr from-yellow-400 via-red-500 to-pink-500">
//             <img
//               src={user?.profileImage || "/placeholder-avatar.png"}
//               alt="Profile"
//               className="w-full h-full object-cover rounded-full border-4 border-white"
//             />
//           </div>
//           <label className="absolute bottom-2 right-2 bg-white text-purple-600 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
//             <CameraIcon className="w-5 h-5" />
//             <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
//           </label>
//         </div>

//         {/* Info */}
//         <div className="flex-1 text-center md:text-left space-y-2">
//           <h2 className="text-4xl font-bold">{user?.userName || "User Name"}</h2>
//           <p className="text-sm font-medium opacity-80">{user?.userEmail || "user@email.com"}</p>

//           {/* Top Stats Cards */}
//           <div className="mt-4 grid grid-cols-3 gap-4">
//             {[
//               { label: "Orders", value: 12, gradient: "from-yellow-400 via-yellow-500 to-yellow-600" },
//               { label: "Wishlist", value: 3, gradient: "from-pink-400 via-pink-500 to-pink-600" },
//               { label: "Reviews", value: 5, gradient: "from-purple-400 via-indigo-500 to-blue-500" },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className={`bg-linear-to-tr ${item.gradient} rounded-xl py-4 px-3 flex flex-col items-center shadow hover:shadow-lg transition`}
//               >
//                 <p className="text-lg font-semibold text-white">{item.value}</p>
//                 <p className="text-xs text-white/80">{item.label}</p>
//               </div>
//             ))}
//           </div>

//           {!editing && (
//             <button
//               onClick={() => setEditing(true)}
//               className="mt-6 inline-flex items-center px-6 py-2 bg-white text-purple-600 font-medium rounded-full shadow hover:bg-gray-100 transition"
//             >
//               <PencilIcon className="w-5 h-5 mr-2" /> Edit Profile
//             </button>
//           )}
//         </div>
//       </div>

//       {/* EDITABLE FORM */}
//       {editing && (
//         <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-gray-200">
//           <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">Edit Profile</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="userName"
//                 value={form.userName}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 name="userPhoneNumber"
//                 value={form.userPhoneNumber}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">Bio</label>
//             <textarea
//               name="bio"
//               rows={4}
//               value={form.bio}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
//             />
//           </div>

//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={handleSave}
//               className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 shadow transition"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditing(false)}
//               className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ABOUT / DETAILS SECTION */}
//       {!editing && (
//         <div className="bg-linear-to-tr from-purple-500 via-indigo-500 to-pink-500 rounded-3xl shadow-xl p-8 space-y-6 border border-gray-200 text-white">
//           <h3 className="text-2xl font-semibold mb-4">About Me</h3>
//           <p className="leading-relaxed">{user?.bio || "No bio provided yet."}</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//             <div className="flex items-center gap-3 bg-linear-to-tr from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-4 shadow hover:shadow-lg transition">
//               <PhoneIcon className="w-6 h-6 text-white" />
//               <div>
//                 <p className="text-sm font-medium text-white/80">Phone</p>
//                 <p className="text-white">{user?.userPhoneNumber || "Not added"}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-linear-to-tr from-purple-400 via-indigo-500 to-blue-500 rounded-xl p-4 shadow hover:shadow-lg transition">
//               <MapPinIcon className="w-6 h-6 text-white" />
//               <div>
//                 <p className="text-sm font-medium text-white/80">Address</p>
//                 <p className="text-white">{user?.addressLine || "Not specified"}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks/hooks";
import { PencilIcon, CameraIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { fetchCurrentUser, updateUserProfile } from "@/lib/store/auth/auth-slice";
import { myOrders } from "@/lib/store/user/my-orders/my-orders-slice";
import { fetchCartItems } from "@/lib/store/user/cart/cart-slice";

interface UserProfileForm {
  userName: string;
  userPhoneNumber: string;
  bio: string;
}

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const { orders } = useAppSelector((state) => state.myOrdersSlice);
  const { items: cartItems } = useAppSelector((state) => state.cartSlice);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfileForm>({
    userName: user?.userName || "",
    userPhoneNumber: user?.userPhoneNumber || "",
    bio: user?.bio || "",
  });

  // Fetch user details, orders, and cart when user is available
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCurrentUser(user.id));
      dispatch(myOrders());
      dispatch(fetchCartItems());
    }
  }, [dispatch, user?.id]);

  // Keep local form in sync with user from store
  useEffect(() => {
    setForm({
      userName: user?.userName || "",
      userPhoneNumber: user?.userPhoneNumber || "",
      bio: user?.bio || "",
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    const formData = new FormData();
    formData.append("userName", form.userName);
    formData.append("userPhoneNumber", form.userPhoneNumber);
    formData.append("bio", form.bio);

    // Adjust this call if your updateUserProfile thunk expects a different payload shape.
    await dispatch(updateUserProfile(user.id, formData) as any);
    setEditing(false);
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !user?.id) return;

    const file = fileList[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    await dispatch(updateUserProfile(user.id, formData) as any);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* PROFILE HEADER */}
      <div className="relative bg-linear-to-r from-purple-600 to-indigo-500 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-40 h-40 rounded-full p-1 bg-linear-to-tr from-yellow-400 via-red-500 to-pink-500">
            <img
              src={user?.profileImage || "/placeholder-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
          </div>
          <label className="absolute bottom-2 right-2 bg-white text-purple-600 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
            <CameraIcon className="w-5 h-5" />
            <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
          </label>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-4xl font-bold">{user?.userName || "User Name"}</h2>
          <p className="text-sm font-medium opacity-80">{user?.userEmail || "user@email.com"}</p>

          {/* Dynamic Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-linear-to-tr from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl py-4 px-3 flex flex-col items-center shadow hover:shadow-lg transition">
              <p className="text-lg font-semibold text-white">{orders?.length || 0}</p>
              <p className="text-xs text-white/80">Orders</p>
            </div>
            <div className="bg-linear-to-tr from-pink-400 via-pink-500 to-pink-600 rounded-xl py-4 px-3 flex flex-col items-center shadow hover:shadow-lg transition">
              <p className="text-lg font-semibold text-white">3</p>
              <p className="text-xs text-white/80">Wishlist</p>
            </div>
            <div className="bg-linear-to-tr from-purple-400 via-indigo-500 to-blue-500 rounded-xl py-4 px-3 flex flex-col items-center shadow hover:shadow-lg transition">
              <p className="text-lg font-semibold text-white">{cartItems?.length || 0}</p>
              <p className="text-xs text-white/80">Cart</p>
            </div>
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="mt-6 inline-flex items-center px-6 py-2 bg-white text-purple-600 font-medium rounded-full shadow hover:bg-gray-100 transition"
            >
              <PencilIcon className="w-5 h-5 mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* EDITABLE FORM */}
      {editing && (
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">Edit Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="userPhoneNumber"
                value={form.userPhoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 shadow transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditing(false);
                // restore form to store values
                setForm({
                  userName: user?.userName || "",
                  userPhoneNumber: user?.userPhoneNumber || "",
                  bio: user?.bio || "",
                });
              }}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ABOUT / DETAILS SECTION */}
      {!editing && (
        <div className="bg-linear-to-tr from-purple-500 via-indigo-500 to-pink-500 rounded-3xl shadow-xl p-8 space-y-6 border border-gray-200 text-white">
          <h3 className="text-2xl font-semibold mb-4">About Me</h3>
          <p className="leading-relaxed">{user?.bio || "No bio provided yet."}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex items-center gap-3 bg-linear-to-tr from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-4 shadow hover:shadow-lg transition">
              <PhoneIcon className="w-6 h-6 text-white" />
              <div>
                <p className="text-sm font-medium text-white/80">Phone</p>
                <p className="text-white">{user?.userPhoneNumber || "Not added"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-linear-to-tr from-purple-400 via-indigo-500 to-blue-500 rounded-xl p-4 shadow hover:shadow-lg transition">
              <MapPinIcon className="w-6 h-6 text-white" />
              <div>
                <p className="text-sm font-medium text-white/80">Address</p>
                <p className="text-white">{user?.addressLine || "Not specified"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

