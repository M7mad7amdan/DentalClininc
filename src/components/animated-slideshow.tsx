"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type HoverSliderContextValue = {
  activeSlide: number;
  changeSlide: (index: number) => void;
};

type HoverSliderProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultIndex?: number;
};

type TextStaggerHoverProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  index: number;
};

type HoverSliderImageProps = React.ComponentPropsWithoutRef<typeof motion.img> & {
  index: number;
  imageUrl: string;
};

const HoverSliderContext = React.createContext<HoverSliderContextValue | null>(null);

export function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);

  if (!context) {
    throw new Error("HoverSlider components must be used inside HoverSlider");
  }

  return context;
}

export const HoverSlider = React.forwardRef<HTMLDivElement, HoverSliderProps>(
  ({ children, className, defaultIndex = 0, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(defaultIndex);
    const changeSlide = React.useCallback((index: number) => {
      setActiveSlide(index);
    }, []);

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </HoverSliderContext.Provider>
    );
  }
);

HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<
  HTMLButtonElement,
  TextStaggerHoverProps
>(
  (
    { text, index, className, onMouseEnter, onFocus, onClick, ...props },
    ref
  ) => {
    const { activeSlide, changeSlide } = useHoverSliderContext();
    const reducedMotion = Boolean(useReducedMotion());
    const active = activeSlide === index;
    const words = text.trim().split(/\s+/);

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        dir="rtl"
        aria-label={text}
        aria-pressed={active}
        onMouseEnter={(event) => {
          changeSlide(index);
          onMouseEnter?.(event);
        }}
        onFocus={(event) => {
          changeSlide(index);
          onFocus?.(event);
        }}
        onClick={(event) => {
          changeSlide(index);
          onClick?.(event);
        }}
        className={cn(
          "cursor-pointer text-right outline-none focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF]",
          className
        )}
      >
        <div aria-hidden="true" className="flex flex-wrap justify-start gap-x-[0.28em] gap-y-1">
          {words.map((word, wordIndex) => (
            <div key={`${word}-${wordIndex}`} className="relative inline-block overflow-hidden align-bottom">
              <motion.div
                initial={false}
                animate={{
                  y: !reducedMotion && active ? "-110%" : "0%",
                  opacity: active ? 0 : 1,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.38,
                  delay: reducedMotion ? 0 : wordIndex * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="whitespace-nowrap text-[#8799AC]"
              >
                {word}
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  y: !reducedMotion && !active ? "110%" : "0%",
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.38,
                  delay: reducedMotion ? 0 : wordIndex * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 whitespace-nowrap text-[#032654]"
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>
      </button>
    );
  }
);

TextStaggerHover.displayName = "TextStaggerHover";

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn("relative isolate h-full w-full overflow-hidden", className)}
  />
));

HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HoverSliderImageProps
>(({ index, imageUrl, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();
  const reducedMotion = Boolean(useReducedMotion());
  const isActive = activeSlide === index;

  return (
    <motion.img
      {...props}
      ref={ref}
      src={imageUrl}
      aria-hidden={!isActive}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        clipPath: isActive
          ? "inset(0% 0% 0% 0%)"
          : "inset(0% 0% 100% 0%)",
        scale: isActive ? 1 : 1.05,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover",
        className
      )}
    />
  );
});

HoverSliderImage.displayName = "HoverSliderImage";
