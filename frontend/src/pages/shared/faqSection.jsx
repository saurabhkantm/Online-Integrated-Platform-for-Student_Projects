import { useState } from "react";
import { ChevronDown } from "lucide-react";
import brushSwoosh from "../../assets/brush.svg";

const faqData = [
  {
    question: "Who can submit a project on EduArchive?",
    answer:
      "Any registered student can submit a project. You'll need to create a student account first, then your submission goes through faculty review before it's published.",
  },
  {
    question: "How does the plagiarism check work?",
    answer:
      "When you submit a project, its title and description are automatically compared against existing projects in the archive. If the similarity score crosses a threshold, it's flagged for faculty to review before approval.",
  },
  {
    question: "Can I edit my project after submitting it?",
    answer:
      "Yes, as long as it's still pending review. Once a project is approved, edits may require re-review depending on what's changed.",
  },
  {
    question: "Can students from other colleges see my project?",
    answer:
      "Yes — once approved, your project appears in cross-college browsing and peer learning, so students at other institutions can discover and learn from your work.",
  },
  {
    question: "How do faculty accounts get approved?",
    answer:
      "Faculty can register directly, but admin verification may be required depending on your institution's settings before full review permissions are granted.",
  },
  {
    question: "Can I download other students' project reports?",
    answer:
      "Yes, approved projects with uploaded documentation are downloadable from their project detail page, for peer learning and reference purposes.",
  },
];

const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#E2E4EA]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-[#1B2340] text-sm md:text-base pr-4 text-center">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#F0A868] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-[#6B7280] leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-8 md:px-14 pb-24">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl mb-1 font-bold">Frequently Asked Questions</h2>
        <p className="text-[16px] text-[#6B7280] max-w-md mx-auto">
          Everything you need to know before you get started.
        </p>
        <img src={brushSwoosh} alt="" aria-hidden="true" className="w-32 mx-auto -mt-1 mb-3" />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-[#E2E4EA] px-6">
        {faqData.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;