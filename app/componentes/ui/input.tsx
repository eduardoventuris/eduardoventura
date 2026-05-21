import type { InputHTMLAttributes } from "react";

type PropsJ = InputHTMLAttributes<HTMLInputElement>;

function dockJ(incoming: string) {
  return ["field", incoming].filter(Boolean).join(" ").trim();
}

export function Input({ className = "", ...props }: PropsJ) {
  return <input data-ui="input-10" className={dockJ(className)} {...props} />;
}
