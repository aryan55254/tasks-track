import { useState } from "react";
import { X, Menu, List, WatchIcon, BoltIcon } from "lucide-react";

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-800 rounded-xl p-6 text-center flex flex-col items-center border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
      <div className="bg-gray-700 p-3 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen">
      {/* Navbar Section */}
      <nav className="py-4 px-6 md:px-10 sticky top-0 z-50 bg-gray-900 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-3xl md:text-4xl font-bold text-gray-200">
            TaskTrack
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-lg text-gray-300">
            <a
              href="#features"
              className="hover:text-gray-600 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#faq"
              className="hover:text-gray-600 transition-colors duration-200"
            >
              FAQs
            </a>
            <a
              href="#contact"
              className="hover:text-gray-600 transition-colors duration-200"
            >
              Contact
            </a>
            <button className="rounded-md bg-gray-600 text-white px-5 py-2 font-semibold hover:bg-gray-700 transition-colors duration-200 cursor-pointer ">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 focus:outline-none cursor-pointer"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-4">
            <div className="flex flex-col items-center space-y-4">
              <a
                href="#features"
                className="w-full text-center py-2  bg-gray-600  hover:bg-gray-700 cursor-pointer"
              >
                Features
              </a>
              <a
                href="#faq"
                className="w-full text-center py-2 bg-gray-600  hover:bg-gray-700 cursor-pointer"
              >
                FAQs
              </a>
              <a
                href="#contact"
                className="w-full text-center py-2  bg-gray-600  hover:bg-gray-700 cursor-pointer"
              >
                Contact
              </a>
              <button className="w-full text-center rounded-md bg-gray-600 text-white py-2 font-semibold hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="py-24 md:py-32 px-6">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Master Your Day
          </h1>
          <p className="text-center text-lg md:text-xl text-slate-400 mt-6 max-w-3xl">
            The simple and powerful task manager designed to organize your to-do
            lists, track your progress, and help you achieve your personal
            goals.
          </p>
          <button className="text-xl md:text-2xl px-8 py-4 font-semibold mt-12 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-transform duration-200 hover:scale-105 cursor-pointer">
            Get Started for Free
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-900 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              Why You Should Use TaskTrack?
            </h2>
            <p className="text-lg text-gray-400 mt-2 font-medium">
              Simple . Straightforward . Effective
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<List size={28} className="text-gray-400" />}
              title="Intuitive Task Management"
              description="Effortlessly create, edit, and organize your tasks. Our clean and simple interface lets you focus on what needs to get done."
            />
            <FeatureCard
              icon={<WatchIcon size={28} className="text-gray-400" />}
              title="Effortless Status Tracking"
              description="Instantly see what's pending and what's complete. Toggle task statuses with a single click and filter your view to maintain focus."
            />
            <FeatureCard
              icon={<BoltIcon size={28} className="text-gray-400" />}
              title="Stay Clean & Focused"
              description="Declutter your workspace in seconds. Our bulk-delete option allows you to clear all completed tasks at once, keeping your list fresh and relevant."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
