import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  CalendarDays,
  ChevronLeft,
  ClipboardList,
  Menu,
  MessageCircle,
  PhoneCall,
  X,
} from "lucide-react";

const CONTACT_PHONE = "+970568516515";
const WHATSAPP_NUMBER = (
  import.meta.env.VITE_CLINIC_WHATSAPP || "970568516515"
).replace(/\D/g, "");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const menuItems = [
  { label: "الواجهة الرئيسية ورؤيتنا", href: "#home", number: "01" },
  { label: "تعرّف على د. رأفت ماجد", href: "#about", number: "02" },
  { label: "الشهادات والخبرات", href: "#certificates", number: "03" },
  { label: "الأطباء والأخصائيون", href: "#specialists", number: "04" },
  { label: "التكنولوجيا في عياداتنا", href: "#technology", number: "05" },
  { label: "علاجاتنا", href: "#services", number: "06" },
  { label: "حالات من عياداتنا", href: "#results", number: "07" },
  { label: "تجارب المرضى", href: "#testimonials", number: "08" },
  { label: "تواصل معنا", href: "#contact", number: "09" },
];

const desktopLinks = [
  { label: "عن المركز", href: "#why-us" },
  { label: "الشهادات والخبرات", href: "#certificates" },
  { label: "علاجاتنا", href: "#services" },
  { label: "حالاتنا", href: "#results" },
];

