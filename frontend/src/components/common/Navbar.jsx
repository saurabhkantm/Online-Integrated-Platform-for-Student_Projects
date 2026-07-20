import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
       <nav className="flex items-center justify-between px-8 md:px-14 py-4 fixed top-0 left-0 rounded-4xl right-0 bg-[#02081c]/90 m-6  backdrop-blur-sm border-b border-[#2A335A] z-[1000]">
  <span className="text-xl tracking-[0.2em] uppercase text-[#F7F5F0] font-semibold">
    EduArchive
  </span>
  <div className="flex gap-6 text-sm text-[#F7F5F0]">
    <Link to="/browse" className="hover:text-[#F0A868] transition">Browse Projects</Link>
    <Link to="/register" className="hover:text-[#F0A868] transition">Register</Link>
  </div>
</nav>
    )
}

export default Navbar