import { Metadata } from "next";
import { WriteBlogView } from "@/components/blog/write/WriteBlogView";

export const metadata: Metadata = {
  title: "Write Article · Journal Studio | Javohir Sadullayev",
  description:
    "Authoring, drafting, and publishing technical deep-dives on .NET 8, SignalR Core, and backend systems.",
};

export default function WriteBlogPage() {
  return <WriteBlogView />;
}
