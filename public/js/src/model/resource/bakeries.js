/**
 * @constructor
 */
var Bakeries = function () {

    /**
     * @private
     * @type Array.<model.record.Bakery>
     */
    this.__bakeries = [];

    /**
     * @private
     * @type model.record.Bakery
     */
    this.__currentBakery = null;
};

/**
 * @param {Array.<model.record.Bakery>} bakeries
 */
Bakeries.prototype.setBakeries = function(bakeries) {
    this.__bakeries = bakeries;
};


Bakeries.prototype.setCurrentBakeryId = function(id) {
    this.__currentBakery = null;

    var i = 0,
        l = this.__bakeries.length;

    while (i < l) {
        if (this.__bakeries[i].id === id) {
            this.__currentBakery = this.__bakeries[i];
            break;
        }

        i++;
    }
};

/**
 * @return {Object}
 */
Bakeries.prototype.getCurrentBakery = function() {
    if (this.__currentBakery !== null) {
        return this.__currentBakery.serialize();
    }

    return null;
};

/**
 * @return {Object}
 */
Bakeries.prototype.getBakeriesList = function() {
    var result = [];

    var i = 0,
        l = this.__bakeries.length;
    while (i < l) {
        result.push(this.__bakeries[i].serialize());

        i++;
    }

    return result;
};


/**
 * @type Bakeries
 */
model.resource.bakeries = new Bakeries();