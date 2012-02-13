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
 */
Recipes.prototype.clearRecipes = function() {
    this.__recipes.length = 0;
};


/**
 * @param {model.record.Recipe} recipe
 */
Recipes.prototype.addRecipe = function(recipe) {
    this.__recipes.push(recipe);
};

/**
 * @param {?string} id
 */
Recipes.prototype.removeRecipeById = function(id) {
    var i = 0,
        l = this.__recipes.length;

    while (i < l) {
        if (this.__recipes[i].id === id) {
            this.__recipes.splice(i, 1);

            break;
        }

        i++;
    }
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