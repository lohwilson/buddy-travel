const fetch = require('node-fetch')

// let Country
// async function getCountry () {
//     const response = await fetch('https://restcountries.eu/rest/v2/all')
//     Country = await response.json()
//     console.log(Country[0]);
// }
// getCountry()

module.exports = {
    async getCountry () {
        const response = await fetch('https://restcountries.eu/rest/v2/all')
        const country = await response.json()
        return country
    }
}