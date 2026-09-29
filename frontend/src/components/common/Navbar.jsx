import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const NavLink = ({ to, children, className = "" }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className={`group relative transition-colors duration-300 hover:text-[#F0A868] ${className}`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#F0A868] transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  const navLinks = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/browse-project">Browse Projects</NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>

      {user ? (
        <>
          <Link
            to={`/${user.role}/dashboard`}
            onClick={closeMenu}
            className="group relative flex items-center gap-2 transition-colors duration-300 hover:text-[#F0A868]"
          >
            <LayoutDashboard size={18} className="transition-transform duration-300 group-hover:scale-110" />
            Dashboard
          </Link>

          <span className="text-xs text-[#9CA3AF] whitespace-nowrap">
            {user.name} · <span className="capitalize">{user.role}</span>
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-[#F0A868] px-4 py-2 text-[#F0A868] transition-all duration-300 hover:bg-[#F0A868] hover:text-[#02081c] hover:shadow-[0_0_16px_rgba(240,168,104,0.4)] active:scale-95 w-fit"
          >
            <LogOut size={16} />
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/register"
          onClick={closeMenu}
          className="rounded-xl border border-[#F0A868] px-4 py-2 text-[#F0A868] transition-all duration-300 hover:bg-[#F0A868] hover:text-[#02081c] hover:shadow-[0_0_16px_rgba(240,168,104,0.4)] active:scale-95 w-fit"
        >
          Register
        </Link>
      )}
    </>
  );

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between rounded-3xl border border-[#2A335A] bg-[#02081c]/90 backdrop-blur-md px-6 md:px-10 shadow-lg transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(240,168,104,0.08)]">
        <Link to="/" className="flex items-center shrink-0 group" onClick={closeMenu}>
          <img
            src="/logo3.png"
            alt="Logo"
            className="h-16 md:h-22 w-24 md:w-28 object-contain transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5 md:gap-8 text-sm font-medium text-[#F7F5F0]">
          {navLinks}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#F7F5F0] p-2 transition-transform duration-300 active:scale-90"
          aria-label="Toggle menu"
        >
          <span className="relative block w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`fixed top-24 left-4 right-4 z-40 lg:hidden rounded-2xl border border-[#2A335A] bg-[#02081c]/95 backdrop-blur-md px-6 shadow-lg overflow-hidden transition-all duration-400 ease-out ${
          menuOpen ? "max-h-96 py-6 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 text-sm font-medium text-[#F7F5F0]">
          {navLinks}
        </div>
      </div>
    </>
  );
};

export default Navbar;