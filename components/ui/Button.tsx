// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm  transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/40",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        outline: " text-black hover:text-primary-600 cursor-pointer ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  completeloading?: boolean;
  children?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  title?: string;
  classOveride?: boolean;
}

const Button: FC<ButtonProps> = ({
  title,
  completeloading,
  loading,
  children,
  variant,
  size,
  left = null,
  className,
  right = null,
  classOveride=false,
  ...props
}) => {
  return (
    <button
      disabled={props.disabled || loading || completeloading}
      {...props}
      className={  twMerge(classOveride?"":buttonVariants({ variant, size }), className)}
    >
      {completeloading ? (
        <LoaderCircle className="animate-spin " />
      ) : (
        <>
          {loading ? <LoaderCircle className="animate-spin " /> : left}
          {children}
          {title && <p className="px-1">{title}</p>}
          {right}
        </>
      )}
    </button>
  );
};

export default Button;
