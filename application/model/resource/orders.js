/**
 * @constructor
 * @extends {tuna.events.EventDispatcher}
 */
var Orders = function () {
    tuna.events.EventDispatcher.call(this);

    /**
     * @private
     * @type {Array.<string>}
     */
    this.__statuses = [ 'Неактивен', 'Новый', 'Подтвержден', 'Отклонен' ];

    /**
     * @private
     * @type {Array.<string>}
     */
    this.__deliveryStatuses = [ 'Подготовка', 'В&nbsp;процессе', 'Доставлено' ];

    /**
     * @private
     * @type {Array.<string>}
     */
    this.__paymentStatuses = [ 'Не&nbsp;оплачено', 'Оплачено' ];

    /**
     * @type {Array.<model.record.Order>}
     * @private
     */
    this.__orders = [];
};

tuna.utils.extend(Orders, tuna.events.EventDispatcher);

/**
 * @param {number} status
 * @return {string}
 */
Orders.prototype.getStatusName = function(status) {
    return this.__statuses[status];
};

/**
 * @param {number} status
 * @return {string}
 */
Orders.prototype.getDeliveryStatusName = function(status) {
    return this.__deliveryStatuses[status];
};

/**
 * @param {number} status
 * @return {string}
 */
Orders.prototype.getPaymentStatusName = function(status) {
    return this.__paymentStatuses[status];
};

/**
 * @param {Array.<model.record.Order>} orders
 */
Orders.prototype.setOrders = function(orders) {
    this.__orders = orders;

    this.dispatch('update-orders', orders);
};

/**
 * @return {Object.<string, model.record.Order>}
 */
Orders.prototype.getOrders = function() {
    return this.__orders;
};

/**
 * @param {string} id
 * @return {model.record.Order}
 */
Orders.prototype.getOrderById = function(id) {
    var i = 0,
        l = this.__orders.length;

    while (i < l) {
        if (this.__orders[i].id === id) {
            return this.__orders[i];
        }

        i++;
    }

    return null;
};

/**
 * @param {model.record.Order} order
 */
Orders.prototype.addOrder = function(order) {
    var i = 0,
        l = this.__orders.length;

    while (i < l) {
        if (this.__orders[i].id === order.id) {
            break;
        }

        i++;
    }

    this.__orders[i] = order;

    this.dispatch('update-orders', this.__orders);
};

/**
 * @type Orders
 */
model.resource.orders = new Orders();