import { query } from "@ifyour/deeplx";

const chinesePattern = /[\u4E00-\u9FA5\uF900-\uFA2D]/;

const deeplxTranslate = async (str: string) => {
  const res = await query({
    text: str,
    source_lang: "auto",
    target_lang: chinesePattern.test(str) ? "en" : "zh",
  });
  if (res.code === 200) {
    return res.data || "";
  }
  return "";
};

const TRANSLATE_MAP = new Map<string, string>();
const MAX_MEMO_SIZE = 100;

export const translate = async (str: string) => {
  const memoResult = TRANSLATE_MAP.get(str);
  if (memoResult) {
    return memoResult;
  }

  try {
    const res = await deeplxTranslate(str);
    if (TRANSLATE_MAP.size > MAX_MEMO_SIZE) {
      TRANSLATE_MAP.clear();
    }
    TRANSLATE_MAP.set(str, res);
    return res;
  } catch (error) {
    return "";
  }
};
