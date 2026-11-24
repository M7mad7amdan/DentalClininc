"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MousePointerClick,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type TreatmentId =
  | "decay"
  | "nerve"
  | "implant"
  | "crown"
  | "filling"
  | "gum"
  | "braces"
  | "whitening"
  | "bone"
  | "hollywood"
  | "rehabilitation"
  | "digital-smile"
  | "prosthetics"
  | "pediatric";

type Treatment = {
  id: TreatmentId;
  title: string;
  preview: string;
  detail: string;
};

const TREATMENTS: Treatment[] = [
  {
    id: "filling",
    title: "الحشوات التجميلية والعلاجية",
    preview: "ترميم سن مكسور",
    detail: "تظهر قطعة السن المفقودة وهي تعود إلى مكانها في مشهد توضيحي.",
  },
  {
    id: "decay",
    title: "علاج تسوس الأسنان",
    preview: "معالجة التسوس",
    detail: "تختفي علامة التسوس بصريًا ويستعيد السن مظهره الطبيعي.",
  },
  {
    id: "whitening",
    title: "تبييض الأسنان بالليزر",
    preview: "إشراقة الأسنان",
    detail: "تختفي درجة التصبغ وتظهر لمعة خفيفة على سطح السن.",
  },
  {
    id: "braces",
    title: "تقويم الأسنان مع أخصائي",
    preview: "تنظيم الاصطفاف",
    detail: "تتحرك علامة التقويم ويستقيم شكل السن في محاكاة مبسطة.",
  },
  {
    id: "implant",
    title: "زراعة الأسنان",
    preview: "تعويض سن مفقود",
    detail: "تتكون الدعامة ثم يظهر السن فوقها في تسلسل رمزي.",
  },
  {
    id: "crown",
    title: "فينيرز وتلبيس زركون",
    preview: "ترميم وتجميل",
    detail: "تستقر طبقة ترميمية مضيئة فوق السن في عرض بصري.",
  },
  {
    id: "nerve",
    title: "علاج عصب الأسنان (البسيط والمتقدم)",
    preview: "عناية من الداخل",
    detail: "تتغير الإشارات داخل قنوات السن لتعبر عن معالجة العصب.",
  },
  {
    id: "gum",
    title: "تجميل وعلاج اللثة",
    preview: "العناية باللثة",
    detail: "يتبدل لون خط اللثة وتنتظم حدوده في محاكاة توضيحية.",
  },
  {
    id: "bone",
    title: "زراعة العظم (البسيطة والمتقدمة)",
    preview: "دعم العظم",
    detail: "تكتمل طبقة داعمة حول جذور السن في تمثيل مبسط لإجراءات زراعة العظم.",
  },
  {
    id: "hollywood",
    title: "تجميل الأسنان (القشور الخزفية وابتسامة هوليود)",
    preview: "القشور الخزفية",
    detail: "تنزلق قشرة خزفية توضيحية برفق فوق سطح السن ويصبح مظهره أكثر تجانسًا.",
  },
  {
    id: "rehabilitation",
    title: "إعادة تأهيل الفم والأسنان الشاملة",
    preview: "إعادة التأهيل الشامل",
    detail: "تنتظم أشكال الأسنان المجاورة في مشهد يرمز إلى خطة علاجية متكاملة.",
  },
  {
    id: "digital-smile",
    title: "تصميم الابتسامة الرقمي (DSD)",
    preview: "التخطيط الرقمي للابتسامة",
    detail: "يتحرك خط المسح ثم يظهر منحنى ابتسامة مرسوم على السن لتمثيل التخطيط الرقمي.",
  },
  {
    id: "prosthetics",
    title: "تركيبات وتلبيسات الأسنان",
    preview: "تركيب التلبيسة",
    detail: "تستقر تلبيسة توضيحية فوق السن مع ظهور خطوط تدل على تثبيتها.",
  },
  {
    id: "pediatric",
    title: "علاجات الأطفال",
    preview: "العناية بأسنان الأطفال",
    detail: "تختفي علامة توضيحية صغيرة وتظهر طبقة حماية رمزية فوق السن.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const TOOTH_SHAPE =
  "M-32 -51 C-47 -46 -46 -27 -40 3 C-37 20 -28 43 -24 57 C-21 79 -10 83 -6 62 L-2 32 Q0 21 2 32 L6 62 C10 83 21 79 24 57 C28 43 37 20 40 3 C46 -27 47 -46 32 -51 C20 -56 10 -50 0 -49 C-10 -50 -20 -56 -32 -51 Z";

const MINI_TEETH = [
  { x: 97, y: 223, scale: 0.77, rotate: -14, service: "decay" as TreatmentId },
  { x: 215, y: 180, scale: 0.91, rotate: -7, service: "crown" as TreatmentId },
  { x: 455, y: 180, scale: 0.91, rotate: 7, service: "braces" as TreatmentId },
  { x: 573, y: 223, scale: 0.77, rotate: 14, service: "whitening" as TreatmentId },
];

function ToothPreview({
  kind,
  healed,
  reducedMotion,
  sequence,
}: {
  kind: TreatmentId;
  healed: boolean;
  reducedMotion: boolean;
  sequence: number;
}) {
  const uid = useId().replace(/:/g, "");
  const duration = reducedMotion ? 0 : 0.75;
  const transition = { duration, ease: EASE };
  const isImplant = kind === "implant";
  const isFilling = kind === "filling";
  const isCrown = kind === "crown";
  const isWhitening = kind === "whitening";
  const isBraces = kind === "braces";
  const isGum = kind === "gum";
  const isNerve = kind === "nerve";
  const isDecay = kind === "decay";

  return (
    <svg
      viewBox="-66 -93 132 197"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-enamel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="51%" stopColor="#FEFFFF" />
          <stop offset="100%" stopColor="#CEE7F7" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8F5FC" />
          <stop offset="55%" stopColor="#779CB8" />
          <stop offset="100%" stopColor="#D9E9F4" />
        </linearGradient>
        <mask id={`${uid}-tooth-mask`}>
          <path d={TOOTH_SHAPE} fill="white" />
          {isFilling && (
            <motion.path
              d="M17 -70 L62 -70 L62 -14 L34 -18 L21 -35 L27 -46 Z"
              fill="black"
              initial={false}
              animate={{ opacity: healed ? 0 : 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.55 }}
            />
          )}
        </mask>
        <filter id={`${uid}-shadow`} x="-85%" y="-65%" width="270%" height="240%">
          <feDropShadow
            dx="0"
            dy="11"
            stdDeviation="8"
            floodColor="#104B76"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      <motion.ellipse
        cx="0"
        cy="89"
        rx="39"
        ry="6"
        fill="#74ADCE"
        initial={false}
        animate={{ opacity: healed ? 0.12 : 0.19, scaleX: healed ? 0.85 : 1 }}
        transition={transition}
      />

      {isImplant && (
        <motion.g
          initial={false}
          animate={{ opacity: healed ? 1 : 0.4, y: healed ? 0 : 9 }}
          transition={transition}
        >
          <rect x="-11" y="27" width="22" height="48" rx="6" fill={`url(#${uid}-metal)`} />
          {[35, 44, 53, 62].map((y) => (
            <path key={y} d={`M-10 ${y} L10 ${y + 5}`} stroke="#5F8BA7" strokeWidth="2.4" />
          ))}
          <path d="M-12 27 H12" stroke="#507996" strokeWidth="4" strokeLinecap="round" />
        </motion.g>
      )}

      <motion.g
        filter={`url(#${uid}-shadow)`}
        initial={false}
        animate={{
          opacity: isImplant && !healed ? 0.16 : 1,
          y: isImplant ? (healed ? 0 : -27) : 0,
          rotate: isBraces && !healed ? -9 : 0,
          scale: isCrown && !healed ? 0.96 : 1,
        }}
        transition={transition}
        style={{ transformOrigin: "0px 7px" }}
      >
        <path
          d={TOOTH_SHAPE}
          fill={`url(#${uid}-enamel)`}
          stroke="#83B7D9"
          strokeWidth="1.8"
          strokeLinejoin="round"
          mask={`url(#${uid}-tooth-mask)`}
        />
        <path
          d="M-29 -33 C-37 -18 -31 7 -24 25"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.9"
          mask={`url(#${uid}-tooth-mask)`}
        />
        <path
          d="M11 -44 C20 -47 29 -41 32 -31"
          fill="none"
          stroke="#DCEFFA"
          strokeWidth="3.5"
          strokeLinecap="round"
          mask={`url(#${uid}-tooth-mask)`}
        />
        <path
          d="M-13 -49 C-8 -45 -3 -45 0 -47 C4 -45 8 -45 13 -49"
          fill="none"
          stroke="#C7DFEE"
          strokeWidth="1.5"
          opacity="0.75"
          strokeLinecap="round"
          mask={`url(#${uid}-tooth-mask)`}
        />

        {isWhitening && (
          <motion.path
            d={TOOTH_SHAPE}
            fill="#AFC8D5"
            initial={false}
            animate={{ opacity: healed ? 0 : 0.53 }}
            transition={{ duration: reducedMotion ? 0 : 0.95 }}
          />
        )}

        {isDecay && (
          <motion.g
            initial={false}
            animate={{ opacity: healed ? 0 : 1, scale: healed ? 0.5 : 1 }}
            transition={transition}
            style={{ transformOrigin: "-8px -23px" }}
          >
            <path
              d="M-21 -37 C-8 -48 9 -39 12 -25 C14 -8 -5 2 -19 -9 C-29 -17 -31 -30 -21 -37Z"
              fill="#987662"
            />
            <path
              d="M-15 -32 C-5 -38 4 -28 3 -18 C1 -10 -11 -8 -17 -15 C-23 -23 -22 -28 -15 -32Z"
              fill="#6C5044"
            />
          </motion.g>
        )}

        {isNerve && (
          <motion.g
            initial={false}
            animate={{ opacity: healed ? 0 : 0.88 }}
            transition={transition}
            fill="none"
            stroke="#C66C6A"
            strokeWidth="3.6"
            strokeLinecap="round"
          >
            <path d="M-1 -18 C-10 4 -17 24 -18 47" />
            <path d="M-1 -18 C10 4 17 24 18 47" />
            <circle cx="-1" cy="-23" r="7" strokeWidth="2.5" />
          </motion.g>
        )}

        {isBraces && (
          <motion.g
            initial={false}
            animate={{ opacity: healed ? 0 : 1, y: healed ? -8 : 0 }}
            transition={transition}
          >
            <path d="M-29 1 Q0 7 29 1" fill="none" stroke="#547A98" strokeWidth="3" />
            {[-20, 0, 20].map((x) => (
              <g key={x}>
                <rect x={x - 6} y="-5" width="12" height="13" rx="2.5" fill="#E7F1F8" stroke="#6A96B4" strokeWidth="1.7" />
                <path d={`M${x - 4} 1.5 H${x + 4}`} stroke="#4F7F9E" strokeWidth="1.5" />
              </g>
            ))}
          </motion.g>
        )}

        {isGum && (
          <motion.path
            d="M-34 -41 C-23 -28 -12 -39 0 -30 C12 -39 23 -28 34 -41"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            initial={false}
            animate={{ stroke: healed ? "#EBAAB9" : "#D97E8F", y: healed ? -2 : 4 }}
            transition={transition}
          />
        )}
      </motion.g>

      {isFilling && (
        <motion.path
          d="M17 -51 L32 -51 Q40 -48 41 -35 L38 -16 L25 -27 L21 -35 L27 -46 Z"
          fill={`url(#${uid}-enamel)`}
          stroke="#92C1DF"
          strokeWidth="1.9"
          strokeLinejoin="round"
          initial={false}
          animate={{ opacity: healed ? 1 : 0, x: healed ? 0 : 35, y: healed ? 0 : -43, rotate: healed ? 0 : 22 }}
          transition={{ type: reducedMotion ? "tween" : "spring", stiffness: 120, damping: 19, duration: reducedMotion ? 0 : undefined }}
        />
      )}

      {isCrown && (
        <motion.g
          initial={false}
          animate={{ opacity: healed ? 0.68 : 0, y: healed ? 0 : -75 }}
          transition={{ duration: reducedMotion ? 0 : 0.85, ease: EASE }}
        >
          <path
            d="M-32 -51 C-47 -46 -46 -27 -40 3 C-37 20 -28 43 -24 57 C-21 79 -10 83 -6 62 L-2 32 Q0 21 2 32 L6 62 C10 83 21 79 24 57 C28 43 37 20 40 3 C46 -27 47 -46 32 -51 C20 -56 10 -50 0 -49 C-10 -50 -20 -56 -32 -51 Z"
            fill="#E9F8FF"
            stroke="#69AFE0"
            strokeWidth="2.5"
          />
        </motion.g>
      )}

      <AdditionalTreatmentVisual
        kind={kind}
        healed={healed}
        reducedMotion={reducedMotion}
      />

      <AnimatePresence>
        {healed && (
          <motion.g key={`${kind}-${sequence}-finish`}>
            <motion.circle
              cx="0"
              cy="2"
              r="58"
              fill="none"
              stroke="#70BCE9"
              strokeWidth="2"
              initial={{ opacity: 0.75, scale: 0.72 }}
              animate={{ opacity: 0, scale: 1.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.0, ease: "easeOut" }}
              style={{ transformOrigin: "0px 2px" }}
            />
            <motion.path
              d="M49 -58 V-44 M42 -51 H56 M-46 -37 V-27 M-51 -32 H-41"
              fill="none"
              stroke="#53AAE0"
              strokeWidth="2.6"
              strokeLinecap="round"
              initial={{ opacity: 0, scale: 0.68 }}
              animate={{ opacity: [0, 1, 0.75], scale: [0.68, 1.05, 1] }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.35 }}
              style={{ transformOrigin: "0px -35px" }}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

function AdditionalTreatmentVisual({
  kind,
  healed,
  reducedMotion,
}: {
  kind: TreatmentId;
  healed: boolean;
  reducedMotion: boolean;
}) {
  const transition = {
    duration: reducedMotion ? 0 : 0.82,
    ease: EASE,
  };

  if (kind === "bone") {
    return (
      <g>
        <path
          d="M-47 51 Q-24 42 -11 53 Q0 60 11 53 Q24 42 47 51 L47 86 Q21 77 0 87 Q-22 77 -47 86 Z"
          fill="#E8F5FC"
          fillOpacity="0.52"
          stroke="#A7D1E8"
          strokeWidth="1.3"
          strokeDasharray="4 4"
        />
        <motion.path
          d="M-42 74 Q-21 64 -5 73 Q8 80 22 71 Q34 65 42 73 L42 85 Q15 78 0 87 Q-18 77 -42 86 Z"
          fill="#ACD9F1"
          stroke="#6CB4DD"
          strokeWidth="1.7"
          initial={false}
          animate={{ opacity: healed ? 0.95 : 0.24, scaleY: healed ? 1 : 0.18 }}
          transition={transition}
          style={{ transformOrigin: "0px 85px" }}
        />
        <motion.path
          d="M-33 69 L-26 75 M-10 72 L-3 78 M16 72 L23 76 M31 69 L37 75"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: healed ? 0.95 : 0 }}
          transition={transition}
        />
      </g>
    );
  }

  if (kind === "hollywood") {
    return (
      <g>
        <motion.path
          d="M-25 -37 Q-8 -43 8 -38 Q19 -42 27 -34 L24 7 Q11 27 0 31 Q-13 25 -25 6 Z"
          fill="#D6E4ED"
          fillOpacity="0.65"
          initial={false}
          animate={{ opacity: healed ? 0 : 0.83 }}
          transition={transition}
        />
        <motion.path
          d="M-28 -40 Q-12 -48 0 -43 Q13 -48 28 -40 L25 7 Q14 26 0 29 Q-14 26 -25 7 Z"
          fill="#F8FEFF"
          fillOpacity="0.92"
          stroke="#79C3E9"
          strokeWidth="1.7"
          initial={false}
          animate={{ opacity: healed ? 1 : 0, y: healed ? 0 : -35, scale: healed ? 1 : 0.94 }}
          transition={transition}
        />
        <motion.path
          d="M-15 -30 Q-5 -35 10 -31"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: healed ? 1 : 0, y: healed ? 0 : -35 }}
          transition={transition}
        />
      </g>
    );
  }

  if (kind === "rehabilitation") {
    return (
      <g>
        <motion.g
          initial={false}
          animate={{ x: healed ? 0 : -9, y: healed ? 0 : 9, rotate: healed ? 0 : -9 }}
          transition={transition}
          style={{ transformOrigin: "-48px 18px" }}
        >
          <g transform="translate(-50 9) scale(0.37)">
            <path d={TOOTH_SHAPE} fill="#F8FDFF" stroke="#81B9DD" strokeWidth="3" />
          </g>
        </motion.g>
        <motion.g
          initial={false}
          animate={{ x: healed ? 0 : 9, y: healed ? 0 : 9, rotate: healed ? 0 : 9 }}
          transition={transition}
          style={{ transformOrigin: "48px 18px" }}
        >
          <g transform="translate(50 9) scale(0.37)">
            <path d={TOOTH_SHAPE} fill="#F8FDFF" stroke="#81B9DD" strokeWidth="3" />
          </g>
        </motion.g>
        <motion.path
          d="M-57 49 Q0 70 57 49"
          fill="none"
          stroke="#64AED9"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: healed ? 0.9 : 0.2, pathLength: healed ? 1 : 0 }}
          transition={transition}
        />
      </g>
    );
  }

  if (kind === "digital-smile") {
    return (
      <g>
        <motion.path
          d="M-51 -35 V-49 H-36 M36 -49 H51 V-35 M51 26 V42 H36 M-36 42 H-51 V26"
          fill="none"
          stroke="#54A7D7"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ opacity: healed ? 0.45 : 1 }}
          transition={transition}
        />
        <motion.path
          d="M-35 0 H35"
          stroke="#6BBAEF"
          strokeWidth="2.3"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: healed ? 0 : 0.95, y: healed ? 36 : -28 }}
          transition={transition}
        />
        <motion.path
          d="M0 -49 V46"
          fill="none"
          stroke="#A6D3ED"
          strokeWidth="1"
          strokeDasharray="3 5"
          initial={false}
          animate={{ opacity: healed ? 0 : 0.8 }}
          transition={transition}
        />
        <motion.path
          d="M-23 2 Q0 22 23 2"
          fill="none"
          stroke="#318CC3"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: healed ? 1 : 0, pathLength: healed ? 1 : 0 }}
          transition={transition}
        />
      </g>
    );
  }

  if (kind === "prosthetics") {
    return (
      <g>
        <motion.path
          d="M-34 -46 Q-19 -58 0 -49 Q19 -58 34 -46 L31 -8 Q17 8 0 12 Q-17 8 -31 -8 Z"
          fill="#EFFAFF"
          fillOpacity="0.97"
          stroke="#71B5DC"
          strokeWidth="2.2"
          strokeLinejoin="round"
          initial={false}
          animate={{ y: healed ? 0 : -67, opacity: healed ? 1 : 0.8 }}
          transition={transition}
        />
        <motion.path
          d="M-24 -36 Q0 -44 24 -36"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={false}
          animate={{ y: healed ? 0 : -67, opacity: healed ? 1 : 0.5 }}
          transition={transition}
        />
        <motion.path
          d="M-33 -6 Q0 9 33 -6"
          fill="none"
          stroke="#4A9BCB"
          strokeWidth="1.8"
          strokeDasharray="3 5"
          initial={false}
          animate={{ opacity: healed ? 0.95 : 0.25 }}
          transition={transition}
        />
      </g>
    );
  }

  if (kind === "pediatric") {
    return (
      <g>
        <motion.g
          initial={false}
          animate={{ opacity: healed ? 0 : 0.75, scale: healed ? 0.5 : 1 }}
          transition={transition}
          style={{ transformOrigin: "-13px -24px" }}
        >
          <circle cx="-13" cy="-24" r="7" fill="#D0C1AF" />
          <circle cx="-13" cy="-24" r="3.5" fill="#A69585" />
        </motion.g>
        <motion.path
          d="M0 -45 L26 -34 V-12 C26 8 13 18 0 23 C-13 18 -26 8 -26 -12 V-34 Z"
          fill="#E4F6FF"
          fillOpacity="0.45"
          stroke="#58ABDB"
          strokeWidth="2.2"
          initial={false}
          animate={{ opacity: healed ? 1 : 0, scale: healed ? 1 : 0.72 }}
          transition={transition}
          style={{ transformOrigin: "0px -11px" }}
        />
        <motion.path
          d="M-11 -9 L-3 -1 L13 -20"
          fill="none"
          stroke="#318FC5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ opacity: healed ? 1 : 0, pathLength: healed ? 1 : 0 }}
          transition={transition}
        />
      </g>
    );
  }

  return null;
}

