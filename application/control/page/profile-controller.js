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

};


tuna.control.registerController('profile_page', new ProfileController());
