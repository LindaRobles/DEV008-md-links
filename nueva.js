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

/*   readFileContent('index.js')
  .then((data) =>{
    console.log(data)
  })
  .catch((error) =>{
    console.log(error);
  }) */
const filePath = 'extra.md'; 

function getLinks(filePath){
  
  
  readFileContent(filePath)
  .then((data) =>{
    const exp = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g;
    const links = [];
    const matchedLinks = data.matchAll(exp);
    console.log(matchedLinks);
  if (matchedLinks !== null){
    for (let link of matchedLinks){
      links.push({
        
        href: link
      })
    }
  }
  console.log(links);
  })
  .catch((error) =>{
    console.log(error);
  })
}

getLinks('./extra.md')

  
// Pedir el código status HTTP -fetch o axios
//Axios aquí

//transforma en newPromise
function getStatusLinks(linksArray) {
  const results = [];

  return new Promise((resolve, reject) =>{
    linksArray.forEach((link) => {
      axios.get(link.url)
      .then((result) => {
        resolve(console.log(result));
        //results.push({ ...link, status: 'HTTP Status Code: 200 OK'});
      })
      .catch(() => {
        //results.push({ ...link, status: 'HTTP'})
      })
    })
  })
}

//console.log(getStatusLinks(findLinksInMarkdown(readFileContent(filePath))))    
//console.log(getStatusLinks(findLinksInMarkdown('./extra.md', callback )));



/* axios.get('https://ejemplo.com')
  .then(() => {
    console.log('HTTP Status Code: 200 OK');
  })
  .catch(() => {
    console.log('HTTP Status Code: 404 Not Found');
  }); */

  // validar links

  module.exports = {
    fileOrDirExists,
    convertToAbsolute,
    isMarkdownFile,
    readFileContent,
  };
