import clsx from "clsx";
import { CodeXml, LucideIcon } from "lucide-react";
import Link from "next/link";
import ButtonTheme from "./button-theme";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

type SidebarMenuMobileProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuItem: { icon: LucideIcon; label: string; href: string }[];
};

const SidebarMenuMobile = ({
  isOpen,
  setIsOpen,
  menuItem,
}: SidebarMenuMobileProps) => {
  const { isLoggedIn } = useAuth();
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50 h-screen w-64 transform flex-col bg-white py-6 shadow-md transition-transform duration-300 ease-in-out md:w-96 dark:bg-slate-800",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        },
      )}
    >
      <div>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between px-4">
          <Link href="/">
            <h1 className="flex items-center gap-2 text-xl font-semibold md:text-2xl dark:text-white">
              <CodeXml size={24} /> Fahmi
            </h1>
          </Link>
          <ButtonTheme />
        </div>

        {/* Menu Item */}
        <nav className="lg:hidden">
          <ul>
            {menuItem.map((item, i) => (
              <li key={i} onClick={() => setIsOpen(false)}>
                <Link
                  href={item.href}
                  className="hover:bg-darkBlue active:bg-darkBlue dark:hover:text-electricViolet flex items-center gap-2 px-4 py-3 hover:text-white active:text-white dark:text-white dark:hover:bg-white"
                >
                  <item.icon size={16} /> {item.label}
                </Link>
              </li>
            ))}
            {isLoggedIn && (
              <li onClick={() => setIsOpen(false)}>
                <Button
                  size="lg"
                  className="bg-darkBlue hover:bg-darkBlue/90 dark:text-electricViolet w-full cursor-pointer justify-start rounded-none text-base dark:bg-white"
                  asChild
                >
                  <Link href="/dashboard/projects">Dashboard</Link>
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarMenuMobile;
