export interface OrgNode {
  id: string;
  name: string;
  code: string; // 組織代碼 (例: HQ-RD, HQ-MKT)
  userCount: number; // 該部門人數 (方便在樹上顯示數字)
  children?: OrgNode[];
}
