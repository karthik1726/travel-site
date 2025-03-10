import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseClasses = "px-4 py-2 rounded-lg transition font-medium";
    const variantClasses =
      variant === "outline"
        ? "border border-gray-300 text-gray-800 hover:bg-gray-100"
        : "bg-black text-white hover:bg-gray-800";

    return (
      <button ref={ref} className={`${baseClasses} ${variantClasses} ${className || ""}`} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button };
