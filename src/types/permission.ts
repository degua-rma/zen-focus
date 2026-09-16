export interface PermissionItem {
  code: string;
  name: string;
  description: string;
}

export interface PermissionCategory {
  category: string;
  categoryName: string;
  items: PermissionItem[];
}
