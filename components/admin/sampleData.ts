// components/admin/sampleData.ts
export type ReportRow = {
  id: number;
  name: string;
  category: string;
  description: string;
  type: "Lost" | "Found";
  reporter: string;
  date: string;
  time: string;
  status: "PENDING" | "APPROVED" | "CLAIMED" | "REJECTED";
  location: string;
};

export type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Banned";
  joinDate: string;
};

export const ROLES = ["Student", "Teacher", "SSLG Officer", "Super Admin Coordinator"];

export const CATEGORIES = [
  "ID", 
  "Wallet",
  "Phone",
  "Keys", 
  "Bag", 
  "Thumbler",
  "Handkerchief",
  "Towel",
  "Picture",
  "Clothing",
  "Footwear",
  "Other"
];

export const LOCATIONS = [
  "JHS Guard House",
  "PTA Office",
  "Principal's  Office",
  "Admin Office",
  "Waiting Shed (between PTA & LAB. 1)",
  "LAB. 1",
  "LAB. 2",
  "Math Park",
  "Science Building (Old Library)",
  "HNVS Kiosk (Guest House)",
  "Garments Building",
  "Supply Office/Clinic",
  "Casa (near Science Buildingg)",
  "JHS Canteen",
  "Parking",
  "ERAP Sports Complex",
  "HNVS Quadrangle",
  "HNVS Gym",
  "HNVS Stage",
  "SSLG Stage",
  "HNVS Pathway",
  "Guidance Office",
  "Covered Walk",
  "Science Laboratory",
  "New Comp. Lab",
  "New Library",
  "MAPEH Office",
  "HNVS Coop",
  "Foodtrades Building",
  "Automotive Building",
  "Old Waiting Shed (near ERAP)",
  "MAPEH Building",
  "Generic Building (near cemetery)",
  "Civil Tech. Building",
  "Pharma. Garden",
  "CSS Building",
  "HNVS Gulayan",
  "SHS Canteen",
  "SHS Guardhouse",
  "Old Building",
  "Building 1",
  "Building 2",
  "Building 3",
  "SHS Pathway",
  "SHS Grounds",
  "Makeshift (Acacia)",
  "Annex Building",
  "Small Grand Stand",
  "Big Grand Stand",
  "HNVS Oval",
  "Other",
];

export const initialReports: ReportRow[] = [
  { id: 1, name: "Blue Hydroflask", category: "Personal Item", description: "Blue 32oz Hydroflask with stickers", type: "Lost", reporter: "Arwen Yan", date: "2026-01-25", time: "10:00 AM", status: "PENDING", location: "School Canteen" },
  { id: 2, name: "Black School Bag", category: "Bags", description: "Black Nike backpack containing books", type: "Found", reporter: "John Ivan", date: "2026-01-26", time: "02:30 PM", status: "APPROVED", location: "SSLG Office" },
  { id: 3, name: "Scientific Calculator", category: "Electronics", description: "Casio fx-991ES Plus", type: "Lost", reporter: "Allen Mae", date: "2026-01-24", time: "09:15 AM", status: "CLAIMED", location: "Room 102" },
  { id: 4, name: "iPhone 13 Pro", category: "Electronics", description: "Silver iPhone with clear case", type: "Found", reporter: "Sir Ritchie", date: "2026-01-27", time: "04:00 PM", status: "REJECTED", location: "Guard House" },
];

export const initialUsers: UserRow[] = [
  { id: 1, name: "Noellyn Sinday", email: "noellyn@gmail.com", role: "SSLG Officer", status: "Active", joinDate: "2025-09-12" },
  { id: 2, name: "Jane Smith", email: "jane@gmail.com", role: "Student", status: "Banned", joinDate: "2025-10-05" },
  { id: 3, name: "Heinz Tan", email: "heinz@gmail.com", role: "SSLG Officer", status: "Active", joinDate: "2025-11-20" },
  { id: 4, name: "Robert Wilson", email: "robert@gmail.com", role: "Student", status: "Banned", joinDate: "2026-01-02" },
];
