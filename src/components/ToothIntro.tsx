
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const curtainTransition = {
  delay: 1.2,
  duration: 1.1,
  ease: [0.76, 0, 0.24, 1] as [
    number,
    number,
    number,
    number
  ],
};

function ToothIllustration() {
  return (
    <svg
      viewBox="0 0 160 190"
      className="h-full w-full overflow-visible drop-shadow-[0_22px_28px_rgba(3,38,84,0.14)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="intro-enamel"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="58%" stopColor="#F8FCFF" />
          <stop offset="100%" stopColor="#CFE6F5" />
        </linearGradient>
      </defs>

      <path
        d="M36 20 C13 15 9 38 16 72 C23 104 35 125 42 157 C48 181 63 182 69 157 L76 128 Q80 115 85 128 L94 157 C101 182 116 181 122 157 C129 124 143 103 148 72 C154 38 143 15 122 20 C104 24 94 31 82 27 C61 19 49 17 36 20Z"
        fill="url(#intro-enamel)"
        stroke="#82B4D5"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M52 75 Q80 96 108 75"
        fill="none"
        stroke="#6BBAEF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <path
        d="M39 36 Q30 53 37 76"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export default function ToothIntro() {
  const reducedMotion = Boolean(useReducedMotion());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 2450);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, reducedMotion]);

  if (!visible || reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      role="status"
      aria-label="جاري إظهار موقع العيادة"
    >
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={curtainTransition}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#F8FAFC]"
      />

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={curtainTransition}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#F8FAFC]"
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 12,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.88, 1, 1, 1.08],
          y: [12, 0, 0, -8],
        }}
        transition={{
          duration: 1.65,
          times: [0, 0.22, 0.64, 1],
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="h-[260px] w-[220px] sm:h-[380px] sm:w-[320px]">
          <ToothIllustration />
        </div>
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [12, 0, 0, -8],
        }}
        transition={{
          duration: 1.4,
          times: [0, 0.22, 0.65, 1],
        }}
        className="pointer-events-none absolute inset-x-4 top-[17%] z-10 text-center text-sm font-bold text-[#032654] sm:text-xl"
      >
        أهلاً بكم في عيادة د. رأفت ماجد
      </motion.p>

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute bottom-6 left-6 z-20 rounded-full border border-[#CBD5E1] bg-white/95 px-5 py-2.5 text-sm font-semibold text-[#032654] transition-colors hover:bg-[#EAF5FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
      >
        تخطي المقدمة
      </button>
    </div>
  );
}
