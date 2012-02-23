'use strict';var tuna = {};
tuna.VERSION = "3.2.70";
tuna.IS_IE = !!eval("'\v' == 'v'");
tuna.IS_COMPILED = false;
tuna.dom = {};
tuna.events = {};
tuna.model = {};
tuna.net = {};
tuna.rest = {};
tuna.tmpl = {};
tuna.tmpl.compilers = {};
tuna.tmpl.data = {};
tuna.tmpl.markup = {};
tuna.tmpl.settings = {};
tuna.tmpl.units = {};
tuna.ui = {};
tuna.ui.buttons = {};
tuna.ui.containers = {};
tuna.ui.flash = {};
tuna.ui.forms = {};
tuna.ui.popups = {};
tuna.ui.modules = {};
tuna.ui.selection = {};
tuna.ui.transformers = {};
tuna.ui.selection.items = {};
tuna.ui.selection.rule = {};
tuna.ui.selection.view = {};
tuna.utils = {};
tuna.view = {};
tuna.utils.toArray = function(list) {
  return Array.prototype.slice.call(list)
};
tuna.utils.implement = function(Class, Interface) {
  if(!tuna.IS_COMPILED) {
    for(var method in Interface.prototype) {
      if(typeof Interface.prototype[method] === "function") {
        Class.prototype[method] = Interface.prototype[method]
      }
    }
  }
};
tuna.utils.extend = function(Class, Parent) {
  var Link = function() {
  };
  Link.prototype = Parent.prototype;
  Class.prototype = new Link;
  Class.prototype.constructor = Class
};
tuna.utils.eval = function(code) {
  return window.execScript !== undefined ? window.execScript(code) : window.eval(code)
};
tuna.utils.bind = function(func, context) {
  if(func.bind !== undefined) {
    return func.bind(context)
  }else {
    var args = Array.prototype.slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(tuna.utils.toArray(arguments)))
    }
  }
};
tuna.utils.nextTick = function(callback) {
  setTimeout(callback, 0)
};
tuna.utils.clone = function(object, clones) {
  if(object instanceof Array) {
    return tuna.utils.cloneArray(object)
  }else {
    if(object instanceof Date) {
      return tuna.utils.cloneDate(object)
    }else {
      if(object instanceof Object) {
        if(clones === undefined) {
          clones = [object]
        }else {
          clones.push(object)
        }
        var result = {};
        for(var key in object) {
          if(object.hasOwnProperty(key)) {
            if(tuna.utils.indexOf(object[key], clones) === -1) {
              result[key] = tuna.utils.clone(object[key])
            }else {
              throw new TypeError("Cloning circular structure");
            }
          }
        }
        return result
      }
    }
  }
  return object
};
tuna.utils.cloneDate = function(date) {
  return new Date(date.getTime())
};
tuna.utils.cloneArray = function(array) {
  return array.slice(0)
};
tuna.utils.indexOf = function(element, array) {
  if(array.indexOf !== undefined) {
    return array.indexOf(element)
  }else {
    var i = 0, l = array.length;
    while(i < l) {
      if(array[i] === element) {
        return i
      }
      i++
    }
  }
  return-1
};
var Config = function() {
  this.__data = null
};
Config.prototype.init = function(data) {
  this.__data = data
};
Config.prototype.get = function(key) {
  if(this.__data[key] !== undefined) {
    return this.__data[key]
  }
  return null
};
tuna.utils.config = new Config;
tuna.dom.__addCustomIEListener = function(element, type, handler) {
  if(element.__customListener == undefined) {
    element.__customListener = function(event) {
      if(event.__type !== undefined) {
        var type = event.__type;
        delete event.__type;
        var handlers = element["__" + type];
        for(var i in handlers) {
          handlers[i].call(element, event)
        }
      }
    };
    element.attachEvent("onhelp", element.__customListener)
  }
  if(element["__" + type] === undefined) {
    element["__" + type] = []
  }
  element["__" + type].push(handler)
};
tuna.dom.__removeCustomIEListener = function(element, type, handler) {
  var handlers = element["__" + type];
  if(handlers !== undefined) {
    var i = handlers.length - 1;
    while(i >= 0) {
      if(handlers[i] === handler) {
        handlers.splice(i, 1)
      }
      i--
    }
  }
};
tuna.dom.__dispatchCustomIEEvent = function(element, event, type) {
  event.__type = type;
  return element.fireEvent("onhelp", event)
};
tuna.dom.__selectorEngine = null;
tuna.dom.setSelectorEngine = function(engine) {
  tuna.dom.__selectorEngine = engine
};
tuna.dom.select = function(selector, context) {
  if(tuna.dom.__selectorEngine !== null) {
    return tuna.dom.__selectorEngine(selector, context)
  }
  return null
};
tuna.dom.filter = function(selector, elements) {
  if(tuna.dom.__selectorEngine !== null && tuna.dom.__selectorEngine.filter !== undefined) {
    return tuna.dom.__selectorEngine.filter(selector, elements)
  }
  return null
};
tuna.dom.selectOne = function(selector, context) {
  if(tuna.dom.__selectorEngine !== null) {
    var result = tuna.dom.__selectorEngine(selector, context);
    if(result.length > 0) {
      return result[0]
    }
  }
  return null
};
tuna.dom.createFragment = function(html, doc) {
  var fragment = doc.createDocumentFragment();
  var tempContainer = doc.createElement("div");
  tempContainer.innerHTML = html;
  var children = tempContainer.childNodes;
  var i = 0, l = children.length;
  while(i < l) {
    fragment.appendChild(children.item(0));
    i++
  }
  return fragment
};
tuna.dom.addChildEventListener = function(element, childSelector, type, handler) {
  tuna.dom.addEventListener(element, type, function(event) {
    var eventTarget = event.target || event.srcElement;
    var target = tuna.dom.__selectorEngine.matches(childSelector, [eventTarget])[0];
    if(target === undefined) {
      target = tuna.dom.getParentMatches(eventTarget, childSelector, element)
    }
    if(target !== null) {
      handler.call(target, event)
    }
  })
};
tuna.dom.addEventListener = function(element, type, handler) {
  if(element.addEventListener !== undefined) {
    element.addEventListener(type, handler, false)
  }else {
    if(element.attachEvent !== undefined) {
      var eventName = "on" + type;
      if(element[eventName] === undefined) {
        tuna.dom.__addCustomIEListener(element, type, handler)
      }else {
        element.attachEvent(eventName, handler)
      }
    }
  }
};
tuna.dom.addOneEventListener = function(element, type, handler) {
  var listener = function(event) {
    handler.call(element, event);
    tuna.dom.removeEventListener(element, type, listener)
  };
  tuna.dom.addEventListener(element, type, listener)
};
tuna.dom.removeEventListener = function(element, type, handler) {
  if(element.removeEventListener !== undefined) {
    element.removeEventListener(type, handler, false)
  }else {
    if(element.detachEvent !== undefined) {
      var eventName = "on" + type;
      if(element[eventName] === undefined) {
        tuna.dom.__removeCustomIEListener(element, type, handler)
      }else {
        element.detachEvent("on" + type, handler)
      }
    }
  }
};
tuna.dom.dispatchEvent = function(element, type, data) {
  var result = false;
  var doc = element.ownerDocument;
  var event = null;
  if(doc.createEventObject !== undefined) {
    event = doc.createEventObject();
    data && (event.data = data);
    var eventName = "on" + type;
    if(element[eventName] === undefined) {
      tuna.dom.__dispatchCustomIEEvent(element, event, type)
    }else {
      result = element.fireEvent(eventName, event)
    }
  }else {
    event = document.createEvent("UIEvents");
    event.initUIEvent(type, true, true, window, 1);
    data && (event.data = data);
    result = !element.dispatchEvent(event)
  }
  return result
};
tuna.dom.preventDefault = function(event) {
  if(event.preventDefault !== undefined) {
    event.preventDefault()
  }else {
    event.returnValue = false
  }
};
tuna.dom.stopPropagation = function(event) {
  if(event.stopPropagation !== undefined) {
    event.stopPropagation()
  }else {
    event.cancelBubble = true
  }
};
tuna.dom.getChildIndex = function(element, parent) {
  var result = -1;
  var child;
  if(element.parentNode === parent) {
    result = 0;
    child = parent.firstChild;
    while(child !== undefined && child !== element) {
      result++;
      child = child.nextSibling
    }
  }
  return result
};
tuna.dom.getChildAt = function(parent, index) {
  return parent.childNodes[index] || null
};
tuna.dom.getParentMatches = function(element, selector, context) {
  var parent = element.parentNode;
  while(parent !== null && parent !== context && tuna.dom.__selectorEngine.matches(selector, [parent]).length === 0) {
    parent = parent.parentNode
  }
  return parent === context ? null : parent
};
tuna.dom.getParentWithClass = function(element, className, context) {
  var parent = element.parentNode;
  while(parent !== null && parent !== context && !tuna.dom.hasClass(parent, className)) {
    parent = parent.parentNode
  }
  return parent === context ? null : parent
};
tuna.dom.hasClass = function(element, className) {
  if(element.classList !== undefined) {
    return element.classList.contains(className)
  }else {
    if(element.className !== undefined) {
      return element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)")) !== null
    }
  }
  return false
};
tuna.dom.addClass = function(element, className) {
  if(element.classList !== undefined) {
    element.classList.add(className)
  }else {
    if(!tuna.dom.hasClass(element, className)) {
      element.className += " " + className
    }
  }
};
tuna.dom.removeClass = function(element, className) {
  if(element.classList !== undefined) {
    element.classList.remove(className)
  }else {
    if(tuna.dom.hasClass(element, className)) {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      element.className = element.className.replace(reg, " ")
    }
  }
};
tuna.dom.setClassExist = function(element, className, isExist) {
  if(!isExist && tuna.dom.hasClass(element, className)) {
    tuna.dom.removeClass(element, className)
  }else {
    if(isExist && !tuna.dom.hasClass(element, className)) {
      tuna.dom.addClass(element, className)
    }
  }
};
tuna.dom.getAttributesData = function(element, prefix) {
  if(prefix === undefined) {
    prefix = "data-"
  }
  var result = {};
  var attrs = element.attributes;
  var i = 0, l = attrs.length;
  while(i < l) {
    if(attrs[i].name.indexOf(prefix) === 0) {
      result[attrs[i].name.substr(prefix.length)] = attrs[i].value
    }
    i++
  }
  return result
};
var BasicEvent = function(type, isBubbling) {
  this._target = null;
  this._type = type;
  this._isBubbling = !!isBubbling;
  this._isCanceled = false;
  this._isStopped = false;
  this._isImmediateStopped = false
};
BasicEvent.prototype.setTarget = function(target) {
  this._target = target
};
BasicEvent.prototype.getTarget = function() {
  return this._target
};
BasicEvent.prototype.getType = function() {
  return this._type
};
BasicEvent.prototype.isBubbling = function() {
  return this._isBubbling
};
BasicEvent.prototype.preventDefault = function() {
  this._isCanceled = true
};
BasicEvent.prototype.isDefaultPrevented = function() {
  return this._isCanceled
};
BasicEvent.prototype.stopImmediatePropagation = function() {
  this._isImmediateStopped = true
};
BasicEvent.prototype.isImmediatePropagationStopped = function() {
  return this._isImmediateStopped
};
BasicEvent.prototype.stopPropagation = function() {
  this._isStopped = true
};
BasicEvent.prototype.isPropagationStopped = function() {
  return this._isImmediateStopped || this._isStopped
};
tuna.events.BasicEvent = BasicEvent;
var IEventDispatcher = function() {
};
IEventDispatcher.prototype.dispatch = function(event, data) {
};
IEventDispatcher.prototype.addEventListener = function(type, listener) {
};
IEventDispatcher.prototype.removeEventListener = function(type, listener) {
};
IEventDispatcher.prototype.hasEventListener = function(type, listener) {
};
tuna.events.IEventDispatcher = IEventDispatcher;
var EventDispatcher = function(parent) {
  this._propagationParent = parent || null;
  this._listeners = {}
};
tuna.utils.implement(EventDispatcher, tuna.events.IEventDispatcher);
EventDispatcher.prototype.dispatch = function(event, data) {
  if(!(event instanceof tuna.events.BasicEvent)) {
    event = new tuna.events.BasicEvent(event)
  }
  var type = event.getType();
  if(this._listeners[type] !== undefined) {
    if(event.getTarget() === null) {
      event.setTarget(this)
    }
    var i = 0, l = this._listeners[type].length;
    while(i < l) {
      this._listeners[type][i].call(this, event, data);
      if(event.isImmediatePropagationStopped()) {
        break
      }
      i++
    }
    if(this._propagationParent !== null && event.isBubbling() && !event.isPropagationStopped()) {
      this._propagationParent.dispatch(event)
    }
  }
  return!event.isDefaultPrevented()
};
EventDispatcher.prototype.addEventListener = function(type, listener) {
  if(this._listeners[type] === undefined) {
    this._listeners[type] = [listener]
  }else {
    if(!this.hasEventListener(type, listener)) {
      this._listeners[type].push(listener)
    }
  }
};
EventDispatcher.prototype.removeEventListener = function(type, listener) {
  if(this._listeners[type] !== undefined) {
    var listenerIndex = tuna.utils.indexOf(listener, this._listeners[type]);
    if(listenerIndex !== -1) {
      this._listeners[type].splice(listenerIndex, 1)
    }
  }
};
EventDispatcher.prototype.hasEventListener = function(type, listener) {
  if(this._listeners[type] !== undefined) {
    return tuna.utils.indexOf(listener, this._listeners[type]) !== -1
  }
  return false
};
tuna.events.EventDispatcher = EventDispatcher;
var IRequest = function() {
};
tuna.utils.extend(IRequest, tuna.events.IEventDispatcher);
IRequest.prototype.send = function(url) {
};
IRequest.prototype.abort = function() {
};
tuna.net.IRequest = IRequest;
var Request = function(url) {
  tuna.events.EventDispatcher.call(this);
  this.__url = url || "/";
  this.isSync = false;
  this.method = "GET";
  this.headers = [];
  this.__data = null;
  this.__response = null;
  this.__request = null
};
tuna.utils.implement(Request, tuna.net.IRequest);
tuna.utils.extend(Request, tuna.events.EventDispatcher);
Request.prototype.setData = function(data) {
  this.__data = data
};
Request.prototype.setURL = function(url) {
  this.__url = url
};
Request.prototype.__requestStateHandler = function(request) {
  if(request.readyState === 4) {
    this.__response = request.responseText;
    this.dispatch("complete", this.__response);
    request.abort()
  }
};
Request.prototype.send = function() {
  var requestURL = this.__url;
  if(this.__request !== null) {
    this.__request.abort()
  }
  var request = !tuna.IS_IE ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
  if(!this.isSync) {
    var self = this;
    request.onreadystatechange = function() {
      self.__requestStateHandler(request)
    }
  }
  var dataString = Request.encode(this.__data);
  if(this.method === "GET" && dataString !== "") {
    requestURL += (requestURL.indexOf("?") === -1 ? "?" : "&") + dataString
  }
  request.open(this.method, encodeURI(requestURL), !this.isSync);
  var i = this.headers.length - 1;
  while(i >= 0) {
    request.setRequestHeader(this.headers[i].name, this.headers[i].value);
    i--
  }
  var sendData = null;
  if(this.method === "POST") {
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    sendData = dataString
  }
  request.send(sendData);
  if(this.isSync) {
    this.__response = request.responseText;
    this.dispatch("complete", this.__response)
  }
  this.__request = request
};
Request.prototype.abort = function() {
  if(this.__request !== null) {
    this.__request.abort()
  }
};
Request.prototype.getResponse = function() {
  return this.__response
};
Request.encode = function(object) {
  return Request.__splitData(object).join("&")
};
Request.__splitData = function(object, path) {
  var result = [];
  if(path === undefined) {
    path = []
  }
  if(object !== null && !(object instanceof Function)) {
    if(object instanceof Object) {
      for(var key in object) {
        var newPath = path.length === 0 ? [key] : (path.join(",") + "," + key).split(",");
        result = result.concat(Request.__splitData(object[key], newPath))
      }
    }else {
      result = [path.shift() + (path.length > 0 ? "[" + path.join("][") + "]=" : "=") + encodeURIComponent("" + object)]
    }
  }
  return result
};
tuna.net.Request = Request;
var Record = function() {
};
Record.prototype.clone = function() {
  var clone = new this.constructor;
  for(var param in this) {
    if(this.hasOwnProperty(param)) {
      clone[param] = this[param]
    }
  }
  return clone
};
Record.prototype.populate = function(data) {
};
Record.prototype.serialize = function() {
};
tuna.model.Record = Record;
var RecordFactory = function() {
  this.__records = {}
};
RecordFactory.prototype.registerRecord = function(name, record) {
  this.__records[name] = record
};
RecordFactory.prototype.createRecord = function(name) {
  return this.__records[name].clone()
};
tuna.model.recordFactory = new RecordFactory;
var IMethod = function() {
};
IMethod.prototype.call = function(args) {
};
IMethod.prototype.clone = function() {
};
tuna.rest.IMethod = IMethod;
var Method = function(name) {
  tuna.events.EventDispatcher.call(this);
  this._name = name || null
};
tuna.utils.implement(Method, tuna.rest.IMethod);
tuna.utils.extend(Method, tuna.events.EventDispatcher);
Method.prototype.call = function(args) {
};
Method.prototype.clone = function() {
  return new this.constructor(this._name)
};
tuna.rest.Method = Method;
var IMethodFactory = function() {
};
IMethodFactory.prototype.createMethod = function(name) {
};
tuna.rest.IMethodFactory = IMethodFactory;
var MethodFactory = function() {
  this.__methods = {};
  this.__commonFactory = null
};
tuna.utils.implement(MethodFactory, tuna.rest.IMethodFactory);
MethodFactory.prototype.setDefaultFactory = function(factory) {
  this.__commonFactory = factory
};
MethodFactory.prototype.createMethod = function(name) {
  if(this.__methods[name] !== undefined) {
    return this.__methods[name].clone()
  }else {
    if(this.__commonFactory !== null) {
      return this.__commonFactory.createMethod(name)
    }
  }
  return null
};
MethodFactory.prototype.registerMethod = function(name, method) {
  this.__methods[name] = method
};
tuna.rest.methodFactory = new MethodFactory;
tuna.rest.call = function(name, args, callback, recordName) {
  var method = tuna.rest.methodFactory.createMethod(name);
  if(callback !== undefined) {
    var listener = function(event, data) {
      var result = data;
      if(recordName !== undefined) {
        result = tuna.rest.populateRecords(data, recordName)
      }
      callback(result);
      method.removeEventListener("result", listener)
    };
    method.addEventListener("result", listener)
  }
  method.call(args)
};
tuna.rest.populateRecords = function(data, name) {
  if(data !== null) {
    if(data.splice !== undefined) {
      var result = [];
      var i = 0, l = data.length;
      while(i < l) {
        result.push(tuna.rest.__populateRecord(data[i], name));
        i++
      }
      return result
    }else {
      return tuna.rest.__populateRecord(data, name)
    }
  }
  return null
};
tuna.rest.__populateRecord = function(data, name) {
  var record = tuna.model.recordFactory.createRecord(name);
  record.populate(data);
  return record
};
var DataNode = function(value, parent, key) {
  this.__value = value;
  this.__parent = parent || null;
  this.__key = key || null;
  this.__keyNode = null;
  this.__children = {}
};
DataNode.prototype.getParent = function() {
  return this.__parent
};
DataNode.prototype.getKey = function() {
  if(this.__keyNode === null) {
    this.__keyNode = new tuna.tmpl.data.DataNode(this.__key)
  }
  return this.__keyNode
};
DataNode.prototype.getRoot = function() {
  return this.__parent !== null ? this.__parent.getRoot() : this
};
DataNode.prototype.getValue = function() {
  return this.__value
};
DataNode.prototype.growChild = function(key) {
  var result = null;
  if(this.__children[key] !== undefined) {
    result = this.__children[key]
  }else {
    if(this.__value !== null) {
      var keyValue = this.__value[key];
      if(keyValue !== undefined) {
        this.__children[key] = new tuna.tmpl.data.DataNode(keyValue, this, key);
        result = this.__children[key]
      }else {
        this.__children[key] = new tuna.tmpl.data.DataNode(null)
      }
    }
  }
  return result
};
tuna.tmpl.data.DataNode = DataNode;
var PathEvaluator = function() {
  this.__parsedPath = null
};
PathEvaluator.prototype.setPath = function(path) {
  this.__parsedPath = path.split("/")
};
PathEvaluator.prototype.evaluate = function(dataNode) {
  var node = this.__applyNextToken(this.__parsedPath, dataNode, 0);
  if(node !== null) {
    return node
  }
  return new tuna.tmpl.data.DataNode(null)
};
PathEvaluator.prototype.__applyNextToken = function(path, dataNode, index) {
  var token = path[index];
  if(dataNode !== null && token !== undefined) {
    return this.__applyNextToken(path, this.__applyToken(token, dataNode), ++index)
  }
  return dataNode
};
PathEvaluator.prototype.__applyToken = function(token, dataNode) {
  switch(token) {
    case "":
      return dataNode.getRoot();
    case ".":
      return dataNode;
    case "..":
      return dataNode.getParent();
    case "$key":
      return dataNode.getKey()
  }
  return dataNode.growChild(token)
};
tuna.tmpl.data.PathEvaluator = PathEvaluator;
tuna.tmpl.settings.IItemSettings = function() {
};
var SpotSettings = function() {
  this.__class = "";
  this.__path = ""
};
SpotSettings.prototype.setTargetClass = function(className) {
  this.__class = className
};
SpotSettings.prototype.getTargetClass = function() {
  return this.__class
};
SpotSettings.prototype.setDataPath = function(path) {
  this.__path = path
};
SpotSettings.prototype.getDataPath = function() {
  return this.__path
};
tuna.tmpl.settings.SpotSettings = SpotSettings;
var AttributeSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this);
  this.__attributeName = "";
  this.__hasEvent = false
};
tuna.utils.extend(AttributeSettings, tuna.tmpl.settings.SpotSettings);
AttributeSettings.prototype.setEvent = function(hasEvent) {
  this.__hasEvent = hasEvent
};
AttributeSettings.prototype.hasEvent = function() {
  return this.__hasEvent
};
AttributeSettings.prototype.setAttributeName = function(attributeName) {
  this.__attributeName = attributeName
};
AttributeSettings.prototype.getAttributeName = function() {
  return this.__attributeName
};
tuna.tmpl.settings.AttributeSettings = AttributeSettings;
var ConditionSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this);
  this.__actionType = "";
  this.__actionData = "";
  this.__operatorType = "";
  this.__operatorData = ""
};
tuna.utils.extend(ConditionSettings, tuna.tmpl.settings.SpotSettings);
ConditionSettings.prototype.setOperator = function(type, data) {
  this.__operatorType = type;
  this.__operatorData = data
};
ConditionSettings.prototype.getOperatorType = function() {
  return this.__operatorType
};
ConditionSettings.prototype.getOperatorData = function() {
  return this.__operatorData
};
ConditionSettings.prototype.setAction = function(type, data) {
  this.__actionType = type;
  this.__actionData = data
};
ConditionSettings.prototype.getActionType = function() {
  return this.__actionType
};
ConditionSettings.prototype.getActionData = function() {
  return this.__actionData
};
tuna.tmpl.settings.ConditionSettings = ConditionSettings;
var ListSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this);
  this.__keyPath = "";
  this.__itemRendererID = "";
  this.__itemSettings = null
};
tuna.utils.extend(ListSettings, tuna.tmpl.settings.SpotSettings);
ListSettings.prototype.setItemKeyDataPath = function(path) {
  this.__keyPath = path
};
ListSettings.prototype.getItemKeyDataPath = function() {
  return this.__keyPath
};
ListSettings.prototype.setItemRendererID = function(id) {
  this.__itemRendererID = id
};
ListSettings.prototype.getItemRendererID = function() {
  return this.__itemRendererID
};
ListSettings.prototype.setItemSettings = function(settings) {
  this.__itemSettings = settings
};
ListSettings.prototype.getItemSettings = function() {
  return this.__itemSettings
};
tuna.tmpl.settings.ListSettings = ListSettings;
var TemplateSettings = function() {
  this.__spots = [];
  this.__lists = [];
  this.__attributes = [];
  this.__conditions = []
};
TemplateSettings.prototype.addCondition = function(condition) {
  this.__conditions.push(condition)
};
TemplateSettings.prototype.getConditions = function() {
  return this.__conditions
};
TemplateSettings.prototype.addAttribute = function(attr) {
  this.__attributes.push(attr)
};
TemplateSettings.prototype.getAttributes = function() {
  return this.__attributes
};
TemplateSettings.prototype.addList = function(list) {
  this.__lists.push(list)
};
TemplateSettings.prototype.getLists = function() {
  return this.__lists
};
TemplateSettings.prototype.addSpot = function(spot) {
  this.__spots.push(spot)
};
TemplateSettings.prototype.getSpots = function() {
  return this.__spots
};
tuna.tmpl.settings.TemplateSettings = TemplateSettings;
var IMarkupExtractor = function() {
};
IMarkupExtractor.prototype.extract = function(element, settings) {
};
tuna.tmpl.markup.IMarkupExtractor = IMarkupExtractor;
var SpotExtractor = function() {
  this._tagName = "spot";
  this._ns = "tuna:"
};
tuna.utils.implement(SpotExtractor, tuna.tmpl.markup.IMarkupExtractor);
SpotExtractor.prototype.extract = function(element, settings) {
  var tagName = tuna.IS_IE ? this._tagName : this._ns + this._tagName;
  var elements = element.getElementsByTagName(tagName);
  var i = 0, l = elements.length;
  var item = null;
  while(i < l) {
    item = this._createItem();
    this._parseElement(elements.item(i), item);
    this._saveItem(item, settings);
    i++
  }
};
SpotExtractor.prototype._createItem = function() {
  return new tuna.tmpl.settings.SpotSettings
};
SpotExtractor.prototype._parseElement = function(element, item) {
  item.setTargetClass(element.getAttribute(this._ns + "target"));
  item.setDataPath(element.getAttribute(this._ns + "path"))
};
SpotExtractor.prototype._saveItem = function(item, settings) {
  settings.addSpot(item)
};
tuna.tmpl.markup.SpotExtractor = SpotExtractor;
var ListExtractor = function(templateBuilder) {
  tuna.tmpl.markup.SpotExtractor.call(this);
  this._tagName = "list";
  this.__templateBuilder = templateBuilder
};
tuna.utils.extend(ListExtractor, tuna.tmpl.markup.SpotExtractor);
ListExtractor.prototype._createItem = function() {
  return new tuna.tmpl.settings.ListSettings
};
ListExtractor.prototype._parseElement = function(element, item) {
  tuna.tmpl.markup.SpotExtractor.prototype._parseElement.call(this, element, item);
  item.setItemRendererID(element.getAttribute(this._ns + "item-renderer-id"));
  item.setItemKeyDataPath(element.getAttribute(this._ns + "key-path"));
  var templateID = element.getAttribute(this._ns + "item-template-id");
  item.setItemSettings(this.__templateBuilder.buildSettings(templateID))
};
ListExtractor.prototype._saveItem = function(item, settings) {
  settings.addList(item)
};
tuna.tmpl.markup.ListExtractor = ListExtractor;
var AttributeExtractor = function() {
  tuna.tmpl.markup.SpotExtractor.call(this);
  this._tagName = "attr"
};
tuna.utils.extend(AttributeExtractor, tuna.tmpl.markup.SpotExtractor);
AttributeExtractor.prototype._createItem = function() {
  return new tuna.tmpl.settings.AttributeSettings
};
AttributeExtractor.prototype._parseElement = function(element, item) {
  tuna.tmpl.markup.SpotExtractor.prototype._parseElement.call(this, element, item);
  item.setAttributeName(element.getAttribute(this._ns + "name"));
  item.setEvent(element.getAttribute(this._ns + "event") !== null)
};
AttributeExtractor.prototype._saveItem = function(item, settings) {
  settings.addAttribute(item)
};
tuna.tmpl.markup.AttributeExtractor = AttributeExtractor;
var ConditionExtractor = function() {
  tuna.tmpl.markup.SpotExtractor.call(this);
  this._tagName = "if";
  this.__operatorAttrs = ["isset", "eq", "ne"];
  this.__actionAttrs = ["class"]
};
tuna.utils.extend(ConditionExtractor, tuna.tmpl.markup.SpotExtractor);
ConditionExtractor.prototype._createItem = function() {
  return new tuna.tmpl.settings.ConditionSettings
};
ConditionExtractor.prototype._parseElement = function(element, item) {
  tuna.tmpl.markup.SpotExtractor.prototype._parseElement.call(this, element, item);
  this.__extractOperator(element, item);
  this.__extractAction(element, item)
};
ConditionExtractor.prototype.__extractAction = function(element, item) {
  var i = 0, l = this.__actionAttrs.length;
  var attr = null, value = null;
  while(i < l) {
    attr = this.__actionAttrs[i];
    value = element.getAttribute("tuna:" + attr);
    if(value !== null) {
      item.setAction(attr, value);
      break
    }
    i++
  }
};
ConditionExtractor.prototype.__extractOperator = function(element, item) {
  var i = 0, l = this.__operatorAttrs.length;
  var attr = null, value = null;
  while(i < l) {
    attr = this.__operatorAttrs[i];
    value = element.getAttribute("tuna:" + attr);
    if(value !== null) {
      item.setOperator(attr, value);
      break
    }
    i++
  }
};
ConditionExtractor.prototype._saveItem = function(item, settings) {
  settings.addCondition(item)
};
tuna.tmpl.markup.ConditionExtractor = ConditionExtractor;
var MarkupTemplateBuilder = function(doc) {
  this.__doc = doc;
  this.__templatesTable = {};
  this.__extractors = [];
  this.__registerExtractors()
};
MarkupTemplateBuilder.prototype.__registerExtractors = function() {
  this.__extractors.push(new tuna.tmpl.markup.SpotExtractor);
  this.__extractors.push(new tuna.tmpl.markup.AttributeExtractor);
  this.__extractors.push(new tuna.tmpl.markup.ConditionExtractor);
  this.__extractors.push(new tuna.tmpl.markup.ListExtractor(this))
};
MarkupTemplateBuilder.prototype.buildSettings = function(templateID) {
  var template = null;
  if(this.__templatesTable[templateID] !== undefined) {
    template = this.__templatesTable[templateID]
  }else {
    var templateElement = this.__doc.getElementById(templateID);
    if(templateElement !== null) {
      this.__templatesTable[templateID] = template = new tuna.tmpl.settings.TemplateSettings;
      var i = 0, l = this.__extractors.length;
      while(i < l) {
        this.__extractors[i].extract(templateElement, template);
        i++
      }
    }
  }
  return template
};
tuna.tmpl.markup.MarkupTemplateBuilder = MarkupTemplateBuilder;
var IListItemRouter = function() {
};
IListItemRouter.prototype.append = function(element) {
};
tuna.tmpl.units.IListItemRouter = IListItemRouter;
var ListContainerRouter = function(container) {
  this._container = container
};
tuna.utils.implement(ListContainerRouter, tuna.tmpl.units.IListItemRouter);
ListContainerRouter.prototype.append = function(node) {
  this._container.appendChild(node)
};
tuna.tmpl.units.ListContainerRouter = ListContainerRouter;
var CompiledUnit = function(root) {
  this.__rootTemplate = root
};
CompiledUnit.prototype.getRootTemplate = function() {
  return this.__rootTemplate
};
CompiledUnit.prototype.destroy = function() {
};
CompiledUnit.prototype.applyData = function(dataNode) {
};
tuna.tmpl.units.CompiledUnit = CompiledUnit;
var Spot = function(root) {
  tuna.tmpl.units.CompiledUnit.call(this, root);
  this.__pathEvaluator = new tuna.tmpl.data.PathEvaluator;
  this._nodes = []
};
tuna.utils.extend(Spot, tuna.tmpl.units.CompiledUnit);
Spot.prototype.setPath = function(path) {
  this.__pathEvaluator.setPath(path)
};
Spot.prototype.addTargets = function(elements) {
  this._nodes = this._nodes.concat(elements)
};
Spot.prototype.applyData = function(dataNode) {
  var valueNode = this.__pathEvaluator.evaluate(dataNode);
  if(valueNode !== null) {
    this._applyValue(valueNode.getValue())
  }
};
Spot.prototype._applyValue = function(value) {
  if(value === null) {
    value = ""
  }
  var html = value.toString();
  var i = this._nodes.length - 1;
  while(i >= 0) {
    if(this._nodes[i].innerHTML !== html) {
      this._nodes[i].innerHTML = html
    }
    i--
  }
};
tuna.tmpl.units.Spot = Spot;
var Attribute = function(root) {
  tuna.tmpl.units.Spot.call(this, root);
  this.__attributeName = "";
  this.__eventName = "";
  this.__hasEvent = false
};
tuna.utils.extend(Attribute, tuna.tmpl.units.Spot);
Attribute.prototype.setAttributeName = function(attributeName) {
  this.__attributeName = attributeName;
  this.__eventName = attributeName + "-change"
};
Attribute.prototype.setEvent = function(hasEvent) {
  this.__hasEvent = hasEvent
};
Attribute.prototype._applyValue = function(value) {
  if(value !== null) {
    this.__setAttribute(value)
  }else {
    this.__removeAttribute()
  }
  if(this.__hasEvent) {
    var self = this;
    setTimeout(function() {
      self.__dispatchAttribute(value)
    }, 0)
  }
};
Attribute.prototype.__setAttribute = function(value) {
  var i = this._nodes.length - 1;
  while(i >= 0) {
    this._nodes[i].setAttribute(this.__attributeName, value + "");
    i--
  }
};
Attribute.prototype.__removeAttribute = function() {
  var i = this._nodes.length - 1;
  while(i >= 0) {
    this._nodes[i].removeAttribute(this.__attributeName);
    i--
  }
};
Attribute.prototype.__dispatchAttribute = function(value) {
  var i = this._nodes.length - 1;
  while(i >= 0) {
    tuna.dom.dispatchEvent(this._nodes[i], this.__eventName, "" + value);
    i--
  }
};
tuna.tmpl.units.Attribute = Attribute;
var Condition = function(root) {
  tuna.tmpl.units.Spot.call(this, root);
  this.__action = null;
  this.__operator = null
};
tuna.utils.extend(Condition, tuna.tmpl.units.Spot);
Condition.prototype.setAction = function(action) {
  this.__action = action
};
Condition.prototype.setOperator = function(operator) {
  this.__operator = operator
};
Condition.prototype._applyValue = function(value) {
  var testResult = this.__operator.test(value);
  var i = this._nodes.length - 1;
  while(i >= 0) {
    this.__action.apply(this._nodes[i], testResult, value);
    i--
  }
};
tuna.tmpl.units.Condition = Condition;
var List = function(root) {
  tuna.tmpl.units.CompiledUnit.call(this, root);
  this.__templateCompiler = null;
  this.__itemRenderer = null;
  this.__itemSettings = null;
  this.__itemsTable = {};
  this.__pathEvaluator = new tuna.tmpl.data.PathEvaluator;
  this.__keyPathEvaluator = new tuna.tmpl.data.PathEvaluator;
  this.__listNodeRouter = null
};
tuna.utils.extend(List, tuna.tmpl.units.CompiledUnit);
List.prototype.setListNodeRouter = function(router) {
  this.__listNodeRouter = router
};
List.prototype.setPath = function(path) {
  this.__pathEvaluator.setPath(path)
};
List.prototype.setKeyPath = function(path) {
  this.__keyPathEvaluator.setPath(path)
};
List.prototype.setCompiler = function(compiler) {
  this.__templateCompiler = compiler
};
List.prototype.setItemRenderer = function(element) {
  this.__itemRenderer = element
};
List.prototype.setItemSettings = function(settings) {
  this.__itemSettings = settings
};
List.prototype.addItem = function(compiledItem, key) {
  this.__itemsTable[key] = compiledItem
};
List.prototype.applyData = function(dataNode) {
  var sampleNode = this.__pathEvaluator.evaluate(dataNode);
  if(sampleNode !== null) {
    var sample = sampleNode.getValue();
    var oldItemsTable = this.__itemsTable;
    this.__itemsTable = {};
    for(var index in sample) {
      this.__updateItem(sampleNode.growChild(index), oldItemsTable)
    }
    this.__destroyItems(oldItemsTable)
  }else {
    this.__destroyItems(this.__itemsTable)
  }
};
List.prototype.destroy = function() {
  this.__destroyItems(this.__itemsTable)
};
List.prototype.__updateItem = function(itemNode, oldItemsTable) {
  var keyNode = this.__keyPathEvaluator.evaluate(itemNode);
  if(keyNode !== null) {
    var key = keyNode.getValue();
    if(oldItemsTable[key] === undefined) {
      this.addItem(this.__makeNewItem(), key)
    }else {
      this.__itemsTable[key] = oldItemsTable[key];
      delete oldItemsTable[key]
    }
    this.__itemsTable[key].applyData(itemNode)
  }
};
List.prototype.__destroyItems = function(itemsTable) {
  for(var key in itemsTable) {
    itemsTable[key].destroy();
    delete itemsTable[key]
  }
};
List.prototype.__makeNewItem = function() {
  var itemElement = this.__itemRenderer.cloneNode(true);
  var rootTemplate = this.getRootTemplate();
  var template = this.__templateCompiler.compileTemplate(this.__itemSettings, itemElement, rootTemplate);
  this.__listNodeRouter.append(itemElement);
  rootTemplate.registerChildCreation(itemElement);
  return template
};
tuna.tmpl.units.List = List;
var Template = function(root) {
  tuna.tmpl.units.CompiledUnit.call(this, root || this);
  this.__items = [];
  this.__createdChildren = [];
  this.__removedChildren = [];
  this.__target = null
};
tuna.utils.extend(Template, tuna.tmpl.units.CompiledUnit);
Template.prototype.setTarget = function(element) {
  this.__target = element
};
Template.prototype.addItems = function(items) {
  this.__items = this.__items.concat(items)
};
Template.prototype.registerChildCreation = function(child) {
  this.__createdChildren.push(child)
};
Template.prototype.fetchCreatedChildren = function() {
  return this.__createdChildren.splice(0, this.__createdChildren.length)
};
Template.prototype.registerChildRemoval = function(child) {
  this.__removedChildren.push(child)
};
Template.prototype.fetchRemovedChildren = function() {
  return this.__removedChildren.splice(0, this.__removedChildren.length)
};
Template.prototype.applyData = function(dataNode) {
  var i = this.__items.length - 1;
  while(i >= 0) {
    this.__items[i].applyData(dataNode);
    i--
  }
};
Template.prototype.destroy = function() {
  var i = this.__items.length - 1;
  while(i >= 0) {
    this.__items[i].destroy();
    i--
  }
  this.__target.parentNode.removeChild(this.__target);
  this.getRootTemplate().registerChildRemoval(this.__target)
};
tuna.tmpl.units.Template = Template;
var IItemCompiler = function() {
};
IItemCompiler.prototype.compile = function(element, settings, template) {
};
tuna.tmpl.compilers.IItemCompiler = IItemCompiler;
var TemplateCompiler = function(doc) {
  this.__doc = doc;
  this.__itemCompilers = [];
  this.__registerItemCompilers()
};
TemplateCompiler.prototype.__registerItemCompilers = function() {
  this.__itemCompilers.push(new tuna.tmpl.compilers.SpotCompiler);
  this.__itemCompilers.push(new tuna.tmpl.compilers.AttributeCompiler);
  this.__itemCompilers.push(new tuna.tmpl.compilers.ConditionCompiler);
  this.__itemCompilers.push(new tuna.tmpl.compilers.ListCompiler(this.__doc, this))
};
TemplateCompiler.prototype.compileTemplate = function(settings, element, root) {
  var template = new tuna.tmpl.units.Template(root);
  template.setTarget(element);
  var i = 0, l = this.__itemCompilers.length;
  while(i < l) {
    this.__itemCompilers[i].compile(element, settings, template);
    i++
  }
  return template
};
tuna.tmpl.compilers.TemplateCompiler = TemplateCompiler;
var SpotCompiler = function() {
};
tuna.utils.implement(SpotCompiler, tuna.tmpl.compilers.IItemCompiler);
SpotCompiler.prototype.compile = function(element, settings, template) {
  var root = template.getRootTemplate();
  var item = null;
  var itemsSettings = this._getItemsSettings(settings);
  var i = itemsSettings.length - 1;
  while(i >= 0) {
    item = this._createItem(root);
    this._compileItem(element, itemsSettings[i], item);
    template.addItems(item);
    i--
  }
};
SpotCompiler.prototype._getItemsSettings = function(settings) {
  return settings.getSpots()
};
SpotCompiler.prototype._createItem = function(rootTemplate) {
  return new tuna.tmpl.units.Spot(rootTemplate)
};
SpotCompiler.prototype._compileItem = function(element, settings, item) {
  item.setPath(settings.getDataPath());
  var className = settings.getTargetClass();
  if(tuna.dom.hasClass(element, className)) {
    item.addTargets(element)
  }else {
    item.addTargets(tuna.dom.select("." + className, element))
  }
};
tuna.tmpl.compilers.SpotCompiler = SpotCompiler;
var AttributeCompiler = function() {
  tuna.tmpl.compilers.SpotCompiler.call(this)
};
tuna.utils.extend(AttributeCompiler, tuna.tmpl.compilers.SpotCompiler);
AttributeCompiler.prototype._getItemsSettings = function(settings) {
  return settings.getAttributes()
};
AttributeCompiler.prototype._createItem = function(rootTemplate) {
  return new tuna.tmpl.units.Attribute(rootTemplate)
};
AttributeCompiler.prototype._compileItem = function(element, settings, item) {
  tuna.tmpl.compilers.SpotCompiler.prototype._compileItem.call(this, element, settings, item);
  item.setAttributeName(settings.getAttributeName());
  item.setEvent(settings.hasEvent())
};
tuna.tmpl.compilers.AttributeCompiler = AttributeCompiler;
var ConditionCompiler = function() {
  tuna.tmpl.compilers.SpotCompiler.call(this)
};
tuna.utils.extend(ConditionCompiler, tuna.tmpl.compilers.SpotCompiler);
ConditionCompiler.prototype._getItemsSettings = function(settings) {
  return settings.getConditions()
};
ConditionCompiler.prototype._createItem = function(rootTemplate) {
  return new tuna.tmpl.units.Condition(rootTemplate)
};
ConditionCompiler.prototype._compileItem = function(element, settings, item) {
  tuna.tmpl.compilers.SpotCompiler.prototype._compileItem.call(this, element, settings, item);
  var action = this.__createAction(settings.getActionType(), settings.getActionData());
  item.setAction(action);
  var operator = this.__createOperator(settings.getOperatorType(), settings.getOperatorData());
  item.setOperator(operator)
};
ConditionCompiler.prototype.__createAction = function(type, data) {
  switch(type) {
    case "class":
      return new __ClassAction(data)
  }
  return null
};
ConditionCompiler.prototype.__createOperator = function(type, data) {
  switch(type) {
    case "isset":
      return new __IsSetOperator;
    case "eq":
      return new __EqualsOperator(data);
    case "ne":
      return new __NotEqualsOperator(data)
  }
  return null
};
tuna.tmpl.compilers.ConditionCompiler = ConditionCompiler;
var __ConditionOperator = function(data) {
  this._data = data || ""
};
__ConditionOperator.prototype.test = function(value) {
};
var __IsSetOperator = function() {
  __ConditionOperator.call(this)
};
tuna.utils.extend(__IsSetOperator, __ConditionOperator);
__IsSetOperator.prototype.test = function(value) {
  return value !== undefined
};
var __EqualsOperator = function(data) {
  __ConditionOperator.call(this, data)
};
tuna.utils.extend(__EqualsOperator, __ConditionOperator);
__EqualsOperator.prototype.test = function(value) {
  return value === this._data || value + "" === this._data
};
var __NotEqualsOperator = function(data) {
  __ConditionOperator.call(this, data)
};
tuna.utils.extend(__NotEqualsOperator, __ConditionOperator);
__NotEqualsOperator.prototype.test = function(value) {
  return!(value == this._data || value + "" == this._data)
};
var __ConditionAction = function(data) {
  this._data = data || ""
};
__ConditionAction.prototype.apply = function(element, testResult, value) {
};
var __ClassAction = function(data) {
  __ConditionAction.call(this, data);
  this.__lastName = null
};
tuna.utils.extend(__ClassAction, __ConditionAction);
__ClassAction.prototype.apply = function(element, testResult, value) {
  var className = this._data;
  if(className !== "") {
    if(testResult) {
      tuna.dom.addClass(element, className)
    }else {
      tuna.dom.removeClass(element, className)
    }
  }else {
    if(this.__lastName !== value && testResult) {
      if(this.__lastName !== null) {
        tuna.dom.removeClass(element, this.__lastName + "")
      }
      tuna.dom.addClass(element, value + "");
      this.__lastName = value
    }
  }
};
var ListCompiler = function(doc, compiler) {
  this.__doc = doc;
  this.__templateCompiler = compiler
};
tuna.utils.implement(ListCompiler, tuna.tmpl.compilers.IItemCompiler);
ListCompiler.prototype.compile = function(element, settings, template) {
  var itemsSettings = settings.getLists();
  var i = itemsSettings.length - 1;
  while(i >= 0) {
    this.__compileLists(element, itemsSettings[i], template);
    i--
  }
};
ListCompiler.prototype.__compileLists = function(element, settings, template) {
  var root = template.getRootTemplate();
  var lists = [];
  var className = settings.getTargetClass();
  if(tuna.dom.hasClass(element, className)) {
    lists.push(this.__createList(element, settings, root))
  }else {
    var elements = tuna.dom.select("." + className, element);
    var i = elements.length - 1;
    while(i >= 0) {
      if(tuna.dom.getParentWithClass(elements[i], className, element) === null) {
        lists.push(this.__createList(elements[i], settings, root))
      }
      i--
    }
  }
  template.addItems(lists)
};
ListCompiler.prototype.__createList = function(element, settings, root) {
  var list = new tuna.tmpl.units.List(root);
  list.setCompiler(this.__templateCompiler);
  var renderer = this.__doc.getElementById(settings.getItemRendererID());
  renderer = renderer.cloneNode(true);
  renderer.removeAttribute("id");
  list.setItemRenderer(renderer);
  list.setItemSettings(settings.getItemSettings());
  list.setKeyPath(settings.getItemKeyDataPath());
  list.setPath(settings.getDataPath());
  list.setListNodeRouter(new tuna.tmpl.units.ListContainerRouter(element));
  return list
};
tuna.tmpl.compilers.ListCompiler = ListCompiler;
tuna.tmpl.__markupBuilder = new tuna.tmpl.markup.MarkupTemplateBuilder(document);
tuna.tmpl.__settingsTable = {};
tuna.tmpl.getTemplateSettingsById = function(id) {
  if(id !== null) {
    if(tuna.tmpl.__settingsTable[id] === undefined) {
      tuna.tmpl.__settingsTable[id] = tuna.tmpl.__markupBuilder.buildSettings(id)
    }
    return tuna.tmpl.__settingsTable[id]
  }
  return null
};
tuna.tmpl.__compiler = new tuna.tmpl.compilers.TemplateCompiler(document);
tuna.tmpl.compile = function(element, settings) {
  return tuna.tmpl.__compiler.compileTemplate(settings, element, null)
};
var Module = function(selector) {
  this._selector = selector
};
Module.prototype.getSelector = function() {
  return this._selector
};
Module.prototype.init = function(context, container, options) {
  var instances = [];
  var targets = this._findTargets(context);
  var i = 0, l = targets.length;
  var instance = null;
  while(i < l) {
    if(this.__isInContext(targets[i], context)) {
      instance = this.initInstance(targets[i], container, options);
      instance.init && instance.init();
      instances.push(instance)
    }
    i++
  }
  return instances
};
Module.prototype._findTargets = function(context) {
  var targets = tuna.dom.select(this._selector, context);
  targets = targets.concat(tuna.dom.filter(this._selector, [context]));
  return targets
};
Module.prototype.__isInContext = function(target, context) {
  var result = true;
  var isolators = tuna.ui.modules.getIsolators();
  var i = 0, l = isolators.length;
  while(i < l) {
    result = result && tuna.dom.getParentMatches(target, isolators[i], context) === null;
    if(!result) {
      break
    }
    i++
  }
  return result
};
Module.prototype.destroy = function(instances) {
  var i = 0, l = instances.length;
  while(i < l) {
    this.destroyInstance(instances[i]);
    i++
  }
};
Module.prototype.initInstance = function(target, container, options) {
};
Module.prototype.destroyInstance = function(instance) {
};
tuna.ui.Module = Module;
var ModuleInstance = function(target) {
  tuna.events.EventDispatcher.call(this);
  this._target = target;
  this.__defaultOptions = {}
};
tuna.utils.extend(ModuleInstance, tuna.events.EventDispatcher);
ModuleInstance.prototype.getTarget = function() {
  return this._target
};
ModuleInstance.prototype.getName = function() {
  return this._target.getAttribute("data-name")
};
ModuleInstance.prototype._setDefaultOption = function(name, option) {
  this.__defaultOptions[name] = option
};
ModuleInstance.prototype.setOption = function(name, option) {
  if(option) {
    this._target.setAttribute("data-" + name, option)
  }else {
    this._target.removeAttribute("data-" + name)
  }
};
ModuleInstance.prototype.getOption = function(name) {
  var option = this._target.getAttribute("data-" + name);
  if(option === null && this.__defaultOptions[name] !== undefined) {
    option = this.__defaultOptions[name]
  }
  return option
};
ModuleInstance.prototype.getOptions = function() {
  return tuna.dom.getAttributesData(this._target)
};
ModuleInstance.prototype.init = function() {
};
ModuleInstance.prototype.destroy = function() {
};
tuna.ui.ModuleInstance = ModuleInstance;
tuna.ui.modules.__typeTable = {};
tuna.ui.modules.__isolators = [];
tuna.ui.modules.register = function(type, module, isIsolator) {
  tuna.ui.modules.__typeTable[type] = module;
  if(isIsolator) {
    tuna.ui.modules.__isolators.push(module.getSelector())
  }
};
tuna.ui.modules.getModule = function(type) {
  if(tuna.ui.modules.__typeTable[type] !== undefined) {
    return tuna.ui.modules.__typeTable[type]
  }
  return null
};
tuna.ui.modules.getIsolators = function() {
  return tuna.ui.modules.__isolators
};
var Container = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__moduleArgs = {};
  this.__moduleInstances = {}
};
tuna.utils.extend(Container, tuna.ui.ModuleInstance);
Container.prototype.getName = function() {
  return this._target.id
};
Container.prototype.render = function(element) {
  if(element !== undefined) {
    this.clear();
    this._target.appendChild(element)
  }
};
Container.prototype.clear = function() {
  this._target.innerHTML = ""
};
Container.prototype.requireModule = function(type, var_args) {
  var args = tuna.utils.toArray(arguments);
  args.shift();
  if(this.__moduleArgs[type] === undefined) {
    this.__moduleArgs[type] = [null]
  }
  if(args.length > 0) {
    this.__moduleArgs[type].push(args)
  }else {
    this.__moduleArgs[type][0] = []
  }
};
Container.prototype.initModules = function(target) {
  target = target || this._target;
  var module = null;
  var instances = null;
  for(var type in this.__moduleArgs) {
    module = tuna.ui.modules.getModule(type);
    if(module !== null) {
      if(this.__moduleInstances[type] === undefined) {
        this.__moduleInstances[type] = []
      }
      instances = this.__initModule(module, target, this.__moduleArgs[type]);
      this.__moduleInstances[type] = this.__moduleInstances[type].concat(instances)
    }else {
      alert('Unknown module "' + type + '"')
    }
  }
};
Container.prototype.getModuleInstances = function(type) {
  if(this.__moduleInstances[type] !== undefined) {
    return this.__moduleInstances[type]
  }
  return null
};
Container.prototype.getOneModuleInstance = function(type) {
  if(this.__moduleInstances[type] !== undefined && this.__moduleInstances[type][0] !== undefined) {
    return this.__moduleInstances[type][0]
  }
  return null
};
Container.prototype.getModuleInstanceByName = function(type, name) {
  if(this.__moduleInstances[type] !== undefined) {
    var instances = this.__moduleInstances[type];
    var i = 0, l = instances.length;
    while(i < l) {
      if(instances[i].getName() === name) {
        return instances[i]
      }
      i++
    }
  }
  return null
};
Container.prototype.destroyModules = function() {
  for(var name in this.__moduleInstances) {
    tuna.ui.modules.getModule(name).destroy(this.__moduleInstances[name]);
    this.__moduleInstances[name].length = 0
  }
};
Container.prototype.__initModule = function(module, target, moduleArgs) {
  var result = [];
  var commonArgs = [target, this];
  var i = moduleArgs.length - 1;
  while(i >= 0) {
    if(moduleArgs[i] !== null) {
      result = result.concat(module.init.apply(module, commonArgs.concat(moduleArgs[i])))
    }
    i--
  }
  return result
};
tuna.ui.containers.Container = Container;
var ControlContainer = function(target) {
  tuna.ui.containers.Container.call(this, target);
  this.__controller = null;
  this._setDefaultOption("init-event", null)
};
tuna.utils.extend(ControlContainer, tuna.ui.containers.Container);
ControlContainer.prototype.render = function(element) {
  tuna.ui.containers.Container.prototype.render.call(this, element);
  if(this.__controller !== null) {
    this.__controller.init()
  }
};
ControlContainer.prototype.clear = function() {
  tuna.ui.containers.Container.prototype.clear.call(this);
  if(this.__controller !== null) {
    this.__controller.destroy()
  }
};
ControlContainer.prototype.init = function() {
  if(this.getOption("is-auto-init")) {
    this.initController()
  }
};
ControlContainer.prototype.initController = function() {
  this.__controller = tuna.view.getController(this._target);
  if(this.__controller !== null) {
    this.__controller.setContainer(this);
    this.__controller.bootstrap()
  }else {
    alert("Can't find controller for " + this._target.tagName + "#" + this._target.id)
  }
};
ControlContainer.prototype.getController = function() {
  return this.__controller
};
tuna.ui.containers.ControlContainer = ControlContainer;
var Popup = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__isInit = false
};
tuna.utils.extend(Popup, tuna.ui.ModuleInstance);
Popup.prototype.init = function() {
  if(!this.__isInit) {
    var self = this;
    tuna.dom.addChildEventListener(this._target, ".j-popup-close", "click", function(event) {
      tuna.dom.preventDefault(event);
      self.close()
    });
    tuna.dom.addChildEventListener(this._target, ".j-popup-apply", "click", function(event) {
      tuna.dom.preventDefault(event);
      self.apply()
    })
  }
};
Popup.prototype.isOpen = function() {
  return tuna.dom.hasClass(this._target, "show")
};
Popup.prototype.open = function() {
  if(this.dispatch("popup-open")) {
    this.__show()
  }
};
Popup.prototype.close = function() {
  if(this.dispatch("popup-close")) {
    this.__hide()
  }
};
Popup.prototype.apply = function() {
  if(this.dispatch("popup-apply", this.__collectData())) {
    this.__hide()
  }
};
Popup.prototype.__hide = function() {
  tuna.dom.removeClass(this._target, "show")
};
Popup.prototype.__show = function() {
  tuna.dom.addClass(this._target, "show")
};
Popup.prototype.__collectData = function() {
  var form = tuna.dom.selectOne("form.j-popup-form", this._target);
  if(form !== null) {
    return tuna.ui.forms.Form.serialize(form)
  }
  return null
};
tuna.ui.popups.Popup = Popup;
tuna.ui.popups.__idTable = {};
tuna.ui.popups.__lastId = 0;
tuna.ui.popups.create = function(target) {
  if(target.id === "") {
    target.id = "popup_" + tuna.ui.popups.__lastId++
  }
  if(tuna.ui.popups.__idTable[target.id] === undefined) {
    var popup = new tuna.ui.popups.Popup(target);
    popup.init();
    tuna.ui.popups.__idTable[target.id] = popup
  }
  return tuna.ui.popups.__idTable[target.id]
};
tuna.ui.popups.__alert = null;
tuna.ui.popups.__alertMessage = null;
tuna.ui.popups.registerAlert = function(target) {
  tuna.ui.popups.__alert = tuna.ui.popups.create(target);
  tuna.ui.popups.__alert.init();
  tuna.ui.popups.__alertMessage = tuna.dom.selectOne(".j-message", target)
};
tuna.ui.popups.alert = function(message) {
  tuna.ui.popups.__alertMessage.innerHTML = message;
  tuna.ui.popups.__alert.open()
};
tuna.ui.popups.__confirm = null;
tuna.ui.popups.__confirmMessage = null;
tuna.ui.popups.registerConfirm = function(target) {
  tuna.ui.popups.__confirm = tuna.ui.popups.create(target);
  tuna.ui.popups.__confirm.init();
  tuna.ui.popups.__confirmMessage = tuna.dom.selectOne(".j-message", target)
};
tuna.ui.popups.confirm = function(message, callback) {
  tuna.ui.popups.__confirmMessage.innerHTML = message;
  var okHandler = function(event) {
    callback && callback(true);
    tuna.ui.popups.__confirm.removeEventListener("popup-apply", okHandler);
    tuna.ui.popups.__confirm.removeEventListener("popup-close", cancelHandler)
  };
  var cancelHandler = function(event) {
    callback && callback(false);
    tuna.ui.popups.__confirm.removeEventListener("popup-apply", okHandler);
    tuna.ui.popups.__confirm.removeEventListener("popup-close", cancelHandler)
  };
  tuna.ui.popups.__confirm.addEventListener("popup-apply", okHandler);
  tuna.ui.popups.__confirm.addEventListener("popup-close", cancelHandler);
  tuna.ui.popups.__confirm.open()
};
var Button = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__isInit = false
};
tuna.utils.extend(Button, tuna.ui.ModuleInstance);
Button.prototype.init = function() {
  if(!this.__isInit) {
    this.__isInit = true
  }
};
Button.prototype.setEnabled = function(isEnabled) {
  tuna.dom.setClassExist(this._target, "disabled", !isEnabled)
};
Button.prototype.setActive = function(isActive) {
  tuna.dom.setClassExist(this._target, "active", isActive)
};
tuna.ui.buttons.Button = Button;
var ButtonGroup = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__defaultAction = null;
  this._setDefaultOption("button-selector", ".j-button")
};
tuna.utils.extend(ButtonGroup, tuna.ui.ModuleInstance);
ButtonGroup.prototype.setDefaultAction = function(action) {
  this.__defaultAction = action
};
ButtonGroup.prototype.init = function() {
  var self = this;
  var buttonSelector = this.getOption("button-selector");
  if(buttonSelector !== null) {
    tuna.dom.addChildEventListener(this._target, buttonSelector, "click", function(event) {
      tuna.dom.preventDefault(event);
      var button = tuna.ui.buttons.create(this);
      var action = button.getOption("action");
      if(action === null) {
        action = self.__defaultAction
      }
      if(action !== null) {
        if(!self.dispatch(action, button)) {
          tuna.dom.stopPropagation(event)
        }
      }
    })
  }
};
tuna.ui.buttons.ButtonGroup = ButtonGroup;
tuna.ui.buttons.__idTable = {};
tuna.ui.buttons.__lastId = 0;
tuna.ui.buttons.create = function(target) {
  if(target.id === "") {
    target.id = "button_" + tuna.ui.buttons.__lastId++
  }
  if(tuna.ui.buttons.__idTable[target.id] === undefined) {
    var button = new tuna.ui.buttons.Button(target);
    button.init();
    tuna.ui.buttons.__idTable[target.id] = button
  }
  return tuna.ui.buttons.__idTable[target.id]
};
var Form = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__formMessage = null;
  this.__inputTable = {};
  this.__callbackName = Form.CALLBACK_PREFIX + (Math.random() + "").substr(2);
  this.__recordName = null
};
tuna.utils.extend(Form, tuna.ui.ModuleInstance);
Form.CALLBACK_PREFIX = "form_callback";
Form.prototype.init = function() {
  this.__recordName = this.getOption("record-type");
  this.__formMessage = tuna.dom.selectOne(".j-form-message", this._target);
  var self = this;
  tuna.dom.addEventListener(this._target, "submit", function(event) {
    self.__prepareToSubmit(event)
  });
  tuna.dom.addEventListener(this._target, "change", function() {
    self.dispatch("change")
  });
  tuna.dom.addEventListener(this._target, "reset", function(event) {
    self.__prepareToReset(event)
  });
  var callbackInput = document.createElement("input");
  callbackInput.type = "hidden";
  callbackInput.name = "__callback";
  callbackInput.value = this.__callbackName;
  this._target.appendChild(callbackInput)
};
Form.prototype.getValue = function(name) {
  var data = Form.serialize(this._target);
  if(data[name] !== undefined) {
    return data[name]
  }
  return null
};
Form.prototype.submit = function() {
  this.__prepareToSubmit();
  this._target.submit()
};
Form.prototype.reset = function() {
  this.__prepareToReset();
  this._target.reset()
};
Form.prototype.__prepareToSubmit = function(event) {
  if(this.dispatch("submit")) {
    this.__clearMessage();
    this.__clearInputs();
    this.__registerCallback()
  }else {
    if(event !== undefined) {
      tuna.dom.preventDefault(event)
    }
  }
};
Form.prototype.__prepareToReset = function(event) {
  if(this.dispatch("reset")) {
    this.__clearMessage();
    this.__clearInputs()
  }else {
    if(event !== undefined) {
      tuna.dom.preventDefault(event)
    }
  }
};
Form.prototype.__registerCallback = function() {
  var self = this;
  window[this.__callbackName] = function(response) {
    self.__handleResponse(response);
    delete window[self.__callbackName]
  }
};
Form.prototype.__handleResponse = function(data) {
  var response = data["response"];
  var errors = data["errors"];
  if(response !== undefined) {
    if(this.__recordName !== null) {
      response = tuna.rest.populateRecords(response, this.__recordName)
    }
    this.dispatch("result", response)
  }else {
    if(errors !== undefined) {
      this.__showErrors(errors);
      this.dispatch("error", errors)
    }
  }
};
Form.prototype.__showErrors = function(errors) {
  var i = 0, l = errors.length;
  var error = null;
  while(i < l) {
    error = errors[i];
    if(error["param"] !== undefined) {
      this.__showInputError(error["param"], error["message"])
    }else {
      this.__showErrorMessage(error["message"])
    }
    i++
  }
};
Form.prototype.__getFormInput = function(name) {
  var result = null;
  if(this.__inputTable[name] === undefined) {
    var inputWrapper = tuna.dom.selectOne(".j-" + name + "-input", this._target);
    if(inputWrapper !== null) {
      var input = new tuna.ui.forms.FormInput(inputWrapper);
      input.init();
      this.__inputTable[name] = input
    }
  }
  if(this.__inputTable[name] !== undefined) {
    result = this.__inputTable[name]
  }
  return result
};
Form.prototype.__clearMessage = function() {
  if(this.__formMessage !== null) {
    this.__formMessage.innerHTML = "";
    tuna.dom.addClass(this.__formMessage, "hide")
  }
};
Form.prototype.__showErrorMessage = function(message) {
  if(this.__formMessage !== null) {
    this.__formMessage.innerHTML += message + "<br />";
    tuna.dom.removeClass(this.__formMessage, "hide")
  }
};
Form.prototype.__showInputError = function(name, message) {
  var formInput = this.__getFormInput(name);
  if(formInput !== null) {
    formInput.showErrorMessage(message)
  }else {
    this.__showErrorMessage(message)
  }
};
Form.prototype.__clearInputs = function() {
  for(var name in this.__inputTable) {
    this.__inputTable[name].cleanup()
  }
};
Form.serialize = function(formElement) {
  var result = {};
  var elements = formElement.elements;
  var i = 0, l = elements.length;
  var name = null;
  while(i < l) {
    name = elements[i].name;
    if(result[name] !== undefined) {
      if(!(result[name] instanceof Array)) {
        result[name] = [result[name]]
      }
      result[name].push(elements[i].value)
    }else {
      result[name] = elements[i].value
    }
    i++
  }
  return result
};
tuna.ui.forms.Form = Form;
var FormInput = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__message = null;
  this.__defaultMessage = ""
};
tuna.utils.extend(FormInput, tuna.ui.ModuleInstance);
FormInput.prototype.init = function() {
  this.__message = tuna.dom.selectOne(".j-message", this._target);
  if(this.__message !== null) {
    this.__defaultMessage = this.__message.innerHTML
  }
};
FormInput.prototype.showErrorMessage = function(message) {
  tuna.dom.addClass(this._target, "error");
  if(this.__message !== null) {
    this.__message.innerHTML = message
  }
};
FormInput.prototype.cleanup = function() {
  tuna.dom.removeClass(this._target, "error");
  if(this.__message !== null) {
    this.__message.innerHTML = this.__defaultMessage
  }
};
tuna.ui.forms.FormInput = FormInput;
var ITransformHandler = function() {
};
ITransformHandler.prototype.handleTransformStart = function(target) {
};
ITransformHandler.prototype.handleTransformComplete = function(target, createdElements, removedElements) {
};
ITransformHandler.prototype.handleDestroy = function(target, removedElements) {
};
tuna.ui.transformers.ITransformHandler = ITransformHandler;
var ITransformer = function() {
};
ITransformer.prototype.applyTransform = function(data) {
};
ITransformer.prototype.setTransformHandler = function(handler) {
};
tuna.ui.transformers.ITransformer = ITransformer;
var TemplateTransformer = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__template = null;
  this.__transformHandler = null
};
tuna.utils.extend(TemplateTransformer, tuna.ui.ModuleInstance);
tuna.utils.implement(TemplateTransformer, tuna.ui.transformers.ITransformer);
TemplateTransformer.prototype.init = function() {
  var templateId = this.getOption("template-id");
  var settings = tuna.tmpl.getTemplateSettingsById(templateId);
  if(settings !== null) {
    this.__template = tuna.tmpl.compile(this._target, settings)
  }else {
    alert("Unknown template " + templateId)
  }
};
TemplateTransformer.prototype.setTransformHandler = function(handler) {
  this.__transformHandler = handler
};
TemplateTransformer.prototype.applyTransform = function(data) {
  if(this.__transformHandler !== null) {
    this.__transformHandler.handleTransformStart(this._target)
  }
  this.__template.applyData(new tuna.tmpl.data.DataNode(data));
  if(this.__transformHandler !== null) {
    this.__transformHandler.handleTransformComplete(this._target, this.__template.fetchCreatedChildren(), this.__template.fetchRemovedChildren())
  }
};
TemplateTransformer.prototype.destroy = function() {
  this.__template.destroy();
  if(this.__transformHandler !== null) {
    this.__transformHandler.handleDestroy(this._target, this.__template.fetchRemovedChildren())
  }
  this.__template = null;
  this.__transformHandler = null
};
tuna.ui.transformers.TemplateTransformer = TemplateTransformer;
var ISelectionGroup = function() {
};
ISelectionGroup.prototype.getSelectedIndexes = function() {
};
ISelectionGroup.prototype.selectIndex = function(index) {
};
ISelectionGroup.prototype.isSelected = function(index) {
};
ISelectionGroup.prototype.clearSelection = function() {
};
ISelectionGroup.prototype.setIndexEnabled = function(index, isEnabled) {
};
ISelectionGroup.prototype.isIndexEnabled = function(index) {
};
ISelectionGroup.prototype.getItemIndex = function(item) {
};
ISelectionGroup.prototype.getItemAt = function(index) {
};
ISelectionGroup.prototype.mapItems = function(callback) {
};
ISelectionGroup.prototype.updateView = function() {
};
tuna.ui.selection.ISelectionGroup = ISelectionGroup;
var AbstractSelectionGroup = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this._itemsCollection = null;
  this._selectionView = null;
  this._selectionRule = null;
  this._disabledIndexes = []
};
tuna.utils.implement(AbstractSelectionGroup, tuna.ui.selection.ISelectionGroup);
tuna.utils.extend(AbstractSelectionGroup, tuna.ui.ModuleInstance);
AbstractSelectionGroup.prototype.setIndexEnabled = function(index, isEnabled) {
  var indexPosition = tuna.utils.indexOf(index, this._disabledIndexes);
  if(isEnabled) {
    if(indexPosition !== -1) {
      this._selectionView.enableItemAt(index);
      this._disabledIndexes.splice(indexPosition, 1)
    }
  }else {
    if(indexPosition === -1) {
      this._selectionView.disableItemAt([index]);
      this._disabledIndexes.push(index)
    }
  }
};
AbstractSelectionGroup.prototype.isIndexEnabled = function(index) {
  return this._itemsCollection.getItemAt(index) !== null && tuna.utils.indexOf(index, this._disabledIndexes) === -1
};
AbstractSelectionGroup.prototype.updateView = function() {
  this._selectionView.update()
};
AbstractSelectionGroup.prototype.getItemIndex = function(item) {
  return this._itemsCollection.getItemIndex(item)
};
AbstractSelectionGroup.prototype.getItemAt = function(index) {
  return this._itemsCollection.getItemAt(index)
};
AbstractSelectionGroup.prototype.mapItems = function(callback) {
  this._itemsCollection.mapItems(callback)
};
AbstractSelectionGroup.prototype.getSelectedIndexes = function() {
  return this._selectionRule.getSelectedIndexes()
};
AbstractSelectionGroup.prototype.getLastSelectedIndex = function() {
  var indexes = this._selectionRule.getSelectedIndexes();
  if(indexes.length > 0) {
    return indexes.pop()
  }
  return null
};
AbstractSelectionGroup.prototype.selectIndex = function(index) {
  return this._selectionRule.selectIndex(index)
};
AbstractSelectionGroup.prototype.isSelected = function(index) {
  return this._selectionRule.isSelected(index)
};
AbstractSelectionGroup.prototype.clearSelection = function() {
  this._selectionRule.clearSelection()
};
tuna.ui.selection.AbstractSelectionGroup = AbstractSelectionGroup;
var SelectionGroup = function(target, indexAttribute) {
  tuna.ui.selection.AbstractSelectionGroup.call(this, target);
  this._setDefaultOption("item-selector", ".j-selection-item");
  this._setDefaultOption("index-attribute", indexAttribute);
  this._setDefaultOption("is-multiple", null);
  this._setDefaultOption("selection-class", "active");
  this._setDefaultOption("selection-event", "click")
};
tuna.utils.extend(SelectionGroup, tuna.ui.selection.AbstractSelectionGroup);
SelectionGroup.prototype.init = function() {
  var indexAttribute = this.getOption("index-attribute");
  this._itemsCollection = indexAttribute === null ? new tuna.ui.selection.items.ElementsCollection : new tuna.ui.selection.items.NamedElementsCollection(indexAttribute);
  this._selectionView = new tuna.ui.selection.view.ClassSelectionView(this._target);
  this._selectionRule = this.getOption("is-multiple") ? new tuna.ui.selection.rule.MultipleSelectionRule : new tuna.ui.selection.rule.SingleSelectionRule;
  this._selectionView.setSelectionClass(this.getOption("selection-class"));
  this._selectionView.setItemSelector(this.getOption("item-selector"));
  this._selectionView.setSelectionGroup(this);
  this._selectionView.setItemsCollection(this._itemsCollection);
  this._selectionRule.setSelectionGroup(this);
  this._selectionRule.setEventDispatcher(this);
  this._selectionRule.setSelectionView(this._selectionView);
  this._selectionView.update()
};
tuna.ui.selection.SelectionGroup = SelectionGroup;
var Navigation = function(target) {
  tuna.ui.selection.SelectionGroup.call(this, target, "id");
  this.__openData = null;
  this.__history = [];
  this.__controls = null;
  this.__menuLinks = {};
  this.setOption("is-multiple", null);
  this._setDefaultOption("item-selector", ".j-navigation-page");
  this._setDefaultOption("menu-selector", ".j-navigation-menu")
};
tuna.utils.extend(Navigation, tuna.ui.selection.SelectionGroup);
Navigation.prototype.init = function() {
  tuna.ui.selection.SelectionGroup.prototype.init.call(this);
  var self = this;
  this.addEventListener("deselected", function(event, index) {
    self.__updateMenu(index, false);
    self.dispatch("close")
  });
  this.addEventListener("selected", function(event, index) {
    self.__updateMenu(index, true);
    self.dispatch("open", self.__openData)
  });
  this.__controls = new tuna.ui.buttons.ButtonGroup(this._target);
  this.__controls.setOption("button-selector", ".j-navigation-link");
  this.__controls.setDefaultAction("navigate");
  this.__controls.addEventListener("navigate", function(event, button) {
    var index = button.getOption("href");
    if(index !== null) {
      if(self.navigate(index, button.getOptions())) {
        event.preventDefault()
      }
    }
  });
  this.__controls.addEventListener("back", function(event, button) {
    self.back()
  });
  this.__controls.init();
  this.__initMenu()
};
Navigation.prototype.__initMenu = function() {
  var menuSelector = this.getOption("menu-selector");
  var buttonSelector = this.getOption("button-selector");
  if(menuSelector !== null && buttonSelector !== null) {
    var menu = tuna.dom.selectOne(menuSelector, this._target);
    var buttons = tuna.dom.select(buttonSelector, menu);
    var i = 0, l = buttons.length;
    var href = null;
    var button = null;
    while(i < l) {
      button = tuna.ui.buttons.create(buttons[i]);
      href = button.getOption("href");
      if(href !== null) {
        if(this.__menuLinks[href] === undefined) {
          this.__menuLinks[href] = []
        }
        this.__menuLinks[href].push(button)
      }
      i++
    }
  }
  var index = this.getLastSelectedIndex();
  if(index !== null) {
    this.__updateMenu(index, true)
  }
};
Navigation.prototype.__updateMenu = function(index, isSelected) {
  var buttons = this.__menuLinks[index];
  if(buttons !== undefined) {
    var i = 0, l = buttons.length;
    while(i < l) {
      buttons[i].setActive(isSelected);
      i++
    }
  }
};
Navigation.prototype.navigate = function(index, data) {
  var currentIndex = this.getLastSelectedIndex();
  if(currentIndex !== null) {
    this.__history.push(currentIndex)
  }
  this.__openData = data || null;
  var result = this.selectIndex(index);
  this.__openData = null;
  return result
};
Navigation.prototype.back = function() {
  this.selectIndex(this.__history.pop())
};
tuna.ui.selection.Navigation = Navigation;
var IItemsCollection = function() {
};
IItemsCollection.prototype.addItem = function(item) {
};
IItemsCollection.prototype.getItemIndex = function(item) {
};
IItemsCollection.prototype.getItemAt = function(index) {
};
IItemsCollection.prototype.mapItems = function(callback) {
};
IItemsCollection.prototype.clear = function() {
};
IItemsCollection.prototype.getItemsCount = function() {
};
tuna.ui.selection.items.IItemsCollection = IItemsCollection;
var ElementsCollection = function() {
  this.__items = []
};
tuna.utils.implement(ElementsCollection, tuna.ui.selection.items.IItemsCollection);
ElementsCollection.prototype.addItem = function(item) {
  return this.__items.push(item) - 1
};
ElementsCollection.prototype.getItemIndex = function(item) {
  return tuna.utils.indexOf(item, this.__items)
};
ElementsCollection.prototype.getItemAt = function(index) {
  return this.__items[index] || null
};
ElementsCollection.prototype.clear = function() {
  this.__items.length = 0
};
ElementsCollection.prototype.mapItems = function(callback) {
  var i = 0, l = this.__items.length;
  while(i < l) {
    callback(i, this.__items[i]);
    i++
  }
};
ElementsCollection.prototype.getItemsCount = function() {
  return this.__items.length
};
tuna.ui.selection.items.ElementsCollection = ElementsCollection;
var NamedElementsCollection = function(indexAttribute) {
  this.__indexAttribute = indexAttribute;
  this.__items = {}
};
tuna.utils.implement(NamedElementsCollection, tuna.ui.selection.items.IItemsCollection);
NamedElementsCollection.prototype.addItem = function(item) {
  var index = item.getAttribute(this.__indexAttribute);
  if(index !== null) {
    this.__items[index] = item
  }
  return index
};
NamedElementsCollection.prototype.getItemIndex = function(item) {
  var index = item.getAttribute(this.__indexAttribute);
  if(index !== null && this.__items[index] !== undefined) {
    return index
  }
  return null
};
NamedElementsCollection.prototype.getItemAt = function(index) {
  return this.__items[index] || null
};
NamedElementsCollection.prototype.clear = function() {
  this.__items = {}
};
NamedElementsCollection.prototype.mapItems = function(callback) {
  for(var index in this.__items) {
    callback(index, this.__items[index])
  }
};
NamedElementsCollection.prototype.getItemsCount = function() {
  var i = 0;
  for(var index in this.__items) {
    i++
  }
  return i
};
tuna.ui.selection.items.NamedElementsCollection = NamedElementsCollection;
var ISelectionRule = function() {
};
ISelectionRule.prototype.getSelectedIndexes = function() {
};
ISelectionRule.prototype.selectIndex = function(index) {
};
ISelectionRule.prototype.isSelected = function(index) {
};
ISelectionRule.prototype.clearSelection = function() {
};
tuna.ui.selection.rule.ISelectionRule = ISelectionRule;
var AbstractSelectionRule = function() {
  this._selectionGroup = null;
  this._selectionView = null;
  this._eventDispatcher = null
};
tuna.utils.implement(AbstractSelectionRule, tuna.ui.selection.rule.ISelectionRule);
AbstractSelectionRule.prototype.setSelectionGroup = function(group) {
  this._selectionGroup = group
};
AbstractSelectionRule.prototype.setSelectionView = function(view) {
  this._selectionView = view
};
AbstractSelectionRule.prototype.setEventDispatcher = function(dispatcher) {
  this._eventDispatcher = dispatcher
};
AbstractSelectionRule.prototype.getSelectedIndexes = function() {
};
AbstractSelectionRule.prototype.selectIndex = function(index) {
};
AbstractSelectionRule.prototype.isSelected = function(index) {
};
AbstractSelectionRule.prototype.clearSelection = function() {
};
tuna.ui.selection.rule.AbstractSelectionRule = AbstractSelectionRule;
var SingleSelectionRule = function() {
  tuna.ui.selection.rule.AbstractSelectionRule.call(this);
  this.__currentIndex = null
};
tuna.utils.extend(SingleSelectionRule, tuna.ui.selection.rule.AbstractSelectionRule);
SingleSelectionRule.prototype.getSelectedIndexes = function() {
  if(this.__currentIndex !== null) {
    return[this.__currentIndex]
  }
  return[]
};
SingleSelectionRule.prototype.selectIndex = function(index) {
  if(this._selectionGroup.isIndexEnabled(index) && this.__currentIndex !== index && this.__dispatchSelect(index)) {
    var oldIndex = this.__currentIndex;
    if(this.__currentIndex !== null) {
      this._selectionView.destroySelectionAt(this.__currentIndex)
    }
    this._selectionView.applySelectionAt(index);
    this.__currentIndex = index;
    if(oldIndex !== null) {
      this._eventDispatcher.dispatch("deselected", oldIndex)
    }
    this._eventDispatcher.dispatch("selected", index);
    return true
  }
  return false
};
SingleSelectionRule.prototype.__dispatchSelect = function(newIndex) {
  var oldIndex = this.__currentIndex;
  return(oldIndex === null || this._eventDispatcher.dispatch("deselect", oldIndex)) && this._eventDispatcher.dispatch("select", newIndex)
};
SingleSelectionRule.prototype.isSelected = function(index) {
  return index === this.__currentIndex
};
SingleSelectionRule.prototype.clearSelection = function() {
  if(this.__currentIndex !== null) {
    this._selectionView.destroySelectionAt(this.__currentIndex);
    this.__currentIndex = null
  }
};
tuna.ui.selection.rule.SingleSelectionRule = SingleSelectionRule;
var MultipleSelectionRule = function() {
  tuna.ui.selection.rule.AbstractSelectionRule.call(this);
  this.__selectedIndexes = []
};
tuna.utils.extend(MultipleSelectionRule, tuna.ui.selection.rule.AbstractSelectionRule);
MultipleSelectionRule.prototype.getSelectedIndexes = function() {
  return tuna.utils.cloneArray(this.__selectedIndexes)
};
MultipleSelectionRule.prototype.selectIndex = function(index) {
  if(this._selectionGroup.isIndexEnabled(index)) {
    var indexPosition = tuna.utils.indexOf(index, this.__selectedIndexes);
    if(indexPosition === -1) {
      if(this._eventDispatcher.dispatch("select", index)) {
        this._selectionView.applySelectionAt(index);
        this.__selectedIndexes.push(index);
        return true
      }
    }else {
      if(this._eventDispatcher.dispatch("deselect", index)) {
        this._selectionView.destroySelectionAt(index);
        this.__selectedIndexes.splice(indexPosition, 1);
        return true
      }
    }
  }
  return false
};
MultipleSelectionRule.prototype.isSelected = function(index) {
  return tuna.utils.indexOf(index, this.__selectedIndexes) !== -1
};
MultipleSelectionRule.prototype.clearSelection = function() {
  while(this.__selectedIndexes.length > 0) {
    this._selectionView.destroySelectionAt(this.__selectedIndexes.shift())
  }
};
tuna.ui.selection.rule.MultipleSelectionRule = MultipleSelectionRule;
var ISelectionView = function() {
};
ISelectionView.prototype.applySelectionAt = function(index) {
};
ISelectionView.prototype.destroySelectionAt = function(index) {
};
ISelectionView.prototype.disableItemAt = function(index) {
};
ISelectionView.prototype.enableItemAt = function(index) {
};
ISelectionView.prototype.update = function() {
};
tuna.ui.selection.view.ISelectionView = ISelectionView;
var AbstractSelectionView = function() {
  this._itemsCollection = null;
  this._selectionGroup = null
};
tuna.utils.implement(AbstractSelectionView, tuna.ui.selection.view.ISelectionView);
AbstractSelectionView.prototype.setSelectionGroup = function(group) {
  this._selectionGroup = group
};
AbstractSelectionView.prototype.setItemsCollection = function(collection) {
  this._itemsCollection = collection
};
AbstractSelectionView.prototype.applySelectionAt = function(index) {
};
AbstractSelectionView.prototype.destroySelectionAt = function(index) {
};
AbstractSelectionView.prototype.disableItemAt = function(index) {
};
AbstractSelectionView.prototype.enableItemAt = function(index) {
};
AbstractSelectionView.prototype.update = function() {
};
tuna.ui.selection.view.AbstractSelectionView = AbstractSelectionView;
var ClassSelectionView = function(target) {
  tuna.ui.selection.view.AbstractSelectionView.call(this);
  this._target = target;
  this._itemSelector = "";
  this._selectionClass = "";
  this._disabledClass = "disabled"
};
tuna.utils.extend(ClassSelectionView, tuna.ui.selection.view.AbstractSelectionView);
ClassSelectionView.prototype.setItemSelector = function(selector) {
  this._itemSelector = selector
};
ClassSelectionView.prototype.setSelectionClass = function(className) {
  this._selectionClass = className
};
ClassSelectionView.prototype.setDisabledClass = function(className) {
  this._disabledClass = className
};
ClassSelectionView.prototype.applySelectionAt = function(index) {
  var item = this._itemsCollection.getItemAt(index);
  if(item !== null) {
    tuna.dom.addClass(item, this._selectionClass)
  }
};
ClassSelectionView.prototype.destroySelectionAt = function(index) {
  var item = this._itemsCollection.getItemAt(index);
  if(item !== null) {
    tuna.dom.removeClass(item, this._selectionClass)
  }
};
ClassSelectionView.prototype.disableItemAt = function(index) {
  var item = this._itemsCollection.getItemAt(index);
  if(item !== null) {
    tuna.dom.addClass(item, this._disabledClass)
  }
};
ClassSelectionView.prototype.enableItemAt = function(index) {
  var item = this._itemsCollection.getItemAt(index);
  if(item !== null) {
    tuna.dom.removeClass(item, this._disabledClass)
  }
};
ClassSelectionView.prototype.update = function() {
  if(this._itemSelector !== null) {
    this._selectionGroup.clearSelection();
    this._itemsCollection.clear();
    var possibleItems = tuna.dom.select(this._itemSelector, this._target);
    var i = 0, l = possibleItems.length;
    var index = null;
    var item = null;
    while(i < l) {
      item = possibleItems[i];
      if(tuna.dom.getParentMatches(item, this._itemSelector, this._target) === null) {
        index = this._itemsCollection.addItem(item);
        if(index !== null && tuna.dom.hasClass(item, this._selectionClass)) {
          this._selectionGroup.selectIndex(index)
        }
      }
      i++
    }
  }
};
tuna.ui.selection.view.ClassSelectionView = ClassSelectionView;
var FormModule = function() {
  tuna.ui.Module.call(this, "form.j-form")
};
tuna.utils.extend(FormModule, tuna.ui.Module);
FormModule.prototype.initInstance = function(target) {
  return new tuna.ui.forms.Form(target)
};
tuna.ui.modules.register("form", new FormModule);
var NavigationModule = function() {
  tuna.ui.Module.call(this, ".j-navigation")
};
tuna.utils.extend(NavigationModule, tuna.ui.Module);
NavigationModule.prototype.initInstance = function(target) {
  return new tuna.ui.selection.Navigation(target)
};
tuna.ui.modules.register("navigation", new NavigationModule);
var PopupModule = function() {
  tuna.ui.Module.call(this, ".j-popup")
};
tuna.utils.extend(PopupModule, tuna.ui.Module);
PopupModule.prototype.initInstance = function(target) {
  return tuna.ui.popups.create(target)
};
tuna.ui.modules.register("popup", new PopupModule);
var PopupButtonModule = function() {
  tuna.ui.Module.call(this, ".j-popup-button")
};
tuna.utils.extend(PopupButtonModule, tuna.ui.Module);
PopupButtonModule.prototype.initInstance = function(target) {
  var popupElement = tuna.dom.selectOne(target.getAttribute("data-popup-selector"));
  var popup = null;
  if(popupElement !== null) {
    popup = tuna.ui.popups.create(popupElement);
    tuna.dom.addEventListener(target, "click", function(event) {
      popup.open()
    })
  }
  return popup
};
tuna.ui.modules.register("popup-button", new PopupButtonModule);
var SelectionGroupModule = function() {
  tuna.ui.Module.call(this, ".j-selection-group")
};
tuna.utils.extend(SelectionGroupModule, tuna.ui.Module);
SelectionGroupModule.prototype.initInstance = function(target) {
  var selectionGroup = new tuna.ui.selection.SelectionGroup(target, null);
  var selectionEvent = selectionGroup.getOption("selection-event");
  var itemSelector = selectionGroup.getOption("item-selector");
  if(selectionEvent !== null && itemSelector !== null) {
    tuna.dom.addChildEventListener(target, itemSelector, selectionEvent, function() {
      var index = selectionGroup.getItemIndex(this);
      if(index !== null) {
        selectionGroup.selectIndex(index)
      }
    })
  }
  return selectionGroup
};
tuna.ui.modules.register("selection-group", new SelectionGroupModule);
var TemplateTransformerModule = function() {
  tuna.ui.Module.call(this, ".j-template-transformer")
};
tuna.utils.extend(TemplateTransformerModule, tuna.ui.Module);
TemplateTransformerModule.prototype.initInstance = function(target) {
  return new tuna.ui.transformers.TemplateTransformer(target)
};
tuna.ui.modules.register("template-transformer", new TemplateTransformerModule);
var ControlContainerModule = function() {
  tuna.ui.Module.call(this, ".j-control-container")
};
tuna.utils.extend(ControlContainerModule, tuna.ui.Module);
ControlContainerModule.prototype._findTargets = function(context) {
  return tuna.dom.select(this._selector, context)
};
ControlContainerModule.prototype.initInstance = function(target) {
  return new tuna.ui.containers.ControlContainer(target)
};
tuna.ui.modules.register("control-container", new ControlContainerModule, true);
var ButtonGroupModule = function() {
  tuna.ui.Module.call(this, ".j-button-group")
};
tuna.utils.extend(ButtonGroupModule, tuna.ui.Module);
ButtonGroupModule.prototype.initInstance = function(target) {
  return new tuna.ui.buttons.ButtonGroup(target)
};
tuna.ui.modules.register("button-group", new ButtonGroupModule);
tuna.view.__idTable = {};
tuna.view.__mainController = null;
tuna.view.setMainController = function(controller) {
  tuna.view.__mainController = controller
};
tuna.view.registerController = function(targetId, controller) {
  tuna.view.__idTable[targetId] = controller
};
tuna.view.getController = function(target) {
  if(target === document.body) {
    return tuna.view.__mainController
  }else {
    if(target !== null && tuna.view.__idTable[target.id] !== undefined) {
      return tuna.view.__idTable[target.id]
    }
  }
  return null
};
tuna.view.init = function() {
  (new tuna.ui.containers.ControlContainer(document.body)).initController()
};
var ViewController = function() {
  this._container = null
};
tuna.utils.implement(ViewController, tuna.ui.transformers.ITransformHandler);
ViewController.prototype.setContainer = function(container) {
  this._container = container
};
ViewController.prototype.bootstrap = function() {
  this.init()
};
ViewController.prototype.terminate = function() {
  this.destroy()
};
ViewController.prototype.init = function() {
  this._requireModules();
  this._container.initModules();
  this._initActions()
};
ViewController.prototype._requireModules = function() {
};
ViewController.prototype._initActions = function() {
};
ViewController.prototype.destroy = function() {
  this._destroyActions();
  this._container.destroyModules()
};
ViewController.prototype._destroyActions = function() {
};
ViewController.prototype.handleTransformComplete = function(target, createdElements, removedElements) {
  var i = 0, l = createdElements.length;
  while(i < l) {
    this._container.initModules(createdElements[i]);
    i++
  }
};
ViewController.prototype.handleTransformStart = function(target) {
};
ViewController.prototype.handleDestroy = function(target, removedElements) {
};
tuna.view.ViewController = ViewController;
var NavigationViewController = function() {
  tuna.view.ViewController.call(this);
  this._navigation = null;
  this._currentPage = null;
  this.__pageControllers = {}
};
tuna.utils.extend(NavigationViewController, tuna.view.ViewController);
NavigationViewController.prototype._requireModules = function() {
  this._container.requireModule("control-container");
  this._container.requireModule("navigation")
};
NavigationViewController.prototype._initActions = function() {
  this._navigation = this._container.getOneModuleInstance("navigation");
  if(this._navigation !== null) {
    var self = this;
    this._navigation.addEventListener("select", function(event, index) {
      if(!self._canClose(index)) {
        event.preventDefault()
      }
    });
    this._navigation.addEventListener("open", function(event, data) {
      self._setCurrentPage(self._navigation.getLastSelectedIndex(), data)
    });
    var currentIndex = this._navigation.getLastSelectedIndex();
    if(currentIndex !== null) {
      this._setCurrentPage(currentIndex)
    }
  }
};
NavigationViewController.prototype._canClose = function(index) {
  if(this._currentPage !== null) {
    var controller = this.__getPageController(this._currentPage);
    if(controller !== null) {
      controller.close()
    }
  }
  return true
};
NavigationViewController.prototype._setCurrentPage = function(index, args) {
  var newPage = this._navigation.getItemAt(index);
  var oldPage = this._currentPage;
  if(oldPage !== null) {
    this._handlePageClose(oldPage, newPage);
    this._closePage()
  }
  this._currentPage = newPage;
  this._openPage(args);
  this._handlePageOpen(newPage, oldPage)
};
NavigationViewController.prototype._openPage = function(args) {
  if(!this.__isPageInit(this._currentPage)) {
    this.__initPage(this._currentPage)
  }
  var controller = this.__getPageController(this._currentPage);
  if(controller !== null) {
    controller.open(args)
  }
};
NavigationViewController.prototype._closePage = function() {
  var controller = this.__getPageController(this._currentPage);
  if(controller !== null) {
    controller.close()
  }
};
NavigationViewController.prototype.__getPageController = function(page) {
  return this.__pageControllers[page.id]
};
NavigationViewController.prototype.__initPage = function(page) {
  var controller = null;
  var container = this._container.getModuleInstanceByName("control-container", page.id);
  if(container !== null) {
    container.initController();
    controller = container.getController()
  }
  if(controller !== null) {
    controller.setNavigation(this._navigation)
  }
  this.__pageControllers[page.id] = controller
};
NavigationViewController.prototype.__isPageInit = function(page) {
  return this.__pageControllers[page.id] !== undefined
};
NavigationViewController.prototype._handlePageClose = function(currentPage, newPage) {
};
NavigationViewController.prototype._handlePageOpen = function(currentPage, oldPage) {
};
tuna.view.NavigationViewController = NavigationViewController;
var PageViewController = function() {
  tuna.view.ViewController.call(this);
  this._navigation = null
};
tuna.utils.extend(PageViewController, tuna.view.ViewController);
PageViewController.prototype.setNavigation = function(navigation) {
  this._navigation = navigation
};
PageViewController.prototype.getNavigation = function() {
  return this._navigation
};
PageViewController.prototype.canClose = function(index) {
  return true
};
PageViewController.prototype.close = function() {
};
PageViewController.prototype.open = function(args) {
};
tuna.view.PageViewController = PageViewController;
var model = {};
model.record = {};
model.resource = {};
var rest = {};
window["main"] = function(args) {
  tuna.utils.config.init(args);
  tuna.dom.setSelectorEngine(Sizzle);
  tuna.view.init()
};
var MainController = function() {
  tuna.view.NavigationViewController.call(this)
};
tuna.utils.extend(MainController, tuna.view.NavigationViewController);
MainController.prototype._requireModules = function() {
  tuna.view.NavigationViewController.prototype._requireModules.call(this);
  this._container.requireModule("template-transformer");
  this._container.requireModule("popup");
  this._container.requireModule("form")
};
MainController.prototype._initActions = function() {
  tuna.view.NavigationViewController.prototype._initActions.call(this);
  var self = this;
  tuna.rest.call("users.getCurrent", null, function(user) {
    if(user === null) {
      self.__showSignUpPopup()
    }else {
      self.__applyUser(user)
    }
  }, "user");
  this.__initSingOutForm()
};
MainController.prototype.__initSingOutForm = function() {
  var form = this._container.getModuleInstanceByName("form", "sign-out");
  form.addEventListener("result", function(event, result) {
    location.reload()
  })
};
MainController.prototype.__showSignUpPopup = function() {
  var popup = this._container.getModuleInstanceByName("popup", "sign-in");
  popup.open();
  var form = this._container.getModuleInstanceByName("form", "sign-in");
  var self = this;
  form.addEventListener("result", function(event, user) {
    self.__applyUser(user);
    popup.close()
  })
};
MainController.prototype.__applyUser = function(user) {
  var transformer = this._container.getModuleInstanceByName("template-transformer", "user-info");
  transformer.applyTransform(user.serialize());
  this._navigation.navigate("orders_page")
};
tuna.view.setMainController(new MainController);
var RecipesController = function() {
  tuna.view.PageViewController.call(this);
  this.__bakerySelectTransformer = null;
  this.__recipeTableTransformer = null;
  this.__addRecipeTransformer = null;
  this.__bakerySelectForm = null;
  this.__addRecipeForm = null;
  this.__recipeControls = null;
  this.__recipePopup = null
};
tuna.utils.extend(RecipesController, tuna.view.PageViewController);
RecipesController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("button-group");
  this._container.requireModule("popup");
  this._container.requireModule("form")
};
RecipesController.prototype._initActions = function() {
  var self = this;
  this.__recipeTableTransformer = this._container.getModuleInstanceByName("template-transformer", "recipe-table");
  this.__bakerySelectTransformer = this._container.getModuleInstanceByName("template-transformer", "bakery-select");
  this.__addRecipeTransformer = this._container.getModuleInstanceByName("template-transformer", "add-recipe");
  this.__bakerySelectForm = this._container.getModuleInstanceByName("form", "bakery-select");
  this.__addRecipeForm = this._container.getModuleInstanceByName("form", "add-recipe");
  this.__recipeControls = this._container.getModuleInstanceByName("button-group", "recipe-controls");
  this.__recipePopup = this._container.getModuleInstanceByName("popup", "edit-recipe");
  this.__recipeControls.addEventListener("delete", function(event, button) {
    self.__deleteRecipe(button)
  });
  this.__recipeControls.addEventListener("edit", function(event, button) {
    self.__recipePopup.open()
  });
  this.__bakerySelectForm.addEventListener("result", function(event, recipes) {
    model.resource.recipes.setRecipes(recipes);
    self.__updateView()
  });
  this.__bakerySelectForm.addEventListener("change", function() {
    var bakeryId = self.__bakerySelectForm.getValue("bakery_id");
    if(bakeryId !== -1) {
      self.__bakerySelectForm.submit()
    }else {
      model.resource.recipes.clearRecipes()
    }
    model.resource.bakeries.setCurrentBakeryId(bakeryId);
    self.__updateView()
  });
  this.__addRecipeForm.addEventListener("result", function(event, recipe) {
    model.resource.recipes.addRecipe(recipe);
    self.__addRecipeForm.reset();
    self.__updateView()
  });
  tuna.rest.call("users.getBakeries", null, function(bakeries) {
    model.resource.bakeries.setBakeries(bakeries);
    self.__updateView()
  }, "bakery")
};
RecipesController.prototype.__updateView = function() {
  this.__bakerySelectTransformer.applyTransform(model.resource.bakeries.getBakeriesList());
  this.__recipeTableTransformer.applyTransform(model.resource.recipes.getRecipesList());
  this.__addRecipeTransformer.applyTransform(model.resource.bakeries.getCurrentBakery())
};
RecipesController.prototype.__deleteRecipe = function(button) {
  if(confirm("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0440\u0435\u0446\u0435\u043f\u0442?")) {
    var self = this;
    var recipeId = button.getOption("recipe-id");
    tuna.rest.call("recipes.remove", {"recipe_id":recipeId}, function() {
      model.resource.recipes.removeRecipeById(recipeId);
      self.__updateView()
    });
    button.setEnabled(false)
  }
};
tuna.view.registerController("recipes_page", new RecipesController);
var OrdersController = function() {
  tuna.view.PageViewController.call(this);
  this.__orderControls = null;
  this.__orderPopup = null
};
tuna.utils.extend(OrdersController, tuna.view.PageViewController);
OrdersController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("button-group");
  this._container.requireModule("navigation");
  this._container.requireModule("popup");
  this._container.requireModule("form")
};
OrdersController.prototype._initActions = function() {
  var self = this;
  this.__orderControls = this._container.getModuleInstanceByName("button-group", "order-controls");
  this.__orderPopup = this._container.getModuleInstanceByName("popup", "edit-order");
  this.__orderControls.addEventListener("edit", function(event, button) {
    self.__orderPopup.open()
  })
};
OrdersController.prototype.__updateView = function() {
};
tuna.view.registerController("orders_page", new OrdersController);
var User = function() {
  this.email = "";
  this.role = -1
};
tuna.utils.extend(User, tuna.model.Record);
User.ADMIN = 0;
User.BAKERY = 1;
User.prototype.populate = function(data) {
  this.email = data["email"];
  this.role = data["role"]
};
User.prototype.serialize = function() {
  return{"email":this.email, "role":model.resource.users.getRoleName(this.role)}
};
model.record.User = User;
tuna.model.recordFactory.registerRecord("user", new model.record.User);
var Bakery = function() {
  this.id = "";
  this.email = "";
  this.city = "";
  this.name = "";
  this.deliveryPrice = 0
};
tuna.utils.extend(Bakery, tuna.model.Record);
Bakery.prototype.populate = function(data) {
  this.id = data["id"];
  this.name = data["name"];
  this.email = data["email"];
  this.city = data["city"]["name"];
  this.deliveryPrice = data["delivery_price"]
};
Bakery.prototype.serialize = function() {
  return{"id":this.id, "name":this.name + " (" + this.city + ")", "email":this.email, "deliveryPrice":this.deliveryPrice}
};
model.record.Bakery = Bakery;
tuna.model.recordFactory.registerRecord("bakery", new model.record.Bakery);
var Recipe = function() {
  this.id = "";
  this.bakeryId = "";
  this.name = "";
  this.desc = "";
  this.imageUrl = "";
  this.dimentionPrices = []
};
tuna.utils.extend(Recipe, tuna.model.Record);
Recipe.prototype.populate = function(data) {
  this.id = data["id"];
  this.bakeryId = data["bakery_id"];
  this.name = data["name"];
  this.desc = data["desc"];
  this.imageUrl = data["image_url"];
  this.dimentionPrices = []
};
Recipe.prototype.serialize = function() {
  return{"id":this.id, "bakeryId":this.bakeryId, "name":this.name, "desc":this.desc, "imageUrl":this.imageUrl, "dimentionPrices":this.dimentionPrices}
};
model.record.Recipe = Recipe;
tuna.model.recordFactory.registerRecord("recipe", new model.record.Recipe);
var Users = function() {
  this.__roles = ["\u0410\u0434\u043c\u0438\u043d", "\u041a\u043e\u043d\u0434\u0438\u0442\u0435\u0440\u0441\u043a\u0430\u044f"]
};
Users.prototype.getRoleName = function(role) {
  return this.__roles[role]
};
model.resource.users = new Users;
var Bakeries = function() {
  this.__bakeries = [];
  this.__currentBakery = null
};
Bakeries.prototype.setBakeries = function(bakeries) {
  this.__bakeries = bakeries
};
Bakeries.prototype.setCurrentBakeryId = function(id) {
  this.__currentBakery = null;
  var i = 0, l = this.__bakeries.length;
  while(i < l) {
    if(this.__bakeries[i].id === id) {
      this.__currentBakery = this.__bakeries[i];
      break
    }
    i++
  }
};
Bakeries.prototype.getCurrentBakery = function() {
  if(this.__currentBakery !== null) {
    return this.__currentBakery.serialize()
  }
  return null
};
Bakeries.prototype.getBakeriesList = function() {
  var result = [];
  var i = 0, l = this.__bakeries.length;
  while(i < l) {
    result.push(this.__bakeries[i].serialize());
    i++
  }
  return result
};
model.resource.bakeries = new Bakeries;
var Recipes = function() {
  this.__recipes = []
};
Recipes.prototype.setRecipes = function(recipes) {
  this.__recipes = recipes
};
Recipes.prototype.clearRecipes = function() {
  this.__recipes.length = 0
};
Recipes.prototype.addRecipe = function(recipe) {
  this.__recipes.push(recipe)
};
Recipes.prototype.removeRecipeById = function(id) {
  var i = 0, l = this.__recipes.length;
  while(i < l) {
    if(this.__recipes[i].id === id) {
      this.__recipes.splice(i, 1);
      break
    }
    i++
  }
};
Recipes.prototype.getRecipesList = function() {
  var result = [];
  var i = 0, l = this.__recipes.length;
  while(i < l) {
    result.push(this.__recipes[i].serialize());
    i++
  }
  return result
};
model.resource.recipes = new Recipes;
var CommonMethod = function(name) {
  tuna.rest.Method.call(this, name);
  this.__request = new tuna.net.Request;
  this.__request.method = "POST";
  this.__request.setURL("/api/?method=" + name);
  var self = this;
  this.__request.addEventListener("complete", function(event, data) {
    self._handleResponse(data)
  })
};
tuna.utils.extend(CommonMethod, tuna.rest.Method);
CommonMethod.prototype.call = function(args) {
  this.__request.setData(args);
  this.__request.send()
};
CommonMethod.prototype._handleResponse = function(data) {
  var result = null;
  try {
    result = JSON.parse(data)
  }catch(error) {
    this.dispatch("error", data)
  }
  if(result !== null) {
    var response = result["response"];
    if(response !== undefined) {
      this.dispatch("result", response)
    }else {
      this.dispatch("error", result["errors"])
    }
  }
};
rest.CommonMethod = CommonMethod;
var CommonFactory = function() {
};
tuna.utils.implement(CommonFactory, tuna.rest.IMethodFactory);
CommonFactory.prototype.createMethod = function(name) {
  return new rest.CommonMethod(name)
};
tuna.rest.methodFactory.setDefaultFactory(new CommonFactory);

