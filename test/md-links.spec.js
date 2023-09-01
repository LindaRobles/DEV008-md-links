const mdLinks = require("../index.js");
const {
  fileOrDirExists,
  convertToAbsolute,
  isMarkdownFile,
  readFileContent,
} = require("../functions");

// Test fileOrDirExists
describe("fileOrDirExists", () => {
  it("debe regresar true si existe archivo o directorio", () => {
    expect(fileOrDirExists("./README.md")).toBe(true);
  });

  it("debe regresar falso si no existe archivo o directorio", () => {
    expect(fileOrDirExists("./ejemplofalso.txt")).toBe(false);
  });
});

// Test convertToAbsolute
describe("convertToAbsolute", () => {
  it("debe convertir ruta relativa a ruta absoluta", () => {
    const relativePath = "./index.js";
    const expectedAbsolutePath = "D:\\Laboratoria\\DEV008-md-links\\index.js";
    const convertedPath = convertToAbsolute(relativePath); 
    expect(convertedPath).toBe(expectedAbsolutePath);
  });
});

//Test isMarkdownFile
describe("isMarkdownFile", () => {
  it("debe mostrar true si es archivo markdown", () => {
    const filePath = "./README.md";
    expect(isMarkdownFile(filePath)).toBe(true);
  });

  it("debe mostrar true si es archivo markdown", () => {
    const filePath = "./index.js";
    expect(isMarkdownFile(filePath)).toBe(false);
  });
});
