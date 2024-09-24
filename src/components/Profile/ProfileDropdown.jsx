import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left ml-3">
      <span
        className="inline-flex items-center justify-center size-[38px] rounded-full bg-gray-500 text-sm font-semibold text-white leading-none"
        onClick={toggleDropdown}
      >
        AC
      </span>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {JSON.parse(localStorage.getItem("userInfo"))?.username}
            </p>

            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>

            {JSON.parse(localStorage.getItem("userInfo"))?.role === "admin" && (
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
            )}
            <button
              type="submit"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
