/**
 * @constructor
 * @extends {tuna.model.Record}
 */
var User = function () {
    /**
     * @type {string}
     */
    this.id = '';

    /**
     * @type {string}
     */
    this.name = '';

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
 * @override
 */
User.prototype.populate = function(data) {
    this.id = data['id'];
    this.name = data['name'];
    this.email = data['email'];
    this.role = data['role'];
};

/**
 * @override
 */
User.prototype.serialize = function() {
    return {
        'id': this.id,
        'email': this.email,
        'role':this.role,
        'roleName': model.resource.users.getRoleName(this.role)
    };
};

/**
 * @constructor
 * @extends {User}
 */
model.record.User = User;


/**
 * @const
 * @type number
 */
model.record.User.ADMIN = 0;

/**
 * @const
 * @type number
 */
model.record.User.BAKERY = 1;


tuna.model.recordFactory.registerRecord('user', new model.record.User());