import ReportFormPage from "@/components/report/ReportFormPage";

export default async function LostReportPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;

  return <ReportFormPage type="lost" editId={params?.edit} />;
}
