import axios from 'axios';
import {key} from '../config';

export default class Reviews {
    constructor(id) {
        this.id = id;
    }

    async getReviews() {
        try {
            const res = await axios(`https://developers.zomato.com/api/v2.1/reviews?res_id=${this.id}&apikey=${key}`);
            this.results = res;
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
}
