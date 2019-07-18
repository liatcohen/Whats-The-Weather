
const Renderer = function () {

    const render = function (allCityData) {
        console.log("render")
        console.log(allCityData)
        $("#container").empty()
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({allCityData});
        $('#container').append(newHTML);
        // $("#ingredient-input").val("")
    }

    return {
        render
    }
}

