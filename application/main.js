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
 * @param {!Node} body
 */
window['main'] = function(body) {
    tuna.utils.config.init({
        'role': [ 'Админ', 'Кондитерская' ],
        'orderStatus': [  'Новый', 'Подтвержден', 'Отклонен' ],
        'deliveryStatus': [ 'Подготовка', 'В&nbsp;процессе', 'Доставлено' ],
        'paymentStatus': [ 'Не&nbsp;оплачено', 'Оплачено' ],
        'shape': { 'round':'Круг', 'rect': 'Прямоугольник' }
    });

    tuna.ui.modules.addIsolator('j-control-container');
    tuna.dom.setSelectorEngine(Sizzle);
    tuna.view.init(body);
};
