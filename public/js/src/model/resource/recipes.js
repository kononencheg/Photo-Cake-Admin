/**
 * @constructor
 */
var Recipes = function () {

    /**
     * @private
     * @type Array.<model.record.Recipe>
     */
    this.__recipes = [];
};

/**
 * @param {Array.<model.record.Recipe>} recipes
 */
Recipes.prototype.setRecipes = function(recipes) {
    this.__recipes = recipes;
};

/**
 * @param {model.record.Recipe} recipe
 */
Recipes.prototype.addRecipe = function(recipe) {
    this.__recipes.push(recipe);
};


/**
 * @return {Object}
 */
Recipes.prototype.getRecipesList = function() {
    var result = [];

    var i = 0,
        l = this.__recipes.length;
    while (i < l) {
        result.push(this.__recipes[i].serialize());

        i++;
    }

    return result;
};


/**
 * @type Recipes
 */
model.resource.recipes = new Recipes();