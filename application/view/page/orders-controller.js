/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var OrdersController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.buttons.ButtonGroup}
     */
    this.__orderControls = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.popups.Popup}
     */
    this.__orderPopup = null;
};

tuna.utils.extend(OrdersController, tuna.view.PageViewController);

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
    var self = this;

    this.__orderControls = this._container.getModuleInstanceByName
                                    ('button-group', 'order-controls');

    this.__orderPopup = this._container.getModuleInstanceByName
                                        ('popup', 'edit-order');

    this.__orderControls.addEventListener('edit', function(event, button) {
        self.__orderPopup.open()
    });

};

/**
 * @private
 */
OrdersController.prototype.__updateView = function() {

};

tuna.view.registerController('orders_page', new OrdersController());
