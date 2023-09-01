const {
  fileOrDirExists,
  convertToAbsolute,
  isMarkdownFile,
  readFileContent,
  findLinksInMarkdown,
} = require('../functions');

// función mdLinks 
//función principal que tomará una ruta de archivo y opciones, y devolverá una promesa. 
const mdLinks = (filePath, options) => {
  return new Promise((resolve, reject) => {
    // File exists
    if (!fileOrDirExists(filePath)) {
      reject(new Error('File or directory does not exist'));
      return;
    }

    // Convert Path
    const absolutePath = convertToAbsolute(filePath);

    // Verify if it's a md
    if (!isMarkdownFile(absolutePath)) {
      reject(new Error('File is not a markdown file'));
      return;
    }

    // Read md content
    readFileContent(absolutePath)
      .then((markdownContent) => {
        return findLinksInMarkdown(markdownContent);
      })
      .then((links) => {
        return getStatusLinks(links); // Obtiene el status HTTP para cada enlace
      })
      .then((linksWithStatus) => {
        resolve(linksWithStatus); // Devuelve el array de enlaces con status
      })
      .catch((error) => {
        reject(error);
      });
  });
};

 */// Spread Syntax (...) 
// eso agrega los elementos individuales al arreglo links.

module.exports = {
  mdLinks,
};
