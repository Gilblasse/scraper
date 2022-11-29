const puppeteer = require("puppeteer");
const promptSync = require("prompt-sync")
const open = require("open")
const _ = require('lodash')
const browserConfigurations = require("./config")

const prompt = promptSync({ sigint: true })


function sanitizeMovieTitle(title) {
    return title.split(/\s/).filter(c => c.length > 0).join(' ')
}

async function configureBrowser(){
    const browser = await puppeteer.launch(browserConfigurations);
    const page = await browser.newPage();
    await page.goto('https://movie-tyme.netlify.app/');

    return [browser,page]
}

async function WebScrapper(page){
    const categories = []

    await page.waitForSelector('.MuiTypography-root.MuiTypography-h5');
    const featuredTitle = await(await page.$('.MuiTypography-root.MuiTypography-h5')).evaluate(n => n.innerText)
    const featuredImage = await(await page.$('.MuiGrid-root.MuiGrid-item')).evaluate(n => n.style.background.slice(4).split('"')[1])
    
    await page.click('.MuiGrid-root.MuiGrid-container')
    const movieUrl = page.url()

    await page.waitForSelector('.MuiTypography-root.MuiTypography-h5');
    const movieCategoriesSelector = '.show-movie__video-info .show-movie__video-genres .MuiChip-label'
    
    await page.waitForSelector(movieCategoriesSelector);
    const categoriesNodes = await page.$$(movieCategoriesSelector)

    for (const category of categoriesNodes){
        const ctagory = await category.evaluate( node => node.innerText)
        categories.push(ctagory)
    }

    console.log({featuredTitle, featuredImage, categories})
    
    await page.close();

    const answer = prompt("Would you like to See this Movie? ")
    const isVisitWebsite = answer.replace(/[\s\n]/,'')[0].toLowerCase()

    if(isVisitWebsite === 'y'){
        open(movieUrl)
    }
}

async function searchingMovie(page) {
    const selections = 5
    const searchBoxSelector = "input[name='movieTitle']"
    const movieCardsSelector = '//*[@id="root"]/div/main/div[2]/div[2]/div/div/div/div/button/div[2]/p'
    const buttons = '//*[@id="root"]/div/main/div[2]/div[2]/div/div/div/div/button'
    await page.waitForSelector(searchBoxSelector);

    const userMovieTitle = prompt("Search By Movie Title: ")
    const title = sanitizeMovieTitle(userMovieTitle)
    
    await page.type(searchBoxSelector, title)
    const movieNodesArrArray = await page.$x(movieCardsSelector)
    const buttonArray = await page.$x(buttons)

    const data = [[]]
    for (const [i, movieNodeArry] of movieNodesArrArray.slice(0,selections * 2).entries()){
        const val = await movieNodeArry.evaluate((node) => node?.innerText ? node.innerText : node.children[0].innerText )
        data[data.length - 1].length !== 2 ? data[data.length - 1].push(val) : data.push([val])
    }

    const movieSelections = data.map(([title, date], i) => `${i + 1}. ${title} - ${date}`)
    
    console.log(data[0][0] ? movieSelections : "Sorry Can't find it...")
    if(data[0][0]){
        let selected = 0
        while(!_.inRange(selected, 1, selections + 1) ){
            selected = prompt('Select Movie By Number: ')
        }
        
        await buttonArray[selected - 1].click()
        const movieUrl = page.url()
        open(movieUrl)
    }
}

async function menu() {
    const [browser,page] = await configureBrowser()
    const menuSelection = prompt("1. Featured  |  2. Search For Movie  |  3. Any key to Exit:  ")

    switch (menuSelection) {
        case "1":
            await WebScrapper(page)
            menu()
        break;

        case "2":
            await searchingMovie(page)
            menu()
        break;

        default:
            console.log('exiting...')
        break;
    }

    browser.close()
}

menu()
