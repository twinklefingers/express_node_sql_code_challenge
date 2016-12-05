$(document).ready(function() {
    console.log('client-app hooked up and running');

    //function to make it go
    getAnimals();

    //event listener
    $('#animal-submit').on('click', postAnimal);
}); // end doc ready


//Add a new animal to the database and refresh the DOM
function postAnimal() {
    // initialize empty animal object
    var animal = {};

    // field here refers to user "input field"
    $.each($('#animal-form').serializeArray(), function(i, field) {
        animal[field.name] = field.value;
    });

    // ajax post call to getAnimasl on the DOM
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
        }
    });
}


function getAnimals() {
    $.ajax({
        type: 'GET',
        url: '/zoo',
        success: function(data) {
            console.log('GET /zoo returns:', data);

            data.forEach(function(animal) {
                console.log(animal);
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
