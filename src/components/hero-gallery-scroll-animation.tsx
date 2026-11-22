"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { HTMLMotionProps, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type GalleryVariant = "default" | "threeCells" | "fourCells";

type ScrollContextValue = {
  scrollYProgress: MotionValue<number>;
};

const ScrollContext = React.createContext<ScrollContextValue | null>(null);

function useGalleryScroll() {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error("Gallery components must be inside ContainerScroll");
  }
  return context;
}

export function ContainerScroll({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

const variantClasses: Record<GalleryVariant, string> = {
  default:
    "grid-cols-6 grid-rows-6 md:grid-cols-12 md:grid-rows-6 [&>*:nth-child(1)]:col-[1/7] [&>*:nth-child(1)]:row-[1/4] md:[&>*:nth-child(1)]:row-[1/5] [&>*:nth-child(2)]:col-[1/4] [&>*:nth-child(2)]:row-[4/6] md:[&>*:nth-child(2)]:col-[7/10] md:[&>*:nth-child(2)]:row-[1/4] [&>*:nth-child(3)]:col-[4/7] [&>*:nth-child(3)]:row-[4/6] md:[&>*:nth-child(3)]:col-[10/13] md:[&>*:nth-child(3)]:row-[1/4] [&>*:nth-child(4)]:col-[1/4] [&>*:nth-child(4)]:row-[6/7] md:[&>*:nth-child(4)]:col-[1/7] md:[&>*:nth-child(4)]:row-[5/7] [&>*:nth-child(5)]:col-[4/7] [&>*:nth-child(5)]:row-[6/7] md:[&>*:nth-child(5)]:col-[7/13] md:[&>*:nth-child(5)]:row-[4/7]",
  threeCells:
    "grid-cols-2 grid-rows-2 [&>*:first-child]:col-span-2",
  fourCells:
    "grid-cols-3 grid-rows-2 [&>*:first-child]:col-span-1 [&>*:nth-child(2)]:col-span-2 [&>*:nth-child(3)]:col-span-2",
};

export const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: GalleryVariant }
>(({ variant = "default", className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative grid gap-2 sm:gap-3 md:gap-4", variantClasses[variant], className)}
    {...props}
  />
));
BentoGrid.displayName = "BentoGrid";

export const BentoCell = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { fromX?: string; fromY?: string }
>(({ fromX = "0%", fromY = "18%", style, className, ...props }, ref) => {
  const { scrollYProgress } = useGalleryScroll();
  const reduced = useReducedMotion();
  const x = useTransform(scrollYProgress, [0, 0.6], [fromX, "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.6], [fromY, "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.83, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0.7, 1]);

  return (
    <motion.div
      ref={ref}
      className={cn("min-h-0 min-w-0 overflow-hidden rounded-[22px] border border-white/80 bg-[#DCECF8] shadow-[0_12px_38px_rgba(3,38,84,0.12)] md:rounded-[30px]", className)}
      style={{
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        scale: reduced ? 1 : scale,
        opacity: reduced ? 1 : opacity,
        ...style,
      }}
      {...props}
    />
  );
});
BentoCell.displayName = "BentoCell";

export const ContainerScale = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ style, className, ...props }, ref) => {
  const { scrollYProgress } = useGalleryScroll();
  const reduced = useReducedMotion();
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.48], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.48], [1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.48], [0, -35]);
  const pointerEvents = useTransform(scrollYProgress, (value) =>
    value < 0.42 ? "auto" : "none"
  );

  return (
    <motion.div
      ref={ref}
      className={cn("absolute inset-0 flex items-center justify-center", className)}
      style={{
        opacity: reduced ? 1 : opacity,
        scale: reduced ? 1 : scale,
        y: reduced ? 0 : y,
        pointerEvents: reduced ? "auto" : pointerEvents,
        ...style,
      }}
      {...props}
    />
  );
});
ContainerScale.displayName = "ContainerScale";
