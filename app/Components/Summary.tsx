import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Catagory = ({ title, score = 0 }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";
  return (
    <div className="resume-summary">
      <div className="catagory">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
      </div>
      <p className="text-2xl">
        <span className={textColor}>{score}</span>
      </p>
    </div>
  );
};  

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full ">
      <div className="flex flex-row items-center p-4 g-8">
        <ScoreGauge score={feedback?.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your resume score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below
          </p>
        </div>
      </div>
      <Catagory title="Tone & style" score={feedback?.toneAndStyle?.score} />
      <Catagory title="Content" score={feedback?.content?.score} />
      <Catagory title="Structure" score={feedback?.structure?.score} />
      <Catagory title="Skills" score={feedback?.skills?.score} />
    </div>
  );
};

export default Summary;
