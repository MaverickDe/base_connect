import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { FC, ReactNode, InputHTMLAttributes, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const inputVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border border-gray-300 focus:ring-blue-500",
        secondary: "border border-gray-400 bg-gray-50 focus:ring-gray-500",
        danger: "border border-red-500 focus:ring-red-500",
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

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  loading?: boolean;
  completeloading?: boolean;
  left?: ReactNode;
  label?: ReactNode;
  right?: ReactNode;

  conProp?: HTMLAttributes<HTMLDivElement>;
}


const Input: FC<InputProps> = ({
  completeloading,
  loading,
  variant,
  size,
  conProp,
  left = null,
  right = null,
  label = null,
  className,
  disabled,
  ...props // ⬅️ everything else goes to <input>
}) => {
  return (
    <div
  
    >
      {label}
    <div
      {...conProp}
      className={twMerge(
        inputVariants({ variant, size }),
        conProp?.className
      )}
    >
      {completeloading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <div className="mr-2">
          
            {loading ? <LoaderCircle className="animate-spin mr-2" /> : left}
          </div>

          <input
            {...props} // all extra props (placeholder, onChange, etc.)
            disabled={loading || completeloading || disabled}
            className={twMerge(
              "flex-1 outline-none bg-transparent",
              className
            )}
          />

          {right}
        </>
      )}
    </div>
    </div>
  );
};

export default Input;
