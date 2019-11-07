import axios from 'axios';
import { key1 } from '../config';

export default class HourlyWeather{
    constructor(query){
        this.query =query;
    }
     async getResults(){
        try{
            const res = await axios(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${query}&units=metric&APPID=${key1}`);
            this.result = res.data;
        }catch(error){
            alert(error);
        }
    }
}