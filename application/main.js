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
    tuna.dom.setSelectorEngine(Sizzle);

    tuna.ui.registerIsolator('j-control-container');

    tuna.rest.call('config.get', { 'app': 'admin-panel' }, function(result) {
        tuna.utils.config.init(result);
        tuna.control.init(body);
    });
};
