"use client";

import { motion } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";
import * as React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface ContactFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  icon?: LucideIcon;
  as?: "input" | "textarea";
  rows?: number;
  disabled?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export function ContactFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  as = "input",
  rows = 4,
  disabled,
  index = 0,
}: ContactFormFieldProps<T> & { index?: number }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="relative"
            >
              <FloatingInput
                {...field}
                label={label}
                placeholder={placeholder}
                type={type}
                icon={Icon}
                as={as}
                rows={rows}
                disabled={disabled}
                name={String(name)}
              />
            </motion.div>
          </FormControl>
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className="mt-1.5"
          >
            <FormMessage className="text-sm text-red-400" />
          </motion.div>
        </FormItem>
      )}
    />
  );
}

interface FloatingInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  icon?: LucideIcon;
  as?: "input" | "textarea";
  rows?: number;
  disabled?: boolean;
  name: string;
}

const FloatingInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Omit<FloatingInputProps, "ref">
>(function FloatingInput(
  {
    value,
    onChange,
    onBlur,
    label,
    placeholder,
    type = "text",
    icon: Icon,
    as = "input",
    rows = 4,
    disabled,
    name,
  },
  ref
) {
  const [isFocused, setIsFocused] = React.useState(false);
  const { error } = useFormField();
  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  const inputId = `contact-${name}`;

  const inputClasses = cn(
    "peer w-full rounded-xl border bg-white/5 px-4 py-3 pr-10 text-white placeholder-transparent backdrop-blur-sm transition-all duration-300",
    "border-white/10 outline-none",
    "focus:border-purple-400/80 focus:ring-2 focus:ring-purple-500/30",
    "disabled:cursor-not-allowed disabled:opacity-50",
    error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
  );

  const labelClasses = cn(
    "pointer-events-none absolute left-4 transition-all duration-300",
    isFloating
      ? "top-1 -translate-y-1/2 text-xs text-purple-300"
      : "top-1/2 -translate-y-1/2 text-base text-gray-400",
    error && "text-red-400"
  );

  return (
    <div className="relative">
      {/* Focus glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0"
        animate={{
          opacity: isFocused ? 0.5 : 0,
          boxShadow: isFocused
            ? "0 0 20px rgba(168, 85, 247, 0.3)"
            : "0 0 0 transparent",
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          filter: "blur(8px)",
        }}
      />

      <motion.div
        className="relative rounded-xl"
        key={error ? "error" : "ok"}
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {as === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            aria-label={label}
            aria-invalid={!!error}
            aria-required
            className={cn(inputClasses, "min-h-[120px] resize-none py-3")}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={label}
            aria-invalid={!!error}
            aria-required
            className={inputClasses}
          />
        )}

        <motion.label
          htmlFor={inputId}
          className={labelClasses}
          animate={{
            y: isFloating ? -12 : 0,
            scale: isFloating ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>

        {/* Icon + validation check */}
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {error ? null : hasValue ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-400"
            >
              <Check className="size-5" aria-hidden />
            </motion.div>
          ) : Icon ? (
            <motion.div
              animate={{ scale: isFocused ? 1.1 : 1 }}
              className="text-gray-500"
            >
              <Icon className="size-5" aria-hidden />
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
});
