"use client"
import { create } from "zustand";

export interface ToastState {
  message: string;
  type: "success" | "error";
  isOpen: boolean;
  open: (message: string, type: "success" | "error") => void;
  close: () => void;
}

export interface ToastSliceState {
  toast: ToastState;
}

export const useToastStore = create<ToastSliceState>((set) => ({
  toast: {
    message: "",
    type: "success",
    isOpen: false,
    open(message: string, type: "success" | "error") {
      set((prev) => ({
        toast: {
          ...prev.toast,
          isOpen: true,
          message,
          type,
        },
      }));
    },
    close() {
      set((prev) => ({
        toast: {
          ...prev.toast,
          isOpen: false,
          message: "",
        },
      }));
    },
  },
}));
