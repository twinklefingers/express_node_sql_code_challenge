$(document).ready(function() {
    console.log('werkin');

    //function to make it go
    getAnimals();

    //event listener
    $('#animal-submit').on('click', postAnimal);

});

function getAnimals() {
    $.ajax({
        type: 'GET',
        url: '/zoo',
        success: function(zoo) {
            console.log('GET /zoo returns:', zoo);

            zoo.forEach(function(animal) {
                var $el = $('<div></div>');

                $el.data('animalId', animal.id);
                $el.data('animalName', animal.animal);
                $el.append('<strong>' + animal.animal + '</strong>');
                $el.append('<em>' + ' Number at zoo: ' + animal.numanimals +
                    ' ' + animal.animal + 's' + '</em'); //case sensitive!!


                $('#animal-list').append($el);
            });
        },

        error: function(response) {
            console.log('GET /zoo fail. No animals could be retrieved!');
        },
    });
}
/**
 * Add a new animal to the database and refresh the DOM
 */
function postAnimal() {
    event.preventDefault();

    var animal = {};

    $.each($('#animal-form').serializeArray(), function(i, field) {
        animal[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/zoo',
        data: animal,
        success: function() {
            console.log('POST /zoo works!');
            $('#animal-list').empty();
            getAnimals();
        },

        error: function(response) {
            console.log('POST /zoo does not work...');
        },
    });
}
