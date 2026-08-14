import { Link } from "react-router-dom";
import ForgotPasswordForm from "../../components/auth/forgotPasswordForm.jsx";
import campusHero from "../../assets/campus-hero.svg";

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F5F0]">
            <div className="md:w-5/12 bg-[#1B2340] text-[#F7F5F0] flex flex-col justify-between">
                <div className="p-10 md:p-14">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
                        EduArchive
                    </span>
                    <h1 className="mt-6 font-serif text-4xl md:text-5xl leading-tight">
                        Forgot something?
                    </h1>
                    <p className="mt-6 text-[#C7CCDB] text-sm leading-relaxed max-w-sm">
                        It happens. Enter the email on your account and we'll send you a
                        link to get back in.
                    </p>
                </div>

                <img src={campusHero} alt="Illustration of academic collaboration" className="w-full h-auto" />
            </div>

            <div className="flex-1 flex items-center justify-center p-6 md:p-14">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-[#E2E4EA] p-8">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#F0A868] font-semibold">
                        Reset password
                    </span>
                    <h2 className="font-serif text-3xl text-[#1B2340] mt-2 mb-1">
                        Reset your password
                    </h2>
                    <p className="text-sm text-[#6B7280] mb-8">
                        We'll email you a link to choose a new one.
                    </p>

                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;