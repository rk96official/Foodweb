export default class favorites {
    constructor() {
        this.favorites = [];
    }

    addfavorite(id, name, address, img) {
        const favorite = { id, name, address, img };
        this.favorites.push(favorite);

        // Perist data in localStorage
        this.persistData();

        return favorite;
    }

    deletefavorite(id) {
        const index = this.favorites.findIndex(el => el.id === id);
        this.favorites.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

    isFavorite(id) {
        return this.favorites.findIndex(el => el.id === id) !== -1;
    }

    getNumfavorites() {
        return this.favorites.length;
    }

    persistData() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favorites'));
        
        // Restoring favorites from the localStorage
        if (storage) this.favorites = storage;
    }
}
