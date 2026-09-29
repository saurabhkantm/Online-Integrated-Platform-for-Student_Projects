import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/registerform";
import campusHero from "../../assets/campus-hero.svg";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F5F0]">
      {/* Left panel — statement + illustration */}
      <div className="md:w-5/12 bg-[#1B2340] text-[#F7F5F0] flex flex-col justify-between">
        <div className="p-10 md:p-14">
          <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
            EduArchive
          </span>
          <h1 className="mt-6 font-serif text-4xl md:text-5xl leading-tight">
            Where student work
            <br />
            finds its record.
          </h1>
          <p className="mt-6 text-[#C7CCDB] text-sm leading-relaxed max-w-sm">
            Submit, review, and browse projects across colleges — every
            build, paper, and prototype in one place.
          </p>
        </div>

        <img
          src={campusHero}
          alt="Illustration of academic collaboration"
          className="w-full h-auto"
        />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-14">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-[#E2E4EA] p-8">
          <span className="text-xs tracking-[0.15em] uppercase text-[#F0A868] font-semibold">
            Get started
          </span>
          <h2 className="font-serif text-3xl text-[#1B2340] mt-2 mb-1">
            Create your account
          </h2>
          <p className="text-sm text-[#6B7280] mb-8">
            Join as a student or faculty member to get started.
          </p>

          <RegisterForm />

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#E2E4EA]" />
            <span className="text-xs text-[#9CA3AF]">or</span>
            <div className="h-px flex-1 bg-[#E2E4EA]" />
          </div>

          <p className="text-sm text-[#6B7280] text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1B2340] font-semibold hover:text-[#F0A868] transition">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;