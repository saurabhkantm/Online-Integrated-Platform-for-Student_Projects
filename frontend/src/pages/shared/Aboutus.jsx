import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import brushSwoosh from "../../assets/brush.svg";
import { Target, Users, ShieldCheck, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To give every student project a permanent, discoverable home — so good work doesn't disappear after a semester ends.",
  },
  {
    icon: ShieldCheck,
    title: "Academic Integrity",
    desc: "Every submission goes through faculty review and plagiarism checks, keeping the archive trustworthy for everyone who relies on it.",
  },
  {
    icon: Users,
    title: "Built for Collaboration",
    desc: "Students learn from work across other colleges, not just their own — breaking down the walls between institutions.",
  },
  {
    icon: Globe,
    title: "Open to Every Campus",
    desc: "Any college can join. The more institutions that participate, the more valuable the shared archive becomes for all of them.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1B2340]">
      <Navbar />

      {/* Hero */}
      <section className="pt-34 px-8 md:px-14 pb-16 text-center max-w-2xl mx-auto">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          About EduArchive
        </span>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
          Every student project,
          <br />
          one shared record.
        </h1>
        <img src={brushSwoosh} alt="" aria-hidden="true" className="w-32 mx-auto mt-2 mb-4" />
        <p className="text-[#4A5568] leading-relaxed">
          EduArchive started from a simple observation: thousands of strong
          student projects get built every year, presented once, and then
          forgotten. We built a place for that work to live on — reviewed,
          searchable, and open to students across every college.
        </p>
      </section>

      {/* Story */}
      <section className="px-8 md:px-14 pb-24 max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl mb-4">Why we built this</h2>
        <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
          Most final-year projects, hackathon builds, and research prototypes
          exist only on a student's laptop or a professor's inbox. There's no
          shared place to submit them, get them properly reviewed, or let
          other students discover and learn from them — regardless of which
          college they're in.
        </p>
        <p className="text-sm text-[#4A5568] leading-relaxed">
          EduArchive is that shared place: a submission and review pipeline
          for students, a lightweight approval workflow for faculty, and a
          searchable, cross-college archive for everyone else.
        </p>
      </section>

      {/* Values grid */}
      <section className="px-8 md:px-14 pb-24">
        <h2 className="font-serif text-2xl text-center mb-10">What we care about</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/10 mb-4">
                  <Icon size={20} className="text-[#1B2340]" />
                </div>
                <p className="font-serif text-lg mb-2">{item.title}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-14 pb-24 text-center">
        <h2 className="font-serif text-2xl mb-4">Want your college involved?</h2>
        <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-6">
          Reach out and we'll help your students and faculty get started.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] hover:scale-105 transition-all duration-300"
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;