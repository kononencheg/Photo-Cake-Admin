/**
 * @constructor
 * @param {Object=} data
 * @extends {model.record.User}
 */
var Bakery = function (data) {

    /**
     * @type {string}
     */
    this.city = '';

    /**
     * @type {string}
     */
    this.address = '';

    /**
     * @type {string}
     */
    this.contactName = '';

    /**
     * @type {string}
     */
    this.contactPhone = '';

    /**
     * @type {string}
     */
    this.contactEmail = '';

    /**
     * @type {number}
     */
    this.cashExtraCharge = 0;

    /**
     * @type {number}
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

    this.city = data['city'] && data['city']['name'] || '';

    this.address = data['address'] || '';
    this.contactName = data['contact_name'] || '';
    this.contactPhone = data['contact_phone'] || '';
    this.contactEmail = data['contact_email'] || '';
    this.deliveryPrice = data['delivery_price'] || 0;
    this.cashExtraCharge = data['cash_extra_charge'] || 0;

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
    result['cashExtraCharge'] = this.cashExtraCharge;
    result['contactEmail'] = this.contactEmail;
    result['contactPhone'] = this.contactPhone;
    result['contactName'] = this.contactName;
    result['address'] = this.address;

    return result;
};

/**
 * @constructor
 * @extends {Bakery}
 */
model.record.Bakery = Bakery;

tuna.model.getRecordFactory().registerRecord('bakery', new model.record.Bakery());