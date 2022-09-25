// importing all required tools
import { useState, useEffect } from "react";
import "./App.css";
import { DesktopView } from "./Component/desktopView/desktopView";
import { MobileView } from "./Component/mobileView/mobileView";

// main app function
function App() {
  const [locState, setLocState] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success
          getCity([position.coords.latitude, position.coords.longitude]);
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

    function getCity(loc) {
      var xhr = new XMLHttpRequest();
      var lat = loc[0];
      var lng = loc[1];

      // Paste your LocationIQ token below.
      xhr.open(
        "GET",
        "https://us1.locationiq.com/v1/reverse.php?key=pk.03cf02083f3e74512001032d18384b7b&lat=" +
          lat +
          "&lon=" +
          lng +
          "&format=json",
        true,
      );
      xhr.send();
      xhr.onreadystatechange = processRequest;
      xhr.addEventListener("readystatechange", processRequest, false);

      function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var city = response.address.state;
          setLocState(() => city);
          return;
        }
      }
    }
  }, []);

  // returning main content to render on screen
  return (
    <div className="App">
      <div id="desktopView">
        <DesktopView />
      </div>
      <div id="mobileView">
        <MobileView locState={locState} />
      </div>
    </div>
  );
}

export default App;
