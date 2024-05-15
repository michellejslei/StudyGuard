import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header bg-gradient-to-r from-purple-300 to-pink-300 py-5 px-20" style={{ zIndex: 1000, position: 'relative' }}>
        <nav className="flex justify-between items-center w-full text-2xl font-medium">
            <NavLink to="/" className="text-white">
                StudyGuard
            </NavLink>
            <div className="flex gap-16">
                <NavLink to="/about" className={({ isActive }) => "text-white" + (isActive ? " underline" : "")}>
                    About
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => "text-white" + (isActive ? " underline" : "")}>
                    Log In
                </NavLink>
            </div>
        </nav>
    </header>
  )
}

export default Navbar;
