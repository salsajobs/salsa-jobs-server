const app = require('express')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const firebase = require('firebase');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const SLACK_BOT_URL = 'https://hooks.slack.com/services/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';

app.post('/jobs', function (req, res) {
  console.log(req.body.text);
  const offer = {
    text: req.body.text
  };
  
  fetch('https://nsjobs-f8648.firebaseio.com/jobs.json', { method: 'POST', body: `{"url" : "${req.body.text}"}` })
    .then(res => res.json())
    .then(json => fetch(SLACK_BOT_URL, { method: 'POST', body: body }))
    .then(() => res.send(201).send(offer))
    .catch(err => {
      console.log(err);
      res.send(500);
    });
});

app.listen(PORT);