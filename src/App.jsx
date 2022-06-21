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

// {
//     "coord": {
//         "lon": 77.2167,
//         "lat": 28.6667
//     },
//     "weather": [
//         {
//             "id": 721,
//             "main": "Haze",
//             "description": "haze",
//             "icon": "50n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 301.2,
//         "feels_like": 304.47,
//         "temp_min": 301.2,
//         "temp_max": 304.43,
//         "pressure": 1001,
//         "humidity": 74
//     },
//     "visibility": 3200,
//     "wind": {
//         "speed": 4.12,
//         "deg": 270
//     },
//     "clouds": {
//         "all": 75
//     },
//     "dt": 1655650505,
//     "sys": {
//         "type": 1,
//         "id": 9165,
//         "country": "IN",
//         "sunrise": 1655596401,
//         "sunset": 1655646687
//     },
//     "timezone": 19800,
//     "id": 1273294,
//     "name": "Delhi",
//     "cod": 200
// }

// {
//     "lat": 28.6667,
//     "lon": 77.2167,
//     "timezone": "Asia/Kolkata",
//     "timezone_offset": 19800,
//     "daily": [
//         {
//             "dt": 1655793000,
//             "sunrise": 1655769222,
//             "sunset": 1655819515,
//             "moonrise": 1655751480,
//             "moonset": 1655794740,
//             "moon_phase": 0.75,
//             "temp": {
//                 "day": 308.94,
//                 "min": 303.2,
//                 "max": 310.45,
//                 "night": 308.84,
//                 "eve": 307.11,
//                 "morn": 303.23
//             },
//             "feels_like": {
//                 "day": 310.31,
//                 "night": 309.08,
//                 "eve": 312.14,
//                 "morn": 303.86
//             },
//             "pressure": 998,
//             "humidity": 35,
//             "dew_point": 291.36,
//             "wind_speed": 5.57,
//             "wind_deg": 177,
//             "wind_gust": 6.09,
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": 34,
//             "pop": 0.39,
//             "rain": 0.11,
//             "uvi": 10.55
//         },
//         {
//             "dt": 1655879400,
//             "sunrise": 1655855635,
//             "sunset": 1655905927,
//             "moonrise": 1655839740,
//             "moonset": 1655884620,
//             "moon_phase": 0.79,
//             "temp": {
//                 "day": 311.9,
//                 "min": 304.66,
//                 "max": 314.32,
//                 "night": 310.4,
//                 "eve": 314.32,
//                 "morn": 305.1
//             },
//             "feels_like": {
//                 "day": 312.21,
//                 "night": 310.73,
//                 "eve": 313.52,
//                 "morn": 305.36
//             },
//             "pressure": 1002,
//             "humidity": 25,
//             "dew_point": 288.43,
//             "wind_speed": 6.16,
//             "wind_deg": 328,
//             "wind_gust": 9.61,
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": 30,
//             "pop": 0.65,
//             "rain": 1.89,
//             "uvi": 11.21
//         },
//         {
//             "dt": 1655965800,
//             "sunrise": 1655942048,
//             "sunset": 1655992338,
//             "moonrise": 1655927940,
//             "moonset": 1655974380,
//             "moon_phase": 0.82,
//             "temp": {
//                 "day": 313.65,
//                 "min": 306.71,
//                 "max": 316.15,
//                 "night": 310.5,
//                 "eve": 315.55,
//                 "morn": 306.89
//             },
//             "feels_like": {
//                 "day": 312.03,
//                 "night": 307.9,
//                 "eve": 313.13,
//                 "morn": 306.44
//             },
//             "pressure": 1002,
//             "humidity": 16,
//             "dew_point": 282.89,
//             "wind_speed": 6.25,
//             "wind_deg": 304,
//             "wind_gust": 9.99,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 1,
//             "pop": 0,
//             "uvi": 11.5
//         },
//         {
//             "dt": 1656052200,
//             "sunrise": 1656028463,
//             "sunset": 1656078748,
//             "moonrise": 1656016140,
//             "moonset": 1656064140,
//             "moon_phase": 0.85,
//             "temp": {
//                 "day": 313.58,
//                 "min": 306.95,
//                 "max": 316.51,
//                 "night": 311.49,
//                 "eve": 316.51,
//                 "morn": 306.95
//             },
//             "feels_like": {
//                 "day": 310.56,
//                 "night": 308.66,
//                 "eve": 312.63,
//                 "morn": 304.75
//             },
//             "pressure": 999,
//             "humidity": 10,
//             "dew_point": 276.77,
//             "wind_speed": 4.84,
//             "wind_deg": 303,
//             "wind_gust": 10.2,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 0,
//             "pop": 0,
//             "uvi": 11.45
//         },
//         {
//             "dt": 1656138600,
//             "sunrise": 1656114878,
//             "sunset": 1656165156,
//             "moonrise": 1656104460,
//             "moonset": 1656153840,
//             "moon_phase": 0.88,
//             "temp": {
//                 "day": 315.21,
//                 "min": 307.38,
//                 "max": 317.18,
//                 "night": 313.34,
//                 "eve": 317.15,
//                 "morn": 307.38
//             },
//             "feels_like": {
//                 "day": 313.69,
//                 "night": 310.51,
//                 "eve": 314.58,
//                 "morn": 305.04
//             },
//             "pressure": 996,
//             "humidity": 15,
//             "dew_point": 283.76,
//             "wind_speed": 3.45,
//             "wind_deg": 100,
//             "wind_gust": 6.19,
//             "weather": [
//                 {
//                     "id": 803,
//                     "main": "Clouds",
//                     "description": "broken clouds",
//                     "icon": "04d"
//                 }
//             ],
//             "clouds": 81,
//             "pop": 0,
//             "uvi": 10.95
//         },
//         {
//             "dt": 1656225000,
//             "sunrise": 1656201294,
//             "sunset": 1656251564,
//             "moonrise": 1656192960,
//             "moonset": 1656243660,
//             "moon_phase": 0.91,
//             "temp": {
//                 "day": 313.89,
//                 "min": 307.75,
//                 "max": 317.45,
//                 "night": 308.53,
//                 "eve": 317.45,
//                 "morn": 307.75
//             },
//             "feels_like": {
//                 "day": 316.81,
//                 "night": 313.54,
//                 "eve": 316.64,
//                 "morn": 311.82
//             },
//             "pressure": 996,
//             "humidity": 28,
//             "dew_point": 291.8,
//             "wind_speed": 8.03,
//             "wind_deg": 122,
//             "wind_gust": 12.32,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 5,
//             "pop": 0,
//             "uvi": 11
//         },
//         {
//             "dt": 1656311400,
//             "sunrise": 1656287712,
//             "sunset": 1656337970,
//             "moonrise": 1656281640,
//             "moonset": 1656333420,
//             "moon_phase": 0.94,
//             "temp": {
//                 "day": 310.67,
//                 "min": 304.09,
//                 "max": 315.01,
//                 "night": 309.11,
//                 "eve": 315.01,
//                 "morn": 304.09
//             },
//             "feels_like": {
//                 "day": 315.49,
//                 "night": 313.68,
//                 "eve": 317.48,
//                 "morn": 308.12
//             },
//             "pressure": 999,
//             "humidity": 40,
//             "dew_point": 294.8,
//             "wind_speed": 6.89,
//             "wind_deg": 130,
//             "wind_gust": 10.96,
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "clouds": 41,
//             "pop": 0.09,
//             "uvi": 11
//         },
//         {
//             "dt": 1656397800,
//             "sunrise": 1656374130,
//             "sunset": 1656424374,
//             "moonrise": 1656370620,
//             "moonset": 1656423060,
//             "moon_phase": 0.97,
//             "temp": {
//                 "day": 311.1,
//                 "min": 303.98,
//                 "max": 315,
//                 "night": 307.52,
//                 "eve": 311.22,
//                 "morn": 303.98
//             },
//             "feels_like": {
//                 "day": 316.01,
//                 "night": 312.01,
//                 "eve": 315.83,
//                 "morn": 307.88
//             },
//             "pressure": 998,
//             "humidity": 39,
//             "dew_point": 294.83,
//             "wind_speed": 6.01,
//             "wind_deg": 133,
//             "wind_gust": 8.72,
//             "weather": [
//                 {
//                     "id": 500,
//                     "main": "Rain",
//                     "description": "light rain",
//                     "icon": "10d"
//                 }
//             ],
//             "clouds": 12,
//             "pop": 0.9,
//             "rain": 1.38,
//             "uvi": 11
//         }
//     ]
// }
