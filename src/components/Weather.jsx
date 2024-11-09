// 

import React, { Fragment, useState } from "react";
import WeatherStyle from "./Weather.module.css";
import favicon from "../assets/favicon.jpg";
import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";

let WeatherData = () => {
  let [city, setCity] = useState("");
  let [weatherInfo, setWeatherInfo] = useState(null);
  let [error,setError] = useState("")

  let fetchApi = async () => {
    let apiKey = "2867a270c7332540f592c03cea4c06cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

    try {
      let response = await fetch(apiUrl);
      let finalData = await response.json();

      if (finalData.cod === 200) {
        setWeatherInfo(finalData); 
        setError("")
      } else {
         setError("Please Enter Valid City Name")
         setWeatherInfo(null)
        console.log("Enter a valid city name");
      }
    } catch (error) {
      setError("Unable to fetch data")
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className={WeatherStyle.title}>
        <img src={favicon} alt="favicon"/>
        <h1>Weather App</h1>
      </div>
      <section className={WeatherStyle.sectionContainer}>
        <div className={WeatherStyle.inputContainer}>
          <input
            type="text"
            placeholder="Enter your City name"
            onChange={(e) => setCity(e.target.value)}
            className={WeatherStyle.inputField}
          />
          <button onClick={fetchApi} className={WeatherStyle.searchButton}>
            Get Weather
          </button>
        </div>

        <div className={WeatherStyle.infoContainer}>
          {error && <p>{error}</p>}
          {weatherInfo && (
            <div className={WeatherStyle.weatherInfo}>
              <h1>{weatherInfo.name}</h1>
              <h2>
                <FaTemperatureHigh /> Temperature:
                <img
                  src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                  alt={weatherInfo.weather[0].description}
                  className={WeatherStyle.weatherIcon}
                />
                <span>{weatherInfo.main.temp} °C</span>
              
              </h2>
              <h2>
                <FaMapMarkerAlt /> Country:
                <span>{weatherInfo.sys.country}</span>
              </h2>
              <h2>
                Weather Description:{" "}
                <span>{weatherInfo.weather[0].description}</span>
              </h2>
              <h2>
                <FaTint /> Humidity:
                <span>{weatherInfo.main.humidity}%</span>
              </h2>
              <h2>
                <FaWind /> Wind Speed:
                <span>{weatherInfo.wind.speed} m/s</span>
              </h2>
              <h3>
                <TbWorldLongitude className={WeatherStyle.latlon} />
                Lon: <span>{weatherInfo.coord.lon}°</span> &nbsp;||&nbsp;
                <TbWorldLatitude className={WeatherStyle.latlon} />
                Lat: <span>{weatherInfo.coord.lat}°</span>
              </h3>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default WeatherData;
