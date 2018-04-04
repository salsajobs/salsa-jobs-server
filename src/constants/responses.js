const config = require('../../src/config/index');

module.exports = Object.freeze({
  Oauth: Object.freeze({
    Login: Object.freeze({
      Success: {
        CODE: 200,
        REDIRECT_PATH: `${config.ALLOWED_CLIENT_URL}/welcome.html`
      },
      Error: {
        CODE: 500,
        REDIRECT_PATH: `${config.ALLOWED_CLIENT_URL}/error.html`
      }
    })
  }),
  Jobs: Object.freeze({
    Post: Object.freeze({
      SuccessNew: {
        CODE: 201,
        MESSAGE: '¡Enhorabuena! Has añadido una nueva oferta de empleo a SalsaJobs.'
      },
      SuccessExisting: {
        CODE: 201,
        MESSAGE: 'La oferta de empleo que acabas de compartir ya estaba registrada en SalsaJobs, ¡Ahora también la puede votar tu equipo!'
      },
      Help: {
        CODE: 201,
        MESSAGE: '¡Hola! Para saber más sobre SalsaJobs, visita la web https://salsajobs.com'
      },
      Error: {
        CODE: 500,
        MESSAGE: 'Ups! No se ha podido registar la oferta de empleo.'
      }
    })
  })
});
