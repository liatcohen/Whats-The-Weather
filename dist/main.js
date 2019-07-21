const renderer = Renderer()

const searchCity = async function () {
    const cityName = $("#city-input").val()
    if (!cityName) {
        alert("Please enter an city name!")
    } else {
        await getCityData(cityName)
        renderer.render(allCityData)
    }
}

const getCities = async function () {
    await getDataFromDB()
    renderer.render(allCityData)
}

$('#container').on('click', '#add-city-icon', async function () {
    const cityName = $(this).closest('.box').find('#city-name').text()
    await saveCity(cityName)
    renderer.render(allCityData)
});

$('#container').on('click', '#remove-city-icon', async function () {
    const cityName = $(this).closest('.box').find('#city-name').text()
    await removeCity(cityName)
    renderer.render(allCityData)
});


getCities()