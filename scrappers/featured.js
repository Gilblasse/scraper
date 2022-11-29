async function featuredScrapper(page){
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

    return {featuredTitle, featuredImage, categories}
}

module.exports = featuredScrapper