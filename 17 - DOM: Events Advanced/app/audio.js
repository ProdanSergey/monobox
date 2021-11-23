(() => {
	const rocks = new Audio('media/sample.mp3');

	rocks.loop = true,
	rocks.volume = 1,
	rocks.type = 'audio/mpeg',

	rocks.addEventListener("canplaythrough", () => {
		rocks.play();
	});

	document.body.append(rocks);
})();

