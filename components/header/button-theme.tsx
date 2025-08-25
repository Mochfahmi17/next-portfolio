"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ButtonTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-darkBlue hover:bg-darkBlue/90 dark:text-electricViolet dark:hover:text-darkBlue cursor-pointer rounded-full text-white hover:text-white dark:bg-white dark:hover:bg-white/90"
    >
      <Sun className="dark:animate-popIn hidden dark:inline-block" />
      <Moon className="animate-popIn inline-block dark:hidden" />
    </Button>
  );
};

export default ButtonTheme;
