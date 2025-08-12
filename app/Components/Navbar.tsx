import { Link, useLocation , useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/auth") {
    return null;
  }

  // For all other pages, if the user is not authenticated, they will be redirected.
  // Returning null here prevents a brief flash of the navbar before the redirect happens.
  if (!auth.isAuthenticated) {
    return null;
  }

    const handleLogout = async () => {
      await auth.signOut();
      navigate("/auth", { replace: true }); // go to login
    };

  return (
    <nav className="relative flex flex-wrap justify-between z-10 items-center px-5 py-5 w-full">
      {/* Left Section: Home Link (RESUMIND) */}
      <div>
        <Link
          to="/"
          className="uppercase font-IBMPlexBold text-white hover:text-[#02C173] transition-colors text-2xl sm:text-4xl "
        >
          RESUMIND
        </Link>
      </div>

      {/* Right Section: Action Links */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 sm:m-0">
        <Link
          to="/upload"
          className="uppercase font-IBMPlexBold text-gray-300 hover:text-[#02C173] transition-colors text-4xl"
        >
          Upload
        </Link>
        <button
          onClick={handleLogout}
          className="uppercase font-IBMPlexBold text-gray-300 hover:text-red-500 transition-colors"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
