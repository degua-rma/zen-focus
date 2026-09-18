import { ElMessage } from "element-plus";

/**
 * 通用一鍵複製函式
 * @param text 要複製的字串或 JSON 物件
 */
export const copyToClipboard = async (text?: string | Record<string, any>) => {
  if (!text) {
    ElMessage.warning("沒有可複製的內容");
    return;
  }

  try {
    const content =
      typeof text === "string" ? text : JSON.stringify(text, null, 2);
    await navigator.clipboard.writeText(content);
    ElMessage.success("已成功複製到剪貼簿！");
  } catch (err) {
    ElMessage.error("複製失敗，請手動複製");
  }
};
