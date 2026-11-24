import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  Check,
  MoveHorizontal,
} from "lucide-react";

type ToothMark =
  | "decay"
  | "nerve"
  | "implant"
  | "crown"
  | "filling"
  | "gum"
  | "braces"
  | "shine"
  | "bone"
  | "hollywood"
  | "rehabilitation"
  | "digital"
  | "prosthetics"
  | "pediatric";

type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  mark: ToothMark;
  accent: string;
  image?: string;
};

const services: Service[] = [
  {
    id: "decay",
    title: "علاج تسوس الأسنان",
    subtitle: "العناية بالسن تبدأ من التشخيص",
    description:
      "يهدف علاج تسوس الأسنان إلى إزالة الأجزاء المتضررة ومعالجة التسوس وفق حالة السن، للمساعدة على الحفاظ على بنيته ووظيفته والحد من تطور المشكلة.",
    benefits: [
      "معالجة التسوس",
      "الحفاظ على بنية السن",
      "استعادة وظيفة السن",
    ],
    mark: "decay",
    accent: "#EAF6FD",
  },
  {
    id: "nerve",
    title: "علاج عصب الأسنان (البسيط والمتقدم)",
    subtitle: "عناية دقيقة من الداخل",
    description:
      "يشمل علاج عصب الأسنان في الحالات البسيطة والمتقدمة معالجة الالتهاب أو العدوى داخل السن وتنظيف قنوات الجذور وحشوها عند الحاجة، بهدف الحفاظ على السن الطبيعي قدر الإمكان.",
    benefits: [
      "معالجة قنوات الجذور",
      "التعامل مع الالتهاب",
      "محاولة الحفاظ على السن",
    ],
    mark: "nerve",
    accent: "#E5F2FC",
  },
  {
    id: "implant",
    title: "زراعة الأسنان",
    subtitle: "استعادة وظيفة الابتسامة",
    description:
      "تشمل زراعة الأسنان الحالات البسيطة والمتقدمة لتعويض الأسنان المفقودة والمساعدة على استعادة وظيفة المضغ والمظهر الطبيعي، بعد تقييم ملاءمة كل حالة للعلاج.",
    benefits: [
      "تعويض الأسنان المفقودة",
      "تحسين وظيفة المضغ",
      "استعادة المظهر الطبيعي",
    ],
    mark: "implant",
    accent: "#E4F1FA",
  },
  {
    id: "crown",
    title: "فينيرز وتلبيس زركون",
    subtitle: "جمال التفاصيل وتناسق الأسنان",
    description:
      "تشمل هذه الخدمة الفينير والقشور الخزفية وتلبيسات الزركون لتحسين مظهر الأسنان أو ترميمها، حسب متطلبات الحالة وخطة العلاج.",
    benefits: [
      "تحسين مظهر الأسنان",
      "خيارات تجميل وترميم",
      "تناسق الابتسامة",
    ],
    mark: "crown",
    accent: "#EDF7FD",
  },
  {
    id: "filling",
    title: "الحشوات التجميلية والعلاجية",
    subtitle: "ترميم يحافظ على جمال السن",
    description:
      "تشمل الحشوات التجميلية والعلاجية معالجة الأجزاء المتضررة من الأسنان وترميمها، مع مراعاة اختيار المواد واللون المناسبين لكل حالة.",
    benefits: [
      "ترميم الأجزاء المتضررة",
      "لون متناسق مع الأسنان",
      "تحسين الشكل والوظيفة",
    ],
    mark: "filling",
    accent: "#DDEFFB",
  },
  {
    id: "gum",
    title: "تجميل وعلاج اللثة",
    subtitle: "لثة صحية وابتسامة متوازنة",
    description:
      "تشمل العناية باللثة تقييم مشكلاتها وعلاجها، إلى جانب إجراءات تجميلية مناسبة لتحسين تناسق خط اللثة مع الأسنان عند الحاجة.",
    benefits: [
      "العناية بصحة اللثة",
      "علاج مشكلات اللثة",
      "تحسين تناسق الابتسامة",
    ],
    mark: "gum",
    accent: "#EAF5FC",
  },
  {
    id: "braces",
    title: "تقويم الأسنان مع أخصائي",
    subtitle: "لابتسامة أكثر انتظامًا",
    description:
      "يُساعد تقويم الأسنان مع أخصائي على معالجة مشكلات الاصطفاف والإطباق، من خلال خطة علاجية تُحدد بعد الفحص والتقييم.",
    benefits: [
      "تحسين اصطفاف الأسنان",
      "معالجة مشكلات الإطباق",
      "خطة علاجية مناسبة",
    ],
    mark: "braces",
    accent: "#E3F1FB",
  },
  {
    id: "whitening",
    title: "تبييض الأسنان بالليزر",
    subtitle: "إشراقة طبيعية لابتسامتك",
    description:
      "يشمل تبييض الأسنان بالليزر وفق ملاءمة الحالة، بهدف تحسين لون الأسنان والتقليل من بعض التصبغات بعد تقييم صحة الأسنان واللثة.",
    benefits: [
      "تحسين لون الأسنان",
      "التقليل من التصبغات",
      "العناية بجمال الابتسامة",
    ],
    mark: "shine",
    accent: "#E7F6FE",
  },
  {
    id: "bone",
    title: "زراعة العظم (البسيطة والمتقدمة)",
    subtitle: "دعم العظم عند الحاجة للزراعة",
    description:
      "تشمل إجراءات زراعة العظم البسيطة والمتقدمة دعم أو تعويض العظم في المواضع التي تحتاج إلى ذلك، وفق الفحص والتصوير وخطة العلاج المناسبة لكل حالة.",
    benefits: [
      "تقييم كمية العظم",
      "خيارات للحالات البسيطة والمتقدمة",
      "التحضير للعلاج المناسب",
    ],
    mark: "bone",
    accent: "#E5F3FC",
  },
  {
    id: "hollywood",
    title: "تجميل الأسنان (القشور الخزفية وابتسامة هوليود)",
    subtitle: "القشور الخزفية وتناسق الابتسامة",
    description:
      "يشمل تجميل الأسنان بالقشور الخزفية وخيارات ابتسامة هوليود دراسة شكل الأسنان وتناسقها مع الوجه، ثم اختيار الإجراءات المناسبة حسب احتياجات الحالة.",
    benefits: [
      "القشور الخزفية",
      "خيارات ابتسامة هوليود",
      "تناسق الشكل واللون",
    ],
    mark: "hollywood",
    accent: "#E8F5FE",
  },
  {
    id: "rehabilitation",
    title: "إعادة تأهيل الفم والأسنان الشاملة",
    subtitle: "خطة متكاملة لصحة الفم ووظيفته",
    description:
      "تُعنى إعادة التأهيل الشاملة بتقييم حالة الفم والأسنان ووضع خطة علاجية متكاملة قد تجمع بين أكثر من إجراء ترميمي أو وظيفي وفق حاجة المريض.",
    benefits: [
      "تقييم شامل للحالة",
      "تنسيق مراحل العلاج",
      "الاهتمام بالشكل والوظيفة",
    ],
    mark: "rehabilitation",
    accent: "#E4F0FB",
  },
  {
    id: "digital-smile",
    title: "تصميم الابتسامة الرقمي (DSD)",
    subtitle: "تصوّر مدروس لشكل الابتسامة",
    description:
      "يساعد تصميم الابتسامة الرقمي (DSD) على دراسة تناسق الأسنان والابتسامة باستخدام أدوات تخطيط رقمية، ومناقشة التصور العلاجي قبل البدء بالإجراءات المناسبة.",
    benefits: [
      "تخطيط رقمي للابتسامة",
      "دراسة التناسق الجمالي",
      "مناقشة الخيارات العلاجية",
    ],
    mark: "digital",
    accent: "#EDF8FE",
  },
  {
    id: "prosthetics",
    title: "تركيبات وتلبيسات الأسنان",
    subtitle: "ترميم الأسنان واستعادة وظيفتها",
    description:
      "تُستخدم تركيبات وتلبيسات الأسنان لترميم الأسنان المتضررة أو تعويض ما يلزم وفق الحالة، مع الاهتمام بملاءمة التركيبة ووظيفتها ومظهرها الطبيعي.",
    benefits: [
      "خيارات للترميم والتعويض",
      "استعادة وظيفة الأسنان",
      "الاهتمام بالتناسق والمظهر",
    ],
    mark: "prosthetics",
    accent: "#E1F0FA",
  },
  {
    id: "pediatric",
    title: "علاجات الأطفال",
    subtitle: "عناية تناسب احتياجات الصغار",
    description:
      "تشمل علاجات الأطفال فحص صحة الفم والأسنان والتعامل مع المشكلات السنية المناسبة لأعمارهم، مع مراعاة توفير تجربة مريحة قدر الإمكان.",
    benefits: [
      "فحص أسنان الأطفال",
      "العناية الوقائية والعلاجية",
      "تواصل مناسب لعمر الطفل",
    ],
    mark: "pediatric",
    accent: "#E8F5FC",
  },
];

