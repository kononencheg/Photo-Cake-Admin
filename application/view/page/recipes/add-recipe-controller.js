/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var AddRecipeController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.forms.Form}
     */
    this.__addRecipeForm = null;

    /**
     * @override
     */
    this._modules = [ 'form' ];
};

tuna.utils.extend(AddRecipeController, tuna.view.PageViewController);

/**
 * @override
 */
AddRecipeController.prototype._initActions = function() {
    var self = this;

    this.__addRecipeForm = this._container.getModuleInstanceByName
        ('form', 'add-recipe');

    this.__addRecipeForm.addEventListener('result', function(event, recipe) {
        model.recipes.addItem(recipe);

        self.__addRecipeForm.reset();
        self._navigation.back();
    });
};


tuna.view.registerController('add_recipe_page', new AddRecipeController());
