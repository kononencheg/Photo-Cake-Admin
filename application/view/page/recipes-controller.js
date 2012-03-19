/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var RecipesController = function () {
    tuna.view.PageViewController.call(this);

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

    recipeListTransformer.applyTransform
        (tuna.model.serialize(model.recipes.get()));
};

tuna.view.registerController('recipes_page', new RecipesController());