function ToothIllustration({
  mark,
}: {
  mark: ToothMark;
}) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 160 190"
      className="h-full w-full overflow-visible drop-shadow-[0_18px_14px_rgba(3,38,84,0.13)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F9FCFF" />
          <stop offset="85%" stopColor="#E4EDF5" />
          <stop offset="100%" stopColor="#C9D8E8" />
        </linearGradient>
      </defs>

      <path
        d="
          M36 20
          C13 15 9 38 16 72
          C23 104 35 125 42 157
          C48 181 63 182 69 157
          L76 128
          Q80 115 85 128
          L94 157
          C101 182 116 181 122 157
          C129 124 143 103 148 72
          C154 38 143 15 122 20
          C104 24 94 31 82 27
          C61 19 49 17 36 20Z
        "
        fill={`url(#${gradientId})`}
        stroke="#C5D7E9"
        strokeWidth="1.5"
      />

      {mark === "decay" && (
        <g>
          <path
            d="M53 38 C63 25 83 31 89 47
               C94 62 82 76 68 73
               C51 71 44 53 53 38Z"
            fill="#92786A"
          />
          <path
            d="M62 41 C70 37 80 43 79 53
               C78 62 67 66 61 58
               C56 52 57 46 62 41Z"
            fill="#5D4A43"
          />
        </g>
      )}

      {mark === "nerve" && (
        <g
          fill="none"
          stroke="#C28480"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M56 48 Q81 64 80 91" />
          <path d="M80 91 Q62 116 57 161" />
          <path d="M80 91 Q103 119 109 161" />
          <circle
            cx="80"
            cy="91"
            r="8"
            fill="#EAC1B9"
            stroke="none"
          />
        </g>
      )}

      {mark === "implant" && (
        <g
          fill="none"
          stroke="#829DB8"
          strokeLinecap="round"
        >
          <path
            d="M80 107 V169"
            strokeWidth="6"
          />
          <path
            d="M68 126 H92
               M68 140 H92
               M71 153 H89
               M75 164 H85"
            strokeWidth="4"
          />
          <path
            d="M57 103 Q80 114 104 103"
            strokeWidth="3"
          />
        </g>
      )}

      {mark === "crown" && (
        <g>
          <path
            d="M36 34 Q80 15 124 34
               L118 104
               Q80 131 43 104Z"
            fill="#FFFFFF"
            fillOpacity=".7"
            stroke="#A9C9E3"
            strokeWidth="2.5"
          />
          <path
            d="M47 43 Q80 32 113 43"
            fill="none"
            stroke="#D5E7F4"
            strokeWidth="2"
          />
        </g>
      )}

      {mark === "filling" && (
        <g>
          <path
            d="M51 49 Q69 39 81 48
               L88 65 Q82 85 62 82
               Q47 72 51 49Z"
            fill="#FFFFFF"
            stroke="#91B5D2"
            strokeWidth="2.5"
          />
          <path
            d="M57 57 Q68 48 79 55"
            fill="none"
            stroke="#B5D6EC"
            strokeWidth="3"
          />
        </g>
      )}

      {mark === "gum" && (
        <g>
          <path
            d="M20 103 Q45 86 65 99
               Q81 110 102 99
               Q127 85 145 103"
            fill="none"
            stroke="#DDA5A5"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M24 109 Q46 95 65 108
               Q82 119 103 108
               Q125 96 142 109"
            fill="none"
            stroke="#BB8484"
            strokeWidth="2"
          />
        </g>
      )}

      {mark === "braces" && (
        <g>
          <path
            d="M25 79 Q80 91 136 79"
            fill="none"
            stroke="#789FBF"
            strokeWidth="4"
          />

          {[45, 78, 111].map((x) => (
            <rect
              key={x}
              x={x - 10}
              y="69"
              width="20"
              height="24"
              rx="4"
              fill="#DBE9F5"
              stroke="#789DBB"
              strokeWidth="2"
            />
          ))}
        </g>
      )}

      {mark === "bone" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 119 Q53 108 79 119 T132 119" stroke="#A9C7DD" strokeWidth="9" opacity="0.8" />
          <path d="M34 135 Q53 124 79 135 T130 135" stroke="#6BBAEF" strokeWidth="2.5" strokeDasharray="5 5" />
          <path d="M55 132 L55 156 M80 136 L80 164 M106 132 L106 156" stroke="#5F91B5" strokeWidth="3" />
          <circle cx="80" cy="146" r="22" stroke="#6BBAEF" strokeWidth="2" strokeDasharray="3 5" />
        </g>
      )}

      {mark === "hollywood" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M43 38 Q80 24 117 38 L109 99 Q80 121 51 99Z" fill="#F9FDFF" stroke="#80B7DE" strokeWidth="2.5" />
          <path d="M50 48 Q80 36 109 48" stroke="#C2E2F5" strokeWidth="2.5" />
          <path d="M57 79 Q80 98 103 79" stroke="#6BBAEF" strokeWidth="3" />
          <path d="M125 40 V58 M116 49 H134 M32 98 V112 M25 105 H39" stroke="#4BA1DD" strokeWidth="2.5" />
        </g>
      )}

      {mark === "rehabilitation" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="40" y="44" width="80" height="92" rx="16" stroke="#76A9CE" strokeWidth="2.5" strokeDasharray="5 5" />
          <path d="M54 65 H106 M54 85 H106 M54 105 H106" stroke="#B9D8EB" strokeWidth="3" />
          <path d="M69 65 L77 73 L94 53" stroke="#2C89C4" strokeWidth="4" />
          <path d="M69 105 L77 113 L94 93" stroke="#2C89C4" strokeWidth="4" />
        </g>
      )}

      {mark === "digital" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="35" y="40" width="90" height="92" rx="8" stroke="#7EB5D8" strokeWidth="2.5" strokeDasharray="6 5" />
          <path d="M80 43 V129 M38 85 H122" stroke="#B6DDF2" strokeWidth="1.7" strokeDasharray="4 4" />
          <path d="M52 96 Q80 115 108 96" stroke="#3B96D1" strokeWidth="3.5" />
          <circle cx="52" cy="96" r="4" fill="#5AB4EA" stroke="white" strokeWidth="1.5" />
          <circle cx="80" cy="110" r="4" fill="#5AB4EA" stroke="white" strokeWidth="1.5" />
          <circle cx="108" cy="96" r="4" fill="#5AB4EA" stroke="white" strokeWidth="1.5" />
        </g>
      )}

      {mark === "prosthetics" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M37 43 Q80 19 123 43 L116 108 Q80 134 44 108Z" fill="#FFFFFF" fillOpacity="0.84" stroke="#78A8CC" strokeWidth="3" />
          <path d="M45 56 Q80 37 115 56 M80 45 V116" stroke="#D0E6F4" strokeWidth="2.5" />
          <path d="M48 116 Q80 134 112 116" stroke="#619CC5" strokeWidth="2.5" strokeDasharray="5 4" />
          <circle cx="80" cy="25" r="5" fill="#69B5E7" stroke="#D7ECFA" strokeWidth="2" />
        </g>
      )}

      {mark === "pediatric" && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M46 50 Q42 34 57 32 Q71 30 80 37 Q89 30 103 32 Q118 34 114 50 Q110 69 101 86 Q97 95 92 89 L84 69 Q80 62 76 69 L68 89 Q63 95 59 86 Q50 69 46 50Z" fill="#FFFFFF" stroke="#83B8D8" strokeWidth="2.5" />
          <path d="M80 105 V125 M70 115 H90" stroke="#3E98D0" strokeWidth="3" />
          <path d="M113 103 L116 111 L124 114 L116 117 L113 125 L110 117 L102 114 L110 111Z" fill="#6BBAEF" stroke="none" />
        </g>
      )}

      {mark === "shine" && (
        <g
          fill="none"
          stroke="#6BBAEF"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M79 35 V85 M54 60 H104" />
          <path d="M119 84 V111 M105 98 H133" />
          <path d="M45 106 V124 M36 115 H54" />
        </g>
      )}
    </svg>
  );
}

