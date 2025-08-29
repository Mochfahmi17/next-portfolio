"use client";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { CiLogout } from "react-icons/ci";
import Popup from "../popup/popup";
import { apiBaseUrl } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        router.push("/");
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan");
      }
    });
  };
  return (
    <>
      <Button
        size="lg"
        variant="destructive"
        onClick={() => setShowConfirm(true)}
        className="mt-auto w-full cursor-pointer justify-start rounded-none md:justify-center"
      >
        <CiLogout size={16} /> Logout
      </Button>

      {showConfirm && (
        <Popup
          title="Are you sure you want to logout?"
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
            onClick={handleLogout}
            disabled={isPending}
            className="mt-auto cursor-pointer"
          >
            Logout
          </Button>
        </Popup>
      )}
    </>
  );
};

export default LogoutButton;
