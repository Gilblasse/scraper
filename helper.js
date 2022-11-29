function sanitizeMovieTitle(title) {
    return title.split(/\s/).filter(c => c.length > 0).join(' ')
}

const sanatizeFeatureUserResponse = ans => {
    if(ans.length === 0 ){
        return ans
    }
    return ans.replace(/[\s\n]/,'')[0].toLowerCase()
}

module.exports = {sanitizeMovieTitle, sanatizeFeatureUserResponse}