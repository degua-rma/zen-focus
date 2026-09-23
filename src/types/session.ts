export type DeviceType = "desktop" | "mobile";
export type SessionStatus = "active" | "idle" | "risk";

export interface UserSession {
  id: string; // 階段識別碼 (Session ID)
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  deviceType: DeviceType; // 裝置類型
  deviceName: string; // 裝置名稱 (例: MacBook Pro / iPhone 15 Pro)
  browser: string; // 瀏覽器與版本 (例: Chrome 128.0)
  os: string; // 作業系統 (例: macOS Sonoma)
  ipAddress: string; // 登入 IP
  location: string; // 地理位置
  lastActiveTime: string; // 最後活動時間
  isCurrent: boolean; // 是否為當前操作的 Session
  status: SessionStatus; // 階段狀態
}
