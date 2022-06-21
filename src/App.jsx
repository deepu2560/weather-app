import { useState, useEffect } from "react";
import "./App.css";
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
import { Pie, Line } from "react-chartjs-2";
import axios from "axios";

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

function App() {
  const date = new Date();
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

  const today =
    week[date.getDay()] +
    ", " +
    months[date.getMonth()] +
    " " +
    date.getDate() +
    " " +
    date.getFullYear();

  const [city, setcity] = useState("delhi");
  const [inputBox, setinputBox] = useState("");

  const [weekmaxData, setweekmaxData] = useState([35, 39, 41, 41, 42, 42, 40]);
  const [weekminData, setweekminData] = useState([28, 30, 32, 32, 32, 33, 29]);

  const [lon, setlon] = useState(77.2167);
  const [lat, setlat] = useState(28.6667);

  const [weatherbkgrnd, setweatherbkgrnd] = useState("Fog");

  const [aqi, setaqi] = useState("Good");

  const [weekDays, setWeekDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

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

  const [cityData, setcityData] = useState({
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
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d41c6d489e0a0b8a4a7159509790db66`,
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
        let dat = {
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
        setcityData(() => dat);
        setlat(() => dat.coord.lat);
        setlon(() => dat.coord.lon);
        setweatherbkgrnd(() => dat.weather[0].main);
      });
  }, [city]);

  useEffect(() => {
    document.body.style.background = "none";

    if (weatherbkgrnd == "Clouds") {
      document.body.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1620640558738-ed5eb2bb19d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Fog") {
      document.body.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Haze") {
      document.body.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1532592950061-606f15b31037?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Rainy") {
      document.body.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else if (weatherbkgrnd == "Clear") {
      document.body.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    } else {
      document.body.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }, [weatherbkgrnd]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,alerts,minutely,current&appid=d41c6d489e0a0b8a4a7159509790db66`,
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
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d41c6d489e0a0b8a4a7159509790db66`,
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

  console.log(aqi);

  return (
    <div className="App">
      <div id="weather-app-main-div">
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
        <div id="weather-app">
          <div id="city-weather-display">
            <div id="city-map-div">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyASagaYt-z00y9kyj1IA2mmo_Tvxy497po&q=${city}`}
                frameborder="0"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #2f3640",
                }}
              ></iframe>
            </div>
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
          <div id="graph-week-display">
            <div id="graph-div">
              <Line data={data}></Line>
            </div>
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
}

export default App;
