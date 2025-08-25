import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";

type PopupType = {
  title: string;
  closePopup: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Popup = ({ title, closePopup, children }: PopupType) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Lock scroll
  useEffect(() => {
    // Simpan style asli
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Disable scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Balikin style ke semula
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        closePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopup]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[3%]">
      <Card ref={cardRef} className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-sm font-semibold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full justify-between">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default Popup;
