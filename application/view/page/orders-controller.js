/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var OrdersController = function () {
    tuna.view.PageViewController.call(this);
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
    var navigation = this._container.getModuleInstanceByName
                            ('navigation', 'order-navigation');

    this._navigation.addChild
        (navigation, this._container.getOption('page-name'));

    var ordersListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'orders-list');

    var self = this;
    model.resource.bakeries.addEventListener(
        'update-current-bakery', function() {
            self.__loadOrders();
        }
    );

    model.resource.orders.addEventListener(
        'update-orders', function(event, orders) {
            ordersListTransformer.applyTransform(tuna.model.serialize(orders));
        }
    );

    this.__loadOrders();
};

/**
 * @private
 */
OrdersController.prototype.__loadOrders = function() {
    var bakery = model.resource.bakeries.getCurrentBakery();
    if (bakery !== null) {
        tuna.rest.call('orders.get', {
            'bakery_id': bakery.id
        }, function(orders) {
            model.resource.orders.setOrders(orders);
        }, 'order');
    }
};

tuna.view.registerController('orders_page', new OrdersController());
