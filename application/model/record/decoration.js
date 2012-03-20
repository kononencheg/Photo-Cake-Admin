/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Decoration = function (data) {

    /**
     * @type {string}
     */
    this.name = '';

    /**
     * @type {string}
     */
    this.imageUrl = '';

    /**
     * @type {boolean}
     */
    this.isAutorotate = false;

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Decoration, tuna.model.Record);

/**
 * @override
 */
Decoration.prototype.populate = function(data) {
    this.id = data['id'];
    this.name = data['name'];
    this.imageUrl = data['image_url'];
    this.isAutorotate = data['is_autorotate'];
};

/**
 * @override
 */
Decoration.prototype.serialize = function(bakery) {
    var price = 0;
    if (bakery !== undefined) {
        price = bakery.decorationPrices[this.id] || 0;
    }

    return {
        'id': this.id,
        'name': this.name,
        'imageUrl': this.imageUrl,
        'isAutorotate': this.isAutorotate,
        'price': price
    };
};

/**
 * @constructor
 * @extends {Decoration}
 */
model.record.Decoration = Decoration;

tuna.model.recordFactory.registerRecord('decoration', new model.record.Decoration());