const markdownpdf = require("markdown-pdf")
const fs = require("fs")
const walk = require('walk');
const mv = require('mv');
const zipFolder = require('zip-a-folder');

// Change path to full path to local repo folder (e.g. /Users/username/course_java)
const input_path = '/Users/allymcgilloway/projects/vue';

// Change to name of module as appears on Github
const module_name = 'vue';
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

walker.on('directory', (root, folder, next) => {
  let pathParts = root.split('/');
  let basePath = pathParts.slice(pathParts.indexOf(module_name)).join("/");
  if (folder.name.includes('start') || folder.name.includes('end') || folder.name.includes('solution')){
    zipFolder.zipFolder(root + '/' + folder.name, root + '/' + folder.name + '.zip', function(err) {
            if(err) {
                console.log('Something went wrong!', err);
            }
        });
      } else {
        console.log("NOT DONE");
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
