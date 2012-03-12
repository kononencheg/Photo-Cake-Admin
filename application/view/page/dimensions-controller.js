/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var DimensionsController = function () {
    tuna.view.PageViewController.call(this);
};

tuna.utils.extend(DimensionsController, tuna.view.PageViewController);

/**
 * @override
 */
DimensionsController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('button-group');
    this._container.requireModule('navigation');
    this._container.requireModule('form');
};

/**
 * @override
 */
DimensionsController.prototype._initActions = function() {
    this._navigation.addChild
        (this._container.getModuleInstanceByName('navigation', 'dimensions'));

    var self = this;

    /*

    var recipeControls = this._container.getModuleInstanceByName
                                ('button-group', 'recipe-table');

    recipeControls.addEventListener('delete', function(event, button) {
        self.__deleteRecipe(button);
    });*/

    var dimensionsTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'dimensions-list');

    model.dimensions.addEventListener('update', function(event, dimensions) {
        dimensionsTransformer.applyTransform(tuna.model.serialize(dimensions));
    });

    dimensionsTransformer.applyTransform
        (tuna.model.serialize(model.dimensions.get()));

    var dimensionsForm = this._container.getModuleInstanceByName
        ('form', 'dimensions-list');

    dimensionsForm.addEventListener('result', function(event, bakery) {
        model.bakeries.addItem(bakery);
        model.currentBakery.set(bakery);
    });
};


tuna.view.registerController('dimensions_page', new DimensionsController());
