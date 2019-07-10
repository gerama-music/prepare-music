const fs = require("fs");
const NodeID3 = require("node-id3");
const { execSync } = require("child_process");

fs.readdir("./", function (err, files) {
  if (err) throw err;

  files
    .filter(function (file) {
      return file.match(/\.zip$/g);
    })
    .forEach(function (file) {
      const directory = file.replace('.zip', '');
      if (fs.existsSync(directory))
        execSync(`rm -rf "${directory}"`);

      execSync(`unzip "${file}"`);

      fs.readdir(directory, function (err, musics) {
        if (err) throw err;

        musics
          .filter(function (music) {
            return music.match(/\.mp3$/g);
          })
          .forEach(function (music) {
            let tags = NodeID3.read(`./${directory}/${music}`);

            tags.copyright = "Gerama.ir";
            tags.comment.text = "Gerama.ir";
            tags.image.description = "Gerama.ir";

            NodeID3.update(tags, `./${directory}/${music}`);
          });
      });
    });
});