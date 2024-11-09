import React, { useState, useEffect } from "react";
import "./Weather.css";

const api = {
  key: "61cc4d7228d5edaf7e6ac4c1a42929eb",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (weather.main) {
      document.body.classList.toggle("warm", weather.main.temp > 18);
    }
  }, [weather]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather.main && (
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys?.country}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Weather;
