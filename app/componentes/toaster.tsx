"use client";

import { Toaster } from "sonner";

const toastOptionsJ = {
  style: {
    background: "#fff1f2",
    color: "#9f1239",
    border: "1px solid #fda4af",
  },
};

export default function AppToaster() {
  return <Toaster richColors position="top-center" expand={true} toastOptions={toastOptionsJ} />;
}
