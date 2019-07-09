const fs = require("fs");
const NodeID3 = require("node-id3");
const { execSync } = require("child_process");

fs.readdir("./", function(err, files) {
  if (err) throw err;

  files
    .filter(function(file) {
      return file.match(/\.(zip|rar)$/g);
    })
    .forEach(function(file) {
      execSync(`mkdir musics`);
      execSync(`rar e ${file} musics`);

      let tags = NodeID3.read("./music.mp3");

      tags.copyright = "Gerama.ir";
      tags.comment.text = "Gerama.ir";
      tags.image.description = "Gerama.ir";

      NodeID3.update(tags, "./music.mp3");
    });
});
