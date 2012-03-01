/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var BakeryPageController = function() {
    tuna.view.PageViewController.call(this);
};

tuna.utils.extend(BakeryPageController, tuna.view.PageViewController);

/**
 *
 */
BakeryPageController.prototype.handleBakeryChange = function() {
    var bakery = this._getCurrentBakery();
    if (bakery !== null) {
        this._updateBakery(bakery);
    } else {
        this._cleanBakery();
    }
};

/**
 * @return {model.record.User}
 * @protected
 */
BakeryPageController.prototype._getCurrentBakery = function() {
    return model.resource.bakeries.getCurrentBakery();
};

/**
 * @param {model.record.User} bakery
 * @protected
 */
BakeryPageController.prototype._updateBakery = function(bakery) {};

/**
 * @protected
 */
BakeryPageController.prototype._cleanBakery = function() {};

/**
 * @constructor
 * @extends {BakeryPageController}
 */
view.BakeryPageController = BakeryPageController;