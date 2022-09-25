import axios from "axios";
import React, { useState, useEffect } from "react";
import "./mobileView.css";

export const MobileView = ({ lat, lon }) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [city, setCity] = useState("New york");
  const [weatherData, setWeatherData] = useState();

  const sampleData = {
    coord: {
      lon: 77.2167,
      lat: 28.6667,
    },
    weather: [
      {
        id: 721,
        main: "Haze",
        description: "haze",
        icon: "50n",
      },
    ],
    base: "stations",
    main: {
      temp: 301.2,
      feels_like: 304.47,
      temp_min: 301.2,
      temp_max: 304.43,
      pressure: 1001,
      humidity: 74,
    },
    visibility: 3200,
    wind: {
      speed: 4.12,
      deg: 270,
    },
    clouds: {
      all: 75,
    },
    dt: 1655650505,
    sys: {
      type: 1,
      id: 9165,
      country: "IN",
      sunrise: 1655596401,
      sunset: 1655646687,
    },
    timezone: 19800,
    id: 1273294,
    name: "Delhi",
    cod: 200,
  };

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if ((lat, lon)) {
      setLatitude(() => lat);
      setLongitude(() => lon);
    } else {
      findByCityName();
    }
  });

  const findByCityName = () => {};

  return (
    <div className="mobile-weather-main-div">
      <div id="mobile-search-box">
        <input
          type="text"
          placeholder="Search city..."
          id="mobile-search-input"
        />
        <button id="mobile-search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
