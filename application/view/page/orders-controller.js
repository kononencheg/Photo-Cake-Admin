/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var OrdersController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__ordersListTransformer = null;
};

tuna.utils.extend(OrdersController, tuna.view.PageViewController);

/**
 * @override
 */
OrdersController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('navigation');
};

/**
 * @override
 */
OrdersController.prototype._initActions = function() {
    var orderNavigation = this._container.getModuleInstanceByName
        ('navigation', 'order-navigation');

    this._navigation.addChild
        (orderNavigation, this._container.getOption('page-name'));

    var ordersListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'orders-list');

    model.resource.bakeries.addEventListener('update-current-bakery', function(event, bakery) {
        tuna.rest.call('orders.get', { 'bakery_id': bakery.id }, function(orders) {
            model.resource.orders.setOrders(orders);
        }, 'order');
    });

    model.resource.orders.addEventListener('update-orders', function(event, orders) {
        ordersListTransformer.applyTransform(tuna.model.serializeArray(orders));
    });
};



tuna.view.registerController('orders_page', new OrdersController());
