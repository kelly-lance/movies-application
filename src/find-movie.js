module.exports = {
    findMovieById: (id) => {
        return fetch('/api/movies/' + id )
            .then(response => response.json());
    }
};
