/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var RecipesController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__bakerySelectTransformer = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__recipeTableTransformer = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__addRecipeTransformer = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.forms.Form}
     */
    this.__addRecipeForm = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.buttons.ButtonGroup}
     */
    this.__recipeControls = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.popups.Popup}
     */
    this.__recipePopup = null;

};

tuna.utils.extend(RecipesController, tuna.view.PageViewController);

/**
 * @override
 */
RecipesController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('form');
};

/**
 * @override
 */
RecipesController.prototype._initActions = function() {
    var self = this;

    this.__recipeTableTransformer = this._container.getModuleInstanceByName
                                    ('template-transformer', 'recipe-table');

    this.__addRecipeTransformer = this._container.getModuleInstanceByName
                                    ('template-transformer', 'add-recipe');

    this.__addRecipeForm = this._container.getModuleInstanceByName
                                            ('form', 'add-recipe');


    this.__recipeControls.addEventListener('delete', function(event, button) {
        self.__deleteRecipe(button);
    });

    this.__recipeControls.addEventListener('edit', function(event, button) {
        self.__recipePopup.open()
    });

    this.__addRecipeForm.addEventListener('result', function(event, recipe) {
        model.resource.recipes.addRecipe(recipe);

        self.__addRecipeForm.reset();
        self.__updateView();
    });
};

/**
 * @private
 */
RecipesController.prototype.__updateView = function() {
    this.__recipeTableTransformer.applyTransform
                (model.resource.recipes.getRecipesList());

    this.__addRecipeTransformer.applyTransform
                    (model.resource.bakeries.getCurrentBakery());
};

/**
 * @private
 * @param {tuna.ui.buttons.Button} button
 */
RecipesController.prototype.__deleteRecipe = function(button) {
    if (confirm('Удалить рецепт?')) {
        var self = this;

        var recipeId = button.getStringOption('recipe-id');

        tuna.rest.call('recipes.remove', {
            'recipe_id': recipeId
        }, function() {
            model.resource.recipes.removeRecipeById(recipeId);

            self.__updateView();
        });

        button.setEnabled(false);

    }
};

tuna.view.registerController('recipes_page', new RecipesController());
