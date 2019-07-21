
const Renderer = function () {

    const render = function (allCityData) {
        $("#container").empty()
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({allCityData});
        $('#container').append(newHTML);
        $("#city-input").val("")
    }

    return {
        render
    }
}

