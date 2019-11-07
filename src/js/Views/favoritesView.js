import { elements } from './base';
import { limitRestTitle } from './searchView';

export const togglefavoriteBtn = isfavorite => {
    const iconString = isfavorite ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.restaurant__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};

export const togglefavoriteMenu = numfavorites => {
    elements.favoritesMenu.style.visibility = numfavorites > 0 ? 'visible' : 'hidden';
};

export const renderfavorite = favorite => {
    const markup = `
        <li>
            <a class="favorites__link" href="#${favorite.id}">
                <figure class="favorites__fig">
                    <img src="${favorite.img}" alt="${favorite.name}">
                </figure>
                <div class="favorites__data">
                    <h4 class="favorites__name">${limitRestTitle(favorite.name)}</h4>
                    <p class="favorites__author">${favorite.address}</p>
                </div>
            </a>
        </li>
    `;
    elements.favoritesList.insertAdjacentHTML('beforeend', markup);
};

export const deletefavorite = id => {
    const el = document.querySelector(`.favorites__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}