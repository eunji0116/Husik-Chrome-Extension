var api, city, apiKey, units, unitFormat, url;
var weatherData;
var shownWeatherInfo = false;
var shownSetting = false;

function getWeatherAPI() {
    api = "http://api.openweathermap.org/data/2.5/weather?q=";
    city = localStorage.getItem("city");
    if (city == null) {
        city = "Seattle";
    }
    apiKey = "&APPID=61834c64583a73f8a9a72c266f7cfd97";
    units = "&units=";
    unitFormat = localStorage.getItem("unitFormat");

    url = api + city + apiKey + units + unitFormat;
}

function load() {    
    getWeatherAPI()
    $.getJSON(url, function(data) {
        weatherData = data;
        var iconURL = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
        $(".weather-icon").html("<img src='" + iconURL  + "'>");
        $(".large-weather-icon").html("<img style='width: 8em; height: 8em'; src='" + iconURL  + "'>");
        var temp = weatherData.main.temp;
        temp = temp.toFixed(1);
        $(".temp-metric").html(temp);
        $(".large-temp-metric").html(temp);
        var location = weatherData.name + ", " + weatherData.sys.country;
        $(".location").html(location);
        $("#city").val(location);
        $("#weather-description").html(weatherData.weather[0].description.toUpperCase());
    })
    .fail(function() {
        city = "Seattle";
        console.log("failed to recognize city");
    })
}

function showPopUp() {
    $(".weather-app").click(function() {
        if (!shownWeatherInfo) {
            $(".weather-overlay").addClass("active");
            shownWeatherInfo = true;
        } else {
            $(".weather-overlay").removeClass("active");
            if (shownSetting) {
                $(".switch").removeClass("show");
                shownSetting = false;
            }
            shownWeatherInfo = false;
        }
    }); 
}

function showSetting() {
    $("#setting").click(function() {
        if (!shownSetting) {
            $(".switch").addClass("show");
            shownSetting = true;
        } else {
            $(".switch").removeClass("show");
            shownSetting = false;
        }
    });
}

// When user input city location
$("#city").keyup(function(e) {
    if (e.keyCode == 13 && $(this).val() != "") {
        city = $(this).val();
        localStorage.setItem("city", city);
        load();
    }
});

$("#units").click(function() {
    if ($(this).prop("checked")) {
        localStorage.setItem("unitFormat", "imperial");
        localStorage.setItem("checked", true);
        load();
    } else {
        localStorage.setItem("unitFormat", "metric");
        localStorage.setItem("checked", false);
        load();
    }
})

var isImperial = localStorage.getItem("checked")
$("#units").prop("checked", isImperial == "true");

load();
showPopUp();
showSetting();
