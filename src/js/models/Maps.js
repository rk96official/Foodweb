import axios from 'axios';
import {key2} from '../config';

export default class Search{
    constructor(query){
        this.query =query;
    }
     async getResults(){
        
    try{
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const res = await axios(`${proxy}https://www.google.com/maps/embed/v1/place?q=${this.query}&key=${key2}`);  
        this.result = res;
    }catch(error){
        alert(error);
    }
    }
}

