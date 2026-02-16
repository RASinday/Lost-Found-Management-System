  // app/admin/page.tsx
  "use client";

  import React, { useMemo, useState, useRef } from "react";
  import { toast } from "sonner";
  import {
    FileText,
    Calendar,
    Package,
    Users,
    FileBadge,
    Search,
    PlusCircle,
    UserPlus,
    Edit2,
    MapPin as MapPinIcon,
    Clock,
    Camera,
  } from "lucide-react";

  import AdminShell from "@/components/admin/AdminShell";
  import Tabs from "@/components/admin/Tabs";
  import StatCard from "@/components/admin/StatCard";
  import Pill from "@/components/admin/Pill";
  import Modal from "@/components/admin/Modal";
  import { SelectField, TextArea, TextField } from "@/components/admin/fields";
  import {
    CATEGORIES,
    ROLES,
    ReportRow,
    UserRow,
    initialReports,
    initialUsers,
  } from "@/components/admin/sampleData";

  function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
  }

  type TabKey = "reports" | "users";

  export default function AdminPage() {
    const [tab, setTab] = useState<TabKey>("reports");

    const [reports, setReports] = useState<ReportRow[]>(initialReports);
    const [users, setUsers] = useState<UserRow[]>(initialUsers);

    const [searchQuery, setSearchQuery] = useState("");
    const [reportTypeFilter, setReportTypeFilter] = useState<"ALL TYPES" | "Lost" | "Found">("ALL TYPES");
  const [reportStatusFilter, setReportStatusFilter] = useState<
    "ALL STATUS" | "PENDING" | "APPROVED" | "CLAIMED" | "REJECTED"
  >("ALL STATUS");

    const [userRoleFilter, setUserRoleFilter] = useState<"ALL TYPES" | string>("ALL TYPES");
    const [userStatusFilter, setUserStatusFilter] = useState<"ALL STATUS" | "Active" | "Banned">("ALL STATUS");

    const [openAddReport, setOpenAddReport] = useState(false);
    const [openAddUser, setOpenAddUser] = useState(false);
    const [editReport, setEditReport] = useState<ReportRow | null>(null);
    const [editUser, setEditUser] = useState<UserRow | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const reportStats = useMemo(() => [
      { label: "TOTAL REPORTS", value: reports.length, icon: <FileText size={18} />, iconBg: "bg-blue-500/20 text-blue-400 border border-blue-500/20" },
      { label: "PENDING REVIEW", value: reports.filter((r) => r.status === "PENDING").length, icon: <Calendar size={18} />, iconBg: "bg-orange-500/20 text-orange-400 border border-orange-500/20" },
      { label: "APPROVED ITEM", value: reports.filter((r) => r.status === "APPROVED").length, icon: <FileBadge size={18} />, iconBg: "bg-amber-500/20 text-amber-400 border border-amber-500/20" },
      { label: "CLAIMED ITEM", value: reports.filter((r) => r.status === "CLAIMED").length, icon: <Package size={18} />, iconBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" },
      { label: "REJECTED ITEM", value: reports.filter((r) => r.status === "REJECTED").length, icon: <Package size={18} />, iconBg: "bg-rose-500/20 text-rose-400 border border-rose-500/20" },
    ], [reports]);

    const userStats = useMemo(() => {
      return [
        { label: "TOTAL ACCOUNTS", value: users.length, icon: <Users size={18} />, iconBg: "bg-blue-600/90" },
        { label: "ACTIVE USERS", value: users.filter((u) => u.status === "Active").length, icon: <Calendar size={18} />, iconBg: "bg-orange-500/90" },
        { label: "BANNED USERS", value: users.filter((u) => u.status === "Banned").length, icon: <Calendar size={18} />, iconBg: "bg-orange-500/90" },
        { label: "USERS ACCOUNT", value: users.filter((u) => u.role === "Student").length, icon: <Users size={18} />, iconBg: "bg-green-600/90" },
        { label: "SSLG OFFICER", value: users.filter((u) => u.role === "SSLG Officer").length, icon: <FileBadge size={18} />, iconBg: "bg-red-600/90" },
      ];
    }, [users]);

    const stats = tab === "reports" ? reportStats : userStats;

    const filteredReports = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      return reports.filter((r) => {
        const matchQ = !q || r.name.toLowerCase().includes(q) || r.reporter.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
        const matchType = reportTypeFilter === "ALL TYPES" ? true : r.type === reportTypeFilter;
        const matchStatus = reportStatusFilter === "ALL STATUS" ? true : r.status === reportStatusFilter;
        return matchQ && matchType && matchStatus;
      });
    }, [reports, searchQuery, reportTypeFilter, reportStatusFilter]);

    const filteredUsers = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      return users.filter((u) => {
        const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        // Logic for User Role Filter
        const matchRole = userRoleFilter === "ALL TYPES" ? true : u.role === userRoleFilter;
        // Logic for User Status Filter
        const matchStatus = userStatusFilter === "ALL STATUS" ? true : u.status === userStatusFilter;
        
        return matchQ && matchRole && matchStatus;
      });
    }, [users, searchQuery, userRoleFilter, userStatusFilter]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const url = URL.createObjectURL(file);
          setImagePreview(url);
        }
      };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
      };

    const addReport = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);

      const next: ReportRow = {
        id: Math.max(...reports.map((r) => r.id), 0) + 1,
        name: (fd.get("name") as string) || "",
        category: (fd.get("category") as string) || CATEGORIES[0],
        description: (fd.get("description") as string) || "",
        type: (fd.get("type") as "Lost" | "Found") || "Lost",
        reporter: "Admin",
        location: (fd.get("location") as string) || "",
        date: (fd.get("date") as string) || "",
        time: (fd.get("time") as string) || "",
        status: "PENDING",
      };

      setReports((prev) => [next, ...prev]);
      setOpenAddReport(false);
      toast.success("New report filed successfully");
    };

    const updateReport = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!editReport) return;

      const fd = new FormData(e.currentTarget);
      const updated: ReportRow = {
        ...editReport,
        name: (fd.get("name") as string) || editReport.name,
        category: (fd.get("category") as string) || editReport.category,
        description: (fd.get("description") as string) || editReport.description,
        location: (fd.get("location") as string) || editReport.location,
        date: (fd.get("date") as string) || editReport.date,
        time: (fd.get("time") as string) || editReport.time,
      };

      setReports((prev) => prev.map((r) => (r.id === editReport.id ? updated : r)));
      setEditReport(null);
      toast.success("Report updated successfully");
    };

    const deleteReport = () => {
    if (!editReport) return;
    
    setReports((prev) => prev.filter((r) => r.id !== editReport.id));
    
    setEditReport(null);
    toast.success("Report deleted successfully");
  };

    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);

      const next: UserRow = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        name: (fd.get("name") as string) || "",
        email: (fd.get("email") as string) || "",
        role: (fd.get("role") as string) || ROLES[0],
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
      };

      setUsers((prev) => [next, ...prev]);
      setOpenAddUser(false);
      toast.success("New user account registered successfully");
    };

    const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!editUser) return;

      const fd = new FormData(e.currentTarget);
      const updated: UserRow = {
        ...editUser,
        name: (fd.get("name") as string) || editUser.name,
        email: (fd.get("email") as string) || editUser.email,
        role: (fd.get("role") as string) || editUser.role,
        status: (fd.get("status") as "Active" | "Banned") || editUser.status,
      };

      setUsers((prev) => prev.map((u) => (u.id === editUser.id ? updated : u)));
      setEditUser(null);
      toast.success("User information updated");
    };

    const deleteUser = () => {
        if (!editUser) return;
        
        setUsers((prev) => prev.filter((u) => u.id !== editUser.id));
        
        setEditUser(null);
        toast.success("User account deleted permanently");
      };

    const reportTypeChip = (type: "Lost" | "Found") =>
      type === "Lost" ? <Pill variant="lost">Lost</Pill> : <Pill variant="found">Found</Pill>;

    const reportStatusChip = (status: ReportRow["status"]) => {
      if (status === "PENDING") return <Pill variant="pending" shape="soft">PENDING</Pill>;
      if (status === "APPROVED") return <Pill variant="approved" shape="soft">APPROVED</Pill>;
      if (status === "CLAIMED") return <Pill variant="claimed" shape="soft">CLAIMED</Pill>;
      return <Pill variant="rejected" shape="soft">REJECTED</Pill>;
    };

    return (
      <AdminShell
        title="Admin Panel"
        subtitle="Centralized oversight for reports and user accounts."
        right={
          <Tabs<TabKey>
            value={tab}
            onChange={setTab}
            options={[
              { key: "reports", label: "Reports" },
              { key: "users", label: "Users" },
            ]}
          />
        }
      >
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s, i) => (
            <StatCard key={i} icon={s.icon} label={s.label} value={s.value} iconBg={s.iconBg} />
          ))}
        </div>

        {/* Table container */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/5 bg-[#151F2E]">
          {/* Controls bar */}
          <div className="border-b border-white/5 bg-[#2A3F5F]/55 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                {/* Search */}
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={16} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${tab === "reports" ? "reports" : "users"}...`}
                    className="w-full rounded-lg border border-white/5 bg-[#0B121E] py-2.5 pl-11 pr-4 text-sm text-white/85 outline-none placeholder:text-white/25 focus:border-[#FF9F1C]/50"
                  />
                </div>

                {tab === "reports" ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select
                    value={reportTypeFilter}
                    onChange={(e) => setReportTypeFilter(e.target.value as any)}
                    className="rounded-lg border border-white/5 bg-[#0B121E] px-4 py-3 text-[11px] font-black uppercase tracking-wider text-white/60 outline-none hover:text-white focus:border-[#FF9F1C]/50"
                  >
                    <option>ALL TYPES</option>
                    <option>Lost</option>
                    <option>Found</option>
                  </select>

                  <select
                    value={reportStatusFilter}
                    onChange={(e) => setReportStatusFilter(e.target.value as any)}
                    className="rounded-lg border border-white/5 bg-[#0B121E] px-4 py-3 text-[11px] font-black uppercase tracking-wider text-white/60 outline-none hover:text-white focus:border-[#FF9F1C]/50"
                  >
                    <option>ALL STATUS</option>
                    <option>PENDING</option>
                    <option>APPROVED</option>
                    <option>CLAIMED</option>
                    <option>REJECTED</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="rounded-lg border border-white/5 bg-[#0B121E] px-4 py-3 text-[11px] font-black uppercase tracking-wider text-white/60 outline-none hover:text-white focus:border-[#FF9F1C]/50"
                  >
                    <option value="ALL TYPES">ALL ROLES</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </select>

                  <select
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value as any)}
                    className="rounded-lg border border-white/5 bg-[#0B121E] px-4 py-3 text-[11px] font-black uppercase tracking-wider text-white/60 outline-none hover:text-white focus:border-[#FF9F1C]/50"
                  >
                    <option>ALL STATUS</option>
                    <option>Active</option>
                    <option>Banned</option>
                  </select>
                </div>
              )}
            </div>

              <button
                type="button"
                onClick={() => (tab === "reports" ? setOpenAddReport(true) : setOpenAddUser(true))}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF9F1C] px-6 py-3 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-[#FF8C00] active:scale-[0.99]"
              >
                {tab === "reports" ? <PlusCircle size={16} /> : <UserPlus size={16} />}
                {tab === "reports" ? "ADD REPORT" : "ADD USER"}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0B121E]/35 text-white/40">
                  {tab === "reports" ? (
                    <>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em]">ITEMS & LOCATION</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.15em]">TYPE</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.15em]">STATUS</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.15em]">ACTIONS</th>
                    </>
                  ) : (
                    <>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em]">USER PROFILE</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.15em]">ACCOUNT TYPE</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.15em]">STATUS</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.15em]">ACTIONS</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {tab === "reports" ? (
                  filteredReports.map((r) => (
                    <tr key={r.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-4">
                          <div
                            className={cx(
                              "flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-[#0B121E]",
                              r.type === "Lost" ? "text-red-400" : "text-green-400"
                            )}
                          >
                            <FileText size={18} />
                          </div>

                          <div>
                            <div className="text-[15px] font-bold text-white/90">{r.name}</div>
                            <div className="mt-1 flex items-center gap-1.5 text-sm text-white/45">
                              <MapPinIcon size={12} className="text-[#FF9F1C]" />
                              {r.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-7 text-center">{reportTypeChip(r.type)}</td>
                      <td className="px-8 py-7 text-center">{reportStatusChip(r.status)}</td>

                      <td className="px-8 py-7 text-right">
                        <button
                          type="button"
                          onClick={() => setEditReport(r)}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B121E] px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white/70 transition-colors hover:border-white/25 hover:text-white"
                        >
                          <Edit2 size={14} />
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-[#0B121E] text-white">
                            <Users size={18} />
                          </div>

                          <div>
                            <div className="text-[15px] font-bold text-white/90">{u.name}</div>
                            <div className="mt-1 text-sm text-white/45">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-7 text-center">
                        <Pill variant="role" shape="soft">
                          {u.role}
                        </Pill>
                      </td>

                      <td className="px-8 py-7 text-center">
                        <Pill variant={u.status === "Active" ? "active" : "banned"}>{u.status}</Pill>
                      </td>

                      <td className="px-8 py-7 text-right">
                        <button
                          type="button"
                          onClick={() => setEditUser(u)}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B121E] px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white/70 transition-colors hover:border-white/25 hover:text-white"
                        >
                          <Edit2 size={14} />
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))
                )}

                {tab === "reports" && filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-sm text-white/45">
                      No reports found.
                    </td>
                  </tr>
                ) : null}

                {tab === "users" && filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-sm text-white/45">
                      No users found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>


        {/* ADD REPORT */}
        <Modal
          title="File Report"
          open={openAddReport}
          onClose={() => setOpenAddReport(false)}
          width="max-w-2xl"
        >
          <form className="space-y-8" onSubmit={addReport}>
            <div className="space-y-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                Item Information
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField label="Item Name / Brand" name="name" required placeholder="e.g., iPhone 13" />
                <SelectField label="Category" name="category" options={CATEGORIES} />
              </div>

              <TextArea
                label="Physical Description"
                name="description"
                placeholder="Provide specific details (color, size, unique marks)..."
              />

              <SelectField label="Report Type" name="type" options={["Lost", "Found"]} />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  Time & Location
                </p>

                <div className="relative">
                  <TextField label="Date Last Seen" name="date" type="date" required />
                  <Calendar className="pointer-events-none absolute right-4 bottom-3.5 text-white/25" size={16} />
                </div>

                <div className="relative">
                  <TextField label="Approximate Time" name="time" type="time" required />
                  <Clock className="pointer-events-none absolute right-4 bottom-3.5 text-white/25" size={16} />
                </div>

                <TextField label="Approximate Location" name="location" required placeholder="e.g., Canteen, Gym" />
              </div>

              <div className="space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  Photo
                </p>
                <div className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0B121E] transition-colors hover:bg-white/[0.02]">
                  <div className="rounded-full bg-white/5 p-4">
                    <Camera className="text-white/40" size={28} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
                    Click to upload photo
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#FF9F1C] py-4 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-[#FF8C00] active:scale-[0.99]"
            >
              CREATE REPORT
            </button>
          </form>
        </Modal>

        {/* EDIT REPORT */}
        <Modal
          title="Edit Report"
          open={!!editReport}
          onClose={() => {
            setEditReport(null);
            setImagePreview(null);
          }}
          width="max-w-2xl"
        >
          {editReport ? (
            <form className="space-y-8" onSubmit={updateReport}>
              {/* Top Section: Item Info */}
              <div className="space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  Item Information
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField label="Item Name / Brand" name="name" required defaultValue={editReport.name} />
                  <SelectField label="Category" name="category" options={CATEGORIES} defaultValue={editReport.category} />
                </div>
                <TextArea label="Physical Description" name="description" defaultValue={editReport.description} />
              </div>

              {/* Middle Section: Location & Photo */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                
                {/* Left Column: Time & Location */}
                <div className="space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                    Time & Location
                  </p>
                  
                  <div className="relative group">
                    <TextField label="Date Last Seen" name="date" type="date" required defaultValue={editReport.date} />
                    <Calendar className="pointer-events-none absolute right-4 bottom-3.5 text-white/25 group-hover:text-white/50 transition-colors" size={18} />
                  </div>

                  <div className="relative group">
                    <TextField label="Approximate Time" name="time" type="time" required defaultValue={editReport.time} />
                    <Clock className="pointer-events-none absolute right-4 bottom-3.5 text-white/25 group-hover:text-white/50 transition-colors" size={18} />
                  </div>

                  <TextField label="Approximate Location" name="location" required defaultValue={editReport.location} />
                </div>

                {/* Right Column: Photo Evidence */}
                <div className="space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                    Photo Evidence
                  </p>
                  
                  <div 
                    onClick={triggerFileInput}
                    className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0B121E] transition-all hover:border-white/20 hover:bg-white/[0.02]"
                  >
                    {imagePreview ? (
                      // SHOW IMAGE PREVIEW
                      <>
                        <img 
                          src={imagePreview} 
                          alt="Evidence" 
                          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-50" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                           <div className="rounded-full bg-black/50 p-3 text-white backdrop-blur-sm">
                              <Camera size={24} />
                           </div>
                        </div>
                      </>
                    ) : (
                      // SHOW UPLOAD PLACEHOLDER
                      <>
                        <div className="mb-3 rounded-full bg-white/5 p-4 transition-colors group-hover:bg-white/10">
                          <Camera className="text-white/40 transition-colors group-hover:text-white/80" size={32} />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/45 transition-colors group-hover:text-white/70">
                          Click to replace photo
                        </p>
                      </>
                    )}
                    
                    {/* Hidden Input */}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#FF9F1C] py-3.5 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-[#FF8C00] active:scale-[0.99]"
                >
                  UPDATE REPORT
                </button>

                <button
                  type="button"
                  onClick={deleteReport}
                  className="w-full rounded-xl bg-red-500/10 py-3.5 text-[11px] font-black uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/20 active:scale-[0.99]"
                >
                  DELETE REPORT
                </button>
              </div>
            </form>
          ) : null}
        </Modal>

        {/* ADD USER */}
        <Modal
          title="Register Member"
          open={openAddUser}
          onClose={() => setOpenAddUser(false)}
          width="max-w-lg"
        >
          <form className="space-y-5" onSubmit={addUser}>
            <TextField label="Full Name" name="name" required placeholder="Enter name" />
            <TextField label="Email Address" name="email" type="email" required placeholder="user@gmail.com" />
            <TextField label="Password" name="password" type="password" required placeholder="Enter Password" />
            <SelectField label="Assigned Role" name="role" options={ROLES} />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#FF9F1C] py-4 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-[#FF8C00] active:scale-[0.99]"
            >
              CREATE ACCOUNT
            </button>
          </form>
        </Modal>

        <Modal
          title="Edit Account"
          open={!!editUser}
          onClose={() => setEditUser(null)}
          width="max-w-lg"
        >
          {editUser ? (
            <form className="space-y-6" onSubmit={updateUser}>
              <TextField label="Full Name" name="name" required defaultValue={editUser.name} />
              <TextField label="Email Address" name="email" type="email" required defaultValue={editUser.email} />
              <TextField label="Password" name="password" type="password" placeholder="Update Password (optional)" />
              <SelectField label="Account Type" name="role" options={ROLES} defaultValue={editUser.role} />
              <SelectField label="Status" name="status" options={["Active", "Banned"]} defaultValue={editUser.status} />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#FF9F1C] py-4 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-[#FF8C00] active:scale-[0.99]"
              >
                UPDATE ACCOUNT
              </button>
              <button
                  type="button"
                  onClick={deleteUser}
                  className="w-full rounded-xl bg-red-500/10 py-3.5 text-[11px] font-black uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/20 active:scale-[0.99]"
                >
                  DELETE ACCOUNT
                </button>
            </form>
          ) : null}
        </Modal>
      </AdminShell>
    );
  }
