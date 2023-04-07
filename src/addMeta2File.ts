import dayjs = require('dayjs');
import gm = require('gray-matter');

export const addMeta2Markdown = (mdString : string, fileName:string)=>{

    const parsedContent = gm(mdString);
    const { data, content } = parsedContent;
    const date = dayjs().format("YYYY-MM-DD HH:mm");

    if(Object.keys(data).length > 0){
        data.updated_at = date;
        data.title = fileName;
    }else{
        data.title = fileName;
        data.created_at = date;
        data.updated_at = date;
    }
    const newContent = gm.stringify(content,data);
    return newContent;
};







