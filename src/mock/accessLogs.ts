import type { AccessLog } from "@/types/accessLog";

export const mockAccessLogs: AccessLog[] = [
  {
    id: "ACC-20260922-001",
    user: {
      name: "Sarah Chen",
      email: "sarah.chen@zenfocus.io",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    loginTime: "2026-09-22 08:05:12",
    status: "SUCCESS",
    ipAddress: "211.75.132.45",
    location: "Taiwan (Taipei)",
    browser: "Chrome 128.0",
    os: "macOS Sonoma",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    twoFactorStatus: "PASSED",
    riskTags: [],
  },
  {
    id: "ACC-20260921-002",
    user: {
      name: "Unknown",
      email: "hacker@suspicious.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown",
    },
    loginTime: "2026-09-21 23:12:40",
    status: "FAILED",
    ipAddress: "45.154.255.12",
    location: "Romania (Bucharest)",
    browser: "Firefox 120.0",
    os: "Linux x86_64",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
    twoFactorStatus: "FAILED",
    riskTags: ["BRUTE_FORCE_ALERT", "UNUSUAL_LOCATION"],
  },
  {
    id: "ACC-20260921-003",
    user: {
      name: "Alex Rivera",
      email: "alex.r@zenfocus.io",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    loginTime: "2026-09-21 19:40:02",
    status: "SUCCESS",
    ipAddress: "185.220.101.5",
    location: "Germany (Frankfurt)",
    browser: "Safari 17.4",
    os: "iOS 17.4",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    twoFactorStatus: "PASSED",
    riskTags: ["UNUSUAL_LOCATION", "NEW_DEVICE"],
  },
  {
    id: "ACC-20260920-004",
    user: {
      name: "Admin",
      email: "admin@zenfocus.io",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    },
    loginTime: "2026-09-20 09:15:00",
    status: "SUCCESS",
    ipAddress: "61.216.122.1",
    location: "Taiwan (Hsinchu)",
    browser: "Edge 128.0",
    os: "Windows 11",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0",
    twoFactorStatus: "PASSED",
    riskTags: [],
  },
  {
    id: "ACC-20260919-005",
    user: {
      name: "Auditor",
      email: "auditor@zenfocus.io",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Auditor",
    },
    loginTime: "2026-09-19 14:22:18",
    status: "FAILED",
    ipAddress: "118.163.50.2",
    location: "Taiwan (Taichung)",
    browser: "Chrome 127.0",
    os: "macOS Ventura",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    twoFactorStatus: "FAILED",
    riskTags: ["BRUTE_FORCE_ALERT"],
  },
] as const;
