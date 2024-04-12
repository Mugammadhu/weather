import './weather.css'
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types'



import clearIcon from '../assets/clear1.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import searchIcon from '../assets/search.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
  return(
    <>
    <div className="image">
      <img src={icon} alt="Image" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className="cord">
      <div >
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div >
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%
          </div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt="humidity" className='icon'/>
        <div className="data">
          <div className="wind-percent">{wind} km/h
          </div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
    </div>
    </>
  )
};
WeatherDetails.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
  
}




export const Weather = () => {
let api_key="b0f869879efb5c5bd429d31de6a6670a"
const [text,setText]=useState("chennai")


  const [icon,setIcon]=useState(snowIcon)
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("")
  const [country,setCountry]=useState("")
  const [lat,setlat]=useState(0)
  const [log,setLog]=useState(0)
  const [wind,setWind]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [cityNotFound,setCityNotFound]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error1,setError1]=useState(null)


  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03n":drizzleIcon,
    "03d":drizzleIcon,
    "04n":drizzleIcon,
    "04d":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }

  const search =async ()=>{
    setLoading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`
    
    try{
        let res=await fetch(url);
        let data=await res.json();
        if(data.cod==="404"){
          console.log("city not found")
          setCityNotFound(true);
          setLoading(false);
          return;
        }
      
        
          setTemp(Math.floor(data.main.temp));
          setlat(data.coord.lat);
          setLog(data.coord.lon);
          setHumidity(data.main.humidity);
          setCity(data.name);
          setCountry(data.sys.country)
          setWind(data.wind.speed)
          const iconCode=data.weather[0].icon;
          setIcon(weatherIconMap[iconCode] || clearIcon)
          setCityNotFound(false)
          
        
    }
    catch(error){
      console.error("An erroe occured",error)
      setError1("An Error occured while fetching  the weather data.")
    }
    finally{
      setLoading(false)
      console.log(loading,cityNotFound)
    }
  }

  function handleKeyDown(e){
    if (e.key === 'Enter') {
      search()
    }
  }
  useEffect(function(){
    search();
  },[])




  return (
    <div className='container'>
      <div className="input-container">
        <input type="text" className='cityInput' placeholder='Search City' onChange={(e)=>{setText(e.target.value)}} value={text} onKeyDown={handleKeyDown}/>
     
        <div className="search-icon" onClick={()=>search()}>
          <img src={searchIcon} alt="search" width="25px"/>
        </div>
      </div>
     
      {loading && <div className='loading-message'>Loading</div>}
      { error1 && <div className='error-message'>{error1}</div>}
      {cityNotFound && <div className='city-not-found'>City Not Found</div>}
      {!cityNotFound && !loading &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} wind={wind} humidity={humidity}/>}
      <p className="copyright">
        Designed by <span>Mugammadhu Sate</span>
      </p>
    </div>
  )
}
