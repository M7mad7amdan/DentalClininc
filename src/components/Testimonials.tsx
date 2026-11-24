import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { PanInfo, Transition } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

type Review = {
  id: number;
  name: string;
  treatment: string;
  text: string;
  rating?: number;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "رأي قيد الإضافة",
    treatment: "تجربة علاجية",
    text: "سيظهر هنا رأي أحد مرضى العيادة بعد استلام التقييم الحقيقي والحصول على موافقته على النشر.",
  },
  {
    id: 2,
    name: "رأي قيد الإضافة",
    treatment: "علاج الأسنان",
    text: "هذه المساحة مخصصة لتجربة حقيقية لأحد المرضى، وستُحدّث فور توفر النص المعتمد.",
  },
  {
    id: 3,
    name: "رأي قيد الإضافة",
    treatment: "تجميل الأسنان",
    text: "سيُعرض هنا تقييم موثّق عن تجربة المريض في العيادة بعد موافقته على مشاركته.",
  },
  {
    id: 4,
    name: "رأي قيد الإضافة",
    treatment: "متابعة العلاج",
    text: "نخصص هذه البطاقة لمراجعة حقيقية حول التواصل ومتابعة العلاج، عند توفرها من المريض.",
  },
  {
    id: 5,
    name: "رأي قيد الإضافة",
    treatment: "زيارة العيادة",
    text: "ستُضاف هنا تجربة جديدة من مرضى العيادة كما وردت من صاحبها، بعد الموافقة على النشر.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(360);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const total = reviews.length;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });

    observer.observe(element);
    setContainerWidth(element.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, []);

  const isMobile = containerWidth < 640;
  const cardWidth = Math.min(containerWidth * (isMobile ? 0.78 : 0.66), 415);
  const spacing = Math.min(containerWidth * (isMobile ? 0.38 : 0.32), 285);

  const spring: Transition = reducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 170, damping: 27, mass: 0.9 };

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  const previous = () => {
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const handlePanEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 50) return;
    if (info.offset.x < 0) next();
    else previous();
  };

  return (
    <section
      id="testimonials"
      dir="rtl"
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#F8FAFC] px-4 py-20 text-[#032654] sm:px-6 md:py-28"
      style={{ fontFamily: '"Tajawal", "IBM Plex Sans Arabic", sans-serif' }}
    >
      <div className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-[#6BBAEF]/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-80 w-80 rounded-full bg-[#6BBAEF]/10 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div aria-hidden="true" className="h-px w-9 bg-[#6BBAEF]" />
            <p className="text-sm font-bold text-[#287DB7] sm:text-base">تجارب مرضانا</p>
            <div aria-hidden="true" className="h-px w-9 bg-[#6BBAEF]" />
          </div>
          <h2
            id="testimonials-heading"
            className="text-[36px] font-extrabold leading-[1.4] tracking-tight text-[#032654] sm:text-5xl lg:text-[60px]"
          >
            كلمات تعبّر عن الثقة
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-8 text-[#475569] sm:text-lg sm:leading-9">
            مساحة مخصصة لآراء المرضى وتجاربهم الحقيقية بعد الحصول على موافقتهم على النشر.
          </p>
        </motion.header>

        <div
          ref={containerRef}
          aria-label="معرض آراء المرضى"
          aria-roledescription="عارض بطاقات"
          className="relative mx-auto h-[440px] w-full overflow-hidden sm:h-[470px]"
        >
          <motion.div className="relative h-full w-full touch-pan-y" onPanEnd={handlePanEnd}>
            {reviews.map((review, index) => {
              const offset = getOffset(index);
              const distance = Math.abs(offset);
              const isActive = offset === 0;
              const scale = isActive ? 1 : distance === 1 ? 0.87 : 0.74;

              return (
                <div
                  key={review.id}
                  className="absolute left-1/2 top-5"
                  style={{
                    width: cardWidth,
                    transform: "translateX(-50%)",
                    zIndex: total - distance,
                  }}
                >
                  <motion.article
                    initial={false}
                    animate={{
                      x: -offset * spacing,
                      scale,
                      rotate: reducedMotion ? 0 : offset * (isMobile ? 3 : 5),
                      y: isActive ? 0 : distance * 16,
                      opacity: isActive ? 1 : distance === 1 ? 0.86 : 0.48,
                    }}
                    transition={spring}
                    aria-hidden={!isActive}
                    className={`relative flex h-[385px] flex-col overflow-hidden rounded-[30px] border shadow-[0_22px_55px_rgba(3,38,84,0.12)] sm:h-[415px] ${
                      isActive
                        ? "border-[#032654] bg-[#032654] text-white"
                        : "border-[#C7E3F6] bg-[#E6F3FD] text-[#032654]"
                    }`}
                  >
                    <div className="flex items-start justify-between px-6 pt-7 sm:px-8">
                      <Quote
                        size={37}
                        strokeWidth={1.4}
                        className={isActive ? "text-[#6BBAEF]" : "text-[#287DB7]"}
                        aria-hidden="true"
                      />
                      <p className={`text-sm font-semibold tabular-nums ${isActive ? "text-white/70" : "text-[#44739A]"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>

                    {typeof review.rating === "number" && (
                      <div
                        className="mt-4 flex items-center justify-center gap-1"
                        role="img"
                        aria-label={`${review.rating} من 5 نجوم`}
                      >
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={19}
                            fill={starIndex < review.rating! ? "#6BBAEF" : "none"}
                            color="#6BBAEF"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex flex-1 items-center justify-center px-7 py-6 text-center sm:px-9">
                      <blockquote
                        className={`text-[19px] font-medium leading-[1.9] sm:text-[22px] sm:leading-[1.95] ${
                          isActive ? "text-white" : "text-[#032654]"
                        }`}
                        style={{ fontFamily: '"Noto Naskh Arabic", "Amiri", serif' }}
                      >
                        {review.text}
                      </blockquote>
                    </div>

                    <div className={`mx-7 mb-7 border-t pt-5 text-center ${isActive ? "border-white/20" : "border-[#ABCFE7]"}`}>
                      <p className="text-[17px] font-bold sm:text-xl">{review.name}</p>
                      <p className={`mt-1 text-xs font-medium sm:text-sm ${isActive ? "text-white/65" : "text-[#526F88]"}`}>
                        {review.treatment}
                      </p>
                    </div>
                  </motion.article>

                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`عرض البطاقة ${index + 1}`}
                      className="absolute inset-0 z-10 cursor-pointer rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        <nav aria-label="التنقل بين الآراء" className="mt-4 flex items-center justify-center gap-4 sm:gap-7">
          <button
            type="button"
            onClick={previous}
            aria-label="التقييم السابق"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8DDEE] bg-white text-[#032654] transition-all duration-300 hover:-translate-y-1 hover:border-[#032654] hover:bg-[#032654] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
          >
            <ArrowRight size={21} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`الانتقال إلى البطاقة ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="flex h-10 items-center justify-center"
              >
                <motion.div
                  animate={{
                    width: activeIndex === index ? 30 : 9,
                    backgroundColor: activeIndex === index ? "#032654" : "#B7D9EF",
                  }}
                  transition={spring}
                  className="h-[9px] rounded-full"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="التقييم التالي"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8DDEE] bg-white text-[#032654] transition-all duration-300 hover:-translate-y-1 hover:border-[#032654] hover:bg-[#032654] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
          >
            <ArrowLeft size={21} aria-hidden="true" />
          </button>
        </nav>

        <p dir="ltr" className="mt-3 text-center text-sm font-semibold tabular-nums text-[#64748B]">
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(total).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
