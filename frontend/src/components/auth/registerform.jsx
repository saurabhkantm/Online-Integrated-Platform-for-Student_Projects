import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Mail, Lock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

const registerRoles = ["student", "faculty"];

const RegisterForm = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register({ name, email, password, role, organization });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition-all duration-200";

  const fields = [
    { icon: User, type: "text", placeholder: "Full name", value: name, onChange: setName },
    { icon: Building2, type: "text", placeholder: "College / Organization", value: organization, onChange: setOrganization },
    { icon: Mail, type: "email", placeholder: "Email", value: email, onChange: setEmail },
    { icon: Lock, type: "password", placeholder: "Password", value: password, onChange: setPassword },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
      {/* Role toggle */}
      <div className="flex gap-2 mb-1">
        {registerRoles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border
              ${role === r
                ? "bg-[#1B2340] text-[#F7F5F0] border-[#1B2340] shadow-sm"
                : "bg-white text-[#4A5568] border-[#E2E4EA] hover:border-[#1B2340]/40 hover:bg-[#F7F5F0]"}`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {fields.map(({ icon: Icon, type, placeholder, value, onChange }) => (
        <div key={placeholder} className="relative">
          <Icon
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className={inputBase}
          />
        </div>
      ))}

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100 animate-fade-in-up">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 py-3 rounded-lg bg-[#F0A868] text-[#1B2340] font-semibold font-serif text-[16px] hover:bg-[#EC9B52] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {submitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default RegisterForm;