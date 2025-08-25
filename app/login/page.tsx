import Login from "@/components/login/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – Mochammad Fahmi Portfolio",
  description: "Login to access the dashboard and manage projects.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return <Login />;
}
