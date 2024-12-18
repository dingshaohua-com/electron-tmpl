export const kebabCase_to_camelCase = (fileName, upperCamel = false) => {
    // 转换为小写，并用正则表达式替换每个分隔符后的字符为大写（除非它是字符串的第一个字符）
    let newfileName = fileName
      .toLowerCase() // 先转换为小写
      .replace(/[-_\s]+(.)?/g, (match, p1) => (p1 ? p1.toUpperCase() : ""))
      .replace(/^./, (str) => str.toLowerCase()); // 转换为小驼峰
    if (upperCamel) {
      newfileName = newfileName.charAt(0).toUpperCase() + newfileName.slice(1);
    }
    return newfileName;
  };
  
  export const getFileNameFromUrl = (url) => {
    const match = url.match(/([^/]+)\.([^/]+)?$/); // 使用正则表达式匹配文件名（不包括扩展名）
    let fileName;
    if (match && match[1]) {
      fileName = match[1];
    }
    return fileName;
  };
  
  
  export const getPerfectFnameFromUrl = (url, upperCamel = false) => {
    const res = getFileNameFromUrl(url);
    console.log(111,url, res);
    
    return kebabCase_to_camelCase(res, upperCamel);
  };
  
  // 获取资源路径，在打包时，返回的是 app.asar 所在的路径，在开发时，返回的是 src 路径
  export const getResourcesPath = () => {
    if (app.isPackaged) {
      return process.resourcesPath;
    } else {
      return path.join(app.getAppPath(), "src");
    }
  };
  