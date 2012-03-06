/**
 * @constructor
 * @extends {tuna.events.EventDispatcher}
 */
var Bakeries = function () {
    tuna.events.EventDispatcher.call(this);

    /**
     * @private
     * @type Array.<model.record.Bakery>
     */
    this.__bakeries = [];

    /**
     * @private
     * @type model.record.User
     */
    this.__currentBakery = null;
};

tuna.utils.extend(Bakeries, tuna.events.EventDispatcher);

/**
 * @param {Array.<model.record.Bakery>} bakeries
 */
Bakeries.prototype.setBakeries = function(bakeries) {
    this.__bakeries = bakeries;

    this.dispatch('update-bakeries', bakeries);
};

/**
 * @param {string} id
 * @return {model.record.Bakery}
 */
Bakeries.prototype.getBakeryById = function(id) {
    var i = 0,
        l = this.__bakeries.length;

    while (i < l) {
        if (this.__bakeries[i].id === id) {
            return this.__bakeries[i];
        }

        i++;
    }

    return null;
};

/**
 * @return {model.record.User}
 */
Bakeries.prototype.getCurrentBakery = function() {
    return this.__currentBakery;
};

/**
 * @param {model.record.User} bakery
 */
Bakeries.prototype.setCurrentBakery = function(bakery) {
    this.__currentBakery = bakery;

    if (bakery !== null) {
        this.dispatch('update-current-bakery', bakery);
    } else {
        this.dispatch('remove-current-bakery');
    }
};

/**
 * @return {Array.<model.record.Bakery>}
 */
Bakeries.prototype.getBakeriesList = function() {
    return this.__bakeries;
};

/**
 * @type Bakeries
 */
model.resource.bakeries = new Bakeries();