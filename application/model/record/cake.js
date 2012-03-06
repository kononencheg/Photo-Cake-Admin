/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Cake = function (data) {
    /**
     * @type {string}
     */
    this.imageUrl = '';

    /**
     * @type {string}
     */
    this.photoUrl = '';

    /**
     * @type {model.record.Dimension}
     */
    this.dimension = null;

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Cake, tuna.model.Record);

/**
 * @override
 */
Cake.prototype.populate = function(data) {
    this.imageUrl = data['image_url'];
    this.photoUrl = data['photo_url'] || null;
    this.dimension = new model.record.Dimension(data['dimension']);
};

/**
 * @override
 */
Cake.prototype.serialize = function() {
    return {
        'imageUrl': this.imageUrl,
        'photoUrl': this.photoUrl,
        'dimension': this.dimension.serialize()
    };
};

/**
 * @constructor
 * @extends {Cake}
 */
model.record.Cake = Cake;

tuna.model.recordFactory.registerRecord('cake', new model.record.Cake());