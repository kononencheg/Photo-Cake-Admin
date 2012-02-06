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
};

/**
 * @private
 */
MainController.prototype.__showSignUpPopup = function() {
    var popup = this._container.getModuleInstanceByName('popup', 'login');
    popup.open();

    var form = this._container.getModuleInstanceByName('form', 'login');
    form.setRecordName('user');

    var self = this;
    form.addEventListener('result', function(event, user) {
        self.__applyUser(user);
        popup.close();
    });
};

/**
 * @private
 * @param {model.records.User} user
 */
MainController.prototype.__applyUser = function(user) {

};


tuna.view.setMainController(new MainController());
