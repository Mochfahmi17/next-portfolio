"use client";
import Popup from "@/components/popup/popup";
import { Button } from "@/components/ui/button";
import { apiBaseUrl } from "@/lib/api";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import CertificatePreviewImage from "./certificate-preview-image";

type CertificateItemProps = {
  certificateId: string;
  title: string;
  image: string;
  isRouteDashboard: boolean;
  mutate: () => void;
};

const CertificateItem = ({
  certificateId,
  title,
  image,
  isRouteDashboard,
  mutate,
}: CertificateItemProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteCertificate = () => {
    startTransition(async () => {
      try {
        const res = await fetch(
          `${apiBaseUrl}/certificates/delete/${certificateId}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        setShowConfirm(false);
        mutate();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <>
      <div className="group relative h-56 cursor-pointer overflow-hidden rounded border border-gray-300 bg-gray-200 shadow-sm">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          onClick={() => setPreviewImage(image)}
          className="rounded object-cover object-center shadow-md"
        />
        {isRouteDashboard && (
          <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <Link href={`certificate/edit/${certificateId}`}>
                <SquarePen />
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setShowConfirm(true)}
              className="h-8 w-8 cursor-pointer"
            >
              <Trash2 />
            </Button>
          </div>
        )}
        <div className="absolute bottom-0 flex h-28 w-full items-center justify-center bg-gradient-to-t from-black/90 to-transparent opacity-0 transition-all group-hover:opacity-100">
          <p className="text-center font-medium text-white">{title}</p>
        </div>
      </div>

      {previewImage && (
        <CertificatePreviewImage
          image={previewImage}
          alt={title}
          closePreview={setPreviewImage}
        />
      )}

      {showConfirm && (
        <Popup
          title="Are you sure want to delete this certificate?"
          closePopup={setShowConfirm}
        >
          <Button
            size="lg"
            variant="destructive"
            onClick={() => setShowConfirm(false)}
            disabled={isPending}
            className="mt-auto cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDeleteCertificate}
            disabled={isPending}
            className="mt-auto cursor-pointer"
          >
            Delete
          </Button>
        </Popup>
      )}
    </>
  );
};

export default CertificateItem;
