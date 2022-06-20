import { useState } from "react";
import "./App.css";

function App() {
  document.body.style.background =
    "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";

  const date = new Date();
  const week = [
    "Sunday",
    "Monday",
    "Tusday",
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
  return (
    <div className="App">
      <div id="weather-app-main-div">
        <div id="navbar">
          <h1>Weather app</h1>
          <div>
            <div class="navbar-search">
              <input
                type="text"
                class="navbar-search-txt"
                placeholder="Search city >>>"
              />
              <button class="navbar-search-btn">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div id="weather-app">
          <div id="city-weather-display">
            <div>
              <div>
                <h1>Delhi</h1>
                <p>{today}</p>
                <p>Feels like: 34°C</p>
              </div>
              <div>
                <div>
                  <p>
                    <strong>Temp:</strong> 23°C
                  </p>
                  <p>
                    <strong>Max:</strong> 34°C <strong>Min:</strong> 12°C
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Humidity:</strong> 234
                  </p>
                  <p>
                    <strong>Wind speed:</strong> 3.32
                  </p>
                  <p>
                    <strong>AQI:</strong> 234
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="graph-week-display">
            <div></div>
            <div></div>
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
