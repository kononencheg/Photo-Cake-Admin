/**
 * @constructor
 * @extends {tuna.control.Controller}
 */
var MainController = function() {
    tuna.control.Controller.call(this);
};

tuna.utils.extend(MainController, tuna.control.Controller);

/**
 * @override
 */
MainController.prototype.initActions = function() {
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
    var form = this._container.getWidget('form', 'sign-out');
    form.addEventListener('result', function() {
        location.reload();
    });
};

/**
 * @private
 */
MainController.prototype.__showSignUpPopup = function() {
    var self = this;

    var popup = this._container.getWidget('popup', 'sign-in');
    var form = this._container.getWidget('form', 'sign-in');

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

    var mainMenu = this._container.getWidget('navigation-menu', 'main-menu');

    var navigation = this._container.getWidget('navigation', 'body-container');
    navigation.addHandler(mainMenu);
    navigation.addEventListener('open-page', function(event, page) {
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

    var globalTransformer =
        this._container.getWidget('template-transformer', 'body-container');

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

    if (user.role !== model.record.User.ROLE_BAKERY) {
        var bakeryForm = this._container.getWidget('form', 'bakery-selection');

        bakeryForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var id  = bakeryForm.getValue('bakery_id');
            if (id !== undefined) {
                model.currentBakery.set(model.bakeries.getItemById(id));
            }
        });

        var bakeryTransformer = this._container.getWidget
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

tuna.control.setApplicationController(new MainController());
