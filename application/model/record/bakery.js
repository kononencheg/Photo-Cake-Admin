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
     * @type {Array.<string>}
     */
    this.dimensionIds = null;

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
    this.dimensionIds = data['available_dimension_ids'] || null;
};

/**
 * @override
 */
Bakery.prototype.serialize = function() {
    var result = model.record.User.prototype.serialize.call(this);
    result['name'] = this.city;
    result['deliveryPrice'] = this.deliveryPrice;
    result['dimensionIds'] = this.dimensionIds;

    return result;
};

/**
 * @constructor
 * @extends {Bakery}
 */
model.record.Bakery = Bakery;

tuna.model.recordFactory.registerRecord('bakery', new model.record.Bakery());