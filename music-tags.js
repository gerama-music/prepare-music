const fs = require("fs");
const NodeID3 = require("node-id3");
const {
	execSync
} = require("child_process");

export default function musicTagEditor(directory) {
	fs.readdir(directory, function (err, files) {
		if (err) throw err;
	
		files
			.filter(function (file) {
				return file.match(/\.zip$/g);
			})
			.forEach(function (file) {
				extractMusic(file);
	
				fs.readdir(`./${directory}/musics`, function (err, musics) {
					if (err) throw err;
	
					musics
						.filter(function (music) {
							return music.match(/\.mp3$/g);
						})
						.forEach(function (music) {
							editMusicTags(music, directory);
						});
				});
			});
	});
}

function extractMusic(file) {
	const directory = file.replace('.zip', '');
	if (fs.existsSync(directory))
		execSync(`rm -rf "${directory}"`);
	execSync(`unzip "${file}"`);
	if (fs.existsSync(`./${directory}/musics`))
		execSync(`rm -rf musics`);
	execSync(`mv "${directory}" musics`);
}

function editMusicTags(music, directory) {
	let tags = NodeID3.read(`./${directory}/musics/${music}`);
	tags.copyright = "Gerama.ir";
	tags.comment.text = "Gerama.ir";
	tags.image.description = "Gerama.ir";
	NodeID3.update(tags, `./${directory}/musics/${music}`);
}