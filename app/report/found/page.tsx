import ReportFormPage from "@/components/report/ReportFormPage";

export default async function FoundReportPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;

  return <ReportFormPage type="found" editId={params?.edit} />;
}
