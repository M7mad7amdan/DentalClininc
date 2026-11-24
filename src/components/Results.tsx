import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ArrowUpLeft, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

type PatientResult = {
  id: string;
  number: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
};

const results: PatientResult[] = [
  {
    id: "patient-result-01",
    number: "01",
    image: "/PatientResult/FirstImg.png",
    alt: "صور مقارنة قبل وبعد للحالة الأولى",
    title: "ابتسامة بثقة متجددة",
    subtitle: "فرق يظهر في تفاصيل الابتسامة",
    description:
      "تُظهر الصور التغيّر في مظهر الابتسامة قبل العلاج وبعده، مع الاهتمام بتناسق الأسنان ومظهرها العام.",
  },
  {
    id: "patient-result-02",
    number: "02",
    image: "/PatientResult/SecondImg.png",
    alt: "صور مقارنة قبل وبعد للحالة الثانية",
    title: "جمال في كل تفصيلة",
    subtitle: "عناية بالمظهر والتناسق الطبيعي",
    description:
      "مقارنة بصرية توضح اختلاف مظهر الأسنان والابتسامة بين الصورتين، وتبرز أهمية العناية بالتفاصيل الجمالية.",
  },
  {
    id: "patient-result-03",
    number: "03",
    image: "/PatientResult/ThirdImg.png",
    alt: "صور مقارنة قبل وبعد للحالة الثالثة",
    title: "لمسة جمالية متناسقة",
    subtitle: "تفاصيل تصنع فرقًا في الابتسامة",
    description:
      "تُبرز الصور التغيّر في شكل الابتسامة وتناسق الأسنان. تختلف خيارات العلاج والنتائج بحسب تقييم كل حالة.",
  },
  {
    id: "patient-result-04",
    number: "04",
    image: "/PatientResult/ForthImg.png",
    alt: "صور متعددة لنتائج الحالة الرابعة",
    title: "لكل ابتسامة حكاية",
    subtitle: "رحلة نحو ابتسامة أكثر تناسقًا",
    description:
      "مجموعة صور توضح جوانب مختلفة من مظهر الابتسامة، مع إبراز التفاصيل التي تسهم في جمالها وتناسقها.",
  },
];

const cardSpring: Transition = {
  type: "spring",
  stiffness: 230,
  damping: 30,
  mass: 0.9,
};

type DialogPortalProps = {
  children: ReactNode;
};

function DialogPortal({ children }: DialogPortalProps) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

type ResultDialogProps = {
  selected: PatientResult | null;
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  transition: Transition;
  reduceMotion: boolean;
};

