import { elements } from './base';
import * as mapsView from './mapView';
import {key2} from '../config';

export const clearRestaurant = () => {
    elements.restaurant.innerHTML = '';
};


const createreview = review => `
    <li class="restaurant__item">
        <figure class="results__fig">
                    <img src="${review.review.user.profile_image}">
        </figure>
        ${review.review.user.name} - (${review.review.user.foodie_level})<br>
        Rating: ${review.review.rating}<br>
        ${review.review.rating_text}<br>
        ${review.review.review_time_friendly}<br>
        ${review.review.review_text}  
        
    </li>
`;


export const renderRestaurant = (restaurants, isFavorite, reviews) => {
    const markup = `
    <br />
    <br />
    <br />
    <figure class="restaurant__fig">
        <img src="${restaurants.img}" alt="${restaurants.name}" class="restaurant__img">
        <h1 class="restaurant__title">
            <span>${restaurants.name}</span>
        </h1>
    </figure>
    <br />
    <br />
    <div class="restaurant__info">
        <b> Cuisines: </b>
    </div>
    <div class="restaurant__info">
        <svg class="restaurant__info-icon">
            <use href="img/icons.svg#icon-circle-with-plus"></use>
        </svg>
        <span class="restaurant__info-data">${restaurants.cuisines}</span>
    </div>
    <br />
    <div class="restaurant__info">
        <b> Services: </b>
    </div>
    <div class="restaurant__info">
         <br /><span class="restaurant__info-data">${restaurants.highlights}</span>
    </div>
    <br />
    <div class="restaurant__info">
        <svg class="restaurant__info-icon">
            <use href="img/icons.svg#icon-circle-with-plus"></use>
        </svg>
        <span class="restaurant__info-data restaurant__info-data--minutes">${restaurants.timings}</span>
    </div>
    <br />
    <div class="restaurant__info">
        <svg class="restaurant__info-icon">
            <use href="img/icons.svg#icon-circle-with-plus"></use>
        </svg>
        <span class="restaurant__info-data restaurant__info-data--minutes">
        ${restaurants.address}</span>
    </div>
    <br />
        
    <div class="restaurant__info" >
    <center>
        <button class="restaurant__love">
            <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${isFavorite ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </center>
    </div>
        
    <br />
    <div class="restaurant__info">
        <a class="btn-small restaurant__btn" href="${restaurants.menu}" target="_blank">
            <span>Menu</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    <br />
    <div class="restaurant__info">
        <a class="btn-small restaurant__btn" href="${restaurants.url}" target="_blank">
            <span>More Info</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    <br />
    
    <div class = "weathers">
        <h3><center>PHOTOS</center></h3><br>
        <ul class = "fiveday"> 
                ${restaurants.photos.map(el => createphoto(el)).join('')}
        </ul>
    </div>
    <div class="restaurant__reviews">
        <h3><center>REVIEWS</center></h3><br>
        <ul class="restaurant__reviews-list">
            ${reviews.user_reviews.map(el => createreview(el)).join('')}
        </ul>
    </div>  
    `;
    elements.restaurant.insertAdjacentHTML('afterbegin', markup);
}

const createphoto = el => `
        <li class = "list">
            <img src = "${el.photo.thumb_url}"  height = "250" width = "250"/>
        </li>
`;