var bodyParser = require('body-parser');

const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function (req, res) {
    console.log(req.body.text);
    fetch('https://nsjobs-f8648.firebaseio.com/jobs.json', { method: 'POST', body: `{"url" : "${req.body.text}"}` })
        .then(res => res.json())
        .then(json => {
            res.send(json);
        })
        .catch(err => {
            console.log(err);
            res.send(500);
        });

});

app.listen(PORT);