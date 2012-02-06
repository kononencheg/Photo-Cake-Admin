/**
 * @constructor
 * @extends {tuna.model.Record}
 */
var User = function () {
    /**
     * @type string
     */
    this.name = '';

    /**
     * @type number
     */
    this.role = -1;
};

tuna.utils.extend(User, tuna.model.Record);

/**
 * @const
 * @type number
 */
User.ADMIN = 0;

/**
 * @const
 * @type number
 */
User.BAKERY = 1;

/**
 * @override
 * @param {Object} data
 */
User.prototype.populate = function(data) {
    this.name = data['name'];
    this.role = data['role'];
};

/**
 * @constructor
 * @extends {User}
 */
model.records.User = User;

tuna.model.recordFactory.registerRecord('user', new model.records.User());