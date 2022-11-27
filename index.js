const puppeteer = require("puppeteer");

async function WebScrapper(){
	const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://developers.google.com/web/');

    // const page = await browserPage.evaluate(resultsSelector => {
    //     console.log({ resultsSelector })
    //     return [...document.querySelectorAll(resultsSelector)]
    // })
    await page.type('.devsite-search-field', 'Headless Chrome');

    // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = '.devsite-suggest-all-results';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector)

  // Wait for the results page to load and display the results.
  const resultsSelector = '.gsc-results .gs-title';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    console.log({resultsSelector})
    return [...document.querySelectorAll(resultsSelector)].map(anchor => {
        console.log({anchor: anchor.textContent })
      const title = anchor.textContent.split('|')[0].trim();
      console.log({title})
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);

  // Print all the files.
  console.log({links});
	console.log({ page })
	await browser.close();
}

WebScrapper()
