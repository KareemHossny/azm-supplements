"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  qty: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return { items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + action.item.qty } : i) };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter(i => i.id !== action.id) };
    case "UPDATE_QTY":
      return { items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i).filter(i => i.qty > 0) };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("azm_cart");
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("azm_cart", JSON.stringify(state.items)); } catch { /* empty */ }
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", item });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", id });
  const updateQty = (id: string, qty: number) => dispatch({ type: "UPDATE_QTY", id, qty });
  const clearCart = () => dispatch({ type: "CLEAR" });
  const itemCount = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
