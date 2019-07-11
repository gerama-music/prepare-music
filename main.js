const fs = require("fs");
const NodeID3 = require("node-id3");
const {
  execSync
} = require("child_process");

fs.readdir("./", function (err, files) {
  if (err) throw err;

  files
    .filter(function (file) {
      return file.match(/\.zip$/g);
    })
    .forEach(function (file) {
      extractMusic(file);

      fs.readdir('./musics', function (err, musics) {
        if (err) throw err;

        musics
          .filter(function (music) {
            return music.match(/\.mp3$/g);
          })
          .forEach(function (music) {
            editMusicTags(music);
          });
      });
    });
});

fs.readdir("./download", function (err, composers) {
  if (err) throw err;

  composers
    .filter(function (composer) {
      return fs.statSync(composer).isDirectory();
    })
    .forEach(function (composer) {

    });
});

function extractMusic(file) {
  const directory = file.replace('.zip', '');
  if (fs.existsSync(directory))
    execSync(`rm -rf "${directory}"`);
  execSync(`unzip "${file}"`);
  if (fs.existsSync('./musics'))
    execSync(`rm -rf musics`);
  execSync(`mv "${directory}" musics`);
}

function editMusicTags(music) {
  let tags = NodeID3.read(`./musics/${music}`);
  tags.copyright = "Gerama.ir";
  tags.comment.text = "Gerama.ir";
  tags.image.description = "Gerama.ir";
  NodeID3.update(tags, `./musics/${music}`);
}