"use client";
import Link from "next/link";
import NavbarMenu from "./navbar-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SidebarMenuMobile from "./sidebar-menu-mobile";
import {
  Trophy,
  ChartColumnBig,
  House,
  Info,
  Mail,
  CodeXml,
  Menu,
  X,
} from "lucide-react";
import { FaCode } from "react-icons/fa";
import ButtonTheme from "./button-theme";
import clsx from "clsx";
import { easeOut, motion } from "motion/react";
import { useAuth } from "@/hooks/useAuth";

const menuItem = [
  {
    icon: House,
    label: "Home",
    href: "#home",
  },
  {
    icon: Info,
    label: "About",
    href: "#about",
  },
  {
    icon: CodeXml,
    label: "Projects",
    href: "#projects",
  },
  {
    icon: Trophy,
    label: "Certificate",
    href: "#certificate",
  },
  {
    icon: ChartColumnBig,
    label: "Skills",
    href: "#skills",
  },
  {
    icon: Mail,
    label: "Contact",
    href: "#contact",
  },
];

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScroll(true);
        setIsOpen(false);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOut }}
      className={clsx(
        "text-darkBlue fixed top-0 right-0 left-0 z-30 flex items-center justify-between px-[3%] py-4 transition-all dark:text-white",
        {
          "bg-white py-5 shadow dark:bg-black/50 dark:backdrop-blur-md": scroll,
        },
      )}
    >
      {/* Header */}
      <Link href="/">
        <h1 className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
          <span>
            <FaCode />
          </span>{" "}
          Fahmi
        </h1>
      </Link>

      {/* Hamburger menu */}
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleSidebar}
        className="lg:hidden"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </Button>

      {/* Desktop menu */}
      <NavbarMenu
        menuItem={menuItem}
        activeMenu={activeSection}
        setActiveMenu={setActiveSection}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 h-screen w-screen bg-black/50"
        ></div>
      )}

      {/* Mobile menu */}
      <SidebarMenuMobile
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItem={menuItem}
      />

      {/* Darkmode button */}
      <div className="hidden items-center gap-2 lg:flex">
        {isLoggedIn && (
          <Button
            className="bg-darkBlue hover:bg-darkBlue/90 dark:text-electricViolet cursor-pointer dark:bg-white"
            asChild
          >
            <Link href="/dashboard/projects">Dashboard</Link>
          </Button>
        )}
        <ButtonTheme />
      </div>
    </motion.header>
  );
};

export default Navbar;
