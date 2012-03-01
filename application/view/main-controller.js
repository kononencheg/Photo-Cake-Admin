/**
 * @constructor
 * @extends {tuna.view.NavigationViewController}
 */
var MainController = function() {
    tuna.view.NavigationViewController.call(this);
};

tuna.utils.extend(MainController, tuna.view.NavigationViewController);

/**
 * @override
 */
MainController.prototype._requireModules = function() {
    tuna.view.NavigationViewController.prototype._requireModules.call(this);

    this._container.requireModule('template-transformer');
    this._container.requireModule('popup');
    this._container.requireModule('form');
};

/**
 * @override
 */
MainController.prototype._initActions = function() {
    tuna.view.NavigationViewController.prototype._initActions.call(this);

    var self = this;
    tuna.rest.call('users.getCurrent', null, function(user) {
        if (user === null) {
            self.__showSignUpPopup();
        } else {
            self.__applyUser(user);
        }
    }, 'user');

    this.__initSingOutForm();
};

/**
 * @private
 */
MainController.prototype.__initSingOutForm = function() {
    var form = this._container.getModuleInstanceByName('form', 'sign-out');
    form.addEventListener('result', function() {
        location.reload()
    });
};

/**
 * @private
 */
MainController.prototype.__showSignUpPopup = function() {
    var popup = this._container.getModuleInstanceByName('popup', 'sign-in');
    popup.open();

    var form = this._container.getModuleInstanceByName('form', 'sign-in');

    var self = this;
    form.addEventListener('result', function(event, user) {
        self.__applyUser(user);
        popup.close();
    });
};

/**
 * @private
 * @param {model.record.User} user
 */
MainController.prototype.__applyUser = function(user) {
    var userInfoTransformer =
        this._container.getModuleInstanceByName
            ('template-transformer', 'user-info');

    userInfoTransformer.applyTransform(user.serialize());

    var adminControlsTransformer =
        this._container.getModuleInstanceByName
            ('template-transformer', 'admin-controls');

    adminControlsTransformer.applyTransform(user.serialize());

    if (!model.resource.users.isBakery(user)) {
        var self = this;

        var bakerySelectionTransformer =
            this._container.getModuleInstanceByName
                ('template-transformer', 'bakery-selection');

        var bakerySelectionForm =
            this._container.getModuleInstanceByName
                ('form', 'bakery-selection');

        tuna.rest.call('users.getBakeries', null, function(bakeries) {
            model.resource.bakeries.setBakeries(bakeries);

            bakerySelectionTransformer.applyTransform
                (tuna.model.serializeArray(bakeries));

            self._navigation.navigate('orders_page');


            bakerySelectionForm.addEventListener('submit', function(event) {
                event.preventDefault();

                var data = bakerySelectionForm.serialize();
                if (data['bakery_id'] !== undefined) {
                    var bakery = model.resource.bakeries.getBakeryById
                                    (data['bakery_id']);

                    self.__updateBakery(bakery);
                }
            });

        }, 'bakery');
    } else {
        this._navigation.navigate('orders_page');
        this.__updateBakery(user);
    }
};

/**
 * @param {model.record.User} bakery
 * @private
 */
MainController.prototype.__updateBakery = function(bakery) {
    model.resource.bakeries.setCurrentBakery(bakery);

    var controller = this.getCurrentController();
    if (controller instanceof view.BakeryPageController) {
        controller.handleBakeryChange();
    }
};

tuna.view.setMainController(new MainController());
