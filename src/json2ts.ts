import json2tstool from 'json2tstool';

export const json2ts = (str: string) => {
  const resultStr = json2tstool(str);
  return resultStr;
};