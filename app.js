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

// Walker options
const walker  = walk.walk('/Users/allymcgilloway/courses/course_java/week_1/day_1/intelliJ_and_git', { followLinks: false });

walker.on('file', (root, file, next) => {
  if (file.name.slice(-3) === '.md'){
    let pdfDoc = file.name.replace(".md", ".pdf");
    options.imagePath = root;
    markdownpdf(options).from(root + "/" + file.name).to("./out/" + root + "/" + pdfDoc, function () {
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
