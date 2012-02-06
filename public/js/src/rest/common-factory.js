/**
 * @constructor
 * @implements {tuna.rest.IMethodFactory}
 */
var CommonFactory = function() {};

tuna.utils.implement(CommonFactory, tuna.rest.IMethodFactory);

/**
 * @override
 */
CommonFactory.prototype.createMethod = function(name) {
    return new rest.CommonMethod(name);
};

tuna.rest.methodFactory.setDefaultFactory(new CommonFactory());
