import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  Award,
  FileImage,
  X,
} from "lucide-react";

type Certificate = {
  id: number;
  title: string;
  image: string;
  description: string;
  year?: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "التصميم الرقمي للابتسامة وتركيبات الأسنان",
    description: "تدرّب د. رأفت عمليًا على تصميم الابتسامات وتركيبات الأسنان ببرنامج exocad، بما فيها الأسنان التي تُثبَّت على الزرعات. أُقيم التدريب في مركز فوكسل واي بالقاهرة بإشراف د. مصطفى صلاح.",
    year: "2024",
    image: "/Photos/Certificates/01-exocad (1).webp",
  },
  {
    id: 2,
    title: "تصميم الابتسامة بالقشور التجميلية (الفينيرز)",
    description: "أتمّ د. رأفت ٥٠ ساعة تدريبية في تصميم القشور التجميلية (الفينيرز) والتخطيط للعلاج بها لدى Leeds Training College البريطانية. ومن تفاصيل هذا التخطيط اختيار طول الأسنان وشكل حوافها بما ينسجم مع الابتسامة.",
    year: "2024",
    image: "/Photos/Certificates/02-veneers-leeds (1).webp",
  },
  {
    id: 3,
    title: "التدريب على الفينيرز بإشراف د. محمد شمس",
    description: "توثّق شهادة A2Z مشاركة د. رأفت في دورة القشور التجميلية بإشراف د. محمد شمس، بواقع ٥٠ ساعة تدريبية.",
    year: "2024",
    image: "/Photos/Certificates/03-veneers-a2z (1).webp",
  },
  {
    id: 4,
    title: "زراعة الأسنان وتعويض الأسنان المفقودة",
    description: "أتمّ د. رأفت برنامجًا من ١٨٠ ساعة في زراعة الأسنان لدى Leeds Training College البريطانية، شمل أساسيات تعويض الأسنان المفقودة بالزرعات وتقنيات الزراعة المتقدّمة.",
    year: "2024",
    image: "/Photos/Certificates/04-implants (1).webp",
  },
  {
    id: 5,
    title: "علاج العصب والحفاظ على السنّ الطبيعي",
    description: "أكمل د. رأفت برنامج MAX لعلاج العصب في أكاديمية Novodux، بواقع ١٢٠ ساعة شملت أساسيات علاج قنوات الجذور وتقنياته المتقدّمة، بهدف الحفاظ على السنّ الطبيعي متى أمكن.",
    year: "2024",
    image: "/Photos/Certificates/05-endo-novodux (1).webp",
  },
  {
    id: 6,
    title: "علاج العصب بإشراف د. مصطفى أنور",
    description: "توثّق الجمعية المصرية لطب زراعة الفم والأسنان (ESOI) ساعات برنامج MAX لعلاج العصب الذي تلقّاه د. رأفت في القاهرة بإشراف د. مصطفى أنور.",
    year: "2024",
    image: "/Photos/Certificates/06-endo-esoi (1).webp",
  },
  {
    id: 7,
    title: "عضوية نقابة أطباء الأسنان الفلسطينية",
    description: "د. رأفت ماجد عضو مسجّل في نقابة أطباء الأسنان الفلسطينية.",
    year: "2026",
    image: "/Photos/Certificates/07-membership (1).webp",
  },
  {
    id: 8,
    title: "زراعة الأسنان بإشراف د. عمرو إكرام",
    description: "توثّق شهادة A2Z مشاركة د. رأفت في برنامج زراعة الأسنان الأساسي والمتقدّم بإشراف د. عمرو إكرام، بواقع ١٨٠ ساعة تدريبية.",
    year: "2024",
    image: "/Photos/Certificates/08-implants-a2z (1).webp",
  },
  {
    id: 9,
    title: "التدريب النظري والعملي في علاج العصب",
    description: "تشهد وثيقة المعهد الأمريكي لعلوم الرعاية الصحية (AIHS) بإتمام د. رأفت المتطلبات النظرية والعملية لبرنامج MAX في علاج العصب بمستوييه الأساسي والمتقدّم.",
    year: "2024",
    image: "/Photos/Certificates/09-endo-aihs (1).webp",
  },
  {
    id: 10,
    title: "التدريب في تجميل الوجه",
    description: "أتمّ د. رأفت ٢٤ ساعة من التعليم المستمر في تجميل الوجه مع د. نوري عادل في القاهرة، وفق سجلّ الجمعية المصرية لطب زراعة الفم والأسنان (ESOI).",
    year: "2024",
    image: "/Photos/Certificates/10-facial-aesthetics (1).webp",
  },
  {
    id: 11,
    title: "المؤتمر العربي لطب الأسنان",
    description: "حضر د. رأفت ٢٠ ساعة علمية ضمن المؤتمر العربي الخامس لطب الأسنان في جامعة مصر للعلوم والتكنولوجيا، لمتابعة المستجدّات في طب الأسنان.",
    year: "2021",
    image: "/Photos/Certificates/11-adc (1).webp",
  },
];

