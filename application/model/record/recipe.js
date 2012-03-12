/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Recipe = function (data) {
    /**
     * @type string
     */
    this.id = '';

    /**
     * @type string
     */
    this.bakeryId = '';

    /**
     * @type string
     */
    this.name = '';

    /**
     * @type string
     */
    this.desc = '';

    /**
     * @type string
     */
    this.imageUrl = '';

    /**
     * @type Array.<Object>
     */
    this.dimentionPrices = null;

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Recipe, tuna.model.Record);

/**
 * @override
 */
Recipe.prototype.populate = function(data) {
    this.id = data['id'];
    this.bakeryId = data['bakery_id'];
    this.name = data['name'];
    this.desc = data['desc'];
    this.imageUrl = data['image_url'];
    this.dimentionPrices = data['dimension_prices'] || null;
};

/**
 *
 * @param {Array.<string>=} weights
 * @return {Object}
 */
Recipe.prototype.serialize = function(weights) {
    var result = {
        'id': this.id,
        'bakeryId': this.bakeryId,
        'name': this.name,
        'desc': this.desc,
        'imageUrl': this.imageUrl,
        'dimensionPrices': this.dimentionPrices
    };

    if (weights !== undefined) {
        var prices = [];

        var i = 0,
            l = weights.length;

        var weightKey = null;
        var price = null;
        while (i < l) {
            price = { 'weight': weights[i] };

            if (this.dimentionPrices !== null) {
                weightKey = (weights[i] + '').replace('.', '_');
                if (this.dimentionPrices[weightKey] !== undefined) {
                    price['price'] = this.dimentionPrices[weightKey]['price'];
                }
            }

            prices.push(price);

            i++;
        }

        result['dimensionPrices'] = prices;
    }


    return result;
};

/**
 * @constructor
 * @extends {Recipe}
 */
model.record.Recipe = Recipe;

tuna.model.recordFactory.registerRecord('recipe', new model.record.Recipe());