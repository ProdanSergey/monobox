const fs = require("fs");
const path = require("path");

const readStream = fs.createReadStream(path.resolve(__dirname, "long.txt"));

const writeStream = fs.createWriteStream(path.resolve(__dirname, "copy.txt"));

readStream.on("open", () => {
	console.log("---------");
	console.log("stream is opened");
	console.log("---------");
});

readStream.on("data", (chunk) => {
	console.log("---------");
	console.log("data chunk");
	console.log("---------");

	// writeStream.write(chunk);
});

readStream.on("end", () => {
	console.log("---------");
	console.log("stream is ended");
	console.log("---------");

	// writeStream.close();
});

writeStream.on("finish", () => {
	console.log("---------");
	console.log("data is copied");
	console.log("---------");
});

readStream.pipe(writeStream);
