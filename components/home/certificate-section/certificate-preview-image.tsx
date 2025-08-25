"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

type CertificatePreviewImageProps = {
  image: string;
  alt: string;
  closePreview: (value: string | null) => void;
};

const CertificatePreviewImage = ({
  image,
  alt,
  closePreview,
}: CertificatePreviewImageProps) => {
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs">
      <div className="relative h-full w-full">
        <Image src={image} alt={alt} fill className="object-contain" />
        <Button
          size="icon"
          onClick={() => closePreview(null)}
          className="absolute top-0 right-0 cursor-pointer rounded-none bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
        >
          <X className="size-6 font-bold" />
        </Button>
      </div>
    </div>
  );
};

export default CertificatePreviewImage;
