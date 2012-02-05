/**
 * @constructor
 * @extends {tuna.view.NavigationViewController}
 */
var MainController = function() {
    tuna.view.NavigationViewController.call(this);
};

tuna.utils.extend(MainController, tuna.view.NavigationViewController);

/**
 * @override
 */
MainController.prototype._initActions = function() {
    tuna.view.NavigationViewController.prototype._initActions.call(this);
};

tuna.view.setMainController(new MainController());
