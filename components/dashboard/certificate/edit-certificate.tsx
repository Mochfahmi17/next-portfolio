import { apiBaseUrl } from "@/lib/api";
import EditCertificateForm from "./edit-certificate-form";
import { use } from "react";
import { Cerificates, CertificateDetailResponse } from "@/types";
import { notFound } from "next/navigation";

type EditCertificateProps = {
  id: string;
};

const fetchingDetailCertificate = async (id: string) => {
  const res = await fetch(`${apiBaseUrl}/certificates/${id}`, {
    method: "GET",
  });

  const data: CertificateDetailResponse = await res.json();

  if (!res.ok) {
    return notFound();
  }

  const certificate: Cerificates = data.data;

  return certificate;
};

const EditCertificate = ({ id }: EditCertificateProps) => {
  const certificate = use(fetchingDetailCertificate(id));

  console.log(certificate);
  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-semibold dark:text-white">
        Edit Certificate
      </h2>
      <EditCertificateForm certificateId={id} initialData={certificate} />
    </div>
  );
};

export default EditCertificate;
