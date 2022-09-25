// importing all required tools
import React, { useState, useEffect } from "react";
import "./mobileView.css";

import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// registering chart all required data
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export const MobileView = ({ locState }) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [city, setCity] = useState("New york");
  const [cityData, setCityData] = useState(null);
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

  useEffect(() => {
    if (locState) {
      setCity(() => locState);
      findByCityName();
    } else {
      findByCityName();
    }
  });

  const findByLocationAccept = () => {};

  const findWeekWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,current&appid=d41c6d489e0a0b8a4a7159509790db66`,
      )
      .then((res) => {
        let data = res.data;
        // console.log(data);
        // let max = [];
        // let min = [];
        // for (var i = 0; i < 7; i++) {
        //   max.push(Math.round(data.daily[i].temp.max - 273.15));
        //   min.push(Math.round(data.daily[i].temp.min - 273.15));
        // }
        // setweekmaxData(() => max);
        // setweekminData(() => min);
      });
  };

  const findByCityName = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d41c6d489e0a0b8a4a7159509790db66`,
      )
      .then(({ data }) => {
        console.log(data);
        setCityData(() => data);
        setLongitude(() => data.coord.lon);
        setLatitude(() => data.coord.lan);
      })
      .catch((err) => {
        alert("ERROR! City not found search again");
        setCityData(() => sampleData);
        setLatitude(() => sampleData.coord.lat);
        setLongitude(() => sampleData.coord.lon);
      });
  };

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
      <div id="mobile-weeks-main-div">
        {[2, 3, 4, 4, 3, 2, 1, 4].map((elem, idx) => {
          if (idx < 5) {
            return <div key={idx}></div>;
          }
        })}
      </div>
    </div>
  );
};
