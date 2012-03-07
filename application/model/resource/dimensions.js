/**
 * @constructor
 * @extends {tuna.events.EventDispatcher}
 */
var Dimensions = function () {
    tuna.events.EventDispatcher.call(this);

    /**
     * @private
     * @type Array.<model.record.Recipe>
     */
    this.__dimensions = [];

    /**
     * @type {Object.<string, string>}
     * @private
     */
    this.__shapes = { 'round':'Круг', 'rect': 'Прямоугольник' };
};

tuna.utils.extend(Dimensions, tuna.events.EventDispatcher);

/**
 * @param {Array.<model.record.Recipe>} recipes
 */
Dimensions.prototype.setDimensions = function(dimensions) {
    this.__dimensions = dimensions;

    this.dispatch('update-dimensions', dimensions);
};

/**
 * @param {model.record.Dimension} dimension
 */
Dimensions.prototype.addDimension = function(dimension) {
    var i = 0,
        l = this.__dimensions.length;

    while (i < l) {
        if (this.__dimensions[i].id === dimension.id) {
            break;
        }

        i++;
    }

    this.__dimensions[i] = dimension;

    this.dispatch('update-dimensions', this.__dimensions);
};

/**
 * @param {string} id
 */
Dimensions.prototype.removeDimensionById = function(id) {
    var i = 0,
        l = this.__dimensions.length;

    while (i < l) {
        if (this.__dimensions[i].id === id) {
            this.__dimensions.splice(i, 1);

            break;
        }

        i++;
    }

    this.dispatch('update-dimensions', this.__dimensions);
};
/**
 * @param {string} id
 * @return {model.record.Dimension}
 */
Dimensions.prototype.getDimensionById = function(id) {
    var i = 0,
        l = this.__dimensions.length;

    while (i < l) {
        if (this.__dimensions[i].id === id) {
            return this.__dimensions[i];
        }

        i++;
    }

    return null;
};


/**
 * @return {Array.<model.record.Dimension>}
 */
Dimensions.prototype.getDimensionsList = function() {
    return this.__dimensions;
};

/**
 * @param {string} shape
 * @return {string}
 */
Dimensions.prototype.getShapeName = function(shape) {
    return this.__shapes[shape];
};

/**
 * @type Dimensions
 */
model.resource.dimensions = new Dimensions();