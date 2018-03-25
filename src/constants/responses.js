const config = require('../../src/config/index');

module.exports = Object.freeze({
  Oauth: Object.freeze({
    Login: Object.freeze({
      Success: {
        CODE: 200,
        REDIRECT_PATH: `${config.WEBSITE_URL}/welcome.html`
      },
      Error: {
        CODE: 500,
        REDIRECT_PATH: `${config.WEBSITE_URL}/error.html`
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
      Error: {
        CODE: 500,
        MESSAGE: 'Ups! No se ha podido registar la oferta de empleo.'
      }
    })
  })
});
