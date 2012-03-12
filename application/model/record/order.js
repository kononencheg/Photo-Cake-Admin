/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Order = function (data) {
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
    this.date = null;

    /**
     * @type {model.record.Bakery}
     */
    this.bakery = null;

    /**
     * @type {model.record.Recipe}
     */
    this.recipe = null;

    /**
     * @type {model.record.Cake}
     */
    this.cake = null;

    /**
     * @type {model.record.Payment}
     */
    this.payment = null;

    /**
     * @type {model.record.Client}
     */
    this.client = null;

    /**
     * @type {model.record.Delivery}
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

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Order, tuna.model.Record);

/**
 * @override
 */
Order.prototype.populate = function(data) {
    this.id = data['id'];

    this.cake = new model.record.Cake(data['cake']);
    this.bakery = new model.record.Bakery(data['bakery']);
    this.client = new model.record.Client(data['client']);
    this.recipe = new model.record.Recipe(data['recipe']);
    this.payment = new model.record.Payment(data['payment']);
    this.delivery = new model.record.Delivery(data['delivery']);

    this.status =  data['status'];
    this.paymentStatus = data['payment_status'];
    this.deliveryStatus = data['delivery_status'];

    this.index
        = parseInt(this.id.substr(this.id.length - 8).split('0').join(''), 16);

    this.date = new Date(1000 * parseInt(this.id.substr(0, 8), 16));
};

/**
 * @override
 */
Order.prototype.serialize = function() {
    return {
        'id': this.id,
        'index': this.index,
        'date': this.date && tuna.model.serializeDate(this.date),
        'bakery': this.bakery.serialize(),
        'cake': this.cake.serialize(),
        'payment': this.payment.serialize(),
        'client': this.client.serialize(),
        'delivery': this.delivery.serialize(),
        'recipe': this.recipe.serialize(),
        'status': this.status,
        'paymentStatus': this.paymentStatus,
        'deliveryStatus': this.deliveryStatus,

        'statusName':        tuna.utils.config.get('orderStatus')[this.status],
        'paymentStatusName': tuna.utils.config.get('paymentStatus')[this.paymentStatus],
        'deliveryStatusName':tuna.utils.config.get('deliveryStatus')[this.deliveryStatus]
    };
};

/**
 * @constructor
 * @extends {Order}
 */
model.record.Order = Order;

tuna.model.recordFactory.registerRecord('order', new model.record.Order());