/**
 * @constructor
 * @extends {tuna.events.EventDispatcher}
 */
var Recipes = function () {
    tuna.events.EventDispatcher.call(this);

    /**
     * @private
     * @type Array.<model.record.Recipe>
     */
    this.__recipes = [];
};

tuna.utils.extend(Recipes, tuna.events.EventDispatcher);

/**
 * @param {Array.<model.record.Recipe>} recipes
 */
Recipes.prototype.setRecipes = function(recipes) {
    this.__recipes = recipes;

    this.dispatch('update-recipes', recipes);
};

/**
 * @param {model.record.Recipe} recipe
 */
Recipes.prototype.addRecipe = function(recipe) {
    var i = 0,
        l = this.__recipes.length;

    while (i < l) {
        if (this.__recipes[i].id === recipe.id) {
            break;
        }

        i++;
    }

    this.__recipes[i] = recipe;

    this.dispatch('update-recipes', this.__recipes);
};

/**
 * @param {string} id
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

    this.dispatch('update-recipes', this.__recipes);
};
/**
 * @param {string} id
 * @return {model.record.Recipe}
 */
Recipes.prototype.getRecipeById = function(id) {
    var i = 0,
        l = this.__recipes.length;

    while (i < l) {
        if (this.__recipes[i].id === id) {
            return this.__recipes[i];
        }

        i++;
    }

    return null;
};


/**
 * @return {Array.<model.record.Recipe>}
 */
Recipes.prototype.getRecipesList = function() {
    return this.__recipes;
};


/**
 * @type Recipes
 */
model.resource.recipes = new Recipes();