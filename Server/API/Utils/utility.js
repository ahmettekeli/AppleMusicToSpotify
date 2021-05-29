import puppeteer from "puppeteer";

export const scrap = async (url) => {
	try {
		const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
		const page = await browser.newPage();
		await page.goto(url);

		const data = await page.evaluate(() => {
			const songSelector = "songs-list-row__song-name",
				artistSelector = "songs-list__col songs-list__col--artist typography-body",
				albumSelector = "songs-list__col songs-list__col--album typography-body",
				songs = document.getElementsByClassName(songSelector),
				artists = document.getElementsByClassName(artistSelector),
				albums = document.getElementsByClassName(albumSelector);
			let playlist = [];
			for (let index = 0; index < songs.length; index++) {
				playlist.push({
					song: songs[index].innerText,
					artist: artists[index].children[0].children[0].innerText,
					album: albums[index].children[0].children[0].children[0].innerText,
				});
			}
			return playlist;
		});
		await browser.close();
		return data;
	} catch (error) {
		console.log(`Error:${error}`);
	}
};
export const generateRandomString = function (length) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};
