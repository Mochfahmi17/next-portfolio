"use client";
import SidebarMenuItems from "./sidebar-menu-items";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden"
      >
        <Menu className="size-6" />
      </Button>

      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}

      <aside
        className={clsx(
          "text-darkBlue fixed top-0 left-0 z-50 h-screen w-3/5 transform flex-col bg-slate-50 shadow-md transition-transform duration-300 lg:relative lg:flex lg:w-72 lg:translate-x-0 dark:bg-slate-800",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          },
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between p-4">
          <h2 className="text-xl font-bold dark:text-white">Dashboard</h2>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X className="size-6" />
          </Button>
        </div>

        {/* Menu */}
        <div>
          <p className="mb-1 px-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            Menu
          </p>
          <SidebarMenuItems onClose={setIsOpen} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
