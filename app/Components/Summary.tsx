import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 69
      ? "text-green-400"
      : score > 39
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="flex flex-row items-center justify-between p-4 border-t border-gray-700">
      <div className="flex flex-row gap-4 items-center">
        <p className="text-xl font-IBMPlexBold">{title}</p>
        <ScoreBadge score={score} />
      </div>
      <p className="text-xl font-IBMPlexBold">
        <span className={textColor}>{score}</span>
        <span className="text-gray-500">/100</span>
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl w-full">
      <div className="flex flex-row items-center p-6 gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-IBMPlexBold text-white">
            Your Resume Score
          </h2>
          <p className="text-sm text-gray-400">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};
export default Summary;
