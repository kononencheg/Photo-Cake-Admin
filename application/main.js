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
window['main'] = function(args) {
    tuna.utils.config.init(args);
    tuna.dom.setSelectorEngine(Sizzle);
    tuna.view.init();  
};
