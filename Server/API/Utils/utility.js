import puppeteer from "puppeteer";

export const scrap = async (url) => {
		try {
			const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
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
	export const generateRandomString = function (length) {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

// export default { scrap, generateRandomString };