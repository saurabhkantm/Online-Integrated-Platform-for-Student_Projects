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
    <nav className="flex mb-20 items-center justify-between px-8 md:px-14 py-4 fixed top-0 left-0 rounded-4xl right-0 bg-[#02081c]/90 m-6 backdrop-blur-sm border-b border-[#2A335A] z-[1000]">
      <Link to="/" className="text-xl tracking-[0.2em] uppercase text-[#F7F5F0] font-semibold">
        EduArchive
      </Link>

      <div className="flex items-center gap-6 text-sm text-[#F7F5F0]">
        <Link to="/browse-project" className="hover:text-[#F0A868] transition">
          Browse Projects
        </Link>

        {user ? (
          <>
            <Link
              to={`/${user.role}/dashboard`}
              className="flex items-center gap-1.5 hover:text-[#F0A868] transition"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <span className="text-[#9CA3AF] text-xs hidden md:inline">
              {user.name} · <span className="capitalize">{user.role}</span>
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F0A868] text-[#F0A868] hover:bg-[#F0A868] hover:text-[#1B2340] transition"
            >
              <LogOut size={15} />
              Logout
            </button>
          </>
        ) : (
          <Link to="/register" className="hover:text-[#F0A868] transition">
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;