function ResultDialog({
  selected,
  onClose,
  dialogRef,
  closeButtonRef,
  transition,
  reduceMotion,
}: ResultDialogProps) {
  return (
    <DialogPortal>
      <AnimatePresence initial={false}>
        {selected && (
          <div
            key={selected.id}
            className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-4 sm:px-6"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[#032654]/75 backdrop-blur-[8px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
              onClick={onClose}
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`result-dialog-title-${selected.id}`}
              aria-describedby={`result-dialog-description-${selected.id}`}
              layoutId={`result-card-${selected.id}`}
              transition={transition}
              dir="rtl"
              className="relative z-10 flex max-h-[92dvh] w-full max-w-[900px] flex-col overflow-y-auto rounded-[26px] border border-[#DCE7F2] bg-white shadow-[0_30px_100px_rgba(3,38,84,0.3)] sm:rounded-[32px]"
            >
              <motion.div
                layoutId={`result-image-${selected.id}`}
                className="relative flex h-[270px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#EAF5FD] sm:h-[440px]"
              >
                <img
                  src={selected.image}
                  alt={selected.alt}
                  className="h-full w-full object-contain"
                />
              </motion.div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="إغلاق تفاصيل الحالة"
                className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#DCE7F2] bg-white/95 text-[#032654] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#E6F3FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C76AF] sm:left-6 sm:top-6"
              >
                <X size={21} aria-hidden="true" />
              </button>

              <div className="px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
                <motion.h3
                  id={`result-dialog-title-${selected.id}`}
                  layoutId={`result-title-${selected.id}`}
                  className="text-[27px] font-bold leading-[1.5] text-[#032654] sm:text-[37px]"
                >
                  {selected.title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    delay: reduceMotion ? 0 : 0.1,
                  }}
                >
                  <div aria-hidden="true" className="my-5 h-1 w-14 rounded-full bg-[#6BBAEF]" />
                  <p
                    id={`result-dialog-description-${selected.id}`}
                    className="max-w-2xl text-[16px] leading-[2.1] text-[#475569] sm:text-[18px]"
                  >
                    {selected.description}
                  </p>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 rounded-full bg-[#032654] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#0C76AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C76AF]"
                    >
                      العودة للنتائج
                      <ArrowUpLeft size={17} aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
}

export default function Results() {
  const [selected, setSelected] = useState<PatientResult | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const transition: Transition = reduceMotion ? { duration: 0 } : cardSpring;

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelected(null);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [selected]);

  function openResult(result: PatientResult, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSelected(result);
  }

  function handleCarouselScroll() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.children);
    const containerRect = carousel.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
  }

  function scrollToResult(index: number) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const targetIndex = Math.max(0, Math.min(index, results.length - 1));
    const target = carousel.children.item(targetIndex);
    if (!(target instanceof HTMLElement)) return;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIndex(targetIndex);
  }

  return (
    <section
      id="results"
      dir="rtl"
      aria-labelledby="patient-results-heading"
      className="scroll-mt-28 overflow-hidden bg-[#F8FAFC] px-4 py-20 sm:px-8 md:py-28 lg:px-10"
      style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-11 flex flex-col items-center text-center md:mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div aria-hidden="true" className="h-px w-10 bg-[#6BBAEF] sm:w-14" />
            <p className="text-[14px] font-semibold tracking-wide text-[#0C76AF] sm:text-[15px]">
              قصص ابتسامات
            </p>
            <div aria-hidden="true" className="h-px w-10 bg-[#6BBAEF] sm:w-14" />
          </div>

          <h2
            id="patient-results-heading"
            className="text-[36px] font-bold leading-[1.5] text-[#032654] sm:text-[47px] lg:text-[56px]"
          >
            نتائج المرضى
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-[2] text-[#475569] sm:text-[17px]">
            لمحات من حالات عولجت في العيادة، تُظهر تفاصيل مختلفة من رحلة العناية بالأسنان والابتسامة.
          </p>
        </motion.div>

        <LayoutGroup id="patient-results-layout">
          <div
            ref={carouselRef}
            dir="rtl"
            onScroll={handleCarouselScroll}
            aria-label="معرض نتائج المرضى"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                className="w-[87%] max-w-[420px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.button
                  type="button"
                  layoutId={`result-card-${result.id}`}
                  onClick={(event) => openResult(result, event)}
                  aria-haspopup="dialog"
                  aria-label={`عرض تفاصيل ${result.title}`}
                  className="group relative flex h-[390px] w-full flex-col overflow-hidden rounded-[26px] border border-[#DCE7F2] bg-white text-right shadow-[0_12px_36px_rgba(3,38,84,0.07)] outline-offset-4 transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(3,38,84,0.14)] focus-visible:outline-2 focus-visible:outline-[#0C76AF]"
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={transition}
                >
                  <div className="relative h-[262px] w-full shrink-0 overflow-hidden bg-[#EAF5FD]">
                    <motion.div
                      layoutId={`result-image-${result.id}`}
                      className="relative h-full w-full"
                    >
                      <img
                        src={result.image}
                        alt={result.alt}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5 transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </motion.div>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#032654]/10 via-transparent to-transparent"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute right-4 top-4 rounded-full border border-white/40 bg-[#032654]/85 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md"
                    >
                      {result.number}
                    </div>
                  </div>

                  <div className="flex min-h-0 flex-1 items-center justify-between gap-3 px-5 py-5">
                    <div className="min-w-0 flex-1">
                      <motion.h3
                        layoutId={`result-title-${result.id}`}
                        className="text-[19px] font-bold leading-[1.6] text-[#032654] xl:text-[20px]"
                      >
                        {result.title}
                      </motion.h3>
                      <p className="mt-1 text-[12px] leading-6 text-[#64748B] xl:text-[13px]">
                        {result.subtitle}
                      </p>
                    </div>

                    <div
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#032654] text-white transition-all duration-300 group-hover:rotate-90 group-hover:bg-[#0C76AF]"
                    >
                      <Plus size={21} aria-hidden="true" />
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 sm:hidden">
            <p className="flex items-center gap-2 text-[13px] text-[#475569]">
              اسحب لاستكشاف المزيد من النتائج
              <ChevronLeft size={16} aria-hidden="true" />
            </p>

            <div className="flex items-center justify-center gap-1">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => scrollToResult(index)}
                  aria-label={`الانتقال إلى ${result.title}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="flex h-10 items-center justify-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C76AF]"
                >
                  <motion.div
                    animate={{
                      width: activeIndex === index ? 25 : 8,
                      backgroundColor: activeIndex === index ? "#032654" : "#BFDCEF",
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className="h-[8px] rounded-full"
                  />
                </button>
              ))}
            </div>

            <p dir="ltr" className="text-[13px] tracking-wider text-[#64748B]" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")}
              {" / "}
              {String(results.length).padStart(2, "0")}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              onClick={() => scrollToResult(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="النتيجة السابقة"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#BFDCEF] bg-white text-[#032654] transition-colors hover:bg-[#E6F3FD] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#0C76AF]"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToResult(activeIndex + 1)}
              disabled={activeIndex === results.length - 1}
              aria-label="النتيجة التالية"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#032654] text-white transition-colors hover:bg-[#0C76AF] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#0C76AF]"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          </div>

          <ResultDialog
            selected={selected}
            onClose={() => setSelected(null)}
            dialogRef={dialogRef}
            closeButtonRef={closeButtonRef}
            transition={transition}
            reduceMotion={reduceMotion}
          />
        </LayoutGroup>
      </div>
    </section>
  );
}
