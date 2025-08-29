import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavbarWrapper from "@/components/header/navbar-wrapper";
import FooterWrapper from "@/components/footer/footer-wrapper";
import { Toaster } from "sonner";
import { ProjectFilterProvider } from "@/context/projects-filter-context";
import { Suspense } from "react";
import LoaderCircle from "@/components/loader-circle";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mochammad Fahmi - Fullstack Web Developer & Graphic Designer",
  description:
    "Portfolio of Mochammad Fahmi, a fullstack web developer and graphic designer passionate about creating scalable web applications, modern UI/UX, and impactful visual designs.",
  keywords: [
    "Fullstack Web Developer",
    "Graphic Designer",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "Laravel",
    "UI/UX",
    "Web Development",
    "Creative design",
  ],
  authors: [{ name: "Mochammad Fahmi" }],
  openGraph: {
    title: "Mochammad Fahmi – Fullstack Web Developer & Graphic Designer",
    description:
      "Explore my portfolio showcasing projects in web development and graphic design, combining technology and creativity.",
    url: "http://localhost:3000/",
    siteName: "Mochammad Fahmi Portfolio",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Portfolio preview of Mochammad Fahmi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="h-8 w-8">
                <LoaderCircle />
              </div>
            </div>
          }
        >
          <ProjectFilterProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavbarWrapper />
              {children}
              <FooterWrapper />
              <Toaster expand={true} />
            </ThemeProvider>
          </ProjectFilterProvider>
        </Suspense>
      </body>
    </html>
  );
}
