import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpLeft, MapPin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const CLINIC_IMAGE = "/Photos/HeroSection/ClinicImg.jpg";
const DOCTOR_IMAGE = "/Photos/HeroSection/DoctorImg.png";

export default function Hero() {
  const reducedMotion = Boolean(useReducedMotion());
  const [ready, setReady] = useState(false);
  const [doctorImageError, setDoctorImageError] = useState(false);

  useEffect(() => {
    const selector = '[aria-label="جاري إظهار موقع العيادة"]';
    const observer = new MutationObserver(() => {
      if (!document.querySelector(selector)) {
        setReady(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    if (!document.querySelector(selector)) {
      setReady(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  const show = (delay: number, offset = 22) => ({
    initial: reducedMotion ? false : { opacity: 0, y: offset },
    animate: {
      opacity: ready ? 1 : 0,
      y: ready ? 0 : offset,
    },
    transition: {
      duration: reducedMotion ? 0 : 0.85,
      delay: reducedMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <>
      <section
        id="home"
        dir="rtl"
        aria-labelledby="clinic-hero-title"
        className="relative isolate flex min-h-[660px] scroll-mt-[76px] items-center overflow-hidden bg-[#082D51] text-white sm:min-h-[700px] lg:min-h-[710px] lg:text-[#032654]"
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          initial={reducedMotion ? false : { opacity: 0.75 }}
          animate={{ opacity: ready ? 1 : 0.75 }}
          transition={{ duration: reducedMotion ? 0 : 1.35, ease: EASE }}
        >
          <img
            src={CLINIC_IMAGE}
            alt=""
            className="h-full w-full object-cover object-[40%_53%] sm:object-[47%_51%] lg:object-[50%_47%]"
            fetchPriority="high"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,20,43,0.66)_0%,rgba(2,22,47,0.73)_60%,rgba(2,21,45,0.88)_100%)] lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(270deg,rgba(243,249,253,0.76)_0%,rgba(238,247,252,0.58)_28%,rgba(226,241,250,0.18)_48%,rgba(4,27,54,0.03)_71%,rgba(4,27,54,0.09)_100%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_65%,rgba(107,186,239,0.11),transparent_52%)] lg:bg-[radial-gradient(circle_at_86%_50%,rgba(255,255,255,0.12),transparent_46%)]"
        />

        <div
          className="pointer-events-none absolute bottom-0 left-[-2%] z-[6] h-[31%] sm:left-0 sm:h-[46%] lg:left-[0.6%] lg:h-[104%] xl:left-[1%] xl:h-[106%]"
          style={{
            aspectRatio: "1362 / 2048",
            WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 58%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.65) 78%, transparent 100%)",
            maskImage: "linear-gradient(to right, #000 0%, #000 58%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.65) 78%, transparent 100%)",
          }}
        >
          <img
            src={DOCTOR_IMAGE}
            alt="الدكتور رأفت ماجد"
            className="block h-full w-full object-contain object-bottom drop-shadow-[0_14px_25px_rgba(3,38,84,0.13)]"
            loading="eager"
            decoding="async"
            onLoad={() => setDoctorImageError(false)}
            onError={() => setDoctorImageError(true)}
          />
        </div>
        {doctorImageError && (
          <div
            className="absolute bottom-20 left-5 z-[31] max-w-[230px] rounded-xl bg-[#032654]/90 px-4 py-3 text-sm text-white"
            role="alert"
          >
            تعذّر تحميل صورة الدكتور. تأكد أن الملف باسم DoctorImg.png داخل مجلد HeroSection.
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,transparent_0%,transparent_58%,rgba(2,20,44,0.33)_100%)] lg:hidden" aria-hidden="true" />

        <div className="relative z-[32] mx-auto flex min-h-[660px] w-full max-w-[1500px] items-center px-5 pb-16 pt-[142px] sm:min-h-[700px] sm:px-9 sm:pb-20 sm:pt-[148px] lg:min-h-[710px] lg:px-14 lg:pb-20 lg:pt-[138px] xl:px-20">
          <div className="w-full max-w-[620px] text-right lg:mr-0 lg:max-w-[720px]">
            <motion.div {...show(0.08)} className="mb-5 flex items-center gap-3 sm:mb-7">
              <div aria-hidden="true" className="h-px w-9 bg-[#A7D6F3] sm:w-12 lg:bg-[#398FC5]" />
              <p className="text-[12px] font-bold text-[#E5F5FF] sm:text-sm lg:text-[#327CA9]">
                عيادات د. رأفت ماجد · طب وتجميل الأسنان
              </p>
            </motion.div>

            <motion.h1
              {...show(0.18, 30)}
              id="clinic-hero-title"
              className="text-[clamp(2.8rem,10vw,4.65rem)] font-bold leading-[1.26] tracking-[-0.045em] sm:text-[clamp(3.9rem,7vw,5.3rem)] lg:text-[clamp(4.3rem,6vw,6.1rem)] lg:leading-[1.21]"
            >
              دقّة تستحق
              <strong className="block font-bold text-[#C8E9FF] lg:text-[#145B8D]">
                ثقتك
              </strong>
            </motion.h1>

            <motion.svg
              {...show(0.31)}
              viewBox="0 0 320 45"
              className="-mr-1 mt-1 h-9 w-[190px] text-[#8CCAEF] sm:w-[235px] lg:w-[265px] lg:text-[#378FC8]"
              aria-hidden="true"
            >
              <motion.path
                d="M8 33 C105 2 221 1 311 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: ready ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : 0.42, ease: EASE }}
              />
            </motion.svg>

            <motion.p
              {...show(0.38)}
              className="mt-4 max-w-[570px] text-[15px] font-medium leading-[1.95] text-[#F1F7FC] sm:mt-6 sm:text-[17px] lg:text-[18px] lg:leading-[2.1] lg:text-[#173C5D]"
            >
              من أول استشارة، نستمع إليك ونشرح خياراتك بوضوح، لنختار معًا عناية دقيقة وخطة علاج تناسب احتياجاتك.
            </motion.p>

            <motion.div {...show(0.49)} className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
              <a
                href="#contact"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#0A4577] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(4,41,79,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#12639B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CCAEF] sm:min-h-[56px] sm:px-8 sm:text-base"
              >
                احجز موعدك
                <ArrowUpLeft size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href="#results"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CCAEF] sm:min-h-[56px] sm:px-8 sm:text-base lg:border-[#0A4577]/55 lg:bg-white/65 lg:text-[#0A4577] lg:hover:bg-white/90"
              >
                شاهد حالاتنا
                <ArrowUpLeft size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>

            <motion.div {...show(0.61)} className="mt-7 flex items-center gap-2 text-xs font-semibold text-[#D9EBF9] sm:text-sm lg:text-[#244E70]">
              <MapPin size={16} aria-hidden="true" />
              <p>رام الله، فلسطين</p>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#vision"
          aria-label="تعرّف على رؤيتنا"
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -8 }}
          transition={{ delay: reducedMotion ? 0 : 1.15, duration: 0.6 }}
          className="absolute bottom-5 right-1/2 z-20 flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-white/60 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 lg:right-12 lg:translate-x-0 lg:border-[#2D739E]/30 lg:bg-white/70 lg:text-[#0A4577]"
        >
          <motion.div
            animate={ready && !reducedMotion ? { y: [0, 4, 0] } : { y: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={19} aria-hidden="true" />
          </motion.div>
        </motion.a>
      </section>

      <section
        id="vision"
        dir="rtl"
        aria-labelledby="clinic-vision-title"
        className="scroll-mt-[88px] bg-[#F7FBFE] px-5 py-16 text-[#032654] sm:px-8 sm:py-20 lg:px-12 lg:py-24"
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(240px,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.72, ease: EASE }}
            className="lg:border-l lg:border-[#CFE6F5] lg:pl-9"
          >
            <p className="mb-3 text-sm font-bold text-[#3488BD]">تعرّف على رؤيتنا</p>
            <h2 id="clinic-vision-title" className="text-4xl font-bold leading-[1.35] sm:text-5xl lg:text-[3.5rem]">
              رؤيتنا
            </h2>
            <div aria-hidden="true" className="mt-5 h-[3px] w-20 rounded-full bg-[#6BBAEF]" />
            <p className="mt-6 max-w-sm text-xl font-semibold leading-9 text-[#235B82] sm:text-2xl">
              دقّة تستحق ثقتك.
            </p>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.13 }}
            transition={{ duration: reducedMotion ? 0 : 0.82, delay: reducedMotion ? 0 : 0.1, ease: EASE }}
            className="max-w-[830px] space-y-7 text-[15px] font-medium leading-[2.15] text-[#37546A] sm:text-[17px] sm:leading-[2.3] lg:text-[18px]"
          >
            <p>
              عيادات الدكتور رأفت ماجد تجمع بين العلم والخبرة السريرية وتقنيات طبّ الأسنان الرقمي الحديثة. نبدأ بالاستماع إليك لنفهم ما يزعجك وما تتمنّى الوصول إليه. وبعد فحص شامل وتشخيص دقيق، نشرح لك ما نراه ونناقش معك الخيارات، لنرسم معًا خطة علاج تراعي تفاصيل حالتك وأولوياتك، وتحافظ على أسنانك الطبيعية كلّما أمكن.
            </p>
            <p>
              وراحتك تبدأ من لحظة حجز موعدك. نهتمّ بوقتك، وبدفء الاستقبال، وبأجواء العيادة حتى رائحتها. وأثناء العلاج، نوضّح لك كل خطوة ونختار التقنيات المناسبة لتخفيف الألم والقلق. هكذا نكسب ثقتك، حين تعرف لماذا نوصي بعلاجك، وتشارك في قراره، وتلمس أثر هذه العناية في كل زيارة.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
