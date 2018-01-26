const marky = require("marky-markdown"),
  butternut = require('butternut'),
  fs = require("fs");

const order = ['index', 'table_of_contents', 'license', 'what_you_should_already_know', 'point-point', 'point-circle', 'circle-circle', 'section_1_challenges', 'point-rect', 'rect-rect', 'circle-rect', 'section_2_challenges', 'line-point', 'line-circle', 'line-line', 'line-rect', 'section_3_challenges', 'poly-point', 'poly-circle', 'poly-rect', 'poly-line', 'poly-poly', 'section_4_challenges', 'tri-point', 'where_are_the_other_triangle_examples', 'section_5_challenges', 'object_oriented_collision', 'thanks' ];

const template = fs.readFileSync("./page-template.html", "utf8");
fs.readdir("MarkdownFiles", function(err, files) {
  for (let i = 0; i < files.length; i++) {
    //  underscore for drafts      || only markdown files please
    if (files[i].charAt(0) === "_" || !files[i].match(".md$")) {
      console.log(" x " + files[i]);
      continue;
    }
    var name = files[i].substr(0, files[i].length - 3);
    // Code Examples source
    var code = "";
    var codeExists = fs.existsSync("CodeExamples/" + name + ".js");
    if (codeExists) {
      code = fs.readFileSync("CodeExamples/" + name + ".js", "utf8").trim();
    } else {
        continue;
    }
    console.log(" + " + name, codeExists);
    const text = fs.readFileSync("MarkdownFiles/" + files[i], "utf8");
    const markdown = marky(text.replace("{{ code }}", code.replace("    canvas.parent('sketch');\n", "")), {
      enableHeadingLinkIcons: false,
      prefixHeadingIds: false,
      sanitize: false,
    });
    // Prev - Next
    const orderIndex = order.indexOf(name);
    var prev = '<span id="prev">&nbsp;</span>';
    var next = '<span id="next">&nbsp;</span>';
    if (orderIndex > 0) {
      prev = '<a href="' + order[orderIndex - 1] + '.html" id="prev">&larr;</a>';
    }
    if (orderIndex < order.length - 1) {
      next = '<a href="' + order[orderIndex + 1] + '.html" id="next">&rarr;</a>';
    }
    // Write through template
    const html = template
      .replace("{{ prev }}", prev)
      .replace("{{ next }}", next)
      .replace("{{ markdown }}", markdown)
      .replace("{{ code }}", code);
    fs.writeFileSync("Website_Test/" + name + ".html", html, "utf8");
  }
  console.log("---");
});
