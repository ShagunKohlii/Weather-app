import React, { useEffect, useState } from "react";
import "./style/stylehome.css";

const Home = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      if (buttonClicked) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d460db74bf241cca8bd0c0e29dd9f04a`;
        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson);
        if (resJson.cod === "404") {
          setCity(null);
        } else {
          setCity(resJson.main);
        }
      }
    };
    fetchApi();
  }, [search, buttonClicked]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setButtonClicked(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <div className="box">
            <h1 id="title">Weather App</h1>
            <label htmlFor="locationInput"></label>
            <input
              type="searchfield"
              id="locationInput"
              className="inputfield"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => setButtonClicked(true)}
              htmlFor="locationInput" 
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {!city ? (
            <p id="dataN">Check Weather
            <p>
              If no output is shown, it means data for that location is currently unavailable.</p></p>
            
          ) : (
            <div>
              <div className="info">
                <h2 className="location">
                  <i className="fa-solid fa-location-dot"></i> {search}
                </h2>
                <h1 className="temp">{city.temp}°C</h1>
                <p className="temp-min">
                  Max: {city.temp_max}°C | Min: {city.temp_min}°C
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
