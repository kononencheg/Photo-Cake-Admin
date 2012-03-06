/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var AddRecipeController = function () {
    tuna.view.PageViewController.call(this);
};

tuna.utils.extend(AddRecipeController, tuna.view.PageViewController);

/**
 * @override
 */
AddRecipeController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('form');
};

/**
 * @override
 */
AddRecipeController.prototype._initActions = function() {

};

/**
 * @override
 */
AddRecipeController.prototype.open = function(data) {

};


tuna.view.registerController('add_recipe_page', new AddRecipeController());
