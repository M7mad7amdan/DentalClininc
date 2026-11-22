import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  Check,
  MessageCircle,
} from "lucide-react";

const SERVICES = [
  "علاج تسوس الأسنان",
  "علاج العصب",
  "زراعة الأسنان",
  "فينيرز وتلبيس زركون",
  "حشوات تجميلية",
  "تجميل وعلاج اللثة",
  "تقويم الأسنان",
  "تبييض الأسنان",
  "استشارة عامة",
];

const WHATSAPP_NUMBER =
  import.meta.env.VITE_CLINIC_WHATSAPP || "";

const steps = [
  {
    number: "01",
    title: "اختر الخدمة",
    description: "حدد نوع العلاج الذي ترغب بالاستفسار عنه.",
  },
  {
    number: "02",
    title: "أدخل بياناتك",
    description: "شاركنا اسمك ورقم هاتفك للتواصل معك.",
  },
  {
    number: "03",
    title: "تواصل عبر واتساب",
    description: "أرسل طلبك لتنسيق الموعد مع العيادة.",
  },
];

export default function Booking() {
  const reducedMotion = Boolean(useReducedMotion());

  const [form, setForm] = useState({
    service: "",
    name: "",
    phone: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const phoneDigits = form.phone.replace(/\D/g, "");
  const phoneValid =
    phoneDigits.length >= 7 &&
    phoneDigits.length <= 15;

  const completed = [
    Boolean(form.service),
    Boolean(form.name.trim()),
    phoneValid,
  ].filter(Boolean).length;

  const progress = Math.round((completed / 3) * 100);

  const activeStep =
    !form.service
      ? 0
      : !form.name.trim() || !phoneValid
        ? 1
        : 2;

  useEffect(() => {
    const loadSelectedService = () => {
      const selected = sessionStorage.getItem(
        "selectedDentalService"
      );

      if (selected && SERVICES.includes(selected)) {
        setForm((previous) => ({
          ...previous,
          service: selected,
        }));
      }
    };

    loadSelectedService();

    window.addEventListener(
      "hashchange",
      loadSelectedService
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        loadSelectedService
      );
    };
  }, []);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    const clinicNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

    if (
      !form.service ||
      !form.name.trim() ||
      !phoneValid
    ) {
      setError(
        "يرجى استكمال البيانات المطلوبة بشكل صحيح."
      );
      return;
    }

    if (!/^[1-9]\d{6,14}$/.test(clinicNumber)) {
      setError(
        "رقم واتساب العيادة غير مضاف بعد في إعدادات المشروع."
      );
      return;
    }

    const message = [
      "مرحبًا، أود الاستفسار عن موعد في عيادة د. رأفت ماجد.",
      "",
      `الخدمة المطلوبة: ${form.service}`,
      `الاسم الكامل: ${form.name.trim()}`,
      `رقم الهاتف: ${form.phone.trim()}`,
      form.notes.trim()
        ? `ملاحظات إضافية: ${form.notes.trim()}`
        : "",
      "",
      "أرجو التواصل معي لتنسيق الموعد المناسب. شكرًا لكم.",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl =
      `https://wa.me/${clinicNumber}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const fieldStyle =
    "w-full bg-transparent px-5 text-base font-medium text-[#032654] outline-none placeholder:text-[#64748B]";

  const fieldContainer =
    "group relative overflow-hidden rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] transition-all duration-300 focus-within:border-[#6BBAEF] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6BBAEF]/10";

  const focusLine =
    "pointer-events-none absolute bottom-0 right-0 h-[3px] w-full origin-right scale-x-0 bg-[#6BBAEF] transition-transform duration-500 ease-out group-focus-within:scale-x-100 motion-reduce:transition-none";

  return (
    <section
      id="contact"
      dir="rtl"
      className="booking-section relative isolate overflow-hidden bg-[#F8FAFC] px-4 py-20 text-[#032654] sm:px-6 lg:px-10 lg:py-28"
      style={{
        fontFamily:
          '"IBM Plex Sans Arabic", "Tajawal", sans-serif',
      }}
    >
      <div className="mx-auto max-w-7xl">

        <header className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-base font-semibold text-[#475569]">
            عيادة د. رأفت ماجد
          </p>

          <h2 className="text-[40px] font-bold leading-[1.5] tracking-tight text-[#032654] sm:text-5xl lg:text-[62px]">
            موعدك يبدأ من هنا
          </h2>

          <motion.div
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reducedMotion ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-5 h-[3px] w-28 origin-center rounded-full bg-[#6BBAEF]"
          />

          <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-9 text-[#334155] md:text-lg">
            خطوة بسيطة تفصلك عن العناية بابتسامتك.
            اختر الخدمة وأخبرنا بالتفاصيل،
            وسنساعدك في تنسيق موعدك.
          </p>
        </header>

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.75fr)]">

          <div className="relative min-w-0 overflow-hidden rounded-[30px] border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_65px_-40px_rgba(30,48,30,0.25)] sm:p-9 lg:p-11">

            <motion.div
              initial={
                reducedMotion ? false : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reducedMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-0 top-0 h-[4px] w-full origin-right bg-[#6BBAEF]"
            />

            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-[#475569]">
                  نموذج الاستشارة
                </p>

                <h3 className="text-[30px] font-bold leading-[1.4] text-[#032654] sm:text-4xl">
                  احجز استشارتك
                </h3>

                <p className="mt-4 max-w-lg text-base font-medium leading-8 text-[#475569]">
                  أدخل البيانات التالية وسنجهز رسالتك
                  للتواصل مع العيادة مباشرة.
                </p>
              </div>

              <p className="shrink-0 pt-2 text-sm font-bold tabular-nums text-[#475569]">
                01 / 03
              </p>
            </div>

            <div className="mt-9 border-t border-[#E2E8F0] pt-7">

              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-base font-bold text-[#032654]">
                  اكتمال البيانات
                </p>

                <motion.p
                  key={completed}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0.5,
                          y: -8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-base font-bold tabular-nums text-[#032654]"
                >
                  {progress}%
                </motion.p>
              </div>

              <div
                className="h-[7px] overflow-hidden rounded-full bg-[#E2E8F0]"
                role="progressbar"
                aria-label="اكتمال بيانات الاستشارة"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  initial={false}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-[#6BBAEF]"
                />
              </div>

              <p className="mt-3 text-sm font-medium text-[#64748B]">
                {completed === 3
                  ? "ممتاز، جميع البيانات الأساسية مكتملة."
                  : "أكمل الحقول المطلوبة للمتابعة عبر واتساب."}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-9 space-y-7"
            >

              <div>
                <label
                  htmlFor="booking-service"
                  className="mb-3 block text-base font-bold text-[#032654]"
                >
                  الخدمة المطلوبة *
                </label>

                <div className={fieldContainer}>
                  <select
                    id="booking-service"
                    required
                    value={form.service}
                    onChange={(event) =>
                      updateField(
                        "service",
                        event.target.value
                      )
                    }
                    className={`${fieldStyle} h-[66px] cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>
                      اختر الخدمة التي تحتاجها
                    </option>

                    {SERVICES.map((service) => (
                      <option
                        key={service}
                        value={service}
                      >
                        {service}
                      </option>
                    ))}
                  </select>

                  <div className={focusLine} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="booking-name"
                    className="mb-3 block text-base font-bold text-[#032654]"
                  >
                    الاسم الكامل *
                  </label>

                  <div className={fieldContainer}>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="أدخل اسمك الكامل"
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      className={`${fieldStyle} h-[66px]`}
                    />

                    <div className={focusLine} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="mb-3 block text-base font-bold text-[#032654]"
                  >
                    رقم الهاتف *
                  </label>

                  <div className={fieldContainer}>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      dir="ltr"
                      placeholder="05XXXXXXXX"
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value
                        )
                      }
                      className={`${fieldStyle} h-[66px] text-left`}
                    />

                    <div className={focusLine} />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="mb-3 block text-base font-bold text-[#032654]"
                >
                  ملاحظات إضافية (اختياري)
                </label>

                <div className={fieldContainer}>
                  <textarea
                    id="booking-notes"
                    rows={4}
                    value={form.notes}
                    onChange={(event) =>
                      updateField(
                        "notes",
                        event.target.value
                      )
                    }
                    placeholder="هل هناك تفاصيل تود مشاركتها معنا؟"
                    className={`${fieldStyle} min-h-[155px] resize-y py-5 leading-8`}
                  />

                  <div className={focusLine} />
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-base font-semibold text-red-700"
                >
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -3 }
                }
                whileTap={
                  reducedMotion
                    ? undefined
                    : { scale: 0.98 }
                }
                className="group relative flex min-h-[68px] w-full items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#032654] px-6 text-white shadow-[0_16px_35px_-16px_rgba(35,55,36,0.55)] transition-colors duration-300 hover:bg-[#032654]/90"
              >

                <div className="pointer-events-none absolute inset-y-0 -right-28 w-24 -skew-x-12 bg-gradient-to-l from-transparent via-white/15 to-transparent transition-[right] duration-700 group-hover:right-[110%] motion-reduce:transition-none" />

                <div className="relative z-10 flex items-center gap-3">
                  <MessageCircle size={22} />

                  <p className="text-base font-bold md:text-lg">
                    متابعة عبر واتساب
                  </p>
                </div>

                <ArrowUpLeft
                  size={23}
                  className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
                />
              </motion.button>

              <p className="text-center text-sm font-medium leading-7 text-[#475569]">
                لا يتم تأكيد الموعد تلقائيًا.
                تتواصل معك العيادة لتنسيق الموعد
                حسب الأوقات المتاحة.
              </p>
            </form>
          </div>

          <aside className="relative overflow-hidden rounded-[30px] border border-[#E2E8F0] bg-[#6BBAEF]/10 p-7 sm:p-9">

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { scaleY: 0 }
              }
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reducedMotion ? 0 : 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-0 top-0 h-full w-[4px] origin-top bg-[#6BBAEF]"
            />

            <p className="text-sm font-semibold text-[#475569]">
              كيف تتم المتابعة؟
            </p>

            <h3 className="mt-3 text-[29px] font-bold leading-[1.5] text-[#032654]">
              ثلاث خطوات بسيطة
            </h3>

            <p className="mt-4 text-base font-medium leading-8 text-[#475569]">
              كل ما تحتاجه لبدء التواصل
              مع العيادة.
            </p>

            <div className="mt-9 space-y-4">

              {steps.map((step, index) => {
                const isCurrent = activeStep === index;
                const isDone = activeStep > index;

                return (
                  <motion.div
                    key={step.number}
                    initial={false}
                    animate={{
                      backgroundColor: isCurrent
                        ? "#FFFFFF"
                        : "rgba(255,255,255,0)",
                      borderColor: isCurrent
                        ? "#6BBAEF"
                        : "rgba(107,186,239,0)",
                      x: reducedMotion
                        ? 0
                        : isCurrent
                          ? -4
                          : 0,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.4,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-4 rounded-2xl border p-4"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor:
                          isCurrent || isDone
                            ? "#032654"
                            : "#E2E8F0",
                        color:
                          isCurrent || isDone
                            ? "#FFFFFF"
                            : "#032654",
                      }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.35,
                      }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                    >
                      {isDone ? (
                        <Check size={20} />
                      ) : (
                        step.number
                      )}
                    </motion.div>

                    <div>
                      <h4 className="text-base font-bold text-[#032654]">
                        {step.title}
                      </h4>

                      <p className="mt-2 text-sm font-medium leading-7 text-[#475569]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-9 border-t border-[#CBD5E1] pt-7">
              <p className="text-base font-bold leading-8 text-[#032654]">
                العناية بابتسامتك تبدأ من أول تواصل.
              </p>

              <p className="mt-3 text-sm font-medium leading-7 text-[#475569]">
                بعد إرسال رسالة واتساب،
                يتم التنسيق مباشرة مع العيادة
                لاختيار الموعد المناسب.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
