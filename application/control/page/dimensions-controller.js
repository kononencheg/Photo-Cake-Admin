/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var DimensionsController = function () {
    tuna.control.PageController.call(this);
};

tuna.utils.extend(DimensionsController, tuna.control.PageController);

/**
 * @override
 */
DimensionsController.prototype.initActions = function() {
    //this._navigation.addChild
    //    (this._container.getWidget('navigation', 'dimensions'));

    var dimensionsControls = this._container.getWidget
        ('button-group', 'dimensions-list');

    dimensionsControls.addEventListener('delete', function(event, button) {
        if (confirm('Удалить форму?')) {
            var id = button.getStringOption('dimension-id');

            tuna.rest.call('dimensions.remove', { 'id': id }, function() {
                model.dimensions.removeItemById(id);
            });

            button.disable();
        }
    });

    var dimensionsTransformer = this._container.getWidget
        ('template-transformer', 'dimensions-list');

    model.dimensions.addEventListener('update', function(event, dimensions) {
        dimensionsTransformer.applyTransform(tuna.model.serialize(dimensions));
    });

    dimensionsTransformer.applyTransform
        (tuna.model.serialize(model.dimensions.get()));


    var addDimensionForm = this._container.getWidget
        ('form', 'add-dimension');

    var self = this;

    addDimensionForm.addEventListener('result', function(event, dimension) {
        model.dimensions.addItem(dimension);
        //self._navigation.back();
    });
};


tuna.control.registerController('dimensions_page', new DimensionsController());
