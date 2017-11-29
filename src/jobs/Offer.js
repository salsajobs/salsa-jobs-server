const URL_REGEX = /(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

class Offer {
    constructor(rawText) {
        this.link = this._getLink(rawText);
        this.createdAt = Date.now();
        this.description = rawText.replace(this.link, '').trim();
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
}

module.exports = Offer;