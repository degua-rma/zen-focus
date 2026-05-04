// mock這個資料夾專門放測試用假資料
// 最後上線前只需要巡這個資料夾的資料有沒有串接就好

import * as user from "./user";
import * as dashboard from "./dashboard";
import * as settings from "./settings";

export const FAKE_DATA = {
  ...user,
  ...dashboard,
  ...settings,
};
