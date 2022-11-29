async function searchMovieScrapper({page, selections, title}){
    const data = [[]]
    const searchBoxSelector = "input[name='movieTitle']"
    const movieCardsSelector = '//*[@id="root"]/div/main/div[2]/div[2]/div/div/div/div/button/div[2]/p'
    const buttons = '//*[@id="root"]/div/main/div[2]/div[2]/div/div/div/div/button'
    
    await page.waitForSelector(searchBoxSelector);
    await page.type(searchBoxSelector, title)

    const movieNodesArrArray = await page.$x(movieCardsSelector)
    const movieButtons = await page.$x(buttons)

    for (const movieNodeArry of movieNodesArrArray.slice(0,selections * 2)){
        const val = await movieNodeArry.evaluate((node) => node?.innerText ? node.innerText : node.children[0].innerText )
        data[data.length - 1].length !== 2 ? data[data.length - 1].push(val) : data.push([val])
    }

    return {movieButtons, movieDetails: data}
}

module.exports = searchMovieScrapper