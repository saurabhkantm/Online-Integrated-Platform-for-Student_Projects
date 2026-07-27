import Navbar from "../../components/common/Navbar";
import ProjectForm from "../../components/projects/projectForm";

const SubmitProject = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />
      <div className="p-8 pt-30 pl-14 pr-14">
        <p className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold text-center">
          Submit a project
        </p>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2 mb-8 text-center">
          Tell us about your work
        </h1>
        <ProjectForm />
      </div>
    </div>
  );
};

export default SubmitProject;