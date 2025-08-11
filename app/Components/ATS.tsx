import React from "react";
import { cn } from "~/lib/utils";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const scoreColor =
    score > 69
      ? "text-green-400"
      : score > 49
        ? "text-yellow-400"
        : "text-red-400";

  const subtitle =
    score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl w-full p-6">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-2xl font-IBMPlexBold text-white">ATS Score</h2>
        <p className={cn("text-2xl font-IBMPlexBold", scoreColor)}>
          {score}/100
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">{subtitle}</h3>
        <p className="text-gray-400 mb-4">
          This score represents how well your resume is likely to perform in
          Applicant Tracking Systems.
        </p>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "w-5 h-5 mt-1 flex-shrink-0",
                  suggestion.type === "good"
                    ? "text-green-400"
                    : "text-yellow-400"
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {suggestion.type === "good" ? (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
              <p
                className={
                  suggestion.type === "good" ? "text-gray-300" : "text-gray-300"
                }
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ATS;
