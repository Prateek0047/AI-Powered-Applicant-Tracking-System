import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCards";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RESUMIND" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      try {
        const resumeItems = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = resumeItems?.map(
          (resume) => JSON.parse(resume.value) as Resume
        );
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Failed to load resumes:", error);
        setResumes([]);
      } finally {
        setLoadingResumes(false);
      }
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [auth.isAuthenticated, kv]);

  return (
    <div className="relative flex flex-col bg-[#060707] min-h-screen text-white overflow-hidden">
      <Navbar />

      {/* Background blur effects */}
      <div className="absolute -top-96 -left-96 w-[60rem] h-[50rem] bg-[#15fda0fd] rounded-full filter blur-[300px] opacity-50 -z-0"></div>
      <div className="absolute -bottom-60 -right-40 w-[60rem] h-[50rem] bg-[#de3d19] rounded-full filter blur-[300px] opacity-20 -z-0"></div>

      <main className="relative z-10 main-section flex-grow">
        <div className="page-heading py-16 text-center">
          <h1 className="font-IBMPlexBold text-6xl max-w-2xl mx-auto uppercase">
            Track your APPLICATIONS and{" "}
            <span className="text-[#02C173]"> RESUME RATINGS </span>
          </h1>
          <p className="font-IBMPlexRegular text-lg mt-4 text-gray-400">
            Review your submissions and check AI-powered feedback below.
          </p>
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#02C173]"></span>
            <p className="mt-4 text-gray-400">Loading your resumes...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4 text-center">
            <h2 className="text-3xl font-IBMPlexBold">No Resumes Found</h2>
            <p className="text-gray-400">
              Upload your first resume to get feedback.
            </p>
            <Link
              to="/upload"
              className="mt-4 bg-[#02C173] text-white font-IBMPlexBold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-all"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </main>
      <footer className="footer sm:footer-horizontal bg-transparent text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            className="fill-current text-white"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="text-white">
            Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-white cursor-pointer invert">
          <a href="https://github.com/Prateek0047">
            <img
              src="https://cdn-icons-png.flaticon.com/128/6424/6424084.png"
              alt="Github"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </a>

          <a href="mailto:pr805201@gmail.com">
            <img
              src="https://cdn-icons-png.flaticon.com/128/542/542689.png"
              alt="G-mail"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </a>
          <a href="https://www.linkedin.com/in/prateek-rawat-01263132b/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/6422/6422202.png"
              alt="LinkedIn"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </a>
        </nav>
      </footer>
    </div>
  );
}
