import { Link } from "react-router-dom";
import {
  Brain, Code, Smartphone, Cpu, Link as LinkIcon, Shield,
} from "lucide-react";
import { subject } from "../../utils/subject";

const iconMap = {
  brain: Brain,
  code: Code,
  smartphone: Smartphone,
  cpu: Cpu,
  link: LinkIcon,
  shield: Shield,
};

const PopularCategories = () => {
  const featured = subject.slice(0, 4);

  return (
    <section className="mt-4">
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {featured.map((cat) => {
          const Icon = iconMap[cat.icon] || Code;
          return (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.id}`}
              className="flex flex-col items-center pl-2 pr-4 gap-2 p-1 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
            >
              
              <span className="text-sm font-medium text-[#1B2340]">{cat.name}</span>
            </Link>
          );
        })}

        <Link
          to="/browse"
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl bg-[#1B2340] hover:bg-[#232B4D] transition-all duration-300 text-center"
        >
          <span className="text-sm font-medium text-[#F7F5F0]">View All</span>
        </Link>
      </div>
    </section>
  );
};

export default PopularCategories;