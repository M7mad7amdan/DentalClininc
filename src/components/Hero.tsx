"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, CalendarDays, ShieldCheck } from "lucide-react";

export default function Hero() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#032654] text-white"
      style={{
        fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif',
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Photos/HeroSection/clinic-hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,38,84,0.82)_0%,rgba(3,38,84,0.72)_32%,rgba(3,38,84,0.48)_58%,rgba(3,38,84,0.22)_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(107,186,239,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pt-32 pb-16 sm:px-8 md:px-10 lg:px-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold text-[#D9ECFA] md:text-base">
            عناية متكاملة بابتسامة أكثر صحة وجمالاً
          </p>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.25] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            تجربة علاجية مريحة
            <br />
            داخل عيادة حديثة
            <br />
            تهتم بأدق التفاصيل
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#E8F3FB] md:text-lg md:leading-9">
            نقدم في عيادة د. رأفت ماجد خدمات طب وتجميل الأسنان
            بأسلوب حديث، في بيئة هادئة ونظيفة، مع اهتمام حقيقي
            براحتك وجودة النتيجة من أول زيارة وحتى نهاية الخطة
            العلاجية.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="#contact"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-white px-7 text-base font-bold text-[#032654] shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[#EAF5FD] hover:-translate-y-1"
            >
              احجز موعدك الآن
              <ArrowUpLeft size={20} />
            </a>

            <a
              href="#services"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/16 hover:-translate-y-1"
            >
              استكشف خدماتنا
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <CalendarDays size={20} />
              </div>

              <h2 className="text-lg font-bold">مواعيد مرنة وسريعة</h2>

              <p className="mt-2 text-sm leading-7 text-[#E6F0F8]">
                تواصل مباشر لحجز موعدك والاستفسار عن الخدمات
                والخطة المناسبة لحالتك.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <ShieldCheck size={20} />
              </div>

              <h2 className="text-lg font-bold">عناية دقيقة ونتائج موثوقة</h2>

              <p className="mt-2 text-sm leading-7 text-[#E6F0F8]">
                نركز على راحة المريض وجودة العلاج وتقديم تجربة
                احترافية داخل العيادة.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}