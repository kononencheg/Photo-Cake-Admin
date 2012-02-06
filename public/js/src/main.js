/**
 * @namespace
 */
var model = {};

/**
 * @namespace
 */
model.records = {};

/**
 * @namespace
 */
var rest = {};

/**
 * Точка входа.
 *
 * @param {!Object} args
 */
window['main'] = function(args) {
    tuna.utils.config.init(args);
    tuna.dom.setSelectorEngine($.find);

    var container = new tuna.ui.containers.TransformContainer(document.body);
    container.init();
};
