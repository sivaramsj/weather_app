import React, { useEffect, useState } from 'react'
import clear_icon from "../asserts/clear.png"
import cloud_icon from "../asserts/cloud.png"
import drizzle_icon from "../asserts/drizzle.png"
import humidity_icon from "../asserts/humidity.png"
import rain_icon from "../asserts/rain.png"
import search_icon from "../asserts/search.png"
import snow_icon from "../asserts/snow.png"
import wind_icon from "../asserts/wind.png"
import './weather_styles.css'


const Weather = () => {
    const api_key=process.env.REACT_APP_WEATHER_API;
    const[inputValue,setInputValue]=useState("");
    const[temp,setTemp]=useState(0);
    const[location,setLocation]=useState("No Location");
    const[humidity,setHumidity]=useState(0);
    const[wind,setWind]=useState(0);
    const[wicon,setWicon]=useState(cloud_icon)

    async function fetch_data(loc){
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=Metric&appid=${api_key}`;
        const data=await fetch(url).then((response)=>response.json());
        setTemp(data.main.temp);
        setLocation(data.name);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);

        console.log(data.weather[0].icon);

        if(["01d","01n"].includes(data.weather[0].icon))
            setWicon(clear_icon);
        else if(["02d","02n"].includes(data.weather[0].icon))
            setWicon(cloud_icon);
        else if(["03d","03n","04d","04n"].includes(data.weather[0].icon))
            setWicon(drizzle_icon);
        else if(["09d","09n","10d","10n"].includes(data.weather[0].icon))
            setWicon(rain_icon);
        else if(["13d","13n"].includes(data.weather[0].icon))
            setWicon(snow_icon);
        else
            setWicon(clear_icon);

    }

    useEffect(()=>{
        fetch_data("london");
    },[]);
    
    const handleSubmit= async()=>{
        if(inputValue===''){
            return 0;
        }
       await fetch_data(inputValue).then(()=>{
           setInputValue('') ;
       }); 
    }
    
    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" placeholder='Search' value={inputValue}  onChange={(e)=>{setInputValue(e.target.value)}}/>
                <div className="search-icon">
                    <img src={search_icon} alt="search" onClick={handleSubmit}/>
                </div>
            </div>

            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>

            <div className="weather-temp">{temp}°c</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">

                <div className="element">
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="humidity-percent">{humidity} %</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="humidity-percent">{wind} km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Weather