/**
 * @constructor
 * @extends {model.record.User}
 */
var Bakery = function () {
    model.record.User.call(this);

    /**
     * @type string
     */
    this.city = '';

    /**
     * @type number
     */
    this.deliveryPrice = 0;
};

tuna.utils.extend(Bakery, model.record.User);

/**
 * @override
 */
Bakery.prototype.populate = function(data) {
    model.record.User.prototype.populate.call(this, data);

    this.city = data['city'] && data['city']['name'];
    this.deliveryPrice = data['delivery_price'];
};

/**
 * @override
 */
Bakery.prototype.serialize = function() {
    return {
        'id': this.id,
        'name': this.name + ' (' + this.city + ')',
        'email': this.email,
        'deliveryPrice': this.deliveryPrice
    };
};

/**
 * @constructor
 * @extends {Bakery}
 */
model.record.Bakery = Bakery;

tuna.model.recordFactory.registerRecord('bakery', new model.record.Bakery());