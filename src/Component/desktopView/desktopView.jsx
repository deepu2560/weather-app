// importing all required tools
import React, { useState, useEffect } from "react";
import "./desktopView.css";

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

// main app function
export const DesktopView = ({ locState }) => {
  // Today date
  const date = new Date();

  // week names to show on day
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // months name to show on day
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

  // Today date prop to show
  const today =
    week[date.getDay()] +
    ", " +
    months[date.getMonth()] +
    " " +
    date.getDate() +
    " " +
    date.getFullYear();

  // declaring all required props
  const [city, setcity] = useState("delhi");
  const [inputBox, setinputBox] = useState("");

  const [weekmaxData, setweekmaxData] = useState([35, 39, 41, 41, 42, 42, 40]);
  const [weekminData, setweekminData] = useState([28, 30, 32, 32, 32, 33, 29]);

  const [lon, setlon] = useState(77.2167);
  const [lat, setlat] = useState(28.6667);

  const [weatherbkgrnd, setweatherbkgrnd] = useState("Fog");

  const [aqi, setaqi] = useState("Good");

  // week days name for weekly data
  const [weekDays, setWeekDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  // graph data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "temp (°C)",
        data: weekminData,
        backgroundColor: "#2f3640",
        borderColor: "#2f3640",
        tension: 0,
      },
    ],
  };

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
      setcity(() => locState);
    }
  });

  // searched data initialy with fake data
  const [cityData, setcityData] = useState(sampleData);

  // useeffect hook for fetch city data on change city prop which changes when user search
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=31c3591dbeafd3c289a18efd19ac5077`,
      )
      .then((res) => {
        let data = res.data;
        setcityData(() => data);
        setlon(() => data.coord.lon);
        setlat(() => data.coord.lan);
        setweatherbkgrnd(() => data.weather[0].main);
      })
      .catch((err) => {
        alert("ERROR! City not found search again");
        setcityData(() => sampleData);
        setlat(() => sampleData.coord.lat);
        setlon(() => sampleData.coord.lon);
        setweatherbkgrnd(() => sampleData.weather[0].main);
      });
  }, [city]);

  // userEffect hook for changing bachground image
  useEffect(() => {
    document.getElementById("desktopView").style.background = "none";

    if (weatherbkgrnd == "Clouds") {
      document.getElementById("desktopView").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1620640558738-ed5eb2bb19d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Fog") {
      document.getElementById("desktopView").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Haze") {
      document.getElementById("desktopView").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1532592950061-606f15b31037?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Rainy") {
      document.getElementById("desktopView").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Clear") {
      document.getElementById("desktopView").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else {
      document.getElementById("desktopView").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    }

    document.getElementById("desktopView").style.backgroundSize = "cover";
    document.getElementById("desktopView").style.backgroundRepeat = "no-repeat";
    document.getElementById("desktopView").style.backgroundPosition = "center";
  }, [weatherbkgrnd]);

  // useEffect hook for air quality and week data
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,alerts,minutely,current&appid=31c3591dbeafd3c289a18efd19ac5077`,
      )
      .then((res) => {
        let data = res.data;
        let max = [];
        let min = [];
        for (var i = 0; i < 7; i++) {
          max.push(Math.round(data.daily[i].temp.max - 273.15));
          min.push(Math.round(data.daily[i].temp.min - 273.15));
        }
        setweekmaxData(() => max);
        setweekminData(() => min);
      });

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=31c3591dbeafd3c289a18efd19ac5077`,
      )
      .then((res) => {
        let data = res.data.list[0].main.aqi;
        let airquality = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

        setaqi(() => airquality[data - 1]);
      });
  }, [lon, lat]);

  function handleInput({ value }) {
    setinputBox(() => value);
  }

  // returning main content to render on screen
  return (
    <div className="App">
      {/* main weather app */}
      <div id="weather-app-main-div">
        {/* navbar main div */}
        <div id="navbar">
          <h1>Weather app</h1>
          <div>
            <div className="navbar-search">
              <input
                type="text"
                className="navbar-search-txt"
                placeholder="Search city >>>"
                onChange={(event) => handleInput(event.target)}
              />
              <button
                className="navbar-search-btn"
                onClick={() => setcity(() => inputBox)}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        {/* weather main */}
        <div id="weather-app">
          {/* city display div */}
          <div id="city-weather-display">
            {/* city map */}
            <div id="city-map-div">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyASagaYt-z00y9kyj1IA2mmo_Tvxy497po&q=${city}`}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #2f3640",
                }}
              ></iframe>
            </div>
            {/* city content */}
            <div id="city-details-div">
              <div>
                <h1>{cityData.name}</h1>
                <p>
                  {today} <br /> Feels like:{" "}
                  {Math.round(cityData.main.feels_like - 273.15)}°C
                </p>
              </div>
              <div>
                <div>
                  <p>
                    <strong>Temp:</strong>{" "}
                    {Math.round(cityData.main.temp - 273.15)}
                    °C
                    <br />
                    <strong>Max:</strong>{" "}
                    {Math.round(cityData.main.temp_max - 273.15)}°C |{" "}
                    <strong>Min:</strong>{" "}
                    {Math.round(cityData.main.temp_min - 273.15)}°C
                  </p>
                </div>
                <hr />
                <div>
                  <p>
                    <strong>Humidity:</strong>{" "}
                    {Math.round(cityData.main.humidity)}%
                    <br />
                    <strong>Wind speed:</strong>{" "}
                    {Math.round(cityData.wind.speed)} m/s
                    <br />
                    <strong>AQI:</strong> <span id="air-quality">{aqi}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* week and grph content main div */}
          <div id="graph-week-display">
            {/* graph */}
            <div id="graph-div">
              <Line data={data}></Line>
            </div>
            {/* week main content */}
            <div id="week-display-div">
              {weekDays.map((elem, index) => (
                <div key={index}>
                  <div className="week-max-min-temp-display-div">
                    <h2>{elem}</h2>
                    <p>
                      <strong>Max:</strong> {weekmaxData[index]}°C
                      <br />
                      <strong>Min:</strong> {weekminData[index]}°C
                    </p>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
