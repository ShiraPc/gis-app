import React, { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import Map from './Map';
import esriConfig from "@arcgis/core/config.js";

// import esriConfig from "@arcgis/core/config.js";
// esriConfig.assetsPath = "./assets";

import "./App.css";

function App() {
  esriConfig.assetsPath = "./assets";

  return (
    <>
    <h1>hello</h1>
    <Map></Map>
    </>
  )
}

export default App;
