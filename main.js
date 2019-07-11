const fs = require("fs");

fs.readdir("./download", function (err, composers) {
  if (err) throw err;

  composers
    .filter(function (composer) {
      return fs.statSync(composer).isDirectory();
    })
    .forEach(function (composer) {
      fs.readdir(`./download/${composer}`, function (err, albums) {
        if (err) throw err;

        albums
          .filter(function (album) {
            return fs.statSync(album).isDirectory();
          })
          .forEach(function (album) {

          });
      });
    });
});