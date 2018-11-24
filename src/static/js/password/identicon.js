function Identicon() {
    leftArms = ['╔', '╚', '╰', '═'];
    heads = ['█', '░', '▒', '▓', '☺', '☻'];
    rightArms = ['╗', '╝', '╯', '═'];
    miscs = ['◈', '◎', '◐', '◑', '◒', '◓', '☀', '☁', '☂', '☃', '☄', '★', '☆', '☎', '☏', '⎈', '⌂', '☘', '☢', '☣', '☕', '⌚', '⌛', '⏰', '⚡',
            '⛄', '⛅', '☔', '♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟', '♨', '♩', '♪', '♫', '⚐', '⚑', '⚔', '⚖', '⚙', '⚠',
            '⌘', '⏎', '✄', '✆', '✈', '✉', '✌'];
    colors = ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'];

    this.leftArm = leftArms[0];
    this.head = heads[0];
    this.rightArm = rightArms[0];
    this.misc = miscs[0];
    this.color = colors[0];
}

Identicon.prototype.getIdenticonText = function() {
    return this.leftArm + this.head + this.rightArm + this.misc;
}

Identicon.prototype.getIdenticonColor = function() {
    return this.color;
}

Identicon.prototype.update = function(pwd, userName) {
    // HMAC sha-256 of (pwd-bytes, fullname-bytes)
    // turn hash bytes into int array
    seed = this.getSeed(pwd, userName);
    this.leftArm = leftArms[seed[0]%leftArms.length];
    this.head = heads[seed[1]%heads.length];
    this.rightArm = rightArms[seed[2]%rightArms.length];
    this.misc = miscs[seed[3]%miscs.length];
    this.color = colors[seed[4]%colors.length];
}

Identicon.prototype.getSeed = function(key, data) {
    hash = CryptoJS.HmacSHA256(data, key);
    var seed = new Uint32Array(hash.words.length);
    var seedview = new DataView(seed.buffer, seed.byteOffset, seed.byteLength);

    for(var i=0; i<hash.words.length; i++) {
	seedview.setUint32(i*4, hash.words[i]);
    }

    return seed;
}

//Identicon.prototype.getSeed = function(key, data) {
//   return this.key.then(function (key) {
//	// Create crypto-js WordArrays from Uint8Arrays data and key
//	data = CryptoJS.lib.WordArray.create(data);
//	key  = CryptoJS.lib.WordArray.create(key);
//	
//	// Sign data using HMAC-SHA-256 w/ key
//	return CryptoJS.HmacSHA256(data, key)/*= seed*/;
//   }).then(function (hash) {
//	// Create seed array and a DataView representing it
//	let seed     = new Uint8Array(hash.words.length * 4/*sizeof(int32)*/);
//	let seedView = new DataView(seed.buffer, seed.byteOffset, seed.byteLength);
//	
//	// Loop over hash.words which are INT32
//	for (let i = 0; i < hash.words.length; i++) {
//		// Set seed[i*4,i*4+4] to hash.words[i] INT32 in big-endian form
//		seedView.setInt32(i * 4/*sizeof(int32)*/, hash.words[i], false/*big-endian*/);
//	}
//	
//	// Return the seed Uint8Array
//	return seed;
//    });
//}
