"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const routeIsdashboard = pathname.startsWith("/dashboard");
  const routeIsLogin = pathname.includes("/login");

  if (!(routeIsdashboard || routeIsLogin)) return <Navbar />;
};

export default NavbarWrapper;
