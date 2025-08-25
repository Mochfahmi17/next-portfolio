import AllProjectView from "@/components/projects/all-projects-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Projects - Mochammad Fahmi | Fullstack Web Developer & Graphic Designer",
  description:
    "Explore all projects by Mochammad Fahmi, a fullstack web developer and graphic designer. Featuring web applications, UI/UX design, and creative graphic works.",
  keywords: [
    "Web Development Projects",
    "Graphic Design Portfolio",
    "Fullstack Developer Projects",
    "UI/UX Case Studies",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Branding Design",
  ],
  openGraph: {
    title:
      "Projects - Mochammad Fahmi | Fullstack Developer & Graphic Designer",
    description:
      "A showcase of web development and graphic design projects by Mochammad Fahmi.",
    url: "http://localhost:3000/projects",
    siteName: "All Projects Portfolio",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "All Projects Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <AllProjectView />;
}
