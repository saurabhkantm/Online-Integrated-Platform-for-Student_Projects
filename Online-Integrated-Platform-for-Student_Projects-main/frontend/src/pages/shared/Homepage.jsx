import { Link } from "react-router-dom";
import campusHero from "../../assets/campus-hero.svg";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import brushSwoosh from "../../assets/brush.svg";
import PopularCategories from "../../components/common/showProject";
import { statsData } from "../../utils/statsData";
import { keyFeaturesData } from "../../utils/keyFeature";
import { reviewsData } from "../../utils/Reviewsdata";
import {
  Upload,
  FileCheck,
  Database,
  Users,
  Archive
} from "lucide-react";
import FAQSection from "./faqSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1B2340] overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-34 px-8 md:px-14 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Floating background accents */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F0A868]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-0 w-56 h-56 bg-[#1B2340]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative">
          <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold animate-fade-in-up">
            For students, faculty & institutions
          </span>

          <p
            className="mt-2 inline-block bg-[#1B2340]/10 text-[#1B2340] px-4 py-2 rounded-full text-sm animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Submit, review, discover — EduArchive keeps every project on record.
          </p>

          <h1
            className="mt-2 font-serif text-4xl md:text-5xl leading-tight animate-fade-in-up font-semibold"
            style={{ animationDelay: "0.2s" }}
          >
            Every student project,
            <br />
            one shared record.
          </h1>

          <p
            className="mt-4 text-[#4A5568] text-base leading-relaxed max-w-xl animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Submit your work, get faculty review, and browse projects across
            colleges — all in one platform built for academic collaboration.
          </p>
          <PopularCategories />

          <div
            className="mt-8 flex gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/browse-project"
              className="px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Browse Projects
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg border border-[#1B2340] text-[#1B2340] text-sm font-medium hover:bg-white hover:scale-105 hover:shadow-md transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden animate-fade-in-up hover:scale-[1.02] transition-transform duration-500"
          style={{ animationDelay: "0.2s" }}
        >
          <img
            src={campusHero}
            alt="Illustration of campus buildings and a stack of academic documents"
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="px-8 md:px-14 pb-14 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm border-[#F0A868]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full `}
                >
                  <Icon className={`h-6 w-6 text-[#F0A868]`} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="pt-8 md:px-14 pb-8">
        <section className="px-8 md:px-14 pb-21">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl mb-1 font-bold">How it works</h2>
            <p className="text-[16px] text-[#6B7280] max-w-md mx-auto">
              From submission to publication, in just Four steps.
            </p>
            <img src={brushSwoosh} alt="" aria-hidden="true" className="w-32 mx-auto -mt-1 mb-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-4">
            {[
              {
                step: "1",
                title: "Upload Project",
                desc: "Students upload their project reports and details.",
                icon: Upload,
              },
              {
                step: "2",
                title: "Review & Verify",
                desc: "Faculty reviews and approves the project.",
                icon: FileCheck,
              },
              {
                step: "3",
                title: "Store & Index",
                desc: "Projects are indexed with AI plagiarism check.",
                icon: Database,
              },
              {
                step: "4",
                title: "Share & Learn",
                desc: "Students can search, explore and learn from projects.",
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-[#F0A868] tracking-wide rounded-2xl px-3 py-1 bg-[#F0A868]/10">
                    {item.step}
                  </span>

                  <div className="flex justify-center mt-3 mb-3">
                    <Icon className="h-8 w-8 text-[#F0A868]" />
                  </div>

                  <p className="font-serif text-lg mb-2 text-center">
                    {item.title}
                  </p>

                  <p className="text-sm text-[#6B7280] leading-relaxed text-center">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      </section>

      {/* key features  */}
      <section className="px-8 md:px-14 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl mb-1 font-bold">What Students & Faculty Say</h2>
          <p className="text-[16px] text-[#6B7280] max-w-md mx-auto">
            Real feedback from the people using EduArchive every day.
          </p>
          <img src={brushSwoosh} alt="" aria-hidden="true" className="w-32 mx-auto -mt-1 mb-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {reviewsData.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl font-serif text-[#F0A868] leading-none">"</span>

              <p className="text-sm text-[#4A5568] leading-relaxed -mt-3 mb-5">
                {item.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B2340] flex items-center justify-center text-sm font-semibold text-[#F7F5F0]">
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1B2340]">{item.name}</p>
                  <p className="text-xs text-[#6B7280]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role login cards */}
      <section className="px-8 md:px-14 pb-24">
        <div className="rounded-2xl bg-[#1B2340] text-[#F7F5F0] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-2">Already have an account?</h2>
            <p className="text-sm text-[#C7CCDB]">
              Sign in as a student, faculty member, or admin to continue.
            </p>
          </div>
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-[#F0A868] text-[#1B2340] text-[16px] font-serif font-bold hover:bg-[#EC9B52] hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Sign In
          </Link>
        </div>
      </section>

      <FAQSection />


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;