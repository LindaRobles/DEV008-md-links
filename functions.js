const fs = require("fs"); //módulo se utiliza para interactuar con el sistema de archivos. 
const path = require("path"); //módulo se utiliza para trabajar con rutas de archivos y directorios de manera compatible con diferentes sistemas operativos.
const axios = require('axios');


// Función para verificar si un archivo o directorio existe
function fileOrDirExists(filePath) {
  return fs.existsSync(filePath);
}
//console.log("Path exists:", fileOrDirExists('./extra.md'));

// Función para convertir una ruta relativa en absoluta
function convertToAbsolute(filePath) {
  return path.resolve(filePath);
}
//usa el módulo path con su método resolve
//console.log("Absolute path:", convertToAbsolute ('./extra.md'));
//console.log("Absolute path:", convertToAbsolute ('./index.js'));

// Confirmar si es un archivo .md
function isMarkdownFile(filePath) {
  return path.extname(filePath) === ".md";
}
//console.log("Is markdown file:", isMarkdownFile('./extra.md'));

//const filePath = 'D:/Laboratoria/DEV008-md-links/README.md';
//const filePath = 'D:/Laboratoria/DEV008-md-links/extra.md'; //error al copiar path?


// Leer el archivo .md
//callback**
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

/* 
readFileContent(filePath)
  .then((markdownContent) => {
    return findLinksInMarkdown(markdownContent, filePath); 
  })
  .then((links) => {
    return getStatusLinks(links); 
  })
  .then((linksWithStatus) => {
    //linksWithStatus no está declarada porque se obtiene como resultado de la promesa
    console.log("Links with status:", linksWithStatus);
  
    const totalAndUnique = countTotalAndUnique(linksWithStatus);
    const brokenLinkCount = countBrokenLinks(linksWithStatus);
 
  console.log('Total Links:', totalAndUnique.total);
  console.log('Unique Links:', totalAndUnique.unique);
  console.log('Broken Links:', brokenLinkCount);
})
 
  .catch((error) => {
    console.error("Error:", error);
  }); */



// Pedir el código status HTTP -fetch o axios
//Axios aquí

//transforma en newPromise
function getStatusLinks(linksArray) {
  const promises = linksArray.map((link) => {
    return axios.get(link.href)
      .then((response) => {
        const statusText = `${response.status}`;
        const ok = response.status === 200 ? "OK" : "fail";
        return { ...link, status: statusText, ok };
      })
      .catch((error) => {
        let statusText = 'HTTP Status Code: Unknown Error';
        const ok = "fail";

        if (error.response) {
          statusText = `${error.response.status} ${error.response.statusText}`;
        }

        return { ...link, status: statusText, ok };
      });
  });

  return Promise.all(promises);
}

// Spread Syntax (...) 
// eso agrega los elementos individuales al arreglo links.

//-----------------------------Here functions for stats!!!-------------------------------------
// Count total and unique links
function countTotalAndUnique(linksArray) {
  const totalLinks = linksArray.length;

  //con Set NO sirve lenght, usar .size*
  //Set-estructura de datos Js que representa una colección de valores únicos
  const uniqueLinks = new Set(linksArray.map((link) => link.href));
  return {
    total: totalLinks,
    unique: uniqueLinks.size,
  };
}


// count broken links
function countBrokenLinks(linksArray) {
  let count = 0;
  for (const link of linksArray) {
    if (link.ok !== 'OK') {
      count++;
    }
  }
  return count;
}
/* function countBrokenLinks(linksArray) {
  return linksArray.reduce((count, link) => {
    if (link.ok !== 'OK') {
      count++;
    }
    return count;
  }, 0);
} */


//Comentario para readme2

  module.exports = {
    fileOrDirExists,
    convertToAbsolute,
    isMarkdownFile,
    readFileContent,
    getStatusLinks,
    findLinksInMarkdown,
    countTotalAndUnique,
    countBrokenLinks,
  };