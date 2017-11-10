const marky = require("marky-markdown"),
  butternut = require('butternut'),
  fs = require("fs");

const template = fs.readFileSync("./page-template.html", "utf8");
fs.readdir("MarkdownFiles", function(err, files) {
  for (let i = 0; i < files.length; i++) {
    //  underscore for drafts      || only markdown files please
    if (files[i].charAt(0) === "_" || !files[i].match(".md$")) {
      console.log(" x " + files[i]);
      continue;
    }
    var name = files[i].substr(0, files[i].length - 3);
    var code = "";
    var codeExists = fs.existsSync("CodeExamples/" + name + ".js");
    if (codeExists) {
      code = fs.readFileSync("CodeExamples/" + name + ".js", "utf8").trim();
    } else {
        continue;
    }
    console.log(" + " + name, codeExists);
    // console.log(' + ' + files[i]);
    const text = fs.readFileSync("MarkdownFiles/" + files[i], "utf8");
    const markdown = marky(text.replace("{{ code }}", code.replace("    canvas.parent('sketch');\n", "")), {
      enableHeadingLinkIcons: false,
      prefixHeadingIds: false,
      sanitize: false,
    });
    const html = template
      .replace("{{ markdown }}", markdown)
      .replace("{{ code }}", code);
    fs.writeFileSync("Website_Test/" + name + ".html", html, "utf8");
  }
  console.log("---");
});
