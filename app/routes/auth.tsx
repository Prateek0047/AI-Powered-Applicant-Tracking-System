import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: "RESUMIND" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <div className="relative bg-[#060707] min-h-screen">
      <Navbar />
      <div className="bg-[#15d98bfd] h-[362px] w-[362px] absolute rounded-full blur-[120px] filter -top-[100px] -left-20 opacity-75 -z-10"></div>
      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-xl relative text-center">
          <h1 className="font-IBMPlexBold text-6xl max-w-md mx-auto text-center uppercase">
            Welcome Back
          </h1>
          <p className="font-IBMPlexRegular text-center mt-4 mb-8 text-gray-400">
            Log In to continue your Job journey
          </p>
          <div className="flex justify-center">
            {isLoading ? (
              <button className="bg-[#02C173] text-white font-IBMPlexBold py-3 px-8 rounded-lg opacity-50 cursor-not-allowed">
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="bg-red-500 text-white font-IBMPlexBold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all"
                    onClick={auth.signOut}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="bg-[#02C173] text-white font-IBMPlexBold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all"
                    onClick={auth.signIn}
                  >
                    Log In/Sign UP with Puter
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
