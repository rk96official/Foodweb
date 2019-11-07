import { elements } from './base';


export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

export const limitRestTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}
const renderRest = restaurants => {
    
    const markup = `
        <li>
            <a class="results__link" href="#${restaurants.restaurant.R.res_id}">
                <figure class="results__fig">
                    <img src="${restaurants.restaurant.featured_image}" alt="${restaurants.restaurant.name}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRestTitle(restaurants.restaurant.name)}</h4>
                    <p class="results__rating">${restaurants.restaurant.user_rating.aggregate_rating}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};


export const renderResults = (restaurant) => {
    // // render results of currente page
    // const start = (page - 1) * resPerPage;
    // const end = page * resPerPage;
    restaurant.forEach(renderRest);
};