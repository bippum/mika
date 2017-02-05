const request = require('request')
const BaseURL = require('../constants').BaseURL
const queryString = require('../util/queryString')

/**
 * Returns an array of 100 randomly sampled public match shells.
 * @param {Object} [{}] options - An object of options to query for (see https://docs.opendota.com/#tag/public-matches%2Fpaths%2F~1publicMatches%2Fget query paramanters for more details)
 */
function getPublicMatches(options) {
    let query = options ? `?${queryString(options)}` : ``
    return new Promise((resolve, reject) => {
        this.bucket.enqueue(function () {
            request(`${BaseURL}/publicMatches${query}`, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject(response)
                }
            })
        })
    })
}

module.exports = getPublicMatches