/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var RecipesController = function () {
    tuna.view.PageViewController.call(this);
};

tuna.utils.extend(RecipesController, tuna.view.PageViewController);

/**
 * @override
 */
RecipesController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('button-group');
    this._container.requireModule('navigation');
    this._container.requireModule('form');
};

/**
 * @override
 */
RecipesController.prototype._initActions = function() {
    var navigation = this._container.getModuleInstanceByName
                        ('navigation', 'recipes-navigation');

    this._navigation.addChild
        (navigation, this._container.getOption('page-name'));

    var self = this;
    var recipeControls = this._container.getModuleInstanceByName
                                ('button-group', 'recipe-table');

    recipeControls.addEventListener('delete', function(event, button) {
        self.__deleteRecipe(button);
    });

    model.resource.bakeries.addEventListener(
        'update-current-bakery', function() {
            self.__loadRecipes();
        }
    );

    var recipeListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'recipe-table');

    model.resource.recipes.addEventListener(
        'update-recipes', function(event, recipes) {
            recipeListTransformer.applyTransform(tuna.model.serialize(recipes));
        }
    );

    this.__loadRecipes();
};

/**
 * @private
 */
RecipesController.prototype.__loadRecipes = function() {
    var bakery = model.resource.bakeries.getCurrentBakery();
    if (bakery !== null) {
        tuna.rest.call('recipes.get', {
            'bakery_id': bakery.id
        }, function(recipes) {
            model.resource.recipes.setRecipes(recipes);
        }, 'recipe');
    }
};

/**
 * @private
 * @param {tuna.ui.buttons.Button} button
 */
RecipesController.prototype.__deleteRecipe = function(button) {
    if (confirm('Удалить рецепт?')) {
        var recipeId = button.getStringOption('recipe-id');

        tuna.rest.call('recipes.remove', {
            'recipe_id': recipeId
        }, function() {
            model.resource.recipes.removeRecipeById(recipeId);
        });

        button.setEnabled(false);
    }
};

tuna.view.registerController('recipes_page', new RecipesController());
