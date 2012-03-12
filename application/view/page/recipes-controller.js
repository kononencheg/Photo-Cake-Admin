/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var RecipesController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @type {function()}
     * @private
     */
    this.__loadRecipes = tuna.utils.bind(this.__loadRecipes, this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation', 'button-group',
                      'form' ];

};

tuna.utils.extend(RecipesController, tuna.view.PageViewController);

/**
 * @override
 */
RecipesController.prototype._initActions = function() {
    this._navigation.addChild
        (this._container.getModuleInstanceByName('navigation', 'recipes'));

    var recipeControls = this._container.getModuleInstanceByName
                                ('button-group', 'recipe-table');

    recipeControls.addEventListener('delete', function(event, button) {
        if (confirm('Удалить рецепт?')) {
            var recipeId = button.getStringOption('recipe-id');

            tuna.rest.call('recipes.remove', {
                'recipe_id': recipeId
            }, function() {
                model.recipes.removeItemById(recipeId);
            });

            button.setEnabled(false);
        }
    });

    var recipeListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'recipe-table');

    model.recipes.addEventListener('update', function(event, recipes) {
        recipeListTransformer.applyTransform(tuna.model.serialize(recipes));
    });
};

/**
 * @override
 */
RecipesController.prototype.open = function() {
    model.currentBakery.addEventListener('update', this.__loadRecipes);
    this.__loadRecipes();
};

/**
 * @override
 */
RecipesController.prototype.close = function() {
    model.currentBakery.removeEventListener('update', this.__loadRecipes);
};

/**
 * @private
 */
RecipesController.prototype.__loadRecipes = function() {
    var bakery = model.currentBakery.get();
    if (bakery !== null) {
        model.recipes.load({ 'bakery_id': bakery.id });
    }
};

tuna.view.registerController('recipes_page', new RecipesController());
