import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "../../services/authService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-12 h-12 rounded-full bg-[#F0A868]/15 flex items-center justify-center mb-4">
          <CheckCircle2 size={24} className="text-[#F0A868]" />
        </div>
        <h3 className="font-serif text-xl text-[#1B2340] mb-2">Check your inbox</h3>
        <p className="text-sm text-[#6B7280] max-w-xs mb-6">
          If an account exists for <span className="text-[#1B2340] font-medium">{email}</span>,
          we've sent a link to reset your password.
        </p>
        <Link
          to="/login"
          className="text-sm text-[#1B2340] font-semibold hover:text-[#F0A868] transition inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={15} />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
      <div className="relative w-full">
        <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition-all duration-200"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100 animate-fade-in-up">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 py-3 rounded-lg bg-[#F0A868] text-[#1B2340] font-serif font-semibold text-[16px] hover:bg-[#EC9B52] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {submitting ? "Sending link..." : "Send reset link"}
      </button>

      <Link
        to="/login"
        className="text-sm text-[#6B7280] hover:text-[#1B2340] transition inline-flex items-center justify-center gap-1.5 mt-1"
      >
        <ArrowLeft size={15} />
        Back to sign in
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;