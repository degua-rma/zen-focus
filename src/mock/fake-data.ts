// mock這個資料夾專門放測試用假資料
// 最後上線前只需要巡這個資料夾的資料有沒有串接就好

import * as auth from "./auth";
import * as dashboard from "./dashboard";
import * as settings from "./settings";
import * as personalTool from "./personal-tool";
import * as userList from "./users";
import * as roleList from "./role";
import * as permissionList from "./permission";
import * as mockAuditLogs from "./auditLog";
import * as mockAccessLogs from "./accessLogs";
import * as mockApiLogs from "./apiLogs";
import * as mockUserSessions from "./userSessions";
import * as mockApiKeys from "./apiKeys";

export const FAKE_DATA = {
  ...auth,
  ...dashboard,
  ...settings,
  ...personalTool,
  ...userList,
  ...roleList,
  ...permissionList,
  ...mockAuditLogs,
  ...mockAccessLogs,
  ...mockApiLogs,
  ...mockUserSessions,
  ...mockApiKeys,
};
