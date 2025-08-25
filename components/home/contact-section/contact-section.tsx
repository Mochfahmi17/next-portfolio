import ContactInfoList from "./contact-info-list";
import ContactCard from "./contact-card";
import ContactHeading from "./contact-heading";

const ContactSection = () => {
  return (
    <section id="contact" className="pt-24 pb-28">
      <div className="container mx-auto px-[3%]">
        {/* Header */}
        <ContactHeading />

        {/* contact */}
        <div className="mt-18 grid items-center gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <ContactInfoList />

          {/* Contact Form */}
          <ContactCard />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
