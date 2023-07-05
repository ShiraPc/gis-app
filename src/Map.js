import React, { useEffect, useRef } from 'react';
import WebMap from "@arcgis/core/WebMap.js";
import * as projection from "@arcgis/core/geometry/projection.js";
import {Map as Map_} from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import { loadModules } from "esri-loader";

function Map(){
    const mapRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
          
          const [Map, MapView, FeatureLayer] = await loadModules(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"]);
          const map = new Map({
            // basemap layer service calling
            basemap: "arcgis-topographic" 
          });

          const view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 8,
            // zoom in israel
            center: [34.8516, 31.0461]
          });

          //creating a layers 
          const citiesLayer = new FeatureLayer({
            url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0',
            outFields: ['CITY_NAME', 'POP'],
            renderer: {
              type: 'simple',
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: [255, 0, 0],
                size: 6,
                outline: {
                  color: [0, 0, 0],
                  width: 0.5,
                },
              },
            },
            //creating popups for the layers
            popupTemplate: {
              title: '{CITY_NAME}',
              content: 'Population: {POP}',
            },
            //filtering the cities by capitalization
            definitionExpression: "STATUS = 'National and provincial capital'",
          });
           // add the cities layer to the map
        map.add(citiesLayer);

        // setting the view's popup to display the popups when it clicked
      view.popup.defaultPopupTemplateEnabled = true;
      view.popup.watch("selectedFeature", (selectedFeature) => {
        if (selectedFeature) {
          view.popup.open({
            features: [selectedFeature],
            updateLocationEnabled: true
          });
        }
      });
        }
        fetchData();
      }, []); 
      return <div id="viewDiv" style={{ height: '100vh', width: '100%' }} />;
      
}

export default Map;