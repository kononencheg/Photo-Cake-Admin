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
};

tuna.utils.extend(AddRecipeController, tuna.view.PageViewController);

/**
 * @override
 */
AddRecipeController.prototype._requireModules = function() {
    this._container.requireModule('form');
};

/**
 * @override
 */
AddRecipeController.prototype._initActions = function() {
    var self = this;

    this.__addRecipeForm = this._container.getModuleInstanceByName
        ('form', 'add-recipe');

    this.__addRecipeForm.addEventListener('result', function(event, recipe) {
        model.resource.recipes.addRecipe(recipe);

        self.__addRecipeForm.reset();
        self._navigation.back();
    });
};

/**
 * @override
 */
AddRecipeController.prototype.open = function() {
    var bakery = model.resource.bakeries.getCurrentBakery();
    if (bakery !== null) {
        this.__addRecipeForm.setValue('bakery_id', bakery.id);
    }
};


tuna.view.registerController('add_recipe_page', new AddRecipeController());
