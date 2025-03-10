"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; // ✅ Corrected import
import { Check } from "lucide-react";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`peer h-4 w-4 shrink-0 rounded-sm border border-gray-400 shadow 
      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 
      disabled:cursor-not-allowed disabled:opacity-50 
      data-[state=checked]:bg-gray-800 data-[state=checked]:text-white ${className}`}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4 text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
