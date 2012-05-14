/**
 * @constructor
 * @param {Object=} data
 * @extends {model.record.User}
 */
var Bakery = function (data) {

    /**
     * @type {model.record.City}
     */
    this.city = null;

    /**
     * @type {string}
     */
    this.address = '';

    /**
     * @type {string}
     */
    this.phone = '';

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

    this.city = new model.record.City(data['city']);

    this.address = data['address'] || '';
    this.phone = data['phone'] || '';
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
    result['city'] = this.city.serialize();
    result['deliveryPrice'] = this.deliveryPrice;
    result['cashExtraCharge'] = this.cashExtraCharge;
    result['contactEmail'] = this.contactEmail;
    result['contactPhone'] = this.contactPhone;
    result['contactName'] = this.contactName;
    result['address'] = this.address;
    result['phone'] = this.phone;

    return result;
};

/**
 * @constructor
 * @extends {Bakery}
 */
model.record.Bakery = Bakery;

tuna.model.getRecordFactory().registerRecord('bakery', new model.record.Bakery());