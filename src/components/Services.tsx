import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpLeft, Check, RotateCcw, Sparkles } from "lucide-react";

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
    image: "https://images.pexels.com/photos/6502345/pexels-photo-6502345.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/6627694/pexels-photo-6627694.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/4687905/pexels-photo-4687905.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/12712256/pexels-photo-12712256.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/31786503/pexels-photo-31786503.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/5794074/pexels-photo-5794074.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/6502309/pexels-photo-6502309.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/33748059/pexels-photo-33748059.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/6502306/pexels-photo-6502306.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/6627599/pexels-photo-6627599.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/4269365/pexels-photo-4269365.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/4687288/pexels-photo-4687288.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
    image: "https://images.pexels.com/photos/9951394/pexels-photo-9951394.jpeg?auto=compress&cs=tinysrgb&w=1100",
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

type ServiceImageProps = {
  service: Service;
};

function ServiceImage({ service }: ServiceImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageUrl = service.image ?? `/images/service-results/${service.id}.jpg`;
  const showImage = loaded && !failed;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showImage ? "opacity-0" : "opacity-100"}`}
        style={{ background: `radial-gradient(circle at 50% 35%, #FFFFFF, ${service.accent} 70%, #C8E3F5 100%)` }}
        aria-hidden="true"
      >
        <div className="h-[195px] w-[165px] drop-shadow-[0_14px_20px_rgba(3,38,84,0.06)] sm:h-[230px] sm:w-[195px]">
          <ToothIllustration mark={service.mark} />
        </div>
        <p className="absolute inset-x-5 top-6 text-center text-xs font-semibold text-[#426A8B]">
          {failed ? "رسم توضيحي للخدمة" : "جارٍ تحميل الصورة"}
        </p>
      </div>
      {!failed && (
        <img
          src={imageUrl}
          alt={`صورة فوتوغرافية توضيحية مرتبطة بخدمة ${service.title}، وليست من حالات العيادة`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ${showImage ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

type FlipServiceCardProps = {
  service: Service;
  index: number;
  flipped: boolean;
  onFlip: () => void;
  reducedMotion: boolean;
};

function FlipServiceCard({ service, index, flipped, onFlip, reducedMotion }: FlipServiceCardProps) {
  const backTitleId = `service-back-${service.id}`;

  const chooseForBooking = () => {
    try {
      window.sessionStorage.setItem("selectedDentalService", service.title);
    } catch {
      window.dispatchEvent(new CustomEvent("dental-service-selected", { detail: service.title }));
      return;
    }
    window.dispatchEvent(new CustomEvent("dental-service-selected", { detail: service.title }));
    window.dispatchEvent(new Event("hashchange"));
  };

  return (
    <motion.article
      className="relative h-[440px] w-[88%] shrink-0 snap-start sm:h-[470px] sm:w-[calc(50%_-_10px)] lg:h-[486px] lg:w-[calc(33.333333%_-_13.333333px)]"
      style={{ perspective: "1500px" }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3 }}
      aria-label={`خدمة ${service.title}`}
    >
      <motion.div
        className="relative h-full w-full rounded-[28px]"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 155, damping: 22, mass: 0.85 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`absolute inset-0 overflow-hidden rounded-[28px] border border-[#D4E6F2] bg-[#EAF6FD] shadow-[0_18px_40px_rgba(3,38,84,0.11)] ${flipped ? "pointer-events-none" : ""}`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          aria-hidden={flipped}
        >
          <ServiceImage service={service} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#021E3E] via-[#032654]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between gap-3">
            <p className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="rounded-full border border-white/25 bg-[#032654]/45 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              صورة توضيحية
            </p>
          </div>
          <div className="pointer-events-none absolute inset-x-6 bottom-8 text-right">
            <p className="mb-2 text-[12px] font-medium text-[#D3EDFF]">{service.subtitle}</p>
            <h3 className="max-w-[94%] text-[23px] font-bold leading-[1.55] text-white sm:text-[25px]">
              {service.title}
            </h3>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#E3F4FF]">
              <RotateCcw size={16} aria-hidden="true" />
              اضغط لتفاصيل الخدمة
            </p>
          </div>
          <button
            type="button"
            onClick={onFlip}
            tabIndex={flipped ? -1 : 0}
            aria-label={`اقلب بطاقة ${service.title} لقراءة التفاصيل`}
            className="absolute inset-0 z-10 cursor-pointer rounded-[28px] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#287DB7]"
          />
        </div>

        <div
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-[28px] border border-[#6BBAEF]/35 bg-[#032654] text-white shadow-[0_20px_50px_rgba(3,38,84,0.18)] ${flipped ? "" : "pointer-events-none"}`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          aria-hidden={!flipped}
          aria-labelledby={backTitleId}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/15 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold text-[#A7D9F5]">الخدمة {String(index + 1).padStart(2, "0")}</p>
            <button
              type="button"
              onClick={onFlip}
              tabIndex={flipped ? 0 : -1}
              aria-label={`العودة إلى صورة ${service.title}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <RotateCcw size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-3 pt-5 [scrollbar-width:thin] sm:px-6">
            <h3 id={backTitleId} className="text-xl font-bold leading-[1.55] text-white sm:text-[23px]">
              {service.title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.85] text-[#D9E8F4] sm:text-sm">
              {service.description}
            </p>
            <div className="mt-5 border-t border-white/15 pt-4">
              <p className="mb-3 text-xs font-bold text-[#9BD5F5]">ما تتضمنه الخدمة</p>
              <div className="grid gap-2">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 text-[12px] leading-6 text-[#EAF5FD] sm:text-[13px]">
                    <Check className="mt-1 h-[15px] w-[15px] shrink-0 text-[#91D0F3]" aria-hidden="true" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 border-t border-white/15 bg-[#032654] px-5 py-4 sm:px-6">
            <a
              href="#contact"
              onClick={chooseForBooking}
              tabIndex={flipped ? 0 : -1}
              className="group flex min-h-11 items-center justify-between gap-3 rounded-full bg-white px-5 text-sm font-bold text-[#032654] transition-colors hover:bg-[#C8E8FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              استفسر عن الخدمة
              <ArrowUpLeft size={18} aria-hidden="true" className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Services() {
  const reducedMotion = Boolean(useReducedMotion());
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const maxStart = Math.max(0, services.length - perPage);
  const visibleIndex = Math.min(activeIndex, maxStart);

  useEffect(() => {
    const update = () => {
      setPerPage(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const bounded = Math.max(0, Math.min(index, Math.max(0, services.length - perPage)));
    const card = rail.children[bounded] as HTMLElement | undefined;
    if (!card) return;
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    rail.scrollBy({
      left: cardRect.right - railRect.right,
      behavior: reducedMotion ? "instant" : "smooth",
    });
    setActiveIndex(bounded);
    setFlippedId(null);
  }, [perPage, reducedMotion]);

  const syncActiveOnScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const rightEdge = rail.getBoundingClientRect().right;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;
    Array.from(rail.children).forEach((child, index) => {
      const distance = Math.abs(child.getBoundingClientRect().right - rightEdge);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });
    setActiveIndex(Math.min(closest, Math.max(0, services.length - perPage)));
  };

  return (
    <section
      id="services"
      dir="rtl"
      aria-labelledby="services-heading"
      className="scroll-mt-28 overflow-hidden bg-[#F8FAFC] py-20 text-[#032654] md:py-28"
      style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold text-[#327CA9]">خدمات عيادتنا</p>
          <h2 id="services-heading" className="text-[37px] font-bold leading-[1.4] sm:text-5xl lg:text-[58px]">
            كل ابتسامة تستحق عناية خاصة
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#52677C] sm:text-base">
            تعرّف على خدمات العيادة، وشاهد الصور المرتبطة بكل خدمة، ثم اقلب البطاقة لاستكشاف التفاصيل.
          </p>
        </motion.header>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 sm:mt-14">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#456A89]">
            <Sparkles size={18} aria-hidden="true" className="text-[#287DB7]" />
            <p>{services.length} خدمة علاجية وتجميلية</p>
          </div>
          <p className="text-xs font-medium text-[#71889D]">اضغط على الصورة لقلب البطاقة</p>
        </div>

        <div
          ref={railRef}
          onScroll={syncActiveOnScroll}
          role="region"
          aria-label="معرض خدمات العيادة"
          className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-1 pb-9 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "4px" }}
        >
          {services.map((service, index) => (
            <FlipServiceCard
              key={service.id}
              service={service}
              index={index}
              flipped={flippedId === service.id}
              reducedMotion={reducedMotion}
              onFlip={() => setFlippedId((current) => current === service.id ? null : service.id)}
            />
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#DFEAF3] pt-6">
          <p dir="ltr" className="text-sm font-bold tabular-nums text-[#456A89]" aria-live="polite">
            {String(visibleIndex + 1).padStart(2, "0")}
            {perPage > 1 ? `–${String(Math.min(visibleIndex + perPage, services.length)).padStart(2, "0")}` : ""}
            {" / "}
            {String(services.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(visibleIndex - 1)}
              disabled={visibleIndex === 0}
              aria-label="الخدمات السابقة"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#BDD8EA] bg-white text-[#032654] transition-colors hover:border-[#6BBAEF] hover:bg-[#E5F4FD] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287DB7]"
            >
              <ArrowRight size={21} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(visibleIndex + 1)}
              disabled={visibleIndex >= maxStart}
              aria-label="الخدمات التالية"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#032654] text-white transition-colors hover:bg-[#145080] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287DB7]"
            >
              <ArrowLeft size={21} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
