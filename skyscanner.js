var unirest = require("unirest");

let country = "SG"
let currency = "SGD"
let locale = "en-US"
let originplace = "SIN"
let destinationplace = "DE"
let outboundpartialdate = "2020-12-01"
let inboundpartialdate = "2021-01"

var request = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}`);
request.query({
	"inboundpartialdate": inboundpartialdate
});
request.headers({
	"x-rapidapi-key": "APIKEY",
	"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
	"useQueryString": true
});
request.end(function (res) {
	if (res.error) throw new Error(res.error);
    console.log(res.body);
    console.log(res.body.Quotes[0].OutboundLeg);
});