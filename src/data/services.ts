export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  badge: string;
};

export const services: ServiceItem[] = [
  {
    id: 1,
    title: "ترميم الأسنان",
    description:
      "إصلاح الأسنان المكسورة أو المتضررة بدقة عالية للحفاظ على الشكل والوظيفة.",
    image: "/services/broken-tooth.png",
    alt: "سن مكسور ثلاثي الأبعاد يعبّر عن خدمة ترميم الأسنان",
    badge: "إصلاح دقيق",
  },
  {
    id: 2,
    title: "تبييض الأسنان",
    description:
      "حلول آمنة وفعالة للحصول على ابتسامة أكثر إشراقًا وبياضًا بشكل متناسق.",
    image: "/services/whitening-tooth.png",
    alt: "سن أبيض لامع ثلاثي الأبعاد يعبّر عن خدمة تبييض الأسنان",
    badge: "ابتسامة أكثر إشراقًا",
  },
  {
    id: 3,
    title: "زراعة الأسنان",
    description:
      "تعويض الأسنان المفقودة بزرعات متقنة تمنحك مظهرًا طبيعيًا وثباتًا عاليًا.",
    image: "/services/implant-tooth.png",
    alt: "سن مع زرعة ثلاثية الأبعاد يعبّر عن خدمة زراعة الأسنان",
    badge: "حل ثابت وطويل الأمد",
  },
  {
    id: 4,
    title: "تقويم الأسنان",
    description:
      "تنظيم الأسنان وتحسين الإطباق للحصول على ابتسامة أكثر تناسقًا وجمالًا.",
    image: "/services/braces-tooth.png",
    alt: "سن مع تقويم ثلاثي الأبعاد يعبّر عن خدمة تقويم الأسنان",
    badge: "تنظيم وتناسق",
  },
  {
    id: 5,
    title: "الفينير",
    description:
      "عدسات تجميلية دقيقة لتحسين شكل الأسنان ومنح الابتسامة مظهرًا راقيًا.",
    image: "/services/veneer-tooth.png",
    alt: "سن فينير ثلاثي الأبعاد يعبّر عن خدمة الفينير",
    badge: "لمسة تجميلية",
  },
  {
    id: 6,
    title: "تجميل اللثة",
    description:
      "عناية تجميلية تعزز تناسق اللثة وتُبرز جمال الابتسامة بشكل متوازن.",
    image: "/services/gum-care-tooth.png",
    alt: "سن مع عناية باللثة ثلاثي الأبعاد يعبّر عن خدمة تجميل اللثة",
    badge: "مظهر أكثر توازنًا",
  },
];