import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Mail, Lock, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { getOrganization } from "../../services/organizationService.js";

const registerRoles = ["student", "faculty"];

const RegisterForm = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const data = await getOrganization();
        if (Array.isArray(data)) {
          setOrganizations(data);
        } else if (Array.isArray(data?.organizations)) {
          setOrganizations(data.organizations);
        } else if (Array.isArray(data?.data)) {
          setOrganizations(data.data);
        } else {
          console.error("Unexpected organizations response shape:", data);
          setOrganizations([]);
        }
      } catch (err) {
        console.error("Failed to load organizations", err);
        setOrganizations([]);
      }
    };
    fetchOrgs();
  }, []);

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

      <div className="relative">
        <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputBase}
        />
      </div>

      {/* Organization dropdown */}
      <div className="relative">
        <Building2 size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] z-10" />
        <select
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          required
          disabled={organizations.length === 0}
          className={`${inputBase} appearance-none disabled:opacity-50 disabled:cursor-not-allowed [&>option]:bg-white [&>option]:text-[#1B2340] [&>option]:py-2`}
        >
          <option value="" disabled>
            {organizations.length === 0 ? "No colleges available yet" : "Select your college"}
          </option>
          {organizations.map((org) => (
            <option key={org._id} value={org._id} className="bg-white text-[#ba7a3e]">
              {org.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
        />
      </div>

      <div className="relative">
        <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputBase}
        />
      </div>

      <div className="relative">
        <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputBase}
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
        className="mt-2 py-3 rounded-lg bg-[#F0A868] text-[#1B2340] font-semibold font-serif text-[16px] hover:bg-[#EC9B52] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {submitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default RegisterForm;