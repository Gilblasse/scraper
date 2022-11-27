const puppeteer = require("puppeteer");

async function WebScrapper(){
	const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://marketingplatform.google.com/about/partners/find-a-partner');
    await page.waitForSelector('div.landscape h3.title a')

    const searchValue = await page.waitForSelector('div.landscape h3.title a')
    console.log({searchValue})
	await browser.close();
}

WebScrapper()
