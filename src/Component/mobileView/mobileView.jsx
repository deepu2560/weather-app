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
import { IconsDisplay } from "../weatherIcons/icons";

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
  const [searchInput, setSearchInput] = useState("");

  const [graphTime, setGraphTime] = useState([]);
  const [graphTemp, setGraphTemp] = useState([]);

  const [weekmaxData, setweekmaxData] = useState([]);
  const [weekminData, setweekminData] = useState([]);

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

  // graph data
  const graphData = {
    labels: graphTime,
    datasets: [
      {
        label: "temp (°C)",
        data: graphTemp,
        backgroundColor: "#2f3640",
        borderColor: "#2f3640",
        tension: 0,
      },
    ],
  };

  useEffect(() => {
    if (locState) {
      setCity(() => locState);
    }
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,current&appid=31c3591dbeafd3c289a18efd19ac5077`,
      )
      .then(({ data }) => {
        console.log(data);
        let max = [];
        let min = [];
        let temp = [];
        let time = [];
        for (var i = 0; i < 7; i++) {
          max.push(Math.round(data.daily[i].temp.max - 273.15));
          min.push(Math.round(data.daily[i].temp.min - 273.15));
          temp.push(Math.round(data.hourly[i].temp - 273.15));
          const date = new Date();
          time.push(`${date.getHours + i}:${date.getMinutes}`);
        }
        setweekmaxData(() => max);
        setweekminData(() => min);
        setGraphTemp(() => temp);
        setGraphTime(() => time);
      });
  }, [latitude, longitude]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=31c3591dbeafd3c289a18efd19ac5077`,
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
  }, [city]);

  const handleChange = ({ value }) => {
    setSearchInput(value);
  };

  const weekWeather = ["Haze", "Snow", "Windy", "Sunny", "Rainy"];
  if (cityData) {
    return (
      <div className="mobile-weather-main-div">
        <div id="mobile-search-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          <input
            type="text"
            placeholder="Search city..."
            id="mobile-search-input"
            onChange={({ target }) => handleChange(target)}
          />
          <button
            className="mobile-search-icon"
            onClick={() => setCity(searchInput)}
          >
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
          {weekmaxData.map((elem, idx) => {
            if (idx < 5) {
              return (
                <div key={idx}>
                  <h4>
                    {elem}°C {weekminData[idx]}°C
                  </h4>
                  <div className="mobile-week-icon">
                    {" "}
                    <IconsDisplay weatherMain={weekWeather[idx]} />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div id="mobile-weather-details">
          <div id="mobile-today-tempurature">
            <h1>{Math.round(cityData.main.temp - 273.15)}°C</h1>
            <div id="mobile-today-temp-icon">
              <IconsDisplay weatherMain={cityData.weather[0].main} />
            </div>
          </div>
          <div id="mobile-graph-div">
            <Line data={graphData}></Line>
          </div>
          <div id="mobile-pressure-humidity">
            <div>
              <h4>Pressure</h4>
              <p>{cityData.wind.speed} meter/sec</p>
            </div>
            <div>
              <h4>Humidity</h4>
              <p>{cityData.main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
};
