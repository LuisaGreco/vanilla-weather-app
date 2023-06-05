function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    let min = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (min < 10) {
        min = `0${min}`;
    }

    if (hour < 10) {
        hour = `0${hour}`;
    }
   
    return `${day} ${hour}:${min}`;   
}

function forecastFormatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];

}

function displayForecast(response) {
    let forecast = response.data.daily;
    console.log(forecast);
   
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML= "";

    forecast.forEach(function(forecastDay, index) {
      if (index < 5) {
      forecastHTML = forecastHTML + 
        `<ul class="forecast-section">
            <li>         
               <span class="forecast-day">
                  ${forecastFormatDay(forecastDay.time)}
               </span>
        
               <img src= ${forecastDay.condition.icon_url}  alt="${forecastDay.condition.icon}" class="forecast-icon"/>

               <span class="forecast-temp">
                 <span class="forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                 <span class="forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>                                              
               </span>
            </li>
        </ul>`;
       }    
    });
     

   forecastElement.innerHTML = forecastHTML;
}

function getForecast(response) {
    let apiKey = "a5c6f5daeaa8d396de43ot341b40480b"; 
    let query = response.data.city;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}`;

    axios.get(apiUrl).then(displayForecast);     
}

function showTemp(response) {
    let tempElement = document.querySelector("#grades");
    let cityElement = document.querySelector("#city");
    let descElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let speedElement = document.querySelector("#speed");
    let humidityElement = document.querySelector("#humidity");

    let celsiusTemp = response.data.temperature.current;

    tempElement.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.city;
    descElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = Math.round(response.data.temperature.humidity);

    getForecast(response);
}

function search(city) {
    let apiKey = "a5c6f5daeaa8d396de43ot341b40480b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
    event.preventDefault();

    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

search("Turin");


/*function fahrConversion(event) {
    event.preventDefault();
    
    celsiusLink.classList.remove("active");
    fahrLink.classList.add("active");

    let fahrTemp = (celsiusTemp * 9 / 5) + 32;
    let gradesElement = document.querySelector("#grades");
    gradesElement.innerHTML = Math.round(fahrTemp);

}

function celsiusConversion(event) {
    event.preventDefault();

    celsiusLink.classList.add("active");
    fahrLink.classList.remove("active");

    let gradesElement = document.querySelector("#grades");
    gradesElement.innerHTML = Math.round(celsiusTemp);

}

let celsiusTemp = null; 

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", fahrConversion);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConversion);*/