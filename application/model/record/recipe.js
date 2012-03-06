/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Recipe = function (data) {
    /**
     * @type string
     */
    this.id = '';

    /**
     * @type string
     */
    this.bakeryId = '';

    /**
     * @type string
     */
    this.name = '';

    /**
     * @type string
     */
    this.desc = '';

    /**
     * @type string
     */
    this.imageUrl = '';

    /**
     * @type Array.<Object>
     */
    this.dimentionPrices = [];

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Recipe, tuna.model.Record);

/**
 * @override
 */
Recipe.prototype.populate = function(data) {
    this.id = data['id'];
    this.bakeryId = data['bakery_id'];
    this.name = data['name'];
    this.desc = data['desc'];
    this.imageUrl = data['image_url'];

    this.dimentionPrices = [];
};

/**
 * @override
 */
Recipe.prototype.serialize = function() {
    return {
        'id': this.id,
        'bakeryId': this.bakeryId,
        'name': this.name,
        'desc': this.desc,
        'imageUrl': this.imageUrl,
        'dimentionPrices': this.dimentionPrices
    };
};

/**
 * @constructor
 * @extends {Recipe}
 */
model.record.Recipe = Recipe;

tuna.model.recordFactory.registerRecord('recipe', new model.record.Recipe());