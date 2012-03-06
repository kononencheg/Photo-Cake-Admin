/**
 * @constructor
 * @param {Object=} data
 * @extends {tuna.model.Record}
 */
var Client = function (data) {
    /**
     * @type string
     */
    this.name = '';

    /**
     * @type string
     */
    this.email = '';

    /**
     * @type string
     */
    this.phone = '';

    /**
     * @type number
     */
    this.network = 0;

    /**
     * @type string
     */
    this.networkId = '';

    tuna.model.Record.call(this, data);
};

tuna.utils.extend(Client, tuna.model.Record);

/**
 * @override
 */
Client.prototype.populate = function(data) {
    this.name = data['name'];
    this.email = data['email'];
    this.phone = data['phone'];
    this.network = data['network'];
    this.networkId = data['network_id'];
};

/**
 * @override
 */
Client.prototype.serialize = function() {
    return {
        'name': this.name,
        'email': this.email,
        'phone': this.phone,
        'network': this.network,
        'networkId': this.networkId
    };
};

/**
 * @constructor
 * @extends {Client}
 */
model.record.Client = Client;


/**
 * @const
 * @type number
 */
model.record.Client.NETWORK_NONE = 0;

/**
 * @const
 * @type number
 */
model.record.Client.NETWORK_VK = 1;

/**
 * @const
 * @type number
 */
model.record.Client.NETWORK_OK = 2;


tuna.model.recordFactory.registerRecord('client', new model.record.Client());