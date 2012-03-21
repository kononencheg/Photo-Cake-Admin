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
    tuna.ui.modules.addIsolator('j-control-container');
    tuna.dom.setSelectorEngine(Sizzle);

    tuna.rest.call('config.get', { 'app': 'admin-panel' }, function(result) {
        tuna.utils.config.init(result);
        tuna.view.init(body);
    });
};
