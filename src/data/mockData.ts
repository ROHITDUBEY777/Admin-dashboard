export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "HR" | "Team Lead" | "Employee";
  status: "Active" | "Inactive";
  department: string;
  avatar?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Annual" | "Sick" | "Personal" | "Maternity";
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
}

export interface Activity {
  id: string;
  message: string;
  timestamp: string;
  type: "user" | "leave" | "system";
}

export const mockUsers: User[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@company.com", role: "Admin", status: "Active", department: "Engineering" },
  { id: "2", name: "Mike Chen", email: "mike@company.com", role: "Team Lead", status: "Active", department: "Engineering" },
  { id: "3", name: "Emily Davis", email: "emily@company.com", role: "HR", status: "Active", department: "Human Resources" },
  { id: "4", name: "James Wilson", email: "james@company.com", role: "Employee", status: "Active", department: "Marketing" },
  { id: "5", name: "Anna Smith", email: "anna@company.com", role: "Employee", status: "Inactive", department: "Design" },
  { id: "6", name: "Robert Brown", email: "robert@company.com", role: "Team Lead", status: "Active", department: "Sales" },
  { id: "7", name: "Lisa Anderson", email: "lisa@company.com", role: "Employee", status: "Active", department: "Engineering" },
  { id: "8", name: "David Martinez", email: "david@company.com", role: "Employee", status: "Active", department: "Marketing" },
  { id: "9", name: "Karen Taylor", email: "karen@company.com", role: "HR", status: "Active", department: "Human Resources" },
  { id: "10", name: "Tom Harris", email: "tom@company.com", role: "Employee", status: "Active", department: "Design" },
];

export const mockLeaves: LeaveRequest[] = [
  { id: "1", employeeId: "4", employeeName: "James Wilson", type: "Annual", startDate: "2026-03-20", endDate: "2026-03-25", status: "Pending", reason: "Family vacation" },
  { id: "2", employeeId: "7", employeeName: "Lisa Anderson", type: "Sick", startDate: "2026-03-14", endDate: "2026-03-15", status: "Approved", reason: "Flu symptoms" },
  { id: "3", employeeId: "8", employeeName: "David Martinez", type: "Personal", startDate: "2026-03-18", endDate: "2026-03-18", status: "Pending", reason: "Personal appointment" },
  { id: "4", employeeId: "10", employeeName: "Tom Harris", type: "Annual", startDate: "2026-04-01", endDate: "2026-04-10", status: "Rejected", reason: "Holiday trip" },
  { id: "5", employeeId: "2", employeeName: "Mike Chen", type: "Sick", startDate: "2026-03-10", endDate: "2026-03-12", status: "Approved", reason: "Medical procedure" },
  { id: "6", employeeId: "5", employeeName: "Anna Smith", type: "Maternity", startDate: "2026-04-15", endDate: "2026-07-15", status: "Approved", reason: "Maternity leave" },
  { id: "7", employeeId: "6", employeeName: "Robert Brown", type: "Personal", startDate: "2026-03-22", endDate: "2026-03-22", status: "Pending", reason: "Moving day" },
];

export const mockActivities: Activity[] = [
  { id: "1", message: "Sarah Johnson updated the leave policy", timestamp: "2 minutes ago", type: "system" },
  { id: "2", message: "James Wilson submitted a leave request", timestamp: "15 minutes ago", type: "leave" },
  { id: "3", message: "New employee Tom Harris was onboarded", timestamp: "1 hour ago", type: "user" },
  { id: "4", message: "Lisa Anderson's sick leave was approved", timestamp: "2 hours ago", type: "leave" },
  { id: "5", message: "Monthly payroll processed successfully", timestamp: "5 hours ago", type: "system" },
  { id: "6", message: "Robert Brown submitted a leave request", timestamp: "1 day ago", type: "leave" },
];

export const monthlyTrends = [
  { month: "Jan", employees: 42, projects: 8, revenue: 52000 },
  { month: "Feb", employees: 45, projects: 10, revenue: 58000 },
  { month: "Mar", employees: 48, projects: 12, revenue: 61000 },
  { month: "Apr", employees: 50, projects: 11, revenue: 59000 },
  { month: "May", employees: 53, projects: 14, revenue: 67000 },
  { month: "Jun", employees: 55, projects: 13, revenue: 72000 },
  { month: "Jul", employees: 58, projects: 15, revenue: 75000 },
  { month: "Aug", employees: 60, projects: 16, revenue: 78000 },
  { month: "Sep", employees: 62, projects: 14, revenue: 80000 },
  { month: "Oct", employees: 65, projects: 17, revenue: 85000 },
  { month: "Nov", employees: 67, projects: 18, revenue: 88000 },
  { month: "Dec", employees: 70, projects: 20, revenue: 92000 },
];

export const departmentPerformance = [
  { department: "Engineering", score: 92, headcount: 25 },
  { department: "Marketing", score: 85, headcount: 12 },
  { department: "Sales", score: 88, headcount: 15 },
  { department: "Design", score: 90, headcount: 8 },
  { department: "HR", score: 82, headcount: 5 },
  { department: "Finance", score: 87, headcount: 5 },
];

export const leaveDistribution = [
  { name: "Annual", value: 45, fill: "hsl(160, 84%, 39%)" },
  { name: "Sick", value: 25, fill: "hsl(38, 92%, 50%)" },
  { name: "Personal", value: 20, fill: "hsl(217, 91%, 60%)" },
  { name: "Maternity", value: 10, fill: "hsl(280, 65%, 60%)" },
];

export const attendanceTrends = [
  { month: "Jan", present: 95, absent: 5 },
  { month: "Feb", present: 93, absent: 7 },
  { month: "Mar", present: 96, absent: 4 },
  { month: "Apr", present: 94, absent: 6 },
  { month: "May", present: 97, absent: 3 },
  { month: "Jun", present: 92, absent: 8 },
  { month: "Jul", present: 90, absent: 10 },
  { month: "Aug", present: 93, absent: 7 },
  { month: "Sep", present: 95, absent: 5 },
  { month: "Oct", present: 96, absent: 4 },
  { month: "Nov", present: 94, absent: 6 },
  { month: "Dec", present: 91, absent: 9 },
];
