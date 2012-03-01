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
 * @param {model.record.User} user
 * @return {boolean}
 */
Users.prototype.isBakery = function(user) {
    return user.role === model.record.User.BAKERY;
};

/**
 * @type Users
 */
model.resource.users = new Users();