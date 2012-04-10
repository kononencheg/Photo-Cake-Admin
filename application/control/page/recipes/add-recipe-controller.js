/**
 * @constructor
 * @extends {tuna.control.PageViewController}
 */
var AddRecipeController = function () {
    tuna.control.PageViewController.call(this);

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

tuna.utils.extend(AddRecipeController, tuna.control.PageViewController);

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


tuna.control.registerController('add_recipe_page', new AddRecipeController());
