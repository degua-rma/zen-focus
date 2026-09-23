export type ApiKeyStatus = "active" | "revoked" | "expired";

export interface ApiKeyItem {
  id: string;
  name: string; // 金鑰名稱 (例: Production Webhook, Staging Server)
  keyPrefix: string; // 遮蔽後顯示的金鑰 (例: zen_live_8f...a9b2)
  scopes: string[]; // 允許權限範圍 (例: ['read:users', 'write:orders'])
  creator: {
    name: string;
    email: string;
    avatar?: string;
  };
  status: ApiKeyStatus; // 啟用 / 已撤銷 / 已過期
  lastUsedAt: string; // 最後呼叫時間
  createdAt: string; // 建立時間
  expiresAt: string; // 到期時間 (或 Never)
}