function MiniTooth({ position, ready, reducedMotion }: {
  position: (typeof MINI_TEETH)[number];
  ready: boolean;
  reducedMotion: boolean;
}) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <g transform={`translate(${position.x} ${position.y}) rotate(${position.rotate}) scale(${position.scale})`}>
      <motion.g
        initial={reducedMotion ? false : { opacity: 0, y: 55, scale: 0.76 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 55, scale: ready ? 1 : 0.76 }}
        transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.22 + position.x * 0.0007, ease: EASE }}
      >
        <motion.g
          animate={ready && !reducedMotion ? { y: [0, -3.5, 0], rotate: [0, 0.7, 0] } : { y: 0, rotate: 0 }}
          transition={{ duration: 6.5 + position.x / 600, repeat: Infinity, ease: "easeInOut", delay: position.x * 0.003 }}
          style={{ transformOrigin: "0px 0px" }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#DFEFF9" />
            </linearGradient>
          </defs>
          <path
            d={TOOTH_SHAPE}
            fill={`url(#${gradientId})`}
            stroke="#9CC9E1"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path d="M-26 -28 Q-31 -6 -23 19" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M12 -43 Q23 -45 30 -30" fill="none" stroke="#D6EBF7" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </motion.g>
    </g>
  );
}

function DentalStudio({
  ready,
  reducedMotion,
  selected,
  healed,
  sequence,
  onRepair,
  onSelect,
}: {
  ready: boolean;
  reducedMotion: boolean;
  selected: Treatment;
  healed: boolean;
  sequence: number;
  onRepair: () => void;
  onSelect: (id: TreatmentId) => void;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 65, damping: 23 });
  const smoothY = useSpring(pointerY, { stiffness: 65, damping: 23 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 10);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[690px]"
      onPointerMove={move}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="relative aspect-[1.33] w-full select-none overflow-visible sm:aspect-[1.47] lg:aspect-[1.35]">
        <motion.div
          className="pointer-events-none absolute inset-x-[5%] inset-y-[8%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,#E4F3FC_0%,#EFF8FC_49%,transparent_74%)]"
          animate={ready && !reducedMotion ? { opacity: [0.72, 1, 0.72], scale: [1, 1.035, 1] } : { opacity: 0.85 }}
          transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.svg
          viewBox="0 0 670 450"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          style={{ x: smoothX, y: smoothY }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-studio-smile" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9E6F7" />
              <stop offset="50%" stopColor="#398FC5" />
              <stop offset="100%" stopColor="#C9E6F7" />
            </linearGradient>
          </defs>
          <motion.path
            d="M55 237 C80 100 213 45 335 45 C456 45 590 100 616 237"
            fill="none"
            stroke="#C9E4F4"
            strokeWidth="1.6"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: ready ? 1 : 0, opacity: ready ? 0.9 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.4, delay: reducedMotion ? 0 : 0.2, ease: EASE }}
          />
          <motion.path
            d="M80 351 C190 420 480 420 590 351"
            fill="none"
            stroke="url(#hero-studio-smile)"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: ready ? 1 : 0, opacity: ready ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.3, delay: reducedMotion ? 0 : 0.57, ease: EASE }}
          />
          <motion.path
            d="M109 368 C206 423 464 423 561 368"
            fill="none"
            stroke="#CCE6F6"
            strokeWidth="1.2"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: ready ? 1 : 0, opacity: ready ? 0.85 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.15, delay: reducedMotion ? 0 : 0.7, ease: EASE }}
          />
          {MINI_TEETH.map((position) => (
            <MiniTooth
              key={position.x}
              position={position}
              ready={ready}
              reducedMotion={reducedMotion}
            />
          ))}
          {[{ x: 335, y: 78 }, { x: 78, y: 241 }, { x: 590, y: 241 }].map((point, index) => (
            <motion.g
              key={point.x}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.5 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.9 + index * 0.1 }}
              style={{ transformOrigin: `${point.x}px ${point.y}px` }}
            >
              <circle cx={point.x} cy={point.y} r="3.7" fill="#FFFFFF" stroke="#88BCE0" strokeWidth="1.9" />
              {index === 0 && <path d="M335 61 V69 M335 87 V95 M318 78 H326 M344 78 H352" stroke="#87C4E8" strokeWidth="1.8" strokeLinecap="round" />}
            </motion.g>
          ))}
        </motion.svg>

        {MINI_TEETH.map((position) => (
          <button
            key={`choose-${position.service}`}
            type="button"
            onClick={() => onSelect(position.service)}
            disabled={!ready}
            title={`استكشف ${TREATMENTS.find((item) => item.id === position.service)?.title ?? "الخدمة"}`}
            aria-label={`عرض ${TREATMENTS.find((item) => item.id === position.service)?.title ?? "الخدمة"} على السن الأوسط`}
            className="absolute z-10 h-[23%] w-[11%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[40%] outline-none transition-colors hover:bg-[#8CC8E8]/10 focus-visible:ring-2 focus-visible:ring-[#388DC3] focus-visible:ring-offset-2 disabled:pointer-events-none"
            style={{ left: `${(position.x / 670) * 100}%`, top: `${(position.y / 450) * 100}%` }}
          />
        ))}

        <div className="absolute left-1/2 top-[45%] z-10 w-[31%] max-w-[192px] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.66, y: 36 }}
            animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.66, y: ready ? 0 : 36 }}
            transition={{ type: reducedMotion ? "tween" : "spring", stiffness: 104, damping: 21, delay: reducedMotion ? 0 : 0.44, duration: reducedMotion ? 0 : undefined }}
          >
          <motion.button
            type="button"
            onClick={onRepair}
            disabled={!ready}
            aria-label={healed ? `إعادة تجربة ${selected.preview}` : `اضغط على السن لمشاهدة ${selected.preview}`}
            aria-pressed={healed}
            className="group relative block aspect-[0.68] w-full cursor-pointer rounded-[48%] outline-none focus-visible:ring-4 focus-visible:ring-[#6BBAEF]/70 focus-visible:ring-offset-4 disabled:cursor-default"
            whileHover={reducedMotion ? undefined : { y: -5, scale: 1.035 }}
            whileTap={reducedMotion ? undefined : { scale: 0.965 }}
            animate={ready && !reducedMotion ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.id}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.88, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                transition={{ duration: reducedMotion ? 0 : 0.38, ease: EASE }}
                className="h-full w-full"
              >
                <ToothPreview
                  kind={selected.id}
                  healed={healed}
                  reducedMotion={reducedMotion}
                  sequence={sequence}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 sm:-bottom-3">
            <motion.div
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#CBE3F2] bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#29688E] shadow-[0_7px_25px_rgba(3,38,84,0.07)] sm:text-xs"
              animate={ready && !reducedMotion ? { y: [0, -2, 0] } : { y: 0 }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            >
              {healed ? <Check size={14} aria-hidden="true" /> : <MousePointerClick size={14} aria-hidden="true" />}
              <p>{healed ? "اكتملت الحركة" : "اضغط على السن"}</p>
            </motion.div>
          </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-2 flex w-full max-w-[590px] flex-col items-center gap-3 sm:-mt-1">
        <div className="flex items-center gap-3 text-center">
          <div aria-hidden="true" className="h-px w-6 bg-[#A6CBDF] sm:w-10" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${selected.id}-${healed}`}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.23 }}
              className="text-[13px] font-bold text-[#225C84] sm:text-[15px]"
            >
              {healed ? "تفاصيل تصنع الفارق" : selected.preview}
            </motion.p>
          </AnimatePresence>
          <div aria-hidden="true" className="h-px w-6 bg-[#A6CBDF] sm:w-10" />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRepair}
            disabled={!ready}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#BEDCEC] bg-white px-4 text-xs font-bold text-[#032654] transition-colors hover:border-[#8CC5E5] hover:bg-[#EAF6FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287DB7] disabled:opacity-50 sm:text-sm"
          >
            {healed ? <RotateCcw size={15} aria-hidden="true" /> : <Sparkles size={15} aria-hidden="true" />}
            {healed ? "إعادة التجربة" : "شاهد التحوّل"}
          </button>
          <a
            href="#services"
            className="text-xs font-semibold text-[#47728E] underline decoration-[#B0D4E8] underline-offset-4 transition-colors hover:text-[#032654] sm:text-sm"
          >
            جميع الخدمات
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reducedMotion = Boolean(useReducedMotion());
  const [ready, setReady] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<TreatmentId>("filling");
  const [healed, setHealed] = useState(false);
  const [explicitChoice, setExplicitChoice] = useState(false);
  const [sequence, setSequence] = useState(0);
  const selected = TREATMENTS.find((item) => item.id === selectedId) ?? TREATMENTS[0];
  const selectedIndex = TREATMENTS.findIndex((item) => item.id === selectedId);

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

  function selectService(id: TreatmentId) {
    setExplicitChoice(true);
    setSelectedId(id);
    setHealed(false);
    setSequence((current) => current + 1);

    const rail = railRef.current;
    const target = rail?.querySelector<HTMLButtonElement>(`[data-treatment-id="${id}"]`);

    if (rail && target) {
      const viewport = rail.getBoundingClientRect();
      const item = target.getBoundingClientRect();
      const distance = item.left + item.width / 2 - (viewport.left + viewport.width / 2);
      rail.scrollBy({ left: distance, behavior: reducedMotion ? "auto" : "smooth" });
    }
  }

  function moveService(direction: -1 | 1) {
    const nextIndex = (selectedIndex + direction + TREATMENTS.length) % TREATMENTS.length;
    selectService(TREATMENTS[nextIndex].id);
  }

  function toggleRepair() {
    setHealed((current) => !current);
    setSequence((current) => current + 1);
  }

  function bookService() {
    if (!explicitChoice) return;
    try {
      window.sessionStorage.setItem("selectedDentalService", selected.title);
    } catch {
      window.dispatchEvent(new CustomEvent("dental-service-selected", { detail: selected.title }));
      return;
    }
    window.dispatchEvent(new CustomEvent("dental-service-selected", { detail: selected.title }));
  }

  const reveal = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(4px)" },
    animate: { opacity: ready ? 1 : 0, y: ready ? 0 : 24, filter: ready ? "blur(0px)" : "blur(4px)" },
    transition: { duration: reducedMotion ? 0 : 0.82, delay: reducedMotion ? 0 : delay, ease: EASE },
  });

  return (
    <section
      id="home"
      dir="rtl"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#F8FAFC] text-[#032654]"
      style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
    >
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-7 px-5 pb-12 pt-[145px] sm:px-8 sm:pb-16 sm:pt-[160px] lg:min-h-[730px] lg:grid-cols-[1.03fr_0.97fr] lg:gap-7 lg:px-12 lg:pb-20 lg:pt-[140px]">
        <div className="relative z-10 max-w-[650px]">
          <motion.div {...reveal(0.04)} className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
            <div className="flex min-h-8 items-center rounded-full border border-[#D5E5F0] bg-white px-4 text-[11px] font-semibold text-[#32658D] sm:text-xs">
              طب وتجميل الأسنان
            </div>
            <div aria-hidden="true" className="h-px w-8 bg-[#B9D6E8]" />
            <p className="text-xs font-medium text-[#607C91] sm:text-sm">رام الله، فلسطين</p>
          </motion.div>

          <motion.h1
            {...reveal(0.16)}
            id="hero-title"
            className="text-[clamp(2.35rem,5.15vw,5.1rem)] font-bold leading-[1.34] tracking-[-0.035em]"
          >
            عناية دقيقة،
            <strong className="block font-bold text-[#287DB7]">وابتسامة طبيعية.</strong>
          </motion.h1>

          <motion.p
            {...reveal(0.27)}
            className="mt-5 max-w-[550px] text-[15px] leading-[1.95] text-[#475569] sm:mt-7 sm:text-[17px] lg:text-lg"
          >
            في عيادة د. رأفت ماجد، نهتم بصحة أسنانك وتفاصيل ابتسامتك، ونقدّم خيارات علاجية وتجميلية تراعي احتياجات كل حالة.
          </motion.p>

          <motion.div {...reveal(0.4)} className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <a
              href="#contact"
              onClick={bookService}
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#032654] px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(3,38,84,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#145080] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#287DB7] sm:min-h-14 sm:px-8 sm:text-base"
            >
              احجز موعدك
              <ArrowUpLeft size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#services"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#C8DFED] bg-white px-6 text-sm font-semibold text-[#032654] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#91C6E4] hover:bg-[#EEF8FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#287DB7] sm:min-h-14 sm:px-8 sm:text-base"
            >
              تعرّف على خدماتنا
              <ArrowDownLeft size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
            </a>
          </motion.div>

          <motion.div {...reveal(0.49)} className="mt-7 flex items-center gap-2 text-xs font-medium text-[#647C8F] sm:text-sm">
            <MapPin size={15} className="text-[#287DB7]" aria-hidden="true" />
            <p>عيادة د. رأفت ماجد · رام الله</p>
          </motion.div>
        </div>

        <motion.div {...reveal(0.18)} className="relative z-0 min-w-0 lg:pt-3">
          <DentalStudio
            ready={ready}
            reducedMotion={reducedMotion}
            selected={selected}
            healed={healed}
            sequence={sequence}
            onRepair={toggleRepair}
            onSelect={selectService}
          />

          <div className="mx-auto mt-5 max-w-[610px] sm:mt-6">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <p className="text-xs font-bold text-[#315C7C] sm:text-sm">استكشف الخدمات بالتفاعل مع السن</p>
              <p className="text-[10px] font-medium tabular-nums text-[#7B96A9] sm:text-xs">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(TREATMENTS.length).padStart(2, "0")}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => moveService(-1)}
                aria-label="الخدمة السابقة"
                title="الخدمة السابقة"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C8DFED] bg-white text-[#032654] shadow-[0_5px_16px_rgba(3,38,84,0.05)] transition-all hover:border-[#6BBAEF] hover:bg-[#EAF6FD] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287DB7] sm:h-11 sm:w-11"
              >
                <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <div
                ref={railRef}
                className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="group"
                aria-label="اختر خدمة لعرضها بشكل تفاعلي"
              >
                {TREATMENTS.map((service) => {
                  const active = service.id === selectedId;
                  return (
                    <button
                      key={service.id}
                      data-treatment-id={service.id}
                      type="button"
                      onClick={() => selectService(service.id)}
                      aria-pressed={active}
                      className={`relative min-h-10 shrink-0 snap-center whitespace-nowrap rounded-full border px-3.5 text-[11px] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287DB7] sm:min-h-11 sm:px-4 sm:text-xs ${
                        active
                          ? "border-[#032654] bg-[#032654] text-white shadow-[0_9px_20px_rgba(3,38,84,0.13)]"
                          : "border-[#D1E5F1] bg-white text-[#376586] hover:border-[#8CC4E3] hover:bg-[#EFF8FE]"
                      }`}
                    >
                      {service.title}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => moveService(1)}
                aria-label="الخدمة التالية"
                title="الخدمة التالية"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#032654] text-white shadow-[0_8px_18px_rgba(3,38,84,0.12)] transition-all hover:bg-[#145080] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF] sm:h-11 sm:w-11"
              >
                <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
            <div aria-live="polite" className="min-h-[54px] px-1 pt-3 text-center sm:min-h-[45px]">
              <p className="text-[12px] leading-[1.7] text-[#57758B] sm:text-[13px]">
                {healed ? selected.detail : `اختر «${selected.preview}» واضغط على السن لرؤية الحركة.`}
              </p>
              <p className="mt-1 text-[10px] text-[#879DAC] sm:text-[11px]">
                تمثيل بصري توضيحي، وليس نتيجة علاج فعلية
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
