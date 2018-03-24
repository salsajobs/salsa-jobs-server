const WEBSITE_URL =  process.env.ALLOWED_CLIENT_URL;
const ERROR_PAGE_PATH = `${WEBSITE_URL}/error.html`;

module.exports = Object.freeze({
  Oauth: Object.freeze({
    Login: Object.freeze({
      Success: {
        CODE: 200,
        REDIRECT_PATH: `${WEBSITE_URL}/welcome.html`
      },
      Error: {
        CODE: 500,
        REDIRECT_PATH: ERROR_PAGE_PATH
      }
    })
  })
});
