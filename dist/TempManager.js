let allCityData = []

const getDataFromDB = async function () {
    await $.get('/cities', function (cities) {
        allCityData = [...cities]
        allCityData.forEach(c => c.isInDB = true)
    });
}

const getCityData = async function (cityName) {
    await $.get('/city/' + cityName, function (cityInfo) {
        cityInfo.lastUpdated = 1
        allCityData.push(cityInfo)
    });
}

const saveCity = function (cityName) {
    let city = []
    allCityData.forEach(c => {
        if (c.name === cityName) {
            city = c
            c.isInDB = true
        }
    })
    $.post('/city', city, function (cityInfo) {
    });
}


const removeCity = function (cityName) {
    $.ajax({
        url: '/city/' + cityName,
        type: 'delete',
        success: function (result) {
            allCityData.forEach(c => {
                if (c.name === cityName) { c.isInDB = false }
            })
        }
    });
}
