import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      if (!imagePath) return;
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath, fs]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000 bg-[#1a1a1a] border border-gray-700 rounded-2xl p-4 flex flex-col gap-4 hover:border-[#02C173] transition-all"
    >
      <div className="resume-card-header flex justify-between items-start">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="text-2xl font-IBMPlexBold text-white break-words">
              {companyName}
            </h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-400">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="text-2xl font-IBMPlexBold text-white">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden">
        {resumeUrl ? (
          <img
            src={resumeUrl}
            alt="resume"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-[350px] flex items-center justify-center">
            <span className="loading loading-spinner text-gray-500"></span>
          </div>
        )}
      </div>
    </Link>
  );
};
export default ResumeCard;
