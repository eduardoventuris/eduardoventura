"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        style: {
          background: "#fffef8",
          color: "#3f3a2d",
          border: "1px solid rgba(22, 163, 74, 0.18)",
        },
      }}
    />
  );
}
