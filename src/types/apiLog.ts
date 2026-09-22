export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type HttpStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500 | 502;

export interface ApiLog {
  id: string;
  timestamp: string;
  method: HttpMethod;
  path: string;
  statusCode: HttpStatus;
  responseTime: number; // 單位: ms
  apiKeyName: string; // API Key 名稱標籤
  apiKeyPrefix: string; // 金鑰前綴 (例如: ak_live_8f9a...)
  ipAddress: string;
}
