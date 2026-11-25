"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, CalendarDays, ShieldCheck, MapPin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reducedMotion = Boolean(useReducedMotion());

  const fadeUp = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.8, ease, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section
      id="home"
      dir="rtl"
      aria-labelledby="clinic-hero-title"
      className="relative isolate min-h-[640px] overflow-hidden bg-[#032654] text-white sm:min-h-[720px] lg:min-h-screen"
      style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:54%_center] lg:bg-center"
        style={{ backgroundImage: "url('/Photos/HeroSection/clinic-hero.jpg')" }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.54)_0%,rgba(0,0,0,0.48)_54%,rgba(0,0,0,0.61)_100%)] lg:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.32)_38%,rgba(0,0,0,0.50)_65%,rgba(0,0,0,0.62)_100%)] lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(107,186,239,0.08),transparent_48%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-7xl items-start px-5 pb-12 pt-[178px] sm:min-h-[720px] sm:px-8 lg:min-h-screen lg:items-center lg:px-12 lg:pb-16 lg:pt-32">
        <div className="w-full max-w-[520px] lg:max-w-3xl">
          <motion.p
            {...fadeUp(0.05)}
            className="mb-4 text-xs font-semibold leading-6 text-[#D9ECFA] sm:text-sm lg:text-base"
          >
            عناية متكاملة بابتسامة أكثر صحة وجمالًا
          </motion.p>

          <motion.h1
            {...fadeUp(0.14)}
            id="clinic-hero-title"
            className="text-[clamp(2.25rem,9.3vw,2.85rem)] font-bold leading-[1.29] tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.25]"
          >
            <strong className="block font-bold lg:hidden">
              ابتسامتك تستحق
              <strong className="block font-bold">عناية مختلفة.</strong>
            </strong>
            <strong className="hidden font-bold lg:block">
              تجربة علاجية مريحة
              <strong className="block font-bold">داخل عيادة حديثة</strong>
              تهتم بأدق التفاصيل
            </strong>
          </motion.h1>

          <motion.p
            {...fadeUp(0.24)}
            className="mt-4 max-w-[420px] text-[14px] font-medium leading-[1.9] text-[#E8F3FB] sm:text-base lg:mt-6 lg:hidden"
          >
            نقدم خدمات طب وتجميل الأسنان في بيئة مريحة، مع اهتمام حقيقي براحتك وبكل تفاصيل علاجك.
          </motion.p>
          <motion.p
            {...fadeUp(0.24)}
            className="mt-6 hidden max-w-2xl text-base leading-8 text-[#E8F3FB] lg:block lg:text-lg lg:leading-9"
          >
            نقدم في عيادة د. رأفت ماجد خدمات طب وتجميل الأسنان بأسلوب حديث، في بيئة هادئة ونظيفة، مع اهتمام حقيقي براحتك وجودة النتيجة من أول زيارة وحتى نهاية الخطة العلاجية.
          </motion.p>

          <motion.div
            {...fadeUp(0.34)}
            className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-2 text-[12px] font-bold text-[#032654] shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EAF5FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-14 sm:px-7 sm:text-base"
            >
              احجز موعدك
              <ArrowUpLeft size={17} aria-hidden="true" className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-2 text-[12px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-14 sm:px-7 sm:text-base"
            >
              استكشف خدماتنا
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.43)}
            className="mt-6 flex items-center gap-2 text-xs font-medium text-[#E0EFF9] sm:mt-7 lg:hidden"
          >
            <MapPin size={15} aria-hidden="true" />
            <p>رام الله، فلسطين</p>
          </motion.div>

          <motion.div
            {...fadeUp(0.47)}
            className="mt-10 hidden max-w-2xl gap-4 lg:grid lg:grid-cols-2"
          >
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <CalendarDays size={20} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold">مواعيد مرنة وسريعة</h2>
              <p className="mt-2 text-sm leading-7 text-[#E6F0F8]">
                تواصل مباشر لحجز موعدك والاستفسار عن الخدمات والخطة المناسبة لحالتك.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <ShieldCheck size={20} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold">عناية دقيقة ونتائج موثوقة</h2>
              <p className="mt-2 text-sm leading-7 text-[#E6F0F8]">
                نركز على راحة المريض وجودة العلاج وتقديم تجربة احترافية داخل العيادة.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
