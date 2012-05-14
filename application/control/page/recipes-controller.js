/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var RecipesController = function () {
    tuna.control.PageController.call(this);
};

tuna.utils.extend(RecipesController, tuna.control.PageController);

/**
 * @override
 */
RecipesController.prototype.initActions = function() {
    //this._navigation.addChild
    //    (this._container.getWidget('navigation', 'recipes'));

    var recipeControls = this._container.getWidget
                                ('button-group', 'recipe-table');

    recipeControls.addEventListener('delete', function(event, button) {
        if (confirm('Удалить рецепт?')) {
            var recipeId = button.getStringOption('recipe-id');

            tuna.rest.call('recipes.remove', {
                'recipe_id': recipeId
            }, function() {
                model.recipes.removeItemById(recipeId);
            });

            button.disable();
        }
    });

    var recipeListTransformer = this._container.getWidget
        ('template-transformer', 'recipe-table');

    model.recipes.addEventListener('update', function(event, recipes) {
        recipeListTransformer.applyTransform(tuna.model.serialize(recipes));
    });

    recipeListTransformer.applyTransform
        (tuna.model.serialize(model.recipes.get()));
};

tuna.control.registerController('recipes_page', new RecipesController());
