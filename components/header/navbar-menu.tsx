"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type NavbarMenuProps = {
  menuItem: { icon: LucideIcon; label: string; href: string }[];
  activeMenu: string;
  setActiveMenu: (id: string) => void;
};

const NavbarMenu = ({
  menuItem,
  activeMenu,
  setActiveMenu,
}: NavbarMenuProps) => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") {
      setActiveMenu("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMenu(entry.target.id);
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements: Element[] = [];
    console.log(elements);

    menuItem.forEach((menu) => {
      const el = document.getElementById(menu.href.slice(1));
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    console.log({ observer });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [menuItem, setActiveMenu, pathname]);
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-4 text-sm font-medium">
        {menuItem.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              className={clsx(
                "hover:bg-darkBlue dark:hover:text-electricViolet flex items-center gap-2 rounded px-4 py-2 transition-colors hover:text-white dark:hover:bg-white",
                {
                  "bg-darkBlue dark:text-electricViolet text-white dark:bg-white":
                    activeMenu === item.href.slice(1),
                },
              )}
            >
              <item.icon size={16} /> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarMenu;
