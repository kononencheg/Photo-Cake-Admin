/**
 * @constructor
 */
var Bakeries = function () {

    /**
     * @private
     * @type Array.<model.record.Bakery>
     */
    this.__bakeries = [];
};

/**
 * @param {Array.<model.record.Bakery>} bakeries
 */
Bakeries.prototype.setBakeries = function(bakeries) {
    this.__bakeries = bakeries;
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