let allCityData = []

const getDataFromDB = async function () {
    await $.get('/cities', function (cities) {
        allCityData=[...cities]
        allCityData.forEach(c=> c.isInDB=true)
    });
}

const getCityData = async function (cityName) {
    await $.get('/city/' + cityName, function (cityInfo) {
        cityInfo.lastUpdated = 1
        allCityData.push(cityInfo)
    });
}

const saveCity = function (cityName) {
    let city=[]
    // let city = allCityData.find(c => c.name == cityName)
    allCityData.forEach(c=>
        {if (c.name===cityName){
            city=c
            c.isInDB=true
        }})

    $.post('/city', city, function (cityInfo) {

    });
}

// A removeCity method, which sends a DELETE request to the /city delete route on your server
// The method should take a parameter of cityName

const removeCity = function (cityName) {
    $.ajax({
        url: '/city/' + cityName,// $.param(cityName),
        type: 'delete',
        success: function (result) {
            // Do something with the result
            allCityData.forEach(c=>
                {if (c.name===cityName){
                    // city=c
                    c.isInDB=false
                }})
        }
    });
}
