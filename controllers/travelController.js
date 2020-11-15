const fetch = require('node-fetch')
const db = require('../db')
const moment = require('moment');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config();
// const twilioAPI = process.env.twilioAPI
// const twilioAUTH = process.env.twilioAUTH
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY
const RAPID_API_KEY = process.env.RAPID_API_KEY
// const TRAVEL_API_KEY 
const unirest = require("unirest");
const { getCountry } = require('../models/country');

global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const unsplash = new Unsplash({ accessKey: UNSPLASH_API_KEY });

module.exports = {
    async newTripForm (req, res) {
        try {
            const country = await getCountry()
            return res.render('travel/new', { currentUser: req.session.currentUser, country });
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async create (req, res) {
        try {
            ////////////////////////////////////    COUNTRY API    //////////////////////////////////////////
            const country = await getCountry()

            let countryIndex, capital, flag, population, timezones, currencies
            const countryName = req.body.country
            for (let i = 0; i < country.length; i++){
                if (countryName === country[i].name){
                    countryIndex = i
                    capital = country[countryIndex].capital
                    flag = country[countryIndex].flag
                    population = country[countryIndex].population
                    timezones = country[countryIndex].timezones
                    currencies = country[countryIndex].currencies[0]
                    alpha2Code = country[countryIndex].alpha2Code
                    latlng = country[countryIndex].latlng
                    latitude = country[countryIndex].latlng[0]
                    longitude = country[countryIndex].latlng[1]
                }
            }

            let currentDate = moment(new Date()).format("YYYYMMDD")
            let selectedDate = moment(req.body.depart).format("YYYYMMDD")
            let isCompleted 
            if(selectedDate < currentDate){
                isCompleted = true
            } else {
                isCompleted = false
            }
            ////////////////////////////////////    COUNTRY API    //////////////////////////////////////////

            ////////////////////////////////////    CURRENCY API    //////////////////////////////////////////
            let query1, query2
            query1 = 'SGD'
            query2 = currencies.code
            const response1 = await fetch(`https://free.currconv.com/api/v7/convert?apiKey=${CURRENCY_API_KEY}&q=${query1}_${query2}&compact=ultra`)
            let result1 = await response1.json()
            let newResult = Object.entries(result1)
            let exchangeRate = (newResult[0][1]).toFixed(2)
            // let exchangeRate = 1

            ////////////////////////////////////    CURRENCY API    //////////////////////////////////////////

            //////////////////////////////////////    HOTELS API    //////////////////////////////////////////
            // // let countryName = travel.country.name
            // const hotelResponse = await fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${countryName}&locale=en_US`, {
            //                         "method": "GET",
            //                         "headers": {
            //                             "x-rapidapi-key": RAPID_API_KEY,
            //                             "x-rapidapi-host": "hotels4.p.rapidapi.com"
            //                         }
            //                     })
            // const hotelResult = await hotelResponse.json()
            // // console.log(hotelResult);
            // // console.log(hotelResult.suggestions[0].entities);
            // // console.log(hotelResult.suggestions[0].entities[0].destinationId);

            // let entity0 = hotelResult.suggestions[0].entities
            // let entity1 = hotelResult.suggestions[1].entities
            // let entity2 = hotelResult.suggestions[2].entities
            // let entity3 = hotelResult.suggestions[3].entities
            // let entity0Id = []
            // let entity1Id = []
            // let entity2Id = []
            // let entity3Id = []

            // // let entity = hotelResult.suggestions
            // // for (let i = 0; i < entity.length; i++){
            // //     for (let j = 0; j < entity[i].entities.length; j++){
                    
            // //     }
            // // }

            // for (let i = 0; i < entity0.length; i++){
            //     entity0Id.push(entity0[i].destinationId)
            // }
            // // console.log(entity0Id)

            // for (let i = 0; i < entity1.length; i++){
            //     entity1Id.push(entity1[i].landmarkCityDestinationId)
            // }
            // // console.log(entity1Id)

            // for (let i = 0; i < entity2.length; i++){
            //     entity2Id.push(entity2[i].destinationId)
            // }
            // // console.log(entity2Id)

            // for (let i = 0; i < entity3.length; i++){
            //     entity3Id.push(entity3[i].destinationId)
            // }
            // // console.log(entity3Id)

            //////////////////////////////////////    HOTELS API    //////////////////////////////////////////

            ////////////////////////////////////    UNSPLASH API    //////////////////////////////////////////
            const unsplashResponse = await unsplash.search.photos(countryName, 1, 30, { orientation: "landscape", collections: ['scenery'] })
            const unsplashResult = await unsplashResponse.json()
            let pictureResult = unsplashResult.results
            let countryImages = []
            for(let i = 0; i < pictureResult.length; i++){
                countryImages.push(pictureResult[i].urls.full)
            }
            ////////////////////////////////////    UNSPLASH API    //////////////////////////////////////////

            const item = {
                username: req.session.currentUser.username,
                country: {
                        name: req.body.country,
                        capital:  capital,
                        flag: flag,
                        population: population,
                        timezones: timezones,
                        currencies: currencies,
                        alpha2Code: alpha2Code,
                        latitude: latitude,
                        longitude: longitude
                    },
                outBoundDate: req.body.arrive,
                inBoundDate: req.body.depart,
                flight: {
                        airline: req.body.airline,
                        time: req.body.flightTime,
                        flightNo: req.body.flightNo,
                        airport: req.body.airport,
                        price: req.body.flightPrice
                    },
                accommodation: {
                        name: req.body.accommodationName,
                        address: req.body.accommodationAddress,
                        price:  req.body.accommodationPrice,
                        // type: {
                        //     id0: {
                        //         id: entity0Id
                        //     },
                        //     id1: {
                        //         id: entity1Id
                        //     },
                        //     id2: {
                        //         id: entity2Id
                        //     },
                        //     id3: {
                        //         id: entity3Id
                        //     }
                        // }
                    },
                budget: {
                        allocated: req.body.allocatedBudget,
                        actual : req.body.actualBudget
                    },
                notes: req.body.notes,
                completed : isCompleted,
                exchangeRate: exchangeRate,
                images: countryImages
            };
            await db.travel.insertOne(item)
            return res.redirect('/travel');
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async upcomingIndex (req, res) {
        try {
            const travel = await db.travel.find({'username': req.session.currentUser.username}).toArray();

            let currentDate = moment(new Date()).format("YYYYMMDD")  
            let upcomingTravel = []
            for (let i = 0; i < travel.length; i++){
                let inBoundDate = moment(travel[i].inBoundDate).format("YYYYMMDD")
                if (inBoundDate >= currentDate){
                    upcomingTravel.push(travel[i])
                }
            }
            upcomingTravel.sort((a,b) => (a.inBoundDate > b.inBoundDate) ? 1 : (b.inBoundDate > a.inBoundDate) ? -1 : 0)

            return res.render('travel/index', { currentUser: req.session.currentUser, travel: upcomingTravel});
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async completedIndex (req, res) {
        try {
            const travel = await db.travel.find({'username': req.session.currentUser.username}).toArray();

            let currentDate = moment(new Date()).format("YYYYMMDD")
            let completedTravel = []
            for (let i = 0; i < travel.length; i++){
                let inBoundDate = moment(travel[i].inBoundDate).format("YYYYMMDD")
                if (inBoundDate < currentDate){
                    completedTravel.push(travel[i])
                }
            }
            completedTravel.sort((a,b) => (a.inBoundDate > b.inBoundDate) ? 1 : (b.inBoundDate > a.inBoundDate) ? -1 : 0)
            
            return res.render('travel/completed', { currentUser: req.session.currentUser, travel : completedTravel });
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async show (req, res) {
        try {
            const travel = await db.travel.findOne({ "_id": ObjectId(req.params.id) });

            ////////////////////////////////////    SKYSCANNER API    //////////////////////////////////////////
            let country = "SG"
            let currency = "SGD"
            let locale = "en-US"
            let originplace = "SIN"
            let destinationplace = travel.country.alpha2Code
            let outboundpartialdate = travel.outBoundDate
            let inboundpartialdate = travel.inBoundDate
            let minPrice

            if (travel.completed === false){
                const response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}?inboundpartialdate=${inboundpartialdate}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": RAPID_API_KEY,
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                    }
                })
                const result = await response.json()
                console.log(result);
                console.log(result.Quotes[0])
                console.log(result.Carriers)
                if (result.Quotes.length > 0){
                minPrice = result.Quotes[0].MinPrice
                }
            }

            //////////////////////////////////////    HOTELS API    //////////////////////////////////////////

            let countryName = travel.country.name
            const hotelResponse = await fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${countryName}&locale=en_US`, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": RAPID_API_KEY,
                                        "x-rapidapi-host": "hotels4.p.rapidapi.com"
                                    }
                                })
            const hotelResult = await hotelResponse.json()
            console.log(hotelResult);


            let randomNumber = Math.floor(Math.random()*30)
            let countryImage = travel.images[randomNumber]

            
            return res.render('travel/show', { currentUser: req.session.currentUser, travel, countryImage, minPrice });
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async edit (req, res) {
        try {
            const travel = await db.travel.findOne({ "_id": ObjectId(req.params.id) });
            
            let flightPrice
            let accommodationPrice

            if (travel.flight.price === ""){
                flightPrice = 0
            } else {
                flightPrice = parseInt(travel.flight.price)

            }
            if (travel.accommodation.price === ""){
                accommodationPrice = 0
            } else {
                accommodationPrice = parseInt(travel.accommodation.price)
            }
    
            console.log(flightPrice)
            console.log(accommodationPrice)
            let minBudget = flightPrice + accommodationPrice
            return res.render('travel/edit', { currentUser: req.session.currentUser, travel, minBudget});
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async removeItem (req, res) {
        try {
            await db.travel.deleteOne({"_id": ObjectId(req.params.id) });
            return res.redirect('/travel');
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async update (req, res) {
        try {
            let currentDate = moment(new Date()).format("YYYYMMDD")
            let selectedDate = moment(req.body.depart).format("YYYYMMDD")
            let isCompleted 
            if(selectedDate < currentDate){
                isCompleted = true
            } else {
                isCompleted = false
            }
            await db.travel.updateOne({"_id": ObjectId(req.params.id)}, {$set: {
                outBoundDate: req.body.arrive,
                inBoundDate:req.body.depart,
                flight: {
                        airline: req.body.airline,
                        time: req.body.flightTime,
                        flightNo: req.body.flightNo,
                        airport: req.body.airport,
                        price: req.body.flightPrice
                    },
                accommodation: {
                        name: req.body.accommodationName,
                        address: req.body.accommodationAddress,
                        price:  req.body.accommodationPrice
                    },
                budget: {
                        allocated: req.body.allocatedBudget,
                        actual : req.body.actualBudget
                    },
                notes: req.body.notes,
                completed: isCompleted
            }});
            return res.redirect('/travel');
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    showTravelAdvice (req, res) {
        res.render('travel/advice', { currentUser: req.session.currentUser })
    },
    async overview (req, res) {
        const travel = await db.travel.find({'username': req.session.currentUser.username}).toArray();
        let currentDate = moment(new Date()).format("YYYYMMDD")  
        let upcomingTravel = []
        for (let i = 0; i < travel.length; i++){
            let inBoundDate = moment(travel[i].inBoundDate).format("YYYYMMDD")
            if (inBoundDate >= currentDate){
                upcomingTravel.push(travel[i])
            }
        }
        let completedTravel = []
        for (let i = 0; i < travel.length; i++){
            let inBoundDate = moment(travel[i].inBoundDate).format("YYYYMMDD")
            if (inBoundDate < currentDate){
                completedTravel.push(travel[i])
            }
        }
        let totalFlights = 0
        let totalAccommodation = 0
        let total = 0
        travel.forEach(trip=>{
            total += parseInt(trip.budget.allocated);
            if(trip.flight.price === ""){
                trip.flight.price = 0
            }
            totalFlights += parseInt(trip.flight.price);
            if(trip.accommodation.price === ""){
                trip.accommodation.price = 0
            }
            totalAccommodation += parseInt(trip.accommodation.price);
        })
        let averageBudget = (total / travel.length).toFixed(2)
        res.render('travel/overview', { currentUser: req.session.currentUser, travel, upcomingTravel, completedTravel, total, averageBudget, totalFlights, totalAccommodation })
    },
    async searchFlights (req, res) {
        const response = await fetch('https://restcountries.eu/rest/v2/all')
        let country = await response.json()
        res.render('travel/searchFlights', { currentUser: req.session.currentUser, country })
    },
    async flightsSearched (req, res) {
        const response = await fetch('https://restcountries.eu/rest/v2/all')
        let country = await response.json()
        const countryNameFrom = req.body.from
        for (let i = 0; i < country.length; i++){
            if (countryNameFrom === country[i].name){
                flagFrom = country[i].flag
                currenciesFrom = country[i].currencies[0]
                countryCodeFrom = country[i].alpha2Code
            }
        }
        const countryFrom = {
            name: countryNameFrom,
            flag: flagFrom,
        }


        const countryNameTo = req.body.to
        for (let i = 0; i < country.length; i++){
            if (countryNameTo === country[i].name){
                flagTo = country[i].flag
                currenciesTo = country[i].currencies[0]
                countryCodeTo = country[i].alpha2Code
            }
        }

        ////////////////////////////////////    SKYSCANNER API    //////////////////////////////////////////
        let country1 = "SG"
        let currency = "SGD"
        let locale = "en-US"
        let originplace = countryCodeFrom
        let destinationplace = countryCodeTo
        let outboundpartialdate = req.body.arrive
        let inboundpartialdate = req.body.depart 
        let minPrice, flightCarriers, direct

        const response1 = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country1}/${currency}/${locale}/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}?inboundpartialdate=${inboundpartialdate}`, {
                                "method": "GET",
                                "headers": {
                                    "x-rapidapi-key": RAPID_API_KEY,
                                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                                }
                            })
        const result = await response1.json()
        // console.log(5);
        // console.log(result);
        // console.log(result.Quotes[0])
        // console.log(result.Carriers)
        // console.log(6);
        if (result.Quotes.length > 0){
            minPrice = result.Quotes[0].MinPrice
            direct = result.Quotes[0].Direct
        }
        if (result.Carriers.length > 0){
            flightCarriers = result.Carriers
        }

        res.render('travel/showFlights', { currentUser: req.session.currentUser, minPrice, flightCarriers, countryFrom, countryNameTo, outboundpartialdate, inboundpartialdate })
    },
    async searchHotels (req, res) {
        const response = await fetch('https://restcountries.eu/rest/v2/all')
        let country = await response.json()

        res.render('travel/searchHotels', { currentUser: req.session.currentUser, country })
    },
    async hotelsSearched (req, res) {

        const response = await fetch('https://restcountries.eu/rest/v2/all')
        let country = await response.json()
        const countryName = req.body.destination
        for (let i = 0; i < country.length; i++){
            if (countryName === country[i].name){
                console.log(country[i])
            }
        }

//////////////////////////////////////    HOTELS API    //////////////////////////////////////////
        const hotelResponse = await fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${countryName}&locale=en_US`, {
                                "method": "GET",
                                "headers": {
                                    "x-rapidapi-key": RAPID_API_KEY,
                                    "x-rapidapi-host": "hotels4.p.rapidapi.com"
                                }
                            })
        const hotelResult = await hotelResponse.json()

        let entity0 = hotelResult.suggestions[0].entities
        let entity1 = hotelResult.suggestions[1].entities
        let entity2 = hotelResult.suggestions[2].entities
        let entity3 = hotelResult.suggestions[3].entities
        let entity0Id = []
        let entity1Id = []
        let entity2Id = []
        let entity3Id = []

        for (let i = 0; i < entity0.length; i++){
            entity0Id.push(entity0[i].destinationId)
        }
        for (let i = 0; i < entity1.length; i++){
            entity1Id.push(entity1[i].destinationId)
        }
        for (let i = 0; i < entity2.length; i++){
            entity2Id.push(entity2[i].destinationId)
        }
        for (let i = 0; i < entity3.length; i++){
            entity3Id.push(entity3[i].destinationId)
        }
        console.log('entityID 0',entity0Id);
        console.log('entityID 1',entity1Id);
        console.log('entityID 2',entity2Id);
        console.log('entityID 3',entity3Id);

        //////////////////////////////////////    HOTELS API    //////////////////////////////////////////
        let currency = "SGD"
        let checkIn = req.body.arrive
        let checkOut = req.body.depart
        let hotelID = entity3Id[0]

        const hotelResponse2 = await fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${hotelID}&locale=en_US&currency=${currency}&checkOut=${checkOut}&adults1=1&checkIn=${checkIn}`, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": RAPID_API_KEY,
                                        "x-rapidapi-host": "hotels4.p.rapidapi.com"
                                    }
                                })
        const hotelResult2 = await hotelResponse2.json()
        
        // console.log(hotelResult2)
        // console.log(hotelResult2.data)
        // console.log(hotelResult2.data.body)
        console.log(hotelResult2.data.body.overview)
        console.log(hotelResult2.data.body.overview.overviewSections[2])
        // console.log(hotelResult2.data.body.overview.overviewSections[1])
        // console.log(hotelResult2.data.body.overview.overviewSections[1].content)



        const destinationID = entity1Id[0]

        const hotelResponse3 = await fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${destinationID}&pageNumber=1&checkIn=${checkIn}&checkOut=${checkOut}&pageSize=25&adults1=1&currency=${currency}&locale=en_US&sortOrder=PRICE`, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-key": RAPID_API_KEY,
                                        "x-rapidapi-host": "hotels4.p.rapidapi.com"
                                    }
                                })
        const hotelResult3 = await hotelResponse3.json()
        res.render('travel/showHotels', { currentUser: req.session.currentUser, countryName, hotelResult2, hotelResult3 })
    }
}
