import Link from "next/link";
import {
  FaCode,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const menuItem = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const socials = [
  {
    href: "https://github.com/Mochfahmi17",
    icon: <FaGithub size={16} />,
    label: "Github",
  },
  {
    href: "https://www.linkedin.com/in/mochammad-fahmi-kurnia-sandi-ba39b2227/",
    icon: <FaLinkedin size={16} />,
    label: "LinkedIn",
  },
  {
    href: "https://instagram.com/fahmi_art17",
    icon: <FaInstagram size={16} />,
    label: "Instagram",
  },
  {
    href: "https://web.facebook.com/ppi.fahmi/",
    icon: <FaFacebook size={16} />,
    label: "Facebook",
  },
];

const Footer = () => {
  return (
    <footer className="bg-darkBlue dark:bg-midnightBlue px-[3%] text-white">
      <div className="grid gap-8 pt-8 pb-18 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <FaCode /> Mochammad Fahmi
              </h2>
            </Link>
            <div className="space-y-2">
              <p className="text-sm text-slate-300">
                Every project I work on is an opportunity to learn, grow, and
                deliver real value. With a passion for both code and visuals, I
                aim to create digital experiences that not only work but also
                feel intuitive and inspiring. I believe in thoughtful design,
                clean code, and meaningful collaboration to turn ideas into
                products people love.
              </p>
              <p className="text-sm text-slate-300">
                Thanks for being here your time and attention truly mean a lot.
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {menuItem.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="w-fit hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Find me Online</h3>
            <p className="text-sm text-slate-300">
              Whether it&apos;s code, design, or conversation you can find me on
              the platforms below.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-slate-300">
            {socials.map((item, i) => (
              <li key={i} className="text-sm">
                <Link
                  target="_blank"
                  href={item.href}
                  className="flex w-fit items-center gap-2 hover:text-white"
                >
                  {item.icon}
                  <p>{item.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-300 py-4">
        <p className="text-center text-sm text-slate-300">
          &copy;{new Date().getFullYear()} Mochammad Fahmi. Build with Next.js &
          Express.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
