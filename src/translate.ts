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

const youdao_translate = async (str: string) => {
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
    return youdao_translate;
  }
  if (type === 'GOOGLE') {
    return () => '';
  }
  return () => '';
};

export const translate = async (str: string, type: 'YOUDAO' | 'GOOGLE' = 'YOUDAO') => {
  const request = getTool(type);
  try {
    const res = await request(str);
    return res;
  } catch (error) {
    return '';
  }
};
