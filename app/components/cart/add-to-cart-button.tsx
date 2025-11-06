"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addToCart } from "@/lib/store/user/cart/cart-slice";
import { useAuthGuard } from "@/lib/store/hooks/useAuthGuard";

interface Props {
  productId: string;
  quantity?: number;
}

export default function AddToCartButton({ productId, quantity = 1 }: Props) {
  const dispatch = useAppDispatch();
  const { checkAuth } = useAuthGuard();
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const handleClick = async () => {
    const isAuthenticated = checkAuth(() => {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 2000);
    });
    if (!isAuthenticated) return;

    try {
      await dispatch(addToCart(productId, quantity));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="p-2 bg-green-100 rounded-full shadow-md cursor-pointer hover:bg-sky-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386a1 1 0 0 1 .97.757l.813 3.25M6 6h15.75a.75.75 0 0 1 .705 1.038l-2.25 6A.75.75 0 0 1 19.5 14H8.25M6 6L5.106 9.757a.75.75 0 0 0 .705.993H19.5M6 6L5.106 9.757M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
          />
        </svg>
      </div>

      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded z-50">
          Item added to cart!
        </div>
      )}
      {errorToast && (
        <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded z-50">
          Please log in to add items to your cart.
        </div>
      )}
    </>
  );
}

//2nd try
//does not checks login
// "use client";

// import React, { useState } from "react";
// import { useAppDispatch } from "@/lib/store/hooks/hooks";
// import { addToCart } from "@/lib/store/user/cart/cart-slice";

// interface Props {
//   productId: string;
//   quantity?: number;
// }

// export default function AddToCartButton({ productId, quantity = 1 }: Props) {
//   const dispatch = useAppDispatch();
//   const [showToast, setShowToast] = useState(false);
//   const [errorToast, setErrorToast] = useState(false);

//   const handleClick = async () => {
//     try {
//       await dispatch(addToCart(productId, quantity));
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 2000);
//     } catch (err) {
//       console.error(err);
//       setErrorToast(true);
//       setTimeout(() => setErrorToast(false), 2000);
//     }
//   };

//   return (
//     <>
//       <div
//         onClick={handleClick}
//         className="p-2 bg-green-100 rounded-full shadow-md cursor-pointer hover:bg-sky-100 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-5 h-5 text-gray-800"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.25 3h1.386a1 1 0 0 1 .97.757l.813 3.25M6 6h15.75a.75.75 0 0 1 .705 1.038l-2.25 6A.75.75 0 0 1 19.5 14H8.25M6 6L5.106 9.757a.75.75 0 0 0 .705.993H19.5M6 6L5.106 9.757M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
//           />
//         </svg>
//       </div>

//       {showToast && (
//         <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded z-50">
//           Item added to cart!
//         </div>
//       )}
//       {errorToast && (
//         <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded z-50">
//           Something went wrong. Please try again.
//         </div>
//       )}
//     </>
//   );
// }

//3rd
// "use client";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
// import { addToGuestCart } from "@/lib/store/guest/cart-slice";
// import { addToCart, fetchCartItems } from "@/lib/store/user/cart/cart-slice"; 
// import { toast } from "react-hot-toast";

// interface Props {
//   productId: string;
//   quantity?: number;
// }

// export default function AddToCartButton({ productId, quantity = 1 }: Props) {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.authSlice);

//   const handleAddToCart = async () => {
//     if (!user) {
//       dispatch(addToGuestCart({ productId, quantity }));
//     } else {
//       await dispatch(addToCart(productId, quantity));
//       dispatch(fetchCartItems());
//     }
//     toast.success("Added to cart!");
//   };

//   return (
//     <div
//       onClick={handleAddToCart}
//       className="p-2 bg-green-100 rounded-full shadow-md cursor-pointer hover:bg-sky-100 transition"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-5 h-5 text-gray-800"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M2.25 3h1.386a1 1 0 0 1 .97.757l.813 3.25M6 6h15.75a.75.75 0 0 1 .705 1.038l-2.25 6A.75.75 0 0 1 19.5 14H8.25M6 6L5.106 9.757a.75.75 0 0 0 .705.993H19.5M6 6L5.106 9.757M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
//         />
//       </svg>
//     </div>
//   );
// }

