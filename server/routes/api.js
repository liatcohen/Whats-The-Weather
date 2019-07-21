const express = require('express')
const router = express.Router()
const request = require('request');
const City = require('../model/City')
const KEY = 'dbb2eef5e408426a94c74953191807'

// This route should take a cityName parameter
// This should be the route that makes a calls to your external API
router.get('/city/:cityName', function (req, res) {
    let city = req.params.cityName
    console.log(city)
    request(`http://api.apixu.com/v1/current.json?key=${KEY}&q=${city}`, function (error, response, body) {
        const resBody = JSON.parse(body || {})
        let cityWeatherInfo = {
            name: resBody.location.name,
            temperature: resBody.current.temp_c,
            condition: resBody.current.condition.text,
            conditionPic: resBody.current.condition.icon
        }
        res.send(cityWeatherInfo)
    });
})

// This route should find all of the city data saved in your DB, and send it to the client
router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        // console.log(cities)
        res.send(cities)

    })
})

// This route should take some data from the body, and save it as a new City to your DB
router.post('/city', function (req, res) {
    console.log("api post")
    console.log(req.body)
    let city= new City(req.body)
    console.log(city)
    //add to DB:
    city.save()
    res.end()
})


// This route should take a cityName parameter
// This route should find the city's data in your DB and remove it from your DB
router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.findOneAndDelete({name: cityName}).then(res.end())
})

module.exports = router
