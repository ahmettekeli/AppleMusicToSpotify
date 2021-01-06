const puppeteer = require("puppeteer");
// const scrapUrl = "https://music.apple.com/us/playlist/inspired-by-808s-heartbreak/pl.2faffa602c8644b5a840e4359e265503";

const scrap = async (url) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);

		const data = await page.evaluate(() => {
			let playlist = [];
			const songs = document.querySelectorAll("div.row.track.web-preview.song");
			songs.forEach((element) => {
				playlist.push({
					song: element.children[1].children[0].children[0].children[0].children[0].innerText,
					artist: element.children[1].children[0].children[0].children[0].children[1].innerText,
					album: element.children[2].children[0].children[0].children[0].innerText,
				});
			});

			return playlist;
		});
		await browser.close();
		return data;
	} catch (error) {
		console.log(`Error:${error}`);
	}
};

module.exports = { scrap };
