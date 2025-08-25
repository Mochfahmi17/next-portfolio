"use client";
import { usePathname } from "next/navigation";
import CertificateItem from "./certificate-item";
import clsx from "clsx";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { apiBaseUrl } from "@/lib/api";
import { CertificateResponse } from "@/types";
import CertificateCardSkeleton from "@/components/certificate-card-skeleton";
import { easeOut, motion, stagger, Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.6),
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: -60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const CertificateGrid = () => {
  const pathname = usePathname();

  const routeIsDashboard = pathname.startsWith("/dashboard");

  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<CertificateResponse>(`${apiBaseUrl}/certificates`, fetcher);

  const certificates = response?.data ?? [];
  return (
    <motion.div
      variants={container}
      initial="hidden"
      {...(pathname === "/"
        ? { whileInView: "show", viewport: { once: true, amount: 0.2 } }
        : { animate: "show" })}
      className={clsx(
        "grid place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3",
        {
          "mt-8": routeIsDashboard,
          "mt-18": !routeIsDashboard,
        },
      )}
    >
      {isLoading ? (
        <CertificateCardSkeleton column={6} />
      ) : certificates.length > 0 ? (
        certificates.map((certificate) => (
          <motion.div key={certificate.id} variants={item} className="h-full">
            <CertificateItem
              certificateId={certificate.id}
              title={certificate.title}
              image={certificate.certificateUrl}
              isRouteDashboard={routeIsDashboard}
              mutate={mutate}
            />
          </motion.div>
        ))
      ) : (
        <p className="col-span-full text-center text-slate-600">
          Certificate not found!
        </p>
      )}
    </motion.div>
  );
};

export default CertificateGrid;
