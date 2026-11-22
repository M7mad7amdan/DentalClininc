
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ComponentType, MouseEvent } from "react";

interface NavItem {
  name: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

interface CircularNavigationProps {
  navItems: NavItem[];
  isOpen: boolean;
  closeMenu: () => void;
}

export default function CircularNavigation({
  navItems,
  isOpen,
  closeMenu,
}: CircularNavigationProps) {
  const [radius, setRadius] = useState(155);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 118 : 155);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    closeMenu();

    document.querySelector(href)?.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "instant"
        : "smooth",
    });

    window.history.replaceState(null, "", href);
  };

  return (
    <AnimatePresence>
      {isOpen &&
        navItems.map((item, index) => {
          const Icon = item.icon;

          const angle =
            Math.PI / 2 +
            (Math.PI * index) / (navItems.length - 1);

          const x =
            -Math.sin(angle - Math.PI / 2) * radius;

          const y =
            Math.cos(angle - Math.PI / 2) * radius;

          return (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(event) =>
                handleNavigation(event, item.href)
              }
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x,
                y,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.045,
              }}
              whileHover={{
                scale: 1.12,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="absolute left-1/2 top-1/2 z-10 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-[#6BBAEF]/30 bg-[#032654] text-center text-white shadow-[0_12px_30px_rgba(3,38,84,0.22)] backdrop-blur-md transition-colors duration-300 hover:border-[#6BBAEF] hover:bg-[#6BBAEF] hover:text-[#032654] hover:shadow-[0_16px_35px_rgba(3,38,84,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6BBAEF] sm:h-[82px] sm:w-[82px]"
              aria-label={item.name}
            >
              <Icon className="mb-1 h-5 w-5 shrink-0 sm:h-6 sm:w-6" />

              <p className="max-w-[72px] text-center text-[11px] font-semibold leading-tight sm:text-xs">
                {item.name}
              </p>
            </motion.a>
          );
        })}
    </AnimatePresence>
  );
}
