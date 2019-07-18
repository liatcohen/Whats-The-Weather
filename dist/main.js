const renderer = Renderer()

const searchCity = async function () {
    console.log("searchCity")
    const cityName = $("#city-input").val()
    if (!cityName) {
        alert("Please enter an city name!")
    } else {
        await getCityData(cityName)
        renderer.render(allCityData)
    }
}

renderer.render(allCityData)