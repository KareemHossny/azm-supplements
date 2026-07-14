"use client";

import { CartProvider } from "./cart-context";
import type { ReactNode } from "react";

export function CartWrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
