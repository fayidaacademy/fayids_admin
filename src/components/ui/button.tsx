import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-black rounded border border-black hover:shadow-glow hover:shadow-primary-500/25",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-glow hover:shadow-red-500/25",
        outline:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400",
        secondary:
          "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:shadow-glow hover:shadow-gray-500/25",
        ghost: "hover:bg-gray-100 text-gray-900",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-glow hover:shadow-emerald-500/25",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-glow hover:shadow-yellow-500/25",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
