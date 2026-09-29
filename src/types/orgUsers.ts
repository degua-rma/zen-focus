import type { SystemRole } from "@/types/role";
import type { UserStatus } from "@/types/user";

export interface OrgUser {
  id: string;
  orgId: string; // 關聯的組織 ID
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  jobTitle: string; // 職稱
  role: SystemRole; // 系統權限
  status: UserStatus;
  createdAt: string;
}
