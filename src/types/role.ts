export interface RoleItem {
  id: string;
  role: string;
  description: string;
  scope: string[];
  createdAt: string;
  isSystem: boolean; // 用於區分系統預設與未來新增的自訂角色
}
