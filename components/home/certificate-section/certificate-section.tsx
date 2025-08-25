import CertificateGrid from "./certificate-grid";
import CertificateHeading from "./certificate-heading";

const CertificateSection = () => {
  return (
    <section id="certificate" className="pt-24 pb-28">
      <div className="container mx-auto px-[3%]">
        {/* Header */}
        <CertificateHeading />

        {/* certificate */}
        <CertificateGrid />
      </div>
    </section>
  );
};

export default CertificateSection;
