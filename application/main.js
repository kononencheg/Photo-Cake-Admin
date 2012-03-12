/**
 * @namespace
 */
var model = {};

/**
 * @namespace
 */
model.record = {};

/**
 * @namespace
 */
model.resource = {};

/**
 * @namespace
 */
var rest = {};

/**
 * @namespace
 */
var view = {};

/**
 * @param {Object} args
 */
window['main'] = function() {
    tuna.utils.config.init({
        'role': [ 'Админ', 'Кондитерская' ],
        'orderStatus': [ 'Неактивен', 'Новый', 'Подтвержден', 'Отклонен' ],
        'deliveryStatus': [ 'Подготовка', 'В&nbsp;процессе', 'Доставлено' ],
        'paymentStatus': [ 'Не&nbsp;оплачено', 'Оплачено' ],
        'shape': { 'round':'Круг', 'rect': 'Прямоугольник' }
    });

    tuna.ui.modules.addIsolator('j-control-container');
    tuna.dom.setSelectorEngine(Sizzle);
    tuna.view.init();
};
