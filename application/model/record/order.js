/**
 * @constructor
 * @extends {tuna.model.Record}
 */
var Order = function () {

    /**
     * @type {string}
     */
    this.id = '';

    /**
     * @type {number}
     */
    this.index = 0;

    /**
     * @type {Date}
     */
    this.creationDate = new Date();

    /**
     * @type {model.record.Bakery}
     */
    this.bakery = new model.record.Bakery();

    /**
     * @type {model.record.Recipe}
     */
    this.recipe = new model.record.Recipe();

    /**
     * @type {*}
     */
    this.cake = null;

    /**
     * @type {*}
     */
    this.payment = null;

    /**
     * @type {*}
     */
    this.delivery = null;

    /**
     * @type {number}
     */
    this.status =  0;

    /**
     * @type {number}
     */
    this.paymentStatus = 0;

    /**
     * @type {number}
     */
    this.deliveryStatus =  0;
};

tuna.utils.extend(Order, tuna.model.Record);

/**
 * @override
 */
Order.prototype.populate = function(data) {
    this.id = data['id'];

    this.index = parseInt(this.id.substr(this.id.length - 8).split('0').join(''), 16);
    this.creationDate = new Date(1000 * parseInt(this.id.substr(0, 8), 16));

    this.bakery.populate(data['bakery']);
    this.recipe.populate(data['recipe']);
    this.status =  data['status'];
    this.paymentStatus = data['payment_status'];
    this.deliveryStatus = data['delivery_status'];
};

/**
 * @override
 */
Order.prototype.serialize = function() {
    return {
        'id': this.id,
        'index': this.index,
        'creationDate':
            this.creationDate.toJSON().substring(0, 16).replace('T', ' '),

        'bakery': this.bakery.serialize(),
        'recipe': this.recipe.serialize(),
        'status': this.status,
        'paymentStatus': this.paymentStatus,
        'deliveryStatus': this.deliveryStatus
    };
};

/**
 * @constructor
 * @extends {Order}
 */
model.record.Order = Order;

tuna.model.recordFactory.registerRecord('order', new model.record.Order());