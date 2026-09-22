// 存取與登入紀錄
export type StatusType = "SUCCESS" | "FAILED";
export type twoFactorStatusType =
  | "PASSED"
  | "SKIPPED"
  | "FAILED"
  | "NOT_ENABLED";
export type RiskTagType =
  | "UNUSUAL_LOCATION"
  | "BRUTE_FORCE_ALERT"
  | "NEW_DEVICE";

export interface AccessLog {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  loginTime: string;
  status: StatusType;
  ipAddress: string;
  location: string;
  browser: string;
  os: string;
  userAgent: string;
  twoFactorStatus: twoFactorStatusType;
  riskTags: Array<RiskTagType>;
}
