function sanitizeMovieTitle(title) {
    return title.split(/\s/).filter(c => c.length > 0).join(' ')
}

const sanatizeFeatureUserResponse = ans => {
    if(ans.length === 0 ){
        return ans
    }
    return ans.replace(/[\s\n]/,'')[0].toLowerCase()
}

const logColor = text => {
    console.log('\x1b[36m%s\x1b[0m', text);
}

module.exports = {sanitizeMovieTitle, sanatizeFeatureUserResponse, logColor}