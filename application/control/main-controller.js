/**
 * @constructor
 * @extends {tuna.control.ViewController}
 */
var MainController = function() {
    tuna.control.ViewController.call(this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation', 'popup', 'form' ];
};

tuna.utils.extend(MainController, tuna.control.ViewController);

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
    }, 'bakery');

    this.__initSingOutForm();
};

/**
 * @private
 */
MainController.prototype.__initSingOutForm = function() {
    var form = this._container.getModuleInstanceByName('form', 'sign-out');
    form.addEventListener('result', function() {
        location.reload();
    });
};

/**
 * @private
 */
MainController.prototype.__showSignUpPopup = function() {
    var self = this;

    var popup = this._container.getModuleInstanceByName('popup', 'sign-in');
    var form = this._container.getModuleInstanceByName('form', 'sign-in');

    form.addEventListener('result', function(event, user) {
        self.__applyUser(user);
        popup.close();
    });

    popup.open();
};

/**
 * @private
 * @param {model.record.User} user
 */
MainController.prototype.__applyUser = function(user) {
    var applicationFrame = tuna.dom.selectOne('#application_frame');
    var navigation = this._container.getModuleInstanceByName
        ('navigation', 'body-container');

    navigation.addEventListener('open', function(event, page) {
        if (page === 'application') {
            var bakery = model.currentBakery.get();

            if (bakery !== null) {
                applicationFrame.src = tuna.utils.config.get('app', 'bakery') +
                    '?bakery_id=' + bakery.id;
            } else {
                applicationFrame.src = tuna.utils.config.get('app', 'site');
            }
        }
    });
    var globalTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'body-container');

    model.currentBakery.addEventListener('update', function(event, bakery) {
        globalTransformer.reset();
        globalTransformer.applyTransform({
            'currentUser': tuna.model.serialize(user),
            'currentBakery': tuna.model.serialize(bakery)
        });

        if (bakery !== null) {
            model.dimensions.load({ 'bakery_id': bakery.id });
            model.recipes.load({ 'bakery_id': bakery.id });
            model.orders.load({ 'bakery_id': bakery.id });
        }
    });

    if (user.role === model.record.User.ROLE_ADMIN) {
        var bakeryForm = this._container.getModuleInstanceByName
            ('form', 'bakery-selection');

        bakeryForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var id  = bakeryForm.getValue('bakery_id');
            if (id !== undefined) {
                model.currentBakery.set(model.bakeries.getItemById(id));
            }
        });

        var bakeryTransformer = this._container.getModuleInstanceByName
            ('template-transformer', 'bakery-selection');

        model.bakeries.addEventListener('update', function(event, bakeries) {
            bakeryTransformer.applyTransform(tuna.model.serialize(bakeries));
        });

        model.bakeries.load();

        globalTransformer.applyTransform({
            'currentUser': tuna.model.serialize(user)
        });

    } else {
        model.currentBakery.set(user);
    }
};

tuna.control.setMainController(new MainController());
