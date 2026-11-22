"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpLeft, ChevronLeft } from "lucide-react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext,
} from "@/components/animated-slideshow";

const features = [
  {
    id: "listening",
    title: "عناية تبدأ بالاستماع",
    description: "نبدأ بفهم احتياجك وأسئلتك، لأن كل ابتسامة لها تفاصيلها الخاصة.",
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "صورة توضيحية مرتبطة بالعناية بالأسنان",
  },
  {
    id: "clarity",
    title: "شرح واضح لكل خطوة",
    description: "نركّز على توضيح الخيارات العلاجية والخطوات المقترحة بلغة بسيطة ومفهومة.",
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "صورة توضيحية لطبيب أسنان في بيئة طبية",
  },
  {
    id: "attention",
    title: "اهتمام بالتفاصيل",
    description: "من تقييم الحالة إلى مناقشة النتيجة المرجوة، نهتم بالتفاصيل التي تصنع فرقًا.",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "صورة توضيحية لبيئة عناية بالأسنان",
  },
  {
    id: "comfort",
    title: "تواصل مريح وبسيط",
    description: "نوفر طريقة مباشرة للاستفسار عن الخدمات وبدء تنسيق موعدك عبر واتساب.",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "صورة توضيحية مرتبطة بتجربة مراجعة الأسنان",
  },
];

function FeatureHeading() {
  return (
    <header>
      <div className="mb-5 flex items-center gap-3 text-sm font-bold text-[#287DB7]">
        <div className="h-[2px] w-9 rounded-full bg-[#6BBAEF]" />
        <p>التفاصيل تصنع الفرق</p>
      </div>
      <h2 className="text-[38px] font-bold leading-[1.4] tracking-tight text-[#032654] sm:text-5xl lg:text-[56px]">
        لماذا تختارنا؟
      </h2>
      <p className="mt-4 max-w-xl text-base font-medium leading-8 text-[#475569] sm:text-lg sm:leading-9">
        نؤمن أن الاهتمام براحة المريض ووضوح خطوات العلاج جزء مهم من تجربة العناية بالأسنان.
      </p>
    </header>
  );
}

function DesktopFeatures() {
  const { activeSlide } = useHoverSliderContext();
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <div className="mt-9 hidden border-t border-[#DFE8F1] lg:block">
      {features.map((feature, index) => {
        const active = activeSlide === index;
        return (
          <div key={feature.id} className="border-b border-[#DFE8F1] py-5">
            <div className="flex items-center gap-4">
              <p className={`w-8 shrink-0 text-sm font-bold tabular-nums ${active ? "text-[#2375AE]" : "text-[#94A3B8]"}`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <TextStaggerHover
                index={index}
                text={feature.title}
                className="min-w-0 flex-1 text-[27px] font-bold leading-[1.45] tracking-tight xl:text-[31px]"
              />
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{
                  rotate: active ? -45 : 0,
                  backgroundColor: active ? "#032654" : "#EAF5FD",
                  color: active ? "#FFFFFF" : "#6485A0",
                }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              >
                <ArrowUpLeft size={20} />
              </motion.div>
            </div>
            <AnimatePresence initial={false}>
              {active && (
                <motion.p
                  key={feature.id}
                  initial={reducedMotion ? false : { opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={reducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: reducedMotion ? 0 : 0.28 }}
                  className="mr-12 overflow-hidden text-base font-medium leading-8 text-[#52657A]"
                >
                  {feature.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <p className="mt-5 text-sm font-medium text-[#64748B]">مرّر على العنوان أو اضغط عليه لتغيير الصورة.</p>
    </div>
  );
}

function FeatureVisual() {
  const { activeSlide } = useHoverSliderContext();
  return (
    <div className="min-w-0">
      <div className="relative h-[270px] overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-[#E7F1F9] shadow-[0_20px_50px_-25px_rgba(3,38,84,0.24)] min-[400px]:h-[330px] sm:h-[460px] lg:h-[550px] lg:rounded-[36px]">
        <HoverSliderImageWrap>
          {features.map((feature, index) => (
            <HoverSliderImage
              key={feature.id}
              index={index}
              imageUrl={feature.imageUrl}
              alt={feature.imageAlt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </HoverSliderImageWrap>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium leading-6 text-[#64748B] sm:text-sm">
          صور توضيحية، وليست صورًا فعلية للعيادة
        </p>
        <p className="shrink-0 text-sm font-bold tabular-nums text-[#287DB7]">
          {String(activeSlide + 1).padStart(2, "0")}
          {" / "}
          {String(features.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

function MobileFeatures() {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const reducedMotion = Boolean(useReducedMotion());
  const selected = features[activeSlide];

  return (
    <div className="mt-5 lg:hidden">
      <div
        role="group"
        aria-label="مميزات العيادة"
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, index) => {
          const active = activeSlide === index;
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => changeSlide(index)}
              aria-pressed={active}
              className={`min-h-12 shrink-0 snap-start rounded-full border px-5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF] ${active ? "border-[#032654] bg-[#032654] text-white" : "border-[#D6E6F2] bg-white text-[#032654]"}`}
            >
              {feature.title}
            </button>
          );
        })}
      </div>
      <div className="min-h-[142px] rounded-[22px] border border-[#DCE8F2] bg-white px-5 py-5 sm:min-h-[125px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.23 }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold leading-7 text-[#032654]">{selected.title}</h3>
              <ChevronLeft size={19} className="shrink-0 text-[#287DB7]" aria-hidden="true" />
            </div>
            <p className="mt-2 text-sm font-medium leading-7 text-[#475569]">{selected.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-xs font-medium text-[#64748B]">اسحب العناوين أفقيًا واضغط على أي ميزة لتبديل الصورة.</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      dir="rtl"
      className="relative scroll-mt-28 bg-[#F8FAFC] px-4 pb-20 pt-32 text-[#032654] sm:px-6 lg:px-10 lg:py-28"
      style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
    >
      <HoverSlider className="mx-auto grid max-w-7xl items-start gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <FeatureHeading />
          <DesktopFeatures />
        </div>
        <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:pt-4">
          <FeatureVisual />
          <MobileFeatures />
        </div>
      </HoverSlider>
    </section>
  );
}
