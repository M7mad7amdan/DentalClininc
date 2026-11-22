
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Quote, MessageCircle } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";

export interface Testimonial {
  id: number;
  name: string;
  treatment: string;
  quote: string;
  date?: string;
}

interface Props {
  testimonial: Testimonial;
  index: number;
  total: number;
  onSwipe?: (direction: number) => void;
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
    <div
      className={className}
      style={{ transform: `translateZ(${z}px)` }}
    >
      {children}
    </div>
  );
}

export default function Testimonial3DCard({
  testimonial,
  index,
  total,
  onSwipe,
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

  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);

  const glowX = useTransform(springX, [-1, 1], ["20%", "80%"]);
  const glowY = useTransform(springY, [-1, 1], ["20%", "80%"]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mx.set(
      ((event.clientX - rect.left) / rect.width - 0.5) * 2
    );

    my.set(
      ((event.clientY - rect.top) / rect.height - 0.5) * 2
    );
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
      className="relative mx-auto w-full max-w-[740px]"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        drag={onSwipe && !reduced ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 70) {
            onSwipe?.(info.offset.x > 0 ? -1 : 1);
          }
        }}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
          touchAction: "pan-y",
        }}
        className="relative min-h-[440px] cursor-grab select-none overflow-visible rounded-[32px] bg-[#032654] text-white shadow-[0_35px_90px_-35px_rgba(3,38,84,0.5)] active:cursor-grabbing sm:min-h-[410px] md:rounded-[42px]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border border-[#6BBAEF]/25">
          <div className="absolute -right-28 -top-36 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full border border-[#6BBAEF]/20" />

          <div className="absolute bottom-[-200px] left-[-110px] h-[400px] w-[400px] rounded-full bg-[#6BBAEF]/20 blur-[80px]" />

          <motion.div
            style={{
              left: glowX,
              top: glowY,
            }}
            className="absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6BBAEF]/15 blur-[80px]"
          />
        </div>

        <div
          className="relative z-10 flex min-h-[440px] flex-col justify-between gap-8 p-7 sm:min-h-[410px] sm:p-10 md:p-12"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Depth
            z={35}
            className="flex items-center justify-between gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6BBAEF]/30 bg-[#6BBAEF]/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
              <MessageCircle
                size={15}
                className="text-[#6BBAEF]"
              />
              <p>تجربة مريض</p>
            </div>

            <p className="text-xs font-medium tabular-nums tracking-widest text-white/70">
              {String(index + 1).padStart(2, "0")}
              {" / "}
              {String(total).padStart(2, "0")}
            </p>
          </Depth>

          <Depth
            z={65}
            className="relative max-w-[570px]"
          >
            <Quote
              size={58}
              strokeWidth={1.25}
              className="mb-5 text-[#6BBAEF]"
            />

            <blockquote className="text-right text-xl font-medium leading-[1.9] tracking-[-0.025em] text-white sm:text-2xl md:text-[30px]">
              {testimonial.quote}
            </blockquote>
          </Depth>

          <Depth
            z={45}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-[#6BBAEF]/25 pt-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#6BBAEF]/30 bg-[#6BBAEF]/20 text-lg font-semibold text-white">
                {testimonial.name === "رأي مريض"
                  ? "؟"
                  : testimonial.name.charAt(0)}
              </div>

              <div>
                <p className="font-semibold text-white">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs font-medium text-white/75">
                  {testimonial.treatment}
                </p>
              </div>
            </div>

            <p className="text-xs font-medium text-white/65">
              {testimonial.date || "رأي قيد الاعتماد"}
            </p>
          </Depth>
        </div>
      </motion.div>
    </div>
  );
}
