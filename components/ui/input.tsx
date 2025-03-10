import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border rounded-lg px-4 py-1 w-full focus:outline-none ${
        className || ""
      }`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
