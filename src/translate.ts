import axios from 'axios';

const YOUDAO_API = 'http://fanyi.youdao.com/translate';
const GOOGLE_API =
  'http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=en&q=你好';

interface IYouDaoResult {
  type: string;
  errorCode: number;
  elapsedTime: number;
  translateResult: ITranslateResultItem[][];
}

interface ITranslateResultItem {
  src: string;
  tgt: string;
}

const youdaoTranslate = async (str: string) => {
  const res = await axios.get<IYouDaoResult>(YOUDAO_API, {
    params: {
      i: str,
      doctype: 'json',
      type: 'AUTO',
    },
  });

  if (res.data.translateResult?.length > 0) {
    return res.data.translateResult
      .flat()
      .map((i) => i.tgt)
      .join('-');
  }
  return '';
};

const getTool = (type: 'YOUDAO' | 'GOOGLE') => {
  if (type === 'YOUDAO') {
    return youdaoTranslate;
  }
  if (type === 'GOOGLE') {
    return () => '';
  }
  return () => '';
};

const TRANSLATE_MAP = new Map<string, string>();
const MAX_MEMO_SIZE = 100;

export const translate = async (str: string, type: 'YOUDAO' | 'GOOGLE' = 'YOUDAO') => {

  const memoResult = TRANSLATE_MAP.get(str);
  if (memoResult) {
    return memoResult;
  }

  const request = getTool(type);
  try {
    const res = await request(str);
    if (TRANSLATE_MAP.size > MAX_MEMO_SIZE) {
      TRANSLATE_MAP.clear();
    }
    TRANSLATE_MAP.set(str, res);
    return res;
  } catch (error) {
    return '';
  }
};
