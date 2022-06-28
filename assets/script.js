//step 1 :define all your html static selectors
var cityEl = document.querySelector("#city")
var cityFormEl = document.querySelector("#city-form")
var cityHeaderEl = document.querySelector("#city-header")
var TempEl = document.querySelector("#temp")
var uviEl = document.querySelector("#uvi")
var cityHeaderCard1El = document.querySelector("#city-header-card-1")
var api = "43307f36c133c1b4d80feb3644b2ab3e"
//step2: make an addEventListener on Submit and create displayDashboard - it shows current weather and last five day

function displayWeather(event) {
    event.preventDefault()
    var cityName = cityEl.value
    var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`


    fetch(urlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {

            console.log(currentData)
            var fiveDayUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${api}&units=imperial
            `
            fetch(fiveDayUrl)
            .then(function(response){
                return response.json()
            })
            .then(function(fiveData){
                console.log(fiveData)
                var currentDate= moment.unix(currentData.dt).format("MM/DD/YYYY")
                var iconImage=document.createElement("img")
                iconImage.setAttribute("src",`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
                cityHeaderEl.innerHTML=  currentData.name + " "+ currentDate
                cityHeaderEl.appendChild(iconImage)

                
                TempEl.textContent=currentData.main.temp 
                 

            })
        })


}



cityFormEl.addEventListener("submit", displayWeather)






