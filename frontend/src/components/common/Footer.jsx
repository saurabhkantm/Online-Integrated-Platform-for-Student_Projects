import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const socials = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: FaGithub, href: "#" },
];

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Browse Projects", to: "/browse" },
      { label: "Colleges", to: "/colleges" },
      { label: "Categories", to: "/categories" },
      { label: "How It Works", to: "/#how-it-works" },
      { label: "About Us", to: "/about" },
    ],
  },
  {
    title: "For Users",
    links: [
      { label: "Login", to: "/login/student" },
      { label: "Register", to: "/register" },
      { label: "Upload Project", to: "/student/submit" },
      { label: "My Dashboard", to: "/student/dashboard" },
      { label: "Bookmarks", to: "/student/bookmarks" },
    ],
  },
  {
    title: "For Institutions",
    links: [
      { label: "Faculty Login", to: "/login/faculty" },
      { label: "Verify Projects", to: "/faculty/review" },
      { label: "Institution Dashboard", to: "/admin/dashboard" },
      { label: "Guidelines", to: "/guidelines" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "FAQ", to: "/#faq" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];


const Footer = () => {
  return (
    <footer className="bg-[#1B2340] text-[#F7F5F0] px-8 md:px-14 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#2A335A]">
        {/* Brand column */}
        <div className="md:col-span-1">
          <span className="font-serif text-lg tracking-tight">EduArchive</span>
          <p className="text-sm text-[#9CA3AF] mt-3 leading-relaxed">
            A unified platform for academic projects, collaboration, learning
            and innovation.
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A335A] hover:bg-[#F0A868] hover:text-[#1B2340] transition"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold mb-4">{group.title}</p>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#9CA3AF] hover:text-[#F0A868] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-[#6B7280] pt-6">
        © 2026 EduArchive. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;