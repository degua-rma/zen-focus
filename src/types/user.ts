export type UserStatus = "active" | "suspended" | "pending";
export type UserRole = "Admin" | "Developer" | "Auditor" | "Viewer";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  createdAt: string;
}
