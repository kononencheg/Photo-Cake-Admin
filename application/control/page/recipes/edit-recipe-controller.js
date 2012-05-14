/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var EditRecipeController = function() {
    tuna.control.PageController.call(this);

    /**
     * @private
     * @type {tuna.ui.Widget|tuna.ui.transformers.TemplateTransformer}
     */
    this.__recipeFormTransformer = null;

    /**
     * @private
     * @type {tuna.ui.Widget|tuna.ui.forms.Form}
     */
    this.__recipeForm = null;

    /**
     * @type {string}
     * @private
     */
    this.__recipeId = '';
};

tuna.utils.extend(EditRecipeController, tuna.control.PageController);

/**
 * @override
 */
EditRecipeController.prototype.initActions = function() {
    var self = this;

    this.__recipeFormTransformer = this._container.getWidget
        ("template-transformer", "edit-recipe-form");

    this.__recipeForm = this._container.getWidget
        ("form", "edit-recipe-form");

    this.__recipeForm.addEventListener("result", function(event, recipe) {
        //self._navigation.back();

        model.recipes.addItem(recipe);
    });

    model.dimensions.addEventListener('update', function(event, dimensions) {
        self.__updateRecipe();
    });
};

/**
 * @override
 */
EditRecipeController.prototype.open = function(data) {
    this.__recipeId = data["recipe-id"];
    this.__updateRecipe();
};



/**
 * @private
 */
EditRecipeController.prototype.__updateRecipe = function() {
    var recipe = model.recipes.getItemById(this.__recipeId);
    if (recipe !== null) {
        var weights = [];

        model.dimensions.each(function(dimension) {
            if (tuna.utils.indexOf(dimension.weight, weights) === -1) {
                weights.push(dimension.weight);
            }
        });

        this.__recipeFormTransformer.applyTransform
            (recipe.serialize(weights.sort()));
    }
};



tuna.control.registerController("edit_recipe_page", new EditRecipeController);
