import { useState } from "react";
import { X, Menu, NotebookPen, Users } from "lucide-react";

function Landing() {
  // State to manage whether the mobile menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-100 py-4 px-6 md:px-10">
      {/* navbar */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl md:text-4xl font-bold">TaskTrack</div>

        {/* Desktop Menu & "Get Started" Button */}
        <div className="hidden md:flex items-center space-x-8 text-xl">
          <div className="hover:scale-105 hover:text-white cursor-pointer transition-transform duration-200">
            Features
          </div>
          <div className="hover:scale-105 hover:text-white cursor-pointer transition-transform duration-200">
            FAQs
          </div>
          <div className="hover:scale-105 hover:text-white cursor-pointer transition-transform duration-200">
            Contact
          </div>
          <button className="rounded-md bg-gray-200 text-gray-800 px-4 py-2 font-semibold hover:text-gray-200 hover:bg-gray-800 transition-transform duration-200 cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-100 cursor-pointer hover:scale-105 focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className=" md:hidden mt-4">
          <div className="flex flex-col items-center space-y-4 px-2 pt-2 pb-3">
            <button className="w-full text-center rounded-md bg-gray-800 text-gray-200 px-3 py-2 font-semibold cursor-pointer hover:text-gray-900 hover:bg-gray-200">
              {" "}
              Features{" "}
            </button>
            <button className="w-full text-center rounded-md bg-gray-800 text-gray-200 px-3 py-2 font-semibold cursor-pointer hover:text-gray-900 hover:bg-gray-200">
              {" "}
              FAQs{" "}
            </button>
            <button className="w-full text-center rounded-md bg-gray-800 text-gray-200 px-3 py-2 font-semibold cursor-pointer hover:text-gray-800 hover:bg-gray-200">
              {" "}
              Contact{" "}
            </button>
            <button className="w-full text-center rounded-md bg-gray-800 text-gray-200 px-3 py-2 font-semibold cursor-pointer hover:text-gray-800 hover:bg-gray-200">
              {" "}
              Get Started{" "}
            </button>
          </div>
        </div>
      )}
      {/* hero section */}
      <div className="my-30 mx-5 md:mx-24 lg:my-35 lg:mx-100 flex flex-col items-center">
        <div className="text-center text-5xl md:text-6xl lg:text-7xl font-bold ">
          {" "}
          Master Your Day{" "}
        </div>
        <div className="text-center text-2xl lg:text-3xl font-semibold  mt-10 md:mt-16 lg:mt-20">
          {" "}
          The simple and powerful task manager designed to organize your to-do
          lists, track your progress, and help you achieve your personal goals.{" "}
        </div>
        <button className="text-3xl lg:text-4xl p-3 md:p-4 lg:p-5  font-semibold mt-10 lg:mt-20 rounded-md bg-gray-200 text-2xl text-gray-800 hover:scale-105 cursor-pointer">
          {" "}
          Get Started{" "}
        </button>
      </div>
      {/* features section */}
    </div>
  );
}

export default Landing;
