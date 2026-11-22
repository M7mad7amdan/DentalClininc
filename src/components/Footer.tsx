
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  ArrowUp,
  Stethoscope,
} from "lucide-react";

const footerLinks = [
  { name: "الرئيسية", href: "#home" },
  { name: "خدماتنا", href: "#services" },
  { name: "لماذا نحن", href: "#why-us" },
  { name: "نتائج المرضى", href: "#results" },
  { name: "آراء المرضى", href: "#testimonials" },
  { name: "تواصل معنا", href: "#contact" },
];

export default function Footer() {
  const reducedMotion = Boolean(useReducedMotion());

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const section = document.querySelector(href);

    if (!section) return;

    event.preventDefault();

    section.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);
  };

  return (
    <footer
      dir="rtl"
      className="relative isolate w-full overflow-hidden border-t border-[#E2E8F0] bg-white text-[#032654]"
      style={{
        fontFamily:
          '"IBM Plex Sans Arabic", "Tajawal", sans-serif',
      }}
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#6BBAEF]/[0.07] blur-[110px]" />

      <div className="pointer-events-none absolute -right-40 bottom-28 h-[360px] w-[360px] rounded-full bg-[#DDEFFC]/40 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 md:pt-24">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0.7, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
          }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#032654] text-white shadow-[0_12px_28px_rgba(3,38,84,0.15)]">
              <Stethoscope size={27} strokeWidth={1.8} />
            </div>

            <div className="text-right">
              <h3 className="text-xl font-bold leading-8 text-[#032654] md:text-2xl">
                د. رأفت ماجد
              </h3>

              <p className="text-sm font-medium text-[#64748B]">
                طب وتجميل الأسنان
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl md:mt-20">
            <p className="mb-5 text-sm font-semibold tracking-wide text-[#4089B9]">
              العناية تبدأ من هنا
            </p>

            <h2 className="text-[38px] font-bold leading-[1.45] tracking-tight text-[#032654] sm:text-5xl md:text-[64px]">
              ابتسامتك تستاهل
              <strong className="block font-bold">
                بداية أجمل.
              </strong>
            </h2>

            <div className="mx-auto mt-1 flex max-w-[240px] justify-center">
              <svg
                viewBox="0 0 240 55"
                fill="none"
                className="h-auto w-full"
                aria-hidden="true"
              >
                <motion.path
                  d="M12 9 C69 54 171 54 228 9"
                  stroke="#6BBAEF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={
                    reducedMotion
                      ? false
                      : { pathLength: 0, opacity: 0.4 }
                  }
                  whileInView={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.8,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  }}
                />
              </svg>
            </div>

            <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-9 text-[#526176] md:text-lg">
              نسعى لتقديم تجربة مريحة وعناية
              دقيقة بأسنانك، من أول استشارة
              وحتى نهاية رحلتك العلاجية.
            </p>

            <motion.a
              href="#contact"
              onClick={(event) =>
                scrollToSection(event, "#contact")
              }
              whileHover={
                reducedMotion
                  ? undefined
                  : { y: -4 }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              className="group mx-auto mt-9 inline-flex min-h-[58px] items-center justify-center gap-4 rounded-full bg-[#032654] px-8 text-base font-bold text-white shadow-[0_14px_35px_rgba(3,38,84,0.16)] transition-[background-color,box-shadow] duration-300 hover:bg-[#10447C] hover:shadow-[0_18px_40px_rgba(3,38,84,0.23)]"
            >
              احجز استشارتك

              <ArrowUpLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>
          </div>
        </motion.div>

        <nav
          aria-label="روابط الفوتر"
          className="mt-20 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 border-t border-[#E2E8F0] pt-9 md:mt-24 md:gap-x-4"
        >
          {footerLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                scrollToSection(event, link.href)
              }
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0.6, y: 10 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                delay: reducedMotion ? 0 : index * 0.06,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : { y: -3 }
              }
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#475569] transition-colors duration-300 hover:bg-[#EAF5FD] hover:text-[#032654] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF] md:text-base"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="relative mt-14 md:mt-16">
        <div className="h-[12px] border-y border-[#DCEAF5] bg-[repeating-linear-gradient(135deg,#DCEAF5_0px,#DCEAF5_1px,transparent_1px,transparent_9px)]" />

        <motion.div
          initial={
            reducedMotion
              ? false
              : { scaleX: 0 }
          }
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 1.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-0 top-0 h-[2px] w-full origin-right bg-[#6BBAEF]"
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 text-center sm:px-8 md:flex-row md:text-right">
        <p className="text-sm font-medium text-[#64748B]">
          © {new Date().getFullYear()} عيادة د. رأفت ماجد.
          جميع الحقوق محفوظة.
        </p>

        <a
          href="#home"
          onClick={(event) =>
            scrollToSection(event, "#home")
          }
          className="group inline-flex items-center gap-2 text-sm font-bold text-[#032654] transition-colors hover:text-[#287DB7]"
        >
          العودة إلى الأعلى

          <ArrowUp
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </footer>
  );
}
