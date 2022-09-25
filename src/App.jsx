// importing all required tools
import { useState, useEffect } from "react";
import "./App.css";
import { DesktopView } from "./Component/desktopView/desktopView";
import { MobileView } from "./Component/mobileView/mobileView";

// main app function
function App() {
  const [loc, setLoc] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success
          setLoc([position.coords.latitude, position.coords.longitude]);
        },
        function error(error_message) {
          // for when getting location results in an error
          console.error(
            "An error has occured while retrievinglocation",
            error_message,
          );
        },
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log("geolocation is not enabled on this browser");
    }
  }, []);

  // returning main content to render on screen
  return (
    <div className="App">
      <div id="desktopView">
        <DesktopView />
      </div>
      <div id="mobileView">
        <MobileView
          lat={loc[0] ? loc[0].toFixed(4) : loc[0]}
          lon={loc[1] ? loc[1].toFixed(4) : loc[1]}
        />
      </div>
    </div>
  );
}

export default App;
