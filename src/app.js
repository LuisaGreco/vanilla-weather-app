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

function showTemp(response) {
    let tempElement = document.querySelector("#grades");
    let cityElement = document.querySelector("#city");
    let descElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    tempElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);
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

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 