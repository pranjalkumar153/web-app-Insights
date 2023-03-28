import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights} from '../services/appInsights';


function WeatherApp(){
    const [weather, setWeather] = useState('');
    const [location, setLocation] = useState('London');
    const [aqiRequired, setAqiRequired] = useState('Yes');
    let api_key = '23218525bb6b4a84ae361448232803'
    let baseUrl = 'http://api.weatherapi.com/v1/current.json?key='+api_key+'&q='+location+'&aqi='+aqiRequired;

    const handleClick = ()=>{

        axios.get(baseUrl).then(
            (response) =>{
                setWeather(JSON.stringify(response));
            }
        ).catch((error)=>{setWeather('Could not retrieve Data')})
    }
    
    return(
        <>
            <h1>Enter Location</h1>
            <input type='text' onChange={(e)=>{setLocation(e.target.value)}}/>
            <h1>AQI required?</h1>
            <input type='text' onChange={(e)=>{setAqiRequired(e.target.value)}}/>
            <br/>
            <br/>
            <button className='btn btn-primary' onClick={handleClick}>Fetch Weather</button>
            <h2>Weather Conditions</h2>
            <code>
                {weather}
            </code>
        </>
    )
}

export default withAITracking(reactPlugin, WeatherApp);