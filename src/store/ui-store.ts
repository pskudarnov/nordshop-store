"use client";

import { create } from "zustand";

export type ToastType = "success" | "info";

export type ToastItem = {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
};

type UiState = {
  toasts: ToastItem[];
  pushToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
};

const TOAST_TTL_MS = 2200;
const TOAST_DEDUPE_WINDOW_MS = 450;
const TOAST_MAX_STACK = 3;

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  pushToast: (toast) => {
    const now = Date.now();
    const id = `${now}-${Math.random().toString(16).slice(2)}`;

    set((state) => {
      const latest = state.toasts[state.toasts.length - 1];
      const latestTs = latest ? Number(latest.id.split("-")[0]) : 0;
      const isDuplicateBurst =
        !!latest &&
        latest.title === toast.title &&
        latest.message === toast.message &&
        now - latestTs < TOAST_DEDUPE_WINDOW_MS;

      if (isDuplicateBurst) return state;

      const next = [...state.toasts, { ...toast, id }];
      return { toasts: next.slice(-TOAST_MAX_STACK) };
    });

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) }));
    }, TOAST_TTL_MS);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })),
}));
