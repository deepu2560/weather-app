import React from "react";

export const IconsDisplay = ({ weatherMain }) => {
  if (weatherMain == "haze") {
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/1779/1779807.png"
        style={{ width: "100%", height: "100%" }}
      />
    );
  } else if (weatherMain == "sunny") {
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/2698/2698194.png"
        style={{ width: "100%", height: "100%" }}
      />
    );
  } else if (weatherMain == "rainy") {
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/3313/3313966.png"
        style={{ width: "100%", height: "100%" }}
      />
    );
  } else if (weatherMain == "extreme") {
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/2337/2337478.png"
        style={{ width: "100%", height: "100%" }}
      />
    );
  } else if (weatherMain == "snow") {
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/2315/2315377.png"
        style={{ width: "100%", height: "100%" }}
      />
    );
  } else {
    return (
      <img
        src="https://cdn-icons-png.flaticon.com/512/2766/2766099.png"
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
};
