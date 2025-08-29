function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center">
          {/* Quote */}
          <div className="mb-4">
            <p className="text-lg italic text-gray-300">
              "The secret of getting ahead is getting started."
            </p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            &copy; {currentYear} TaskTrack. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
