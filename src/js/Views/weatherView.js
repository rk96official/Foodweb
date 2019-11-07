import { elements } from './base';
import {key2} from '../config';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.weather.innerHTML = '';
};
const days = (day) => {
    switch(day)
    {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
            
        case 2:
            return "Tuesday";
            
        case 3:
            return "Wednesday";
            
        case 4:
            return "Thursday";
            
        case 5:
            return "Friday";

        case 6:
            return "Saturday";
        default:
            return "Invalid";
            
    }
}
const time = (hour) =>
{
    if (hour >= 12){
        return "PM";
    }else{
        return "AM";
    }
}
const month = (month) =>{
    switch(month){
        case 0: return "January";
            
        case 1: return "February";
            
        case 2: return "March";
            
        case 3: return "April";
            
        case 4: return "May";
            
        case 5: return "June"; 
            
        case 6: return "July";
            
        case 7: return "August";
            
        case 8: return "September";
            
        case 9: return "October";
            
        case 10: return "November";
            
        case 11: return "December";
            
        }
}

const hour = (hours) =>{
    switch(hours){
        case 13: return 1;
            
        case 14: return 2;
            
        case 15: return 3;
            
        case 16: return 4;
            
        case 17: return 5;
            
        case 18: return 6; 
            
        case 19: return 7;
            
        case 20: return 8;
            
        case 21: return 9;
            
        case 22: return 10;
            
        case 23: return 11;
            
        case 24: return 12;
        default: return hours;  
        }
}
export const renderWeather = (weather, fiveday) => {
    const icon =weather.weather[0].icon;
    const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    var SRD = new Date(weather.sys.sunrise*1000);
    var SSD = new Date(weather.sys.sunset*1000);
    var NOW = new Date(weather.dt*1000);
    
    const markup = `
    <center>
        <h3>${weather.weather[0].main.toUpperCase()}</h3><br />
        <br />
        <h1><big><b>${weather.main.temp}°</b></big></h1><br />
        <img src="${url}" alt="Weather" />
        
    </center>
    <div>
    <center>
    <span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Today ${hour(NOW.getHours())}:${(NOW.getMinutes()<10?'0':'') + NOW.getMinutes()}  ${time(NOW.getHours())}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ${weather.main.temp_max}°  &nbsp;&nbsp;&nbsp;  ${weather.main.temp_min}°
     </span>
        </center>
    </div>
        <div class="weathers">
             <ul class="fiveday">

                 <li class = "list">
                    <span>  SUNRISE <br /> 
                    <h2>${hour(SRD.getHours())}:${(SRD.getMinutes()<10?'0':'') + SRD.getMinutes()} ${time(SRD.getHours())}</h2></span>
                  </li>
                  <li class = "list">
                        <span>SUNSET<br />
                        <h2>${hour(SSD.getHours())}:${(SSD.getMinutes()<10?'0':'') + SSD.getMinutes()} ${time(SSD.getHours())}</h2></span>
                </li>
                <li class = "list">
                        <span> HUMIDITY <br />
                        <h2> ${weather.main.humidity} % </h2></span>
                </li>
                <li class = "list">
                        <span> PRESSURE <br />
                        <h2> ${weather.main.pressure} hPa </h2><br /></span>
                </li>
                <li class = "list">
                        <span> WIND <br />
                        <h2>${weather.wind.speed} m/s</h2> <br /></span>
                </li>
                <li class = "list">
                        <span> VISIBILITY <br />
                        <h2>${weather.visibility} m </h2><br /></span>
                </li>
    
        </ul>
        </div>  
        <div class="weathers">
            <h3>FIVE DAY FORECAST</h3>
            <br />
            <ul class="fiveday">
                ${fiveday.list.map(el => createmap(el)).join('')}
            </ul>
        </div>  
    `;
    elements.weather.insertAdjacentHTML('beforeend', markup);
};

const createmap = el => `
<li class = "list">
        ${days(new Date(el.dt*1000).getDay())} <br />
        ${month(new Date(el.dt*1000).getMonth())} ${new Date(el.dt*1000).getDate()}<br />
        ${hour(new Date(el.dt*1000).getHours())}:${(new Date(el.dt*1000).getMinutes()<10?'0':'') + new Date(el.dt*1000).getMinutes()} ${time(new Date(el.dt*1000).getHours())}  <br />
        ${el.main.temp_max}° ${el.main.temp_min}° <br />
        <img src="http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png" alt="Weather" height = "60" width = "60" ></img>
       </li>
`;

