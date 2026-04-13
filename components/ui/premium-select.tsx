"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

type PremiumSelectOption = {
  label: string;
  value: string;
};

type PremiumSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: PremiumSelectOption[];
  placeholder?: string;
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

export function PremiumSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
}: PremiumSelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
    width: 0,
  });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 10,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (rootRef.current?.contains(target)) return;

      const menu = document.getElementById("premium-select-menu");
      if (menu?.contains(target)) return;

      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleWindowChange = () => {
      updatePosition();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
    };
  }, [open]);

  return (
    <>
      <div ref={rootRef} className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (!open) updatePosition();
            setOpen((prev) => !prev);
          }}
          className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-left text-sm outline-none transition ${
            open
              ? "border-white/20 bg-black/45 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              : "border-white/10 bg-black/30 text-white hover:border-white/20 hover:bg-black/40"
          }`}
        >
          <span className={selectedOption ? "text-white" : "text-white/45"}>
            {selectedOption?.label ?? placeholder}
          </span>

          <ChevronDown
            className={`h-4 w-4 text-white/55 transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {mounted &&
        open &&
        createPortal(
          <div
            id="premium-select-menu"
            className="fixed z-[9999] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/98 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            <div className="premium-scroll max-h-[250px] overflow-y-auto pr-1">
              {options.map((option) => {
                const active = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    {active ? <Check className="h-4 w-4 text-white/75" /> : null}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}