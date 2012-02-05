/**
 * Точка входа.
 *
 * @param {Object} args
 */
window['main'] = function(args) {

    tuna.utils.сonfig.init(args);
    tuna.dom.setSelectorEngine($.find);

    var container = new tuna.ui.containers.TransformContainer(document.body);
    container.init();
};
