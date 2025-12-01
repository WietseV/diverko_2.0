"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { Language } from "@/lib/language";
import type { NavItem } from "@/lib/navigation";

type NavBarClientProps = {
  items: NavItem[];
  currentLang: Language;
};

export default function NavBarClient({ items }: NavBarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navClass = (href: string, index: number) =>
    [
      "relative inline-flex items-center gap-1 text-xs font-semibold tracking-[0.26em] uppercase transition-colors",
      "before:absolute before:top-1/2 before:h-[1px] before:w-4 before:-translate-y-1/2 before:left-[-16px] before:content-[''] md:before:left-[-32px] md:before:w-8 lg:before:left-[-48px] lg:before:w-12",
      index === 0 ? "before:block" : "before:hidden",
      pathname === href ? "text-secondary" : "text-primary_light/80 hover:text-primary_light",
    ].join(" ");

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenItem(null), 120);
  };

  return (
    <header className="sticky top-0 z-40 bg-primary_dark bg-opacity-60 text-primary_light backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div />
        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item, index) =>
            item.children && item.children.length > 0 ? (
              <div
                key={`${item.href}-${index}`}
                className="relative"
                onMouseEnter={() => {
                  clearCloseTimer();
                  setOpenItem(item.href);
                }}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  className={`${navClass(item.href, index)} focus-visible:outline-none`}
                  onFocus={() => {
                    clearCloseTimer();
                    setOpenItem(item.href);
                  }}
                >
                  {item.label}
                  <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
                </Link>
                {openItem === item.href && (
                  <div
                    className="absolute left-1/2 top-full mt-3 min-w-[200px] -translate-x-1/2 rounded-2xl border border-primary_light/10 bg-primary_dark/80 p-4 shadow-2xl backdrop-blur"
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="flex flex-col gap-3">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={`${child.href}-${childIndex}`}
                          className="text-sm font-medium text-primary_light/80 transition hover:text-primary_light"
                          href={child.href}
                          onClick={() => setOpenItem(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={`${item.href}-${index}`} className={navClass(item.href, index)} href={item.href}>
                {item.label}
              </Link>
            )
          )}
        </nav>
        <button
          className="md:hidden rounded-full p-2"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon style={{ fontSize: "24px" }} icon={isOpen ? faXmark : faBars} />
        </button>
      </div>
      {isOpen && (
        <div className="fixed block h-[fit-content] inset-0 z-30 flex-col bg-primary_dark/95 px-6 py-4 md:hidden">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.4em] text-primary_light/60">Menu</p>
            <button
              className="rounded-full p-2"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <FontAwesomeIcon style={{ fontSize: "24px" }} icon={faXmark} />
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {items.map((item, index) => (
              <div key={`${item.href}-${index}`} className="flex flex-col gap-3">
                <Link className={navClass(item.href, index)} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="ml-4 flex flex-col gap-2">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={`${child.href}-${childIndex}`}
                        className="text-sm font-medium text-primary_light/80 transition hover:text-primary_light"
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
