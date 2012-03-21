/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var OrdersController = function () {
    tuna.view.PageViewController.call(this);

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
    var bakery = model.currentBakery.get();

    if (bakery !== null) {
        model.orders.load({ 'bakery_id': bakery.id }, true);
    }
};

tuna.view.registerController('orders_page', new OrdersController());
