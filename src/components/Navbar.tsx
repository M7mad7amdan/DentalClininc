import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  House,
  Images,
  Stethoscope,
  HeartHandshake,
  Award,
  MessagesSquare,
  Phone,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "الرئيسية", icon: House, href: "#home" },
  { name: "نتائج المرضى", icon: Images, href: "#results" },
  { name: "خدماتنا", icon: Stethoscope, href: "#services" },
  { name: "لماذا نحن", icon: HeartHandshake, href: "#why-us" },
  { name: "الشهادات", icon: Award, href: "#certificates" },
  { name: "آراء المرضى", icon: MessagesSquare, href: "#testimonials" },
  { name: "تواصل معنا", icon: Phone, href: "#contact" },
];

type MenuLayout = {
  mobile: boolean;
  radius: number;
  size: number;
  horizontalOffset: number;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [layout, setLayout] = useState<MenuLayout>({
    mobile: false,
    radius: 270,
    size: 100,
    horizontalOffset: 100,
  });

  const logoRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const update = () => {
      const rect = logoRef.current?.getBoundingClientRect();
      const width = window.innerWidth;

      if (rect) {
        setCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }

      if (width < 640) {
        setLayout({
          mobile: true,
          radius: 0,
          size: 72,
          horizontalOffset: Math.min(102, (width - 100) / 2.2),
        });
      } else if (width < 1024) {
        setLayout({
          mobile: false,
          radius: 235,
          size: 88,
          horizontalOffset: 0,
        });
      } else {
        setLayout({
          mobile: false,
          radius: 270,
          size: 100,
          horizontalOffset: 0,
        });
      }
    };

    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        logoRef.current?.focus();
      }
    };

    const onOutside = (event: globalThis.PointerEvent) => {
      const target = event.target as Node;

      if (
        !rootRef.current?.contains(target) &&
        !(
          target instanceof Element &&
          target.closest("[data-nav-item]")
        )
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutside);

    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [isOpen, closeMenu]);

  const handleLink = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    closeMenu();

    document.querySelector(href)?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);
  };

  const getPosition = (index: number) => {
    if (layout.mobile) {
      const width = typeof window === "undefined" ? 390 : window.innerWidth;
      const distance = Math.min(82, (width - 32) / 4);
      const firstRow = index < 3;
      const column = firstRow ? index : index - 3;
      const columns = firstRow ? 3 : 4;

      return {
        x: ((columns - 1) / 2 - column) * distance,
        y: firstRow ? 158 : 249,
      };
    }

    const angle =
      ((20 + (140 * index) / (navItems.length - 1)) *
        Math.PI) /
      180;

    return {
      x: Math.cos(angle) * layout.radius,
      y: Math.sin(angle) * layout.radius + 55,
    };
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-4 py-4 md:px-12">
        <div className="relative mx-auto flex max-w-[1440px] items-start justify-between">
          <div
            ref={rootRef}
            className="pointer-events-auto absolute left-1/2 top-0 z-[130] -translate-x-1/2"
          >
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.82,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
              }}
              className="pointer-events-none absolute -inset-[7px] rounded-full border-2 border-[#6BBAEF]/50"
            />

            <motion.button
              ref={logoRef}
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              whileHover={reducedMotion ? undefined : { scale: 1.035 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
              }}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
              aria-controls="circular-nav"
              className="relative flex items-center gap-2 rounded-full border-2 border-[#DCE7F2] bg-white/95 px-2.5 py-2.5 shadow-[0_10px_35px_rgba(3,38,84,0.15)] backdrop-blur-xl transition-colors duration-300 hover:border-[#6BBAEF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF] sm:gap-3 sm:px-3"
            >
              <motion.div
                animate={{
                  rotate: isOpen && !reducedMotion ? 12 : 0,
                  scale: isOpen && !reducedMotion ? 1.06 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#032654] text-white sm:h-14 sm:w-14"
              >
                <Stethoscope className="h-6 w-6 sm:h-7 sm:w-7" />
              </motion.div>

              <div className="whitespace-nowrap text-right">
                <p className="text-[13px] font-bold leading-6 text-[#032654] sm:text-base">
                  د. رأفت ماجد
                </p>

                <p className="text-[10px] font-semibold text-[#475569] sm:text-xs">
                  طب وتجميل الأسنان
                </p>
              </div>

              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center text-[#032654] sm:h-10 sm:w-10">
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={
                        reducedMotion
                          ? false
                          : {
                              opacity: 0,
                              rotate: -70,
                              scale: 0.5,
                            }
                      }
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 70,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.2,
                      }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={
                        reducedMotion
                          ? false
                          : {
                              opacity: 0,
                              rotate: 70,
                              scale: 0.5,
                            }
                      }
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: -70,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.2,
                      }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>

          <a
            href="#contact"
            onClick={() => closeMenu()}
            className="pointer-events-auto absolute left-0 top-[92px] inline-flex min-h-11 items-center justify-center rounded-full border border-[#032654] bg-[#032654] px-4 text-xs font-bold text-white shadow-[0_8px_24px_rgba(3,38,84,0.16)] transition-all duration-300 hover:border-[#6BBAEF] hover:bg-[#6BBAEF] hover:text-[#032654] sm:static sm:ml-0 sm:mr-auto sm:min-h-[52px] sm:px-7 sm:text-sm"
          >
            احجز موعدك
          </a>
        </div>
      </header>

      <nav
        id="circular-nav"
        aria-label="القائمة الرئيسية"
        className="pointer-events-none fixed inset-0 z-[110]"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const position = getPosition(index);

          return (
            <motion.a
              key={item.href}
              data-nav-item
              href={item.href}
              onClick={(event) => handleLink(event, item.href)}
              initial={false}
              animate={{
                x: isOpen ? position.x : 0,
                y: isOpen ? position.y : 0,
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.15,
                rotate: isOpen
                  ? 0
                  : index % 2 === 0
                    ? -30
                    : 30,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 280,
                      damping: 21,
                      mass: 0.7,
                      delay: isOpen
                        ? index * 0.06
                        : (navItems.length - index - 1) * 0.025,
                    }
              }
              whileHover={
                isOpen && !reducedMotion
                  ? {
                      scale: 1.1,
                      y: position.y - 5,
                    }
                  : undefined
              }
              whileTap={
                isOpen && !reducedMotion
                  ? { scale: 0.94 }
                  : undefined
              }
              tabIndex={isOpen ? 0 : -1}
              aria-hidden={!isOpen}
              style={{
                left: center.x,
                top: center.y,
                width: layout.size,
                height: layout.size,
                marginLeft: -layout.size / 2,
                marginTop: -layout.size / 2,
                pointerEvents: isOpen ? "auto" : "none",
              }}
              className="group absolute flex flex-col items-center justify-center gap-1.5 rounded-full border border-[#6BBAEF]/40 bg-[#032654] px-2 text-center text-white shadow-[0_15px_35px_rgba(3,38,84,0.25)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#6BBAEF] hover:bg-[#6BBAEF] hover:text-[#032654] hover:shadow-[0_18px_42px_rgba(3,38,84,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF]"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: isOpen && !reducedMotion ? 0 : -15,
                  scale: isOpen ? 1 : 0.7,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: isOpen && !reducedMotion
                    ? index * 0.06 + 0.08
                    : 0,
                }}
              >
                <Icon className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              </motion.div>

              <motion.p
                initial={false}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 8,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.25,
                  delay: isOpen && !reducedMotion
                    ? index * 0.06 + 0.12
                    : 0,
                }}
                className="text-center text-[11px] font-bold leading-[1.4] sm:text-[13px]"
              >
                {item.name}
              </motion.p>
            </motion.a>
          );
        })}
      </nav>
    </>
  );
}
