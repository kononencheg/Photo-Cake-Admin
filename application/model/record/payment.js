/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Payment = function (data) {
    /**
     * @type {number}
     */
    this.paymentMethod = 0;

    /**
     * @type {number}
     */
    this.decorationPrice = 0;

    /**
     * @type {number}
     */
    this.deliveryPrice = 0;

    /**
     * @type {number}
     */
    this.recipePrice = 0;

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Payment, tuna.model.Record);

/**
 * @override
 */
Payment.prototype.populate = function(data) {
    this.paymentMethod = data['payment_method'];
    this.decorationPrice = data['decoration_price'] || 0;
    this.deliveryPrice = data['delivery_price'] || 0;
    this.recipePrice = data['recipe_price'] || 0;
};

/**
 * @override
 */
Payment.prototype.serialize = function() {
    return {
        'paymentMethod': this.paymentMethod,
        'decorationPrice': this.decorationPrice,
        'deliveryPrice': this.deliveryPrice,
        'recipePrice': this.recipePrice,
        'totalPrice':
            this.recipePrice + this.deliveryPrice + this.decorationPrice
    };
};

/**
 * @constructor
 * @extends {Payment}
 */
model.record.Payment = Payment;

tuna.model.getRecordFactory().registerRecord('payment', new model.record.Payment());