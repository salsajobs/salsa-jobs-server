const Offer = require('../src/jobs/Offer');

const offer = new Offer({
  channel_id: 'channel_id_mock',
  user_id: 'user_id_mock',
  user_name: 'user_name_mock',
  text: 'https://example.com/foo/bar We are looking for a software expert'
});

const existingOfferSnapshot = {
  val() {
    return offer;
  }
};

const noOfferSnapshot = {
  val() {
    return null;
  }
};

module.exports = { offer, existingOfferSnapshot, noOfferSnapshot };
