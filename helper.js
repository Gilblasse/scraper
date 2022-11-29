function sanitizeMovieTitle(title) {
    return title.split(/\s/).filter(c => c.length > 0).join(' ')
}

const sanatizeFeatureUserResponse = ans => {
    console.log({ans})
    return ans.replace(/[\s\n]/,'')[0].toLowerCase()
}

module.exports = {sanitizeMovieTitle, sanatizeFeatureUserResponse}