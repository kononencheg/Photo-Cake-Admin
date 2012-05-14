/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var OrdersController = function () {
    tuna.control.PageController.call(this);
};

tuna.utils.extend(OrdersController, tuna.control.PageController);

/**
 * @override
 */
OrdersController.prototype.initActions = function() {
    //this._navigation.addChild
    //    (this._container.getWidget('navigation', 'orders'));

    var ordersListTransformer = this._container.getWidget
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

tuna.control.registerController('orders_page', new OrdersController());
