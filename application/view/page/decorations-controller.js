/**
 * @constructor
 * @extends {tuna.view.PageViewController}
 */
var DecorationsController = function () {
    tuna.view.PageViewController.call(this);

    /**
     * @type {function()}
     * @private
     */
    this.__updateDecorationLists
        = tuna.utils.bind(this.__updateDecorationLists, this);

    /**
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     * @private
     */
    this.__unusedDecoTransformer = null;

    /**
     * @type {tuna.ui.ModuleInstance|tuna.ui.transformers.TemplateTransformer}
     * @private
     */
    this.__availableDecoTransformer = null;

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation', 'button-group',
                      'form', 'popup-button' ];
};

tuna.utils.extend(DecorationsController, tuna.view.PageViewController);

/**
 * @override
 */
DecorationsController.prototype._initActions = function() {
    this.__unusedDecoTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'decorations-list');

    this.__availableDecoTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'available-decorations-list');

    model.decorations.addEventListener('update', this.__updateDecorationLists);
    model.currentBakery.addEventListener('update', this.__updateDecorationLists);

    model.decorations.load();

    var saveForm = this._container.getModuleInstanceByName
        ('form', 'available-decorations-list');

    saveForm.addEventListener('result', function(event, bakery) {
        model.currentBakery.set(bakery);
    });

    var addDecorationButton = this._container.getModuleInstanceByName
        ('popup-button', 'add-decoration');

    var addDecorationPopup = addDecorationButton.getPopup();

    var addDecorationForm = this._container.getModuleInstanceByName
        ('form', 'add-decoration');

    addDecorationForm.addEventListener('result', function(event, decoration) {
        model.decorations.addItem(decoration);
        addDecorationPopup.close();
    });

    var self = this;

    var addControls =this._container.getModuleInstanceByName
        ('button-group', 'decorations-list');

    addControls.addEventListener('add', function(event, button) {
        var decorationId = button.getStringOption('decoration-id');
        var bakery = model.currentBakery.get();

        if (bakery.decorationPrices[decorationId] === undefined) {
            bakery.decorationPrices[decorationId] = 0;
        }

        self.__updateDecorationLists();
    });

    var removeControls =this._container.getModuleInstanceByName
        ('button-group', 'available-decorations-list');

    removeControls.addEventListener('remove', function(event, button) {
        var decorationId = button.getStringOption('decoration-id');
        var bakery = model.currentBakery.get();

        if (bakery.decorationPrices[decorationId] !== undefined) {
            delete bakery.decorationPrices[decorationId];
            self.__updateDecorationLists();
        }
    });

    this.__updateDecorationLists();
};

/**
 * @private
 */
DecorationsController.prototype.__updateDecorationLists = function() {
    var bakery = model.currentBakery.get();
    if (bakery !== null) {
        var availableDecorations = model.decorations.find(function(decoration) {
            return bakery.decorationPrices[decoration.id] !== undefined;
        });

        this.__availableDecoTransformer.applyTransform
            (tuna.model.serialize(availableDecorations, bakery));

        var unusedDecorations = model.decorations.find(function(decoration) {
            return bakery.decorationPrices[decoration.id] === undefined;
        });

        this.__unusedDecoTransformer.applyTransform
            (tuna.model.serialize(unusedDecorations, bakery));
    }
};

tuna.view.registerController('decorations_page', new DecorationsController());
