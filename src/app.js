function showTemp(response) {
    console.log(response);
    let now = new Date();
    let tempElement = document.querySelector("#grades");
    let cityElement = document.querySelector("#city");
    let hourElement = document.querySelector("#hour");
    let minElement = document.querySelector("#minutes");
    let days = ["Sunday", "Monday", "Thursday", "Wednesday", "Friday", "Saturday"];
    let dayElement = document.querySelector("#day");
    let descElement = document.querySelector("#description");

    tempElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    hourElement.innerHTML = now.getHours();
    minElement.innerHTML = now.getMinutes();
    dayElement.innerHTML = days[now.getDay()];
    descElement.innerHTML = response.data.condition.description;
}

let apiKey = "a5c6f5daeaa8d396de43ot341b40480b";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Madrid&key=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(showTemp);