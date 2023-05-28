function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    let min = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
   
    return `${day} ${hour}:${min}`;   
}

function showTemp(response) {
    let tempElement = document.querySelector("#grades");
    let cityElement = document.querySelector("#city");
    let descElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");

    tempElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);

}

let apiKey = "a5c6f5daeaa8d396de43ot341b40480b";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Paris&key=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(showTemp);