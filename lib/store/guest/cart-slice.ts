// Import necessary utilities from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ----------------------------------------
// 1️⃣ Define types (shape of data)
// ----------------------------------------

interface GuestCartItem {
  productId: string;
  quantity: number;
}

interface GuestCartState {
  items: GuestCartItem[];
}

// ----------------------------------------
// 2️⃣ Helper functions for localStorage
// ----------------------------------------

const loadFromLocalStorage = (): GuestCartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem("guestCart");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error reading guest cart from localStorage", e);
    return [];
  }
};

const saveToLocalStorage = (items: GuestCartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("guestCart", JSON.stringify(items));
  }
};

// ----------------------------------------
// 3️⃣ Define initial state
// ----------------------------------------

const initialState: GuestCartState = {
  items: loadFromLocalStorage(),
};

// ----------------------------------------
// 4️⃣ Create the slice
// ----------------------------------------

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    addToGuestCart(state, action: PayloadAction<GuestCartItem>) {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },

    removeFromGuestCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      saveToLocalStorage(state.items);
    },

    clearGuestCart(state) {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("guestCart");
      }
    },

    // ✅ Update quantity of an existing item
    updateGuestQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity = action.payload.quantity;
        saveToLocalStorage(state.items);
      }
    },

    // ✅ Delete an item (alias for removeFromGuestCart)
    deleteGuestItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      saveToLocalStorage(state.items);
    },
  },
});

// ----------------------------------------
// 5️⃣ Export actions and reducer
// ----------------------------------------

export const {
  addToGuestCart,
  removeFromGuestCart,
  clearGuestCart,
  updateGuestQuantity,
  deleteGuestItem,
} = guestCartSlice.actions;

export default guestCartSlice.reducer;
