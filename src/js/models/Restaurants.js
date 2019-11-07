import axios from 'axios';
import {key} from '../config';

export default class Restaurants {
    constructor(id) {
        this.id = id;
    }

    async getRestaurants() {
        try {
            const res = await axios(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.id}&apikey=${key}`);
            this.name = res.data.name;
            this.cuisines = res.data.cuisines;
            this.img = res.data.featured_image;
            this.url = res.data.url;
            this.address = res.data.location.address;
            this.timings = res.data.timings;
            this.reviews = res.data.all_reviews.reviews;
            this.menu = res.data.menu_url;
            this.highlights = res.data.highlights;
            this.photos = res.data.photos;

            console.log(this.photos);
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
}
