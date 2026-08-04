import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
<nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between rounded-3xl border border-[#2A335A] bg-[#02081c]/90 backdrop-blur-md px-6 md:px-10 py-3 shadow-lg">
   <Link to="/" className="flex items-center shrink-0">
    <img
      src="/logo.png"
      alt="Logo"
      className="h-20 md:h-20 w-auto object-contain"
    />
  </Link>

  {/* Navigation */}
  <div className="flex items-center gap-5 md:gap-8 text-sm font-medium text-[#F7F5F0]">
    <Link
      to="/"
      className="transition-colors duration-300 hover:text-[#F0A868]"
    >
      Home
    </Link>

    <Link
      to="/browse-project"
      className="transition-colors duration-300 hover:text-[#F0A868]"
    >
      Browse Projects
    </Link>

    <Link
      to="/leaderboard"
      className="transition-colors duration-300 hover:text-[#F0A868]"
    >
      Leaderboard
    </Link>

    {user ? (
      <>
        <Link
          to={`/${user.role}/dashboard`}
          className="flex items-center gap-2 transition-colors duration-300 hover:text-[#F0A868]"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <span className="hidden lg:block text-xs text-[#9CA3AF] whitespace-nowrap">
          {user.name} ·{" "}
          <span className="capitalize">{user.role}</span>
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-[#F0A868] px-4 py-2 text-[#F0A868] transition-all duration-300 hover:bg-[#F0A868] hover:text-[#02081c]"
        >
          <LogOut size={16} />
          Logout
        </button>
      </>
    ) : (
      <Link
        to="/register"
        className="rounded-xl border border-[#F0A868] px-4 py-2 text-[#F0A868] transition-all duration-300 hover:bg-[#F0A868] hover:text-[#02081c]"
      >
        Register
      </Link>
    )}
  </div>
</nav>
  )
};

export default Navbar;