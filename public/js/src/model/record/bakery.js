/**
 * @constructor
 * @extends {tuna.model.Record}
 */
var Bakery = function () {

    /**
     * @type string
     */
    this.id = '';

    /**
     * @type string
     */
    this.email = '';

    /**
     * @type string
     */
    this.city = '';

    /**
     * @type string
     */
    this.name = '';

    /**
     * @type number
     */
    this.deliveryPrice = 0;
};

tuna.utils.extend(Bakery, tuna.model.Record);

/**
 * @override
 */
Bakery.prototype.populate = function(data) {
    this.id = data['id'];
    this.name = data['name'];
    this.email = data['email'];
    this.city = data['city']['name'];
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