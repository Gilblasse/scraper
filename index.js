const { inRange } = require('lodash')
const {open, prompt} = require('./utils')
const configureBrowser = require("./config")
const testScraper = require('./sample')
const featuredScrapper = require('./scrappers/featured')
const searchMovieScrapper = require('./scrappers/searchingMovie')
const { sanitizeMovieTitle, sanatizeFeatureUserResponse, logColor } = require('./helper')


async function menu() {
    const [browser, page] = await configureBrowser()
    const menuSelection = prompt("1. Featured  |  2. Search For Movie  |  3. Any key to Exit:  ")

    switch (menuSelection) {
        case "1":
            await featuredMovie(page)
            menu()
        break;

        case "2":
            await searchingMovie(page)
            menu()
        break;

        default:
            console.log('Exiting ...')
        break;
    }

    browser.close()
}

async function featuredMovie(page){
    const {featuredTitle, featuredImage, categories, movieLink} = await featuredScrapper(page)

    await page.close();

    logColor(`
    ${featuredTitle}
    Image Cover: ${featuredImage}
    Categories: ${categories.join(" | ")}
    `)

    const answer = prompt("Would you like to See this Movie? ")
    const response = sanatizeFeatureUserResponse(answer)

    if(response === 'y'){
        open(movieLink)
    }
}

async function searchingMovie(page) {
    const selections = 5
    const userMovieTitle = prompt("Search By Movie Title: ")
    const title = sanitizeMovieTitle(userMovieTitle)
    const {movieButtons, movieDetails} = await searchMovieScrapper({page, selections, title})

    const movieSelections = movieDetails.map(([title, date], i) => `${i + 1}. ${title} - ${date}`)
    
    logColor(movieDetails[0][0] ? movieSelections : "Sorry Can't find it...")

    if(movieDetails[0][0]){
        let selected = 0
        while(!inRange(selected, 1, selections + 1) ){
            selected = prompt('Select Movie By Number: ')
        }
        
        await movieButtons[selected - 1].click()
        const movieUrl = page.url()
        open(movieUrl)
    }
}


// menu()
testScraper()
