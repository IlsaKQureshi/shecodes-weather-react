import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function Weather() {
  let [city, setCity] = useState(" ");
  let [submit, setSubmit] = useState(false);
  let [temp, setTemp] = useState(null);
  let [desc, setDesc] = useState(null);
  let [wind, setWind] = useState(null);
  let [humid, setHumid] = useState(null);
  let [tempdata, showTempData] = useState(false);
  let [icondesc, setIconDesc] = useState("");
  let color = "black";
  let animate = true;
  let size = 200;

  function handleSubmit(event) {
    event.preventDefault();
    setSubmit(true);
  }

  function updateCity(event) {
    setCity(event.target.value);
    setSubmit(false);
  }

  if (submit) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49b631c45785fe73d2a88477803dea22&units=metric`;
    axios.get(url).then(showInfo);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={updateCity}
          placeholder="Type your city...."
        />
        <input type="submit" value="Search"></input>
      </form>

      {tempdata ? (
        <ul>
          <li>Temperature: {temp}°C</li>
          <li>Wind Speed: {wind} km/h</li>
          <li>Humidity: {humid}%</li>
          <li>Description: {desc}</li>
          <li>
            <ReactAnimatedWeather
              icon={icondesc.toUpperCase()}
              size={size}
              color={color}
              animate={animate}
            />
          </li>
        </ul>
      ) : (
        <p>Please search for a city to see the weather.</p>
      )}
    </div>
  );

  function showInfo(response) {
    setTemp(response.data.main.temp);
    setDesc(response.data.weather[0].description);
    setHumid(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIconDesc(response.data.weather[0].main);

    showTempData(true);
  }
}
