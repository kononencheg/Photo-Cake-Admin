/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var AddRecipeController = function () {
    tuna.control.PageController.call(this);

    /**
     * @private
     * @type {tuna.ui.Widget|tuna.ui.forms.Form}
     */
    this.__addRecipeForm = null;
};

tuna.utils.extend(AddRecipeController, tuna.control.PageController);

/**
 * @override
 */
AddRecipeController.prototype.initActions = function() {
    var self = this;

    this.__addRecipeForm = this._container.getWidget
        ('form', 'add-recipe');

    this.__addRecipeForm.addEventListener('result', function(event, recipe) {
        model.recipes.addItem(recipe);

        self.__addRecipeForm.reset();
        //self._navigation.back();
    });
};


tuna.control.registerController('add_recipe_page', new AddRecipeController());
