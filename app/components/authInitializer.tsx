// // components/AuthInitializer.tsx
// 'use client';

// import { useEffect } from "react";
// import { setUser } from "@/lib/store/auth/auth-slice";
// import { useAppDispatch } from "@/lib/store/hooks/hooks";

// export default function AuthInitializer() {
//   const dispatch = useAppDispatch();


//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     if (token && user) {
//       dispatch(setUser(JSON.parse(user)));
//     }
//   }, [dispatch]);

//   return null;
// }


//2nd
// components/AuthInitializer.tsx
// components/AuthInitializer.tsx
'use client';

import { useEffect } from "react";
import { setUser } from "@/lib/store/auth/auth-slice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { fetchCurrentUser } from "@/lib/store/auth/auth-slice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));

      // Fetch fresh data from backend
      if (parsedUser.id) {
        dispatch(fetchCurrentUser(parsedUser.id));
      }
    }
  }, [dispatch]);

  return null;
}