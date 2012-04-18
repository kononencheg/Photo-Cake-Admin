/**
 * @constructor
 * @param {Object=} data
 * @extends {model.record.User}
 */
model.record.Partner = function (data) {

    /**
     * @type {string}
     */
    this.url = '';

    model.record.User.call(this, data);
};

tuna.utils.extend(model.record.Partner, model.record.User);

/**
 * @override
 */
model.record.Partner.prototype.populate = function(data) {
    model.record.User.prototype.populate.call(this, data);

    this.url = data['url'] || '';
};

/**
 * @override
 */
model.record.Partner.prototype.serialize = function() {
    var result = model.record.User.prototype.serialize.call(this);
    result['url'] = this.url;

    return result;
};

tuna.model.recordFactory.registerRecord('partner', new model.record.Partner());