const NodeID3 = require('node-id3');

let tags = NodeID3.read('./music.mp3');

console.log(tags);

tags.copyright = 'Gerama.ir';
tags.comment.text = 'Gerama.ir';
tags.image.description = 'Gerama.ir';


NodeID3.update(tags, './music.mp3');