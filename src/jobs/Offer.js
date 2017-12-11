const URL_REGEX = /(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

/**
 *
 */

class Offer {
    /**
     *
     * @param {object} query
     */
    constructor(query) {
        console.log('\nOFFER: ', query);
        if (query.attachments) {
            this.link = this._getLink(query.attachments[0].fallback);
        } else {
            this.link = this._getLink(query.text);
        }
        this.description = this._getDescription(query.text, this.link);
        this.createdAt = Date.now();
        this.text = query.text;
        this.meta = query;
        this.shared = 0;
        this.votes = {
            upvotes: [],
            downvotes: []
        };
    }

    _getLink(string) {
        try {
            const link = string.match(URL_REGEX);
            return link[0];
        } catch (err) {
            throw new Error(`Job offers must have a link. [${string}]`);
        }
    }

    _getDescription(rawText, link) {
        return rawText.replace(link, '').trim();
    }
}

module.exports = Offer;
