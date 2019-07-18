let allCityData = [
    {
        "_id": "5d3035892d543a236f1777ed",
        "name": "Jerusalem",
        "temperature": 29,
        "condition": "Sunny",
        "conditionPic": "cdn.apixu.com/weather/64x64/day/113.png",
        "__v": 0
    }
]

const getDataFromDB = function () {
    $.get('/cities', function (cities) {
        console.log(cities)
    });
}

const getCityData = async function (cityName) {
    console.log("getCityData manager")
    await $.get('/city/' + cityName, function (cityInfo) {
        cityInfo.lastUpdated = 1
        allCityData.push(cityInfo)
    });
}

const saveCity = function (cityName) {
    let city = allCityData.find(c => c.name == cityName)
    $.post('/city', city, function (cityInfo) {

    });
}

// A removeCity method, which sends a DELETE request to the /city delete route on your server
// The method should take a parameter of cityName

const removeCity = function (cityName) {
    $.ajax({
        url: '/city' + $.param(cityName),
        type: 'DELETE',
        success: function (result) {
            // Do something with the result
        }
    });
}
