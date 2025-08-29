import { NavLink } from "react-router-dom";

function NavComp() {
  const getNavLinkClass = ({ isActive }) => {
    const baseClasses =
      "py-2 px-1 text-base sm:text-lg border-b-2 transition-colors duration-300 whitespace-nowrap";
    const activeClass = "border-cyan-400 text-cyan-400 font-semibold";
    const inactiveClass =
      "border-transparent text-gray-400 hover:text-gray-200";

    return `${baseClasses} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <div className="py-4 px-6 md:px-10 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-6 sm:space-x-8">
          <NavLink to="/activetasks" className={getNavLinkClass}>
            Active
          </NavLink>
          <NavLink to="/alltasks" className={getNavLinkClass}>
            All
          </NavLink>
          <NavLink to="/completedtasks" className={getNavLinkClass}>
            Completed
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavComp;
