/**
 * @constructor
 * @extends {tuna.model.Record}
 */
var User = function () {
    /**
     * @type string
     */
    this.email = '';

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
 */
User.prototype.populate = function(data) {
    this.email = data['email'];
    this.role = data['role'];
};

/**
 * @override
 */
User.prototype.serialize = function() {
    return {
        'email': this.email,
        'role': model.resource.users.getRoleName(this.role)
    };
};

/**
 * @constructor
 * @extends {User}
 */
model.record.User = User;

tuna.model.recordFactory.registerRecord('user', new model.record.User());