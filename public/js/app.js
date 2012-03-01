var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $JSCompiler_emptyFn$$() {
  return function() {
  }
}
function $JSCompiler_set$$($JSCompiler_set_name$$) {
  return function($JSCompiler_set_value$$) {
    this[$JSCompiler_set_name$$] = $JSCompiler_set_value$$
  }
}
var $JSCompiler_prototypeAlias$$, $tuna$IS_IE$$ = !!eval("'\v' == 'v'");
function $tuna$utils$implement$$($Class$$, $Interface$$) {
  for(var $method$$2$$ in $Interface$$.prototype) {
    "function" === typeof $Interface$$.prototype[$method$$2$$] && ($Class$$.prototype[$method$$2$$] = $Interface$$.prototype[$method$$2$$])
  }
}
function $tuna$utils$extend$$($Class$$1$$, $Parent$$) {
  function $Link$$() {
  }
  $Link$$.prototype = $Parent$$.prototype;
  $Class$$1$$.prototype = new $Link$$;
  $Class$$1$$.prototype.constructor = $Class$$1$$
}
function $tuna$utils$indexOf$$($element$$7$$, $array$$10$$) {
  if($array$$10$$.indexOf !== $JSCompiler_alias_VOID$$) {
    return $array$$10$$.indexOf($element$$7$$)
  }
  for(var $i$$1$$ = 0, $l$$ = $array$$10$$.length;$i$$1$$ < $l$$;) {
    if($array$$10$$[$i$$1$$] === $element$$7$$) {
      return $i$$1$$
    }
    $i$$1$$++
  }
  return-1
}
function $Config$$() {
  this.$__data$ = $JSCompiler_alias_NULL$$
}
$Config$$.prototype.$init$ = $JSCompiler_set$$("$__data$");
var $tuna$utils$config$$ = new $Config$$;
function $tuna$dom$__addCustomIEListener$$($element$$8$$, $type$$47$$, $handler$$3$$) {
  $element$$8$$.$__customListener$ == $JSCompiler_alias_VOID$$ && ($element$$8$$.$__customListener$ = function $$element$$8$$$$__customListener$$($event$$3$$) {
    if($event$$3$$.$__type$ !== $JSCompiler_alias_VOID$$) {
      var $handlers_type$$48$$ = $event$$3$$.$__type$;
      delete $event$$3$$.$__type$;
      var $handlers_type$$48$$ = $element$$8$$["__" + $handlers_type$$48$$], $i$$3$$;
      for($i$$3$$ in $handlers_type$$48$$) {
        $handlers_type$$48$$[$i$$3$$].call($element$$8$$, $event$$3$$)
      }
    }
  }, $element$$8$$.attachEvent("onhelp", $element$$8$$.$__customListener$));
  $element$$8$$["__" + $type$$47$$] === $JSCompiler_alias_VOID$$ && ($element$$8$$["__" + $type$$47$$] = []);
  $element$$8$$["__" + $type$$47$$].push($handler$$3$$)
}
var $tuna$dom$__selectorEngine$$ = $JSCompiler_alias_NULL$$;
function $tuna$dom$select$$($selector$$, $context$$2$$) {
  return $tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$ ? $tuna$dom$__selectorEngine$$($selector$$, $context$$2$$) : $JSCompiler_alias_NULL$$
}
function $tuna$dom$selectOne$$($selector$$2$$, $context$$3$$) {
  if($tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$) {
    var $result$$2$$ = $tuna$dom$__selectorEngine$$($selector$$2$$, $context$$3$$);
    if(0 < $result$$2$$.length) {
      return $result$$2$$[0]
    }
  }
  return $JSCompiler_alias_NULL$$
}
function $tuna$dom$addChildEventListener$$($element$$11$$, $childSelector$$, $type$$51$$, $handler$$5$$) {
  $tuna$dom$addEventListener$$($element$$11$$, $type$$51$$, function($event$$5$$) {
    var $eventTarget$$ = $event$$5$$.target || $event$$5$$.srcElement, $target$$36$$ = $tuna$dom$__selectorEngine$$.matches($childSelector$$, [$eventTarget$$])[0];
    $target$$36$$ === $JSCompiler_alias_VOID$$ && ($target$$36$$ = $tuna$dom$getParentMatches$$($eventTarget$$, $childSelector$$, $element$$11$$));
    $target$$36$$ !== $JSCompiler_alias_NULL$$ && $handler$$5$$.call($target$$36$$, $event$$5$$)
  })
}
function $tuna$dom$addEventListener$$($element$$12$$, $type$$52$$, $handler$$6$$) {
  if($element$$12$$.addEventListener !== $JSCompiler_alias_VOID$$) {
    $element$$12$$.addEventListener($type$$52$$, $handler$$6$$, $JSCompiler_alias_FALSE$$)
  }else {
    if($element$$12$$.attachEvent !== $JSCompiler_alias_VOID$$) {
      var $eventName$$ = "on" + $type$$52$$;
      $element$$12$$[$eventName$$] === $JSCompiler_alias_VOID$$ ? $tuna$dom$__addCustomIEListener$$($element$$12$$, $type$$52$$, $handler$$6$$) : $element$$12$$.attachEvent($eventName$$, $handler$$6$$)
    }
  }
}
function $tuna$dom$addOneEventListener$$($handler$$7$$) {
  function $listener$$26$$($event$$6_handler$$inline_15$$) {
    $handler$$7$$.call($element$$13$$, $event$$6_handler$$inline_15$$);
    $event$$6_handler$$inline_15$$ = $listener$$26$$;
    if($element$$13$$.removeEventListener !== $JSCompiler_alias_VOID$$) {
      $element$$13$$.removeEventListener("click", $event$$6_handler$$inline_15$$, $JSCompiler_alias_FALSE$$)
    }else {
      if($element$$13$$.detachEvent !== $JSCompiler_alias_VOID$$) {
        if($element$$13$$.onclick === $JSCompiler_alias_VOID$$) {
          var $handlers$$inline_315$$ = $element$$13$$.__click;
          if($handlers$$inline_315$$ !== $JSCompiler_alias_VOID$$) {
            for(var $i$$inline_316$$ = $handlers$$inline_315$$.length - 1;0 <= $i$$inline_316$$;) {
              $handlers$$inline_315$$[$i$$inline_316$$] === $event$$6_handler$$inline_15$$ && $handlers$$inline_315$$.splice($i$$inline_316$$, 1), $i$$inline_316$$--
            }
          }
        }else {
          $element$$13$$.detachEvent("onclick", $event$$6_handler$$inline_15$$)
        }
      }
    }
  }
  var $element$$13$$ = document.body;
  $tuna$dom$addEventListener$$($element$$13$$, "click", $listener$$26$$)
}
function $tuna$dom$preventDefault$$($event$$8$$) {
  $event$$8$$.preventDefault !== $JSCompiler_alias_VOID$$ ? $event$$8$$.preventDefault() : $event$$8$$.returnValue = $JSCompiler_alias_FALSE$$
}
function $tuna$dom$stopPropagation$$($event$$9$$) {
  $event$$9$$.stopPropagation !== $JSCompiler_alias_VOID$$ ? $event$$9$$.stopPropagation() : $event$$9$$.cancelBubble = $JSCompiler_alias_TRUE$$
}
function $tuna$dom$getParentMatches$$($element$$17_parent$$4$$, $selector$$3$$, $context$$4$$) {
  for($element$$17_parent$$4$$ = $element$$17_parent$$4$$.parentNode;$element$$17_parent$$4$$ !== $JSCompiler_alias_NULL$$ && $element$$17_parent$$4$$ !== $context$$4$$ && 0 === $tuna$dom$__selectorEngine$$.matches($selector$$3$$, [$element$$17_parent$$4$$]).length;) {
    $element$$17_parent$$4$$ = $element$$17_parent$$4$$.parentNode
  }
  return $element$$17_parent$$4$$ === $context$$4$$ ? $JSCompiler_alias_NULL$$ : $element$$17_parent$$4$$
}
function $tuna$dom$hasClass$$($element$$19$$, $className$$2$$) {
  return $element$$19$$.classList !== $JSCompiler_alias_VOID$$ ? $element$$19$$.classList.contains($className$$2$$) : $element$$19$$.className !== $JSCompiler_alias_VOID$$ ? $element$$19$$.className.match(RegExp("(\\s|^)" + $className$$2$$ + "(\\s|$)")) !== $JSCompiler_alias_NULL$$ : $JSCompiler_alias_FALSE$$
}
function $tuna$dom$addClass$$($element$$20$$, $className$$3$$) {
  $element$$20$$.classList !== $JSCompiler_alias_VOID$$ ? $element$$20$$.classList.add($className$$3$$) : $tuna$dom$hasClass$$($element$$20$$, $className$$3$$) || ($element$$20$$.className += " " + $className$$3$$)
}
function $tuna$dom$removeClass$$($element$$21$$, $className$$4$$) {
  $element$$21$$.classList !== $JSCompiler_alias_VOID$$ ? $element$$21$$.classList.remove($className$$4$$) : $tuna$dom$hasClass$$($element$$21$$, $className$$4$$) && ($element$$21$$.className = $element$$21$$.className.replace(RegExp("(\\s|^)" + $className$$4$$ + "(\\s|$)"), " "))
}
function $tuna$dom$setClassExist$$($element$$22$$, $className$$5$$, $isExist$$) {
  !$isExist$$ && $tuna$dom$hasClass$$($element$$22$$, $className$$5$$) ? $tuna$dom$removeClass$$($element$$22$$, $className$$5$$) : $isExist$$ && !$tuna$dom$hasClass$$($element$$22$$, $className$$5$$) && $tuna$dom$addClass$$($element$$22$$, $className$$5$$)
}
;function $BasicEvent$$($type$$56$$, $isBubbling$$) {
  this.$_target$ = $JSCompiler_alias_NULL$$;
  this.$_type$ = $type$$56$$;
  this.$_isBubbling$ = !!$isBubbling$$;
  this.$_isImmediateStopped$ = this.$_isStopped$ = this.$_isCanceled$ = $JSCompiler_alias_FALSE$$
}
$BasicEvent$$.prototype.$setTarget$ = $JSCompiler_set$$("$_target$");
$BasicEvent$$.prototype.preventDefault = function $$BasicEvent$$$$preventDefault$() {
  this.$_isCanceled$ = $JSCompiler_alias_TRUE$$
};
$BasicEvent$$.prototype.stopPropagation = function $$BasicEvent$$$$stopPropagation$() {
  this.$_isStopped$ = $JSCompiler_alias_TRUE$$
};
function $IEventDispatcher$$() {
}
$IEventDispatcher$$.prototype.$dispatch$ = $JSCompiler_emptyFn$$();
$IEventDispatcher$$.prototype.addEventListener = $JSCompiler_emptyFn$$();
$IEventDispatcher$$.prototype.removeEventListener = $JSCompiler_emptyFn$$();
$IEventDispatcher$$.prototype.$hasEventListener$ = $JSCompiler_emptyFn$$();
function $EventDispatcher$$($parent$$6$$) {
  this.$_propagationParent$ = $parent$$6$$ || $JSCompiler_alias_NULL$$;
  this.$_listeners$ = {}
}
$tuna$utils$implement$$($EventDispatcher$$, $IEventDispatcher$$);
$EventDispatcher$$.prototype.$dispatch$ = function $$EventDispatcher$$$$$dispatch$$($event$$11$$, $data$$22$$) {
  $event$$11$$ instanceof $BasicEvent$$ || ($event$$11$$ = new $BasicEvent$$($event$$11$$));
  var $type$$60$$ = $event$$11$$.$_type$;
  if(this.$_listeners$[$type$$60$$] !== $JSCompiler_alias_VOID$$) {
    $event$$11$$.$_target$ === $JSCompiler_alias_NULL$$ && $event$$11$$.$setTarget$(this);
    for(var $i$$7$$ = 0, $l$$4$$ = this.$_listeners$[$type$$60$$].length;$i$$7$$ < $l$$4$$;) {
      this.$_listeners$[$type$$60$$][$i$$7$$].call(this, $event$$11$$, $data$$22$$);
      if($event$$11$$.$_isImmediateStopped$) {
        break
      }
      $i$$7$$++
    }
    this.$_propagationParent$ !== $JSCompiler_alias_NULL$$ && $event$$11$$.$_isBubbling$ && !$event$$11$$.$_isImmediateStopped$ && !$event$$11$$.$_isStopped$ && this.$_propagationParent$.$dispatch$($event$$11$$)
  }
  return!$event$$11$$.$_isCanceled$
};
$EventDispatcher$$.prototype.addEventListener = function $$EventDispatcher$$$$addEventListener$($type$$61$$, $listener$$30$$) {
  this.$_listeners$[$type$$61$$] === $JSCompiler_alias_VOID$$ ? this.$_listeners$[$type$$61$$] = [$listener$$30$$] : this.$hasEventListener$($type$$61$$, $listener$$30$$) || this.$_listeners$[$type$$61$$].push($listener$$30$$)
};
$EventDispatcher$$.prototype.removeEventListener = function $$EventDispatcher$$$$removeEventListener$($type$$62$$, $listener$$31$$) {
  if(this.$_listeners$[$type$$62$$] !== $JSCompiler_alias_VOID$$) {
    var $listenerIndex$$ = $tuna$utils$indexOf$$($listener$$31$$, this.$_listeners$[$type$$62$$]);
    -1 !== $listenerIndex$$ && this.$_listeners$[$type$$62$$].splice($listenerIndex$$, 1)
  }
};
$EventDispatcher$$.prototype.$hasEventListener$ = function $$EventDispatcher$$$$$hasEventListener$$($type$$63$$, $listener$$32$$) {
  return this.$_listeners$[$type$$63$$] !== $JSCompiler_alias_VOID$$ ? -1 !== $tuna$utils$indexOf$$($listener$$32$$, this.$_listeners$[$type$$63$$]) : $JSCompiler_alias_FALSE$$
};
function $IRequest$$() {
}
$tuna$utils$extend$$($IRequest$$, $IEventDispatcher$$);
$IRequest$$.prototype.send = $JSCompiler_emptyFn$$();
$IRequest$$.prototype.abort = $JSCompiler_emptyFn$$();
function $Request$$($url$$22$$) {
  $EventDispatcher$$.call(this);
  this.$__url$ = $url$$22$$ || "/";
  this.$isSync$ = $JSCompiler_alias_FALSE$$;
  this.method = "GET";
  this.headers = [];
  this.$__request$ = this.$__response$ = this.$__data$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$implement$$($Request$$, $IRequest$$);
$tuna$utils$extend$$($Request$$, $EventDispatcher$$);
$Request$$.prototype.setData = $JSCompiler_set$$("$__data$");
$Request$$.prototype.send = function $$Request$$$$send$() {
  var $i$$8_requestURL_sendData$$ = this.$__url$;
  this.$__request$ !== $JSCompiler_alias_NULL$$ && this.$__request$.abort();
  var $request$$1$$ = !$tuna$IS_IE$$ ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
  if(!this.$isSync$) {
    var $self$$1$$ = this;
    $request$$1$$.onreadystatechange = function $$request$$1$$$onreadystatechange$() {
      4 === $request$$1$$.readyState && ($self$$1$$.$__response$ = $request$$1$$.responseText, $self$$1$$.$dispatch$("complete", $self$$1$$.$__response$), $request$$1$$.abort())
    }
  }
  var $dataString$$ = $Request$__splitData$$(this.$__data$).join("&");
  "GET" === this.method && "" !== $dataString$$ && ($i$$8_requestURL_sendData$$ += (-1 === $i$$8_requestURL_sendData$$.indexOf("?") ? "?" : "&") + $dataString$$);
  $request$$1$$.open(this.method, encodeURI($i$$8_requestURL_sendData$$), !this.$isSync$);
  for($i$$8_requestURL_sendData$$ = this.headers.length - 1;0 <= $i$$8_requestURL_sendData$$;) {
    $request$$1$$.setRequestHeader(this.headers[$i$$8_requestURL_sendData$$].name, this.headers[$i$$8_requestURL_sendData$$].value), $i$$8_requestURL_sendData$$--
  }
  $i$$8_requestURL_sendData$$ = $JSCompiler_alias_NULL$$;
  "POST" === this.method && ($request$$1$$.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), $i$$8_requestURL_sendData$$ = $dataString$$);
  $request$$1$$.send($i$$8_requestURL_sendData$$);
  this.$isSync$ && (this.$__response$ = $request$$1$$.responseText, this.$dispatch$("complete", this.$__response$));
  this.$__request$ = $request$$1$$
};
$Request$$.prototype.abort = function $$Request$$$$abort$() {
  this.$__request$ !== $JSCompiler_alias_NULL$$ && this.$__request$.abort()
};
function $Request$__splitData$$($object$$2$$, $path$$3$$) {
  var $result$$6$$ = [];
  $path$$3$$ === $JSCompiler_alias_VOID$$ && ($path$$3$$ = []);
  if($object$$2$$ !== $JSCompiler_alias_NULL$$ && !($object$$2$$ instanceof Function)) {
    if($object$$2$$ instanceof Object) {
      for(var $key$$15$$ in $object$$2$$) {
        $result$$6$$ = $result$$6$$.concat($Request$__splitData$$($object$$2$$[$key$$15$$], 0 === $path$$3$$.length ? [$key$$15$$] : ($path$$3$$.join(",") + "," + $key$$15$$).split(",")))
      }
    }else {
      $result$$6$$ = [$path$$3$$.shift() + (0 < $path$$3$$.length ? "[" + $path$$3$$.join("][") + "]=" : "=") + encodeURIComponent("" + $object$$2$$)]
    }
  }
  return $result$$6$$
}
;function $Record$$() {
}
$Record$$.prototype.$clone$ = function $$Record$$$$$clone$$() {
  var $clone$$ = new this.constructor, $param$$;
  for($param$$ in this) {
    this.hasOwnProperty($param$$) && ($clone$$[$param$$] = this[$param$$])
  }
  return $clone$$
};
$Record$$.prototype.$populate$ = $JSCompiler_emptyFn$$();
$Record$$.prototype.$serialize$ = $JSCompiler_emptyFn$$();
var $tuna$model$recordFactory$$ = new function() {
  this.$__records$ = {}
};
function $tuna$model$serializeArray$$($records$$) {
  for(var $result$$7$$ = [], $i$$9$$ = 0, $l$$5$$ = $records$$.length;$i$$9$$ < $l$$5$$;) {
    $result$$7$$.push($records$$[$i$$9$$].$serialize$()), $i$$9$$++
  }
  return $result$$7$$
}
;function $IMethod$$() {
}
$IMethod$$.prototype.call = $JSCompiler_emptyFn$$();
$IMethod$$.prototype.$clone$ = $JSCompiler_emptyFn$$();
function $Method$$($name$$55$$) {
  $EventDispatcher$$.call(this);
  this.$_name$ = $name$$55$$ || $JSCompiler_alias_NULL$$
}
$tuna$utils$implement$$($Method$$, $IMethod$$);
$tuna$utils$extend$$($Method$$, $EventDispatcher$$);
$Method$$.prototype.call = $JSCompiler_emptyFn$$();
$Method$$.prototype.$clone$ = function $$Method$$$$$clone$$() {
  return new this.constructor(this.$_name$)
};
function $IMethodFactory$$() {
}
$IMethodFactory$$.prototype.$createMethod$ = $JSCompiler_emptyFn$$();
function $MethodFactory$$() {
  this.$__methods$ = {};
  this.$__commonFactory$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$implement$$($MethodFactory$$, $IMethodFactory$$);
$MethodFactory$$.prototype.$createMethod$ = function $$MethodFactory$$$$$createMethod$$($name$$57$$) {
  return this.$__methods$[$name$$57$$] !== $JSCompiler_alias_VOID$$ ? this.$__methods$[$name$$57$$].$clone$() : this.$__commonFactory$ !== $JSCompiler_alias_NULL$$ ? this.$__commonFactory$.$createMethod$($name$$57$$) : $JSCompiler_alias_NULL$$
};
var $tuna$rest$methodFactory$$ = new $MethodFactory$$;
function $tuna$rest$call$$($name$$59$$, $args$$3$$, $callback$$26$$, $recordName$$) {
  var $method$$4$$ = $tuna$rest$methodFactory$$.$createMethod$($name$$59$$);
  if($callback$$26$$ !== $JSCompiler_alias_VOID$$) {
    var $listener$$33$$ = function $$listener$$33$$$($event$$12$$, $data$$25$$) {
      var $result$$8$$ = $data$$25$$;
      $recordName$$ !== $JSCompiler_alias_VOID$$ && ($result$$8$$ = $tuna$rest$populateRecords$$($data$$25$$, $recordName$$));
      $callback$$26$$($result$$8$$);
      $method$$4$$.removeEventListener("result", $listener$$33$$)
    };
    $method$$4$$.addEventListener("result", $listener$$33$$)
  }
  $method$$4$$.call($args$$3$$)
}
function $tuna$rest$populateRecords$$($data$$26$$, $name$$60$$) {
  if($data$$26$$ !== $JSCompiler_alias_NULL$$) {
    if($data$$26$$.splice !== $JSCompiler_alias_VOID$$) {
      for(var $result$$9$$ = [], $i$$10$$ = 0, $l$$6$$ = $data$$26$$.length;$i$$10$$ < $l$$6$$;) {
        $result$$9$$.push($tuna$rest$__populateRecord$$($data$$26$$[$i$$10$$], $name$$60$$)), $i$$10$$++
      }
      return $result$$9$$
    }
    return $tuna$rest$__populateRecord$$($data$$26$$, $name$$60$$)
  }
  return $JSCompiler_alias_NULL$$
}
function $tuna$rest$__populateRecord$$($data$$27$$, $name$$61$$) {
  var $record$$1$$ = $tuna$model$recordFactory$$.$__records$[$name$$61$$].$clone$();
  $record$$1$$.$populate$($data$$27$$);
  return $record$$1$$
}
;function $DataNode$$($value$$41$$, $parent$$7$$, $key$$16$$) {
  this.$__value$ = $value$$41$$;
  this.$__parent$ = $parent$$7$$ || $JSCompiler_alias_NULL$$;
  this.$__key$ = $key$$16$$ || $JSCompiler_alias_NULL$$;
  this.$__keyNode$ = $JSCompiler_alias_NULL$$;
  this.$__children$ = {}
}
$DataNode$$.prototype.getParent = function $$DataNode$$$$getParent$() {
  return this.$__parent$
};
$DataNode$$.prototype.getKey = function $$DataNode$$$$getKey$() {
  this.$__keyNode$ === $JSCompiler_alias_NULL$$ && (this.$__keyNode$ = new $tuna$tmpl$data$DataNode$$(this.$__key$));
  return this.$__keyNode$
};
function $JSCompiler_StaticMethods_getRoot$$($JSCompiler_StaticMethods_getRoot$self$$) {
  return $JSCompiler_StaticMethods_getRoot$self$$.$__parent$ !== $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods_getRoot$$($JSCompiler_StaticMethods_getRoot$self$$.$__parent$) : $JSCompiler_StaticMethods_getRoot$self$$
}
$DataNode$$.prototype.$getValue$ = function $$DataNode$$$$$getValue$$() {
  return this.$__value$
};
function $JSCompiler_StaticMethods_growChild$$($JSCompiler_StaticMethods_growChild$self$$, $key$$17$$) {
  var $result$$10$$ = $JSCompiler_alias_NULL$$;
  if($JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$17$$] !== $JSCompiler_alias_VOID$$) {
    $result$$10$$ = $JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$17$$]
  }else {
    if($JSCompiler_StaticMethods_growChild$self$$.$__value$ !== $JSCompiler_alias_NULL$$) {
      var $keyValue$$ = $JSCompiler_StaticMethods_growChild$self$$.$__value$[$key$$17$$];
      $keyValue$$ !== $JSCompiler_alias_VOID$$ ? ($JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$17$$] = new $tuna$tmpl$data$DataNode$$($keyValue$$, $JSCompiler_StaticMethods_growChild$self$$, $key$$17$$), $result$$10$$ = $JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$17$$]) : $JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$17$$] = $tuna$tmpl$data$NULL_NODE$$
    }
  }
  return $result$$10$$
}
var $tuna$tmpl$data$DataNode$$ = $DataNode$$, $tuna$tmpl$data$NULL_NODE$$ = new $tuna$tmpl$data$DataNode$$($JSCompiler_alias_NULL$$);
function $PathEvaluator$$() {
  this.$__parsedPath$ = $JSCompiler_alias_NULL$$
}
$PathEvaluator$$.prototype.$setPath$ = function $$PathEvaluator$$$$$setPath$$($path$$4$$) {
  this.$__parsedPath$ = $path$$4$$.split("/")
};
$PathEvaluator$$.prototype.evaluate = function $$PathEvaluator$$$$evaluate$($dataNode_node$$2$$) {
  $dataNode_node$$2$$ = $JSCompiler_StaticMethods___applyNextToken$$(this, this.$__parsedPath$, $dataNode_node$$2$$, 0);
  return $dataNode_node$$2$$ !== $JSCompiler_alias_NULL$$ ? $dataNode_node$$2$$ : $tuna$tmpl$data$NULL_NODE$$
};
function $JSCompiler_StaticMethods___applyNextToken$$($JSCompiler_StaticMethods___applyNextToken$self$$, $path$$5$$, $dataNode$$1$$, $index$$52$$) {
  var $token$$4$$ = $path$$5$$[$index$$52$$];
  return $dataNode$$1$$ !== $JSCompiler_alias_NULL$$ && $token$$4$$ !== $JSCompiler_alias_VOID$$ ? $JSCompiler_StaticMethods___applyNextToken$$($JSCompiler_StaticMethods___applyNextToken$self$$, $path$$5$$, $JSCompiler_StaticMethods___applyToken$$($token$$4$$, $dataNode$$1$$), ++$index$$52$$) : $dataNode$$1$$
}
function $JSCompiler_StaticMethods___applyToken$$($token$$5$$, $dataNode$$2$$) {
  switch($token$$5$$) {
    case "":
      return $JSCompiler_StaticMethods_getRoot$$($dataNode$$2$$);
    case ".":
      return $dataNode$$2$$;
    case "..":
      return $dataNode$$2$$.getParent();
    case "$key":
      return $dataNode$$2$$.getKey()
  }
  return $JSCompiler_StaticMethods_growChild$$($dataNode$$2$$, $token$$5$$)
}
;function $SpotSettings$$() {
  this.$__path$ = this.$__class$ = ""
}
;function $AttributeSettings$$() {
  $SpotSettings$$.call(this);
  this.$__attributeName$ = "";
  this.$__hasEvent$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($AttributeSettings$$, $SpotSettings$$);
$AttributeSettings$$.prototype.$setEvent$ = $JSCompiler_set$$("$__hasEvent$");
$AttributeSettings$$.prototype.$setAttributeName$ = $JSCompiler_set$$("$__attributeName$");
function $ConditionSettings$$() {
  $SpotSettings$$.call(this);
  this.$__operatorData$ = this.$__operatorType$ = this.$__actionData$ = this.$__actionType$ = ""
}
$tuna$utils$extend$$($ConditionSettings$$, $SpotSettings$$);
$ConditionSettings$$.prototype.$setOperator$ = function $$ConditionSettings$$$$$setOperator$$($type$$64$$, $data$$28$$) {
  this.$__operatorType$ = $type$$64$$;
  this.$__operatorData$ = $data$$28$$
};
$ConditionSettings$$.prototype.$setAction$ = function $$ConditionSettings$$$$$setAction$$($type$$65$$, $data$$29$$) {
  this.$__actionType$ = $type$$65$$;
  this.$__actionData$ = $data$$29$$
};
function $ListSettings$$() {
  $SpotSettings$$.call(this);
  this.$__itemRendererID$ = this.$__keyPath$ = "";
  this.$__itemSettings$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($ListSettings$$, $SpotSettings$$);
$ListSettings$$.prototype.$setItemSettings$ = $JSCompiler_set$$("$__itemSettings$");
function $TemplateSettings$$() {
  this.$__spots$ = [];
  this.$__lists$ = [];
  this.$__attributes$ = [];
  this.$__conditions$ = []
}
;function $IMarkupExtractor$$() {
}
$IMarkupExtractor$$.prototype.$extract$ = $JSCompiler_emptyFn$$();
function $SpotExtractor$$() {
  this.$_tagName$ = "spot";
  this.$_ns$ = "tuna:"
}
$tuna$utils$implement$$($SpotExtractor$$, $IMarkupExtractor$$);
$SpotExtractor$$.prototype.$extract$ = function $$SpotExtractor$$$$$extract$$($element$$25$$, $settings$$2$$) {
  for(var $elements$$1$$ = $element$$25$$.getElementsByTagName($tuna$IS_IE$$ ? this.$_tagName$ : this.$_ns$ + this.$_tagName$), $i$$11$$ = 0, $l$$7$$ = $elements$$1$$.length, $item$$ = $JSCompiler_alias_NULL$$;$i$$11$$ < $l$$7$$;) {
    $item$$ = this.$_createItem$(), this.$_parseElement$($elements$$1$$.item($i$$11$$), $item$$), this.$_saveItem$($item$$, $settings$$2$$), $i$$11$$++
  }
};
$SpotExtractor$$.prototype.$_createItem$ = function $$SpotExtractor$$$$$_createItem$$() {
  return new $SpotSettings$$
};
$SpotExtractor$$.prototype.$_parseElement$ = function $$SpotExtractor$$$$$_parseElement$$($element$$26$$, $item$$1$$) {
  var $className$$inline_25_path$$inline_28$$ = $element$$26$$.getAttribute(this.$_ns$ + "target");
  $item$$1$$.$__class$ = $className$$inline_25_path$$inline_28$$;
  $className$$inline_25_path$$inline_28$$ = $element$$26$$.getAttribute(this.$_ns$ + "path");
  $item$$1$$.$__path$ = $className$$inline_25_path$$inline_28$$
};
$SpotExtractor$$.prototype.$_saveItem$ = function $$SpotExtractor$$$$$_saveItem$$($item$$2$$, $settings$$3$$) {
  $settings$$3$$.$__spots$.push($item$$2$$)
};
function $ListExtractor$$($templateBuilder$$) {
  $SpotExtractor$$.call(this);
  this.$_tagName$ = "list";
  this.$__templateBuilder$ = $templateBuilder$$
}
$tuna$utils$extend$$($ListExtractor$$, $SpotExtractor$$);
$ListExtractor$$.prototype.$_createItem$ = function $$ListExtractor$$$$$_createItem$$() {
  return new $ListSettings$$
};
$ListExtractor$$.prototype.$_parseElement$ = function $$ListExtractor$$$$$_parseElement$$($element$$27$$, $item$$3$$) {
  $SpotExtractor$$.prototype.$_parseElement$.call(this, $element$$27$$, $item$$3$$);
  var $id$$inline_34_path$$inline_37_templateID$$ = $element$$27$$.getAttribute(this.$_ns$ + "item-renderer-id");
  $item$$3$$.$__itemRendererID$ = $id$$inline_34_path$$inline_37_templateID$$;
  $id$$inline_34_path$$inline_37_templateID$$ = $element$$27$$.getAttribute(this.$_ns$ + "key-path");
  $item$$3$$.$__keyPath$ = $id$$inline_34_path$$inline_37_templateID$$;
  $id$$inline_34_path$$inline_37_templateID$$ = $element$$27$$.getAttribute(this.$_ns$ + "item-template-id");
  $item$$3$$.$setItemSettings$($JSCompiler_StaticMethods_buildSettings$$(this.$__templateBuilder$, $id$$inline_34_path$$inline_37_templateID$$))
};
$ListExtractor$$.prototype.$_saveItem$ = function $$ListExtractor$$$$$_saveItem$$($item$$4$$, $settings$$4$$) {
  $settings$$4$$.$__lists$.push($item$$4$$)
};
function $AttributeExtractor$$() {
  $SpotExtractor$$.call(this);
  this.$_tagName$ = "attr"
}
$tuna$utils$extend$$($AttributeExtractor$$, $SpotExtractor$$);
$AttributeExtractor$$.prototype.$_createItem$ = function $$AttributeExtractor$$$$$_createItem$$() {
  return new $AttributeSettings$$
};
$AttributeExtractor$$.prototype.$_parseElement$ = function $$AttributeExtractor$$$$$_parseElement$$($element$$28$$, $item$$5$$) {
  $SpotExtractor$$.prototype.$_parseElement$.call(this, $element$$28$$, $item$$5$$);
  $item$$5$$.$setAttributeName$($element$$28$$.getAttribute(this.$_ns$ + "name"));
  $item$$5$$.$setEvent$($element$$28$$.getAttribute(this.$_ns$ + "event") !== $JSCompiler_alias_NULL$$)
};
$AttributeExtractor$$.prototype.$_saveItem$ = function $$AttributeExtractor$$$$$_saveItem$$($item$$6$$, $settings$$5$$) {
  $settings$$5$$.$__attributes$.push($item$$6$$)
};
function $ConditionExtractor$$() {
  $SpotExtractor$$.call(this);
  this.$_tagName$ = "if";
  this.$__operatorAttrs$ = ["isset", "eq", "ne"];
  this.$__actionAttrs$ = ["class"]
}
$tuna$utils$extend$$($ConditionExtractor$$, $SpotExtractor$$);
$ConditionExtractor$$.prototype.$_createItem$ = function $$ConditionExtractor$$$$$_createItem$$() {
  return new $ConditionSettings$$
};
$ConditionExtractor$$.prototype.$_parseElement$ = function $$ConditionExtractor$$$$$_parseElement$$($element$$29$$, $item$$7$$) {
  $SpotExtractor$$.prototype.$_parseElement$.call(this, $element$$29$$, $item$$7$$);
  for(var $i$$inline_48_i$$inline_56$$ = 0, $l$$inline_49_l$$inline_57$$ = this.$__operatorAttrs$.length, $attr$$inline_50_attr$$inline_58$$ = $JSCompiler_alias_NULL$$, $value$$inline_51_value$$inline_59$$ = $JSCompiler_alias_NULL$$;$i$$inline_48_i$$inline_56$$ < $l$$inline_49_l$$inline_57$$;) {
    $attr$$inline_50_attr$$inline_58$$ = this.$__operatorAttrs$[$i$$inline_48_i$$inline_56$$];
    $value$$inline_51_value$$inline_59$$ = $element$$29$$.getAttribute("tuna:" + $attr$$inline_50_attr$$inline_58$$);
    if($value$$inline_51_value$$inline_59$$ !== $JSCompiler_alias_NULL$$) {
      $item$$7$$.$setOperator$($attr$$inline_50_attr$$inline_58$$, $value$$inline_51_value$$inline_59$$);
      break
    }
    $i$$inline_48_i$$inline_56$$++
  }
  $i$$inline_48_i$$inline_56$$ = 0;
  $l$$inline_49_l$$inline_57$$ = this.$__actionAttrs$.length;
  for($value$$inline_51_value$$inline_59$$ = $attr$$inline_50_attr$$inline_58$$ = $JSCompiler_alias_NULL$$;$i$$inline_48_i$$inline_56$$ < $l$$inline_49_l$$inline_57$$;) {
    $attr$$inline_50_attr$$inline_58$$ = this.$__actionAttrs$[$i$$inline_48_i$$inline_56$$];
    $value$$inline_51_value$$inline_59$$ = $element$$29$$.getAttribute("tuna:" + $attr$$inline_50_attr$$inline_58$$);
    if($value$$inline_51_value$$inline_59$$ !== $JSCompiler_alias_NULL$$) {
      $item$$7$$.$setAction$($attr$$inline_50_attr$$inline_58$$, $value$$inline_51_value$$inline_59$$);
      break
    }
    $i$$inline_48_i$$inline_56$$++
  }
};
$ConditionExtractor$$.prototype.$_saveItem$ = function $$ConditionExtractor$$$$$_saveItem$$($item$$10$$, $settings$$6$$) {
  $settings$$6$$.$__conditions$.push($item$$10$$)
};
function $JSCompiler_StaticMethods_buildSettings$$($JSCompiler_StaticMethods_buildSettings$self$$, $templateID$$1$$) {
  var $template$$ = $JSCompiler_alias_NULL$$;
  if($JSCompiler_StaticMethods_buildSettings$self$$.$__templatesTable$[$templateID$$1$$] !== $JSCompiler_alias_VOID$$) {
    $template$$ = $JSCompiler_StaticMethods_buildSettings$self$$.$__templatesTable$[$templateID$$1$$]
  }else {
    var $templateElement$$ = $JSCompiler_StaticMethods_buildSettings$self$$.$__doc$.getElementById($templateID$$1$$);
    if($templateElement$$ !== $JSCompiler_alias_NULL$$) {
      $JSCompiler_StaticMethods_buildSettings$self$$.$__templatesTable$[$templateID$$1$$] = $template$$ = new $TemplateSettings$$;
      for(var $i$$14$$ = 0, $l$$10$$ = $JSCompiler_StaticMethods_buildSettings$self$$.$__extractors$.length;$i$$14$$ < $l$$10$$;) {
        $JSCompiler_StaticMethods_buildSettings$self$$.$__extractors$[$i$$14$$].$extract$($templateElement$$, $template$$), $i$$14$$++
      }
    }
  }
  return $template$$
}
;function $IListItemRouter$$() {
}
$IListItemRouter$$.prototype.append = $JSCompiler_emptyFn$$();
function $ListContainerRouter$$($container$$) {
  this.$_container$ = $container$$
}
$tuna$utils$implement$$($ListContainerRouter$$, $IListItemRouter$$);
$ListContainerRouter$$.prototype.append = function $$ListContainerRouter$$$$append$($node$$3$$) {
  this.$_container$.appendChild($node$$3$$)
};
function $CompiledUnit$$($root$$) {
  this.$__rootTemplate$ = $root$$
}
$CompiledUnit$$.prototype.$destroy$ = $JSCompiler_emptyFn$$();
$CompiledUnit$$.prototype.$applyData$ = $JSCompiler_emptyFn$$();
function $Spot$$($root$$1$$) {
  this.$__rootTemplate$ = $root$$1$$;
  this.$__pathEvaluator$ = new $PathEvaluator$$;
  this.$_nodes$ = []
}
$tuna$utils$extend$$($Spot$$, $CompiledUnit$$);
$Spot$$.prototype.$setPath$ = function $$Spot$$$$$setPath$$($path$$8$$) {
  this.$__pathEvaluator$.$setPath$($path$$8$$)
};
$Spot$$.prototype.$applyData$ = function $$Spot$$$$$applyData$$($dataNode$$4_valueNode$$) {
  $dataNode$$4_valueNode$$ = this.$__pathEvaluator$.evaluate($dataNode$$4_valueNode$$);
  $dataNode$$4_valueNode$$ !== $JSCompiler_alias_NULL$$ && this.$_applyValue$($dataNode$$4_valueNode$$.$getValue$())
};
$Spot$$.prototype.$_applyValue$ = function $$Spot$$$$$_applyValue$$($html$$1_value$$44$$) {
  $html$$1_value$$44$$ === $JSCompiler_alias_NULL$$ && ($html$$1_value$$44$$ = "");
  for(var $html$$1_value$$44$$ = $html$$1_value$$44$$.toString(), $i$$15$$ = this.$_nodes$.length - 1;0 <= $i$$15$$;) {
    this.$_nodes$[$i$$15$$].innerHTML !== $html$$1_value$$44$$ && (this.$_nodes$[$i$$15$$].innerHTML = $html$$1_value$$44$$), $i$$15$$--
  }
};
function $Attribute$$($root$$2$$) {
  $Spot$$.call(this, $root$$2$$);
  this.$__eventName$ = this.$__attributeName$ = "";
  this.$__hasEvent$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($Attribute$$, $Spot$$);
$Attribute$$.prototype.$setAttributeName$ = function $$Attribute$$$$$setAttributeName$$($attributeName$$1$$) {
  this.$__attributeName$ = $attributeName$$1$$;
  this.$__eventName$ = $attributeName$$1$$ + "-change"
};
$Attribute$$.prototype.$setEvent$ = $JSCompiler_set$$("$__hasEvent$");
$Attribute$$.prototype.$_applyValue$ = function $$Attribute$$$$$_applyValue$$($value$$45$$) {
  $value$$45$$ !== $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods___setAttribute$$(this, $value$$45$$) : $JSCompiler_StaticMethods___removeAttribute$$(this);
  if(this.$__hasEvent$) {
    var $self$$2$$ = this;
    setTimeout(function() {
      for(var $i$$inline_68$$ = $self$$2$$.$_nodes$.length - 1;0 <= $i$$inline_68$$;) {
        var $element$$inline_318$$ = $self$$2$$.$_nodes$[$i$$inline_68$$], $type$$inline_319$$ = $self$$2$$.$__eventName$, $data$$inline_320_eventName$$inline_323$$ = "" + $value$$45$$, $doc$$inline_321$$ = $element$$inline_318$$.ownerDocument, $event$$inline_322_event$$inline_324$$ = $JSCompiler_alias_NULL$$;
        $doc$$inline_321$$.createEventObject !== $JSCompiler_alias_VOID$$ ? ($event$$inline_322_event$$inline_324$$ = $doc$$inline_321$$.createEventObject(), $data$$inline_320_eventName$$inline_323$$ && ($event$$inline_322_event$$inline_324$$.data = $data$$inline_320_eventName$$inline_323$$), $data$$inline_320_eventName$$inline_323$$ = "on" + $type$$inline_319$$, $element$$inline_318$$[$data$$inline_320_eventName$$inline_323$$] === $JSCompiler_alias_VOID$$ ? ($event$$inline_322_event$$inline_324$$.$__type$ = 
        $type$$inline_319$$, $element$$inline_318$$.fireEvent("onhelp", $event$$inline_322_event$$inline_324$$)) : $element$$inline_318$$.fireEvent($data$$inline_320_eventName$$inline_323$$, $event$$inline_322_event$$inline_324$$)) : ($event$$inline_322_event$$inline_324$$ = document.createEvent("UIEvents"), $event$$inline_322_event$$inline_324$$.initUIEvent($type$$inline_319$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$, window, 1), $data$$inline_320_eventName$$inline_323$$ && ($event$$inline_322_event$$inline_324$$.data = 
        $data$$inline_320_eventName$$inline_323$$), $element$$inline_318$$.dispatchEvent($event$$inline_322_event$$inline_324$$));
        $i$$inline_68$$--
      }
    }, 0)
  }
};
function $JSCompiler_StaticMethods___setAttribute$$($JSCompiler_StaticMethods___setAttribute$self$$, $value$$46$$) {
  for(var $i$$16$$ = $JSCompiler_StaticMethods___setAttribute$self$$.$_nodes$.length - 1;0 <= $i$$16$$;) {
    $JSCompiler_StaticMethods___setAttribute$self$$.$_nodes$[$i$$16$$].setAttribute($JSCompiler_StaticMethods___setAttribute$self$$.$__attributeName$, $value$$46$$ + ""), $i$$16$$--
  }
}
function $JSCompiler_StaticMethods___removeAttribute$$($JSCompiler_StaticMethods___removeAttribute$self$$) {
  for(var $i$$17$$ = $JSCompiler_StaticMethods___removeAttribute$self$$.$_nodes$.length - 1;0 <= $i$$17$$;) {
    $JSCompiler_StaticMethods___removeAttribute$self$$.$_nodes$[$i$$17$$].removeAttribute($JSCompiler_StaticMethods___removeAttribute$self$$.$__attributeName$), $i$$17$$--
  }
}
;function $Condition$$($root$$3$$) {
  $Spot$$.call(this, $root$$3$$);
  this.$__operator$ = this.$__action$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($Condition$$, $Spot$$);
$Condition$$.prototype.$setAction$ = $JSCompiler_set$$("$__action$");
$Condition$$.prototype.$setOperator$ = $JSCompiler_set$$("$__operator$");
$Condition$$.prototype.$_applyValue$ = function $$Condition$$$$$_applyValue$$($value$$48$$) {
  for(var $testResult$$ = this.$__operator$.test($value$$48$$), $i$$19$$ = this.$_nodes$.length - 1;0 <= $i$$19$$;) {
    this.$__action$.apply(this.$_nodes$[$i$$19$$], $testResult$$, $value$$48$$), $i$$19$$--
  }
};
function $List$$($root$$4$$) {
  this.$__rootTemplate$ = $root$$4$$;
  this.$__itemSettings$ = this.$__itemRenderer$ = this.$__templateCompiler$ = $JSCompiler_alias_NULL$$;
  this.$__itemsTable$ = {};
  this.$__pathEvaluator$ = new $PathEvaluator$$;
  this.$__keyPathEvaluator$ = new $PathEvaluator$$;
  this.$__listNodeRouter$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($List$$, $CompiledUnit$$);
$JSCompiler_prototypeAlias$$ = $List$$.prototype;
$JSCompiler_prototypeAlias$$.$setPath$ = function $$JSCompiler_prototypeAlias$$$$setPath$$($path$$9$$) {
  this.$__pathEvaluator$.$setPath$($path$$9$$)
};
$JSCompiler_prototypeAlias$$.$setItemSettings$ = $JSCompiler_set$$("$__itemSettings$");
$JSCompiler_prototypeAlias$$.$addItem$ = function $$JSCompiler_prototypeAlias$$$$addItem$$($compiledItem$$, $key$$18$$) {
  this.$__itemsTable$[$key$$18$$] = $compiledItem$$
};
$JSCompiler_prototypeAlias$$.$applyData$ = function $$JSCompiler_prototypeAlias$$$$applyData$$($dataNode$$5_sampleNode$$) {
  $dataNode$$5_sampleNode$$ = this.$__pathEvaluator$.evaluate($dataNode$$5_sampleNode$$);
  if($dataNode$$5_sampleNode$$ !== $JSCompiler_alias_NULL$$) {
    var $sample$$ = $dataNode$$5_sampleNode$$.$getValue$(), $oldItemsTable$$ = this.$__itemsTable$;
    this.$__itemsTable$ = {};
    for(var $index$$53$$ in $sample$$) {
      var $itemNode$$inline_73$$ = $JSCompiler_StaticMethods_growChild$$($dataNode$$5_sampleNode$$, $index$$53$$), $oldItemsTable$$inline_74$$ = $oldItemsTable$$, $key$$inline_76_keyNode$$inline_75$$ = this.$__keyPathEvaluator$.evaluate($itemNode$$inline_73$$);
      $key$$inline_76_keyNode$$inline_75$$ !== $JSCompiler_alias_NULL$$ && ($key$$inline_76_keyNode$$inline_75$$ = $key$$inline_76_keyNode$$inline_75$$.$getValue$(), $oldItemsTable$$inline_74$$[$key$$inline_76_keyNode$$inline_75$$] === $JSCompiler_alias_VOID$$ ? this.$addItem$($JSCompiler_StaticMethods___makeNewItem$$(this), $key$$inline_76_keyNode$$inline_75$$) : (this.$__itemsTable$[$key$$inline_76_keyNode$$inline_75$$] = $oldItemsTable$$inline_74$$[$key$$inline_76_keyNode$$inline_75$$], delete $oldItemsTable$$inline_74$$[$key$$inline_76_keyNode$$inline_75$$]), 
      this.$__itemsTable$[$key$$inline_76_keyNode$$inline_75$$].$applyData$($itemNode$$inline_73$$))
    }
    $JSCompiler_StaticMethods___destroyItems$$($oldItemsTable$$)
  }else {
    $JSCompiler_StaticMethods___destroyItems$$(this.$__itemsTable$)
  }
};
$JSCompiler_prototypeAlias$$.$destroy$ = function $$JSCompiler_prototypeAlias$$$$destroy$$() {
  $JSCompiler_StaticMethods___destroyItems$$(this.$__itemsTable$)
};
function $JSCompiler_StaticMethods___destroyItems$$($itemsTable$$) {
  for(var $key$$20$$ in $itemsTable$$) {
    $itemsTable$$[$key$$20$$].$destroy$(), delete $itemsTable$$[$key$$20$$]
  }
}
function $JSCompiler_StaticMethods___makeNewItem$$($JSCompiler_StaticMethods___makeNewItem$self$$) {
  var $itemElement$$ = $JSCompiler_StaticMethods___makeNewItem$self$$.$__itemRenderer$.cloneNode($JSCompiler_alias_TRUE$$), $rootTemplate$$ = $JSCompiler_StaticMethods___makeNewItem$self$$.$__rootTemplate$, $template$$1$$ = $JSCompiler_StaticMethods_compileTemplate$$($JSCompiler_StaticMethods___makeNewItem$self$$.$__templateCompiler$, $JSCompiler_StaticMethods___makeNewItem$self$$.$__itemSettings$, $itemElement$$, $rootTemplate$$);
  $JSCompiler_StaticMethods___makeNewItem$self$$.$__listNodeRouter$.append($itemElement$$);
  $rootTemplate$$.$__createdChildren$.push($itemElement$$);
  return $template$$1$$
}
;function $Template$$($root$$5$$) {
  this.$__rootTemplate$ = $root$$5$$ || this;
  this.$__items$ = [];
  this.$__createdChildren$ = [];
  this.$__removedChildren$ = [];
  this.$__target$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($Template$$, $CompiledUnit$$);
$Template$$.prototype.$setTarget$ = $JSCompiler_set$$("$__target$");
$Template$$.prototype.$applyData$ = function $$Template$$$$$applyData$$($dataNode$$6$$) {
  for(var $i$$20$$ = this.$__items$.length - 1;0 <= $i$$20$$;) {
    this.$__items$[$i$$20$$].$applyData$($dataNode$$6$$), $i$$20$$--
  }
};
$Template$$.prototype.$destroy$ = function $$Template$$$$$destroy$$() {
  for(var $i$$21$$ = this.$__items$.length - 1;0 <= $i$$21$$;) {
    this.$__items$[$i$$21$$].$destroy$(), $i$$21$$--
  }
  this.$__target$.parentNode.removeChild(this.$__target$);
  this.$__rootTemplate$.$__removedChildren$.push(this.$__target$)
};
function $IItemCompiler$$() {
}
$IItemCompiler$$.prototype.compile = $JSCompiler_emptyFn$$();
function $JSCompiler_StaticMethods_compileTemplate$$($JSCompiler_StaticMethods_compileTemplate$self$$, $settings$$9$$, $element$$36$$, $root$$6_template$$3$$) {
  $root$$6_template$$3$$ = new $Template$$($root$$6_template$$3$$);
  $root$$6_template$$3$$.$setTarget$($element$$36$$);
  for(var $i$$22$$ = 0, $l$$11$$ = $JSCompiler_StaticMethods_compileTemplate$self$$.$__itemCompilers$.length;$i$$22$$ < $l$$11$$;) {
    $JSCompiler_StaticMethods_compileTemplate$self$$.$__itemCompilers$[$i$$22$$].compile($element$$36$$, $settings$$9$$, $root$$6_template$$3$$), $i$$22$$++
  }
  return $root$$6_template$$3$$
}
;function $SpotCompiler$$() {
}
$tuna$utils$implement$$($SpotCompiler$$, $IItemCompiler$$);
$SpotCompiler$$.prototype.compile = function $$SpotCompiler$$$$compile$($element$$37$$, $itemsSettings_settings$$10$$, $template$$4$$) {
  for(var $root$$7$$ = $template$$4$$.$__rootTemplate$, $item$$11$$ = $JSCompiler_alias_NULL$$, $itemsSettings_settings$$10$$ = this.$_getItemsSettings$($itemsSettings_settings$$10$$), $i$$23$$ = $itemsSettings_settings$$10$$.length - 1;0 <= $i$$23$$;) {
    $item$$11$$ = this.$_createItem$($root$$7$$), this.$_compileItem$($element$$37$$, $itemsSettings_settings$$10$$[$i$$23$$], $item$$11$$), $template$$4$$.$__items$ = $template$$4$$.$__items$.concat($item$$11$$), $i$$23$$--
  }
};
$SpotCompiler$$.prototype.$_getItemsSettings$ = function $$SpotCompiler$$$$$_getItemsSettings$$($settings$$11$$) {
  return $settings$$11$$.$__spots$
};
$SpotCompiler$$.prototype.$_createItem$ = function $$SpotCompiler$$$$$_createItem$$($rootTemplate$$1$$) {
  return new $Spot$$($rootTemplate$$1$$)
};
$SpotCompiler$$.prototype.$_compileItem$ = function $$SpotCompiler$$$$$_compileItem$$($element$$38_elements$$inline_90$$, $className$$7_settings$$12$$, $item$$12$$) {
  $item$$12$$.$setPath$($className$$7_settings$$12$$.$__path$);
  $className$$7_settings$$12$$ = $className$$7_settings$$12$$.$__class$;
  $tuna$dom$hasClass$$($element$$38_elements$$inline_90$$, $className$$7_settings$$12$$) || ($element$$38_elements$$inline_90$$ = $tuna$dom$select$$("." + $className$$7_settings$$12$$, $element$$38_elements$$inline_90$$));
  $item$$12$$.$_nodes$ = $item$$12$$.$_nodes$.concat($element$$38_elements$$inline_90$$)
};
function $AttributeCompiler$$() {
}
$tuna$utils$extend$$($AttributeCompiler$$, $SpotCompiler$$);
$AttributeCompiler$$.prototype.$_getItemsSettings$ = function $$AttributeCompiler$$$$$_getItemsSettings$$($settings$$13$$) {
  return $settings$$13$$.$__attributes$
};
$AttributeCompiler$$.prototype.$_createItem$ = function $$AttributeCompiler$$$$$_createItem$$($rootTemplate$$2$$) {
  return new $Attribute$$($rootTemplate$$2$$)
};
$AttributeCompiler$$.prototype.$_compileItem$ = function $$AttributeCompiler$$$$$_compileItem$$($element$$39$$, $settings$$14$$, $item$$13$$) {
  $SpotCompiler$$.prototype.$_compileItem$.call(this, $element$$39$$, $settings$$14$$, $item$$13$$);
  $item$$13$$.$setAttributeName$($settings$$14$$.$__attributeName$);
  $item$$13$$.$setEvent$($settings$$14$$.$__hasEvent$)
};
function $ConditionCompiler$$() {
}
$tuna$utils$extend$$($ConditionCompiler$$, $SpotCompiler$$);
$ConditionCompiler$$.prototype.$_getItemsSettings$ = function $$ConditionCompiler$$$$$_getItemsSettings$$($settings$$15$$) {
  return $settings$$15$$.$__conditions$
};
$ConditionCompiler$$.prototype.$_createItem$ = function $$ConditionCompiler$$$$$_createItem$$($rootTemplate$$3$$) {
  return new $Condition$$($rootTemplate$$3$$)
};
$ConditionCompiler$$.prototype.$_compileItem$ = function $$ConditionCompiler$$$$$_compileItem$$($JSCompiler_inline_result$$92_element$$40$$, $settings$$16$$, $item$$14$$) {
  $SpotCompiler$$.prototype.$_compileItem$.call(this, $JSCompiler_inline_result$$92_element$$40$$, $settings$$16$$, $item$$14$$);
  a: {
    switch($settings$$16$$.$__actionType$) {
      case "class":
        $JSCompiler_inline_result$$92_element$$40$$ = new $__ClassAction$$($settings$$16$$.$__actionData$);
        break a
    }
    $JSCompiler_inline_result$$92_element$$40$$ = $JSCompiler_alias_NULL$$
  }
  $item$$14$$.$setAction$($JSCompiler_inline_result$$92_element$$40$$);
  $item$$14$$.$setOperator$($JSCompiler_StaticMethods___createOperator$$($settings$$16$$.$__operatorType$, $settings$$16$$.$__operatorData$))
};
function $JSCompiler_StaticMethods___createOperator$$($type$$67$$, $data$$31$$) {
  switch($type$$67$$) {
    case "isset":
      return new $__IsSetOperator$$;
    case "eq":
      return new $__EqualsOperator$$($data$$31$$);
    case "ne":
      return new $__NotEqualsOperator$$($data$$31$$)
  }
  return $JSCompiler_alias_NULL$$
}
function $__ConditionOperator$$($data$$32$$) {
  this.$_data$ = $data$$32$$ || ""
}
$__ConditionOperator$$.prototype.test = $JSCompiler_emptyFn$$();
function $__IsSetOperator$$() {
  this.$_data$ = ""
}
$tuna$utils$extend$$($__IsSetOperator$$, $__ConditionOperator$$);
$__IsSetOperator$$.prototype.test = function $$__IsSetOperator$$$$test$($value$$50$$) {
  return $value$$50$$ !== $JSCompiler_alias_VOID$$
};
function $__EqualsOperator$$($data$$33$$) {
  this.$_data$ = $data$$33$$ || ""
}
$tuna$utils$extend$$($__EqualsOperator$$, $__ConditionOperator$$);
$__EqualsOperator$$.prototype.test = function $$__EqualsOperator$$$$test$($value$$51$$) {
  return $value$$51$$ === this.$_data$ || $value$$51$$ + "" === this.$_data$
};
function $__NotEqualsOperator$$($data$$34$$) {
  this.$_data$ = $data$$34$$ || ""
}
$tuna$utils$extend$$($__NotEqualsOperator$$, $__ConditionOperator$$);
$__NotEqualsOperator$$.prototype.test = function $$__NotEqualsOperator$$$$test$($value$$52$$) {
  return!($value$$52$$ == this.$_data$ || $value$$52$$ + "" == this.$_data$)
};
function $__ConditionAction$$($data$$35$$) {
  this.$_data$ = $data$$35$$ || ""
}
$__ConditionAction$$.prototype.apply = $JSCompiler_emptyFn$$();
function $__ClassAction$$($data$$36$$) {
  this.$_data$ = $data$$36$$ || "";
  this.$__lastName$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($__ClassAction$$, $__ConditionAction$$);
$__ClassAction$$.prototype.apply = function $$__ClassAction$$$$apply$($element$$42$$, $testResult$$2$$, $value$$54$$) {
  var $className$$8$$ = this.$_data$;
  "" !== $className$$8$$ ? $testResult$$2$$ ? $tuna$dom$addClass$$($element$$42$$, $className$$8$$) : $tuna$dom$removeClass$$($element$$42$$, $className$$8$$) : this.$__lastName$ !== $value$$54$$ && $testResult$$2$$ && (this.$__lastName$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$removeClass$$($element$$42$$, this.$__lastName$ + ""), $tuna$dom$addClass$$($element$$42$$, $value$$54$$ + ""), this.$__lastName$ = $value$$54$$)
};
function $ListCompiler$$($doc$$4$$, $compiler$$1$$) {
  this.$__doc$ = $doc$$4$$;
  this.$__templateCompiler$ = $compiler$$1$$
}
$tuna$utils$implement$$($ListCompiler$$, $IItemCompiler$$);
$ListCompiler$$.prototype.compile = function $$ListCompiler$$$$compile$($element$$43$$, $itemsSettings$$1_settings$$17$$, $template$$5$$) {
  for(var $itemsSettings$$1_settings$$17$$ = $itemsSettings$$1_settings$$17$$.$__lists$, $i$$24$$ = $itemsSettings$$1_settings$$17$$.length - 1;0 <= $i$$24$$;) {
    var $element$$inline_105$$ = $element$$43$$, $settings$$inline_106$$ = $itemsSettings$$1_settings$$17$$[$i$$24$$], $template$$inline_107$$ = $template$$5$$, $root$$inline_108$$ = $template$$inline_107$$.$__rootTemplate$, $lists$$inline_109$$ = [], $className$$inline_110$$ = $settings$$inline_106$$.$__class$;
    if($tuna$dom$hasClass$$($element$$inline_105$$, $className$$inline_110$$)) {
      $lists$$inline_109$$.push($JSCompiler_StaticMethods___createList$$(this, $element$$inline_105$$, $settings$$inline_106$$, $root$$inline_108$$))
    }else {
      for(var $elements$$inline_111$$ = $tuna$dom$select$$("." + $className$$inline_110$$, $element$$inline_105$$), $i$$inline_112$$ = $elements$$inline_111$$.length - 1;0 <= $i$$inline_112$$;) {
        for(var $className$$inline_331$$ = $className$$inline_110$$, $context$$inline_332$$ = $element$$inline_105$$, $parent$$inline_333$$ = $elements$$inline_111$$[$i$$inline_112$$].parentNode;$parent$$inline_333$$ !== $JSCompiler_alias_NULL$$ && $parent$$inline_333$$ !== $context$$inline_332$$ && !$tuna$dom$hasClass$$($parent$$inline_333$$, $className$$inline_331$$);) {
          $parent$$inline_333$$ = $parent$$inline_333$$.parentNode
        }
        ($parent$$inline_333$$ === $context$$inline_332$$ ? $JSCompiler_alias_NULL$$ : $parent$$inline_333$$) === $JSCompiler_alias_NULL$$ && $lists$$inline_109$$.push($JSCompiler_StaticMethods___createList$$(this, $elements$$inline_111$$[$i$$inline_112$$], $settings$$inline_106$$, $root$$inline_108$$));
        $i$$inline_112$$--
      }
    }
    $template$$inline_107$$.$__items$ = $template$$inline_107$$.$__items$.concat($lists$$inline_109$$);
    $i$$24$$--
  }
};
function $JSCompiler_StaticMethods___createList$$($JSCompiler_StaticMethods___createList$self_renderer$$, $element$$45_router$$inline_124$$, $settings$$19$$, $list$$2_root$$9$$) {
  $list$$2_root$$9$$ = new $List$$($list$$2_root$$9$$);
  $list$$2_root$$9$$.$__templateCompiler$ = $JSCompiler_StaticMethods___createList$self_renderer$$.$__templateCompiler$;
  var $rendererId$$ = $settings$$19$$.$__itemRendererID$, $JSCompiler_StaticMethods___createList$self_renderer$$ = $JSCompiler_StaticMethods___createList$self_renderer$$.$__doc$.getElementById($rendererId$$);
  $JSCompiler_StaticMethods___createList$self_renderer$$ !== $JSCompiler_alias_NULL$$ ? ($JSCompiler_StaticMethods___createList$self_renderer$$ = $JSCompiler_StaticMethods___createList$self_renderer$$.cloneNode($JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods___createList$self_renderer$$.removeAttribute("id"), $list$$2_root$$9$$.$__itemRenderer$ = $JSCompiler_StaticMethods___createList$self_renderer$$) : alert("Cannot find item renderer with id: " + $rendererId$$);
  $list$$2_root$$9$$.$setItemSettings$($settings$$19$$.$__itemSettings$);
  $list$$2_root$$9$$.$__keyPathEvaluator$.$setPath$($settings$$19$$.$__keyPath$);
  $list$$2_root$$9$$.$setPath$($settings$$19$$.$__path$);
  $element$$45_router$$inline_124$$ = new $ListContainerRouter$$($element$$45_router$$inline_124$$);
  $list$$2_root$$9$$.$__listNodeRouter$ = $element$$45_router$$inline_124$$;
  return $list$$2_root$$9$$
}
;var $tuna$tmpl$__markupBuilder$$ = new function() {
  this.$__doc$ = document;
  this.$__templatesTable$ = {};
  this.$__extractors$ = [];
  this.$__extractors$.push(new $SpotExtractor$$);
  this.$__extractors$.push(new $AttributeExtractor$$);
  this.$__extractors$.push(new $ConditionExtractor$$);
  this.$__extractors$.push(new $ListExtractor$$(this))
}, $tuna$tmpl$__settingsTable$$ = {}, $tuna$tmpl$__compiler$$ = new function() {
  this.$__doc$ = document;
  this.$__itemCompilers$ = [];
  this.$__itemCompilers$.push(new $SpotCompiler$$);
  this.$__itemCompilers$.push(new $AttributeCompiler$$);
  this.$__itemCompilers$.push(new $ConditionCompiler$$);
  this.$__itemCompilers$.push(new $ListCompiler$$(this.$__doc$, this))
};
function $Module$$($selector$$4$$) {
  this.$_selector$ = $selector$$4$$
}
$Module$$.prototype.$init$ = function $$Module$$$$$init$$($context$$6$$, $container$$1$$, $options$$2$$) {
  for(var $instances$$ = [], $targets$$ = this.$_findTargets$($context$$6$$), $i$$26$$ = 0, $l$$12$$ = $targets$$.length, $instance_target$$inline_131$$ = $JSCompiler_alias_NULL$$;$i$$26$$ < $l$$12$$;) {
    for(var $instance_target$$inline_131$$ = $targets$$[$i$$26$$], $context$$inline_132$$ = $context$$6$$, $result$$inline_133$$ = $JSCompiler_alias_TRUE$$, $isolators$$inline_134$$ = $tuna$ui$modules$__isolators$$, $i$$inline_135$$ = 0, $l$$inline_136$$ = $isolators$$inline_134$$.length;$i$$inline_135$$ < $l$$inline_136$$;) {
      $result$$inline_133$$ = $result$$inline_133$$ && $tuna$dom$getParentMatches$$($instance_target$$inline_131$$, $isolators$$inline_134$$[$i$$inline_135$$], $context$$inline_132$$) === $JSCompiler_alias_NULL$$;
      if(!$result$$inline_133$$) {
        break
      }
      $i$$inline_135$$++
    }
    $result$$inline_133$$ && ($instance_target$$inline_131$$ = this.$initInstance$($targets$$[$i$$26$$], $container$$1$$, $options$$2$$), $instance_target$$inline_131$$ !== $JSCompiler_alias_NULL$$ && ($instance_target$$inline_131$$.$init$(), $instances$$.push($instance_target$$inline_131$$)));
    $i$$26$$++
  }
  return $instances$$
};
$Module$$.prototype.$_findTargets$ = function $$Module$$$$$_findTargets$$($context$$7$$) {
  var $targets$$1$$ = $tuna$dom$select$$(this.$_selector$, $context$$7$$);
  return $targets$$1$$ = $targets$$1$$.concat($tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$__selectorEngine$$.filter !== $JSCompiler_alias_VOID$$ ? $tuna$dom$__selectorEngine$$.filter(this.$_selector$, [$context$$7$$]) : $JSCompiler_alias_NULL$$)
};
$Module$$.prototype.$destroy$ = function $$Module$$$$$destroy$$($instances$$1_l$$14$$) {
  for(var $i$$28$$ = 0, $instances$$1_l$$14$$ = $instances$$1_l$$14$$.length;$i$$28$$ < $instances$$1_l$$14$$;) {
    $i$$28$$++
  }
};
$Module$$.prototype.$initInstance$ = $JSCompiler_emptyFn$$();
function $ModuleInstance$$($target$$40$$) {
  $EventDispatcher$$.call(this);
  this.$_target$ = $target$$40$$;
  this.$__defaultOptions$ = {}
}
$tuna$utils$extend$$($ModuleInstance$$, $EventDispatcher$$);
$ModuleInstance$$.prototype.getName = function $$ModuleInstance$$$$getName$() {
  return this.$_target$.getAttribute("data-name")
};
$ModuleInstance$$.prototype.isEnabled = function $$ModuleInstance$$$$isEnabled$() {
  return!$tuna$dom$hasClass$$(this.$_target$, "disabled")
};
function $JSCompiler_StaticMethods__setDefaultOption$$($JSCompiler_StaticMethods__setDefaultOption$self$$, $name$$62$$, $option$$) {
  $option$$ === $JSCompiler_alias_NULL$$ ? delete $JSCompiler_StaticMethods__setDefaultOption$self$$.$__defaultOptions$[$name$$62$$] : $JSCompiler_StaticMethods__setDefaultOption$self$$.$__defaultOptions$[$name$$62$$] = $option$$
}
function $JSCompiler_StaticMethods_setOption$$($JSCompiler_StaticMethods_setOption$self$$, $name$$63$$, $option$$1$$) {
  $option$$1$$ ? $JSCompiler_StaticMethods_setOption$self$$.$_target$.setAttribute("data-" + $name$$63$$, $option$$1$$) : $JSCompiler_StaticMethods_setOption$self$$.$_target$.removeAttribute("data-" + $name$$63$$)
}
function $JSCompiler_StaticMethods_getStringOption$$($JSCompiler_StaticMethods_getStringOption$self$$, $name$$65$$) {
  var $option$$3$$ = $JSCompiler_StaticMethods_getStringOption$self$$.$_target$.getAttribute("data-" + $name$$65$$);
  $option$$3$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getStringOption$self$$.$__defaultOptions$[$name$$65$$] !== $JSCompiler_alias_VOID$$ && ($option$$3$$ = $JSCompiler_StaticMethods_getStringOption$self$$.$__defaultOptions$[$name$$65$$]);
  return $option$$3$$
}
function $JSCompiler_StaticMethods_getNumberOption$$($JSCompiler_StaticMethods_getNumberOption$self$$, $name$$66$$) {
  var $option$$4$$ = $JSCompiler_StaticMethods_getNumberOption$self$$.$_target$.getAttribute("data-" + $name$$66$$);
  $option$$4$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getNumberOption$self$$.$__defaultOptions$[$name$$66$$] !== $JSCompiler_alias_VOID$$ && ($option$$4$$ = $JSCompiler_StaticMethods_getNumberOption$self$$.$__defaultOptions$[$name$$66$$]);
  return Number($option$$4$$)
}
function $JSCompiler_StaticMethods_getBooleanOption$$($JSCompiler_StaticMethods_getBooleanOption$self$$, $name$$67$$) {
  var $option$$5$$ = $JSCompiler_StaticMethods_getBooleanOption$self$$.$_target$.getAttribute("data-" + $name$$67$$);
  $option$$5$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getBooleanOption$self$$.$__defaultOptions$[$name$$67$$] !== $JSCompiler_alias_VOID$$ && ($option$$5$$ = $JSCompiler_StaticMethods_getBooleanOption$self$$.$__defaultOptions$[$name$$67$$]);
  return!!$option$$5$$
}
$ModuleInstance$$.prototype.$init$ = $JSCompiler_emptyFn$$();
$ModuleInstance$$.prototype.$destroy$ = $JSCompiler_emptyFn$$();
var $tuna$ui$modules$__typeTable$$ = {}, $tuna$ui$modules$__isolators$$ = [];
function $tuna$ui$modules$register$$($type$$68$$, $module$$, $isIsolator$$) {
  $tuna$ui$modules$__typeTable$$[$type$$68$$] = $module$$;
  $isIsolator$$ && $tuna$ui$modules$__isolators$$.push($module$$.$_selector$)
}
;function $Container$$($target$$41$$) {
  $ModuleInstance$$.call(this, $target$$41$$);
  this.$__moduleArgs$ = {};
  this.$__moduleInstances$ = {}
}
$tuna$utils$extend$$($Container$$, $ModuleInstance$$);
$Container$$.prototype.getName = function $$Container$$$$getName$() {
  return this.$_target$.id
};
$Container$$.prototype.clear = function $$Container$$$$clear$() {
  this.$_target$.innerHTML = ""
};
$Container$$.prototype.$requireModule$ = function $$Container$$$$$requireModule$$($type$$70$$, $var_args$$23$$) {
  var $args$$4$$ = Array.prototype.slice.call(arguments);
  $args$$4$$.shift();
  this.$__moduleArgs$[$type$$70$$] === $JSCompiler_alias_VOID$$ && (this.$__moduleArgs$[$type$$70$$] = [$JSCompiler_alias_NULL$$]);
  0 < $args$$4$$.length ? this.$__moduleArgs$[$type$$70$$].push($args$$4$$) : this.$__moduleArgs$[$type$$70$$][0] = []
};
function $JSCompiler_StaticMethods_initModules$$($JSCompiler_StaticMethods_initModules$self$$, $target$$42$$) {
  var $target$$42$$ = $target$$42$$ || $JSCompiler_StaticMethods_initModules$self$$.$_target$, $instances$$2_module$$1_module$$inline_139$$ = $JSCompiler_alias_NULL$$, $instances$$2_module$$1_module$$inline_139$$ = $JSCompiler_alias_NULL$$, $type$$71$$;
  for($type$$71$$ in $JSCompiler_StaticMethods_initModules$self$$.$__moduleArgs$) {
    if($instances$$2_module$$1_module$$inline_139$$ = $tuna$ui$modules$__typeTable$$[$type$$71$$] !== $JSCompiler_alias_VOID$$ ? $tuna$ui$modules$__typeTable$$[$type$$71$$] : $JSCompiler_alias_NULL$$, $instances$$2_module$$1_module$$inline_139$$ !== $JSCompiler_alias_NULL$$) {
      $JSCompiler_StaticMethods_initModules$self$$.$__moduleInstances$[$type$$71$$] === $JSCompiler_alias_VOID$$ && ($JSCompiler_StaticMethods_initModules$self$$.$__moduleInstances$[$type$$71$$] = []);
      for(var $moduleArgs$$inline_141$$ = $JSCompiler_StaticMethods_initModules$self$$.$__moduleArgs$[$type$$71$$], $result$$inline_142$$ = [], $commonArgs$$inline_143$$ = [$target$$42$$, $JSCompiler_StaticMethods_initModules$self$$], $i$$inline_144$$ = $moduleArgs$$inline_141$$.length - 1;0 <= $i$$inline_144$$;) {
        $moduleArgs$$inline_141$$[$i$$inline_144$$] !== $JSCompiler_alias_NULL$$ && ($result$$inline_142$$ = $result$$inline_142$$.concat($instances$$2_module$$1_module$$inline_139$$.$init$.apply($instances$$2_module$$1_module$$inline_139$$, $commonArgs$$inline_143$$.concat($moduleArgs$$inline_141$$[$i$$inline_144$$])))), $i$$inline_144$$--
      }
      $instances$$2_module$$1_module$$inline_139$$ = $result$$inline_142$$;
      $JSCompiler_StaticMethods_initModules$self$$.$__moduleInstances$[$type$$71$$] = $JSCompiler_StaticMethods_initModules$self$$.$__moduleInstances$[$type$$71$$].concat($instances$$2_module$$1_module$$inline_139$$)
    }else {
      alert('Unknown module "' + $type$$71$$ + '"')
    }
  }
}
function $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$, $i$$29_type$$74$$, $name$$68$$) {
  if($JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.$__moduleInstances$[$i$$29_type$$74$$] !== $JSCompiler_alias_VOID$$) {
    for(var $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.$__moduleInstances$[$i$$29_type$$74$$], $i$$29_type$$74$$ = 0, $l$$15$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.length;$i$$29_type$$74$$ < $l$$15$$;) {
      if($JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$[$i$$29_type$$74$$].getName() === $name$$68$$) {
        return $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$[$i$$29_type$$74$$]
      }
      $i$$29_type$$74$$++
    }
  }
  return $JSCompiler_alias_NULL$$
}
;function $ControlContainer$$($target$$44$$) {
  $Container$$.call(this, $target$$44$$);
  this.$__controller$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "init-event", $JSCompiler_alias_NULL$$)
}
$tuna$utils$extend$$($ControlContainer$$, $Container$$);
$ControlContainer$$.prototype.clear = function $$ControlContainer$$$$clear$() {
  $Container$$.prototype.clear.call(this);
  this.$__controller$ !== $JSCompiler_alias_NULL$$ && this.$__controller$.$destroy$()
};
$ControlContainer$$.prototype.$init$ = function $$ControlContainer$$$$$init$$() {
  $JSCompiler_StaticMethods_getBooleanOption$$(this, "is-auto-init") && $JSCompiler_StaticMethods_initController$$(this)
};
function $JSCompiler_StaticMethods_initController$$($JSCompiler_StaticMethods_initController$self$$) {
  $JSCompiler_StaticMethods_initController$self$$.$__controller$ = $JSCompiler_StaticMethods_initController$self$$.$_target$ === document.body ? $tuna$view$__mainController$$ : $JSCompiler_StaticMethods_initController$self$$.$_target$ !== $JSCompiler_alias_NULL$$ && $tuna$view$__idTable$$[$JSCompiler_StaticMethods_initController$self$$.$_target$.id] !== $JSCompiler_alias_VOID$$ ? $tuna$view$__idTable$$[$JSCompiler_StaticMethods_initController$self$$.$_target$.id] : $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_initController$self$$.$__controller$ !== $JSCompiler_alias_NULL$$ ? ($JSCompiler_StaticMethods_initController$self$$.$__controller$.$_container$ = $JSCompiler_StaticMethods_initController$self$$, $JSCompiler_StaticMethods_initController$self$$.$__controller$.$init$()) : alert("Can't find controller for " + $JSCompiler_StaticMethods_initController$self$$.$_target$.tagName + "#" + $JSCompiler_StaticMethods_initController$self$$.$_target$.id)
}
;function $Popup$$($target$$45$$) {
  $ModuleInstance$$.call(this, $target$$45$$);
  this.$__isInit$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($Popup$$, $ModuleInstance$$);
$Popup$$.prototype.$init$ = function $$Popup$$$$$init$$() {
  if(!this.$__isInit$) {
    var $self$$3$$ = this;
    $tuna$dom$addChildEventListener$$(this.$_target$, ".j-popup-close", "click", function($event$$13$$) {
      $tuna$dom$preventDefault$$($event$$13$$);
      $self$$3$$.close()
    });
    $tuna$dom$addChildEventListener$$(this.$_target$, ".j-popup-apply", "click", function($event$$14$$) {
      $tuna$dom$preventDefault$$($event$$14$$);
      $self$$3$$.apply()
    })
  }
};
$Popup$$.prototype.open = function $$Popup$$$$open$() {
  this.$dispatch$("popup-open") && $tuna$dom$addClass$$(this.$_target$, "show")
};
$Popup$$.prototype.close = function $$Popup$$$$close$() {
  this.$dispatch$("popup-close") && $tuna$dom$removeClass$$(this.$_target$, "show")
};
$Popup$$.prototype.apply = function $$Popup$$$$apply$() {
  this.$dispatch$("popup-apply", $JSCompiler_StaticMethods___collectData$$(this)) && $tuna$dom$removeClass$$(this.$_target$, "show")
};
function $JSCompiler_StaticMethods___collectData$$($JSCompiler_StaticMethods___collectData$self_form$$) {
  $JSCompiler_StaticMethods___collectData$self_form$$ = $tuna$dom$selectOne$$("form.j-popup-form", $JSCompiler_StaticMethods___collectData$self_form$$.$_target$);
  return $JSCompiler_StaticMethods___collectData$self_form$$ !== $JSCompiler_alias_NULL$$ ? $tuna$ui$forms$serialize$$($JSCompiler_StaticMethods___collectData$self_form$$) : $JSCompiler_alias_NULL$$
}
;var $tuna$ui$popups$__idTable$$ = {}, $tuna$ui$popups$__lastId$$ = 0;
function $tuna$ui$popups$create$$($target$$46$$) {
  "" === $target$$46$$.id && ($target$$46$$.id = "popup_" + $tuna$ui$popups$__lastId$$++);
  if($tuna$ui$popups$__idTable$$[$target$$46$$.id] === $JSCompiler_alias_VOID$$) {
    var $popup$$ = new $Popup$$($target$$46$$);
    $popup$$.$init$();
    $tuna$ui$popups$__idTable$$[$target$$46$$.id] = $popup$$
  }
  return $tuna$ui$popups$__idTable$$[$target$$46$$.id]
}
;function $Button$$($target$$49$$) {
  $ModuleInstance$$.call(this, $target$$49$$);
  this.$__isInit$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($Button$$, $ModuleInstance$$);
$Button$$.prototype.$init$ = function $$Button$$$$$init$$() {
  this.$__isInit$ || (this.$__isInit$ = $JSCompiler_alias_TRUE$$)
};
$Button$$.prototype.setActive = function $$Button$$$$setActive$($isActive$$) {
  $tuna$dom$setClassExist$$(this.$_target$, "active", $isActive$$)
};
function $ButtonGroup$$($target$$50$$) {
  $ModuleInstance$$.call(this, $target$$50$$);
  this.$__defaultAction$ = $JSCompiler_alias_NULL$$;
  this.$__isPreventDefault$ = $JSCompiler_alias_TRUE$$;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "button-selector", ".j-button")
}
$tuna$utils$extend$$($ButtonGroup$$, $ModuleInstance$$);
$ButtonGroup$$.prototype.$init$ = function $$ButtonGroup$$$$$init$$() {
  var $self$$4$$ = this, $buttonSelector$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "button-selector");
  $buttonSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$(this.$_target$, $buttonSelector$$, "click", function($event$$17$$) {
    $self$$4$$.$__isPreventDefault$ && $tuna$dom$preventDefault$$($event$$17$$);
    var $button$$ = $tuna$ui$buttons$create$$(this), $action$$3$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$, "action");
    $action$$3$$ === $JSCompiler_alias_NULL$$ && ($action$$3$$ = $self$$4$$.$__defaultAction$);
    $action$$3$$ !== $JSCompiler_alias_NULL$$ && ($self$$4$$.$dispatch$($action$$3$$, $button$$) || $tuna$dom$stopPropagation$$($event$$17$$))
  })
};
var $tuna$ui$buttons$__idTable$$ = {}, $tuna$ui$buttons$__lastId$$ = 0;
function $tuna$ui$buttons$create$$($target$$51$$) {
  "" === $target$$51$$.id && ($target$$51$$.id = "button_" + $tuna$ui$buttons$__lastId$$++);
  if($tuna$ui$buttons$__idTable$$[$target$$51$$.id] === $JSCompiler_alias_VOID$$) {
    var $button$$1$$ = new $Button$$($target$$51$$);
    $button$$1$$.$init$();
    $tuna$ui$buttons$__idTable$$[$target$$51$$.id] = $button$$1$$
  }
  return $tuna$ui$buttons$__idTable$$[$target$$51$$.id]
}
;function $SWF$$($target$$52$$) {
  $ModuleInstance$$.call(this, $target$$52$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "wmode", "opaque");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "menu", $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "allow-fullscreen", $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "allow-script-access", "always")
}
$tuna$utils$extend$$($SWF$$, $ModuleInstance$$);
$SWF$$.prototype.$init$ = function $$SWF$$$$$init$$() {
  "" === this.$_target$.id && (this.$_target$.id = "swf_" + $tuna$ui$flash$__lastId$$++);
  swfobject.embedSWF($JSCompiler_StaticMethods_getStringOption$$(this, "src"), this.$_target$.id, $JSCompiler_StaticMethods_getNumberOption$$(this, "width"), $JSCompiler_StaticMethods_getNumberOption$$(this, "height"), "10.0.0", $JSCompiler_alias_NULL$$, $JSCompiler_StaticMethods_getStringOption$$(this, "flashvars"), {wmode:$JSCompiler_StaticMethods_getStringOption$$(this, "wmode"), allowfullscreen:$JSCompiler_StaticMethods_getStringOption$$(this, "allow-fullscreen"), allowscriptaccess:$JSCompiler_StaticMethods_getStringOption$$(this, 
  "allow-script-access"), menu:$JSCompiler_StaticMethods_getStringOption$$(this, "menu")})
};
var $tuna$ui$flash$__lastId$$ = 0;
function $Form$$($target$$53$$) {
  $ModuleInstance$$.call(this, $target$$53$$);
  this.$__formMessage$ = $JSCompiler_alias_NULL$$;
  this.$__inputTable$ = {};
  this.$__callbackName$ = "form_callback" + (Math.random() + "").substr(2);
  this.$__recordName$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($Form$$, $ModuleInstance$$);
$Form$$.prototype.$init$ = function $$Form$$$$$init$$() {
  function $prepareListener$$($event$$18$$) {
    $self$$5$$.isEnabled() ? ($callbackInput$$.setAttribute("value", $self$$5$$.$__callbackName$), $JSCompiler_StaticMethods___prepareTo$$($self$$5$$, $event$$18$$.type, $event$$18$$)) : $tuna$dom$preventDefault$$($event$$18$$)
  }
  this.$__recordName$ = $JSCompiler_StaticMethods_getStringOption$$(this, "record-type");
  this.$__formMessage$ = $tuna$dom$selectOne$$(".j-form-message", this.$_target$);
  var $callbackInput$$ = document.createElement("input");
  $callbackInput$$.setAttribute("type", "hidden");
  $callbackInput$$.setAttribute("name", "__callback");
  this.$_target$.appendChild($callbackInput$$);
  var $self$$5$$ = this;
  $tuna$dom$addEventListener$$(this.$_target$, "submit", $prepareListener$$);
  $tuna$dom$addEventListener$$(this.$_target$, "reset", $prepareListener$$);
  window[this.$__callbackName$] = function $window$this$$__callbackName$$($errors$$inline_160_response$$) {
    var $i$$inline_340_response$$inline_159$$ = $errors$$inline_160_response$$.response, $errors$$inline_160_response$$ = $errors$$inline_160_response$$.errors;
    if($i$$inline_340_response$$inline_159$$ !== $JSCompiler_alias_VOID$$) {
      $self$$5$$.$__recordName$ !== $JSCompiler_alias_NULL$$ && ($i$$inline_340_response$$inline_159$$ = $tuna$rest$populateRecords$$($i$$inline_340_response$$inline_159$$, $self$$5$$.$__recordName$)), $self$$5$$.$dispatch$("result", $i$$inline_340_response$$inline_159$$)
    }else {
      if($errors$$inline_160_response$$ !== $JSCompiler_alias_VOID$$) {
        for(var $i$$inline_340_response$$inline_159$$ = 0, $l$$inline_341$$ = $errors$$inline_160_response$$.length, $error$$inline_342_name$$inline_364$$ = $JSCompiler_alias_NULL$$;$i$$inline_340_response$$inline_159$$ < $l$$inline_341$$;) {
          $error$$inline_342_name$$inline_364$$ = $errors$$inline_160_response$$[$i$$inline_340_response$$inline_159$$];
          if($error$$inline_342_name$$inline_364$$.param !== $JSCompiler_alias_VOID$$) {
            var $JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$ = $self$$5$$, $message$$inline_344_message$$inline_370$$ = $error$$inline_342_name$$inline_364$$.message, $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$;
            $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$ = $JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$;
            var $error$$inline_342_name$$inline_364$$ = $error$$inline_342_name$$inline_364$$.param, $result$$inline_365$$ = $JSCompiler_alias_NULL$$;
            if($JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$.$__inputTable$[$error$$inline_342_name$$inline_364$$] === $JSCompiler_alias_VOID$$) {
              var $input$$inline_367_inputWrapper$$inline_366$$ = $tuna$dom$selectOne$$(".j-" + $error$$inline_342_name$$inline_364$$ + "-input", $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$.$_target$);
              $input$$inline_367_inputWrapper$$inline_366$$ !== $JSCompiler_alias_NULL$$ && ($input$$inline_367_inputWrapper$$inline_366$$ = new $tuna$ui$forms$FormInput$$($input$$inline_367_inputWrapper$$inline_366$$), $input$$inline_367_inputWrapper$$inline_366$$.$init$(), $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$.$__inputTable$[$error$$inline_342_name$$inline_364$$] = $input$$inline_367_inputWrapper$$inline_366$$)
            }
            $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$.$__inputTable$[$error$$inline_342_name$$inline_364$$] !== $JSCompiler_alias_VOID$$ && ($result$$inline_365$$ = $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$.$__inputTable$[$error$$inline_342_name$$inline_364$$]);
            $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$ = $result$$inline_365$$;
            $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$ !== $JSCompiler_alias_NULL$$ ? ($JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$ = $JSCompiler_StaticMethods___getFormInput$self$$inline_363_formInput$$inline_345$$, $tuna$dom$addClass$$($JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$.$_target$, "error"), $JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$.$__message$ !== 
            $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$.$__message$.innerHTML = $message$$inline_344_message$$inline_370$$)) : $JSCompiler_StaticMethods___showErrorMessage$$($JSCompiler_StaticMethods___showInputError$self$$inline_343_JSCompiler_StaticMethods_showErrorMessage$self$$inline_369$$, $message$$inline_344_message$$inline_370$$)
          }else {
            $JSCompiler_StaticMethods___showErrorMessage$$($self$$5$$, $error$$inline_342_name$$inline_364$$.message)
          }
          $i$$inline_340_response$$inline_159$$++
        }
        $self$$5$$.$dispatch$("error", $errors$$inline_160_response$$)
      }
    }
  }
};
$Form$$.prototype.$getValue$ = function $$Form$$$$$getValue$$($name$$70$$) {
  var $data$$37$$ = $tuna$ui$forms$serialize$$(this.$_target$);
  return $data$$37$$[$name$$70$$] !== $JSCompiler_alias_VOID$$ ? $data$$37$$[$name$$70$$] : $JSCompiler_alias_NULL$$
};
$Form$$.prototype.reset = function $$Form$$$$reset$() {
  $JSCompiler_StaticMethods___prepareTo$$(this, "reset");
  this.$_target$.reset()
};
$Form$$.prototype.$serialize$ = function $$Form$$$$$serialize$$() {
  return $tuna$ui$forms$serialize$$(this.$_target$)
};
function $JSCompiler_StaticMethods___prepareTo$$($JSCompiler_StaticMethods___prepareTo$self$$, $JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$, $event$$19$$) {
  if($JSCompiler_StaticMethods___prepareTo$self$$.$dispatch$($JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$)) {
    $JSCompiler_StaticMethods___prepareTo$self$$.$__formMessage$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___prepareTo$self$$.$__formMessage$.innerHTML = "", $tuna$dom$addClass$$($JSCompiler_StaticMethods___prepareTo$self$$.$__formMessage$, "hide"));
    for(var $name$$inline_165$$ in $JSCompiler_StaticMethods___prepareTo$self$$.$__inputTable$) {
      $JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$ = $JSCompiler_StaticMethods___prepareTo$self$$.$__inputTable$[$name$$inline_165$$], $tuna$dom$removeClass$$($JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$.$_target$, "error"), $JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$.$__message$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$.$__message$.innerHTML = $JSCompiler_StaticMethods_cleanup$self$$inline_347_type$$75$$.$__defaultMessage$)
    }
  }else {
    $event$$19$$ !== $JSCompiler_alias_VOID$$ && $tuna$dom$preventDefault$$($event$$19$$)
  }
}
function $JSCompiler_StaticMethods___showErrorMessage$$($JSCompiler_StaticMethods___showErrorMessage$self$$, $message$$12$$) {
  $JSCompiler_StaticMethods___showErrorMessage$self$$.$__formMessage$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___showErrorMessage$self$$.$__formMessage$.innerHTML += $message$$12$$ + "<br />", $tuna$dom$removeClass$$($JSCompiler_StaticMethods___showErrorMessage$self$$.$__formMessage$, "hide"))
}
;function $FormInput$$($target$$54$$) {
  $ModuleInstance$$.call(this, $target$$54$$);
  this.$__message$ = $JSCompiler_alias_NULL$$;
  this.$__defaultMessage$ = ""
}
$tuna$utils$extend$$($FormInput$$, $ModuleInstance$$);
$FormInput$$.prototype.$init$ = function $$FormInput$$$$$init$$() {
  this.$__message$ = $tuna$dom$selectOne$$(".j-message", this.$_target$);
  this.$__message$ !== $JSCompiler_alias_NULL$$ && (this.$__defaultMessage$ = this.$__message$.innerHTML)
};
var $tuna$ui$forms$FormInput$$ = $FormInput$$;
function $InputFilter$$($target$$55$$) {
  $ModuleInstance$$.call(this, $target$$55$$);
  this.$_input$ = this.$_currentData$ = this.$_data$ = $JSCompiler_alias_NULL$$;
  this.$_itemSerializeCallback$ = function $this$$_itemSerializeCallback$$($item$$15$$) {
    return $item$$15$$.name !== $JSCompiler_alias_VOID$$ ? "" + $item$$15$$.name : ""
  };
  this.$_transformer$ = new $tuna$ui$transformers$TemplateTransformer$$($target$$55$$)
}
$tuna$utils$extend$$($InputFilter$$, $ModuleInstance$$);
$JSCompiler_prototypeAlias$$ = $InputFilter$$.prototype;
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$() {
  this.$_input$ = $tuna$dom$selectOne$$("input.j-filtration", this.$_target$);
  if(this.$_input$ !== $JSCompiler_alias_NULL$$) {
    var $self$$6$$ = this, $lastValue$$ = $JSCompiler_alias_NULL$$;
    $tuna$dom$addEventListener$$(this.$_input$, "keyup", function() {
      this.value !== $lastValue$$ && ($self$$6$$.filter(this.value), $lastValue$$ = this.value)
    })
  }
  this.$_transformer$.$init$()
};
$JSCompiler_prototypeAlias$$.setData = function $$JSCompiler_prototypeAlias$$$setData$($data$$39$$) {
  this.$_currentData$ = this.$_data$ = $data$$39$$;
  this.update()
};
$JSCompiler_prototypeAlias$$.filter = function $$JSCompiler_prototypeAlias$$$filter$($needle$$inline_176_term$$) {
  var $result$$inline_175$$ = [];
  if(!$needle$$inline_176_term$$ || 0 === $needle$$inline_176_term$$.length) {
    $result$$inline_175$$ = this.$_data$
  }else {
    for(var $needle$$inline_176_term$$ = $needle$$inline_176_term$$.toUpperCase(), $i$$inline_177$$ = 0, $l$$inline_178$$ = this.$_data$.length, $core$$inline_179$$ = $JSCompiler_alias_NULL$$;$i$$inline_177$$ < $l$$inline_178$$;) {
      $core$$inline_179$$ = this.$_itemSerializeCallback$(this.$_data$[$i$$inline_177$$]), -1 !== $core$$inline_179$$.toUpperCase().indexOf($needle$$inline_176_term$$) && $result$$inline_175$$.push(this.$_data$[$i$$inline_177$$]), $i$$inline_177$$++
    }
  }
  this.$_currentData$ = $result$$inline_175$$;
  this.update()
};
$JSCompiler_prototypeAlias$$.update = function $$JSCompiler_prototypeAlias$$$update$() {
  this.$_transformer$.$applyTransform$(this.$_currentData$)
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$_input$.value = "";
  this.filter("")
};
function $Autocomplete$$($target$$56$$) {
  $InputFilter$$.call(this, $target$$56$$);
  this.$__selectedData$ = $JSCompiler_alias_NULL$$;
  this.$__selectionGroup$ = new $tuna$ui$selection$SelectionGroup$$($target$$56$$, $JSCompiler_alias_NULL$$)
}
$tuna$utils$extend$$($Autocomplete$$, $InputFilter$$);
$Autocomplete$$.prototype.$init$ = function $$Autocomplete$$$$$init$$() {
  $InputFilter$$.prototype.$init$.call(this);
  var $body$$1$$ = $tuna$dom$selectOne$$(".j-autocomplete-body", this.$_target$), $self$$7$$ = this, $isOpen$$ = $JSCompiler_alias_FALSE$$;
  $tuna$dom$addEventListener$$(this.$_input$, "focus", function() {
    $isOpen$$ || ($tuna$dom$addOneEventListener$$(function() {
      $self$$7$$.$__selectedData$ === $JSCompiler_alias_NULL$$ && $self$$7$$.clear();
      $tuna$dom$addClass$$($body$$1$$, "hide");
      $isOpen$$ = $JSCompiler_alias_FALSE$$
    }), $tuna$dom$removeClass$$($body$$1$$, "hide"), $isOpen$$ = $JSCompiler_alias_TRUE$$)
  });
  $tuna$dom$addChildEventListener$$(this.$_target$, ".j-autocomplete-item", "click", function($event$$22$$) {
    var $index$$54$$ = $self$$7$$.$__selectionGroup$.$getItemIndex$(this);
    $index$$54$$ !== $JSCompiler_alias_NULL$$ ? $self$$7$$.$selectIndex$($index$$54$$) : $tuna$dom$stopPropagation$$($event$$22$$)
  });
  $tuna$dom$addEventListener$$(this.$_input$, "click", function($event$$23$$) {
    $tuna$dom$stopPropagation$$($event$$23$$)
  });
  $JSCompiler_StaticMethods_setOption$$(this.$__selectionGroup$, "item-selector", ".j-autocomplete-item");
  this.$__selectionGroup$.$init$()
};
$Autocomplete$$.prototype.$selectIndex$ = function $$Autocomplete$$$$$selectIndex$$($index$$55$$) {
  0 < this.$_currentData$.length && (this.$__selectedData$ = this.$_currentData$[$index$$55$$], this.$_input$.value = this.$_itemSerializeCallback$(this.$__selectedData$), this.$dispatch$("change"))
};
$Autocomplete$$.prototype.$clearSelection$ = function $$Autocomplete$$$$$clearSelection$$() {
  this.$__selectedData$ !== $JSCompiler_alias_NULL$$ && (this.$__selectedData$ = $JSCompiler_alias_NULL$$, this.$dispatch$("change"))
};
$Autocomplete$$.prototype.update = function $$Autocomplete$$$$update$() {
  $InputFilter$$.prototype.update.call(this);
  this.$__selectionGroup$.$updateView$();
  this.$clearSelection$()
};
function $tuna$ui$forms$serialize$$($elements$$4_formElement$$) {
  for(var $result$$15$$ = {}, $elements$$4_formElement$$ = $elements$$4_formElement$$.elements, $i$$33$$ = 0, $l$$18$$ = $elements$$4_formElement$$.length, $name$$74$$ = $JSCompiler_alias_NULL$$;$i$$33$$ < $l$$18$$;) {
    $name$$74$$ = $elements$$4_formElement$$[$i$$33$$].name, $result$$15$$[$name$$74$$] !== $JSCompiler_alias_VOID$$ ? ($result$$15$$[$name$$74$$] instanceof Array || ($result$$15$$[$name$$74$$] = [$result$$15$$[$name$$74$$]]), $result$$15$$[$name$$74$$].push($elements$$4_formElement$$[$i$$33$$].value)) : $result$$15$$[$name$$74$$] = $elements$$4_formElement$$[$i$$33$$].value, $i$$33$$++
  }
  return $result$$15$$
}
;function $ITransformHandler$$() {
}
$ITransformHandler$$.prototype.$handleTransformComplete$ = $JSCompiler_emptyFn$$();
function $ITransformer$$() {
}
$ITransformer$$.prototype.$applyTransform$ = $JSCompiler_emptyFn$$();
function $TemplateTransformer$$($target$$60$$) {
  $ModuleInstance$$.call(this, $target$$60$$);
  this.$__transformHandler$ = this.$__template$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($TemplateTransformer$$, $ModuleInstance$$);
$tuna$utils$implement$$($TemplateTransformer$$, $ITransformer$$);
$TemplateTransformer$$.prototype.$init$ = function $$TemplateTransformer$$$$$init$$() {
  var $templateId$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "template-id"), $settings$$21$$;
  $templateId$$ !== $JSCompiler_alias_NULL$$ ? ($tuna$tmpl$__settingsTable$$[$templateId$$] === $JSCompiler_alias_VOID$$ && ($tuna$tmpl$__settingsTable$$[$templateId$$] = $JSCompiler_StaticMethods_buildSettings$$($tuna$tmpl$__markupBuilder$$, $templateId$$)), $settings$$21$$ = $tuna$tmpl$__settingsTable$$[$templateId$$]) : $settings$$21$$ = $JSCompiler_alias_NULL$$;
  $settings$$21$$ !== $JSCompiler_alias_NULL$$ ? this.$__template$ = $JSCompiler_StaticMethods_compileTemplate$$($tuna$tmpl$__compiler$$, $settings$$21$$, this.$_target$, $JSCompiler_alias_NULL$$) : alert("Unknown template " + $templateId$$)
};
$TemplateTransformer$$.prototype.$applyTransform$ = function $$TemplateTransformer$$$$$applyTransform$$($data$$42$$) {
  this.$__template$.$applyData$(new $tuna$tmpl$data$DataNode$$($data$$42$$));
  this.$__transformHandler$ !== $JSCompiler_alias_NULL$$ && this.$__transformHandler$.$handleTransformComplete$(this.$_target$, this.$__template$.$__createdChildren$.splice(0, this.$__template$.$__createdChildren$.length), this.$__template$.$__removedChildren$.splice(0, this.$__template$.$__removedChildren$.length))
};
$TemplateTransformer$$.prototype.$destroy$ = function $$TemplateTransformer$$$$$destroy$$() {
  this.$__template$.$destroy$();
  this.$__transformHandler$ !== $JSCompiler_alias_NULL$$ && this.$__template$.$__removedChildren$.splice(0, this.$__template$.$__removedChildren$.length);
  this.$__transformHandler$ = this.$__template$ = $JSCompiler_alias_NULL$$
};
var $tuna$ui$transformers$TemplateTransformer$$ = $TemplateTransformer$$;
function $ISelectionGroup$$() {
}
$JSCompiler_prototypeAlias$$ = $ISelectionGroup$$.prototype;
$JSCompiler_prototypeAlias$$.$getSelectedIndexes$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$selectIndex$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$clearSelection$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$isIndexEnabled$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$getItemIndex$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$getItemAt$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$updateView$ = $JSCompiler_emptyFn$$();
function $AbstractSelectionGroup$$($target$$61$$) {
  $ModuleInstance$$.call(this, $target$$61$$);
  this.$_selectionRule$ = this.$_selectionView$ = this.$_itemsCollection$ = $JSCompiler_alias_NULL$$;
  this.$_disabledIndexes$ = []
}
$tuna$utils$implement$$($AbstractSelectionGroup$$, $ISelectionGroup$$);
$tuna$utils$extend$$($AbstractSelectionGroup$$, $ModuleInstance$$);
$JSCompiler_prototypeAlias$$ = $AbstractSelectionGroup$$.prototype;
$JSCompiler_prototypeAlias$$.$isIndexEnabled$ = function $$JSCompiler_prototypeAlias$$$$isIndexEnabled$$($index$$62$$) {
  return this.$_itemsCollection$.$getItemAt$($index$$62$$) !== $JSCompiler_alias_NULL$$ && -1 === $tuna$utils$indexOf$$($index$$62$$, this.$_disabledIndexes$)
};
$JSCompiler_prototypeAlias$$.$updateView$ = function $$JSCompiler_prototypeAlias$$$$updateView$$() {
  this.$_selectionView$.update()
};
$JSCompiler_prototypeAlias$$.$getItemIndex$ = function $$JSCompiler_prototypeAlias$$$$getItemIndex$$($item$$17$$) {
  return this.$_itemsCollection$.$getItemIndex$($item$$17$$)
};
$JSCompiler_prototypeAlias$$.$getItemAt$ = function $$JSCompiler_prototypeAlias$$$$getItemAt$$($index$$63$$) {
  return this.$_itemsCollection$.$getItemAt$($index$$63$$)
};
$JSCompiler_prototypeAlias$$.$getSelectedIndexes$ = function $$JSCompiler_prototypeAlias$$$$getSelectedIndexes$$() {
  return this.$_selectionRule$.$getSelectedIndexes$()
};
function $JSCompiler_StaticMethods_getLastSelectedIndex$$($JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$) {
  $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$ = $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$.$_selectionRule$.$getSelectedIndexes$();
  return 0 < $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$.length ? $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$.pop() : $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$.$selectIndex$ = function $$JSCompiler_prototypeAlias$$$$selectIndex$$($index$$64$$) {
  return this.$_selectionRule$.$selectIndex$($index$$64$$)
};
$JSCompiler_prototypeAlias$$.$clearSelection$ = function $$JSCompiler_prototypeAlias$$$$clearSelection$$() {
  this.$_selectionRule$.$clearSelection$()
};
function $SelectionGroup$$($target$$62$$, $indexAttribute$$) {
  $AbstractSelectionGroup$$.call(this, $target$$62$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "item-selector", ".j-selection-item");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "index-attribute", $indexAttribute$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "is-multiple", $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "selection-class", "active");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "selection-event", "click")
}
$tuna$utils$extend$$($SelectionGroup$$, $AbstractSelectionGroup$$);
$SelectionGroup$$.prototype.$init$ = function $$SelectionGroup$$$$$init$$() {
  var $indexAttribute$$1$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "index-attribute");
  this.$_itemsCollection$ = $indexAttribute$$1$$ === $JSCompiler_alias_NULL$$ ? new $tuna$ui$selection$items$ElementsCollection$$ : new $tuna$ui$selection$items$NamedElementsCollection$$($indexAttribute$$1$$);
  this.$_selectionView$ = new $tuna$ui$selection$view$ClassSelectionView$$(this.$_target$);
  this.$_selectionRule$ = $JSCompiler_StaticMethods_getBooleanOption$$(this, "is-multiple") ? new $tuna$ui$selection$rule$MultipleSelectionRule$$ : new $tuna$ui$selection$rule$SingleSelectionRule$$;
  this.$_selectionView$.$_selectionClass$ = $JSCompiler_StaticMethods_getStringOption$$(this, "selection-class");
  this.$_selectionView$.$_itemSelector$ = $JSCompiler_StaticMethods_getStringOption$$(this, "item-selector");
  this.$_selectionView$.$setSelectionGroup$(this);
  this.$_selectionView$.$_itemsCollection$ = this.$_itemsCollection$;
  this.$_selectionRule$.$setSelectionGroup$(this);
  this.$_selectionRule$.$_eventDispatcher$ = this;
  this.$_selectionRule$.$_selectionView$ = this.$_selectionView$;
  this.$_selectionView$.update()
};
var $tuna$ui$selection$SelectionGroup$$ = $SelectionGroup$$;
function $Navigation$$($target$$63$$) {
  $tuna$ui$selection$SelectionGroup$$.call(this, $target$$63$$, "id");
  this.$__openData$ = $JSCompiler_alias_NULL$$;
  this.$__history$ = [];
  this.$__controls$ = $JSCompiler_alias_NULL$$;
  this.$__menuLinks$ = {};
  $JSCompiler_StaticMethods_setOption$$(this, "is-multiple", $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "item-selector", ".j-navigation-page");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "menu-selector", ".j-navigation-menu")
}
$tuna$utils$extend$$($Navigation$$, $tuna$ui$selection$SelectionGroup$$);
$Navigation$$.prototype.$init$ = function $$Navigation$$$$$init$$() {
  $tuna$ui$selection$SelectionGroup$$.prototype.$init$.call(this);
  var $self$$8$$ = this;
  this.addEventListener("deselected", function($event$$24$$, $index$$66$$) {
    $JSCompiler_StaticMethods___updateMenu$$($self$$8$$, $index$$66$$, $JSCompiler_alias_FALSE$$);
    $self$$8$$.$dispatch$("close")
  });
  this.addEventListener("selected", function($event$$25$$, $index$$67$$) {
    $JSCompiler_StaticMethods___updateMenu$$($self$$8$$, $index$$67$$, $JSCompiler_alias_TRUE$$);
    $self$$8$$.$dispatch$("open", $self$$8$$.$__openData$)
  });
  this.$__controls$ = new $ButtonGroup$$(this.$_target$);
  $JSCompiler_StaticMethods_setOption$$(this.$__controls$, "button-selector", ".j-navigation-link");
  this.$__controls$.$__defaultAction$ = "navigate";
  this.$__controls$.addEventListener("navigate", function($event$$26$$, $button$$2$$) {
    var $index$$68$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$2$$, "href");
    if($index$$68$$ !== $JSCompiler_alias_NULL$$) {
      var $prefix$$inline_351$$;
      $prefix$$inline_351$$ === $JSCompiler_alias_VOID$$ && ($prefix$$inline_351$$ = "data-");
      for(var $result$$inline_352$$ = {}, $attrs$$inline_353$$ = $button$$2$$.$_target$.attributes, $i$$inline_354$$ = 0, $l$$inline_355$$ = $attrs$$inline_353$$.length;$i$$inline_354$$ < $l$$inline_355$$;) {
        0 === $attrs$$inline_353$$[$i$$inline_354$$].name.indexOf($prefix$$inline_351$$) && ($result$$inline_352$$[$attrs$$inline_353$$[$i$$inline_354$$].name.substr($prefix$$inline_351$$.length)] = $attrs$$inline_353$$[$i$$inline_354$$].value), $i$$inline_354$$++
      }
      $self$$8$$.navigate($index$$68$$, $result$$inline_352$$) && $event$$26$$.preventDefault()
    }
  });
  this.$__controls$.addEventListener("back", function() {
    $self$$8$$.back()
  });
  this.$__controls$.$init$();
  $JSCompiler_StaticMethods___initMenu$$(this)
};
function $JSCompiler_StaticMethods___initMenu$$($JSCompiler_StaticMethods___initMenu$self$$) {
  var $i$$34_menu_menuSelector$$ = $JSCompiler_StaticMethods_getStringOption$$($JSCompiler_StaticMethods___initMenu$self$$, "menu-selector"), $buttonSelector$$1_buttons_index$$69$$ = $JSCompiler_StaticMethods_getStringOption$$($JSCompiler_StaticMethods___initMenu$self$$, "button-selector");
  if($i$$34_menu_menuSelector$$ !== $JSCompiler_alias_NULL$$ && $buttonSelector$$1_buttons_index$$69$$ !== $JSCompiler_alias_NULL$$) {
    for(var $i$$34_menu_menuSelector$$ = $tuna$dom$selectOne$$($i$$34_menu_menuSelector$$, $JSCompiler_StaticMethods___initMenu$self$$.$_target$), $buttonSelector$$1_buttons_index$$69$$ = $tuna$dom$select$$($buttonSelector$$1_buttons_index$$69$$, $i$$34_menu_menuSelector$$), $i$$34_menu_menuSelector$$ = 0, $l$$19$$ = $buttonSelector$$1_buttons_index$$69$$.length, $href$$ = $JSCompiler_alias_NULL$$, $button$$4$$ = $JSCompiler_alias_NULL$$;$i$$34_menu_menuSelector$$ < $l$$19$$;) {
      $button$$4$$ = $tuna$ui$buttons$create$$($buttonSelector$$1_buttons_index$$69$$[$i$$34_menu_menuSelector$$]), $href$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$4$$, "href"), $href$$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___initMenu$self$$.$__menuLinks$[$href$$] === $JSCompiler_alias_VOID$$ && ($JSCompiler_StaticMethods___initMenu$self$$.$__menuLinks$[$href$$] = []), $JSCompiler_StaticMethods___initMenu$self$$.$__menuLinks$[$href$$].push($button$$4$$)), $i$$34_menu_menuSelector$$++
    }
  }
  $buttonSelector$$1_buttons_index$$69$$ = $JSCompiler_StaticMethods_getLastSelectedIndex$$($JSCompiler_StaticMethods___initMenu$self$$);
  $buttonSelector$$1_buttons_index$$69$$ !== $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods___updateMenu$$($JSCompiler_StaticMethods___initMenu$self$$, $buttonSelector$$1_buttons_index$$69$$, $JSCompiler_alias_TRUE$$)
}
function $JSCompiler_StaticMethods___updateMenu$$($JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$, $i$$35_index$$70$$, $isSelected$$) {
  $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$ = $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$.$__menuLinks$[$i$$35_index$$70$$];
  if($JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$ !== $JSCompiler_alias_VOID$$) {
    for(var $i$$35_index$$70$$ = 0, $l$$20$$ = $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$.length;$i$$35_index$$70$$ < $l$$20$$;) {
      $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$[$i$$35_index$$70$$].setActive($isSelected$$), $i$$35_index$$70$$++
    }
  }
}
$Navigation$$.prototype.navigate = function $$Navigation$$$$navigate$($index$$71$$, $data$$43$$) {
  var $currentIndex_result$$16$$ = $JSCompiler_StaticMethods_getLastSelectedIndex$$(this);
  $currentIndex_result$$16$$ !== $JSCompiler_alias_NULL$$ && this.$__history$.push($currentIndex_result$$16$$);
  this.$__openData$ = $data$$43$$ || $JSCompiler_alias_NULL$$;
  $currentIndex_result$$16$$ = this.$selectIndex$($index$$71$$);
  this.$__openData$ = $JSCompiler_alias_NULL$$;
  return $currentIndex_result$$16$$
};
$Navigation$$.prototype.back = function $$Navigation$$$$back$() {
  this.$selectIndex$(this.$__history$.pop())
};
function $Carousel$$($target$$64$$) {
  $tuna$ui$selection$SelectionGroup$$.call(this, $target$$64$$, $JSCompiler_alias_NULL$$);
  this.$__shiftIndex$ = -1;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "item-selector", ".j-carousel-item");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "next-button-selector", ".j-carousel-next");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "back-button-selector", ".j-carousel-back")
}
$tuna$utils$extend$$($Carousel$$, $tuna$ui$selection$SelectionGroup$$);
$Carousel$$.prototype.$init$ = function $$Carousel$$$$$init$$() {
  $tuna$ui$selection$SelectionGroup$$.prototype.$init$.call(this);
  var $self$$9$$ = this;
  this.$__shiftIndex$ = Number($JSCompiler_StaticMethods_getLastSelectedIndex$$(this));
  var $backButtonSelector_nextButtonSelector$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "next-button-selector");
  $backButtonSelector_nextButtonSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$(this.$_target$, $backButtonSelector_nextButtonSelector$$, "click", function($event$$28$$) {
    $tuna$dom$preventDefault$$($event$$28$$);
    $self$$9$$.next()
  });
  $backButtonSelector_nextButtonSelector$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "back-button-selector");
  $backButtonSelector_nextButtonSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$(this.$_target$, $backButtonSelector_nextButtonSelector$$, "click", function($event$$29$$) {
    $tuna$dom$preventDefault$$($event$$29$$);
    $self$$9$$.back()
  })
};
$Carousel$$.prototype.next = function $$Carousel$$$$next$() {
  this.$__shiftIndex$++;
  this.$getItemAt$(this.$__shiftIndex$) === $JSCompiler_alias_NULL$$ && (this.$__shiftIndex$ = 0);
  this.$selectIndex$(this.$__shiftIndex$)
};
$Carousel$$.prototype.back = function $$Carousel$$$$back$() {
  this.$__shiftIndex$--;
  this.$getItemAt$(this.$__shiftIndex$) === $JSCompiler_alias_NULL$$ && (this.$__shiftIndex$ = this.$_itemsCollection$.$getItemsCount$() - 1);
  this.$selectIndex$(this.$__shiftIndex$)
};
function $IItemsCollection$$() {
}
$JSCompiler_prototypeAlias$$ = $IItemsCollection$$.prototype;
$JSCompiler_prototypeAlias$$.$addItem$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$getItemIndex$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$getItemAt$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.clear = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$getItemsCount$ = $JSCompiler_emptyFn$$();
function $ElementsCollection$$() {
  this.$__items$ = []
}
$tuna$utils$implement$$($ElementsCollection$$, $IItemsCollection$$);
$JSCompiler_prototypeAlias$$ = $ElementsCollection$$.prototype;
$JSCompiler_prototypeAlias$$.$addItem$ = function $$JSCompiler_prototypeAlias$$$$addItem$$($item$$20$$) {
  return this.$__items$.push($item$$20$$) - 1
};
$JSCompiler_prototypeAlias$$.$getItemIndex$ = function $$JSCompiler_prototypeAlias$$$$getItemIndex$$($item$$21$$) {
  return $tuna$utils$indexOf$$($item$$21$$, this.$__items$)
};
$JSCompiler_prototypeAlias$$.$getItemAt$ = function $$JSCompiler_prototypeAlias$$$$getItemAt$$($index$$73$$) {
  return this.$__items$[$index$$73$$] || $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$__items$.length = 0
};
$JSCompiler_prototypeAlias$$.$getItemsCount$ = function $$JSCompiler_prototypeAlias$$$$getItemsCount$$() {
  return this.$__items$.length
};
var $tuna$ui$selection$items$ElementsCollection$$ = $ElementsCollection$$;
function $NamedElementsCollection$$($indexAttribute$$2$$) {
  this.$__indexAttribute$ = $indexAttribute$$2$$;
  this.$__items$ = {}
}
$tuna$utils$implement$$($NamedElementsCollection$$, $IItemsCollection$$);
$JSCompiler_prototypeAlias$$ = $NamedElementsCollection$$.prototype;
$JSCompiler_prototypeAlias$$.$addItem$ = function $$JSCompiler_prototypeAlias$$$$addItem$$($item$$22$$) {
  var $index$$74$$ = $item$$22$$.getAttribute(this.$__indexAttribute$);
  $index$$74$$ !== $JSCompiler_alias_NULL$$ && (this.$__items$[$index$$74$$] = $item$$22$$);
  return $index$$74$$
};
$JSCompiler_prototypeAlias$$.$getItemIndex$ = function $$JSCompiler_prototypeAlias$$$$getItemIndex$$($index$$75_item$$23$$) {
  $index$$75_item$$23$$ = $index$$75_item$$23$$.getAttribute(this.$__indexAttribute$);
  return $index$$75_item$$23$$ !== $JSCompiler_alias_NULL$$ && this.$__items$[$index$$75_item$$23$$] !== $JSCompiler_alias_VOID$$ ? $index$$75_item$$23$$ : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$getItemAt$ = function $$JSCompiler_prototypeAlias$$$$getItemAt$$($index$$76$$) {
  return this.$__items$[$index$$76$$] || $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$__items$ = {}
};
$JSCompiler_prototypeAlias$$.$getItemsCount$ = function $$JSCompiler_prototypeAlias$$$$getItemsCount$$() {
  var $i$$37$$ = 0, $index$$78$$;
  for($index$$78$$ in this.$__items$) {
    $i$$37$$++
  }
  return $i$$37$$
};
var $tuna$ui$selection$items$NamedElementsCollection$$ = $NamedElementsCollection$$;
function $ISelectionRule$$() {
}
$ISelectionRule$$.prototype.$getSelectedIndexes$ = $JSCompiler_emptyFn$$();
$ISelectionRule$$.prototype.$selectIndex$ = $JSCompiler_emptyFn$$();
$ISelectionRule$$.prototype.$clearSelection$ = $JSCompiler_emptyFn$$();
function $AbstractSelectionRule$$() {
  this.$_eventDispatcher$ = this.$_selectionView$ = this.$_selectionGroup$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$implement$$($AbstractSelectionRule$$, $ISelectionRule$$);
$AbstractSelectionRule$$.prototype.$setSelectionGroup$ = $JSCompiler_set$$("$_selectionGroup$");
$AbstractSelectionRule$$.prototype.$getSelectedIndexes$ = $JSCompiler_emptyFn$$();
$AbstractSelectionRule$$.prototype.$selectIndex$ = $JSCompiler_emptyFn$$();
$AbstractSelectionRule$$.prototype.$clearSelection$ = $JSCompiler_emptyFn$$();
function $SingleSelectionRule$$() {
  $AbstractSelectionRule$$.call(this);
  this.$__currentIndex$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($SingleSelectionRule$$, $AbstractSelectionRule$$);
$SingleSelectionRule$$.prototype.$getSelectedIndexes$ = function $$SingleSelectionRule$$$$$getSelectedIndexes$$() {
  return this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ ? [this.$__currentIndex$] : []
};
$SingleSelectionRule$$.prototype.$selectIndex$ = function $$SingleSelectionRule$$$$$selectIndex$$($index$$83$$) {
  var $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$;
  if($JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ = this.$_selectionGroup$.$isIndexEnabled$($index$$83$$)) {
    if($JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ = this.$__currentIndex$ !== $index$$83$$) {
      $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ = this.$__currentIndex$, $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ = ($JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ === $JSCompiler_alias_NULL$$ || this.$_eventDispatcher$.$dispatch$("deselect", $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$)) && this.$_eventDispatcher$.$dispatch$("select", $index$$83$$)
    }
  }
  return $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ ? ($JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ = this.$__currentIndex$, this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && this.$_selectionView$.$destroySelectionAt$(this.$__currentIndex$), this.$_selectionView$.$applySelectionAt$($index$$83$$), this.$__currentIndex$ = $index$$83$$, $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$ !== $JSCompiler_alias_NULL$$ && 
  this.$_eventDispatcher$.$dispatch$("deselected", $JSCompiler_temp$$10_JSCompiler_temp$$11_oldIndex_oldIndex$$inline_202$$), this.$_eventDispatcher$.$dispatch$("selected", $index$$83$$), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$SingleSelectionRule$$.prototype.$clearSelection$ = function $$SingleSelectionRule$$$$$clearSelection$$() {
  this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && (this.$_selectionView$.$destroySelectionAt$(this.$__currentIndex$), this.$__currentIndex$ = $JSCompiler_alias_NULL$$)
};
var $tuna$ui$selection$rule$SingleSelectionRule$$ = $SingleSelectionRule$$;
function $MultipleSelectionRule$$() {
  $AbstractSelectionRule$$.call(this);
  this.$__selectedIndexes$ = []
}
$tuna$utils$extend$$($MultipleSelectionRule$$, $AbstractSelectionRule$$);
$MultipleSelectionRule$$.prototype.$getSelectedIndexes$ = function $$MultipleSelectionRule$$$$$getSelectedIndexes$$() {
  return this.$__selectedIndexes$.slice(0)
};
$MultipleSelectionRule$$.prototype.$selectIndex$ = function $$MultipleSelectionRule$$$$$selectIndex$$($index$$85$$) {
  if(this.$_selectionGroup$.$isIndexEnabled$($index$$85$$)) {
    var $indexPosition$$1$$ = $tuna$utils$indexOf$$($index$$85$$, this.$__selectedIndexes$);
    if(-1 === $indexPosition$$1$$) {
      if(this.$_eventDispatcher$.$dispatch$("select", $index$$85$$)) {
        return this.$_selectionView$.$applySelectionAt$($index$$85$$), this.$__selectedIndexes$.push($index$$85$$), $JSCompiler_alias_TRUE$$
      }
    }else {
      if(this.$_eventDispatcher$.$dispatch$("deselect", $index$$85$$)) {
        return this.$_selectionView$.$destroySelectionAt$($index$$85$$), this.$__selectedIndexes$.splice($indexPosition$$1$$, 1), $JSCompiler_alias_TRUE$$
      }
    }
  }
  return $JSCompiler_alias_FALSE$$
};
$MultipleSelectionRule$$.prototype.$clearSelection$ = function $$MultipleSelectionRule$$$$$clearSelection$$() {
  for(;0 < this.$__selectedIndexes$.length;) {
    this.$_selectionView$.$destroySelectionAt$(this.$__selectedIndexes$.shift())
  }
};
var $tuna$ui$selection$rule$MultipleSelectionRule$$ = $MultipleSelectionRule$$;
function $ISelectionView$$() {
}
$ISelectionView$$.prototype.$applySelectionAt$ = $JSCompiler_emptyFn$$();
$ISelectionView$$.prototype.$destroySelectionAt$ = $JSCompiler_emptyFn$$();
$ISelectionView$$.prototype.update = $JSCompiler_emptyFn$$();
function $AbstractSelectionView$$() {
  this.$_selectionGroup$ = this.$_itemsCollection$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$implement$$($AbstractSelectionView$$, $ISelectionView$$);
$AbstractSelectionView$$.prototype.$setSelectionGroup$ = $JSCompiler_set$$("$_selectionGroup$");
$AbstractSelectionView$$.prototype.$applySelectionAt$ = $JSCompiler_emptyFn$$();
$AbstractSelectionView$$.prototype.$destroySelectionAt$ = $JSCompiler_emptyFn$$();
$AbstractSelectionView$$.prototype.update = $JSCompiler_emptyFn$$();
function $ClassSelectionView$$($target$$65$$) {
  $AbstractSelectionView$$.call(this);
  this.$_target$ = $target$$65$$;
  this.$_selectionClass$ = this.$_itemSelector$ = ""
}
$tuna$utils$extend$$($ClassSelectionView$$, $AbstractSelectionView$$);
$ClassSelectionView$$.prototype.$applySelectionAt$ = function $$ClassSelectionView$$$$$applySelectionAt$$($index$$95_item$$24$$) {
  $index$$95_item$$24$$ = this.$_itemsCollection$.$getItemAt$($index$$95_item$$24$$);
  $index$$95_item$$24$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addClass$$($index$$95_item$$24$$, this.$_selectionClass$)
};
$ClassSelectionView$$.prototype.$destroySelectionAt$ = function $$ClassSelectionView$$$$$destroySelectionAt$$($index$$96_item$$25$$) {
  $index$$96_item$$25$$ = this.$_itemsCollection$.$getItemAt$($index$$96_item$$25$$);
  $index$$96_item$$25$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$removeClass$$($index$$96_item$$25$$, this.$_selectionClass$)
};
$ClassSelectionView$$.prototype.update = function $$ClassSelectionView$$$$update$() {
  if(this.$_itemSelector$ !== $JSCompiler_alias_NULL$$) {
    this.$_selectionGroup$.$clearSelection$();
    this.$_itemsCollection$.clear();
    for(var $possibleItems$$ = $tuna$dom$select$$(this.$_itemSelector$, this.$_target$), $i$$38$$ = 0, $l$$22$$ = $possibleItems$$.length, $index$$99$$ = $JSCompiler_alias_NULL$$, $item$$28$$ = $JSCompiler_alias_NULL$$;$i$$38$$ < $l$$22$$;) {
      $item$$28$$ = $possibleItems$$[$i$$38$$], $tuna$dom$getParentMatches$$($item$$28$$, this.$_itemSelector$, this.$_target$) === $JSCompiler_alias_NULL$$ && ($index$$99$$ = this.$_itemsCollection$.$addItem$($item$$28$$), $index$$99$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$hasClass$$($item$$28$$, this.$_selectionClass$) && this.$_selectionGroup$.$selectIndex$($index$$99$$)), $i$$38$$++
    }
  }
};
var $tuna$ui$selection$view$ClassSelectionView$$ = $ClassSelectionView$$;
function $FormModule$$() {
  this.$_selector$ = "form.j-form"
}
$tuna$utils$extend$$($FormModule$$, $Module$$);
$FormModule$$.prototype.$initInstance$ = function $$FormModule$$$$$initInstance$$($target$$66$$) {
  return new $Form$$($target$$66$$)
};
$tuna$ui$modules$register$$("form", new $FormModule$$);
function $NavigationModule$$() {
  this.$_selector$ = ".j-navigation"
}
$tuna$utils$extend$$($NavigationModule$$, $Module$$);
$NavigationModule$$.prototype.$initInstance$ = function $$NavigationModule$$$$$initInstance$$($target$$67$$) {
  return new $Navigation$$($target$$67$$)
};
$tuna$ui$modules$register$$("navigation", new $NavigationModule$$);
function $PopupModule$$() {
  this.$_selector$ = ".j-popup"
}
$tuna$utils$extend$$($PopupModule$$, $Module$$);
$PopupModule$$.prototype.$initInstance$ = function $$PopupModule$$$$$initInstance$$($target$$68$$) {
  return $tuna$ui$popups$create$$($target$$68$$)
};
$tuna$ui$modules$register$$("popup", new $PopupModule$$);
function $PopupButtonModule$$() {
  this.$_selector$ = ".j-popup-button"
}
$tuna$utils$extend$$($PopupButtonModule$$, $Module$$);
$PopupButtonModule$$.prototype.$initInstance$ = function $$PopupButtonModule$$$$$initInstance$$($target$$69$$) {
  var $popupElement$$ = $tuna$dom$selectOne$$($target$$69$$.getAttribute("data-popup-selector")), $popup$$1$$ = $JSCompiler_alias_NULL$$;
  $popupElement$$ !== $JSCompiler_alias_NULL$$ && ($popup$$1$$ = $tuna$ui$popups$create$$($popupElement$$), $tuna$dom$addEventListener$$($target$$69$$, "click", function() {
    $popup$$1$$.open()
  }));
  return $popup$$1$$
};
$tuna$ui$modules$register$$("popup-button", new $PopupButtonModule$$);
function $SelectionGroupModule$$() {
  this.$_selector$ = ".j-selection-group"
}
$tuna$utils$extend$$($SelectionGroupModule$$, $Module$$);
$SelectionGroupModule$$.prototype.$initInstance$ = function $$SelectionGroupModule$$$$$initInstance$$($target$$70$$) {
  var $selectionGroup$$ = new $tuna$ui$selection$SelectionGroup$$($target$$70$$, $JSCompiler_alias_NULL$$), $selectionEvent$$ = $JSCompiler_StaticMethods_getStringOption$$($selectionGroup$$, "selection-event"), $itemSelector$$ = $JSCompiler_StaticMethods_getStringOption$$($selectionGroup$$, "item-selector");
  $selectionEvent$$ !== $JSCompiler_alias_NULL$$ && $itemSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$($target$$70$$, $itemSelector$$, $selectionEvent$$, function() {
    var $index$$100$$ = $selectionGroup$$.$getItemIndex$(this);
    $index$$100$$ !== $JSCompiler_alias_NULL$$ && $selectionGroup$$.$selectIndex$($index$$100$$)
  });
  return $selectionGroup$$
};
$tuna$ui$modules$register$$("selection-group", new $SelectionGroupModule$$);
function $TemplateTransformerModule$$() {
  this.$_selector$ = ".j-template-transformer"
}
$tuna$utils$extend$$($TemplateTransformerModule$$, $Module$$);
$TemplateTransformerModule$$.prototype.$initInstance$ = function $$TemplateTransformerModule$$$$$initInstance$$($target$$71$$) {
  return new $tuna$ui$transformers$TemplateTransformer$$($target$$71$$)
};
$tuna$ui$modules$register$$("template-transformer", new $TemplateTransformerModule$$);
function $ControlContainerModule$$() {
  this.$_selector$ = ".j-control-container"
}
$tuna$utils$extend$$($ControlContainerModule$$, $Module$$);
$ControlContainerModule$$.prototype.$_findTargets$ = function $$ControlContainerModule$$$$$_findTargets$$($context$$9$$) {
  return $tuna$dom$select$$(this.$_selector$, $context$$9$$)
};
$ControlContainerModule$$.prototype.$initInstance$ = function $$ControlContainerModule$$$$$initInstance$$($target$$72$$) {
  return new $ControlContainer$$($target$$72$$)
};
$tuna$ui$modules$register$$("control-container", new $ControlContainerModule$$, $JSCompiler_alias_TRUE$$);
function $ButtonGroupModule$$() {
  this.$_selector$ = ".j-button-group"
}
$tuna$utils$extend$$($ButtonGroupModule$$, $Module$$);
$ButtonGroupModule$$.prototype.$initInstance$ = function $$ButtonGroupModule$$$$$initInstance$$($target$$73$$) {
  return new $ButtonGroup$$($target$$73$$)
};
$tuna$ui$modules$register$$("button-group", new $ButtonGroupModule$$);
function $SWFModule$$() {
  this.$_selector$ = ".j-swf"
}
$tuna$utils$extend$$($SWFModule$$, $Module$$);
$SWFModule$$.prototype.$initInstance$ = function $$SWFModule$$$$$initInstance$$($target$$74$$) {
  return new $SWF$$($target$$74$$)
};
$tuna$ui$modules$register$$("swf", new $SWFModule$$);
function $InputFilterModule$$() {
  this.$_selector$ = ".j-input-filter"
}
$tuna$utils$extend$$($InputFilterModule$$, $Module$$);
$InputFilterModule$$.prototype.$initInstance$ = function $$InputFilterModule$$$$$initInstance$$($target$$75$$) {
  return new $InputFilter$$($target$$75$$)
};
$tuna$ui$modules$register$$("input-filter", new $InputFilterModule$$);
function $AutocompleteModule$$() {
  this.$_selector$ = ".j-autocomplete"
}
$tuna$utils$extend$$($AutocompleteModule$$, $Module$$);
$AutocompleteModule$$.prototype.$initInstance$ = function $$AutocompleteModule$$$$$initInstance$$($target$$76$$) {
  return new $Autocomplete$$($target$$76$$)
};
$tuna$ui$modules$register$$("autocomplete", new $AutocompleteModule$$);
function $CarouselModule$$() {
  this.$_selector$ = ".j-carousel"
}
$tuna$utils$extend$$($CarouselModule$$, $Module$$);
$CarouselModule$$.prototype.$initInstance$ = function $$CarouselModule$$$$$initInstance$$($target$$77$$) {
  return new $Carousel$$($target$$77$$)
};
$tuna$ui$modules$register$$("carousel", new $CarouselModule$$);
var $tuna$view$__idTable$$ = {}, $tuna$view$__mainController$$ = $JSCompiler_alias_NULL$$;
function $ViewController$$() {
  this.$_container$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$implement$$($ViewController$$, $ITransformHandler$$);
$JSCompiler_prototypeAlias$$ = $ViewController$$.prototype;
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$() {
  this.$_requireModules$();
  $JSCompiler_StaticMethods_initModules$$(this.$_container$);
  this.$_initActions$()
};
$JSCompiler_prototypeAlias$$.$_requireModules$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$_initActions$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$destroy$ = function $$JSCompiler_prototypeAlias$$$$destroy$$() {
  var $JSCompiler_StaticMethods_destroyModules$self$$inline_228$$ = this.$_container$, $name$$inline_229$$;
  for($name$$inline_229$$ in $JSCompiler_StaticMethods_destroyModules$self$$inline_228$$.$__moduleInstances$) {
    ($tuna$ui$modules$__typeTable$$[$name$$inline_229$$] !== $JSCompiler_alias_VOID$$ ? $tuna$ui$modules$__typeTable$$[$name$$inline_229$$] : $JSCompiler_alias_NULL$$).$destroy$($JSCompiler_StaticMethods_destroyModules$self$$inline_228$$.$__moduleInstances$[$name$$inline_229$$]), $JSCompiler_StaticMethods_destroyModules$self$$inline_228$$.$__moduleInstances$[$name$$inline_229$$].length = 0
  }
};
$JSCompiler_prototypeAlias$$.$handleTransformComplete$ = function $$JSCompiler_prototypeAlias$$$$handleTransformComplete$$($target$$79$$, $createdElements$$1$$) {
  for(var $i$$39$$ = 0, $l$$23$$ = $createdElements$$1$$.length;$i$$39$$ < $l$$23$$;) {
    $JSCompiler_StaticMethods_initModules$$(this.$_container$, $createdElements$$1$$[$i$$39$$]), $i$$39$$++
  }
};
function $NavigationViewController$$() {
  this.$_currentPage$ = this.$_navigation$ = this.$_container$ = $JSCompiler_alias_NULL$$;
  this.$__pageControllers$ = {}
}
$tuna$utils$extend$$($NavigationViewController$$, $ViewController$$);
$NavigationViewController$$.prototype.$_requireModules$ = function $$NavigationViewController$$$$$_requireModules$$() {
  this.$_container$.$requireModule$("control-container");
  this.$_container$.$requireModule$("navigation")
};
$NavigationViewController$$.prototype.$_initActions$ = function $$NavigationViewController$$$$$_initActions$$() {
  this.$_navigation$ = this.$_container$.$__moduleInstances$.navigation !== $JSCompiler_alias_VOID$$ && this.$_container$.$__moduleInstances$.navigation[0] !== $JSCompiler_alias_VOID$$ ? this.$_container$.$__moduleInstances$.navigation[0] : $JSCompiler_alias_NULL$$;
  if(this.$_navigation$ !== $JSCompiler_alias_NULL$$) {
    var $self$$10$$ = this;
    this.$_navigation$.addEventListener("select", function() {
    });
    this.$_navigation$.addEventListener("open", function($event$$32$$, $data$$44$$) {
      $JSCompiler_StaticMethods__setCurrentPage$$($self$$10$$, $JSCompiler_StaticMethods_getLastSelectedIndex$$($self$$10$$.$_navigation$), $data$$44$$)
    });
    var $currentIndex$$1$$ = $JSCompiler_StaticMethods_getLastSelectedIndex$$(this.$_navigation$);
    $currentIndex$$1$$ !== $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods__setCurrentPage$$(this, $currentIndex$$1$$)
  }
};
function $JSCompiler_StaticMethods__setCurrentPage$$($JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$, $index$$101_newPage_page$$inline_358$$, $args$$5$$) {
  $index$$101_newPage_page$$inline_358$$ = $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_navigation$.$getItemAt$($index$$101_newPage_page$$inline_358$$);
  if($JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_currentPage$ !== $JSCompiler_alias_NULL$$) {
    var $controller$$inline_236_controller$$inline_359$$ = $JSCompiler_StaticMethods__getPageController$$($JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$, $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_currentPage$);
    $controller$$inline_236_controller$$inline_359$$ !== $JSCompiler_alias_NULL$$ && $controller$$inline_236_controller$$inline_359$$.close()
  }
  $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_currentPage$ = $index$$101_newPage_page$$inline_358$$;
  if($JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$__pageControllers$[$JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_currentPage$.id] === $JSCompiler_alias_VOID$$) {
    var $index$$101_newPage_page$$inline_358$$ = $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_currentPage$, $controller$$inline_236_controller$$inline_359$$ = $JSCompiler_alias_NULL$$, $container$$inline_360$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_container$, "control-container", $index$$101_newPage_page$$inline_358$$.id);
    $container$$inline_360$$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_initController$$($container$$inline_360$$), $controller$$inline_236_controller$$inline_359$$ = $container$$inline_360$$.$__controller$);
    $controller$$inline_236_controller$$inline_359$$ !== $JSCompiler_alias_NULL$$ && ($controller$$inline_236_controller$$inline_359$$.$_navigation$ = $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_navigation$);
    $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$__pageControllers$[$index$$101_newPage_page$$inline_358$$.id] = $controller$$inline_236_controller$$inline_359$$
  }
  $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$ = $JSCompiler_StaticMethods__getPageController$$($JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$, $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.$_currentPage$);
  $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$ !== $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods__setCurrentPage$self_controller$$inline_240$$.open($args$$5$$)
}
function $JSCompiler_StaticMethods__getPageController$$($JSCompiler_StaticMethods__getPageController$self$$, $page$$) {
  return $JSCompiler_StaticMethods__getPageController$self$$.$__pageControllers$[$page$$.id] !== $JSCompiler_alias_VOID$$ ? $JSCompiler_StaticMethods__getPageController$self$$.$__pageControllers$[$page$$.id] : $JSCompiler_alias_NULL$$
}
;function $PageViewController$$() {
  this.$_navigation$ = this.$_container$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($PageViewController$$, $ViewController$$);
$PageViewController$$.prototype.close = $JSCompiler_emptyFn$$();
$PageViewController$$.prototype.open = $JSCompiler_emptyFn$$();
window.main = function $window$main$($args$$8$$) {
  $tuna$utils$config$$.$init$($args$$8$$);
  $tuna$dom$__selectorEngine$$ = Sizzle;
  $JSCompiler_StaticMethods_initController$$(new $ControlContainer$$(document.body))
};
function $MainController$$() {
  $NavigationViewController$$.call(this)
}
$tuna$utils$extend$$($MainController$$, $NavigationViewController$$);
$MainController$$.prototype.$_requireModules$ = function $$MainController$$$$$_requireModules$$() {
  $NavigationViewController$$.prototype.$_requireModules$.call(this);
  this.$_container$.$requireModule$("template-transformer");
  this.$_container$.$requireModule$("popup");
  this.$_container$.$requireModule$("form")
};
$MainController$$.prototype.$_initActions$ = function $$MainController$$$$$_initActions$$() {
  $NavigationViewController$$.prototype.$_initActions$.call(this);
  var $self$$11$$ = this;
  $tuna$rest$call$$("users.getCurrent", $JSCompiler_alias_NULL$$, function($user$$) {
    $user$$ === $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods___showSignUpPopup$$($self$$11$$) : $JSCompiler_StaticMethods___applyUser$$($self$$11$$, $user$$)
  }, "user");
  $JSCompiler_StaticMethods___initSingOutForm$$(this)
};
function $JSCompiler_StaticMethods___initSingOutForm$$($JSCompiler_StaticMethods___initSingOutForm$self$$) {
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___initSingOutForm$self$$.$_container$, "form", "sign-out").addEventListener("result", function() {
    location.reload()
  })
}
function $JSCompiler_StaticMethods___showSignUpPopup$$($JSCompiler_StaticMethods___showSignUpPopup$self$$) {
  var $popup$$2$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___showSignUpPopup$self$$.$_container$, "popup", "sign-in");
  $popup$$2$$.open();
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___showSignUpPopup$self$$.$_container$, "form", "sign-in").addEventListener("result", function($event$$33$$, $user$$1$$) {
    $JSCompiler_StaticMethods___applyUser$$($JSCompiler_StaticMethods___showSignUpPopup$self$$, $user$$1$$);
    $popup$$2$$.close()
  })
}
function $JSCompiler_StaticMethods___applyUser$$($JSCompiler_StaticMethods___applyUser$self$$, $user$$2$$) {
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "template-transformer", "user-info").$applyTransform$($user$$2$$.$serialize$());
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "template-transformer", "admin-controls").$applyTransform$($user$$2$$.$serialize$());
  if($user$$2$$.$role$ === $User$$.$BAKERY$) {
    $JSCompiler_StaticMethods___applyUser$self$$.$_navigation$.navigate("orders_page"), $JSCompiler_StaticMethods___updateBakery$$($JSCompiler_StaticMethods___applyUser$self$$, $user$$2$$)
  }else {
    var $bakerySelectionTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "template-transformer", "bakery-selection"), $bakerySelectionForm$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "form", "bakery-selection");
    $tuna$rest$call$$("users.getBakeries", $JSCompiler_alias_NULL$$, function($bakeries$$) {
      $model$resource$bakeries$$.$__bakeries$ = $bakeries$$;
      $bakerySelectionTransformer$$.$applyTransform$($tuna$model$serializeArray$$($bakeries$$));
      $JSCompiler_StaticMethods___applyUser$self$$.$_navigation$.navigate("orders_page");
      $bakerySelectionForm$$.addEventListener("submit", function($JSCompiler_inline_result$$250_data$$45_event$$34$$) {
        $JSCompiler_inline_result$$250_data$$45_event$$34$$.preventDefault();
        $JSCompiler_inline_result$$250_data$$45_event$$34$$ = $bakerySelectionForm$$.$serialize$();
        if($JSCompiler_inline_result$$250_data$$45_event$$34$$.bakery_id !== $JSCompiler_alias_VOID$$) {
          a: {
            for(var $JSCompiler_StaticMethods_getBakeryById$self$$inline_252$$ = $model$resource$bakeries$$, $i$$inline_253$$ = 0, $l$$inline_254$$ = $JSCompiler_StaticMethods_getBakeryById$self$$inline_252$$.$__bakeries$.length;$i$$inline_253$$ < $l$$inline_254$$;) {
              if($JSCompiler_StaticMethods_getBakeryById$self$$inline_252$$.$__bakeries$[$i$$inline_253$$].id === $JSCompiler_inline_result$$250_data$$45_event$$34$$.bakery_id) {
                $JSCompiler_inline_result$$250_data$$45_event$$34$$ = $JSCompiler_StaticMethods_getBakeryById$self$$inline_252$$.$__bakeries$[$i$$inline_253$$];
                break a
              }
              $i$$inline_253$$++
            }
            $JSCompiler_inline_result$$250_data$$45_event$$34$$ = $JSCompiler_alias_NULL$$
          }
          $JSCompiler_StaticMethods___updateBakery$$($JSCompiler_StaticMethods___applyUser$self$$, $JSCompiler_inline_result$$250_data$$45_event$$34$$)
        }
      })
    }, "bakery")
  }
}
function $JSCompiler_StaticMethods___updateBakery$$($JSCompiler_StaticMethods___updateBakery$self$$, $bakery$$1$$) {
  $model$resource$bakeries$$.$__currentBakery$ = $bakery$$1$$;
  var $controller$$6$$ = $JSCompiler_StaticMethods___updateBakery$self$$.$_currentPage$ !== $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods__getPageController$$($JSCompiler_StaticMethods___updateBakery$self$$, $JSCompiler_StaticMethods___updateBakery$self$$.$_currentPage$) : $JSCompiler_alias_NULL$$;
  if($controller$$6$$ instanceof $view$BakeryPageController$$) {
    var $bakery$$inline_259$$ = $model$resource$bakeries$$.$__currentBakery$;
    $bakery$$inline_259$$ !== $JSCompiler_alias_NULL$$ && $controller$$6$$.$_updateBakery$($bakery$$inline_259$$)
  }
}
$tuna$view$__mainController$$ = new $MainController$$;
function $BakeryPageController$$() {
  $PageViewController$$.call(this)
}
$tuna$utils$extend$$($BakeryPageController$$, $PageViewController$$);
$BakeryPageController$$.prototype.$_updateBakery$ = $JSCompiler_emptyFn$$();
var $view$BakeryPageController$$ = $BakeryPageController$$;
function $RecipesController$$() {
  $PageViewController$$.call(this);
  this.$__recipePopup$ = this.$__recipeControls$ = this.$__addRecipeForm$ = this.$__bakerySelectForm$ = this.$__addRecipeTransformer$ = this.$__recipeTableTransformer$ = this.$__bakerySelectTransformer$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($RecipesController$$, $PageViewController$$);
$RecipesController$$.prototype.$_requireModules$ = function $$RecipesController$$$$$_requireModules$$() {
  this.$_container$.$requireModule$("template-transformer");
  this.$_container$.$requireModule$("button-group");
  this.$_container$.$requireModule$("popup");
  this.$_container$.$requireModule$("form")
};
$RecipesController$$.prototype.$_initActions$ = function $$RecipesController$$$$$_initActions$$() {
  var $self$$14$$ = this;
  this.$__recipeTableTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "recipe-table");
  this.$__bakerySelectTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "bakery-select");
  this.$__addRecipeTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "add-recipe");
  this.$__bakerySelectForm$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "bakery-select");
  this.$__addRecipeForm$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "add-recipe");
  this.$__recipeControls$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button-group", "recipe-controls");
  this.$__recipePopup$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "popup", "edit-recipe");
  this.$__recipeControls$.addEventListener("delete", function($event$$35$$, $button$$5$$) {
    $JSCompiler_StaticMethods___deleteRecipe$$($self$$14$$, $button$$5$$)
  });
  this.$__recipeControls$.addEventListener("edit", function() {
    $self$$14$$.$__recipePopup$.open()
  });
  this.$__bakerySelectForm$.addEventListener("result", function($event$$37$$, $recipes$$) {
    $model$resource$recipes$$.$__recipes$ = $recipes$$;
    $self$$14$$.$__updateView$()
  });
  this.$__bakerySelectForm$.addEventListener("submit", function() {
    -1 === $self$$14$$.$__bakerySelectForm$.$getValue$("bakery_id") && ($model$resource$recipes$$.$__recipes$.length = 0)
  });
  this.$__addRecipeForm$.addEventListener("result", function($event$$38$$, $recipe$$) {
    $model$resource$recipes$$.$__recipes$.push($recipe$$);
    $self$$14$$.$__addRecipeForm$.reset();
    $self$$14$$.$__updateView$()
  })
};
$RecipesController$$.prototype.$__updateView$ = function $$RecipesController$$$$$__updateView$$() {
  this.$__bakerySelectTransformer$.$applyTransform$($model$resource$bakeries$$.$__bakeries$);
  this.$__recipeTableTransformer$.$applyTransform$($JSCompiler_StaticMethods_getRecipesList$$());
  this.$__addRecipeTransformer$.$applyTransform$($model$resource$bakeries$$.$__currentBakery$)
};
function $JSCompiler_StaticMethods___deleteRecipe$$($JSCompiler_StaticMethods___deleteRecipe$self$$, $button$$7$$) {
  if(confirm("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0440\u0435\u0446\u0435\u043f\u0442?")) {
    var $recipeId$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$7$$, "recipe-id");
    $tuna$rest$call$$("recipes.remove", {recipe_id:$recipeId$$}, function() {
      for(var $JSCompiler_StaticMethods_removeRecipeById$self$$inline_269$$ = $model$resource$recipes$$, $i$$inline_270$$ = 0, $l$$inline_271$$ = $JSCompiler_StaticMethods_removeRecipeById$self$$inline_269$$.$__recipes$.length;$i$$inline_270$$ < $l$$inline_271$$;) {
        if($JSCompiler_StaticMethods_removeRecipeById$self$$inline_269$$.$__recipes$[$i$$inline_270$$].id === $recipeId$$) {
          $JSCompiler_StaticMethods_removeRecipeById$self$$inline_269$$.$__recipes$.splice($i$$inline_270$$, 1);
          break
        }
        $i$$inline_270$$++
      }
      $JSCompiler_StaticMethods___deleteRecipe$self$$.$__updateView$()
    });
    $tuna$dom$setClassExist$$($button$$7$$.$_target$, "disabled", $JSCompiler_alias_TRUE$$)
  }
}
var $controller$$inline_276$$ = new $RecipesController$$;
$tuna$view$__idTable$$.recipes_page = $controller$$inline_276$$;
function $OrdersController$$() {
  $view$BakeryPageController$$.call(this);
  this.$__ordersListTransformer$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($OrdersController$$, $view$BakeryPageController$$);
$OrdersController$$.prototype.$_requireModules$ = function $$OrdersController$$$$$_requireModules$$() {
  this.$_container$.$requireModule$("template-transformer");
  this.$_container$.$requireModule$("button-group");
  this.$_container$.$requireModule$("navigation");
  this.$_container$.$requireModule$("popup");
  this.$_container$.$requireModule$("form")
};
$OrdersController$$.prototype.$_initActions$ = function $$OrdersController$$$$$_initActions$$() {
  this.$__ordersListTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "orders-list")
};
$OrdersController$$.prototype.$_updateBakery$ = function $$OrdersController$$$$$_updateBakery$$($bakery$$4$$) {
  var $self$$16$$ = this;
  $tuna$rest$call$$("orders.get", {bakery_id:$bakery$$4$$.id}, function($result$$17$$) {
    $self$$16$$.$__ordersListTransformer$.$applyTransform$($tuna$model$serializeArray$$($result$$17$$))
  }, "order")
};
$OrdersController$$.prototype.$__updateView$ = $JSCompiler_emptyFn$$();
var $controller$$inline_279$$ = new $OrdersController$$;
$tuna$view$__idTable$$.orders_page = $controller$$inline_279$$;
function $User$$() {
  this.$email$ = this.name = this.id = "";
  this.$role$ = -1
}
$tuna$utils$extend$$($User$$, $Record$$);
$User$$.prototype.$populate$ = function $$User$$$$$populate$$($data$$46$$) {
  this.id = $data$$46$$.id;
  this.name = $data$$46$$.name;
  this.$email$ = $data$$46$$.email;
  this.$role$ = $data$$46$$.role
};
$User$$.prototype.$serialize$ = function $$User$$$$$serialize$$() {
  return{id:this.id, email:this.$email$, role:this.$role$, roleName:$model$resource$users$$.$__roles$[this.$role$]}
};
$User$$.$ADMIN$ = 0;
$User$$.$BAKERY$ = 1;
var $record$$inline_283$$ = new $User$$;
$tuna$model$recordFactory$$.$__records$.user = $record$$inline_283$$;
function $Bakery$$() {
  $User$$.call(this);
  this.city = "";
  this.$deliveryPrice$ = 0
}
$tuna$utils$extend$$($Bakery$$, $User$$);
$Bakery$$.prototype.$populate$ = function $$Bakery$$$$$populate$$($data$$47$$) {
  $User$$.prototype.$populate$.call(this, $data$$47$$);
  this.city = $data$$47$$.city && $data$$47$$.city.name;
  this.$deliveryPrice$ = $data$$47$$.delivery_price
};
$Bakery$$.prototype.$serialize$ = function $$Bakery$$$$$serialize$$() {
  return{id:this.id, name:this.name + " (" + this.city + ")", email:this.$email$, deliveryPrice:this.$deliveryPrice$}
};
var $record$$inline_287$$ = new $Bakery$$;
$tuna$model$recordFactory$$.$__records$.bakery = $record$$inline_287$$;
function $Recipe$$() {
  this.$imageUrl$ = this.$desc$ = this.name = this.$bakeryId$ = this.id = "";
  this.$dimentionPrices$ = []
}
$tuna$utils$extend$$($Recipe$$, $Record$$);
$Recipe$$.prototype.$populate$ = function $$Recipe$$$$$populate$$($data$$48$$) {
  this.id = $data$$48$$.id;
  this.$bakeryId$ = $data$$48$$.bakery_id;
  this.name = $data$$48$$.name;
  this.$desc$ = $data$$48$$.desc;
  this.$imageUrl$ = $data$$48$$.image_url;
  this.$dimentionPrices$ = []
};
$Recipe$$.prototype.$serialize$ = function $$Recipe$$$$$serialize$$() {
  return{id:this.id, bakeryId:this.$bakeryId$, name:this.name, desc:this.$desc$, imageUrl:this.$imageUrl$, dimentionPrices:this.$dimentionPrices$}
};
var $record$$inline_291$$ = new $Recipe$$;
$tuna$model$recordFactory$$.$__records$.recipe = $record$$inline_291$$;
function $Order$$() {
  this.id = "";
  this.index = 0;
  this.$creationDate$ = new Date;
  this.$bakery$ = new $Bakery$$;
  this.$recipe$ = new $Recipe$$;
  this.$deliveryStatus$ = this.$paymentStatus$ = this.status = 0
}
$tuna$utils$extend$$($Order$$, $Record$$);
$Order$$.prototype.$populate$ = function $$Order$$$$$populate$$($data$$49$$) {
  this.id = $data$$49$$.id;
  this.index = parseInt(this.id.substr(this.id.length - 8).split("0").join(""), 16);
  this.$creationDate$ = new Date(1E3 * parseInt(this.id.substr(0, 8), 16));
  this.$bakery$.$populate$($data$$49$$.bakery);
  this.$recipe$.$populate$($data$$49$$.recipe);
  this.status = $data$$49$$.status;
  this.$paymentStatus$ = $data$$49$$.payment_status;
  this.$deliveryStatus$ = $data$$49$$.delivery_status
};
$Order$$.prototype.$serialize$ = function $$Order$$$$$serialize$$() {
  return{id:this.id, index:this.index, creationDate:this.$creationDate$.toJSON().substring(0, 16).replace("T", " "), bakery:this.$bakery$.$serialize$(), recipe:this.$recipe$.$serialize$(), status:this.status, paymentStatus:this.$paymentStatus$, deliveryStatus:this.$deliveryStatus$}
};
var $record$$inline_295$$ = new $Order$$;
$tuna$model$recordFactory$$.$__records$.order = $record$$inline_295$$;
var $model$resource$users$$ = new function() {
  this.$__roles$ = ["\u0410\u0434\u043c\u0438\u043d", "\u041a\u043e\u043d\u0434\u0438\u0442\u0435\u0440\u0441\u043a\u0430\u044f"]
};
var $model$resource$bakeries$$ = new function() {
  this.$__bakeries$ = [];
  this.$__currentBakery$ = $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_getRecipesList$$() {
  for(var $JSCompiler_StaticMethods_getRecipesList$self$$ = $model$resource$recipes$$, $result$$18$$ = [], $i$$42$$ = 0, $l$$26$$ = $JSCompiler_StaticMethods_getRecipesList$self$$.$__recipes$.length;$i$$42$$ < $l$$26$$;) {
    $result$$18$$.push($JSCompiler_StaticMethods_getRecipesList$self$$.$__recipes$[$i$$42$$].$serialize$()), $i$$42$$++
  }
  return $result$$18$$
}
var $model$resource$recipes$$ = new function() {
  this.$__recipes$ = []
};
function $CommonMethod$$($name$$75$$) {
  $Method$$.call(this, $name$$75$$);
  this.$__request$ = new $Request$$;
  this.$__request$.method = "POST";
  this.$__request$.$__url$ = "/api/?method=" + $name$$75$$;
  var $self$$17$$ = this;
  this.$__request$.addEventListener("complete", function($event$$39$$, $data$$50$$) {
    var $result$$inline_302$$ = $JSCompiler_alias_NULL$$;
    try {
      $result$$inline_302$$ = JSON.parse($data$$50$$)
    }catch($error$$inline_304$$) {
      $self$$17$$.$dispatch$("error", $data$$50$$)
    }
    if($result$$inline_302$$ !== $JSCompiler_alias_NULL$$) {
      var $response$$inline_303$$ = $result$$inline_302$$.response;
      $response$$inline_303$$ !== $JSCompiler_alias_VOID$$ ? $self$$17$$.$dispatch$("result", $response$$inline_303$$) : $self$$17$$.$dispatch$("error", $result$$inline_302$$.errors)
    }
  })
}
$tuna$utils$extend$$($CommonMethod$$, $Method$$);
$CommonMethod$$.prototype.call = function $$CommonMethod$$$$call$($args$$9$$) {
  this.$__request$.setData($args$$9$$);
  this.$__request$.send()
};
function $CommonFactory$$() {
}
$tuna$utils$implement$$($CommonFactory$$, $IMethodFactory$$);
$CommonFactory$$.prototype.$createMethod$ = function $$CommonFactory$$$$$createMethod$$($name$$76$$) {
  return new $CommonMethod$$($name$$76$$)
};
$tuna$rest$methodFactory$$.$__commonFactory$ = new $CommonFactory$$;

