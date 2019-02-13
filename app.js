const markdownpdf = require("markdown-pdf")
const fs = require("fs")
const walk = require('walk');
const mv = require('mv');

// Change path to full path to local repo folder (e.g. /Users/username/course_java)
const input_path = '/Users/allymcgilloway/courses/course_intro_to_programming';

// Change to name of module as appears on Github
const module_name = 'course_intro_to_programming';
const options = {
  cssPath: "./css/github.css",
  remarkable: {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true
  }
}


const walker  = walk.walk(input_path, { followLinks: false });

walker.on('file', (root, file, next) => {
  let pathParts = root.split('/');
  let basePath = pathParts.slice(pathParts.indexOf(module_name)).join("/");
  if (file.name.slice(-3) === '.md'){
    let pdfDoc = file.name.replace(".md", ".pdf");
    options.imagePath = root;
    markdownpdf(options).from(root + `/${file.name}`).to(`./out/${basePath}/${pdfDoc}`, function () {
      console.log("Created", pdfDoc);
    });
  } else {

    fs.copyFile(root + `/${file.name}`, `./out/${basePath}/${file.name}`, (err) => {
      if (err){
        console.log("Error", err);
      }
    })
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
