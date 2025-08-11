import { Link, useLocation } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const location = useLocation();

  if (location.pathname === "/auth") {
    return null;
  }

  // For all other pages, if the user is not authenticated, they will be redirected.
  // Returning null here prevents a brief flash of the navbar before the redirect happens.
  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <nav className="relative flex justify-between z-10 items-center px-5 py-5 w-full">
      {/* Left Section: Home Link (RESUMIND) */}
      <div>
        <Link
          to="/"
          className="uppercase font-IBMPlexBold text-white hover:text-[#02C173] transition-colors text-4xl"
        >
          RESUMIND
        </Link>
      </div>

      {/* Right Section: Action Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/upload"
          className="uppercase font-IBMPlexBold text-gray-300 hover:text-[#02C173] transition-colors text-4xl"
        >
          Upload
        </Link>
        <button
          onClick={auth.signOut}
          className="uppercase font-IBMPlexBold text-gray-300 hover:text-red-500 transition-colors"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
