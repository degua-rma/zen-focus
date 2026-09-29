import type { OrgUser } from "@/types/orgUsers";

export const mockOrgUsers: OrgUser[] = [
  // 前端工程組 (org-rd-frontend)
  {
    id: "usr-001",
    orgId: "org-rd-frontend",
    user: {
      name: "Sarah Chen",
      email: "sarah.chen@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    jobTitle: "資深前端工程師",
    role: "Developer",
    status: "active",
    createdAt: "2025-03-15",
  },
  {
    id: "usr-002",
    orgId: "org-rd-frontend",
    user: {
      name: "Kevin Wang",
      email: "kevin.w@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    jobTitle: "前端工程師",
    role: "Developer",
    status: "active",
    createdAt: "2025-08-01",
  },

  // 後端工程組 (org-rd-backend)
  {
    id: "usr-003",
    orgId: "org-rd-backend",
    user: {
      name: "Alex Rivera",
      email: "alex.r@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    jobTitle: "後端架構師",
    role: "Developer",
    status: "active",
    createdAt: "2024-11-10",
  },
  {
    id: "usr-004",
    orgId: "org-rd-backend",
    user: {
      name: "David Lee",
      email: "david.l@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    jobTitle: "DevOps 工程師",
    role: "Developer",
    status: "pending", // 測試未啟用狀態
    createdAt: "2026-01-20",
  },

  // 增長行銷組 (org-mkt-growth)
  {
    id: "usr-005",
    orgId: "org-mkt-growth",
    user: {
      name: "Emma Watson",
      email: "emma.w@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    jobTitle: "行銷經理",
    role: "Viewer",
    status: "active",
    createdAt: "2025-05-12",
  },
  {
    id: "usr-006",
    orgId: "org-mkt-growth",
    user: {
      name: "Lucas Scott",
      email: "lucas.s@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=60",
    },
    jobTitle: "內容營運專員",
    role: "Viewer",
    status: "suspended", // 測試停權狀態
    createdAt: "2026-02-01",
  },

  // 人力資源部 (org-hr)
  {
    id: "usr-007",
    orgId: "org-hr",
    user: {
      name: "Admin",
      email: "admin@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    jobTitle: "HRBP",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "usr-008",
    orgId: "org-hr",
    user: {
      name: "Olivia Martinez",
      email: "olivia.m@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    jobTitle: "資產會計專員",
    role: "Auditor",
    status: "active",
    createdAt: "2025-10-15",
  },

  // 剛邀請入會，待驗證啟用
  {
    id: "usr-009",
    orgId: "org-unassigned",
    user: {
      name: "Daniel Craig",
      email: "daniel.c@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    jobTitle: "尚未設定",
    role: "Viewer",
    status: "pending",
    createdAt: "2026-09-20",
  },
  {
    id: "usr-010",
    orgId: "org-unassigned",
    user: {
      name: "Sophia Martinez",
      email: "sophia.m@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    jobTitle: "實習生",
    role: "Viewer",
    status: "active",
    createdAt: "2026-09-22",
  },
  {
    id: "usr-011",
    orgId: "org-unassigned",
    user: {
      name: "Ethan Hunt",
      email: "ethan.h@zenfocus.io",
      avatar: "https://i.pravatar.cc/150?img=53",
    },
    jobTitle: "資安顧問",
    role: "Auditor",
    status: "active",
    createdAt: "2026-09-25",
  },
];
