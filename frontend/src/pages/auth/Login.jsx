import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/loginform";
import campusHero from "../../assets/campus-hero.svg";

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F5F0]">
            <div className="md:w-5/12 bg-[#1B2340] text-[#F7F5F0] flex flex-col justify-between">
                <div className="p-10 md:p-14">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
                        EduArchive
                    </span>
                    <h1 className="mt-6 font-serif text-4xl md:text-5xl leading-tight">
                        Welcome back.
                    </h1>
                    <p className="mt-6 text-[#C7CCDB] text-sm leading-relaxed max-w-sm">
                        Sign in to submit projects, review submissions, or manage your
                        institution — whatever your role calls for.
                    </p>
                </div>

                <img src={campusHero} alt="Illustration of academic collaboration" className="w-full h-auto" />
            </div>

            <div className="flex-1 flex items-center justify-center p-6 md:p-14">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-[#E2E4EA] p-8">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#F0A868] font-semibold">
                        Welcome back
                    </span>
                    <h2 className="font-serif text-3xl text-[#1B2340] mt-2 mb-1">
                        Sign in
                    </h2>
                    <p className="text-sm text-[#6B7280] mb-8">
                        Sign in with your registered email and password.
                    </p>

                    <LoginForm />

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-[#E2E4EA]" />
                        <span className="text-xs text-[#9CA3AF]">or</span>
                        <div className="h-px flex-1 bg-[#E2E4EA]" />
                    </div>

                    <p className="text-sm text-[#6B7280] text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-[#1B2340] font-semibold hover:text-[#F0A868] transition">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;