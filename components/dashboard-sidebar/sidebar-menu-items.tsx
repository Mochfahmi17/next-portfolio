"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCode, FaTrophy, FaUser } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";

type SidebarMenuItemsProps = {
  onClose: (value: boolean) => void;
};

const menuItems = [
  {
    icon: <FaCode size={16} />,
    label: "Projects",
    href: "/dashboard/projects",
  },
  {
    icon: <IoBarChartSharp size={16} />,
    label: "Skills",
    href: "/dashboard/skills",
  },
  {
    icon: <FaTrophy size={16} />,
    label: "Certificate",
    href: "/dashboard/certificate",
  },
  {
    icon: <FaUser size={16} />,
    label: "Profile",
    href: "/dashboard/profile",
  },
];

const SidebarMenuItems = ({ onClose }: SidebarMenuItemsProps) => {
  const pathname = usePathname();
  return (
    <nav className="flex-1">
      <ul className="text-sm">
        {menuItems.map((menu, i) => {
          const isActive = pathname.startsWith(menu.href);

          return (
            <li key={i}>
              <Link
                href={menu.href}
                className={clsx(
                  "dark:hover:text-electricViolet flex items-center gap-2 px-4 py-3 hover:bg-slate-200 hover:text-blue-600",
                  {
                    "dark:text-electricViolet bg-slate-200 font-medium text-blue-600":
                      isActive,
                    "dark:text-white": !isActive,
                  },
                )}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onClose(false)}
              >
                {menu.icon}
                {menu.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarMenuItems;
