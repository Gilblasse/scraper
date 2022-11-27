const puppeteer = require("puppeteer");

async function WebScrapper(){
	const browser = await puppeteer.launch();
    const browserPage = await browser.newPage();
    await browserPage.goto('https://html.com/resources/free-html-templates/');	

    const page = await browserPage.evaluate(resultsSelector => {
        console.log({ resultsSelector })
        return [...document.querySelectorAll(resultsSelector)]
    })

	console.log({ page })
	await browser.close();
}

WebScrapper()
