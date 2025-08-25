import { useState } from "react";
import { X, Menu, List, WatchIcon, BoltIcon } from "lucide-react";
import { Link } from "react-router-dom";
const faqs = [
  {
    id: "q1",
    question: "Is TaskTrack free to use?",
    answer: "Yes, TaskTrack is completely free.",
  },
  {
    id: "q2",
    question: "Is my data private?",
    answer:
      "Yes, your tasks are tied to your personal account and are not visible to anyone else.",
  },
  {
    id: "q3",
    question: "Can I use this with my team?",
    answer: "Currently, TaskTrack is designed for personal task management.",
  },
];

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  //handlenavclick is a special function to remove the unusual behaviour occuring due to the navbar in page scrolling thing was occuring beacuse the react router dom wraps out our whole app to manage navigation here his hijacking was interfering with the browser default scrolling behavior. The router was taking control from browser and then performed its own basic scroll, completely ignoring our tailwind scroll command
  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    const navbarElement = document.querySelector("nav");
    const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - navbarHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  const GithubIcon = (props) => (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      height="24"
      width="24"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
  );

  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-800 rounded-xl p-6 text-center flex flex-col items-center border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
      <div className="bg-gray-700 p-3 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );

  const Accordion = ({ question, answer, onClick, isOpen }) => {
    return (
      <div className="border-b border-gray-700 last:border-b-0">
        <button
          onClick={onClick}
          className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-800 focus:outline-none transition-colors duration-200 cursor-pointer"
        >
          <span className="font-semibold text-2xl text-gray-200">
            {question}
          </span>
          <svg
            className={`w-10 h-7 text-gray-400 transform transition-transform shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isOpen && (
          <div className="p-6 pt-0 text-gray-400">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="text-gray-200 ">
      {/* Navbar Section */}
      <nav className="py-4 px-6 md:px-10 top-0 z-50 bg-gray-900 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-3xl md:text-4xl font-bold text-gray-200">
            TaskTrack
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-lg text-gray-300">
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "#features")}
              className="hover:text-gray-600 transition-colors duration-200 "
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "#faq")}
              className="hover:text-gray-600 transition-colors duration-200"
            >
              FAQs
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hover:text-gray-600 transition-colors duration-200 "
            >
              Contact
            </a>
            <button className="rounded-md bg-gray-600 text-white px-5 py-2 font-semibold hover:bg-gray-700 transition-colors duration-200 cursor-pointer ">
              <Link to="/login">Get Started</Link>
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
                onClick={(e) => handleNavClick(e, "#features")}
                className="w-full text-center py-2  bg-gray-600  hover:bg-gray-700 cursor-pointer"
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, "#faq")}
                className="w-full text-center py-2 bg-gray-600  hover:bg-gray-700 cursor-pointer "
              >
                FAQs
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full text-center py-2  bg-gray-600  hover:bg-gray-700 cursor-pointer "
              >
                Contact
              </a>
              <button className="w-full text-center rounded-md bg-gray-600 text-white py-2 font-semibold hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <Link to="/login">Get Started</Link>
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
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="py-24 bg-black/20 backdrop-blur-md px-6 scroll-mt-24"
      >
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
      {/* faqs */}
      <div id="faq" className="py-24  px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400 mt-6 font-medium">
              Have questions? We've got answers.
            </p>
          </div>
          <div className="bg-gray-900 rounded-md border border-gray-700 overflow-hidden">
            {faqs.map((faq, index) => (
              <Accordion
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* footer section */}
      <footer
        id="contact"
        className="bg-gray-900 border-t border-gray-800 scroll-mt-24"
      >
        <div className="container mx-auto py-6 px-6 flex justify-center items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TaskTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
