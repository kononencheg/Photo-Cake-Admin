/**
 * @constructor
 * @extends {tuna.rest.DefaultMethod}
 * @param {string=} opt_name Имя удаленного метода.
 */
rest.CommonMethod = function (opt_name) {
    var self = this;

    /**
     * @private
     * @type {tuna.net.Request}
     */
    this.__request = null;

    /**
     * @private
     * @type {function()}
     */
    this.__completeHandler = tuna.utils.bind(function(event, data) {
        self._handleResponse(data);
    }, this);

    tuna.rest.DefaultMethod.call(this, opt_name);
};

tuna.utils.extend(rest.CommonMethod, tuna.rest.Method);

/**
 * @inheritDoc
 */
rest.CommonMethod.prototype.setName = function(name) {
    if (this.__request === null) {
        this.__request = new tuna.net.Request();
        this.__request.setMethod(tuna.net.Request.METHOD_POST);
        this.__request.addEventListener('complete', this.__completeHandler);
    }

    this.__request.setURL('/api/?method=' + name);
};

/**
 * @inheritDoc
 */
rest.CommonMethod.prototype.call = function(args) {
    this.__request.send(args);
};

/**
 * TODO: Описать интерфейс.
 *
 * @param {string} data
 */
rest.CommonMethod.prototype._handleResponse = function(data) {
    var result = null;

    try {
        result = JSON.parse(data);
    } catch (error) {
        this.dispatch('error', data);
    }

    if (result !== null) {
        if (result['response'] !== undefined) {
            this.dispatch('result', result['response']);
        } else {
            this.dispatch('error', result['errors'] || result);
        }
    } else {
        this.dispatch('error', data);
    }
};

tuna.rest.getMethodFactory().setDefaultMethod(new rest.CommonMethod());