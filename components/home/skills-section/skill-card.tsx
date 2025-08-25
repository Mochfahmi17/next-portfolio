"use client";
import Popup from "@/components/popup/popup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiBaseUrl } from "@/lib/api";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type SkillCardProps = {
  id: string;
  icon: string;
  name: string;
  level: string;
  percent: number;
  mutate: () => void;
};

const SkillCard = ({
  id,
  icon,
  name,
  level,
  percent,
  mutate,
}: SkillCardProps) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const isRouteDashboard = pathname.startsWith("/dashboard");

  const handleDeleteSkill = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/skills/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

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
      <Card className="dark:bg-midnightBlue">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2.5">
              <Image
                src={icon}
                alt={name}
                width={30}
                height={30}
                className="object-cover"
              />
              <h3 title={name} className="line-clamp-1 text-lg">
                {name}
              </h3>
            </div>
            {isRouteDashboard && (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-6 w-6 cursor-pointer"
                >
                  <Link href={`skills/edit/${id}`}>
                    <SquarePen />
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setShowConfirm(true)}
                  className="h-6 w-6 cursor-pointer"
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-darkBlue text-sm font-medium dark:text-slate-300">
            {level}
          </p>
          <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
            <div
              style={{ width: `${percent}%` }}
              className="bg-darkBlue dark:shadow-neon dark:bg-electricViolet flex h-full items-center justify-end rounded-full px-1"
            >
              <span className="text-[8px] text-white">{percent}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {showConfirm && (
        <Popup
          title="Are you sure want to delete this skill?"
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
            onClick={handleDeleteSkill}
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

export default SkillCard;
