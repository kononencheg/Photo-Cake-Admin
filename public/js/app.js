var tuna = {};
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
tuna.utils.isArray = function(list) {
  return list !== null && list.push !== undefined && list.length !== undefined && !isNaN(list.length)
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
  if(tuna.utils.isArray(object)) {
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
  var dataString = tuna.net.encode(this.__data);
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
tuna.net.Request = Request;
tuna.net.encode = function(object) {
  return tuna.net.__splitData(object).join("&")
};
tuna.net.__splitData = function(object, path) {
  var result = [];
  if(path === undefined) {
    path = []
  }
  if(object !== null && !(object instanceof Function)) {
    if(object instanceof Object) {
      for(var key in object) {
        var newPath = path.length === 0 ? [key] : (path.join(",") + "," + key).split(",");
        result = result.concat(tuna.net.__splitData(object[key], newPath))
      }
    }else {
      result = [path.shift() + (path.length > 0 ? "[" + path.join("][") + "]=" : "=") + encodeURIComponent("" + object)]
    }
  }
  return result
};
tuna.net.__DECODE_HELPER = "|";
tuna.net.decode = function(search) {
  var result = {};
  var parsedSearch = search.substring(1);
  parsedSearch = parsedSearch.split("][").join(tuna.net.__DECODE_HELPER);
  parsedSearch = parsedSearch.split("[").join(tuna.net.__DECODE_HELPER);
  parsedSearch = parsedSearch.split("]").join("");
  var vars = parsedSearch.split("&");
  var i = 0, l = vars.length;
  var pair = null;
  var path = null;
  var pathToken = null;
  var context = null;
  while(i < l) {
    pair = vars[i].split("=");
    path = pair.shift().split(tuna.utils.__DECODE_HELPER);
    context = result;
    while(path.length > 0) {
      pathToken = path.shift();
      if(path.length === 0) {
        context[pathToken] = decodeURIComponent(pair.shift())
      }else {
        if(context[pathToken] === undefined) {
          context[pathToken] = {}
        }
      }
      context = context[pathToken]
    }
    i++
  }
  return result
};
var IResource = function() {
};
IResource.prototype.set = function(data) {
};
IResource.prototype.get = function() {
};
IResource.prototype.clear = function() {
};
tuna.model.IResource = IResource;
var ListResource = function(methodName, recordType) {
  tuna.events.EventDispatcher.call(this);
  this._methodName = methodName || null;
  this._recordType = recordType || null;
  this._list = []
};
tuna.utils.implement(ListResource, tuna.model.IResource);
tuna.utils.extend(ListResource, tuna.events.EventDispatcher);
ListResource.prototype.load = function(args) {
  var self = this;
  if(this._methodName !== null) {
    tuna.rest.call(this._methodName, args || null, function(records) {
      self.set(records)
    }, this._recordType)
  }
};
ListResource.prototype.set = function(list) {
  this._list = list;
  this.dispatch("update", this._list)
};
ListResource.prototype.get = function() {
  return this._list
};
ListResource.prototype.clear = function() {
  this._list.length = 0;
  this.dispatch("update", this._list)
};
ListResource.prototype.addItem = function(record) {
  var i = 0, l = this._list.length;
  while(i < l) {
    if(this._list[i].id === record.id) {
      break
    }
    i++
  }
  this._list[i] = record;
  this.dispatch("update", this._list)
};
ListResource.prototype.removeItem = function(record) {
  this.removeItemById(record.id)
};
ListResource.prototype.removeItemById = function(id) {
  var i = 0, l = this._list.length;
  while(i < l) {
    if(this._list[i].id === id) {
      this._list.splice(i, 1);
      break
    }
    i++
  }
  this.dispatch("update", this._list)
};
ListResource.prototype.getItemById = function(id) {
  var i = 0, l = this._list.length;
  while(i < l) {
    if(this._list[i].id === id) {
      return this._list[i]
    }
    i++
  }
  return null
};
tuna.model.ListResource = ListResource;
var ItemResource = function() {
  tuna.events.EventDispatcher.call(this);
  this._item = null
};
tuna.utils.implement(ItemResource, tuna.model.IResource);
tuna.utils.extend(ItemResource, tuna.events.EventDispatcher);
ItemResource.prototype.set = function(item) {
  this._item = item;
  this.dispatch("update", this._item)
};
ItemResource.prototype.get = function() {
  return this._item
};
ItemResource.prototype.clear = function() {
  this._item = null;
  this.dispatch("update", this._item)
};
tuna.model.ItemResource = ItemResource;
var Record = function(data) {
  this.id = "";
  if(data !== undefined) {
    this.populate(data)
  }
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
Record.prototype.serialize = function(options) {
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
tuna.model.serialize = function(object) {
  if(object !== null) {
    if(tuna.utils.isArray(object)) {
      var result = [];
      var i = 0, l = object.length;
      while(i < l) {
        result.push(object[i].serialize());
        i++
      }
      return result
    }else {
      if(object instanceof tuna.model.Record) {
        return object.serialize()
      }
    }
    return object
  }
  return null
};
tuna.model.serializeDate = function(date) {
  return date.toJSON().substring(0, 16).replace("T", " ")
};
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
        this.__children[key] = tuna.tmpl.data.NULL_NODE
      }
    }
  }
  return result
};
tuna.tmpl.data.DataNode = DataNode;
tuna.tmpl.data.NULL_NODE = new tuna.tmpl.data.DataNode(null);
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
  return tuna.tmpl.data.NULL_NODE
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
  this.targetClass = "";
  this.dataPath = "";
  this.filter = null
};
tuna.tmpl.settings.SpotSettings = SpotSettings;
var AttributeSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this);
  this.attributeName = "";
  this.hasEvent = false
};
tuna.utils.extend(AttributeSettings, tuna.tmpl.settings.SpotSettings);
tuna.tmpl.settings.AttributeSettings = AttributeSettings;
var ConditionSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this);
  this.actionType = "";
  this.actionData = "";
  this.operatorType = "";
  this.operatorData = ""
};
tuna.utils.extend(ConditionSettings, tuna.tmpl.settings.SpotSettings);
tuna.tmpl.settings.ConditionSettings = ConditionSettings;
var CheckboxSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this)
};
tuna.utils.extend(CheckboxSettings, tuna.tmpl.settings.SpotSettings);
tuna.tmpl.settings.CheckboxSettings = CheckboxSettings;
var ListSettings = function() {
  tuna.tmpl.settings.SpotSettings.call(this);
  this.keyPath = "";
  this.itemRendererID = "";
  this.itemSettings = null
};
tuna.utils.extend(ListSettings, tuna.tmpl.settings.SpotSettings);
tuna.tmpl.settings.ListSettings = ListSettings;
var TemplateSettings = function() {
  this.__spots = [];
  this.__lists = [];
  this.__attributes = [];
  this.__conditions = [];
  this.__comboboxex = []
};
TemplateSettings.prototype.addCheckbox = function(combobox) {
  this.__comboboxex.push(combobox)
};
TemplateSettings.prototype.getCheckboxes = function() {
  return this.__comboboxex
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
  item.targetClass = element.getAttribute(this._ns + "target");
  item.dataPath = element.getAttribute(this._ns + "path");
  item.filter = element.getAttribute(this._ns + "filter")
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
  item.itemRendererID = element.getAttribute(this._ns + "item-renderer-id");
  item.keyPath = element.getAttribute(this._ns + "key-path");
  var templateID = element.getAttribute(this._ns + "item-template-id");
  item.itemSettings = this.__templateBuilder.buildSettings(templateID)
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
  item.attributeName = element.getAttribute(this._ns + "name");
  item.hasEvent = !!element.getAttribute(this._ns + "event")
};
AttributeExtractor.prototype._saveItem = function(item, settings) {
  settings.addAttribute(item)
};
tuna.tmpl.markup.AttributeExtractor = AttributeExtractor;
var ConditionExtractor = function() {
  tuna.tmpl.markup.SpotExtractor.call(this);
  this._tagName = "if";
  this.__operatorAttrs = ["isset", "notset", "eq", "ne"];
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
      item.actionType = attr;
      item.actionData = value;
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
      item.operatorType = attr;
      item.operatorData = value;
      break
    }
    i++
  }
};
ConditionExtractor.prototype._saveItem = function(item, settings) {
  settings.addCondition(item)
};
tuna.tmpl.markup.ConditionExtractor = ConditionExtractor;
var CheckboxExtractor = function() {
  tuna.tmpl.markup.SpotExtractor.call(this);
  this._tagName = "checkbox"
};
tuna.utils.extend(CheckboxExtractor, tuna.tmpl.markup.SpotExtractor);
CheckboxExtractor.prototype._createItem = function() {
  return new tuna.tmpl.settings.CheckboxSettings
};
CheckboxExtractor.prototype._saveItem = function(item, settings) {
  settings.addCheckbox(item)
};
tuna.tmpl.markup.CheckboxExtractor = CheckboxExtractor;
var MarkupTemplateBuilder = function(doc) {
  this.__doc = doc;
  this.__templatesTable = {};
  this.__extractors = [];
  this.__registerExtractors()
};
MarkupTemplateBuilder.prototype.__registerExtractors = function() {
  this.__extractors.push(new tuna.tmpl.markup.SpotExtractor);
  this.__extractors.push(new tuna.tmpl.markup.CheckboxExtractor);
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
CompiledUnit.prototype.destroy = function(isHard) {
};
CompiledUnit.prototype.applyData = function(dataNode) {
};
tuna.tmpl.units.CompiledUnit = CompiledUnit;
var Spot = function(root) {
  tuna.tmpl.units.CompiledUnit.call(this, root);
  this.__pathEvaluator = new tuna.tmpl.data.PathEvaluator;
  this._nodes = [];
  this._filter = null
};
tuna.utils.extend(Spot, tuna.tmpl.units.CompiledUnit);
Spot.prototype.setFilter = function(filter) {
  this._filter = filter
};
Spot.prototype.setPath = function(path) {
  this.__pathEvaluator.setPath(path)
};
Spot.prototype.addTargets = function(elements) {
  this._nodes = this._nodes.concat(elements)
};
Spot.prototype.applyData = function(dataNode) {
  var valueNode = this.__pathEvaluator.evaluate(dataNode);
  if(valueNode !== null) {
    var value = valueNode.getValue();
    if(this._filter !== null) {
      value = this._filter.join(value)
    }
    this._applyValue(value)
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
Spot.prototype.destroy = function(isHard) {
  if(isHard) {
    var node = null;
    while(this._nodes.length > 0) {
      node = this._nodes.shift();
      if(node.parentNode !== null) {
        node.parentNode.removeChild(node);
        this.getRootTemplate().registerChildRemoval(node)
      }
    }
  }else {
    this._nodes.length = 0
  }
  this.__pathEvaluator = null
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
    if(key !== null) {
      if(oldItemsTable[key] === undefined) {
        this.addItem(this.__makeNewItem(), key)
      }else {
        this.__itemsTable[key] = oldItemsTable[key];
        delete oldItemsTable[key]
      }
      this.__itemsTable[key].applyData(itemNode)
    }
  }
};
List.prototype.__destroyItems = function(itemsTable) {
  for(var key in itemsTable) {
    itemsTable[key].destroy(true);
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
List.prototype.destroy = function(isHard) {
  for(var key in this.__itemsTable) {
    this.__itemsTable[key].destroy(isHard);
    this.__itemsTable[key] = null
  }
  this.__templateCompiler = null;
  this.__itemRenderer = null;
  this.__itemSettings = null;
  this.__pathEvaluator = null;
  this.__keyPathEvaluator = null;
  this.__listNodeRouter = null;
  this.__itemsTable = null
};
tuna.tmpl.units.List = List;
var Checkbox = function(root) {
  tuna.tmpl.units.Spot.call(this, root)
};
tuna.utils.extend(Checkbox, tuna.tmpl.units.Spot);
Checkbox.prototype._applyValue = function(value) {
  if(value !== null) {
    var i = this._nodes.length - 1;
    if(value === true || value === false) {
      while(i >= 0) {
        this._nodes[i].checked = value;
        i--
      }
    }else {
      if(tuna.utils.isArray(value)) {
        while(i >= 0) {
          this._nodes[i].checked = tuna.utils.indexOf(this._nodes[i].value, value) !== -1;
          i--
        }
      }else {
        value = value + "";
        while(i >= 0) {
          this._nodes[i].checked = this._nodes[i].value === value;
          i--
        }
      }
    }
  }
};
tuna.tmpl.units.Checkbox = Checkbox;
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
  this.__createdChildren = this.__createdChildren.concat(child)
};
Template.prototype.fetchCreatedChildren = function() {
  return this.__createdChildren.splice(0, this.__createdChildren.length)
};
Template.prototype.registerChildRemoval = function(child) {
  this.__removedChildren = this.__removedChildren.concat(child)
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
Template.prototype.destroy = function(isHard) {
  var i = this.__items.length - 1;
  while(i >= 0) {
    this.__items[i].destroy(isHard);
    i--
  }
  if(isHard) {
    this.__target.parentNode.removeChild(this.__target)
  }
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
  this.__itemCompilers.push(new tuna.tmpl.compilers.CheckboxCompiler);
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
  item.setPath(settings.dataPath);
  if(settings.filter !== null) {
    item.setFilter(settings.filter.split("$$"))
  }
  var className = settings.targetClass;
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
  item.setAttributeName(settings.attributeName);
  item.setEvent(settings.hasEvent)
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
  var action = this.__createAction(settings.actionType, settings.actionData);
  item.setAction(action);
  var operator = this.__createOperator(settings.operatorType, settings.operatorData);
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
    case "notset":
      return new __NotSetOperator;
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
  return value != null
};
var __NotSetOperator = function() {
  __ConditionOperator.call(this)
};
tuna.utils.extend(__NotSetOperator, __ConditionOperator);
__NotSetOperator.prototype.test = function(value) {
  return value == null
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
var __AttrAction = function(data) {
  __ConditionAction.call(this, data);
  this.__lastName = null
};
tuna.utils.extend(__AttrAction, __ConditionAction);
__AttrAction.prototype.apply = function(element, testResult, value) {
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
var CheckboxCompiler = function() {
  tuna.tmpl.compilers.SpotCompiler.call(this)
};
tuna.utils.extend(CheckboxCompiler, tuna.tmpl.compilers.SpotCompiler);
CheckboxCompiler.prototype._getItemsSettings = function(settings) {
  return settings.getCheckboxes()
};
CheckboxCompiler.prototype._createItem = function(rootTemplate) {
  return new tuna.tmpl.units.Checkbox(rootTemplate)
};
tuna.tmpl.compilers.CheckboxCompiler = CheckboxCompiler;
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
  var className = settings.targetClass;
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
  var rendererId = settings.itemRendererID;
  var renderer = this.__doc.getElementById(rendererId);
  if(renderer !== null) {
    renderer = renderer.cloneNode(true);
    renderer.removeAttribute("id");
    list.setItemRenderer(renderer)
  }else {
    alert("Cannot find item renderer with id: " + rendererId)
  }
  list.setItemSettings(settings.itemSettings);
  list.setKeyPath(settings.keyPath);
  list.setPath(settings.dataPath);
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
      if(instance !== null) {
        instance.init();
        instances.push(instance)
      }
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
    if(target !== context) {
      result = result && !tuna.dom.hasClass(target, isolators[i]) && tuna.dom.getParentWithClass(target, isolators[i], context) === null;
      if(!result) {
        break
      }
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
  this._isEnabled = true;
  this.__defaultOptions = {}
};
tuna.utils.extend(ModuleInstance, tuna.events.EventDispatcher);
ModuleInstance.prototype.getTarget = function() {
  return this._target
};
ModuleInstance.prototype.getName = function() {
  return this._target.getAttribute("data-name")
};
ModuleInstance.prototype.setEnabled = function(isEnabled) {
  tuna.dom.setClassExist(this._target, "disabled", !isEnabled)
};
ModuleInstance.prototype.isEnabled = function() {
  return!tuna.dom.hasClass(this._target, "disabled")
};
ModuleInstance.prototype._setDefaultOption = function(name, option) {
  if(option === null) {
    delete this.__defaultOptions[name]
  }else {
    this.__defaultOptions[name] = option
  }
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
ModuleInstance.prototype.getStringOption = function(name) {
  var option = this._target.getAttribute("data-" + name);
  if(option === null && this.__defaultOptions[name] !== undefined) {
    option = this.__defaultOptions[name]
  }
  return option
};
ModuleInstance.prototype.getNumberOption = function(name) {
  var option = this._target.getAttribute("data-" + name);
  if(option === null && this.__defaultOptions[name] !== undefined) {
    option = this.__defaultOptions[name]
  }
  return Number(option)
};
ModuleInstance.prototype.getBooleanOption = function(name) {
  var option = this._target.getAttribute("data-" + name);
  if(option === null && this.__defaultOptions[name] !== undefined) {
    option = this.__defaultOptions[name]
  }
  return!!option
};
ModuleInstance.prototype.getOptions = function() {
  return tuna.dom.getAttributesData(this._target)
};
ModuleInstance.prototype.init = function() {
};
ModuleInstance.prototype.destroy = function() {
};
tuna.ui.ModuleInstance = ModuleInstance;
var ModuleContainer = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__moduleArgs = {};
  this.__moduleInstances = {}
};
tuna.utils.extend(ModuleContainer, tuna.ui.ModuleInstance);
ModuleContainer.prototype.render = function(element) {
  if(element !== undefined) {
    this.clear();
    this._target.appendChild(element)
  }
};
ModuleContainer.prototype.clear = function() {
  this._target.innerHTML = ""
};
ModuleContainer.prototype.requireModule = function(type, var_args) {
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
ModuleContainer.prototype.initModules = function(target) {
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
ModuleContainer.prototype.getModuleInstances = function(type) {
  if(this.__moduleInstances[type] !== undefined) {
    return this.__moduleInstances[type]
  }
  return null
};
ModuleContainer.prototype.getOneModuleInstance = function(type) {
  if(this.__moduleInstances[type] !== undefined && this.__moduleInstances[type][0] !== undefined) {
    return this.__moduleInstances[type][0]
  }
  return null
};
ModuleContainer.prototype.getModuleInstanceByName = function(type, name) {
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
ModuleContainer.prototype.destroyModules = function() {
  for(var name in this.__moduleInstances) {
    tuna.ui.modules.getModule(name).destroy(this.__moduleInstances[name]);
    this.__moduleInstances[name].length = 0
  }
};
ModuleContainer.prototype.__initModule = function(module, target, moduleArgs) {
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
tuna.ui.ModuleContainer = ModuleContainer;
tuna.ui.modules.__typeTable = {};
tuna.ui.modules.__isolators = [];
tuna.ui.modules.register = function(type, module) {
  tuna.ui.modules.__typeTable[type] = module
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
tuna.ui.modules.addIsolator = function(className) {
  if(tuna.utils.indexOf(className, tuna.ui.modules.__isolators) === -1) {
    tuna.ui.modules.__isolators.push(className)
  }
};
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
    return tuna.ui.forms.serialize(form)
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
Button.prototype.setActive = function(isActive) {
  tuna.dom.setClassExist(this._target, "active", isActive)
};
tuna.ui.buttons.Button = Button;
var ButtonGroup = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__defaultAction = null;
  this.__isPreventDefault = true;
  this._setDefaultOption("button-selector", ".j-button")
};
tuna.utils.extend(ButtonGroup, tuna.ui.ModuleInstance);
ButtonGroup.prototype.setDefaultAction = function(action) {
  this.__defaultAction = action
};
ButtonGroup.prototype.setPreventDefault = function(isPreventDefault) {
  this.__isPreventDefault = isPreventDefault
};
ButtonGroup.prototype.init = function() {
  var self = this;
  var buttonSelector = this.getStringOption("button-selector");
  if(buttonSelector !== null) {
    tuna.dom.addChildEventListener(this._target, buttonSelector, "click", function(event) {
      if(self.__isPreventDefault) {
        tuna.dom.preventDefault(event)
      }
      var button = tuna.ui.buttons.create(this);
      var action = button.getStringOption("action");
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
var SWF = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__movieId = "";
  this.__movie = null;
  this._setDefaultOption("wmode", "opaque");
  this._setDefaultOption("menu", false);
  this._setDefaultOption("allow-fullscreen", false);
  this._setDefaultOption("allow-script-access", "always")
};
tuna.utils.extend(SWF, tuna.ui.ModuleInstance);
SWF.prototype.init = function() {
  if(this._target.id === "") {
    this._target.id = "swf_" + tuna.ui.flash.__lastId++
  }
  this.__movieId = this._target.id;
  swfobject.embedSWF(this.getStringOption("src"), this._target.id, this.getNumberOption("width"), this.getNumberOption("height"), "10.0.0", null, this.getStringOption("flashvars"), {"wmode":this.getStringOption("wmode"), "allowfullscreen":this.getStringOption("allow-fullscreen"), "allowscriptaccess":this.getStringOption("allow-script-access"), "menu":this.getStringOption("menu")})
};
SWF.prototype.getMovie = function() {
  if(this.__movie === null) {
    this.__movie = swfobject.getObjectById(this.__movieId)
  }
  return this.__movie
};
tuna.ui.flash.SWF = SWF;
tuna.ui.flash.__lastId = 0;
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
  this.__recordName = this.getStringOption("record-type");
  this.__formMessage = tuna.dom.selectOne(".j-form-message", this._target);
  var callbackInput = document.createElement("input");
  callbackInput.setAttribute("type", "hidden");
  callbackInput.setAttribute("name", "__callback");
  this._target.appendChild(callbackInput);
  var self = this;
  var prepareListener = function(event) {
    if(self.isEnabled()) {
      callbackInput.setAttribute("value", self.__callbackName);
      self.__prepareTo(event.type, event)
    }else {
      tuna.dom.preventDefault(event)
    }
  };
  tuna.dom.addEventListener(this._target, "submit", prepareListener);
  tuna.dom.addEventListener(this._target, "reset", prepareListener);
  window[this.__callbackName] = function(response) {
    self.__handleResponse(response)
  }
};
Form.prototype.getValue = function(name) {
  var result = null;
  var element = this._target.elements[name];
  if(element !== undefined) {
    var isCheck = false;
    if(element instanceof NodeList) {
      var elements = tuna.utils.toArray(element);
      var i = 0, l = elements.length;
      result = [];
      while(i < l) {
        isCheck = elements[i].type === "checkbox" || elements[i].type === "radio";
        if(!isCheck || isCheck && elements[i].checked) {
          result.push(elements[i].value)
        }
        i++
      }
    }else {
      isCheck = element.type === "checkbox" || element.type === "radio";
      if(!isCheck || isCheck && element.checked) {
        result = element.value
      }
    }
  }
  return result
};
Form.prototype.setValue = function(name, value) {
  var element = this._target.elements[name];
  if(element !== undefined) {
    if(element instanceof NodeList) {
      var elements = tuna.utils.toArray(element);
      var i = 0, l = elements.length;
      var stringValue = "";
      var arrayValue = [];
      if(tuna.utils.isArray(value)) {
        arrayValue = tuna.utils.cloneArray(value);
        stringValue = value.join(",")
      }else {
        stringValue = value + "";
        arrayValue = [stringValue]
      }
      var index = -1;
      while(i < l) {
        if(elements[i].type === "radio") {
          elements[i].checked = elements[i].value === stringValue
        }else {
          if(elements[i].type === "checkbox") {
            index = tuna.utils.indexOf(elements[i].value, arrayValue);
            elements[i].checked = index !== -1;
            if(index !== -1) {
              arrayValue.splice(index, 1)
            }
          }else {
            element.value = stringValue
          }
        }
        i++
      }
    }else {
      if(element.type === "checkbox" || element.type === "radio") {
        element.checked = element.value === value
      }else {
        element.value = value
      }
    }
  }
};
Form.prototype.submit = function() {
  this.__prepareTo("submit");
  this._target.submit()
};
Form.prototype.reset = function() {
  this.__prepareTo("reset");
  this._target.reset()
};
Form.prototype.serialize = function() {
  return tuna.ui.forms.serialize(this._target)
};
Form.prototype.__prepareTo = function(type, event) {
  if(this.dispatch(type)) {
    this.__clearMessage();
    this.__clearInputs()
  }else {
    if(event !== undefined) {
      tuna.dom.preventDefault(event)
    }
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
var InputFilter = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this._data = null;
  this._currentData = null;
  this._input = null;
  this._itemSerializeCallback = function(item) {
    return item.name !== undefined ? "" + item.name : ""
  };
  this._transformer = new tuna.ui.transformers.TemplateTransformer(target)
};
tuna.utils.extend(InputFilter, tuna.ui.ModuleInstance);
InputFilter.prototype.init = function() {
  this._input = tuna.dom.selectOne("input.j-filtration", this._target);
  if(this._input !== null) {
    var self = this;
    var lastValue = null;
    tuna.dom.addEventListener(this._input, "keyup", function(event) {
      if(this.value !== lastValue) {
        self.filter(this.value);
        lastValue = this.value
      }
    })
  }
  this._transformer.init()
};
InputFilter.prototype.setItemSerializeCallback = function(callback) {
  this._itemSerializeCallback = callback
};
InputFilter.prototype.setData = function(data) {
  this._currentData = this._data = data;
  this.update()
};
InputFilter.prototype.filter = function(term) {
  this._currentData = this._filterData(term);
  this.update()
};
InputFilter.prototype.update = function() {
  this._transformer.applyTransform(this._currentData)
};
InputFilter.prototype.clear = function() {
  this._input.value = "";
  this.filter("")
};
InputFilter.prototype._filterData = function(term) {
  var result = [];
  if(!term || term.length === 0) {
    result = this._data
  }else {
    var needle = term.toUpperCase();
    var i = 0, l = this._data.length;
    var core = null;
    while(i < l) {
      core = this._itemSerializeCallback(this._data[i]);
      if(core.toUpperCase().indexOf(needle) !== -1) {
        result.push(this._data[i])
      }
      i++
    }
  }
  return result
};
tuna.ui.forms.InputFilter = InputFilter;
var Autocomplete = function(target) {
  tuna.ui.forms.InputFilter.call(this, target);
  this.__selectedData = null;
  this.__selectionGroup = new tuna.ui.selection.SelectionGroup(target, null)
};
tuna.utils.extend(Autocomplete, tuna.ui.forms.InputFilter);
Autocomplete.prototype.init = function() {
  tuna.ui.forms.InputFilter.prototype.init.call(this);
  var body = tuna.dom.selectOne(".j-autocomplete-body", this._target);
  var self = this;
  var isOpen = false;
  tuna.dom.addEventListener(this._input, "focus", function(event) {
    if(!isOpen) {
      tuna.dom.addOneEventListener(document.body, "click", function() {
        var data = self.getSelectedData();
        if(data === null) {
          self.clear()
        }
        tuna.dom.addClass(body, "hide");
        isOpen = false
      });
      tuna.dom.removeClass(body, "hide");
      isOpen = true
    }
  });
  tuna.dom.addChildEventListener(this._target, ".j-autocomplete-item", "click", function(event) {
    var index = self.__selectionGroup.getItemIndex(this);
    if(index !== null) {
      self.selectIndex(index)
    }else {
      tuna.dom.stopPropagation(event)
    }
  });
  tuna.dom.addEventListener(this._input, "click", function(event) {
    tuna.dom.stopPropagation(event)
  });
  this.__selectionGroup.setOption("item-selector", ".j-autocomplete-item");
  this.__selectionGroup.init()
};
Autocomplete.prototype.getSelectedData = function() {
  return this.__selectedData
};
Autocomplete.prototype.selectValue = function(value) {
  var filteredData = this._filterData(value);
  if(filteredData.length === 1) {
    this.__selectedData = filteredData[0];
    this._input.value = value;
    this.dispatch("change")
  }
};
Autocomplete.prototype.selectIndex = function(index) {
  if(this._currentData.length > 0) {
    this.__selectedData = this._currentData[index];
    this._input.value = this._itemSerializeCallback(this.__selectedData);
    this.dispatch("change")
  }
};
Autocomplete.prototype.clearSelection = function() {
  if(this.__selectedData !== null) {
    this.__selectedData = null;
    this.dispatch("change")
  }
};
Autocomplete.prototype.update = function() {
  tuna.ui.forms.InputFilter.prototype.update.call(this);
  this.__selectionGroup.updateView();
  this.clearSelection()
};
tuna.ui.forms.Autocomplete = Autocomplete;
tuna.ui.forms.serialize = function(formElement) {
  var result = {};
  var elements = formElement.elements;
  var i = 0, l = elements.length;
  var name = null;
  while(i < l) {
    name = elements[i].name;
    if(result[name] !== undefined) {
      if(!tuna.utils.isArray(result[name])) {
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
  var templateId = this.getStringOption("template-id");
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
TemplateTransformer.prototype.reset = function() {
  var transformHandler = this.__transformHandler;
  this.destroy();
  this.init();
  this.__transformHandler = transformHandler
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
  this._selectionRule = null
};
tuna.utils.implement(AbstractSelectionGroup, tuna.ui.selection.ISelectionGroup);
tuna.utils.extend(AbstractSelectionGroup, tuna.ui.ModuleInstance);
AbstractSelectionGroup.prototype.setIndexEnabled = function(index, isEnabled) {
  this._selectionRule.setIndexEnabled(index, isEnabled)
};
AbstractSelectionGroup.prototype.isIndexEnabled = function(index) {
  return this._selectionRule.isIndexEnabled()
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
  var indexAttribute = this.getStringOption("index-attribute");
  this._itemsCollection = indexAttribute === null ? new tuna.ui.selection.items.ElementsCollection : new tuna.ui.selection.items.NamedElementsCollection(indexAttribute);
  this._selectionView = new tuna.ui.selection.view.ClassSelectionView(this._target);
  this._selectionRule = this._createSelectionRule();
  this._selectionView.setSelectionClass(this.getStringOption("selection-class"));
  this._selectionView.setItemSelector(this.getStringOption("item-selector"));
  this._selectionView.setSelectionRule(this._selectionRule);
  this._selectionView.setItemsCollection(this._itemsCollection);
  this._selectionRule.setEventDispatcher(this);
  this._selectionRule.setItemsCollection(this._itemsCollection);
  this._selectionRule.setSelectionView(this._selectionView);
  this._selectionView.update()
};
SelectionGroup.prototype._createSelectionRule = function() {
  return this.getBooleanOption("is-multiple") ? new tuna.ui.selection.rule.MultipleSelectionRule : new tuna.ui.selection.rule.SingleSelectionRule
};
tuna.ui.selection.SelectionGroup = SelectionGroup;
var Navigation = function(target) {
  tuna.ui.ModuleInstance.call(this, target);
  this.__navigationRule = null;
  this.__menuLinks = {};
  this.__parent = null;
  this.__children = {};
  this.__history = [];
  this.__currentState = null;
  this._setDefaultOption("selection-class", "active");
  this._setDefaultOption("item-selector", ".j-navigation-page");
  this._setDefaultOption("menu-selector", ".j-navigation-menu")
};
tuna.utils.extend(Navigation, tuna.ui.ModuleInstance);
Navigation.prototype.init = function() {
  this.__initNavigation();
  this.__initControls();
  this.__initMenu()
};
Navigation.prototype.__initNavigation = function() {
  this.__navigationRule = new tuna.ui.selection.rule.NavigationSelectionRule;
  var itemsCollection = new tuna.ui.selection.items.NamedElementsCollection("data-name");
  var selectionView = new tuna.ui.selection.view.ClassSelectionView(this._target);
  selectionView.setSelectionClass(this.getStringOption("selection-class"));
  selectionView.setItemSelector(this.getStringOption("item-selector"));
  selectionView.setSelectionRule(this.__navigationRule);
  selectionView.setItemsCollection(itemsCollection);
  this.__navigationRule.setEventDispatcher(this);
  this.__navigationRule.setSelectionView(selectionView);
  this.__navigationRule.setItemsCollection(itemsCollection);
  this.__navigationRule.setNavigation(this);
  selectionView.update()
};
Navigation.prototype.__initControls = function() {
  var self = this;
  var controls = new tuna.ui.buttons.ButtonGroup(this._target);
  controls.setOption("button-selector", ".j-navigation-link");
  controls.setDefaultAction("navigate");
  controls.addEventListener("navigate", function(event, button) {
    event.preventDefault();
    var index = button.getStringOption("href");
    if(index !== null) {
      var data = button.getOptions();
      delete data["href"];
      self.navigate(index, data)
    }
  });
  controls.addEventListener("back", function(event, button) {
    event.preventDefault();
    self.back()
  });
  controls.init()
};
Navigation.prototype.__initMenu = function() {
  var menuSelector = this.getStringOption("menu-selector");
  var buttonSelector = this.getStringOption("button-selector");
  if(menuSelector !== null && buttonSelector !== null) {
    var menu = tuna.dom.selectOne(menuSelector, this._target);
    if(menu !== null) {
      var buttons = tuna.dom.select(buttonSelector, menu);
      var i = 0, l = buttons.length;
      var href = null;
      var index = null;
      var button = null;
      while(i < l) {
        button = tuna.ui.buttons.create(buttons[i]);
        href = button.getStringOption("href");
        if(href !== null) {
          index = href.split("/").shift();
          if(this.__menuLinks[index] === undefined) {
            this.__menuLinks[index] = []
          }
          this.__menuLinks[index].push(button)
        }
        i++
      }
    }
  }
  var currentIndex = this.__navigationRule.getCurrentIndex();
  if(currentIndex !== null) {
    this.__updateMenu(currentIndex, true)
  }
};
Navigation.prototype.__updateMenu = function(path, isSelected) {
  var buttons = this.__menuLinks[path];
  if(buttons !== undefined) {
    var i = 0, l = buttons.length;
    while(i < l) {
      buttons[i].setActive(isSelected);
      i++
    }
  }
};
Navigation.prototype.getCurrentController = function() {
  return this.__navigationRule.getCurrentController()
};
Navigation.prototype.getPathDesc = function() {
  var result = [];
  var index = this.__navigationRule.getCurrentIndex();
  if(index !== null) {
    result.push(index);
    if(this.__children[index] !== undefined) {
      result = result.concat(this.__children[index].getPathDesc())
    }
  }
  return result
};
Navigation.prototype.getRelatedPath = function() {
  var result = [];
  if(this.__parent !== null) {
    result.push(this.getName());
    result = this.__parent.getRelatedPath().concat(result)
  }
  return result
};
Navigation.prototype.getRoot = function() {
  return this.isRoot() ? this : this.__parent.getRoot()
};
Navigation.prototype.isRoot = function() {
  return this.__parent === null
};
Navigation.prototype.back = function() {
  if(this.isRoot()) {
    if(this.__history.length > 0) {
      this.__currentState = this.__history.pop();
      this.navigatePath(this.__currentState.getPath(), this.__currentState.getData());
      window.history.back()
    }
  }else {
    this.getRoot().back()
  }
};
Navigation.prototype.navigate = function(path, data) {
  if(tuna.utils.isArray(path)) {
    if(this.isRoot()) {
      if(this.__currentState === null) {
        this.__currentState = new NavigationState(this.getPathDesc())
      }
      this.navigatePath(path, data);
      this.__history.push(this.__currentState);
      this.__currentState = new NavigationState(this.getPathDesc(), data);
      window.history.pushState(null, "", this.__currentState.serialize())
    }else {
      this.navigatePath(path, data)
    }
  }else {
    var parsedPath = path.split("/");
    if(path.indexOf("/") !== 0) {
      parsedPath = this.getRelatedPath().concat(parsedPath)
    }
    this.getRoot().navigate(parsedPath, data)
  }
};
Navigation.prototype.navigatePath = function(path, data) {
  var index = path.shift();
  while(index === "" && path.length > 0) {
    index = path.shift()
  }
  this.__updateMenu(this.__navigationRule.getCurrentIndex(), false);
  this.__navigationRule.navigate(index, data);
  this.__updateMenu(this.__navigationRule.getCurrentIndex(), true);
  if(this.__children[index] !== undefined) {
    return this.__children[index].navigatePath(path, data)
  }
};
Navigation.prototype.addChild = function(navigation) {
  if(navigation !== null) {
    navigation.setParent(this);
    this.__children[navigation.getName()] = navigation
  }
};
Navigation.prototype.setParent = function(navigation) {
  this.__parent = navigation
};
var NavigationState = function(path, data) {
  this.__path = path;
  this.__data = data || null
};
NavigationState.prototype.serialize = function() {
  var result = "";
  if(this.__data !== null) {
    result = tuna.net.encode(this.__data)
  }
  if(result !== "") {
    result = "?" + result
  }
  return"/" + this.__path.join("/") + result
};
NavigationState.prototype.getPath = function() {
  return tuna.utils.cloneArray(this.__path)
};
NavigationState.prototype.getData = function() {
  return this.__data
};
tuna.ui.selection.Navigation = Navigation;
var Carousel = function(target) {
  tuna.ui.selection.SelectionGroup.call(this, target, null);
  this.__shiftIndex = -1;
  this._setDefaultOption("item-selector", ".j-carousel-item");
  this._setDefaultOption("next-button-selector", ".j-carousel-next");
  this._setDefaultOption("back-button-selector", ".j-carousel-back")
};
tuna.utils.extend(Carousel, tuna.ui.selection.SelectionGroup);
Carousel.prototype.init = function() {
  tuna.ui.selection.SelectionGroup.prototype.init.call(this);
  var self = this;
  this.__shiftIndex = Number(this.getLastSelectedIndex());
  var nextButtonSelector = this.getStringOption("next-button-selector");
  if(nextButtonSelector !== null) {
    tuna.dom.addChildEventListener(this._target, nextButtonSelector, "click", function(event) {
      tuna.dom.preventDefault(event);
      self.next()
    })
  }
  var backButtonSelector = this.getStringOption("back-button-selector");
  if(backButtonSelector !== null) {
    tuna.dom.addChildEventListener(this._target, backButtonSelector, "click", function(event) {
      tuna.dom.preventDefault(event);
      self.back()
    })
  }
};
Carousel.prototype.next = function() {
  this.__shiftIndex++;
  if(this.getItemAt(this.__shiftIndex) === null) {
    this.__shiftIndex = 0
  }
  this.selectIndex(this.__shiftIndex)
};
Carousel.prototype.back = function() {
  this.__shiftIndex--;
  if(this.getItemAt(this.__shiftIndex) === null) {
    this.__shiftIndex = this._itemsCollection.getItemsCount() - 1
  }
  this.selectIndex(this.__shiftIndex)
};
tuna.ui.selection.Carousel = Carousel;
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
ISelectionGroup.prototype.setIndexEnabled = function(index, isEnabled) {
};
ISelectionGroup.prototype.isIndexEnabled = function(index) {
};
tuna.ui.selection.rule.ISelectionRule = ISelectionRule;
var AbstractSelectionRule = function() {
  this._itemsCollection = null;
  this._selectionView = null;
  this._eventDispatcher = null;
  this._disabledIndexes = []
};
tuna.utils.implement(AbstractSelectionRule, tuna.ui.selection.rule.ISelectionRule);
AbstractSelectionRule.prototype.setItemsCollection = function(collection) {
  this._itemsCollection = collection
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
AbstractSelectionRule.prototype.setIndexEnabled = function(index, isEnabled) {
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
AbstractSelectionRule.prototype.isIndexEnabled = function(index) {
  return this._itemsCollection.getItemAt(index) !== null && tuna.utils.indexOf(index, this._disabledIndexes) === -1
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
  if(this.isIndexEnabled(index) && this.__currentIndex !== index && this.__dispatchSelect(index)) {
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
  if(this.isIndexEnabled(index)) {
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
var NavigationSelectionRule = function() {
  tuna.ui.selection.rule.AbstractSelectionRule.call(this);
  this.__currentIndex = null;
  this.__currentController = null;
  this.__navigation = null;
  this.__openData = null
};
tuna.utils.extend(NavigationSelectionRule, tuna.ui.selection.rule.AbstractSelectionRule);
NavigationSelectionRule.prototype.setNavigation = function(navigation) {
  this.__navigation = navigation
};
NavigationSelectionRule.prototype.getSelectedIndexes = function() {
  if(this.__currentIndex !== null) {
    return[this.__currentIndex]
  }
  return[]
};
NavigationSelectionRule.prototype.getCurrentIndex = function() {
  return this.__currentIndex
};
NavigationSelectionRule.prototype.getCurrentController = function() {
  return this.__currentController
};
NavigationSelectionRule.prototype.getOpenData = function() {
  return this.__openData
};
NavigationSelectionRule.prototype.navigate = function(index, data) {
  this.__openData = data;
  return this.selectIndex(index)
};
NavigationSelectionRule.prototype.selectIndex = function(index) {
  var result = false;
  if(this.__currentController === null || this.__currentController instanceof tuna.view.PageViewController && this.__currentController.canClose(index)) {
    if(this.__currentController !== null && this.__currentController instanceof tuna.view.PageViewController) {
      this.__currentController.close()
    }
    if(this.isIndexEnabled(index) && this.__currentIndex !== index) {
      if(this.__currentIndex !== null) {
        this._selectionView.destroySelectionAt(this.__currentIndex);
        this._eventDispatcher.dispatch("close", this.__currentIndex)
      }
      this.__currentIndex = index;
      this.__updateController();
      this._selectionView.applySelectionAt(this.__currentIndex);
      this._eventDispatcher.dispatch("open", this.__currentIndex);
      if(this.__currentController !== null && this.__currentController instanceof tuna.view.PageViewController) {
        this.__currentController.open(this.__openData)
      }
      result = true
    }
  }
  return result
};
NavigationSelectionRule.prototype.__updateController = function() {
  this.__currentController = null;
  if(this.__currentIndex !== null) {
    var page = this._itemsCollection.getItemAt(this.__currentIndex);
    if(page !== null) {
      this.__currentController = tuna.view.getController(page.id)
    }
    if(this.__currentController !== null && !this.__currentController.isActive()) {
      if(this.__currentController instanceof tuna.view.PageViewController) {
        this.__currentController.setNavigation(this.__navigation)
      }
      this.__currentController.bootstrap(page)
    }
  }
};
NavigationSelectionRule.prototype.isSelected = function(index) {
  return index === this.__currentIndex
};
NavigationSelectionRule.prototype.clearSelection = function() {
  if(this.__currentIndex !== null) {
    this._selectionView.destroySelectionAt(this.__currentIndex);
    this.__currentIndex = null
  }
};
tuna.ui.selection.rule.NavigationSelectionRule = NavigationSelectionRule;
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
  this._selectionRule = null
};
tuna.utils.implement(AbstractSelectionView, tuna.ui.selection.view.ISelectionView);
AbstractSelectionView.prototype.setSelectionRule = function(rule) {
  this._selectionRule = rule
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
    this._selectionRule.clearSelection();
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
          this._selectionRule.selectIndex(index)
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
  var selectionEvent = selectionGroup.getStringOption("selection-event");
  var itemSelector = selectionGroup.getStringOption("item-selector");
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
var ButtonGroupModule = function() {
  tuna.ui.Module.call(this, ".j-button-group")
};
tuna.utils.extend(ButtonGroupModule, tuna.ui.Module);
ButtonGroupModule.prototype.initInstance = function(target) {
  return new tuna.ui.buttons.ButtonGroup(target)
};
tuna.ui.modules.register("button-group", new ButtonGroupModule);
var SWFModule = function() {
  tuna.ui.Module.call(this, ".j-swf")
};
tuna.utils.extend(SWFModule, tuna.ui.Module);
SWFModule.prototype.initInstance = function(target) {
  return new tuna.ui.flash.SWF(target)
};
tuna.ui.modules.register("swf", new SWFModule);
var InputFilterModule = function() {
  tuna.ui.Module.call(this, ".j-input-filter")
};
tuna.utils.extend(InputFilterModule, tuna.ui.Module);
InputFilterModule.prototype.initInstance = function(target) {
  return new tuna.ui.forms.InputFilter(target)
};
tuna.ui.modules.register("input-filter", new InputFilterModule);
var AutocompleteModule = function() {
  tuna.ui.Module.call(this, ".j-autocomplete")
};
tuna.utils.extend(AutocompleteModule, tuna.ui.Module);
AutocompleteModule.prototype.initInstance = function(target) {
  return new tuna.ui.forms.Autocomplete(target)
};
tuna.ui.modules.register("autocomplete", new AutocompleteModule);
var CarouselModule = function() {
  tuna.ui.Module.call(this, ".j-carousel")
};
tuna.utils.extend(CarouselModule, tuna.ui.Module);
CarouselModule.prototype.initInstance = function(target) {
  return new tuna.ui.selection.Carousel(target)
};
tuna.ui.modules.register("carousel", new CarouselModule);
tuna.view.__controllerTable = {};
tuna.view.__mainController = null;
tuna.view.setMainController = function(controller) {
  tuna.view.__mainController = controller
};
tuna.view.registerController = function(name, controller) {
  tuna.view.__controllerTable[name] = controller
};
tuna.view.getController = function(name) {
  if(tuna.view.__controllerTable[name] !== undefined) {
    return tuna.view.__controllerTable[name]
  }
  return null
};
tuna.view.init = function() {
  if(document.body !== null) {
    tuna.view.__mainController.bootstrap(document.body)
  }
};
var ViewController = function() {
  this._container = null;
  this._isActive = false
};
tuna.utils.implement(ViewController, tuna.ui.transformers.ITransformHandler);
ViewController.prototype.isActive = function() {
  return this._isActive
};
ViewController.prototype.bootstrap = function(target) {
  this._container = new tuna.ui.ModuleContainer(target);
  this._requireModules();
  this._container.initModules();
  this._initActions();
  this._isActive = true
};
ViewController.prototype.terminate = function() {
  this._destroyActions();
  this._container.destroyModules();
  this._isActive = false
};
ViewController.prototype._requireModules = function() {
};
ViewController.prototype._initActions = function() {
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
var PageViewController = function() {
  tuna.view.ViewController.call(this);
  this._navigation = null
};
tuna.utils.extend(PageViewController, tuna.view.ViewController);
PageViewController.prototype.setNavigation = function(navigation) {
  this._navigation = navigation
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
var view = {};
window["main"] = function() {
  tuna.utils.config.init({"role":["\u0410\u0434\u043c\u0438\u043d", "\u041a\u043e\u043d\u0434\u0438\u0442\u0435\u0440\u0441\u043a\u0430\u044f"], "orderStatus":["\u041d\u0435\u0430\u043a\u0442\u0438\u0432\u0435\u043d", "\u041d\u043e\u0432\u044b\u0439", "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d", "\u041e\u0442\u043a\u043b\u043e\u043d\u0435\u043d"], "deliveryStatus":["\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430", "\u0412&nbsp;\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435", 
  "\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043e"], "paymentStatus":["\u041d\u0435&nbsp;\u043e\u043f\u043b\u0430\u0447\u0435\u043d\u043e", "\u041e\u043f\u043b\u0430\u0447\u0435\u043d\u043e"], "shape":{"round":"\u041a\u0440\u0443\u0433", "rect":"\u041f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a"}});
  tuna.ui.modules.addIsolator("j-control-container");
  tuna.dom.setSelectorEngine(Sizzle);
  tuna.view.init()
};
var MainController = function() {
  tuna.view.ViewController.call(this)
};
tuna.utils.extend(MainController, tuna.view.ViewController);
MainController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("navigation");
  this._container.requireModule("popup");
  this._container.requireModule("form")
};
MainController.prototype._initActions = function() {
  var self = this;
  tuna.rest.call("users.getCurrent", null, function(user) {
    if(user === null) {
      self.__showSignUpPopup()
    }else {
      self.__applyUser(user)
    }
  }, "bakery");
  this.__initSingOutForm()
};
MainController.prototype.__initSingOutForm = function() {
  var form = this._container.getModuleInstanceByName("form", "sign-out");
  form.addEventListener("result", function() {
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
  if(user.role === model.record.User.ROLE_ADMIN) {
    var bakeryForm = this._container.getModuleInstanceByName("form", "bakery-selection");
    bakeryForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var id = bakeryForm.getValue("bakery_id");
      if(id !== undefined) {
        model.currentBakery.set(model.bakeries.getItemById(id))
      }
    });
    var bakeryTransformer = this._container.getModuleInstanceByName("template-transformer", "bakery-selection");
    model.bakeries.addEventListener("update", function(event, bakeries) {
      bakeryTransformer.applyTransform(tuna.model.serialize(bakeries))
    });
    model.bakeries.load()
  }else {
    model.currentBakery.set(user)
  }
  var globalTransformer = this._container.getModuleInstanceByName("template-transformer", "body-container");
  function updateGlobalTransformer() {
    var bakery = model.currentBakery.get();
    globalTransformer.reset();
    globalTransformer.applyTransform({"currentUser":tuna.model.serialize(user), "currentBakery":tuna.model.serialize(bakery)})
  }
  model.currentBakery.addEventListener("update", updateGlobalTransformer);
  var navigation = this._container.getModuleInstanceByName("navigation", "body-container");
  navigation.addEventListener("open", function(event, index) {
    if(index === "dimensions") {
      updateGlobalTransformer()
    }
  });
  updateGlobalTransformer();
  model.dimensions.load()
};
tuna.view.setMainController(new MainController);
var DimensionsController = function() {
  tuna.view.PageViewController.call(this)
};
tuna.utils.extend(DimensionsController, tuna.view.PageViewController);
DimensionsController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("button-group");
  this._container.requireModule("navigation");
  this._container.requireModule("form")
};
DimensionsController.prototype._initActions = function() {
  this._navigation.addChild(this._container.getModuleInstanceByName("navigation", "dimensions"));
  var self = this;
  var dimensionsTransformer = this._container.getModuleInstanceByName("template-transformer", "dimensions-list");
  model.dimensions.addEventListener("update", function(event, dimensions) {
    dimensionsTransformer.applyTransform(tuna.model.serialize(dimensions))
  });
  dimensionsTransformer.applyTransform(tuna.model.serialize(model.dimensions.get()));
  var dimensionsForm = this._container.getModuleInstanceByName("form", "dimensions-list");
  dimensionsForm.addEventListener("result", function(event, bakery) {
    model.bakeries.addItem(bakery);
    model.currentBakery.set(bakery)
  })
};
tuna.view.registerController("dimensions_page", new DimensionsController);
var RecipesController = function() {
  tuna.view.PageViewController.call(this);
  this.__loadRecipes = tuna.utils.bind(this.__loadRecipes, this)
};
tuna.utils.extend(RecipesController, tuna.view.PageViewController);
RecipesController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("button-group");
  this._container.requireModule("navigation");
  this._container.requireModule("form")
};
RecipesController.prototype._initActions = function() {
  this._navigation.addChild(this._container.getModuleInstanceByName("navigation", "recipes"));
  var self = this;
  var recipeControls = this._container.getModuleInstanceByName("button-group", "recipe-table");
  recipeControls.addEventListener("delete", function(event, button) {
    self.__deleteRecipe(button)
  });
  var recipeListTransformer = this._container.getModuleInstanceByName("template-transformer", "recipe-table");
  model.recipes.addEventListener("update", function(event, recipes) {
    recipeListTransformer.applyTransform(tuna.model.serialize(recipes))
  })
};
RecipesController.prototype.open = function() {
  model.currentBakery.addEventListener("update", this.__loadRecipes);
  this.__loadRecipes()
};
RecipesController.prototype.close = function() {
  model.currentBakery.removeEventListener("update", this.__loadRecipes)
};
RecipesController.prototype.__loadRecipes = function() {
  var bakery = model.currentBakery.get();
  if(bakery !== null) {
    model.recipes.load({"bakery_id":bakery.id})
  }
};
RecipesController.prototype.__deleteRecipe = function(button) {
  if(confirm("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0440\u0435\u0446\u0435\u043f\u0442?")) {
    var recipeId = button.getStringOption("recipe-id");
    tuna.rest.call("recipes.remove", {"recipe_id":recipeId}, function() {
      model.recipes.removeItemById(recipeId)
    });
    button.setEnabled(false)
  }
};
tuna.view.registerController("recipes_page", new RecipesController);
var AddRecipeController = function() {
  tuna.view.PageViewController.call(this);
  this.__addRecipeForm = null
};
tuna.utils.extend(AddRecipeController, tuna.view.PageViewController);
AddRecipeController.prototype._requireModules = function() {
  this._container.requireModule("form")
};
AddRecipeController.prototype._initActions = function() {
  var self = this;
  this.__addRecipeForm = this._container.getModuleInstanceByName("form", "add-recipe");
  this.__addRecipeForm.addEventListener("result", function(event, recipe) {
    model.recipes.addItem(recipe);
    self.__addRecipeForm.reset();
    self._navigation.back()
  })
};
tuna.view.registerController("add_recipe_page", new AddRecipeController);
var EditRecipeController = function() {
  tuna.view.PageViewController.call(this);
  this.__recipeFormTransformer = null;
  this.__recipeForm = null
};
tuna.utils.extend(EditRecipeController, tuna.view.PageViewController);
EditRecipeController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("form")
};
EditRecipeController.prototype._initActions = function() {
  var self = this;
  this.__recipeFormTransformer = this._container.getModuleInstanceByName("template-transformer", "edit-recipe-form");
  this.__recipeForm = this._container.getModuleInstanceByName("form", "edit-recipe-form");
  this.__recipeForm.addEventListener("result", function(event, recipe) {
    self._navigation.back();
    model.resource.recipes.addRecipe(recipe)
  })
};
EditRecipeController.prototype.open = function(data) {
  var dimensions = model.dimensions.get();
  var recipe = model.recipes.getItemById(data["recipe-id"]);
  var bakery = model.currentBakery.get();
  if(dimensions !== null && bakery !== null && recipe !== null) {
    var weights = [];
    var i = 0, l = dimensions.length;
    var dimension = null;
    while(i < l) {
      dimension = dimensions[i];
      if(tuna.utils.indexOf(dimension.weight, weights) === -1 && tuna.utils.indexOf(dimension.id, bakery.dimensionIds) !== -1) {
        weights.push(dimension.weight)
      }
      i++
    }
    this.__recipeFormTransformer.applyTransform(recipe.serialize(weights.sort()))
  }
};
tuna.view.registerController("edit_recipe_page", new EditRecipeController);
var OrdersController = function() {
  tuna.view.PageViewController.call(this);
  this.__loadOrders = tuna.utils.bind(this.__loadOrders, this)
};
tuna.utils.extend(OrdersController, tuna.view.PageViewController);
OrdersController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("navigation")
};
OrdersController.prototype._initActions = function() {
  this._navigation.addChild(this._container.getModuleInstanceByName("navigation", "orders"));
  var ordersListTransformer = this._container.getModuleInstanceByName("template-transformer", "orders-list");
  model.orders.addEventListener("update", function(event, orders) {
    ordersListTransformer.applyTransform(tuna.model.serialize(orders))
  })
};
OrdersController.prototype.open = function() {
  model.currentBakery.addEventListener("update", this.__loadOrders);
  this.__loadOrders()
};
OrdersController.prototype.close = function() {
  model.currentBakery.removeEventListener("update", this.__loadOrders)
};
OrdersController.prototype.__loadOrders = function() {
  var bakery = model.currentBakery.get();
  if(bakery !== null) {
    model.orders.load({"bakery_id":bakery.id})
  }
};
tuna.view.registerController("orders_page", new OrdersController);
var EditOrdersController = function() {
  tuna.view.PageViewController.call(this);
  this.__orderFormTransformer = null;
  this.__orderForm = null
};
tuna.utils.extend(EditOrdersController, tuna.view.PageViewController);
EditOrdersController.prototype._requireModules = function() {
  this._container.requireModule("template-transformer");
  this._container.requireModule("form")
};
EditOrdersController.prototype._initActions = function() {
  var self = this;
  this.__orderFormTransformer = this._container.getModuleInstanceByName("template-transformer", "edit-order-form");
  this.__orderForm = this._container.getModuleInstanceByName("form", "edit-order-form");
  this.__orderForm.addEventListener("result", function(event, order) {
    self._navigation.back();
    model.orders.addItem(order)
  })
};
EditOrdersController.prototype.open = function(data) {
  var order = model.orders.getItemById(data["order-id"]);
  if(order !== null) {
    this.__orderFormTransformer.applyTransform(order.serialize());
    this.__orderForm.setValue("status", order.status);
    this.__orderForm.setValue("delivery_status", order.deliveryStatus);
    this.__orderForm.setValue("payment_status", order.paymentStatus)
  }
};
tuna.view.registerController("edit_order_page", new EditOrdersController);
var User = function(data) {
  this.name = "";
  this.email = "";
  this.role = -1;
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(User, tuna.model.Record);
User.prototype.populate = function(data) {
  this.id = data["id"];
  this.name = data["name"];
  this.email = data["email"];
  this.role = data["role"]
};
User.prototype.serialize = function() {
  return{"id":this.id, "email":this.email, "role":this.role, "roleName":tuna.utils.config.get("role")[this.role]}
};
model.record.User = User;
model.record.User.ROLE_ADMIN = 0;
model.record.User.ROLE_BAKERY = 1;
tuna.model.recordFactory.registerRecord("user", new model.record.User);
var Bakery = function(data) {
  this.city = "";
  this.deliveryPrice = 0;
  this.dimensionIds = null;
  model.record.User.call(this, data)
};
tuna.utils.extend(Bakery, model.record.User);
Bakery.prototype.populate = function(data) {
  model.record.User.prototype.populate.call(this, data);
  this.city = data["city"] && data["city"]["name"] || null;
  this.deliveryPrice = data["delivery_price"] || null;
  this.dimensionIds = data["available_dimension_ids"] || null
};
Bakery.prototype.serialize = function() {
  var result = model.record.User.prototype.serialize.call(this);
  result["name"] = this.city;
  result["deliveryPrice"] = this.deliveryPrice;
  result["dimensionIds"] = this.dimensionIds;
  return result
};
model.record.Bakery = Bakery;
tuna.model.recordFactory.registerRecord("bakery", new model.record.Bakery);
var Recipe = function(data) {
  this.id = "";
  this.bakeryId = "";
  this.name = "";
  this.desc = "";
  this.imageUrl = "";
  this.dimentionPrices = null;
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Recipe, tuna.model.Record);
Recipe.prototype.populate = function(data) {
  this.id = data["id"];
  this.bakeryId = data["bakery_id"];
  this.name = data["name"];
  this.desc = data["desc"];
  this.imageUrl = data["image_url"];
  this.dimentionPrices = data["dimension_prices"] || null
};
Recipe.prototype.serialize = function(weights) {
  var result = {"id":this.id, "bakeryId":this.bakeryId, "name":this.name, "desc":this.desc, "imageUrl":this.imageUrl, "dimensionPrices":this.dimentionPrices};
  if(weights !== undefined) {
    var prices = [];
    var i = 0, l = weights.length;
    var weightKey = null;
    var price = null;
    while(i < l) {
      price = {"weight":weights[i]};
      if(this.dimentionPrices !== null) {
        weightKey = (weights[i] + "").replace(".", "_");
        if(this.dimentionPrices[weightKey] !== undefined) {
          price["price"] = this.dimentionPrices[weightKey]["price"]
        }
      }
      prices.push(price);
      i++
    }
    result["dimensionPrices"] = prices
  }
  return result
};
model.record.Recipe = Recipe;
tuna.model.recordFactory.registerRecord("recipe", new model.record.Recipe);
var Delivery = function(data) {
  this.date = null;
  this.address = "";
  this.comment = "";
  this.message = "";
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Delivery, tuna.model.Record);
Delivery.prototype.populate = function(data) {
  this.date = new Date(data["date"] * 1E3);
  this.address = data["address"];
  this.comment = data["comment"];
  this.message = data["message"]
};
Delivery.prototype.serialize = function() {
  return{"date":this.date && tuna.model.serializeDate(this.date), "address":this.address, "comment":this.comment, "message":this.message}
};
model.record.Delivery = Delivery;
tuna.model.recordFactory.registerRecord("delivery", new model.record.Delivery);
var Client = function(data) {
  this.name = "";
  this.email = "";
  this.phone = "";
  this.network = 0;
  this.networkId = "";
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Client, tuna.model.Record);
Client.prototype.populate = function(data) {
  this.name = data["name"];
  this.email = data["email"];
  this.phone = data["phone"];
  this.network = data["network"];
  this.networkId = data["network_id"]
};
Client.prototype.serialize = function() {
  return{"name":this.name, "email":this.email, "phone":this.phone, "network":this.network, "networkId":this.networkId}
};
model.record.Client = Client;
model.record.Client.NETWORK_NONE = 0;
model.record.Client.NETWORK_VK = 1;
model.record.Client.NETWORK_OK = 2;
tuna.model.recordFactory.registerRecord("client", new model.record.Client);
var Payment = function(data) {
  this.paymentMethod = 0;
  this.decorationPrice = 0;
  this.deliveryPrice = 0;
  this.recipePrice = 0;
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Payment, tuna.model.Record);
Payment.prototype.populate = function(data) {
  this.paymentMethod = data["payment_method"];
  this.decorationPrice = data["decoration_price"];
  this.deliveryPrice = data["delivery_price"];
  this.recipePrice = data["recipe_price"]
};
Payment.prototype.serialize = function() {
  return{"paymentMethod":this.paymentMethod, "decorationPrice":this.decorationPrice, "deliveryPrice":this.deliveryPrice, "recipePrice":this.recipePrice, "totalPrice":this.recipePrice + this.deliveryPrice + this.decorationPrice}
};
model.record.Payment = Payment;
tuna.model.recordFactory.registerRecord("payment", new model.record.Payment);
var Dimension = function(data) {
  this.id = "";
  this.weight = 0;
  this.shape = "";
  this.ratio = 0;
  this.personsCount = 0;
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Dimension, tuna.model.Record);
Dimension.prototype.populate = function(data) {
  this.id = data["id"];
  this.weight = data["weight"];
  this.shape = data["shape"];
  this.ratio = data["ratio"];
  this.personsCount = data["persons_count"]
};
Dimension.prototype.serialize = function() {
  return{"id":this.id, "weight":this.weight, "shape":this.shape, "shapeName":tuna.utils.config.get("shape")[this.shape], "ratio":this.ratio, "personsCount":this.personsCount}
};
model.record.Dimension = Dimension;
tuna.model.recordFactory.registerRecord("dimension", new model.record.Dimension);
var Cake = function(data) {
  this.imageUrl = "";
  this.photoUrl = "";
  this.dimension = null;
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Cake, tuna.model.Record);
Cake.prototype.populate = function(data) {
  this.imageUrl = data["image_url"];
  this.photoUrl = data["photo_url"] || null;
  this.dimension = new model.record.Dimension(data["dimension"])
};
Cake.prototype.serialize = function() {
  return{"imageUrl":this.imageUrl, "photoUrl":this.photoUrl, "dimension":this.dimension.serialize()}
};
model.record.Cake = Cake;
tuna.model.recordFactory.registerRecord("cake", new model.record.Cake);
var Order = function(data) {
  this.id = "";
  this.index = 0;
  this.date = null;
  this.bakery = null;
  this.recipe = null;
  this.cake = null;
  this.payment = null;
  this.client = null;
  this.delivery = null;
  this.status = 0;
  this.paymentStatus = 0;
  this.deliveryStatus = 0;
  tuna.model.Record.call(this, data)
};
tuna.utils.extend(Order, tuna.model.Record);
Order.prototype.populate = function(data) {
  this.id = data["id"];
  this.cake = new model.record.Cake(data["cake"]);
  this.bakery = new model.record.Bakery(data["bakery"]);
  this.client = new model.record.Client(data["client"]);
  this.recipe = new model.record.Recipe(data["recipe"]);
  this.payment = new model.record.Payment(data["payment"]);
  this.delivery = new model.record.Delivery(data["delivery"]);
  this.status = data["status"];
  this.paymentStatus = data["payment_status"];
  this.deliveryStatus = data["delivery_status"];
  this.index = parseInt(this.id.substr(this.id.length - 8).split("0").join(""), 16);
  this.date = new Date(1E3 * parseInt(this.id.substr(0, 8), 16))
};
Order.prototype.serialize = function() {
  return{"id":this.id, "index":this.index, "date":this.date && tuna.model.serializeDate(this.date), "bakery":this.bakery.serialize(), "cake":this.cake.serialize(), "payment":this.payment.serialize(), "client":this.client.serialize(), "delivery":this.delivery.serialize(), "recipe":this.recipe.serialize(), "status":this.status, "paymentStatus":this.paymentStatus, "deliveryStatus":this.deliveryStatus, "statusName":tuna.utils.config.get("orderStatus")[this.status], "paymentStatusName":tuna.utils.config.get("paymentStatus")[this.paymentStatus], 
  "deliveryStatusName":tuna.utils.config.get("deliveryStatus")[this.deliveryStatus]}
};
model.record.Order = Order;
tuna.model.recordFactory.registerRecord("order", new model.record.Order);
model.bakeries = new tuna.model.ListResource("users.getBakeries", "bakery");
model.recipes = new tuna.model.ListResource("recipes.get", "recipe");
model.orders = new tuna.model.ListResource("orders.get", "order");
model.dimensions = new tuna.model.ListResource("dimensions.get", "dimension");
model.currentBakery = new tuna.model.ItemResource;
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

