'use strict';

/**
 * es6 modules and imports
 */

import $ from 'jquery';

window.jQuery = $;
//--function import for movie cards-->
import cardBuilder from './card-builder'
import addMovie from './add-movie.js'
import deleteMovie from './delete-movie.js'
import editMovie from './edit-movie.js'
import modalBuilder from './modal-builder.js'

/**
 * require style imports
 */
//<--required plugins and imports-->
require('rateyo/src/jquery.rateyo');
require('bootstrap');
const {getMovies} = require('./api.js');
const {findMovieById} = require('./find-movie.js');

//<--function to get movies from api-->
let showAllMovies = (movies) => {
    console.log('Here are all the movies:');
    $('#main').empty();
    movies.forEach(({title, rating, id}) => {
        const mainContent = cardBuilder(title, rating, id);

        $('#main').append(mainContent);
    });
    //<--star rating on load for cards-->
    $(".rateYo").each(function () {
        $(this).rateYo({
            rating: $(this).data('rating'),
            starWidth: "20px",
            readOnly: true
        })
    });
};
getMovies().then(showAllMovies).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

//<--star rating user input-->
$(".rateYo").rateYo({
    rating: 1,
    starWidth: "20px"
});
//---------Adding new movie with title and star rating on button click--------->
$('#addNew').click(function (event) {
    event.preventDefault();
    console.log('I work!');
    const title = $('#input').val();
    const rating = $('#getRating').rateYo('rating');
    addMovie(title, rating).then((movie) => {
        const newCard = cardBuilder(movie.title, movie.rating, movie.id);
        $('#main').append(newCard);
        $(".rateYo").each(function () {
            $(this).rateYo({
                rating: $(this).data('rating'),
                starWidth: "20px",
                readOnly: true
            });

        });
        $('#input').attr('placeholder', 'Enter New Movie Title');
        $('#input').val('');
    });

});


//<--modal activation-->(
$('#myModal').modal('show');
//<--modal hide when movies are loaded-->
$.when(getMovies()).done(function () {
    $('#myModal').modal('hide');
});


//--------------click function for delete card---------------->

$('.row').on('click', '.close', function (event) {
    event.preventDefault();
    console.log('delete works!!');
    const $target = $(this).parent().parent().parent();
    $target.hide('slow', function () {
        $target.remove();
    });
    const id = event.target.id;
    console.log(id);
    deleteMovie(id);

});

//---------------function for edit card------------------->

$('.row').on('click', '.editMe', function (event) {
    event.preventDefault();
    console.log('edit click works');

    const id = $(event.target).data('id');

    console.log(id);

    findMovieById(id).then(movie => {

        console.log(movie);

        let modalHTML = modalBuilder(movie.title, movie.rating, id);

        $('#editModal').html(modalHTML);

        $('#editModal').modal('show');

        $(".rateYo").each(function () {
            $(this).rateYo({
                rating: $(this).data('rating'),
                starWidth: "20px",

            })
        });
    });
});


$('.hideModal').on('click', '#editButton', function (event) {
    event.preventDefault();

    const title = $('.editInput').val();
    const rating = $('.editRating').rateYo('rating');
    const id = $(event.target).data('id');


    // sends the edit request
    editMovie(title, rating, id)
        .catch(error => console.log(error))
        .then(() => {
            // refreshes the screen, should hide the modal
            getMovies()
                .catch(error => console.log(error))
                .then(showAllMovies)
                .then(() => {
                   $(".hideModal").modal("hide");
                });
        });
});
