/**
 * @constructor
 * @extends {tuna.view.ViewController}
 */
var MainController = function() {
    tuna.view.ViewController.call(this);
};

tuna.utils.extend(MainController, tuna.view.ViewController);

/**
 * @override
 */
MainController.prototype._requireModules = function() {
    this._container.requireModule('template-transformer');
    this._container.requireModule('navigation');
    this._container.requireModule('popup');
    this._container.requireModule('form');
};

/**
 * @override
 */
MainController.prototype._initActions = function() {
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

    var accessTransformer =
        this._container.getModuleInstanceByName
            ('template-transformer', 'body');

    accessTransformer.applyTransform(user.serialize());

    var currentBakeryTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'current-bakery');

    model.resource.bakeries.addEventListener(
        'update-current-bakery', function(event, bakery) {
            currentBakeryTransformer.applyTransform
                (tuna.model.serialize(bakery));
        }
    );

    model.resource.bakeries.addEventListener(
        'remove-current-bakery', function() {
            currentBakeryTransformer.applyTransform(null);
        }
    );

    currentBakeryTransformer.applyTransform(null);

    var userInfoTransformer =
        this._container.getModuleInstanceByName
            ('template-transformer', 'user-info');

    userInfoTransformer.applyTransform(user.serialize());

    if (!model.resource.users.isBakery(user)) {
        var bakerySelectionTransformer =
            this._container.getModuleInstanceByName
                ('template-transformer', 'bakery-selection');

        var bakerySelectionForm =
            this._container.getModuleInstanceByName
                ('form', 'bakery-selection');

        tuna.rest.call('users.getBakeries', null, function(bakeries) {
            model.resource.bakeries.setBakeries(bakeries);

            bakerySelectionTransformer.applyTransform
                (tuna.model.serialize(bakeries));

            bakerySelectionForm.addEventListener('submit', function(event) {
                event.preventDefault();

                var bakeryId  = bakerySelectionForm.getValue('bakery_id');
                if (bakeryId !== undefined) {
                    model.resource.bakeries.setCurrentBakery
                        (model.resource.bakeries.getBakeryById(bakeryId));
                }
            });

        }, 'bakery');
    } else {
        model.resource.bakeries.setCurrentBakery(user);
    }
};

tuna.view.setMainController(new MainController());
