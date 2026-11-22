"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Images, X } from "lucide-react";

type PatientResult = {
  id: number;
  title: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
};

const results: PatientResult[] = [
  {
    id: 1,
    title: "علاج تسوس الأسنان",
    description: "مساحة مخصصة لعرض صور حالة علاجية حقيقية قبل العلاج وبعده، بعد الحصول على الموافقة اللازمة.",
    beforeImage: "",
    afterImage: "",
  },
  {
    id: 2,
    title: "فينيرز وتلبيس زركون",
    description: "سيتم هنا عرض صور حالة معتمدة توضح تفاصيل العلاج ونتيجته.",
    beforeImage: "",
    afterImage: "",
  },
  {
    id: 3,
    title: "تقويم الأسنان",
    description: "هذه البطاقة مخصصة لصور حالة تقويم حقيقية بعد اعتمادها من العيادة.",
    beforeImage: "",
    afterImage: "",
  },
];

function ResultImage({
  src,
  label,
  title,
}: {
  src?: string;
  label: string;
  title: string;
}) {
  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#EAF4FC] to-[#DCECF8]">
      {src ? (
        <img
          src={src}
          alt={`${label} - ${title}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 px-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C8E0F1] bg-white/60 text-[#7FA9C9] sm:h-14 sm:w-14">
            <Images size={25} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold leading-6 text-[#6887A4] sm:text-sm">بانتظار صورة معتمدة</p>
        </div>
      )}
      <p className="absolute right-2 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#032654] backdrop-blur-md sm:right-3">
        {label}
      </p>
    </div>
  );
}

function ResultCard({
  result,
  index,
  onOpen,
  reducedMotion,
}: {
  result: PatientResult;
  index: number;
  onOpen: () => void;
  reducedMotion: boolean;
}) {
  const hasImages = Boolean(result.beforeImage && result.afterImage);

  return (
    <motion.article
      data-result-card
      initial={false}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 24 }}
      className="w-[min(84vw,390px)] shrink-0 snap-start sm:w-[390px]"
    >
      <button
        type="button"
        aria-label={`عرض تفاصيل ${result.title}`}
        onClick={onOpen}
        className="group block w-full cursor-pointer text-right outline-none focus-visible:rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF]"
      >
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[27px] border border-[#D6E5F1] bg-white shadow-[0_12px_35px_rgba(3,38,84,0.06)] transition-shadow duration-300 group-hover:shadow-[0_22px_50px_rgba(3,38,84,0.14)]">
            <div className="grid h-full grid-cols-2 gap-[2px] bg-[#C8DBEA]">
              <ResultImage src={result.beforeImage} label="قبل العلاج" title={result.title} />
              <ResultImage src={result.afterImage} label="بعد العلاج" title={result.title} />
            </div>
            <p className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#032654]">
              {hasImages ? "عرض الحالة" : "قيد الإضافة"}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 z-10"
            style={{ width: 76, height: 76, borderTopLeftRadius: 44, background: "#F8FAFC" }}
          />
          {[
            { bottom: 76, right: 0 },
            { bottom: 0, right: 76 },
          ].map((position, positionIndex) => (
            <div
              key={positionIndex}
              aria-hidden="true"
              className="pointer-events-none absolute z-10"
              style={{
                ...position,
                width: 25,
                height: 25,
                background: "radial-gradient(circle at top left, transparent 24.5px, #F8FAFC 25px)",
              }}
            />
          ))}
          <div className="absolute bottom-0 right-0 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-[#032654] text-white transition-colors duration-300 group-hover:bg-[#6BBAEF] group-hover:text-[#032654]">
            <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </button>
      <div className="mt-5 px-1 text-right">
        <p className="text-xs font-bold text-[#287DB7]">{String(index + 1).padStart(2, "0")} / نتائج المرضى</p>
        <h3 className="mt-2 text-[22px] font-bold leading-[1.5] text-[#032654]">{result.title}</h3>
        <p className="mt-2 text-sm font-medium leading-7 text-[#526176]">{result.description}</p>
      </div>
    </motion.article>
  );
}

function ResultDialog({
  selected,
  onClose,
  reducedMotion,
}: {
  selected: PatientResult;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: reducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#03182E]/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-dialog-title"
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: reducedMotion ? 0 : 0.25 }}
        className="my-auto w-full max-w-4xl overflow-hidden rounded-[26px] border border-[#DCE7F2] bg-white text-[#032654] shadow-[0_35px_100px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm font-bold text-[#287DB7]">تفاصيل الحالة</p>
            <h3 id="result-dialog-title" className="mt-2 text-xl font-bold leading-8 sm:text-3xl">{selected.title}</h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="إغلاق تفاصيل الحالة"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE7F2] bg-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-[#6BBAEF]"
          >
            <X size={21} />
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-[4/5] overflow-hidden rounded-[20px]">
              <ResultImage src={selected.beforeImage} label="قبل العلاج" title={selected.title} />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-[20px]">
              <ResultImage src={selected.afterImage} label="بعد العلاج" title={selected.title} />
            </div>
          </div>
          <p className="mt-6 text-base font-medium leading-8 text-[#475569]">
            {selected.beforeImage && selected.afterImage
              ? selected.description
              : "لم تتم إضافة الصور المعتمدة لهذه الحالة بعد. ستُعرض صور قبل العلاج وبعده عند توفرها وبعد موافقة المريض على نشرها."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Results() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<PatientResult | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const closeDialog = useCallback(() => setSelected(null), []);

  const navigate = (direction: number) => {
    const next = (activeIndex + direction + results.length) % results.length;
    setActiveIndex(next);
    const card = railRef.current?.querySelectorAll<HTMLElement>("[data-result-card]")[next];
    card?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const rightEdge = rail.getBoundingClientRect().right;
    const cards = rail.querySelectorAll<HTMLElement>("[data-result-card]");
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const difference = Math.abs(card.getBoundingClientRect().right - rightEdge);
      if (difference < distance) {
        closest = index;
        distance = difference;
      }
    });
    setActiveIndex((current) => current === closest ? current : closest);
  };

  return (
    <>
      <section
        id="results"
        dir="rtl"
        className="relative scroll-mt-28 overflow-hidden bg-[#F8FAFC] py-24 text-[#032654] md:py-28"
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <header className="flex flex-col justify-between gap-6 text-right md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[#287DB7]">من داخل العيادة</p>
              <h2 className="mt-4 text-[38px] font-bold leading-[1.4] sm:text-5xl lg:text-[58px]">نتائج المرضى</h2>
              <p className="mt-4 text-base font-medium leading-9 text-[#475569] md:text-lg">
                تصفّح الحالات بالسحب يمينًا ويسارًا. سنعرض صور قبل العلاج وبعده بعد اعتمادها والحصول على موافقة أصحابها.
              </p>
            </div>
            <div className="hidden items-center gap-3 self-start lg:flex lg:self-auto">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="الحالة السابقة"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#032654] transition-colors hover:bg-[#032654] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6BBAEF]"
              >
                <ArrowRight size={20} />
              </button>
              <p className="min-w-14 text-center text-sm font-bold tabular-nums text-[#032654]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(results.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="الحالة التالية"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#032654] transition-colors hover:bg-[#032654] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6BBAEF]"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
          </header>

          <div className="relative mt-12 md:mt-16">
            <div
              ref={railRef}
              dir="rtl"
              role="region"
              aria-label="معرض نتائج المرضى قابل للتمرير أفقيًا"
              tabIndex={0}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-8 pl-1 pr-1 focus-visible:outline-2 focus-visible:outline-[#6BBAEF] [scrollbar-width:thin] [scrollbar-color:#B7D5EC_transparent] sm:gap-7"
            >
              {results.map((result, index) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  index={index}
                  reducedMotion={reducedMotion}
                  onOpen={() => setSelected(result)}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-1 top-[clamp(100px,33vw,155px)] z-30 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="النتيجة السابقة"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#C7DEEF] bg-white/95 text-[#032654] shadow-[0_8px_24px_rgba(3,38,84,0.16)] backdrop-blur-sm transition-colors hover:border-[#6BBAEF] hover:bg-[#032654] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
              >
                <ArrowRight size={23} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="النتيجة التالية"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#C7DEEF] bg-white/95 text-[#032654] shadow-[0_8px_24px_rgba(3,38,84,0.16)] backdrop-blur-sm transition-colors hover:border-[#6BBAEF] hover:bg-[#032654] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
              >
                <ArrowLeft size={23} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          <p className="mt-1 text-center text-sm font-bold tabular-nums text-[#032654] lg:hidden">
            {String(activeIndex + 1).padStart(2, "0")} / {String(results.length).padStart(2, "0")}
          </p>

          <p className="mt-2 text-right text-sm font-medium leading-8 text-[#64748B]">
            اسحب البطاقات أفقيًا أو استخدم الأسهم للتنقل. الصور الحقيقية تُنشر فقط بعد موافقة المريض.
          </p>
        </div>
      </section>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selected && (
            <ResultDialog
              key={selected.id}
              selected={selected}
              onClose={closeDialog}
              reducedMotion={reducedMotion}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
