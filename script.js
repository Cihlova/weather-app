let weatherAPI = {
  apiKey: "b487ccbb1bf3f8a7887317f5a1119489",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".temperature").innerText = temp + " °C";
    document.querySelector(".icon").setAttribute("src", "https://openweathermap.org/img/wn/"+ icon +"@2x.png");
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
  },
  search: function() {
    this.fetchWeather(document.querySelector("#searchbox").value);
  }
};

document.querySelector(".search button").addEventListener("click", ()=> {
    weatherAPI.search();
})

document.querySelector("#searchbox").addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        weatherAPI.search();
    }
})

weatherAPI.fetchWeather("Prague");
