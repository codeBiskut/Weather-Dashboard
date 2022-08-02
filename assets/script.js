//step 1 :define all your html static selectors
var cityEl = document.querySelector("#city")
var cityFormEl = document.querySelector("#city-form")
var cityHeaderEl = document.querySelector("#city-header")
var TempEl = document.querySelector("#main-temp")
var uviEl = document.querySelector("#main-uvi")
var windEl = document.querySelector('#main-wind')
var humidityEl = document.querySelector('#main-humidity')
var cityHeaderCard1El = document.querySelector("#city-header-card-1")
var weatherCardContainerEl = document.querySelector('weather-card-container')
var weatherPageEl = document.querySelector('.row')
var fiveDayContainerEl = document.querySelector('#five-day-container')

var cityList = [];
rawCityList = localStorage.getItem('cityList');
if(rawCityList === null){

}
else{
    cityList = JSON.parse(rawCityList);
}
var api = "d1897c6f12c919e09a996830824f534e"

function init(){
    var mostRecentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityList[0]}&appid=${api}&units=imperial`

    fetch(mostRecentUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            var currentDate= moment.unix(currentData.dt).format("MM/DD/YYYY")
            var iconImage=document.createElement("img")
            iconImage.setAttribute("src",`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
            cityHeaderEl.innerHTML=  currentData.name + " "+ currentDate
            cityHeaderEl.appendChild(iconImage)

                
            TempEl.textContent=`${currentData.main.temp} \u00B0F`
            windEl.innerHTML=`${currentData.wind.speed} MPH`
            humidityEl.textContent=`${currentData.main.humidity}%`
            uviEl.textContent=fiveData.current.humidity
        })
}


//step2: make an addEventListener on Submit and create displayDashboard - it shows current weather and last five day

function displayWeather(event) {
    event.preventDefault()

    fiveDayContainerEl.innerHTML=''

    var cityName = cityEl.value
    
    rawCityList = localStorage.getItem('cityList');
    if(rawCityList === null){

    }
    else{
        cityList = JSON.parse(rawCityList);
    }

    if(cityList.length === 0){
        cityList.push(cityName)
    }
    else if(cityList.length >= 5){
        cityList.unshift(cityName)
        cityList.pop();
    }
    else(
        cityList.unshift(cityName)
    )

    localStorage.setItem('cityList', JSON.stringify(cityList))

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

                
                TempEl.textContent=`${currentData.main.temp} \u00B0F`
                windEl.innerHTML=`${currentData.wind.speed} MPH`
                humidityEl.textContent=`${currentData.main.humidity}%`
                uviEl.textContent=fiveData.current.humidity

                for(let i=1;i<=5;i++){
                    currentDate= moment.unix(currentData.dt).format("MM/DD/YYYY")
                    newDate = moment().add(i, 'd').format("MM/DD/YYYY")

                    var iconImage=document.createElement("img")
                    iconImage.setAttribute("src",`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)

                    var fiveDay = document.createElement('div')
                    fiveDay.setAttribute('class', 'fiveDayCard px-3')
                    fiveDay.innerHTML=`
                    <div class="card">
                        <div class="card-body">
                            <h2 id="city-header-card-1" >${cityName} (${newDate})</h2>
                            <div class="weather-icon">
                            <img src="http://openweathermap.org/img/wn/${fiveData.daily[i].weather[0].icon}@2x.png"></img>
                            </div>
                            <div class="weather-stats">
                            <p>Temp: <span >${fiveData.daily[i].temp.day} \u00B0F</span> </p>
                            <p>Wind: <span>${fiveData.daily[i].wind_speed} MPH</span> </p>
                            <p>Humidity: <span >${fiveData.daily[i].humidity}%</span></p>
                            <p>UVI: <span>${fiveData.daily[i].uvi}</span> </p>
                            </div>
                            <div class="weather-icon">
                            </div>

                        </div>
                    </div>`
                fiveDayContainerEl.appendChild(fiveDay)
                }
                 

            })
        })


}

init();

cityFormEl.addEventListener("submit", displayWeather)






