/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var EditOrdersController = function () {
    tuna.control.PageController.call(this);


    /**
     * @private
     * @type {tuna.ui.Widget|tuna.ui.transformers.TemplateTransformer}
     */
    this.__orderFormTransformer = null;

    /**
     * @private
     * @type {tuna.ui.Widget|tuna.ui.forms.Form}
     */
    this.__orderForm = null;
};

tuna.utils.extend(EditOrdersController, tuna.control.PageController);

/**
 * @override
 */
EditOrdersController.prototype.initActions = function() {
    var self = this;

    this.__orderFormTransformer = this._container.getWidget
        ('template-transformer', 'edit-order-form');

    this.__orderForm = this._container.getWidget
        ('form', 'edit-order-form');

    this.__orderForm.addEventListener('result', function(event, order) {
        //self._navigation.back();

        model.orders.addItem(order);
    });
};

/**
 * @override
 */
EditOrdersController.prototype.open = function(data) {
    var order = model.orders.getItemById(data['order-id']);
    if (order !== null) {
        this.__orderFormTransformer.applyTransform(order.serialize());

        this.__orderForm.setValue('status', order.status);
        this.__orderForm.setValue('delivery_status', order.deliveryStatus);
        this.__orderForm.setValue('payment_status', order.paymentStatus);
    }
};

tuna.control.registerController('edit_order_page', new EditOrdersController());
