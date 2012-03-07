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
    var navigation = this._container.getModuleInstanceByName
                        ('navigation', 'dimensions-navigation');

    this._navigation.addChild
        (navigation, this._container.getOption('page-name'));

    var self = this;
    /*var recipeControls = this._container.getModuleInstanceByName
                                ('button-group', 'recipe-table');

    recipeControls.addEventListener('delete', function(event, button) {
        self.__deleteRecipe(button);
    });*/

    model.resource.bakeries.addEventListener(
        'update-current-bakery', function() {
            self.__loadDimensions();
        }
    );

    var dimensionsListTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'dimensions-list');

    model.resource.dimensions.addEventListener(
        'update-dimensions', function(event, dimensions) {
            dimensionsListTransformer.applyTransform
                                        (tuna.model.serialize(dimensions));
        }
    );

    this.__loadDimensions();
};

/**
 * @private
 */
DimensionsController.prototype.__loadDimensions = function() {
    var bakery = model.resource.bakeries.getCurrentBakery();
    if (bakery !== null) {
        tuna.rest.call('dimensions.get', {
            'bakery_id': bakery.id
        }, function(dimensions) {
            model.resource.dimensions.setDimensions(dimensions);
        }, 'dimension');
    }
};


tuna.view.registerController('dimensions_page', new DimensionsController());
