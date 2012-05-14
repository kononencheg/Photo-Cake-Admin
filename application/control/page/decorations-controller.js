/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var DecorationsController = function () {
    tuna.control.PageController.call(this);

    /**
     * @type {function()}
     * @private
     */
    this.__updateDecorationLists
        = tuna.utils.bind(this.__updateDecorationLists, this);

    /**
     * @type {tuna.ui.Widget|tuna.ui.transformers.TemplateTransformer}
     * @private
     */
    this.__unusedDecoTransformer = null;

    /**
     * @type {tuna.ui.Widget|tuna.ui.transformers.TemplateTransformer}
     * @private
     */
    this.__availableDecoTransformer = null;
};

tuna.utils.extend(DecorationsController, tuna.control.PageController);

/**
 * @override
 */
DecorationsController.prototype.initActions = function() {
    this.__unusedDecoTransformer = this._container.getWidget
        ('template-transformer', 'decorations-list');

    this.__availableDecoTransformer = this._container.getWidget
        ('template-transformer', 'available-decorations-list');

    model.decorations.addEventListener('update', this.__updateDecorationLists);
    model.currentBakery.addEventListener('update', this.__updateDecorationLists);

    model.decorations.load();

    var saveForm = this._container.getWidget
        ('form', 'available-decorations-list');

    saveForm.addEventListener('result', function(event, bakery) {
        model.bakeries.addItem(bakery);
        model.currentBakery.set(bakery);
    });

    var addDecorationButton = this._container.getWidget
        ('popup-button', 'add-decoration');

    var addDecorationPopup = addDecorationButton.getPopup();

    var addDecorationForm = this._container.getWidget
        ('form', 'add-decoration');

    addDecorationForm.addEventListener('result', function(event, decoration) {
        model.decorations.addItem(decoration);
        addDecorationPopup.close();
    });

    var self = this;

    var addControls =this._container.getWidget
        ('button-group', 'decorations-list');

    addControls.addEventListener('add', function(event, button) {
        var decorationId = button.getStringOption('decoration-id');
        var bakery = model.currentBakery.get();

        if (bakery.decorationPrices[decorationId] === undefined) {
            bakery.decorationPrices[decorationId] = 0;
        }

        self.__updateDecorationLists();
    });

    var removeControls = this._container.getWidget
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

tuna.control.registerController('decorations_page', new DecorationsController());
