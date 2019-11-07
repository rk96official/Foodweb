import axios from 'axios';
import { key1 } from '../config';

export default class Fiveday{
    constructor(query){
        this.query =query;
    }
     async getResults(){
        try{
            const res = await axios(`http://api.openweathermap.org/data/2.5/forecast?q=${this.query}&units=metric&APPID=${key1}`);
            this.result = res.data;
            console.log(this.result);
        }catch(error){
            alert(error);
        }
    }
}