/**
 * @constructor
 * @extends {tuna.control.PageViewController}
 */
var ProfileController = function () {
    tuna.control.PageViewController.call(this);

    /**
     * @override
     */
    this._modules = [ 'template-transformer', 'form', 'button', 'popup' ];

};

tuna.utils.extend(ProfileController, tuna.control.PageViewController);

/**
 * @override
 */
ProfileController.prototype._initActions = function() {
    var changePasswordPopup = this._container.getModuleInstanceByName('popup', 'change-password');

    var changePasswordButton = this._container.getModuleInstanceByName('button', 'change-password');
    changePasswordButton.addEventListener('click', function() {
        changePasswordPopup.open();
    });

    var changePasswordForm = this._container.getModuleInstanceByName('form', 'change-password');
    changePasswordForm.addEventListener('result', function() {
        changePasswordPopup.close();
    });

};


tuna.control.registerController('profile_page', new ProfileController());