function ToothImage({
  service,
}: {
  service: Service;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(
    null
  );

  const showImage =
    Boolean(service.image) &&
    failedImage !== service.image;

  return (
    <div className="h-full w-full">
      {showImage ? (
        <img
          src={service.image}
          alt=""
          loading="lazy"
          draggable={false}
          onError={() =>
            setFailedImage(service.image ?? null)
          }
          className="h-full w-full object-contain drop-shadow-[0_18px_16px_rgba(3,38,84,0.15)]"
        />
      ) : (
        <ToothIllustration mark={service.mark} />
      )}
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const selected = services[active];

  const selectService = (index: number) => {
    const nextIndex =
      (index + services.length) % services.length;

    setActive(nextIndex);

    const button =
      railRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-service-button]"
      )[nextIndex];

    button?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const next = () => selectService(active + 1);
  const previous = () => selectService(active - 1);

  const handleRailKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();

    const nextIndex =
      event.key === "ArrowLeft"
        ? (active + 1) % services.length
        : (active - 1 + services.length) %
          services.length;

    selectService(nextIndex);

    railRef.current
      ?.querySelectorAll<HTMLButtonElement>(
        "[data-service-button]"
      )[nextIndex]
      ?.focus({ preventScroll: true });
  };

  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 text-[#032654] md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <header className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold text-[#466B91]">
            خدمات عيادة د. رأفت ماجد
          </p>

          <h2 className="text-4xl font-bold leading-[1.4] md:text-6xl">
            لكل سن حكاية
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-8 text-[#475569]">
            اختر أحد الأسنان لتتعرف على الخدمة،
            تفاصيلها، وكيف يمكن أن تساعدك.
          </p>
        </header>

        <div className="relative mt-14 md:mt-20">

          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-l from-transparent via-[#C7DDEC] to-transparent" />

          <div
            ref={railRef}
            onKeyDown={handleRailKeyDown}
            role="group"
            aria-label="خدمات العيادة"
            className="relative flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-4 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service, index) => {
              const isActive = index === active;

              return (
                <motion.button
                  key={service.id}
                  data-service-button
                  type="button"
                  onClick={() => selectService(index)}
                  aria-pressed={isActive}
                  aria-label={`عرض تفاصيل ${service.title}`}
                  animate={{
                    y:
                      reducedMotion
                        ? 0
                        : isActive
                          ? -12
                          : 0,
                    scale:
                      reducedMotion
                        ? 1
                        : isActive
                          ? 1.05
                          : 0.96,
                    opacity: isActive ? 1 : 0.85,
                  }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : { y: -15, opacity: 1 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 23,
                  }}
                  className="group flex w-[140px] shrink-0 snap-center flex-col items-center outline-none focus-visible:rounded-[30px] focus-visible:ring-2 focus-visible:ring-[#032654] sm:w-[160px]"
                >

                  <div
                    className={`relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-[30px] border p-5 transition-[background,border-color,box-shadow] duration-300 sm:h-[205px] ${
                      isActive
                        ? "border-[#8CCAEF] bg-[#E9F5FD] shadow-[0_22px_45px_rgba(3,38,84,0.15)]"
                        : "border-[#DFEAF4] bg-white shadow-[0_10px_25px_rgba(3,38,84,0.05)] group-hover:bg-white"
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 38%, ${service.accent}, transparent 78%)`,
                      }}
                    />

                    <motion.div
                      className="relative z-10 h-full w-full"
                      animate={{
                        rotate:
                          reducedMotion || isActive
                            ? 0
                            : index % 2 === 0
                              ? -4
                              : 4,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <ToothImage service={service} />
                    </motion.div>

                    <p className="absolute right-3 top-3 text-xs font-semibold text-[#587493]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {isActive && (
                      <motion.div
                        layoutId="service-active-check"
                        className="absolute bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#032654] text-white"
                      >
                        <Check size={14} />
                      </motion.div>
                    )}
                  </div>

                  <p
                    className={`mt-5 min-h-[44px] px-1 text-center text-sm font-semibold leading-6 ${
                      isActive
                        ? "text-[#032654]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {service.title}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={previous}
            aria-label="الخدمة السابقة"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CDDDEB] bg-white transition-colors hover:border-[#6BBAEF] hover:bg-[#6BBAEF] hover:text-[#032654]"
          >
            <ArrowRight size={20} />
          </button>

          <p className="text-sm font-bold tabular-nums text-[#475569]">
            {String(active + 1).padStart(2, "0")}
            {" / "}
            {String(services.length).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={next}
            aria-label="الخدمة التالية"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CDDDEB] bg-white transition-colors hover:border-[#6BBAEF] hover:bg-[#6BBAEF] hover:text-[#032654]"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="mx-auto mt-12 max-w-5xl md:mt-16">
          <div className="overflow-hidden rounded-[30px] border border-[#DEEAF3] bg-white shadow-[0_24px_65px_rgba(3,38,84,0.08)]">

            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, x: 22 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: -22 }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                }}
                className="grid items-center gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:gap-12 md:p-10 lg:p-12"
              >

                <div className="text-right">
                  <p className="mb-4 text-sm font-semibold text-[#327CA9]">
                    تعرف على الخدمة
                  </p>

                  <p className="mb-3 text-base font-medium text-[#456785]">
                    {selected.subtitle}
                  </p>

                  <h3 className="text-3xl font-bold leading-[1.4] text-[#032654] md:text-5xl">
                    {selected.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-base font-medium leading-9 text-[#475569]">
                    {selected.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {selected.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-2 rounded-full border border-[#D5E5F1] bg-[#F3F9FD] px-4 py-2.5"
                      >
                        <Check
                          size={16}
                          className="text-[#137CB4]"
                        />

                        <p className="text-sm font-semibold text-[#174A72]">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={() => {
                      sessionStorage.setItem(
                        "selectedDentalService",
                        selected.title
                      );

                      window.dispatchEvent(
                        new CustomEvent(
                          "dental-service-selected",
                          { detail: selected.title }
                        )
                      );
                    }}
                    className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#032654] px-7 text-base font-semibold text-white shadow-[0_12px_26px_rgba(3,38,84,0.12)] transition-colors hover:bg-[#08427C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF]"
                  >
                    استفسر عن الخدمة
                    <ArrowUpLeft size={19} />
                  </a>
                </div>

                <div
                  className="relative flex min-h-[270px] items-center justify-center overflow-hidden rounded-[26px] md:min-h-[330px]"
                  style={{
                    background: `radial-gradient(circle at center, ${selected.accent}, #F7FBFF 78%)`,
                  }}
                >
                  <div className="pointer-events-none absolute h-52 w-52 rounded-full border border-white/65" />
                  <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-white/40" />

                  <motion.div
                    initial={
                      reducedMotion
                        ? false
                        : { scale: 0.85, rotate: -8 }
                    }
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.45,
                    }}
                    className="relative z-10 h-52 w-52 md:h-64 md:w-64"
                  >
                    <ToothImage service={selected} />
                  </motion.div>

                  <p className="absolute bottom-5 left-5 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold text-[#475569]">
                    {String(active + 1).padStart(2, "0")}
                    {" / "}
                    {String(services.length).padStart(2, "0")}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[#587493]">
          <MoveHorizontal size={18} />
          <p>اختر أي سن لاستكشاف تفاصيل الخدمة</p>
        </div>
      </div>
    </section>
  );
}
