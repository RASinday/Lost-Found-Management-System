import ReportFormPage from "@/components/report/ReportFormPage";

export default function LostReportPage({
  searchParams,
}: {
  searchParams?: { edit?: string };
}) {
  return <ReportFormPage type="lost" editId={searchParams?.edit} />;
}
