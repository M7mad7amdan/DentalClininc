import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Quote, MessageCircle, Star } from "lucide-react";

export interface Testimonial {
  id: number;
  quote: string;
}

interface Props {
  testimonial: Testimonial;
  index: number;
  total: number;
  onSwipe?: (direction: number) => void;
  preview?: boolean;
}

function Depth({
  z,
  children,
  className = "",
}: {
  z: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  );
}

export default function Testimonial3DCard({
  testimonial,
  index,
  total,
  onSwipe,
  preview = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springX = useSpring(mx, {
    stiffness: 130,
    damping: 22,
    mass: 0.65,
  });

  const springY = useSpring(my, {
    stiffness: 130,
    damping: 22,
    mass: 0.65,
  });

  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-9, 9]);
  const glowX = useTransform(springX, [-1, 1], ["20%", "80%"]);
  const glowY = useTransform(springY, [-1, 1], ["20%", "80%"]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || preview || event.pointerType !== "mouse") return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-hidden={preview ? true : undefined}
      className="relative h-full w-full"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        drag={!preview && onSwipe ? "x" : false}
        dragConstraints={{ left: -450, right: 450 }}
        dragElastic={0.08}
        dragMomentum={false}
        dragSnapToOrigin
        dragDirectionLock
        onDragEnd={(_, info) => {
          if (!onSwipe || preview) return;
          if (
            Math.abs(info.offset.x) < 60 &&
            Math.abs(info.velocity.x) < 500
          ) {
            return;
          }
          const travel =
            Math.abs(info.offset.x) >= 60
              ? info.offset.x
              : info.velocity.x;
          onSwipe(travel < 0 ? 1 : -1);
          reset();
        }}
        whileDrag={reduced ? undefined : { scale: 1.015 }}
        style={{
          rotateX: reduced || preview ? 0 : rotateX,
          rotateY: reduced || preview ? 0 : rotateY,
          transformStyle: "preserve-3d",
          touchAction: "pan-y",
        }}
        className={`relative flex h-full w-full select-none flex-col overflow-visible rounded-[20px] text-white shadow-[0_24px_58px_-28px_rgba(3,38,84,0.55)] sm:rounded-[36px] sm:shadow-[0_30px_90px_-35px_rgba(3,38,84,0.55)] md:rounded-[42px] ${
          preview
            ? "cursor-default bg-[#0B4179]"
            : "cursor-grab bg-[#032654] active:cursor-grabbing"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border border-[#6BBAEF]/25">
          <div className="absolute -right-28 -top-36 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full border border-[#6BBAEF]/20" />
          <div className="absolute bottom-[-200px] left-[-110px] h-[400px] w-[400px] rounded-full bg-[#6BBAEF]/20 blur-[80px]" />
          {!preview && (
            <motion.div
              style={{ left: glowX, top: glowY }}
              className="absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6BBAEF]/15 blur-[80px]"
            />
          )}
        </div>

        <div
          className="relative z-10 flex h-full min-h-0 flex-col justify-between gap-2.5 p-3.5 sm:gap-7 sm:p-9 md:p-11"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Depth z={24} className="flex shrink-0 items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6BBAEF]/30 bg-[#6BBAEF]/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
              <MessageCircle
                size={13}
                className="text-[#6BBAEF] sm:h-[15px] sm:w-[15px]"
                aria-hidden="true"
              />
              <p>تجربة مريض</p>
            </div>
            <p className="text-[10px] font-medium tabular-nums tracking-widest text-white/70 sm:text-xs">
              {String(index + 1).padStart(2, "0")}
              {" / "}
              {String(total).padStart(2, "0")}
            </p>
          </Depth>

          <Depth
            z={46}
            className="flex min-h-0 flex-1 flex-col justify-center"
          >
            <Quote
              size={36}
              strokeWidth={1.25}
              className="hidden shrink-0 text-[#6BBAEF] sm:mb-4 sm:block sm:h-12 sm:w-12"
              aria-hidden="true"
            />
            <blockquote
              className="min-h-0 max-h-full overflow-y-auto overscroll-y-contain px-0.5 text-right text-[14px] font-medium leading-[1.6] text-white [scrollbar-width:thin] [scrollbar-color:#6BBAEF66_transparent] sm:text-[20px] sm:leading-[1.9] lg:text-[22px]"
              style={{ fontFamily: '"Tajawal", "IBM Plex Sans Arabic", sans-serif' }}
            >
              {testimonial.quote}
            </blockquote>
          </Depth>

          <Depth
            z={32}
            className="flex shrink-0 items-center justify-between gap-2 border-t border-[#6BBAEF]/25 pt-2.5 sm:flex-wrap sm:gap-3 sm:pt-5"
          >
            <p className="text-[11px] font-bold text-white sm:text-base">
              من مراجعي العيادة
            </p>
            <div
              className="flex shrink-0 items-center gap-0.5 sm:gap-1"
              role="img"
              aria-label="تقييم خمس نجوم من خمس"
              dir="ltr"
            >
              {Array.from({ length: 5 }, (_, starIndex) => (
                <Star
                  key={starIndex}
                  size={14}
                  className="sm:h-[19px] sm:w-[19px]"
                  strokeWidth={1.4}
                  fill="#F2C35F"
                  color="#F2C35F"
                  aria-hidden="true"
                />
              ))}
            </div>
          </Depth>
        </div>
      </motion.div>
    </div>
  );
}
