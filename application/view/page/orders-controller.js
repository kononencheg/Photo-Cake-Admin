/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var OrdersController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @type {function()}
     * @private
     */
    this.__loadOrders = tuna.utils.bind(this.__loadOrders, this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation' ];
};

tuna.utils.extend(OrdersController, tuna.view.PageViewController);

/**
 * @override
 */
OrdersController.prototype._initActions = function() {
    this._navigation.addChild
        (this._container.getModuleInstanceByName('navigation', 'orders'));

    var ordersListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'orders-list');

    model.orders.addEventListener('update', function(event, orders) {
        ordersListTransformer.applyTransform(tuna.model.serialize(orders));
    });
};

/**
 * @override
 */
OrdersController.prototype.open = function() {
    model.currentBakery.addEventListener('update', this.__loadOrders);

    this.__loadOrders();
};

/**
 * @override
 */
OrdersController.prototype.close = function() {
    model.currentBakery.removeEventListener('update', this.__loadOrders);
};

/**
 * @private
 */
OrdersController.prototype.__loadOrders = function() {
    var bakery = model.currentBakery.get();
    if (bakery !== null) {
        model.orders.load({ 'bakery_id': bakery.id });
    }
};

tuna.view.registerController('orders_page', new OrdersController());
