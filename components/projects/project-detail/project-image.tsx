import Image from "next/image";

type ProjectImageProps = {
  imageUrl: string;
  alt: string;
};

const ProjectImage = ({ imageUrl, alt }: ProjectImageProps) => {
  return (
    <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-md md:h-[450px] lg:col-span-2">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export default ProjectImage;
