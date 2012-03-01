/**
 * @constructor
 * @extends {view.BakeryPageController}
 */
var OrdersController = function () {
    view.BakeryPageController.call(this);

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.buttons.ButtonGroup}
     */
    //this.__orderControls = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.popups.Popup}
     */
    //this.__orderPopup = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__ordersListTransformer = null;
};

tuna.utils.extend(OrdersController, view.BakeryPageController);

/**
 * @override
 */
OrdersController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('button-group');
    this._container.requireModule('navigation');
    this._container.requireModule('popup');
    this._container.requireModule('form');
};

/**
 * @override
 */
OrdersController.prototype._initActions = function() {
    /*var self = this;

    this.__orderControls = this._container.getModuleInstanceByName
                                    ('button-group', 'order-controls');

    this.__orderPopup = this._container.getModuleInstanceByName
                                        ('popup', 'edit-order');

    this.__orderControls.addEventListener('edit', function(event, button) {
        self.__orderPopup.open()
    });*/

    this.__ordersListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'orders-list');
};

/**
 * @override
 */
OrdersController.prototype._updateBakery = function(bakery) {
    var self = this;
    tuna.rest.call('orders.get', {'bakery_id': bakery.id }, function(result) {
        self.__ordersListTransformer.applyTransform
            (tuna.model.serializeArray(result));
    }, 'order');
};

/**
 * @private
 */
OrdersController.prototype.__updateView = function() {

};

tuna.view.registerController('orders_page', new OrdersController());
