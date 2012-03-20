/**
 * @constructor
 * @param {Object=} data
 * @extends {model.record.User}
 */
var Bakery = function (data) {
    /**
     * @type string
     */
    this.city = '';

    /**
     * @type number
     */
    this.deliveryPrice = 0;

    /**
     * @type {Object.<string, number>}
     */
    this.decorationPrices = {};

    model.record.User.call(this, data);
};

tuna.utils.extend(Bakery, model.record.User);

/**
 * @override
 */
Bakery.prototype.populate = function(data) {
    model.record.User.prototype.populate.call(this, data);

    this.city = data['city'] && data['city']['name'] || null;
    this.deliveryPrice = data['delivery_price'] || null;
    this.decorationPrices = {};

    var prices = data['decoration_prices'];
    for (var decorationId in prices) {
        this.decorationPrices[decorationId] = prices[decorationId]['price'];
    }
};

/**
 * @override
 */
Bakery.prototype.serialize = function() {
    var result = model.record.User.prototype.serialize.call(this);
    result['name'] = this.name;
    result['city'] = this.city;
    result['deliveryPrice'] = this.deliveryPrice;

    return result;
};

/**
 * @constructor
 * @extends {Bakery}
 */
model.record.Bakery = Bakery;

tuna.model.recordFactory.registerRecord('bakery', new model.record.Bakery());