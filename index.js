const fs = require("fs");
const {
  fileOrDirExists,
    convertToAbsolute,
    isMarkdownFile,
    readFileContent,
    getStatusLinks,
    findLinksInMarkdown,
} = require('./functions.js');



// aquí va mdLinks 
//función principal que tomará una ruta de archivo y opciones, y devolverá una promesa. 
const mdLinks = (filePath, options = { validate: false, stats: false }) => new Promise((resolve, reject) => {
  //const shouldValidate = options.validate;
  //const shouldShowStats = options.stats;
  const absolutePath = convertToAbsolute(filePath);
  const pathExist = fs.existsSync(absolutePath);

  if (!pathExist) {
    return reject(new Error('Path does not exist' + absolutePath));
  }

  const isMdFile = isMarkdownFile(absolutePath);
  if (!isMdFile) {
    return reject(new Error('File is not a markdown!'));
  }

  readFileContent(filePath)
  .then((markdownContent) => {
    return findLinksInMarkdown(markdownContent, filePath); 
  })
  .then((links) => {
    return getStatusLinks(links); 
  })
  .then((linksWithStatus) => {
    //linksWithStatus no está declarada porque se obtiene como resultado de la promesa
    resolve(linksWithStatus);
  })
  .catch((error) => {
    // En caso de error, rechazamos la promesa
    reject(error);
  });
  });   




//..to try mdLinks promise
/* mdLinks('D:/Laboratoria/DEV008-md-links/README.md', { validate: true }).then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});  */


module.exports = {
  mdLinks,
};