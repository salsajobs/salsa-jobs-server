const URL_REGEX = /(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

class Offer {
    constructor(rawText) {
        this.link = this._getLink(rawText);
        this.description = this._getDescription(rawText, this.link);
        this.createdAt = Date.now();
        this.text = rawText;
    }

    _getLink(string) {
        try {
            const link = string.match(URL_REGEX);
            return link[0];
        } catch (err) {
            throw new Error('Job offers must have a link.');
        }
    }

    _getDescription(rawText, link) {
      return rawText.replace(link, '').trim();
    }
}

module.exports = Offer;
