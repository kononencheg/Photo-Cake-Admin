/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var EditRecipeController = function() {
    tuna.view.PageViewController.call(this);

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     */
    this.__recipeFormTransformer = null;

    /**
     * @private
     * @type {tuna.ui.ModuleInstance|tuna.ui.forms.Form}
     */
    this.__recipeForm = null
};

tuna.utils.extend(EditRecipeController, tuna.view.PageViewController);

/**
 * @override
 */
EditRecipeController.prototype._requireModules = function() {
    this._container.requireModule("template-transformer");
    this._container.requireModule("form")
};

/**
 * @override
 */
EditRecipeController.prototype._initActions = function() {
    var self = this;

    this.__recipeFormTransformer = this._container.getModuleInstanceByName
        ("template-transformer", "edit-recipe-form");

    this.__recipeForm = this._container.getModuleInstanceByName
        ("form", "edit-recipe-form");

    this.__recipeForm.addEventListener("result", function(event, recipe) {
        self._navigation.back();

        model.recipes.addItem(recipe);
    })
};

/**
 * @override
 */
EditRecipeController.prototype.open = function(data) {
    var dimensions = model.dimensions.get();
    var recipe = model.recipes.getItemById(data["recipe-id"]);
    var bakery = model.currentBakery.get();

    if (dimensions !== null && bakery !== null && recipe !== null) {

        var weights = [];

        var i = 0,
            l = dimensions.length;

        var dimension = null;
        while (i < l) {
            dimension = dimensions[i];

            if (tuna.utils.indexOf(dimension.weight, weights) === -1 &&
                tuna.utils.indexOf(dimension.id, bakery.dimensionIds) !== -1) {
                weights.push(dimension.weight);
            }

            i++;
        }

        this.__recipeFormTransformer.applyTransform
            (recipe.serialize(weights.sort()))
    }
};

tuna.view.registerController("edit_recipe_page", new EditRecipeController);
