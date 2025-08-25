import Sidebar from "@/components/dashboard-sidebar/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Mochammad Fahmi | Fullstack Developer & Graphic Designer",
  description:
    "Dashboard showcasing an overview of projects, web development works, and graphic design portfolio by Mochammad Fahmi.",
  keywords: [
    "Dashboard",
    "Portfolio Overview",
    "Fullstack Web Developer",
    "Graphic Designer",
    "Web Development Statistics",
    "UI/UX Projects",
  ],
  openGraph: {
    title:
      "Dashboard – Mochammad Fahmi | Fullstack Developer & Graphic Designer",
    description:
      "Overview of all projects and designs by Mochammad Fahmi. Explore my work in fullstack web development and graphic design.",
    url: "http://localhost:3000/dashboard",
    siteName: "Mochammad Fahmi Portfolio",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Dashboard Overview of Projects",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="text-darkBlue dark:via-midnightIndigo dark:to-electricViolet dark:bg-midnightBlue min-h-screen w-full overflow-auto bg-white dark:bg-gradient-to-tr">
        {children}
      </main>
    </div>
  );
}
