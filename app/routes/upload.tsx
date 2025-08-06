import React, { useEffect, useState, type FormEvent } from "react";
import FileUploader from "~/Components/FileUploader";
import Navbar from "~/Components/Navbar";
import { usePuterStore } from "~/lib/puter";

function upload() {
    const {auth,isLoading,fs,ai,kv} = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setstatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyse = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setstatusText("uploading the file");
     const uploadedFile=await fs.upload([file]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyse({ companyName, jobDescription, jobTitle, file });
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>
            Smart feedback for your <br /> dream job{" "}
          </h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" alt="img" />
            </>
          ) : (
            <h2>Drop your resume for ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name" className="font-bold">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title" className="font-bold">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description" className="font-bold">
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="upload-resume" className="font-bold">
                  Upload resume
                </label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button type="submit" className="primary-button">
                Analyze resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default upload;
