/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var DimensionsController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation', 'button-group',
                      'form' ];

};

tuna.utils.extend(DimensionsController, tuna.view.PageViewController);

/**
 * @override
 */
DimensionsController.prototype._initActions = function() {
    this._navigation.addChild
        (this._container.getModuleInstanceByName('navigation', 'dimensions'));

    var dimensionsControls = this._container.getModuleInstanceByName
        ('button-group', 'dimensions-list');

    dimensionsControls.addEventListener('delete', function(event, button) {
        if (confirm('Удалить форму?')) {
            var id = button.getStringOption('dimension-id');

            tuna.rest.call('dimensions.remove', { 'id': id }, function() {
                model.dimensions.removeItemById(id);
            });

            button.setEnabled(false);
        }
    });

    var dimensionsTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'dimensions-list');

    model.dimensions.addEventListener('update', function(event, dimensions) {
        dimensionsTransformer.applyTransform(tuna.model.serialize(dimensions));
    });

    dimensionsTransformer.applyTransform
        (tuna.model.serialize(model.dimensions.get()));


    var addDimensionForm = this._container.getModuleInstanceByName
        ('form', 'add-dimension');

    var self = this;

    addDimensionForm.addEventListener('result', function(event, dimension) {
        model.dimensions.addItem(dimension);
        self._navigation.back();
    });
};


tuna.view.registerController('dimensions_page', new DimensionsController());
