const markdownpdf = require("markdown-pdf")
const fs = require("fs")
const walk = require('walk');
const files = [];
let basePath = '';

const options = {
  cssPath: "./css/github.css",
  remarkable: {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true
  }
}

// Change path to full path to local repo folder (e.g. /Users/username/course_java)
const walker  = walk.walk('/Users/allymcgilloway/courses/course_java/week_1/day_1', { followLinks: false });

walker.on('file', (root, file, next) => {
  if (file.name.slice(-3) === '.md'){
    let pdfDoc = file.name.replace(".md", ".pdf");
    options.imagePath = root;
    let pathParts = root.split('/');
    // Change course name as required
    let basePath = pathParts.slice(pathParts.indexOf('course_java')).join("/");
    markdownpdf(options).from(root + "/" + file.name).to("./out/" + basePath + "/" + pdfDoc, function () {
  console.log("Created", pdfDoc);
});
  }
  next();
});

walker.on('end', () => {
  console.log("Done");

  // let bookPath = "/Users/allymcgilloway/notes/book.pdf"
  //
  // markdownpdf(options).concat.from(mdDocs).to(bookPath, function () {
  //   console.log(options.cssPath);
  //   console.log("Created", bookPath)
  // })
});
