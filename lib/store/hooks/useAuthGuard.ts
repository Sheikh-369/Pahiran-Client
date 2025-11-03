import { useAppSelector } from "./hooks"; // your Redux hooks
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const user = useAppSelector((state) => state.authSlice.user); // assuming you store user info in Redux

  function checkAuth(onFail?: () => void) {
    if (!user) {
      if (onFail) onFail();
      return false;
    }
    return true;
  }

  return { checkAuth };
}
