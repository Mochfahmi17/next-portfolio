import AboutHeading from "./about-heading";
import AboutImage from "./about-image";
import AboutDescription from "./about-description";

const AboutSection = () => {
  return (
    <section id="about" className="pt-24 pb-28">
      <div className="container mx-auto px-[3%]">
        {/* Heading */}
        <AboutHeading />

        <div className="items- mt-32 grid justify-center gap-20 lg:grid-cols-12 lg:gap-0">
          {/* Image Profile */}
          <AboutImage />

          {/* About me (Description) */}
          <AboutDescription />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
