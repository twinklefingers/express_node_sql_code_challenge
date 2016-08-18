var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = 'postgres://localhost:5432/B1-66-ER';

var ranNum = require('./randomNum');



router.get('/', function(req, res) {
    // Retrieve books from database
    pg.connect(connectionString, function(err, client, done) {

        if (err) {
            console.log('err', err);
            res.sendStatus(500);
        }

        client.query('SELECT * FROM zoo', function(err, result) { //second param always holds results, no matter what it's called
            done(); //only 10 query connections can be open at once, so call done or the connections will stay open and the 11th query wont work
            if (err) {
                console.log('err', err);
                res.sendStatus(500);

            }
            res.send(result.rows);
        });
    });
});

router.post('/', function(req, res) {
    var animal = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('err', err);
            res.sendStatus(500);
        } //thinking about adding randomNum function to client.query
        client.query('INSERT INTO zoo (animal, numanimals)' +
            'VALUES ($1, $2)', //"prepared statement"
            [animal.animal, animal.numanimals], // beware SQL injections!

            function(err, result) {
                done();
                if (err) {
                    console.log('err', err);
                    res.sendStatus(500);
                }
                res.sendStatus(201);
            });
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    var animal = req.body;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('err', err);
            res.sendStatus(500);
        }

        client.query('UPDATE zoo ' +
            'SET animal = $1, ' +
            'numanimals = $2, ' + // this may not be needed...
            'WHERE id = $3', [animal.animal, animal.numanimals, id],
            function(err, result) {
                done();

                if (err) {
                    console.log('err', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
    });
});

module.exports = router;
