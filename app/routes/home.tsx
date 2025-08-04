import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/Components/Navbar";
import { resumes } from "../../constants";

import ResumeCards from "~/Components/ResumeCards";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "smart feedback for your dream job" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1> Track your Application and resume rating </h1>
          <h2> Review your submission and check AI powered feedback </h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCards key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
