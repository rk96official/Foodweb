import Search from './models/Search';
import Restaurants from './models/Restaurants';
import Weather from './models/Weather';
import Favorites from './models/Favorites';
import Reviews from './models/Reviews';
import * as searchView from './views/searchView';
import * as weatherView from './views/weatherView';
import * as restaurantsView from './views/restaurantsView';
import * as mapsView from './views/mapView';
import * as favoritesView from './views/favoritesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Fiveday from './models/Fiveday';


const state = {};

document.body.style.backgroundImage = "url('https://media.giphy.com/media/1zkrF3l0RfgapqdySj/giphy.gif')";


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    
    controlWeather();
    document.body.style.backgroundImage = "linear-gradient(to right, lightblue , green)";
});


/** 
 * WEATHER CONTROLLER
 */
const controlWeather = async () => {
    const query = weatherView.getInput();
    mapsView.cleartop();
    weatherView.clearInput();
    if (query) {
        
        try {
            state.weather = new Weather(query);
            state.fiveday= new Fiveday(query);
            // 4) Search for weather
            await state.weather.getResults();
            await state.fiveday.getResults();
            controlSearch(query);
            
            // 5) Render results on UI
            weatherView.renderWeather(state.weather.result, state.fiveday.result);
            mapsView.rendertop(state.weather.result);
            mapsView.renderCity(query);
            clearLoader();
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}


/** 
 * SEARCH CONTROLLER
 */



const controlSearch = async (query) => {
  
    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);
        mapsView.clearMap();
        // 3) Prepare UI for results
        
        searchView.clearResults();
        weatherView.clearResults();
        restaurantsView.clearRestaurant();
        renderLoader(elements.searchRes);
        renderLoader(elements.weather);
        try {
            // 4) Search for restaurants
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
      
         } catch (err) {
             alert('Something wrong with the search...');
               clearLoader();
        }
    }
}



/** 
 * RESTAURANT CONTROLLER
 */
const controlRestaurant = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        restaurantsView.clearRestaurant();
        renderLoader(elements.restaurant);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new restaurant object
        state.restaurant = new Restaurants(id);
        state.reviews = new Reviews(id);
        try {
            // Get restaurant data and parse ingredients
            await state.restaurant.getRestaurants();
            await state.reviews.getReviews();
            // Render restaurant
            console.log(state.reviews.results.data);
            clearLoader();
            document.body.style.backgroundImage = "linear-gradient(to right, lightblue , green)";
            restaurantsView.renderRestaurant(
                state.restaurant,
                state.favorites.isFavorite(id),
                state.reviews.results.data
            );
            
            mapsView.clearMap();
            mapsView.renderCity(state.restaurant.address);
        } catch (err) {
            console.log(err);
            alert('Error processing restaurant!');
        }
    }
};
 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRestaurant));

/** 
 * favorite CONTROLLER
 */
const controlfavorite = () => {

    

    if (!state.favorites) state.favorites = new Favorites();
    const id = window.location.hash.replace('#', '');

    // User has NOT yet favorited current restaurant
    if (!state.favorites.isFavorite(id)) {
        // Add favorite to the state
        const newfavorite = state.favorites.addfavorite(
            id,
            state.restaurant.name,
            state.restaurant.address,
            state.restaurant.img
        );
        // Toggle the favorite button
        favoritesView.togglefavoriteBtn(true);

        // Add favorite to UI list
        favoritesView.renderfavorite(newfavorite);

    // User HAS favorited current restaurant
    } else {
        // Remove favorite from the state
        state.favorites.deletefavorite(id);

        // Toggle the favorite button
        favoritesView.togglefavoriteBtn(false);

        // Remove favorite from UI list
        favoritesView.deletefavorite(id);
    }
    favoritesView.togglefavoriteMenu(state.favorites.getNumfavorites());
};

// Restore favorited restaurants on page load
window.addEventListener('load', () => {
    state.favorites = new Favorites();
    
    // Restore favorites
    state.favorites.readStorage();

    // Toggle favorite menu button
    favoritesView.togglefavoriteMenu(state.favorites.getNumfavorites());

    // Render the existing favorites
    state.favorites.favorites.forEach(favorite => favoritesView.renderfavorite(favorite));
});


// Handling restaurant button clicks
elements.restaurant.addEventListener('click', e => {
    if (e.target.matches('.restaurant__love, .restaurant__love *')) {
        // favorite controller
        controlfavorite();
    }
});

