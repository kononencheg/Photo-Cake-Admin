/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var RecipesController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @private
     * @type {tuna.ui.transformers.TemplateTransformer}
     */
    this.__bakerySelectTransformer = null;

    /**
     * @private
     * @type {tuna.ui.transformers.TemplateTransformer}
     */
    this.__recipeTableTransformer = null;

    /**
     * @private
     * @type {tuna.ui.forms.Form}
     */
    this.__bakerySelectForm = null;


    /**
     * @private
     * @type {tuna.ui.forms.Form}
     */
    this.__addRecipeForm = null;
};

tuna.utils.extend(RecipesController, tuna.view.PageViewController);

/**
 * @override
 */
RecipesController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('popup');
    this._container.requireModule('form');
};

/**
 * @override
 */
RecipesController.prototype._initActions = function() {
    var self = this;

    this.__recipeTableTransformer = this._container.getModuleInstanceByName
                                    ('template-transformer', 'recipe-table');

    this.__bakerySelectTransformer = this._container.getModuleInstanceByName
                                ('template-transformer', 'bakery-select');

    this.__bakerySelectForm = this._container.getModuleInstanceByName
                                ('form', 'bakery-select');

    this.__addRecipeForm = this._container.getModuleInstanceByName
                                ('form', 'add-recipe');

    this.__bakerySelectForm.addEventListener('result', function(recipes) {
        model.resource.recipes.setRecipes(recipes);

        self.__updateView();
    });

    this.__addRecipeForm.addEventListener('result', function(recipe) {
        model.resource.recipes.addRecipe(recipe);

        self.__updateView();
    });

    tuna.rest.call('users.getBakeries', null, function(bakeries) {
        model.resource.bakeries.setBakeries(bakeries);

        self.__updateView();
        self.__bakerySelectForm.submit();
    }, 'bakery');
};

/**
 * @private
 */
RecipesController.prototype.__updateView = function() {
    this.__bakerySelectTransformer.applyTransform
                (model.resource.bakeries.getBakeriesList());

    this.__recipeTableTransformer.applyTransform
                (model.resource.recipes.getRecipesList());
};

tuna.view.registerController('recipes_page', new RecipesController());
