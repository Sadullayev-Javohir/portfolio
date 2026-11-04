import type { Metadata } from "next";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeSheet } from "@/components/resume/ResumeSheet";
import { DownloadNote } from "@/components/resume/DownloadNote";

export const metadata: Metadata = {
  title: "Resume & CV · Javohir Sadullayev (.NET Backend Developer)",
  description:
    "Curriculum Vitae and verified resume of Javohir Sadullayev. Software Engineer & .NET Backend Developer in Tashkent, Uzbekistan. Available for hire and contracts.",
  alternates: {
    canonical: "/resume",
  },
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
