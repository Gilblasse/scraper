const puppeteer = require("puppeteer");

const browserConfigurations = {
    executablePath: process.env.CHROMIUM_PATH,
    // headless: false,
}

async function configureBrowser(){
    const browser = await puppeteer.launch(browserConfigurations);
    const page = await browser.newPage();
    await page.goto('https://movie-tyme.netlify.app/');

    return [browser,page]
}


module.exports = configureBrowser