import "./globals.css";
import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TopBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "HNVSearch - Lost and Found Management System",
  description: "HNVSearch - Lost and Found Management System for HNVS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#020817] text-slate-100 overflow-x-hidden">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <div className="flex min-h-screen flex-1 flex-col bg-[#020817]">
            <TopBar />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
