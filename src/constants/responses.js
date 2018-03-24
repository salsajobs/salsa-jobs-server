const WEBSITE_URL = process.env.ALLOWED_CLIENT_URL;

module.exports = Object.freeze({
  Oauth: Object.freeze({
    Login: Object.freeze({
      Success: {
        CODE: 200,
        REDIRECT_PATH: `${WEBSITE_URL}/welcome.html`
      },
      Error: {
        CODE: 500,
        REDIRECT_PATH: `${WEBSITE_URL}/error.html`
      }
    })
  })
});
