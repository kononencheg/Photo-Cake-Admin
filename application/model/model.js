
/**
 * @type tuna.model.ListResource
 */
model.bakeries = new tuna.model.ListResource('users.getBakeries', 'bakery');

/**
 * @type tuna.model.ListResource
 */
model.cities = new tuna.model.ListResource('cities.get', 'city');

/**
 * @type tuna.model.ListResource
 */
model.recipes = new tuna.model.ListResource('recipes.get', 'recipe');

/**
 * @type tuna.model.ListResource
 */
model.orders = new tuna.model.ListResource('orders.get', 'order');

/**
 * @type tuna.model.ListResource
 */
model.dimensions = new tuna.model.ListResource('dimensions.get', 'dimension');

/**
 * @type tuna.model.ListResource
 */
model.decorations = new tuna.model.ListResource('decorations.get', 'decoration');

/**
 * @type tuna.model.ItemResource
 */
model.currentBakery = new tuna.model.ItemResource();
