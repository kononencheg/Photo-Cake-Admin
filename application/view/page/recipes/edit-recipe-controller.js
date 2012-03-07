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

        model.resource.recipes.addRecipe(recipe)
    })
};

/**
 * @override
 */
EditRecipeController.prototype.open = function(data) {
    var recipe = model.resource.recipes.getRecipeById(data["recipe-id"]);
    if(recipe !== null) {
        this.__recipeFormTransformer.applyTransform(recipe.serialize())
    }
};

tuna.view.registerController("edit_recipe_page", new EditRecipeController);
