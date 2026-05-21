import type { ButtonHTMLAttributes } from "react";

type VariantJ = "primary" | "secondary" | "danger";

const classesJ: Record<VariantJ, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
};

type PropsJ = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: VariantJ;
};

function layerJ(variant: VariantJ, customClass: string) {
  const partsJ = [classesJ[variant]];
  if (customClass) partsJ.push(customClass);
  return partsJ.join(" ").trim();
}

export function Button({ className = "", variant = "primary", ...props }: PropsJ) {
  return <button data-ui="button-10" className={layerJ(variant, className)} {...props} />;
}
