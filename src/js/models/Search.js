import axios from 'axios';
import {key} from '../config';
export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults(){
        
        try{
        const res = await axios(`https://developers.zomato.com/api/v2.1/locations?query=${this.query}&apikey=${key}`);
        
        const loc = res.data.location_suggestions[0].entity_id;
       
        const loc1 =  res.data.location_suggestions[0].entity_type;
       
        const res2 = await axios(`https://developers.zomato.com/api/v2.1/search?entity_type=${loc1}&entity_id=${loc}&sort=rating&apikey=${key}`);
      
        this.result= res2.data.restaurants;
        
        
        }
        catch(error) {
            alert(error);
    
        }
    }
}