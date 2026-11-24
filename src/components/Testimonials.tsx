import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";
import Testimonial3DCard from "./testimonial-3d-card";
import type { Testimonial } from "./testimonial-3d-card";

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "الله يسعدك دكتور، والله إنت صرت دكتورنا المفضل، يا ريت لو عرفناك من زمان! كل الاحترام إلك ومنتشرف جداً إنّا تعرفنا عليك. الله يوفقك بشغلك وتكبر أكتر وأكتر ❤️🙏",
  },
  {
    id: 2,
    quote:
      "شكراً كتير على تعاملك اللطيف وشغلك النضيف، وشكراً لأنك بتشتغل بقلب وبمخافة ربنا. أنا عادةً بخاف من دكاترة الأسنان، بس أول مرة بحياتي بحس إني مرتاحة وما في ولا نتفة خوف. الله يوفقك ويبعتلك الخير بطريقك دايماً.",
  },
  {
    id: 3,
    quote:
      "معك بنقدر نقول وداعاً للفوبيا من دكاترة الأسنان. إنت دكتور بتجمع بين الإتقان والأمان بشغلك، كل التقدير إلك.",
  },
  {
    id: 4,
    quote:
      "للأمانة ما شفت مثل عيادتك من شغل واهتمام وإتقان وذوق وأناقة، بحس حالي بعالم موازي عندك، خاصة بغرفة الانتظار. والحلو إنك بتحب شغلك، وهاد اللي بخليك ناجح وبخلي الناس تحس بأمان وراحة. دكتور مثالي.",
  },
  {
    id: 5,
    quote:
      "والله بيرفكت، كل شي تمام. عملية الزراعة كانت سهلة، ما في وجع ومش مزعجة، والحمد لله بعد الزرعة ما حسيت بإشي وبسرعة شفي مكانها.",
  },
];

const deckSpring = {
  type: "spring" as const,
  stiffness: 185,
  damping: 26,
  mass: 0.9,
};

const cardVariants = {
  enter: (direction: number) => ({
    opacity: 0.94,
    x: direction > 0 ? 22 : -22,
    y: 22,
    scale: 0.94,
    rotate: direction > 0 ? 2.5 : -2.5,
    zIndex: 30,
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    zIndex: 30,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "-115%" : "115%",
    y: -20,
    scale: 0.95,
    rotate: direction > 0 ? -12 : 12,
    zIndex: 40,
  }),
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const move = (amount: number) => {
    if (isMoving) return;
    setIsMoving(true);
    setDirection(amount > 0 ? 1 : -1);
    setActiveIndex((current) =>
      (current + amount + testimonials.length) % testimonials.length
    );
  };

  const goTo = (index: number) => {
    if (isMoving || index === activeIndex) return;
    const forwards =
      (index - activeIndex + testimonials.length) % testimonials.length;
    const backwards =
      (activeIndex - index + testimonials.length) % testimonials.length;
    setIsMoving(true);
    setDirection(forwards <= backwards ? 1 : -1);
    setActiveIndex(index);
  };

  const backgroundCards = [2, 1];

  return (
    <section
      id="testimonials"
      dir="rtl"
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#F8FAFC] px-4 py-16 text-[#032654] sm:px-6 sm:py-20 md:py-28"
      style={{ fontFamily: '"Tajawal", "IBM Plex Sans Arabic", sans-serif' }}
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#6BBAEF]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#6BBAEF]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduced ? 0 : 0.65 }}
          className="mb-8 text-center sm:mb-12 md:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-9 bg-[#6BBAEF]" aria-hidden="true" />
            <p className="text-sm font-bold text-[#287DB7] sm:text-base">
              تجارب مرضانا
            </p>
            <div className="h-px w-9 bg-[#6BBAEF]" aria-hidden="true" />
          </div>
          <h2
            id="testimonials-heading"
            className="text-[30px] font-extrabold leading-[1.4] text-[#032654] sm:text-5xl lg:text-[60px]"
          >
            كلمات تعبّر عن الثقة
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#475569] sm:text-lg">
            كلمات شاركها مراجعو العيادة عن تجاربهم معنا.
          </p>
        </motion.header>

        <div
          className="relative mx-auto h-[clamp(200px,58vw,248px)] w-full max-w-[520px] sm:h-[520px] sm:max-w-[740px] lg:h-[480px]"
          style={{ perspective: "1600px" }}
          aria-roledescription="مجموعة بطاقات آراء المرضى"
          aria-label="آراء المرضى"
        >
          {backgroundCards.map((depth) => {
            const index =
              (activeIndex + depth) % testimonials.length;

            return (
              <motion.div
                key={`back-layer-${depth}`}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ zIndex: 20 - depth * 5 }}
                initial={false}
                animate={
                  reduced
                    ? {
                        x: 0,
                        y: depth * (isMobile ? 8 : 16),
                        scale: 1 - depth * (isMobile ? 0.03 : 0.045),
                      }
                    : {
                        x: depth === 1 ? (isMobile ? -7 : -10) : (isMobile ? 7 : 12),
                        y: depth * (isMobile ? 11 : 23),
                        scale: 1 - depth * (isMobile ? 0.035 : 0.055),
                        rotate: depth === 1 ? (isMobile ? 1 : 2.2) : (isMobile ? -1.2 : -2.5),
                      }
                }
                transition={reduced ? { duration: 0 } : deckSpring}
              >
                <Testimonial3DCard
                  testimonial={testimonials[index]}
                  index={index}
                  total={testimonials.length}
                  preview
                />
              </motion.div>
            );
          })}

          <AnimatePresence
            initial={false}
            custom={direction}
            onExitComplete={() => setIsMoving(false)}
          >
            <motion.div
              key={testimonials[activeIndex].id}
              className="absolute inset-0"
              variants={cardVariants}
              custom={direction}
              initial={reduced ? false : "enter"}
              animate="center"
              exit="exit"
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      x: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                      y: deckSpring,
                      scale: deckSpring,
                      rotate: { duration: 0.42 },
                      opacity: { duration: 0.3 },
                    }
              }
            >
              <Testimonial3DCard
                testimonial={testimonials[activeIndex]}
                index={activeIndex}
                total={testimonials.length}
                onSwipe={move}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-10 flex items-center justify-center gap-4 sm:mt-14 sm:gap-8">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={isMoving}
            aria-label="الرأي السابق"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C8DDEE] bg-white text-[#032654] transition-all duration-300 hover:border-[#032654] hover:bg-[#032654] hover:text-white disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
          >
            <ArrowRight size={21} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => goTo(index)}
                disabled={isMoving}
                aria-label={`عرض الرأي ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="flex h-10 items-center justify-center px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
              >
                <motion.div
                  className="h-2 rounded-full"
                  animate={{
                    width: activeIndex === index ? 26 : 8,
                    backgroundColor:
                      activeIndex === index ? "#032654" : "#AACCE6",
                  }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            disabled={isMoving}
            aria-label="الرأي التالي"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#032654] text-white transition-colors hover:bg-[#14528C] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
          >
            <ArrowLeft size={21} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-[#64748B] sm:text-sm">
          <MoveHorizontal size={16} aria-hidden="true" />
          <p className="hidden sm:block">اسحب البطاقة يمينًا أو يسارًا لمشاهدة المزيد</p>
          <p className="sm:hidden">اسحب أفقيًا للتنقل، ومرّر النص للأعلى لقراءته كاملًا</p>
        </div>
        <p
          className="mt-3 text-center text-xs font-medium tracking-widest text-[#64748B]"
          dir="ltr"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(testimonials.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
