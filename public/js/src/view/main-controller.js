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
    form.addEventListener('result', function(event, result) {
        location.reload();
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
    var transformer = this._container.getModuleInstanceByName
                        ('template-transformer', 'user-info');

    transformer.applyTransform(user.serialize());
};


tuna.view.setMainController(new MainController());
