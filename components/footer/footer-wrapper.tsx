"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const FooterWrapper = () => {
  const pathname = usePathname();
  const routeIsdashboard = pathname.startsWith("/dashboard");
  const routeIsLogin = pathname.includes("/login");

  if (!(routeIsdashboard || routeIsLogin)) return <Footer />;
};

export default FooterWrapper;
