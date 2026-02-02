export type Status = "FOUND" | "LOST" | "REPORTED" | "CLAIM";

export type ReportKind = "lost" | "found";

export type Item = {
  id: string;
  title: string;
  desc: string;
  location: string;
  date: string;
  time: string;
  image?: string;
  tags: Status[];
};

export type Tab = "all" | "reported" | "claimed";
