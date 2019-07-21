const express = require('express')
const router = express.Router()
const request = require('request');
const City = require('../model/City')
const KEY = 'dbb2eef5e408426a94c74953191807'

// This route takes a cityName parameter and makes a call to the weather API
router.get('/city/:cityName', function (req, res) {
    let city = req.params.cityName
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

// This route finds all of the city data saved in the DB, and send it to the client
router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

// This route takes some data from the body, and save it as a new City to the DB
router.post('/city', function (req, res) {
    let city= new City(req.body)
    city.save()
    res.end()
})


// This route finds the city's data in the DB and remove it from the DB
router.delete('/city/:cityName', function (req, res) {
    City.findOneAndDelete({name: req.params.cityName}).then(res.end())
})

module.exports = router
