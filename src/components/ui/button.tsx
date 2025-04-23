import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
      variants: {
        variant: {
          default:
              "bg-lime-400 text-black hover:text-white overflow-hidden",
          outline:
              "border border-lime-400 text-lime-400 bg-transparent hover:bg-lime-400 hover:text-black",
          ghost:
              "bg-transparent text-white hover:bg-white/10",
          destructive:
              "bg-red-500 text-white hover:bg-red-600",

          // ✅ Nova variação personalizada
          "light-outline":
              "border border-white text-white bg-transparent hover:bg-white/10",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 px-3",
          lg: "h-11 px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
);


export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
      return (
          <button
              className={cn(buttonVariants({ variant, size }), className)}
              ref={ref}
              {...props}
          >
            <span
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-500 ease-out rounded-md"/>
            <span className="relative z-10">{children}</span>
          </button>
      );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
