const puppeteer = require("puppeteer");

const indeedSignInButtonPath = '//*[@id="gnav-main-container"]/div/div/div[2]/div[2]/div[2]/a'

async function WebScrapper(){
	const browser = await puppeteer.launch({
        executablePath: process.env.CHROMIUM_PATH,
        // headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.indeed.com/');
    
    console.log('At indeed.com just wating for sign in button...')
    await page.waitForSelector(indeedSignInButtonPath);

    console.log('Selecting Signin Button')
    const movieButtons = await page.$x(indeedSignInButtonPath)

    console.log({movieButtons})
	await browser.close();
}


module.exports = WebScrapper