/**
 * @constructor
 */
var Users = function () {

    /**
     * @private
     * @type {Array.<string>}
     */
    this.__roles = [ 'Админ', 'Кондитерская' ];
};

/**
 * @param {number} role
 * @return {string}
 */
Users.prototype.getRoleName = function(role) {
    return this.__roles[role];
};

/**
 * @type Users
 */
model.resource.users = new Users();