"use client";

import { create } from "zustand";
import { products } from "@/data/products";

type CartItem = { productId: string; quantity: number };
type CartState = {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (productId, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        };
      }
      return { items: [...state.items, { productId, quantity }] };
    }),
  increment: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),
  decrement: (productId) =>
    set((state) => ({
      items: state.items.flatMap((item) => {
        if (item.productId !== productId) return [item];
        const next = item.quantity - 1;
        return next > 0 ? [{ ...item, quantity: next }] : [];
      }),
    })),
  remove: (productId) =>
    set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
  clear: () => set({ items: [] }),
}));

export const getCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  return { subtotal, shipping, total: subtotal + shipping };
};
