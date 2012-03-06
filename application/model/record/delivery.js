/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Delivery = function (data) {
    /**
     * @type {Date}
     */
    this.date = null;

    /**
     * @type {string}
     */
    this.address = '';

    /**
     * @type {string}
     */
    this.comment = '';

    /**
     * @type {string}
     */
    this.message = '';

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Delivery, tuna.model.Record);

/**
 * @override
 */
Delivery.prototype.populate = function(data) {
    this.date = new Date(data['date'] * 1000);
    this.address = data['address'];
    this.comment = data['comment'];
    this.message = data['message'];
};

/**
 * @override
 */
Delivery.prototype.serialize = function() {
    return {
        'date': this.date && tuna.model.serializeDate(this.date),
        'address': this.address,
        'comment': this.comment,
        'message': this.message
    };
};

/**
 * @constructor
 * @extends {Delivery}
 */
model.record.Delivery = Delivery;

tuna.model.recordFactory.registerRecord('delivery', new model.record.Delivery());