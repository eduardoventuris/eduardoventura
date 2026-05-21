import type { TextareaHTMLAttributes } from "react";

type PropsJ = TextareaHTMLAttributes<HTMLTextAreaElement>;

const baseJ = "text-field";

export function Textarea({ className = "", ...props }: PropsJ) {
  const classesJ = [baseJ, className].filter(Boolean).join(" ").trim();
  return <textarea data-ui="textarea-10" className={classesJ} {...props} />;
}
