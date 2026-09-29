import type { SystemRole } from "@/types/role";

export type UserStatus = "active" | "suspended" | "pending";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: SystemRole;
  department: string;
  status: UserStatus;
  createdAt: string;
}
