import React, { CSSProperties, useEffect, useRef } from "react";

import { Loader } from "@googlemaps/js-api-loader";

import "./Map.css";

const loader = new Loader({
  apiKey: "AIzaSyC30YW39Ji0oNvPY4DbdfiEzdUS2-qrKGk",
  version: "weekly",
});

interface IMap {
  name?: string;
  style?: CSSProperties;
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const Map = (props: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { center, zoom } = props;

  function initMap() {
    const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
      center: center,
      zoom: zoom,
    });

    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
    });
  }

  useEffect(() => {
    loader.loadCallback(initMap);
  }, [center, zoom]);

  return (
    <div
      id="map"
      ref={mapRef}
      className={`map ${props.name}`}
      style={props.style}
    ></div>
  );
};

export default Map;
