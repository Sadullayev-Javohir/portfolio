import type { Metadata } from "next";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeSheet } from "@/components/resume/ResumeSheet";
import { DownloadNote } from "@/components/resume/DownloadNote";

export const metadata: Metadata = {
  title: "Resume · Javohir Sadullayev (.NET Backend Developer)",
  description:
    "One page. No fluff. The same resume I send to teams — reproduced here in full, downloadable in three languages.",
};

export default function ResumePage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-76px)]">
      <ResumeHeader />
      <ResumeSheet />
      <DownloadNote />
    </div>
  );
}
