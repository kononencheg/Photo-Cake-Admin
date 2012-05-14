/**
 * @constructor
 * @extends {tuna.control.PageController}
 */
var ProfileController = function () {
    tuna.control.PageController.call(this);

    /**
     * @override
     */
    this._modules = [ '' ];

};

tuna.utils.extend(ProfileController, tuna.control.PageController);

/**
 * @override
 */
ProfileController.prototype.initActions = function() {
    var changePasswordPopup = this._container.getWidget('popup', 'change-password');

    var changePasswordButton = this._container.getWidget('button', 'change-password');
    changePasswordButton.addEventListener('click', function() {
        changePasswordPopup.open();
    });

    var changePasswordForm = this._container.getWidget('form', 'change-password');
    changePasswordForm.addEventListener('result', function() {
        changePasswordPopup.close();
    });

};


tuna.control.registerController('profile_page', new ProfileController());