export default function Navbar() {
  const reducedMotion = Boolean(useReducedMotion());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [floatingOpen, setFloatingOpen] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const bookingButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && menuOpen && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === "Escape") {
        if (menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
        if (bookingOpen) {
          setBookingOpen(false);
          bookingButtonRef.current?.focus();
        }
        setFloatingOpen(false);
      }
    };

    const handleOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (bookingOpen && !bookingRef.current?.contains(target)) {
        setBookingOpen(false);
      }
      if (floatingOpen && !floatingRef.current?.contains(target)) {
        setFloatingOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [menuOpen, bookingOpen, floatingOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    setMenuOpen(false);
    setBookingOpen(false);
    setFloatingOpen(false);
    if (!target) return;
    const headerOffset = 86;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset;
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reducedMotion ? "instant" : "smooth",
      });
      window.history.replaceState(null, "", href);
    });
  };

  const requestCallback = () => {
    try {
      window.sessionStorage.setItem("clinicCallbackRequest", "1");
    } catch {
    }
    scrollTo("#contact");
    window.dispatchEvent(new Event("clinic-callback-request"));
  };

  return (
    <>
      <motion.header
        initial={reducedMotion ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        dir="rtl"
        className={`fixed inset-x-0 top-0 z-[200] w-full border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-[#DDEAF4] bg-white/95 shadow-[0_6px_28px_rgba(3,38,84,0.08)] backdrop-blur-xl"
            : "border-[#E0EBF5]/80 bg-[#FFFFFF]/95 backdrop-blur-lg"
        }`}
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-2 px-3 sm:h-[88px] sm:gap-3 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-4">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "إغلاق قائمة الأقسام" : "فتح قائمة الأقسام"}
              aria-controls="clinic-drawer-nav"
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen(true);
                setBookingOpen(false);
                setFloatingOpen(false);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 border border-[#DAE9F4] text-[#032654] transition-colors hover:border-[#6BBAEF] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF]"
            >
              <Menu size={23} strokeWidth={1.9} aria-hidden="true" />
            </button>

            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#home");
              }}
              className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-[#6BBAEF] sm:gap-3"
              aria-label="عيادات د. رأفت ماجد - العودة للرئيسية"
            >
              <svg viewBox="0 0 48 52" width="35" height="39" fill="none" aria-hidden="true" className="hidden shrink-0 text-[#318ABD] min-[390px]:block sm:h-11 sm:w-10">
                <path d="M11 7 C4 8 3 19 7 30 C10 37 13 46 18 46 C22 46 20 32 24 31 C28 32 26 46 31 46 C36 46 39 37 41 30 C45 18 43 8 36 7 C31 5 27 10 24 10 C20 10 17 5 11 7Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                <path d="M13 15 C20 19 27 20 35 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
              </svg>
              <div className="min-w-0 text-right">
                <p className="whitespace-nowrap text-[11px] font-bold leading-5 text-[#032654] min-[390px]:text-[13px] sm:text-[16px]">عيادات د. رأفت ماجد</p>
                <p className="hidden whitespace-nowrap text-[9px] font-semibold leading-4 text-[#677888] min-[360px]:block sm:text-[11px]">طب وتجميل الأسنان</p>
              </div>
            </a>
          </div>

          <nav aria-label="روابط سريعة" className="hidden items-center gap-6 xl:flex 2xl:gap-9">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(link.href);
                }}
                className="rounded-md py-2 text-[13px] font-bold text-[#032654] transition-colors hover:text-[#1477B3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6BBAEF] 2xl:text-[15px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div ref={bookingRef} className="relative shrink-0">
            <button
              ref={bookingButtonRef}
              type="button"
              aria-expanded={bookingOpen}
              aria-haspopup="menu"
              aria-controls="clinic-booking-options"
              onClick={() => {
                setBookingOpen((current) => !current);
                setMenuOpen(false);
                setFloatingOpen(false);
              }}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#032654] px-3 text-[11px] font-bold text-white shadow-[0_7px_18px_rgba(3,38,84,0.18)] transition-colors hover:bg-[#073D6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C568C] sm:min-h-[50px] sm:gap-3 sm:px-6 sm:text-sm"
            >
              <CalendarDays size={17} aria-hidden="true" />
              احجز موعدك
            </button>

            <AnimatePresence>
              {bookingOpen && (
                <motion.div
                  id="clinic-booking-options"
                  role="menu"
                  aria-label="طرق حجز الموعد"
                  initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  className="absolute left-0 top-[calc(100%+12px)] z-[225] w-[min(310px,calc(100vw-28px))] rounded-[22px] border border-[#DDEAF4] bg-white p-2 shadow-[0_22px_65px_rgba(3,38,84,0.17)]"
                >
                  <p className="px-3 pb-2 pt-2 text-xs font-semibold text-[#697785]">كيف بتحب تتواصل معنا؟</p>
                  <a role="menuitem" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setBookingOpen(false)} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-[#032654] transition-colors hover:bg-[#EEF8FE] focus-visible:bg-[#EEF8FE] focus-visible:outline-none">
                    <MessageCircle size={20} className="text-[#238765]" aria-hidden="true" />
                    <p className="flex-1 text-sm font-bold">واتساب</p>
                    <ArrowUpLeft size={17} aria-hidden="true" />
                  </a>
                  <a role="menuitem" href={`tel:${CONTACT_PHONE}`} onClick={() => setBookingOpen(false)} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-[#032654] transition-colors hover:bg-[#EEF8FE] focus-visible:bg-[#EEF8FE] focus-visible:outline-none">
                    <PhoneCall size={20} className="text-[#0C568C]" aria-hidden="true" />
                    <p className="flex-1 text-sm font-bold">اتصال مباشر</p>
                    <ArrowUpLeft size={17} aria-hidden="true" />
                  </a>
                  <button role="menuitem" type="button" onClick={requestCallback} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-right text-[#032654] transition-colors hover:bg-[#EEF8FE] focus-visible:bg-[#EEF8FE] focus-visible:outline-none">
                    <ClipboardList size={20} className="text-[#0C568C]" aria-hidden="true" />
                    <p className="flex-1 text-sm font-bold">خلّينا نتواصل معك</p>
                    <ChevronLeft size={17} aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-right bg-gradient-to-l from-[#0C568C] via-[#6BBAEF] to-transparent"
          initial={false}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="إغلاق قائمة الأقسام"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[205] cursor-default bg-[#051A30]/55 backdrop-blur-[3px]"
            />
            <motion.aside
              ref={drawerRef}
              id="clinic-drawer-nav"
              dir="rtl"
              role="dialog"
              aria-modal="true"
              aria-label="القائمة الرئيسية"
              initial={reducedMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[210] flex w-[min(400px,92vw)] flex-col overflow-hidden bg-[#F8FCFF] text-[#032654] shadow-[-20px_0_70px_rgba(0,0,0,0.18)]"
              style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[#DDEAF4] px-6 py-6">
                <div>
                  <p className="text-lg font-bold">عيادات د. رأفت ماجد</p>
                  <p className="mt-1 text-xs font-semibold text-[#5684A1]">استكشف أقسام الموقع</p>
                </div>
                <button
                  ref={drawerCloseRef}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  aria-label="إغلاق القائمة"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8E9F5] bg-white transition-colors hover:bg-[#EAF5FD] focus-visible:outline-2 focus-visible:outline-[#6BBAEF]"
                >
                  <X size={21} aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="أقسام العيادة" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="group flex min-h-[56px] items-center gap-4 rounded-2xl px-3 py-3 text-[#032654] transition-colors hover:bg-[#EAF5FD] focus-visible:bg-[#EAF5FD] focus-visible:outline-none"
                  >
                    <p className="w-6 shrink-0 text-xs font-semibold tabular-nums text-[#398FC5]">{item.number}</p>
                    <p className="flex-1 text-[15px] font-semibold leading-6">{item.label}</p>
                    <ChevronLeft size={17} className="text-[#72AED4] transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  </a>
                ))}
              </nav>

              <div className="shrink-0 border-t border-[#DDEAF4] p-5">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    requestCallback();
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#032654] px-5 text-sm font-bold text-white transition-colors hover:bg-[#073D6E]"
                >
                  احجز موعدك
                  <ArrowUpLeft size={17} aria-hidden="true" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div
        ref={floatingRef}
        dir="rtl"
        className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-4 z-[190] sm:bottom-6 sm:left-6"
        style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
      >
        <AnimatePresence>
          {floatingOpen && (
            <motion.div
              id="clinic-quick-contact"
              initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 9, scale: 0.95 }}
              transition={{ duration: reducedMotion ? 0 : 0.19 }}
              className="absolute bottom-[calc(100%+10px)] left-0 w-[220px] rounded-[19px] border border-[#DDEAF4] bg-[#F8FCFF] p-2 shadow-[0_16px_48px_rgba(3,38,84,0.18)]"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setFloatingOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-bold text-[#032654] transition-colors hover:bg-[#EAF5FD] focus-visible:outline-[#0C568C]">
                <MessageCircle size={19} className="text-[#238765]" aria-hidden="true" />
                راسلنا واتساب
              </a>
              <a href={`tel:${CONTACT_PHONE}`} onClick={() => setFloatingOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-bold text-[#032654] transition-colors hover:bg-[#EAF5FD] focus-visible:outline-[#0C568C]">
                <PhoneCall size={19} className="text-[#0C568C]" aria-hidden="true" />
                اتصل الآن
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          aria-label={floatingOpen ? "إغلاق خيارات التواصل" : "فتح خيارات التواصل السريع"}
          aria-expanded={floatingOpen}
          aria-controls="clinic-quick-contact"
          onClick={() => {
            setFloatingOpen((current) => !current);
            setBookingOpen(false);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#032654] text-white shadow-[0_10px_28px_rgba(3,38,84,0.27)] transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0C568C] sm:h-[52px] sm:w-[52px]"
        >
          {floatingOpen ? <X size={21} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}