function CertificateImage({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#EDF5FB]">
      {!loaded && (
        <div className="flex flex-col items-center gap-3 px-4 text-center">
          <FileImage size={33} strokeWidth={1.5} className="text-[#83B2D5]" />
          <p className="text-sm font-medium text-[#476783]">
            {failed ? "تعذّر تحميل الصورة، تأكد من اسم الملف داخل Photos/Certificates" : "جاري تحميل الشهادة"}
          </p>
        </div>
      )}
      {!failed && (
        <img
          src={image}
          alt={title}
          loading="eager"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-contain p-3 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export default function Certificates() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const previewX = useSpring(targetX, { stiffness: 340, damping: 32 });
  const previewY = useSpring(targetY, { stiffness: 340, damping: 32 });
  const isDialogOpen = selectedIndex !== null;
  const selected = selectedIndex === null ? null : certificates[selectedIndex];

  const movePreview = (event: MouseEvent<HTMLButtonElement>, immediate = false) => {
    const width = 300;
    const height = 265;
    const x = Math.max(12, Math.min(event.clientX + 22, window.innerWidth - width - 12));
    const y = Math.max(12, Math.min(event.clientY - height / 2, window.innerHeight - height - 12));

    if (immediate || reducedMotion) {
      previewX.jump(x);
      previewY.jump(y);
    } else {
      targetX.set(x);
      targetY.set(y);
    }
  };

  const goToMobile = (index: number) => {
    const next = (index + certificates.length) % certificates.length;
    setMobileIndex(next);
    const card = railRef.current?.querySelectorAll<HTMLElement>("[data-certificate-card]")[next];
    card?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const updateMobileIndex = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-certificate-card]"));
    const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    const nearest = cards.reduce(
      (best, card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Infinity }
    );
    setMobileIndex(nearest.index);
  };

  useEffect(() => {
    if (!isDialogOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) => current === null ? null : (current + 1) % certificates.length);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) => current === null ? null : (current - 1 + certificates.length) % certificates.length);
      } else if (event.key === "Tab") {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])") ?? []);
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isDialogOpen]);

  return (
    <>
      <section
        id="certificates"
        dir="rtl"
        className="scroll-mt-28 bg-[#F8FAFC] px-4 pb-20 pt-32 text-[#032654] sm:px-6 md:px-10 md:pb-28 md:pt-36"
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CEE4F5] bg-white px-4 py-2 text-sm font-semibold text-[#20689E]">
              <Award size={17} />
              المؤهلات والتطور المهني
            </div>
            <h2 className="text-4xl font-bold leading-[1.4] sm:text-5xl lg:text-[60px]">
              شهادات تحكي مسيرة التعلّم
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-9 text-[#475569] md:text-lg">
              تعرّف على الشهادات والمؤهلات المهنية من خلال معرض واضح يتيح قراءة كل شهادة بحجمها الكامل.
            </p>
          </header>

          <div className="hidden border-b border-[#D7E4F0] lg:block">
            {certificates.map((certificate, index) => (
              <motion.button
                key={certificate.id}
                type="button"
                onMouseEnter={(event) => {
                  movePreview(event, true);
                  setHoveredIndex(index);
                }}
                onMouseMove={(event) => movePreview(event)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  previewX.jump(Math.max(12, Math.min(rect.left + rect.width - 310, window.innerWidth - 312)));
                  previewY.jump(Math.max(12, Math.min(rect.top - 40, window.innerHeight - 280)));
                  setHoveredIndex(index);
                }}
                onBlur={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(index)}
                aria-label={`فتح ${certificate.title}`}
                className="group relative flex w-full items-center gap-5 border-t border-[#D7E4F0] px-5 py-7 text-right outline-none transition-colors duration-300 hover:bg-[#EAF4FC] focus-visible:bg-[#EAF4FC] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6BBAEF] xl:py-9"
              >
                <p className="w-14 shrink-0 text-sm font-bold tabular-nums text-[#3983B7]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[28px] font-bold leading-[1.5] text-[#032654] transition-transform duration-300 group-hover:-translate-x-1 xl:text-[34px]">
                    {certificate.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#64748B]">
                    {certificate.description}
                  </p>
                </div>
                {certificate.year && (
                  <p className="text-sm font-semibold tabular-nums text-[#64748B]">{certificate.year}</p>
                )}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C8DDEE] text-[#032654] transition-all duration-300 group-hover:border-[#032654] group-hover:bg-[#032654] group-hover:text-white">
                  <ArrowUpLeft size={22} />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:hidden">
            <div
              ref={railRef}
              onScroll={updateMobileIndex}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="معرض الشهادات"
            >
              {certificates.map((certificate, index) => (
                <button
                  key={certificate.id}
                  type="button"
                  data-certificate-card
                  onClick={() => setSelectedIndex(index)}
                  className="group w-[84%] shrink-0 snap-center overflow-hidden rounded-[26px] border border-[#D9E6F0] bg-white p-4 text-right shadow-[0_14px_35px_rgba(3,38,84,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[#6BBAEF] sm:w-[52%]"
                  aria-label={`فتح ${certificate.title}`}
                >
                  <div className="h-[280px] overflow-hidden rounded-[17px] bg-[#EDF5FB] sm:h-[315px]">
                    <CertificateImage image={certificate.image} title={certificate.title} />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-5">
                    <div>
                      <p className="text-xs font-bold text-[#287DB7]">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 text-lg font-bold leading-8 text-[#032654]">{certificate.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-[#64748B]">{certificate.description}</p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#032654] text-white">
                      <ArrowUpLeft size={19} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToMobile(mobileIndex - 1)}
                aria-label="الشهادة السابقة"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9DCEC] bg-white text-[#032654]"
              >
                <ArrowRight size={21} />
              </button>
              <p className="text-sm font-semibold tabular-nums text-[#526479]">
                {String(mobileIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => goToMobile(mobileIndex + 1)}
                aria-label="الشهادة التالية"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9DCEC] bg-white text-[#032654]"
              >
                <ArrowLeft size={21} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: hoveredIndex === null ? 0 : 1, scale: hoveredIndex === null ? 0.94 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        style={{ x: previewX, y: previewY }}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden w-[300px] overflow-hidden rounded-[22px] border border-[#CEE0EE] bg-white p-3 shadow-[0_22px_70px_rgba(3,38,84,0.22)] lg:block"
      >
        <div className="h-[225px] overflow-hidden rounded-[14px]">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div
                key={certificates[hoveredIndex].id}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                className="h-full w-full"
              >
                <CertificateImage
                  image={certificates[hoveredIndex].image}
                  title={certificates[hoveredIndex].title}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="px-2 pb-1 pt-3 text-right text-sm font-bold text-[#032654]">
          {hoveredIndex !== null ? certificates[hoveredIndex].title : ""}
        </p>
      </motion.div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                key="certificate-dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setSelectedIndex(null);
                }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#03182E]/85 p-3 backdrop-blur-sm sm:p-6"
              >
                <div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={selected.title}
                  dir="rtl"
                  className="flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] px-4 py-4 sm:px-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#032654] sm:text-xl">{selected.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#64748B]">{selected.description}</p>
                    </div>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      aria-label="إغلاق الشهادة"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF5FB] text-[#032654] hover:bg-[#DCECF8] focus-visible:outline-2 focus-visible:outline-[#6BBAEF]"
                    >
                      <X size={21} />
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto bg-[#F3F8FD] p-3 sm:p-6">
                    <div className="mx-auto h-[60dvh] max-h-[740px] w-full">
                      <CertificateImage key={selected.id} image={selected.image} title={selected.title} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#E2E8F0] px-4 py-3 sm:px-6">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex((current) => current === null ? null : (current - 1 + certificates.length) % certificates.length)}
                      aria-label="الشهادة السابقة"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C6DCEB] text-[#032654] hover:bg-[#EDF5FB]"
                    >
                      <ArrowRight size={21} />
                    </button>
                    <p className="text-sm font-bold tabular-nums text-[#475569]">
                      {String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex((current) => current === null ? null : (current + 1) % certificates.length)}
                      aria-label="الشهادة التالية"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C6DCEB] text-[#032654] hover:bg-[#EDF5FB]"
                    >
                      <ArrowLeft size={21} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
