import type { OrgNode } from "@/types/organization";

export const mockOrgTree: OrgNode[] = [
  {
    id: "org-root",
    name: "ZEN FOCUS 總部",
    code: "HQ",
    userCount: 11, // 包含未分配人數 (8 + 3)
    children: [
      {
        id: "org-rd",
        name: "研發中心 (R&D)",
        code: "HQ-RD",
        userCount: 4,
        children: [
          {
            id: "org-rd-frontend",
            name: "前端工程組",
            code: "HQ-RD-FE",
            userCount: 2,
          },
          {
            id: "org-rd-backend",
            name: "後端工程組",
            code: "HQ-RD-BE",
            userCount: 2,
          },
        ],
      },
      {
        id: "org-mkt",
        name: "行銷營運部",
        code: "HQ-MKT",
        userCount: 2,
        children: [
          {
            id: "org-mkt-growth",
            name: "增長行銷組",
            code: "HQ-MKT-GR",
            userCount: 2,
          },
        ],
      },
      {
        id: "org-hr",
        name: "行政與人力資源部",
        code: "HQ-HR",
        userCount: 2,
      },
      {
        id: "org-unassigned",
        name: "未分配部門",
        code: "UNASSIGNED",
        userCount: 3, // 三筆新建立尚未分類成員
      },
    ],
  },
];
