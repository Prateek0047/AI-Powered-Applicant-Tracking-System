import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: "Resume Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading, auth.isAuthenticated, navigate, id]);

  useEffect(() => {
    if (!id || !auth.isAuthenticated) return;

    const loadResume = async () => {
      setIsPageLoading(true);
      try {
        const resumeDataString = await kv.get(`resume:${id}`);
        if (!resumeDataString) {
          console.error("Resume data not found in KV store.");
          setIsPageLoading(false);
          return;
        }

        const data = JSON.parse(resumeDataString);

        if (data.resumePath) {
          const resumeBlob = await fs.read(data.resumePath);
          if (resumeBlob) {
            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            setResumeUrl(URL.createObjectURL(pdfBlob));
          }
        }

        if (data.imagePath) {
          const imageBlob = await fs.read(data.imagePath);
          if (imageBlob) {
            setImageUrl(URL.createObjectURL(imageBlob));
          }
        }

        setFeedback(data.feedback);
      } catch (error) {
        console.error("Failed to load resume:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    loadResume();
  }, [id, auth.isAuthenticated, fs, kv]);

  return (
    <div className="relative bg-[#060707] min-h-screen text-white">
      <Navbar />
      <div className="absolute -top-96 -left-96 w-[60rem] h-[50rem] bg-[#15fda0fd] rounded-full filter blur-[300px] opacity-50 -z-0"></div>
      <div className="absolute -bottom-60 -right-40 w-[60rem] h-[50rem] bg-[#de3d19] rounded-full filter blur-[300px] opacity-20 -z-0"></div>

      <main className="flex flex-row w-full max-lg:flex-col-reverse p-5 gap-8">
        {/* Left Section: Resume Preview */}
        <section className="w-1/2 lg:w-2/5 max-lg:w-full h-[calc(100vh-120px)] sticky top-[100px] flex flex-col items-center justify-center">
          {isPageLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] border border-gray-700 rounded-2xl">
              <span className="loading loading-spinner loading-lg text-[#02C173]"></span>
            </div>
          ) : imageUrl && resumeUrl ? (
            <div className="w-full h-full bg-[#1a1a1a] border border-gray-700 rounded-2xl p-4 animate-in fade-in duration-1000">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-lg"
                  alt="Resume preview"
                />
              </a>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] border border-gray-700 rounded-2xl">
              <p>Could not load resume preview.</p>
            </div>
          )}
        </section>

        {/* Right Section: Feedback */}
        <section className="w-1/2 lg:w-3/5 max-lg:w-full flex flex-col gap-8">
          <h1 className="font-IBMPlexBold text-4xl uppercase">
            Resume <span className="text-[#02C173]">Review</span>
          </h1>
          {isPageLoading || !feedback ? (
            <div className="flex flex-col gap-4">
              <div className="skeleton h-48 w-full bg-[#1a1a1a]"></div>
              <div className="skeleton h-32 w-full bg-[#1a1a1a]"></div>
              <div className="skeleton h-64 w-full bg-[#1a1a1a]"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
export default Resume;
