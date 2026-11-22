
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircleHeart,
  Sparkles,
} from "lucide-react";
import Testimonial3DCard, {
  type Testimonial,
} from "@/components/testimonial-3d-card";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "رأي مريض",
    treatment: "تجربة علاجية",
    quote:
      "سيظهر هنا نص تجربة المريض بعد موافقته على نشرها. نحرص على عرض الآراء الحقيقية كما وردت من أصحابها.",
  },
  {
    id: 2,
    name: "رأي مريض",
    treatment: "تجميل الأسنان",
    quote:
      "هذه مساحة مخصصة لعرض رأي حقيقي حول تجربة المريض في العيادة بعد الحصول على النص المعتمد.",
  },
  {
    id: 3,
    name: "رأي مريض",
    treatment: "زراعة الأسنان",
    quote:
      "سيتم إدراج تجربة أحد المرضى هنا بعد استلام التقييم والتحقق من موافقته على عرضه في الموقع.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();

  const navigate = (delta: number) => {
    setDirection(delta);
    setActive(
      (current) =>
        (current + delta + testimonials.length) %
        testimonials.length
    );
  };

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduced ? 0 : dir * 65,
      scale: reduced ? 1 : 0.94,
      rotate: reduced ? 0 : dir * 3,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduced ? 0 : dir * -65,
      scale: reduced ? 1 : 0.96,
      rotate: reduced ? 0 : dir * -3,
    }),
  };

  return (
    <section
      id="testimonials"
      dir="rtl"
      className="relative overflow-hidden bg-white px-4 py-24 text-[#032654] md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute right-[-200px] top-20 h-[450px] w-[450px] rounded-full bg-[#6BBAEF]/10 blur-[110px]" />

      <div className="pointer-events-none absolute bottom-0 left-[-170px] h-[400px] w-[400px] rounded-full bg-[#DBEAFE]/50 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={
            reduced
              ? false
              : { opacity: 0, y: 25 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduced ? 0 : 0.55,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCEAF7] bg-[#F0F8FF] px-5 py-2.5 text-sm font-semibold text-[#032654]">
            <Sparkles
              size={16}
              className="text-[#328ACB]"
            />
            تجارب مرضانا
          </div>

          <h2 className="text-4xl font-bold leading-[1.4] tracking-tight text-[#032654] md:text-6xl">
            كلمات تعبّر
            <strong className="block font-bold text-[#287DB7]">
              عن الثقة
            </strong>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-base font-medium leading-9 text-[#475569] md:text-lg">
            كل تجربة تحمل حكاية مختلفة.
            هنا نشارك كلمات مرضانا بعد موافقتهم،
            لتكون الثقة مبنية على تجارب حقيقية.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-4xl md:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-[-8px] top-6 rounded-[40px] border border-[#C7E4F8] bg-[#DDEFFC] opacity-80"
            style={{
              transform: "rotate(-3deg)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-[-8px] top-6 rounded-[40px] border border-[#DCE7F2] bg-[#F8FAFC]"
            style={{
              transform: "rotate(3deg)",
            }}
          />

          <div
            aria-live="polite"
            aria-atomic="true"
            className="relative z-10 px-2 py-6 md:px-10"
          >
            <AnimatePresence
              mode="wait"
              custom={direction}
            >
              <motion.div
                key={testimonials[active].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reduced ? 0 : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Testimonial3DCard
                  testimonial={testimonials[active]}
                  index={active}
                  total={testimonials.length}
                  onSwipe={navigate}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="الرأي السابق"
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#032654] shadow-[0_5px_20px_rgba(3,38,84,0.05)] transition-all duration-300 hover:border-[#032654] hover:bg-[#032654] hover:text-white hover:shadow-[0_10px_25px_rgba(3,38,84,0.15)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6BBAEF]"
          >
            <ArrowRight size={20} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`عرض الرأي ${index + 1}`}
                aria-current={
                  index === active
                    ? "true"
                    : undefined
                }
                onClick={() => {
                  setDirection(
                    index > active ? 1 : -1
                  );
                  setActive(index);
                }}
                className="flex h-8 items-center justify-center"
              >
                <motion.div
                  animate={{
                    width: active === index ? 32 : 8,
                    backgroundColor:
                      active === index
                        ? "#032654"
                        : "#BDDDF3",
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.25,
                  }}
                  className="h-2 rounded-full"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="الرأي التالي"
            onClick={() => navigate(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#032654] shadow-[0_5px_20px_rgba(3,38,84,0.05)] transition-all duration-300 hover:border-[#032654] hover:bg-[#032654] hover:text-white hover:shadow-[0_10px_25px_rgba(3,38,84,0.15)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6BBAEF]"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[#64748B]">
          <MessageCircleHeart
            size={17}
            className="text-[#328ACB]"
          />

          <p>
            اسحب البطاقة أو استخدم الأسهم لتصفح الآراء
          </p>
        </div>
      </div>
    </section>
  );
}
