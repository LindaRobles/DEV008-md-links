const fs = require("fs");
const path = require("path");
const axios = require('axios');


// Función para verificar si un archivo o directorio existe
function fileOrDirExists(filePath) {
  return fs.existsSync(filePath);
}
console.log("Path exists:", fileOrDirExists('./extra.md'));

// Función para convertir una ruta relativa en absoluta
function convertToAbsolute(filePath) {
  return path.resolve(filePath);
}
console.log("Absolute path:", convertToAbsolute ('./extra.md'));
//console.log("Absolute path:", convertToAbsolute ('./index.js'));

// Confirmar si es un archivo .md
function isMarkdownFile(filePath) {
  return path.extname(filePath) === ".md";
}
console.log("Is markdown file:", isMarkdownFile('./extra.md'));

const filePath = 'D:/Laboratoria/DEV008-md-links/README.md';
//D:\Laboratoria\DEV008-md-links\README.md
// Leer el archivo .md
function readFileContent(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  
// Buscar links dentro del .md

const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

function findLinksInMarkdown(markdownContent, filePath) {
  return new Promise((resolve, reject) => {
    const links = [];
    let match;

    while ((match = linkRegex.exec(markdownContent)) !== null) {
      const [, linkText, linkUrl] = match;
      links.push({
        text: linkText,
        href: linkUrl,
        file: filePath
      });
    }

    resolve(links);
  });
}


//const filePath = 'D:\Laboratoria\DEV008-md-links\extra.md';


readFileContent(filePath)
  .then((markdownContent) => {
    return findLinksInMarkdown(markdownContent, filePath); 
  })
  .then((links) => {
    return getStatusLinks(links); 
  })
  .then((linksWithStatus) => {
    console.log("Links with status:", linksWithStatus);
  })
  .catch((error) => {
    console.error("Error:", error);
  });



// Pedir el código status HTTP -fetch o axios
//Axios aquí

//transforma en newPromise
function getStatusLinks(linksArray) {
  const promises = linksArray.map((link) => {
    return axios.get(link.href)
      .then((response) => {
        const statusText = `HTTP Status Code: ${response.status} ${response.statusText}`;
        return { ...link, status: statusText };
      })
      .catch((error) => {
        let statusText = 'HTTP Status Code: Unknown Error';

        if (error.response) {
          statusText = `HTTP Status Code: ${error.response.status} ${error.response.statusText}`;
        }

        return { ...link, status: statusText };
      });
  });

  return Promise.all(promises);
}


/* axios.get('https://ejemplo.com')
  .then(() => {
    console.log('HTTP Status Code: 200 OK');
  })
  .catch(() => {
    console.log('HTTP Status Code: 404 Not Found');
  });  */ 
  //Para probar axios afuera. 

// validar links

  module.exports = {
    fileOrDirExists,
    convertToAbsolute,
    isMarkdownFile,
    readFileContent,
  };