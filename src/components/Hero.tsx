"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { ArrowDown, ArrowUpLeft } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  placement: string;
  fromX: string;
  fromY: string;
  fromRotate: number;
};

const images: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    alt: "صورة توضيحية لعيادة أسنان حديثة",
    placement:
      "col-[1/7] row-[1/4] md:col-[1/7] md:row-[1/5]",
    fromX: "-110vw",
    fromY: "-65svh",
    fromRotate: -10,
  },
  {
    src: "https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=1000&q=80",
    alt: "صورة توضيحية لتجهيزات عيادة الأسنان",
    placement:
      "col-[1/4] row-[4/6] md:col-[7/10] md:row-[1/4]",
    fromX: "115vw",
    fromY: "-100svh",
    fromRotate: 9,
  },
  {
    src: "https://images.unsplash.com/photo-1643660527190-4f401370f788?auto=format&fit=crop&w=1000&q=80",
    alt: "صورة توضيحية لكرسي علاج الأسنان",
    placement:
      "col-[4/7] row-[4/6] md:col-[10/13] md:row-[1/4]",
    fromX: "120vw",
    fromY: "-50svh",
    fromRotate: 12,
  },
  {
    src: "https://images.unsplash.com/photo-1642844771937-23accb161a3d?auto=format&fit=crop&w=1200&q=80",
    alt: "صورة توضيحية لغرفة العناية بالأسنان",
    placement:
      "col-[1/4] row-[6/7] md:col-[1/7] md:row-[5/7]",
    fromX: "-110vw",
    fromY: "100svh",
    fromRotate: -11,
  },
  {
    src: "https://images.unsplash.com/photo-1643660527098-559f89e45a92?auto=format&fit=crop&w=1200&q=80",
    alt: "صورة توضيحية لمعدات طب الأسنان",
    placement:
      "col-[4/7] row-[6/7] md:col-[7/13] md:row-[4/7]",
    fromX: "115vw",
    fromY: "110svh",
    fromRotate: 10,
  },
];

function GalleryPhoto({
  item,
  progress,
  index,
}: {
  item: GalleryItem;
  progress: MotionValue<number>;
  index: number;
}) {
  const x = useTransform(
    progress,
    [0, 0.36, 0.61, 1],
    [item.fromX, item.fromX, "0vw", "0vw"]
  );
  const y = useTransform(
    progress,
    [0, 0.36, 0.61, 0.72, 0.94, 1],
    [item.fromY, item.fromY, "0svh", "0svh", "120svh", "120svh"]
  );
  const rotate = useTransform(
    progress,
    [0, 0.36, 0.61, 1],
    [item.fromRotate, item.fromRotate, 0, 0]
  );
  const scale = useTransform(progress, [0, 0.36, 0.61, 0.72, 0.94], [0.9, 0.9, 1, 1, 0.94]);

  return (
    <motion.div
      style={{ x, y, rotate, scale }}
      className={`relative min-h-0 min-w-0 overflow-hidden rounded-[18px] border-[3px] border-white bg-[#DCECF8] shadow-[0_20px_55px_rgba(3,38,84,0.22)] sm:rounded-[24px] md:rounded-[30px] ${item.placement}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#032654]/[0.06]" />
    </motion.div>
  );
}

function HeroCopy() {
  return (
    <div className="mx-auto w-full max-w-[850px] text-center">
      <p className="mb-4 text-xs font-bold tracking-wide text-[#287DB7] sm:text-base">
        عيادة د. رأفت ماجد | طب وتجميل الأسنان
      </p>

      <h1 className="text-[clamp(2.1rem,5.5vw,4.8rem)] font-bold leading-[1.28] tracking-tight text-[#032654]">
        العناية بأسنانك
        <strong className="mt-1 block font-bold text-[#287DB7]">
          تبدأ من هنا.
        </strong>
      </h1>

      <p className="mx-auto mt-5 max-w-[680px] text-[15px] font-medium leading-[1.85] text-[#475569] sm:mt-7 sm:text-lg sm:leading-9">
        في عيادتنا تجد خدمات علاج الأسنان والعناية بابتسامتك، من علاج
        التسوس والعصب إلى الزراعة والتقويم والتجميل. تعرّف على خدماتنا
        وابدأ رحلتك بخطوة بسيطة.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
        <a
          href="#contact"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#032654] px-5 text-sm font-bold text-white transition-colors hover:bg-[#164A83] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF] sm:min-h-14 sm:px-8 sm:text-base"
        >
          احجز استشارتك
          <ArrowUpLeft className="h-5 w-5" />
        </a>

        <a
          href="#services"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#BCDDF3] bg-white px-5 text-sm font-bold text-[#032654] transition-colors hover:bg-[#EAF5FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF] sm:min-h-14 sm:px-8 sm:text-base"
        >
          خدمات العيادة
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 34,
    mass: 0.3,
  });

  const galleryOpacity = useTransform(
    progress,
    [0, 0.35, 0.41, 0.86, 0.97, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const hintOpacity = useTransform(
    progress,
    [0, 0.27, 0.38, 0.9, 0.98],
    [1, 1, 0, 0, 1]
  );

  if (reducedMotion) {
    return (
      <section
        id="home"
        dir="rtl"
        className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-[#F8FAFC] px-4 pb-16 pt-40 text-[#032654] sm:pt-44"
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <HeroCopy />
        <div className="mt-14 grid h-[65svh] w-full grid-cols-6 grid-rows-6 gap-2 sm:gap-3 md:grid-cols-12 md:gap-4">
          {images.map((item) => (
            <div
              key={item.src}
              className={`min-h-0 min-w-0 overflow-hidden rounded-[20px] bg-[#DCECF8] ${item.placement}`}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs font-medium text-[#64748B]">
          الصور توضيحية وليست صورًا للعيادة
        </p>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      dir="rtl"
      className="relative left-1/2 h-[360svh] w-screen max-w-none -translate-x-1/2 bg-[#F8FAFC] text-[#032654]"
      style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[#F8FAFC]" />

        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 pb-16 pt-28 sm:px-8 sm:pt-24">
          <HeroCopy />
        </div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: galleryOpacity }}
          className="pointer-events-none absolute inset-0 z-20 grid h-full w-full grid-cols-6 grid-rows-6 gap-2 p-2 pt-24 sm:gap-3 sm:p-4 sm:pt-24 md:grid-cols-12 md:gap-4 md:p-5 md:pt-20"
        >
          {images.map((item, index) => (
            <GalleryPhoto
              key={item.src}
              item={item}
              index={index}
              progress={progress}
            />
          ))}
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-5 inset-x-0 z-30 flex items-center justify-center gap-2 text-[#64748B]"
        >
          <p className="text-xs font-semibold sm:text-sm">
            انزل للأسفل لتتجمع الصور، وارجع للأعلى لإعادة الحركة
          </p>
          <ArrowDown className="h-4 w-4" />
        </motion.div>

        <motion.p
          style={{ opacity: galleryOpacity }}
          className="pointer-events-none absolute bottom-16 left-5 z-30 rounded-full border border-[#DCEAF7] bg-white/90 px-3 py-2 text-[11px] font-semibold text-[#475569] shadow-sm"
        >
          صور توضيحية وليست صورًا للعيادة
        </motion.p>
      </div>
    </section>
  );
}
