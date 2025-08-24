import { User } from "lucide-react";
import { useState } from "react";
import Time from "./LiveClock";
import Profile from "./Profile";
function Header() {
  const [isprofileopen, setisprofileopen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-4xl font-bold tracking-wider text-gray-200">
          TaskTrack
        </div>

        <div className="flex items-center gap-6">
          <Time />

          <div className="relative">
            <div>
              <button
                onClick={() => setisprofileopen(!isprofileopen)}
                className="flex items-center justify-center bg-gray-700 cursor-pointer rounded-full p-3 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all lg:ml-8"
              >
                <User className="h-8 w-8 text-gray-200" />
              </button>
            </div>

            {isprofileopen && <Profile />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
