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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Mon", "Thu", "Wed", "Tue", "Fri"];
    let forecastHTML= "";

    days.forEach(function(day) {
      forecastHTML = forecastHTML + 
        `<ul class="forecast-section">
            <li>         
               <span class="forecast-day">
                  ${day}
               </span>

               <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png" class="forecast-icon"/>

               <span class="forecast-temp">
                 <span class="forecast-temp-max">21°</span>
                 <span class="forecast-temp-min">15°</span>                                              
               </span>
            </li>
        </ul>`;    
    });

   forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
    let tempElement = document.querySelector("#grades");
    let cityElement = document.querySelector("#city");
    let descElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let speedElement = document.querySelector("#speed");
    let humidityElement = document.querySelector("#humidity");

    celsiusTemp = response.data.temperature.current;

    tempElement.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.city;
    descElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
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

function fahrConversion(event) {
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



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", fahrConversion);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConversion);

search("Turin");

displayForecast();