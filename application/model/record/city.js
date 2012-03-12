/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var City = function (data) {

    /**
     * @type {string}
     */
    this.id = '';

    /**
     * @type {string}
     */
    this.name = '';

    /**
     * @type {number}
     */
    this.timezoneOffset = 0;

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(City, tuna.model.Record);

/**
 * @override
 */
City.prototype.populate = function(data) {
    this.id = data['id'];
    this.name = data['name'];
    this.timezoneOffset = data['timezone_offset'];
};

/**
 * @override
 */
City.prototype.serialize = function() {
    return {
        'id': this.id,
        'name': this.name
    };
};

/**
 * @constructor
 * @extends {City}
 */
model.record.City = City;

tuna.model.recordFactory.registerRecord('city', new model.record.City());