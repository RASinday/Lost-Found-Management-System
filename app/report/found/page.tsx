import ReportFormPage from "@/components/report/ReportFormPage";

export default function FoundReportPage({
  searchParams,
}: {
  searchParams?: { edit?: string };
}) {
  return <ReportFormPage type="found" editId={searchParams?.edit} />;
}
