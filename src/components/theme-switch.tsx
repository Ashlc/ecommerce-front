import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "@heroui/use-theme";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange: () => setTheme(theme === "light" ? "dark" : "light"),
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <Component
      aria-label={isSelected ? "Switch to dark mode" : "Switch to light mode"}
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-full",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-700",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {isSelected ? <MoonIcon size={24} /> : <SunIcon size={24} />}
      </div>
    </Component>
  );
};
