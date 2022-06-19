import { useState } from "react";
import "./App.css";

function App() {
  document.body.style.background =
    "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
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
              <h1>Delhi</h1>
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
