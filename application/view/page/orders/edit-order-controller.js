/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var EditOrdersController = function () {
    tuna.view.PageViewController.call(this);


    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__orderFormTransformer = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.forms.Form}
     */
    this.__orderForm = null;
};

tuna.utils.extend(EditOrdersController, tuna.view.PageViewController);

/**
 * @override
 */
EditOrdersController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('form');
};

/**
 * @override
 */
EditOrdersController.prototype._initActions = function() {
    var self = this;

    this.__orderFormTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'edit-order-form');

    this.__orderForm = this._container.getModuleInstanceByName
        ('form', 'edit-order-form');

    this.__orderForm.addEventListener('result', function(event, order) {
        self._navigation.navigate('table');

        model.resource.orders.addOrder(order);
    });
};

/**
 * @override
 */
EditOrdersController.prototype.open = function(data) {
    var order = model.resource.orders.getOrderById(data['order-id']);
    if (order !== null) {
        this.__orderFormTransformer.applyTransform(order.serialize());
        this.__orderForm.setValue('status', order.status);
        this.__orderForm.setValue('delivery_status', order.deliveryStatus);
        this.__orderForm.setValue('payment_status', order.paymentStatus);
    }
};

tuna.view.registerController('edit_order_page', new EditOrdersController());
