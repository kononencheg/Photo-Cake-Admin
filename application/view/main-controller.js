/**
 * @constructor
 * @extends {tuna.view.ViewController}
 */
var MainController = function() {
    tuna.view.ViewController.call(this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'navigation', 'popup', 'form' ];
};

tuna.utils.extend(MainController, tuna.view.ViewController);

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
    } else {
        model.currentBakery.set(user);
    }

    var globalTransformer = this._container.getModuleInstanceByName
        ('template-transformer', 'body-container');

    function updateGlobalTransformer() {
        var bakery = model.currentBakery.get();

        globalTransformer.reset();
        globalTransformer.applyTransform({
            'currentUser': tuna.model.serialize(user),
            'currentBakery': tuna.model.serialize(bakery)
        });
    }

    model.currentBakery.addEventListener('update', updateGlobalTransformer);

    var navigation = this._container.getModuleInstanceByName
        ('navigation', 'body-container');

    navigation.addEventListener('open', function(event, index) {
        if (index === 'dimensions') {
            updateGlobalTransformer();
        }
    });

    updateGlobalTransformer();

    model.dimensions.load();
    model.cities.load();
};

tuna.view.setMainController(new MainController());
