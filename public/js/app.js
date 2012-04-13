var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $JSCompiler_emptyFn$$() {
  return function() {
  }
}
function $JSCompiler_get$$($JSCompiler_get_name$$) {
  return function() {
    return this[$JSCompiler_get_name$$]
  }
}
function $JSCompiler_returnArg$$($JSCompiler_returnArg_value$$) {
  return function() {
    return $JSCompiler_returnArg_value$$
  }
}
var $JSCompiler_prototypeAlias$$, $tuna$IS_IE$$ = !!eval("'\v' == 'v'");
function $tuna$utils$extend$$($Class$$, $Parent$$) {
  function $Link$$() {
  }
  $Link$$.prototype = $Parent$$.prototype;
  $Class$$.prototype = new $Link$$;
  $Class$$.prototype.constructor = $Class$$
}
function $tuna$utils$bind$$($func$$3$$, $context$$) {
  if($func$$3$$.bind !== $JSCompiler_alias_VOID$$) {
    return $func$$3$$.bind($context$$)
  }
  var $args$$ = Array.prototype.slice.call(arguments, 2);
  return function() {
    return $func$$3$$.apply($context$$, $args$$.concat(Array.prototype.slice.call(arguments)))
  }
}
function $tuna$utils$isObjectsEquals$$($object1$$, $object2$$) {
  var $result$$ = $object1$$ === $object2$$;
  if(!$result$$ && $object1$$ !== $JSCompiler_alias_NULL$$ && $object2$$ !== $JSCompiler_alias_NULL$$) {
    var $result$$ = $JSCompiler_alias_TRUE$$, $key$$13$$;
    for($key$$13$$ in $object1$$) {
      $result$$ = $object1$$[$key$$13$$] instanceof Object && $object2$$[$key$$13$$] instanceof Object ? $result$$ && $tuna$utils$isObjectsEquals$$($object1$$[$key$$13$$], $object2$$[$key$$13$$]) : $result$$ && $object1$$[$key$$13$$] === $object2$$[$key$$13$$]
    }
  }
  return $result$$
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
function $tuna$utils$__splitUrlData$$($object$$2$$, $path$$2$$) {
  var $result$$1$$ = [];
  $path$$2$$ === $JSCompiler_alias_VOID$$ && ($path$$2$$ = []);
  if($object$$2$$ !== $JSCompiler_alias_NULL$$ && !($object$$2$$ instanceof Function)) {
    if($object$$2$$ instanceof Object) {
      for(var $key$$14$$ in $object$$2$$) {
        $result$$1$$ = $result$$1$$.concat($tuna$utils$__splitUrlData$$($object$$2$$[$key$$14$$], 0 === $path$$2$$.length ? [$key$$14$$] : ($path$$2$$.join(",") + "," + $key$$14$$).split(",")))
      }
    }else {
      $result$$1$$ = [$path$$2$$.shift() + (0 < $path$$2$$.length ? "[" + $path$$2$$.join("][") + "]=" : "=") + encodeURIComponent("" + $object$$2$$)]
    }
  }
  return $result$$1$$
}
function $Config$$() {
  this.$__data$ = $JSCompiler_alias_NULL$$
}
$Config$$.prototype.$init$ = function $$Config$$$$$init$$($data$$19$$) {
  this.$__data$ = $data$$19$$
};
$Config$$.prototype.get = function $$Config$$$$get$($key$$15$$, $subKey$$) {
  return this.$__data$[$key$$15$$] !== $JSCompiler_alias_VOID$$ ? $subKey$$ !== $JSCompiler_alias_VOID$$ ? this.$__data$[$key$$15$$][$subKey$$] || $JSCompiler_alias_NULL$$ : this.$__data$[$key$$15$$] : $JSCompiler_alias_NULL$$
};
var $tuna$utils$config$$ = new $Config$$;
function $tuna$dom$select$$($selector$$, $opt_context$$5$$) {
  return $tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$ ? $tuna$dom$__selectorEngine$$($selector$$, $opt_context$$5$$) : []
}
function $tuna$dom$selectOne$$($selector$$1$$, $opt_context$$6$$) {
  if($tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$) {
    var $result$$3$$ = $tuna$dom$__selectorEngine$$($selector$$1$$, $opt_context$$6$$);
    if(0 < $result$$3$$.length) {
      return $result$$3$$[0]
    }
  }
  return $JSCompiler_alias_NULL$$
}
function $tuna$dom$matchesSelector$$($element$$8$$, $selector$$3$$) {
  return $tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$ ? $tuna$dom$__selectorEngine$$.matchesSelector($element$$8$$, $selector$$3$$) : $JSCompiler_alias_FALSE$$
}
var $tuna$dom$__selectorEngine$$ = $JSCompiler_alias_NULL$$;
function $tuna$dom$addEventListener$$($element$$10$$, $listenerId_type$$48$$, $handler$$3$$) {
  if($element$$10$$.addEventListener !== $JSCompiler_alias_VOID$$) {
    $element$$10$$.addEventListener($listenerId_type$$48$$, $handler$$3$$, $JSCompiler_alias_FALSE$$)
  }else {
    if($element$$10$$.attachEvent !== $JSCompiler_alias_VOID$$) {
      var $eventName$$1$$ = "on" + $listenerId_type$$48$$;
      $element$$10$$[$eventName$$1$$] === $JSCompiler_alias_VOID$$ ? $tuna$dom$__addCustomIEListener$$($element$$10$$, $listenerId_type$$48$$, $handler$$3$$) : ($element$$10$$.$__ieTargetId$ === $JSCompiler_alias_VOID$$ && ($element$$10$$.$__ieTargetId$ = "element_" + $tuna$dom$__lastElementId$$++), $listenerId_type$$48$$ = $element$$10$$.$__ieTargetId$ + "_" + $listenerId_type$$48$$, $handler$$3$$[$listenerId_type$$48$$] = function $$handler$$3$$$$listenerId_type$$48$$$($event$$4$$) {
        $handler$$3$$.call($element$$10$$, $event$$4$$)
      }, $element$$10$$.attachEvent($eventName$$1$$, $handler$$3$$[$listenerId_type$$48$$]))
    }
  }
}
function $tuna$dom$addOneEventListener$$($handler$$5$$) {
  var $element$$12$$ = document.body;
  $element$$12$$.$__onceTargetId$ === $JSCompiler_alias_VOID$$ && ($element$$12$$.$__onceTargetId$ = "element_" + $tuna$dom$__lastElementId$$++);
  var $listenerId$$2$$ = $element$$12$$.$__onceTargetId$ + "_click";
  $handler$$5$$[$listenerId$$2$$] = function $$handler$$5$$$$listenerId$$2$$$($event$$5_listenerId$$inline_22$$) {
    $handler$$5$$.call($element$$12$$, $event$$5_listenerId$$inline_22$$);
    $event$$5_listenerId$$inline_22$$ = $element$$12$$.$__onceTargetId$ + "_click";
    if($handler$$5$$[$event$$5_listenerId$$inline_22$$] !== $JSCompiler_alias_VOID$$) {
      var $handler$$inline_443$$ = $handler$$5$$[$event$$5_listenerId$$inline_22$$];
      if($element$$12$$.removeEventListener !== $JSCompiler_alias_VOID$$) {
        $element$$12$$.removeEventListener("click", $handler$$inline_443$$, $JSCompiler_alias_FALSE$$)
      }else {
        if($element$$12$$.detachEvent !== $JSCompiler_alias_VOID$$) {
          if($element$$12$$.onclick === $JSCompiler_alias_VOID$$) {
            var $handlers$$inline_444_listenerId$$inline_446$$ = $element$$12$$.__click;
            if($handlers$$inline_444_listenerId$$inline_446$$ !== $JSCompiler_alias_VOID$$) {
              for(var $i$$inline_445$$ = $handlers$$inline_444_listenerId$$inline_446$$.length - 1;0 <= $i$$inline_445$$;) {
                $handlers$$inline_444_listenerId$$inline_446$$[$i$$inline_445$$] === $handler$$inline_443$$ && $handlers$$inline_444_listenerId$$inline_446$$.splice($i$$inline_445$$, 1), $i$$inline_445$$--
              }
            }
          }else {
            $handlers$$inline_444_listenerId$$inline_446$$ = $element$$12$$.$__ieTargetId$ + "_click", $handler$$inline_443$$[$handlers$$inline_444_listenerId$$inline_446$$] !== $JSCompiler_alias_VOID$$ && ($element$$12$$.detachEvent("onclick", $handler$$inline_443$$[$handlers$$inline_444_listenerId$$inline_446$$]), delete $handler$$inline_443$$[$handlers$$inline_444_listenerId$$inline_446$$])
          }
        }
      }
      delete $handler$$5$$[$event$$5_listenerId$$inline_22$$]
    }
  };
  $tuna$dom$addEventListener$$($element$$12$$, "click", $handler$$5$$[$listenerId$$2$$])
}
function $tuna$dom$addChildEventListener$$($element$$14$$, $selector$$4$$, $type$$52$$, $handler$$7$$) {
  $element$$14$$.$__childTargetId$ === $JSCompiler_alias_VOID$$ && ($element$$14$$.$__childTargetId$ = "element_" + $tuna$dom$__lastElementId$$++);
  var $listenerId$$4$$ = $element$$14$$.$__childTargetId$ + "_" + $type$$52$$ + "_" + $selector$$4$$;
  $handler$$7$$[$listenerId$$4$$] = function $$handler$$7$$$$listenerId$$4$$$($event$$6$$) {
    var $target$$36$$ = $event$$6$$.target || $event$$6$$.srcElement, $child$$1$$ = $JSCompiler_alias_NULL$$, $child$$1$$ = 0 === ($tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$ ? $tuna$dom$__selectorEngine$$.matches($selector$$4$$, [$target$$36$$]) : []).length ? $tuna$dom$getParentMatches$$($target$$36$$, $selector$$4$$, $element$$14$$) : $target$$36$$;
    $child$$1$$ !== $JSCompiler_alias_NULL$$ && $handler$$7$$.call($child$$1$$, $event$$6$$)
  };
  $tuna$dom$addEventListener$$($element$$14$$, $type$$52$$, $handler$$7$$[$listenerId$$4$$])
}
function $tuna$dom$__addCustomIEListener$$($element$$16$$, $type$$54$$, $handler$$9$$) {
  $element$$16$$.$__customListener$ === $JSCompiler_alias_VOID$$ && ($element$$16$$.$__customListener$ = function $$element$$16$$$$__customListener$$($event$$7$$) {
    if($event$$7$$.$__type$ !== $JSCompiler_alias_VOID$$) {
      var $handlers_type$$55$$ = $event$$7$$.$__type$;
      delete $event$$7$$.$__type$;
      var $handlers_type$$55$$ = $element$$16$$["__" + $handlers_type$$55$$], $i$$3$$;
      for($i$$3$$ in $handlers_type$$55$$) {
        $handlers_type$$55$$[$i$$3$$].call($element$$16$$, $event$$7$$)
      }
    }
  }, $element$$16$$.attachEvent("onhelp", $element$$16$$.$__customListener$));
  $element$$16$$["__" + $type$$54$$] === $JSCompiler_alias_VOID$$ && ($element$$16$$["__" + $type$$54$$] = []);
  $element$$16$$["__" + $type$$54$$].push($handler$$9$$)
}
var $tuna$dom$__lastElementId$$ = 0;
function $tuna$dom$preventDefault$$($event$$9$$) {
  $event$$9$$.preventDefault !== $JSCompiler_alias_VOID$$ ? $event$$9$$.preventDefault() : $event$$9$$.returnValue = $JSCompiler_alias_FALSE$$
}
function $tuna$dom$stopPropagation$$($event$$10$$) {
  $event$$10$$.stopPropagation !== $JSCompiler_alias_VOID$$ ? $event$$10$$.stopPropagation() : $event$$10$$.cancelBubble = $JSCompiler_alias_TRUE$$
}
function $tuna$dom$getParentMatches$$($element$$19_parent$$2$$, $selector$$6$$, $opt_context$$7$$) {
  for($element$$19_parent$$2$$ = $element$$19_parent$$2$$.parentNode;$element$$19_parent$$2$$ !== $JSCompiler_alias_NULL$$ && $element$$19_parent$$2$$ !== $opt_context$$7$$ && !$tuna$dom$matchesSelector$$($element$$19_parent$$2$$, $selector$$6$$);) {
    $element$$19_parent$$2$$ = $element$$19_parent$$2$$.parentNode
  }
  return $element$$19_parent$$2$$ === $opt_context$$7$$ ? $JSCompiler_alias_NULL$$ : $element$$19_parent$$2$$
}
function $tuna$dom$hasClass$$($element$$21$$, $className$$2$$) {
  return $element$$21$$.classList !== $JSCompiler_alias_VOID$$ ? $element$$21$$.classList.contains($className$$2$$) : $element$$21$$.className !== $JSCompiler_alias_VOID$$ ? $element$$21$$.className.match(RegExp("(\\s|^)" + $className$$2$$ + "(\\s|$)")) !== $JSCompiler_alias_NULL$$ : $JSCompiler_alias_FALSE$$
}
function $tuna$dom$addClass$$($element$$22$$, $className$$3$$) {
  $element$$22$$.classList !== $JSCompiler_alias_VOID$$ ? $element$$22$$.classList.add($className$$3$$) : $tuna$dom$hasClass$$($element$$22$$, $className$$3$$) || ($element$$22$$.className += " " + $className$$3$$)
}
function $tuna$dom$removeClass$$($element$$23$$, $className$$4$$) {
  $element$$23$$.classList !== $JSCompiler_alias_VOID$$ ? $element$$23$$.classList.remove($className$$4$$) : $tuna$dom$hasClass$$($element$$23$$, $className$$4$$) && ($element$$23$$.className = $element$$23$$.className.replace(RegExp("(\\s|^)" + $className$$4$$ + "(\\s|$)"), " "))
}
function $tuna$dom$setClassExist$$($element$$24$$, $className$$5$$, $isExist$$) {
  !$isExist$$ && $tuna$dom$hasClass$$($element$$24$$, $className$$5$$) ? $tuna$dom$removeClass$$($element$$24$$, $className$$5$$) : $isExist$$ && !$tuna$dom$hasClass$$($element$$24$$, $className$$5$$) && $tuna$dom$addClass$$($element$$24$$, $className$$5$$)
}
;function $tuna$events$BasicEvent$$($target$$37$$, $type$$58$$, $opt_isBubbling$$) {
  this.$_target$ = $target$$37$$;
  this.$_type$ = $type$$58$$;
  this.$_isBubbling$ = !!$opt_isBubbling$$;
  this.$_isImmediateStopped$ = this.$_isStopped$ = this.$_isCanceled$ = $JSCompiler_alias_FALSE$$
}
$tuna$events$BasicEvent$$.prototype.$getTarget$ = $JSCompiler_get$$("$_target$");
$tuna$events$BasicEvent$$.prototype.$getType$ = $JSCompiler_get$$("$_type$");
$tuna$events$BasicEvent$$.prototype.preventDefault = function $$tuna$events$BasicEvent$$$$preventDefault$() {
  this.$_isCanceled$ = $JSCompiler_alias_TRUE$$
};
$tuna$events$BasicEvent$$.prototype.stopPropagation = function $$tuna$events$BasicEvent$$$$stopPropagation$() {
  this.$_isStopped$ = $JSCompiler_alias_TRUE$$
};
function $tuna$events$IEventDispatcher$$() {
}
$tuna$events$IEventDispatcher$$.prototype.$dispatch$ = $JSCompiler_emptyFn$$();
$tuna$events$IEventDispatcher$$.prototype.addEventListener = $JSCompiler_emptyFn$$();
$tuna$events$IEventDispatcher$$.prototype.removeEventListener = $JSCompiler_emptyFn$$();
$tuna$events$IEventDispatcher$$.prototype.$hasEventListener$ = $JSCompiler_emptyFn$$();
function $tuna$events$EventDispatcher$$($opt_propagationParent$$) {
  this.$_propagationParent$ = $opt_propagationParent$$ || $JSCompiler_alias_NULL$$;
  this.$_listeners$ = {}
}
$tuna$events$EventDispatcher$$.prototype.$dispatch$ = function $$tuna$events$EventDispatcher$$$$$dispatch$$($event$$12$$, $opt_data$$3$$) {
  $event$$12$$ instanceof $tuna$events$BasicEvent$$ || ($event$$12$$ = new $tuna$events$BasicEvent$$(this, $event$$12$$));
  var $data$$20$$ = $opt_data$$3$$ !== $JSCompiler_alias_VOID$$ ? $opt_data$$3$$ : $JSCompiler_alias_NULL$$, $type$$62$$ = $event$$12$$.$getType$();
  if(this.$_listeners$[$type$$62$$] !== $JSCompiler_alias_VOID$$) {
    for(var $i$$7$$ = 0, $l$$4$$ = this.$_listeners$[$type$$62$$].length;$i$$7$$ < $l$$4$$;) {
      this.$_listeners$[$type$$62$$][$i$$7$$].call(this, $event$$12$$, $data$$20$$);
      if($event$$12$$.$_isImmediateStopped$) {
        break
      }
      $i$$7$$++
    }
    this.$_propagationParent$ !== $JSCompiler_alias_NULL$$ && $event$$12$$.$_isBubbling$ && !$event$$12$$.$_isImmediateStopped$ && !$event$$12$$.$_isStopped$ && this.$_propagationParent$.$dispatch$($event$$12$$)
  }
  return!$event$$12$$.$_isCanceled$
};
$tuna$events$EventDispatcher$$.prototype.addEventListener = function $$tuna$events$EventDispatcher$$$$addEventListener$($type$$63$$, $listener$$29$$) {
  this.$_listeners$[$type$$63$$] === $JSCompiler_alias_VOID$$ ? this.$_listeners$[$type$$63$$] = [$listener$$29$$] : this.$hasEventListener$($type$$63$$, $listener$$29$$) || this.$_listeners$[$type$$63$$].push($listener$$29$$)
};
$tuna$events$EventDispatcher$$.prototype.removeEventListener = function $$tuna$events$EventDispatcher$$$$removeEventListener$($type$$64$$, $listener$$30$$) {
  if(this.$_listeners$[$type$$64$$] !== $JSCompiler_alias_VOID$$) {
    var $listenerIndex$$ = $tuna$utils$indexOf$$($listener$$30$$, this.$_listeners$[$type$$64$$]);
    -1 !== $listenerIndex$$ && this.$_listeners$[$type$$64$$].splice($listenerIndex$$, 1)
  }
};
$tuna$events$EventDispatcher$$.prototype.$hasEventListener$ = function $$tuna$events$EventDispatcher$$$$$hasEventListener$$($type$$65$$, $listener$$31$$) {
  return this.$_listeners$[$type$$65$$] !== $JSCompiler_alias_VOID$$ ? -1 !== $tuna$utils$indexOf$$($listener$$31$$, this.$_listeners$[$type$$65$$]) : $JSCompiler_alias_FALSE$$
};
function $tuna$net$IRequest$$() {
}
$tuna$utils$extend$$($tuna$net$IRequest$$, $tuna$events$IEventDispatcher$$);
$tuna$net$IRequest$$.prototype.send = $JSCompiler_emptyFn$$();
$tuna$net$IRequest$$.prototype.abort = $JSCompiler_emptyFn$$();
function $tuna$net$Request$$($opt_url$$3$$, $opt_isSync$$) {
  $tuna$events$EventDispatcher$$.call(this);
  this.$__url$ = $opt_url$$3$$ || "/";
  this.$__isSync$ = !!$opt_isSync$$;
  this.$__method$ = "GET";
  this.$__headers$ = {};
  this.$__data$ = $JSCompiler_alias_NULL$$;
  this.$__requests$ = []
}
$tuna$utils$extend$$($tuna$net$Request$$, $tuna$events$EventDispatcher$$);
$tuna$net$Request$$.prototype.send = function $$tuna$net$Request$$$$send$($dataString_opt_data$$5$$) {
  $dataString_opt_data$$5$$ !== $JSCompiler_alias_VOID$$ && (this.$__data$ = $dataString_opt_data$$5$$);
  var $request$$ = !$tuna$IS_IE$$ ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
  if(!this.$__isSync$) {
    var $self$$1$$ = this;
    $request$$.onreadystatechange = function $$request$$$onreadystatechange$() {
      if(4 === $request$$.readyState) {
        $self$$1$$.$dispatch$("complete", $request$$.responseText);
        for(var $i$$inline_26$$ = 0, $l$$inline_27$$ = $self$$1$$.$__requests$.length;$i$$inline_26$$ < $l$$inline_27$$;) {
          $self$$1$$.$__requests$[$i$$inline_26$$] === $request$$ && $self$$1$$.$__requests$.splice($i$$inline_26$$, 1), $i$$inline_26$$++
        }
        $request$$.abort()
      }
    }
  }
  for(var $name$$55_requestURL_sendData$$ in this.$__headers$) {
    $request$$.setRequestHeader($name$$55_requestURL_sendData$$, this.$__headers$[$name$$55_requestURL_sendData$$])
  }
  $name$$55_requestURL_sendData$$ = this.$__url$;
  $dataString_opt_data$$5$$ = $tuna$utils$__splitUrlData$$(this.$__data$).join("&");
  "GET" === this.$__method$ && 0 !== $dataString_opt_data$$5$$.length && ($name$$55_requestURL_sendData$$ += (-1 === $name$$55_requestURL_sendData$$.indexOf("?") ? "?" : "&") + $dataString_opt_data$$5$$);
  $request$$.open(this.$__method$, encodeURI($name$$55_requestURL_sendData$$), !this.$__isSync$);
  $name$$55_requestURL_sendData$$ = $JSCompiler_alias_NULL$$;
  "GET" !== this.$__method$ && ($request$$.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), $name$$55_requestURL_sendData$$ = $dataString_opt_data$$5$$);
  $request$$.send($name$$55_requestURL_sendData$$);
  this.$__isSync$ ? this.$dispatch$("complete", $request$$.responseText) : this.$__requests$.push($request$$)
};
$tuna$net$Request$$.prototype.abort = function $$tuna$net$Request$$$$abort$() {
  for(;0 < this.$__requests$.length;) {
    this.$__requests$.shift().abort()
  }
};
function $tuna$model$ListResource$$($opt_methodName$$, $opt_recordName$$) {
  $tuna$events$EventDispatcher$$.call(this);
  this.$__lastArgs$ = $JSCompiler_alias_NULL$$;
  this.$_methodName$ = $opt_methodName$$ || $JSCompiler_alias_NULL$$;
  this.$_recordName$ = $opt_recordName$$ || $JSCompiler_alias_NULL$$;
  this.$_list$ = []
}
$tuna$utils$extend$$($tuna$model$ListResource$$, $tuna$events$EventDispatcher$$);
$JSCompiler_prototypeAlias$$ = $tuna$model$ListResource$$.prototype;
$JSCompiler_prototypeAlias$$.load = function $$JSCompiler_prototypeAlias$$$load$($opt_args$$1$$, $opt_isForce$$) {
  if(this.$_methodName$ !== $JSCompiler_alias_NULL$$ && this.$_recordName$ !== $JSCompiler_alias_NULL$$) {
    if($opt_isForce$$ || $opt_args$$1$$ === $JSCompiler_alias_VOID$$ || !$tuna$utils$isObjectsEquals$$(this.$__lastArgs$, $opt_args$$1$$)) {
      var $self$$2$$ = this;
      $tuna$rest$call$$(this.$_methodName$, $opt_args$$1$$ || $JSCompiler_alias_NULL$$, function($records$$) {
        $self$$2$$.set($records$$)
      }, this.$_recordName$)
    }
    this.$__lastArgs$ = $opt_args$$1$$ || $JSCompiler_alias_NULL$$
  }
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($list$$1$$) {
  this.$_list$ !== $list$$1$$ && (this.$_list$ = $list$$1$$, this.$dispatch$("update", this.$_list$))
};
$JSCompiler_prototypeAlias$$.get = $JSCompiler_get$$("$_list$");
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  0 < this.$_list$.length && (this.$_list$.length = 0, this.$dispatch$("update", this.$_list$))
};
$JSCompiler_prototypeAlias$$.$addItem$ = function $$JSCompiler_prototypeAlias$$$$addItem$$($record$$) {
  for(var $i$$9$$ = 0, $l$$6$$ = this.$_list$.length;$i$$9$$ < $l$$6$$ && !(this.$_list$[$i$$9$$].id === $record$$.id);) {
    $i$$9$$++
  }
  this.$_list$[$i$$9$$] = $record$$;
  this.$dispatch$("update", this.$_list$)
};
function $JSCompiler_StaticMethods_removeItemById$$($JSCompiler_StaticMethods_removeItemById$self$$, $id$$2$$) {
  for(var $i$$10$$ = 0, $l$$7$$ = $JSCompiler_StaticMethods_removeItemById$self$$.$_list$.length;$i$$10$$ < $l$$7$$;) {
    if($JSCompiler_StaticMethods_removeItemById$self$$.$_list$[$i$$10$$].id === $id$$2$$) {
      $JSCompiler_StaticMethods_removeItemById$self$$.$_list$.splice($i$$10$$, 1);
      $JSCompiler_StaticMethods_removeItemById$self$$.$dispatch$("update", $JSCompiler_StaticMethods_removeItemById$self$$.$_list$);
      break
    }
    $i$$10$$++
  }
}
function $JSCompiler_StaticMethods_getItemById$$($JSCompiler_StaticMethods_getItemById$self$$, $id$$3$$) {
  for(var $i$$11$$ = 0, $l$$8$$ = $JSCompiler_StaticMethods_getItemById$self$$.$_list$.length;$i$$11$$ < $l$$8$$;) {
    if($JSCompiler_StaticMethods_getItemById$self$$.$_list$[$i$$11$$].id === $id$$3$$) {
      return $JSCompiler_StaticMethods_getItemById$self$$.$_list$[$i$$11$$]
    }
    $i$$11$$++
  }
  return $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$.find = function $$JSCompiler_prototypeAlias$$$find$($callback$$26$$) {
  for(var $result$$6$$ = [], $i$$12$$ = 0, $l$$9$$ = this.$_list$.length;$i$$12$$ < $l$$9$$;) {
    $callback$$26$$(this.$_list$[$i$$12$$]) && $result$$6$$.push(this.$_list$[$i$$12$$]), $i$$12$$++
  }
  return $result$$6$$
};
function $JSCompiler_StaticMethods_each$$($callback$$28$$) {
  for(var $JSCompiler_StaticMethods_each$self$$ = $model$dimensions$$, $i$$14$$ = 0, $l$$11$$ = $JSCompiler_StaticMethods_each$self$$.$_list$.length;$i$$14$$ < $l$$11$$;) {
    $callback$$28$$($JSCompiler_StaticMethods_each$self$$.$_list$[$i$$14$$]), $i$$14$$++
  }
}
;function $tuna$model$ItemResource$$() {
  $tuna$events$EventDispatcher$$.call(this);
  this.$_item$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$model$ItemResource$$, $tuna$events$EventDispatcher$$);
$tuna$model$ItemResource$$.prototype.set = function $$tuna$model$ItemResource$$$$set$($item$$1$$) {
  this.$_item$ !== $item$$1$$ && (this.$_item$ = $item$$1$$, this.$dispatch$("update", this.$_item$))
};
$tuna$model$ItemResource$$.prototype.get = $JSCompiler_get$$("$_item$");
$tuna$model$ItemResource$$.prototype.clear = function $$tuna$model$ItemResource$$$$clear$() {
  this.set($JSCompiler_alias_NULL$$)
};
function $tuna$model$Record$$($opt_rawData$$) {
  this.id = $JSCompiler_alias_NULL$$;
  $opt_rawData$$ !== $JSCompiler_alias_VOID$$ && this.$populate$($opt_rawData$$)
}
$tuna$model$Record$$.prototype.$clone$ = function $$tuna$model$Record$$$$$clone$$() {
  var $clone$$ = new this.constructor, $param$$;
  for($param$$ in this) {
    $clone$$[$param$$] = this[$param$$]
  }
  return $clone$$
};
$tuna$model$Record$$.prototype.$populate$ = $JSCompiler_emptyFn$$();
$tuna$model$Record$$.prototype.$serialize$ = $JSCompiler_emptyFn$$();
function $tuna$model$serialize$$($records$$1$$, $opt_options$$6$$) {
  if($records$$1$$ instanceof Array) {
    for(var $result$$8$$ = [], $i$$16$$ = 0, $l$$13$$ = $records$$1$$.length;$i$$16$$ < $l$$13$$;) {
      $result$$8$$.push($records$$1$$[$i$$16$$].$serialize$($opt_options$$6$$)), $i$$16$$++
    }
    return $result$$8$$
  }
  return $records$$1$$ instanceof $tuna$model$Record$$ ? $records$$1$$.$serialize$($opt_options$$6$$) : $JSCompiler_alias_NULL$$
}
var $tuna$model$recordFactory$$ = new function() {
  this.$__prototypes$ = {}
};
function $tuna$rest$Method$$() {
  $tuna$events$EventDispatcher$$.call(this)
}
$tuna$utils$extend$$($tuna$rest$Method$$, $tuna$events$EventDispatcher$$);
$tuna$rest$Method$$.prototype.call = $JSCompiler_emptyFn$$();
$tuna$rest$Method$$.prototype.$clone$ = function $$tuna$rest$Method$$$$$clone$$() {
  return new this.constructor
};
function $tuna$rest$DefaultMethod$$($opt_name$$3$$) {
  $tuna$events$EventDispatcher$$.call(this);
  $opt_name$$3$$ !== $JSCompiler_alias_VOID$$ && this.$setName$($opt_name$$3$$)
}
$tuna$utils$extend$$($tuna$rest$DefaultMethod$$, $tuna$rest$Method$$);
$tuna$rest$DefaultMethod$$.prototype.$setName$ = $JSCompiler_emptyFn$$();
function $JSCompiler_StaticMethods_createMethod$$($name$$61$$) {
  var $JSCompiler_StaticMethods_createMethod$self$$ = $tuna$rest$methodFactory$$, $result$$9$$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_createMethod$self$$.$__methods$[$name$$61$$] !== $JSCompiler_alias_VOID$$ ? $result$$9$$ = $JSCompiler_StaticMethods_createMethod$self$$.$__methods$[$name$$61$$].$clone$() : $JSCompiler_StaticMethods_createMethod$self$$.$__defaultMethod$ !== $JSCompiler_alias_NULL$$ && ($result$$9$$ = $JSCompiler_StaticMethods_createMethod$self$$.$__defaultMethod$.$clone$(), $result$$9$$.$setName$($name$$61$$));
  return $result$$9$$
}
;function $tuna$rest$call$$($name$$63$$, $args$$3$$, $opt_callback$$4$$, $opt_recordName$$1$$) {
  var $method$$5$$ = $JSCompiler_StaticMethods_createMethod$$($name$$63$$), $listener$$32$$ = $JSCompiler_alias_NULL$$;
  $opt_callback$$4$$ !== $JSCompiler_alias_VOID$$ && ($listener$$32$$ = $opt_recordName$$1$$ === $JSCompiler_alias_VOID$$ ? function($event$$13$$, $data$$23$$) {
    $opt_callback$$4$$($data$$23$$);
    $method$$5$$.removeEventListener("result", $listener$$32$$)
  } : function($event$$14$$, $data$$24$$) {
    $opt_recordName$$1$$ !== $JSCompiler_alias_VOID$$ && $opt_callback$$4$$($tuna$rest$populateRecords$$($data$$24$$, $opt_recordName$$1$$));
    $method$$5$$.removeEventListener("result", $listener$$32$$)
  });
  $listener$$32$$ !== $JSCompiler_alias_NULL$$ && $method$$5$$.addEventListener("result", $listener$$32$$);
  $method$$5$$.call($args$$3$$)
}
function $tuna$rest$populateRecords$$($data$$25$$, $name$$64$$) {
  var $recordPrototype$$ = $tuna$model$recordFactory$$.$__prototypes$[$name$$64$$] || $JSCompiler_alias_NULL$$;
  if($recordPrototype$$ !== $JSCompiler_alias_NULL$$ && $data$$25$$ !== $JSCompiler_alias_NULL$$) {
    var $record$$3$$ = $JSCompiler_alias_NULL$$;
    if($data$$25$$ instanceof Array) {
      for(var $result$$10$$ = [], $i$$17$$ = 0, $l$$14$$ = $data$$25$$.length;$i$$17$$ < $l$$14$$;) {
        $record$$3$$ = $recordPrototype$$.$clone$(), $data$$25$$[$i$$17$$] !== $JSCompiler_alias_NULL$$ && $record$$3$$.$populate$($data$$25$$[$i$$17$$]), $result$$10$$.push($record$$3$$), $i$$17$$++
      }
      return $result$$10$$
    }
    $record$$3$$ = $recordPrototype$$.$clone$();
    $record$$3$$.$populate$($data$$25$$);
    return $record$$3$$
  }
  return $JSCompiler_alias_NULL$$
}
var $tuna$rest$methodFactory$$ = new function() {
  this.$__methods$ = {};
  this.$__defaultMethod$ = $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$data$DataNode$$($value$$42$$, $opt_parent$$, $opt_key$$1$$) {
  this.$__value$ = $value$$42$$;
  this.$__parent$ = $opt_parent$$ || $tuna$tmpl$data$NULL_NODE$$;
  this.$__key$ = $opt_key$$1$$ || $JSCompiler_alias_NULL$$;
  this.$__keyNode$ = $JSCompiler_alias_NULL$$;
  this.$__children$ = {}
}
$JSCompiler_prototypeAlias$$ = $tuna$tmpl$data$DataNode$$.prototype;
$JSCompiler_prototypeAlias$$.getParent = $JSCompiler_get$$("$__parent$");
$JSCompiler_prototypeAlias$$.getKey = function $$JSCompiler_prototypeAlias$$$getKey$() {
  this.$__keyNode$ === $JSCompiler_alias_NULL$$ && (this.$__keyNode$ = new $tuna$tmpl$data$DataNode$$(this.$__key$));
  return this.$__keyNode$
};
$JSCompiler_prototypeAlias$$.$getRoot$ = function $$JSCompiler_prototypeAlias$$$$getRoot$$() {
  return this.$__parent$ !== $tuna$tmpl$data$NULL_NODE$$ ? this.$__parent$.$getRoot$() : this
};
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$__value$");
$JSCompiler_prototypeAlias$$.getStringValue = function $$JSCompiler_prototypeAlias$$$getStringValue$() {
  return this.$__value$ !== $JSCompiler_alias_NULL$$ ? this.$__value$.toString() : $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_growChild$$($JSCompiler_StaticMethods_growChild$self$$, $key$$16$$) {
  if($JSCompiler_StaticMethods_growChild$self$$ === $tuna$tmpl$data$NULL_NODE$$) {
    return $JSCompiler_StaticMethods_growChild$self$$
  }
  $JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$16$$] === $JSCompiler_alias_VOID$$ && ($JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$16$$] = $JSCompiler_StaticMethods_growChild$self$$.$__value$ !== $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_growChild$self$$.$__value$[$key$$16$$] !== $JSCompiler_alias_VOID$$ ? new $tuna$tmpl$data$DataNode$$($JSCompiler_StaticMethods_growChild$self$$.$__value$[$key$$16$$], $JSCompiler_StaticMethods_growChild$self$$, $key$$16$$) : 
  $tuna$tmpl$data$NULL_NODE$$);
  return $JSCompiler_StaticMethods_growChild$self$$.$__children$[$key$$16$$]
}
var $tuna$tmpl$data$NULL_NODE$$ = new $tuna$tmpl$data$DataNode$$($JSCompiler_alias_NULL$$);
function $tuna$tmpl$data$PathEvaluator$$() {
  this.$__parsedPath$ = $JSCompiler_alias_NULL$$
}
$tuna$tmpl$data$PathEvaluator$$.prototype.$setPath$ = function $$tuna$tmpl$data$PathEvaluator$$$$$setPath$$($path$$4$$) {
  this.$__parsedPath$ = $path$$4$$.split("/")
};
$tuna$tmpl$data$PathEvaluator$$.prototype.evaluate = function $$tuna$tmpl$data$PathEvaluator$$$$evaluate$($dataNode$$) {
  return this.$__parsedPath$ !== $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods___applyNextToken$$(this, this.$__parsedPath$, $dataNode$$, 0) : $tuna$tmpl$data$NULL_NODE$$
};
function $JSCompiler_StaticMethods___applyNextToken$$($JSCompiler_StaticMethods___applyNextToken$self$$, $path$$5$$, $dataNode$$1$$, $index$$51$$) {
  var $token$$4$$ = $path$$5$$[$index$$51$$];
  return $token$$4$$ !== $JSCompiler_alias_VOID$$ && $dataNode$$1$$ !== $tuna$tmpl$data$NULL_NODE$$ ? $JSCompiler_StaticMethods___applyNextToken$$($JSCompiler_StaticMethods___applyNextToken$self$$, $path$$5$$, $JSCompiler_StaticMethods___applyToken$$($token$$4$$, $dataNode$$1$$), ++$index$$51$$) : $dataNode$$1$$
}
function $JSCompiler_StaticMethods___applyToken$$($token$$5$$, $dataNode$$2$$) {
  switch($token$$5$$) {
    case "":
      return $dataNode$$2$$.$getRoot$();
    case ".":
      return $dataNode$$2$$;
    case "..":
      return $dataNode$$2$$.getParent();
    case "$key":
      return $dataNode$$2$$.getKey()
  }
  return $JSCompiler_StaticMethods_growChild$$($dataNode$$2$$, $token$$5$$)
}
;function $tuna$tmpl$settings$SpotSettings$$($targetSelector$$, $dataPath$$) {
  this.$targetSelector$ = $targetSelector$$;
  this.$dataPath$ = $dataPath$$;
  this.pattern = $JSCompiler_alias_NULL$$
}
$tuna$tmpl$settings$SpotSettings$$.prototype.$getType$ = $JSCompiler_returnArg$$("spot");
function $tuna$tmpl$settings$AttributeSettings$$($targetSelector$$1$$, $dataPath$$1$$, $attributeName$$) {
  $tuna$tmpl$settings$SpotSettings$$.call(this, $targetSelector$$1$$, $dataPath$$1$$);
  this.$attributeName$ = $attributeName$$;
  this.$hasEvent$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($tuna$tmpl$settings$AttributeSettings$$, $tuna$tmpl$settings$SpotSettings$$);
$tuna$tmpl$settings$AttributeSettings$$.prototype.$getType$ = $JSCompiler_returnArg$$("attribute");
function $tuna$tmpl$settings$ConditionSettings$$($targetSelector$$2$$, $dataPath$$2$$, $actionType$$, $operatorType$$) {
  $tuna$tmpl$settings$SpotSettings$$.call(this, $targetSelector$$2$$, $dataPath$$2$$);
  this.$actionType$ = $actionType$$;
  this.$operatorType$ = $operatorType$$;
  this.$operatorData$ = this.$actionData$ = ""
}
$tuna$utils$extend$$($tuna$tmpl$settings$ConditionSettings$$, $tuna$tmpl$settings$SpotSettings$$);
$tuna$tmpl$settings$ConditionSettings$$.prototype.$getType$ = $JSCompiler_returnArg$$("condition");
function $tuna$tmpl$settings$CheckboxSettings$$($targetSelector$$3$$, $dataPath$$3$$) {
  $tuna$tmpl$settings$SpotSettings$$.call(this, $targetSelector$$3$$, $dataPath$$3$$)
}
$tuna$utils$extend$$($tuna$tmpl$settings$CheckboxSettings$$, $tuna$tmpl$settings$SpotSettings$$);
$tuna$tmpl$settings$CheckboxSettings$$.prototype.$getType$ = $JSCompiler_returnArg$$("checkbox");
function $tuna$tmpl$settings$ListSettings$$($targetSelector$$4$$, $dataPath$$4$$, $keyPath$$1$$, $itemRendererID$$, $itemSettings$$) {
  $tuna$tmpl$settings$SpotSettings$$.call(this, $targetSelector$$4$$, $dataPath$$4$$);
  this.keyPath = $keyPath$$1$$;
  this.$itemRendererID$ = $itemRendererID$$;
  this.$itemSettings$ = $itemSettings$$
}
$tuna$utils$extend$$($tuna$tmpl$settings$ListSettings$$, $tuna$tmpl$settings$SpotSettings$$);
$tuna$tmpl$settings$ListSettings$$.prototype.$getType$ = $JSCompiler_returnArg$$("list");
function $tuna$tmpl$settings$TemplateSettings$$() {
  this.$__items$ = []
}
$tuna$tmpl$settings$TemplateSettings$$.prototype.$getItemsCount$ = function $$tuna$tmpl$settings$TemplateSettings$$$$$getItemsCount$$() {
  return this.$__items$.length
};
$tuna$tmpl$settings$TemplateSettings$$.prototype.$getItemAt$ = function $$tuna$tmpl$settings$TemplateSettings$$$$$getItemAt$$($index$$52$$) {
  return this.$__items$[$index$$52$$]
};
$tuna$tmpl$settings$TemplateSettings$$.prototype.$getType$ = $JSCompiler_returnArg$$("template");
function $tuna$tmpl$markup$SpotExtractor$$() {
  this.$_tagName$ = "spot";
  this.$_ns$ = "tuna:"
}
$tuna$tmpl$markup$SpotExtractor$$.prototype.$_createItem$ = function $$tuna$tmpl$markup$SpotExtractor$$$$$_createItem$$($element$$28$$) {
  var $selector$$7_spot$$ = $element$$28$$.getAttribute(this.$_ns$ + "target"), $dataPath$$5$$ = $element$$28$$.getAttribute(this.$_ns$ + "path");
  return $selector$$7_spot$$ !== $JSCompiler_alias_NULL$$ && $dataPath$$5$$ !== $JSCompiler_alias_NULL$$ ? ($selector$$7_spot$$ = new $tuna$tmpl$settings$SpotSettings$$($selector$$7_spot$$, $dataPath$$5$$), $selector$$7_spot$$.pattern = $element$$28$$.getAttribute(this.$_ns$ + "pattern"), $selector$$7_spot$$) : $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$markup$ListExtractor$$($templateBuilder$$) {
  $tuna$tmpl$markup$SpotExtractor$$.call(this);
  this.$_tagName$ = "list";
  this.$__templateBuilder$ = $templateBuilder$$
}
$tuna$utils$extend$$($tuna$tmpl$markup$ListExtractor$$, $tuna$tmpl$markup$SpotExtractor$$);
$tuna$tmpl$markup$ListExtractor$$.prototype.$_createItem$ = function $$tuna$tmpl$markup$ListExtractor$$$$$_createItem$$($element$$29$$) {
  var $list$$2_selector$$8$$ = $element$$29$$.getAttribute(this.$_ns$ + "target"), $dataPath$$6$$ = $element$$29$$.getAttribute(this.$_ns$ + "path"), $keyPath$$2$$ = $element$$29$$.getAttribute(this.$_ns$ + "key-path"), $itemRendererID$$1$$ = $element$$29$$.getAttribute(this.$_ns$ + "item-renderer-id"), $itemSettings$$1$$ = $JSCompiler_alias_NULL$$, $templateID$$ = $element$$29$$.getAttribute(this.$_ns$ + "item-template-id");
  $templateID$$ !== $JSCompiler_alias_NULL$$ && ($itemSettings$$1$$ = $JSCompiler_StaticMethods_buildSettings$$(this.$__templateBuilder$, $templateID$$));
  return $list$$2_selector$$8$$ !== $JSCompiler_alias_NULL$$ && $dataPath$$6$$ !== $JSCompiler_alias_NULL$$ && $keyPath$$2$$ !== $JSCompiler_alias_NULL$$ && $itemRendererID$$1$$ !== $JSCompiler_alias_NULL$$ && $itemSettings$$1$$ !== $JSCompiler_alias_NULL$$ ? ($list$$2_selector$$8$$ = new $tuna$tmpl$settings$ListSettings$$($list$$2_selector$$8$$, $dataPath$$6$$, $keyPath$$2$$, $itemRendererID$$1$$, $itemSettings$$1$$), $list$$2_selector$$8$$.pattern = $element$$29$$.getAttribute(this.$_ns$ + "pattern"), 
  $list$$2_selector$$8$$) : $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$markup$AttributeExtractor$$() {
  $tuna$tmpl$markup$SpotExtractor$$.call(this);
  this.$_tagName$ = "attr"
}
$tuna$utils$extend$$($tuna$tmpl$markup$AttributeExtractor$$, $tuna$tmpl$markup$SpotExtractor$$);
$tuna$tmpl$markup$AttributeExtractor$$.prototype.$_createItem$ = function $$tuna$tmpl$markup$AttributeExtractor$$$$$_createItem$$($element$$30$$) {
  var $attribute$$2_selector$$9$$ = $element$$30$$.getAttribute(this.$_ns$ + "target"), $dataPath$$7$$ = $element$$30$$.getAttribute(this.$_ns$ + "path"), $attributeName$$1$$ = $element$$30$$.getAttribute(this.$_ns$ + "name");
  return $attribute$$2_selector$$9$$ !== $JSCompiler_alias_NULL$$ && $dataPath$$7$$ !== $JSCompiler_alias_NULL$$ && $attributeName$$1$$ !== $JSCompiler_alias_NULL$$ ? ($attribute$$2_selector$$9$$ = new $tuna$tmpl$settings$AttributeSettings$$($attribute$$2_selector$$9$$, $dataPath$$7$$, $attributeName$$1$$), $attribute$$2_selector$$9$$.pattern = $element$$30$$.getAttribute(this.$_ns$ + "pattern"), $attribute$$2_selector$$9$$.$hasEvent$ = !!$element$$30$$.getAttribute(this.$_ns$ + "event"), $attribute$$2_selector$$9$$) : 
  $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$markup$ConditionExtractor$$() {
  $tuna$tmpl$markup$SpotExtractor$$.call(this);
  this.$_tagName$ = "if";
  this.$__operators$ = [];
  this.$__actions$ = []
}
$tuna$utils$extend$$($tuna$tmpl$markup$ConditionExtractor$$, $tuna$tmpl$markup$SpotExtractor$$);
$tuna$tmpl$markup$ConditionExtractor$$.prototype.$_createItem$ = function $$tuna$tmpl$markup$ConditionExtractor$$$$$_createItem$$($element$$31$$) {
  var $condition$$1_selector$$10$$ = $element$$31$$.getAttribute(this.$_ns$ + "target"), $dataPath$$8$$ = $element$$31$$.getAttribute(this.$_ns$ + "path"), $actionAttribute_name$$inline_32$$;
  a: {
    $actionAttribute_name$$inline_32$$ = $JSCompiler_alias_NULL$$;
    for(var $key$$inline_33_name$$inline_37$$ in this.$__actions$) {
      if($actionAttribute_name$$inline_32$$ = this.$_ns$ + this.$__actions$[$key$$inline_33_name$$inline_37$$], $element$$31$$.attributes[$actionAttribute_name$$inline_32$$]) {
        $actionAttribute_name$$inline_32$$ = $element$$31$$.attributes[$actionAttribute_name$$inline_32$$];
        break a
      }
    }
    $actionAttribute_name$$inline_32$$ = $JSCompiler_alias_NULL$$
  }
  var $key$$inline_38_operatorAttribute$$;
  a: {
    $key$$inline_33_name$$inline_37$$ = $JSCompiler_alias_NULL$$;
    for($key$$inline_38_operatorAttribute$$ in this.$__operators$) {
      if($key$$inline_33_name$$inline_37$$ = this.$_ns$ + this.$__operators$[$key$$inline_38_operatorAttribute$$], $element$$31$$.attributes[$key$$inline_33_name$$inline_37$$]) {
        $key$$inline_38_operatorAttribute$$ = $element$$31$$.attributes[$key$$inline_33_name$$inline_37$$];
        break a
      }
    }
    $key$$inline_38_operatorAttribute$$ = $JSCompiler_alias_NULL$$
  }
  return $condition$$1_selector$$10$$ !== $JSCompiler_alias_NULL$$ && $dataPath$$8$$ !== $JSCompiler_alias_NULL$$ && $actionAttribute_name$$inline_32$$ !== $JSCompiler_alias_NULL$$ && $key$$inline_38_operatorAttribute$$ !== $JSCompiler_alias_NULL$$ ? ($condition$$1_selector$$10$$ = new $tuna$tmpl$settings$ConditionSettings$$($condition$$1_selector$$10$$, $dataPath$$8$$, $actionAttribute_name$$inline_32$$.name.substr(this.$_ns$.length), $key$$inline_38_operatorAttribute$$.name.substr(this.$_ns$.length)), 
  $condition$$1_selector$$10$$.pattern = $element$$31$$.getAttribute(this.$_ns$ + "pattern"), $condition$$1_selector$$10$$.$actionData$ = $actionAttribute_name$$inline_32$$.value, $condition$$1_selector$$10$$.$operatorData$ = $key$$inline_38_operatorAttribute$$.value, $condition$$1_selector$$10$$) : $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$markup$CheckboxExtractor$$() {
  $tuna$tmpl$markup$SpotExtractor$$.call(this);
  this.$_tagName$ = "checkbox"
}
$tuna$utils$extend$$($tuna$tmpl$markup$CheckboxExtractor$$, $tuna$tmpl$markup$SpotExtractor$$);
$tuna$tmpl$markup$CheckboxExtractor$$.prototype.$_createItem$ = function $$tuna$tmpl$markup$CheckboxExtractor$$$$$_createItem$$($element$$34$$) {
  var $checkbox_selector$$11$$ = $element$$34$$.getAttribute(this.$_ns$ + "target"), $dataPath$$9$$ = $element$$34$$.getAttribute(this.$_ns$ + "path");
  return $checkbox_selector$$11$$ !== $JSCompiler_alias_NULL$$ && $dataPath$$9$$ !== $JSCompiler_alias_NULL$$ ? ($checkbox_selector$$11$$ = new $tuna$tmpl$settings$CheckboxSettings$$($checkbox_selector$$11$$, $dataPath$$9$$), $checkbox_selector$$11$$.pattern = $element$$34$$.getAttribute(this.$_ns$ + "pattern"), $checkbox_selector$$11$$) : $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$markup$MarkupTemplateBuilder$$() {
  this.$__templatesTable$ = {};
  this.$__extractors$ = []
}
function $JSCompiler_StaticMethods_addExtractor$$($extractor$$) {
  $tuna$tmpl$__markupBuilder$$.$__extractors$.push($extractor$$)
}
function $JSCompiler_StaticMethods_buildSettings$$($JSCompiler_StaticMethods_buildSettings$self$$, $templateID$$1$$) {
  if($JSCompiler_StaticMethods_buildSettings$self$$.$__templatesTable$[$templateID$$1$$] === $JSCompiler_alias_VOID$$) {
    var $element$$35$$ = document.getElementById($templateID$$1$$);
    if($element$$35$$ !== $JSCompiler_alias_NULL$$) {
      for(var $template$$ = new $tuna$tmpl$settings$TemplateSettings$$, $i$$19$$ = 0, $l$$16$$ = $JSCompiler_StaticMethods_buildSettings$self$$.$__extractors$.length, $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$ = $JSCompiler_alias_NULL$$;$i$$19$$ < $l$$16$$;) {
        for(var $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$ = $JSCompiler_StaticMethods_buildSettings$self$$.$__extractors$[$i$$19$$], $result$$inline_42$$ = [], $elements$$inline_43$$ = $element$$35$$.getElementsByTagName($tuna$IS_IE$$ ? $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$.$_tagName$ : $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$.$_ns$ + $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$.$_tagName$), $i$$inline_44$$ = 0, $l$$inline_45$$ = 
        $elements$$inline_43$$.length, $item$$inline_46$$ = $JSCompiler_alias_NULL$$;$i$$inline_44$$ < $l$$inline_45$$;) {
          $item$$inline_46$$ = $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$.$_createItem$($elements$$inline_43$$[$i$$inline_44$$]), $item$$inline_46$$ !== $JSCompiler_alias_NULL$$ && $result$$inline_42$$.push($item$$inline_46$$), $i$$inline_44$$++
        }
        $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$ = $result$$inline_42$$;
        $JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$ !== $JSCompiler_alias_NULL$$ && ($template$$.$__items$ = $template$$.$__items$.concat($JSCompiler_StaticMethods_extract$self$$inline_40_items$$1$$));
        $i$$19$$++
      }
      $JSCompiler_StaticMethods_buildSettings$self$$.$__templatesTable$[$templateID$$1$$] = $template$$
    }
  }
  return $JSCompiler_StaticMethods_buildSettings$self$$.$__templatesTable$[$templateID$$1$$] || $JSCompiler_alias_NULL$$
}
;function $tuna$tmpl$units$list$ListContainerRouter$$($container$$, $rootTemplate$$) {
  this.$_container$ = $container$$;
  this.$_rootTemplate$ = $rootTemplate$$
}
$tuna$tmpl$units$list$ListContainerRouter$$.prototype.append = function $$tuna$tmpl$units$list$ListContainerRouter$$$$append$($node$$2$$) {
  this.$_container$.appendChild($node$$2$$);
  var $JSCompiler_StaticMethods_registerChildCreation$self$$inline_51$$ = this.$_rootTemplate$;
  $JSCompiler_StaticMethods_registerChildCreation$self$$inline_51$$.$__createdChildren$ = $JSCompiler_StaticMethods_registerChildCreation$self$$inline_51$$.$__createdChildren$.concat($node$$2$$)
};
$tuna$tmpl$units$list$ListContainerRouter$$.prototype.remove = function $$tuna$tmpl$units$list$ListContainerRouter$$$$remove$($node$$3$$) {
  this.$_container$.removeChild($node$$3$$);
  var $JSCompiler_StaticMethods_registerChildRemoval$self$$inline_54$$ = this.$_rootTemplate$;
  $JSCompiler_StaticMethods_registerChildRemoval$self$$inline_54$$.$__removedChildren$ = $JSCompiler_StaticMethods_registerChildRemoval$self$$inline_54$$.$__removedChildren$.concat($node$$3$$)
};
function $tuna$tmpl$units$condition$ClassAction$$($opt_data$$6$$) {
  this.$_data$ = $opt_data$$6$$ || ""
}
$tuna$utils$extend$$($tuna$tmpl$units$condition$ClassAction$$, $tuna$tmpl$units$condition$ConditionAction$$);
$tuna$tmpl$units$condition$ClassAction$$.prototype.apply = function $$tuna$tmpl$units$condition$ClassAction$$$$apply$($element$$38$$, $testResult$$) {
  "" !== this.$_data$ && $tuna$dom$setClassExist$$($element$$38$$, this.$_data$, $testResult$$)
};
function $tuna$tmpl$units$condition$ConditionAction$$($opt_data$$7$$) {
  this.$_data$ = $opt_data$$7$$ || ""
}
$tuna$tmpl$units$condition$ConditionAction$$.prototype.apply = $JSCompiler_emptyFn$$();
$tuna$tmpl$units$condition$ConditionAction$$.prototype.$clone$ = function $$tuna$tmpl$units$condition$ConditionAction$$$$$clone$$($data$$26$$) {
  return new this.constructor($data$$26$$)
};
function $tuna$tmpl$units$condition$ConditionOperator$$($opt_data$$8$$) {
  this.$_data$ = $opt_data$$8$$ || ""
}
$tuna$tmpl$units$condition$ConditionOperator$$.prototype.test = $JSCompiler_emptyFn$$();
$tuna$tmpl$units$condition$ConditionOperator$$.prototype.$clone$ = function $$tuna$tmpl$units$condition$ConditionOperator$$$$$clone$$($data$$27$$) {
  return new this.constructor($data$$27$$)
};
function $tuna$tmpl$units$condition$EqualsOperator$$($opt_data$$9$$) {
  this.$_data$ = $opt_data$$9$$ || ""
}
$tuna$utils$extend$$($tuna$tmpl$units$condition$EqualsOperator$$, $tuna$tmpl$units$condition$ConditionOperator$$);
$tuna$tmpl$units$condition$EqualsOperator$$.prototype.test = function $$tuna$tmpl$units$condition$EqualsOperator$$$$test$($value$$46$$) {
  return $value$$46$$ === this.$_data$ || $value$$46$$ + "" === this.$_data$
};
function $tuna$tmpl$units$condition$IsSetOperator$$() {
  this.$_data$ = ""
}
$tuna$utils$extend$$($tuna$tmpl$units$condition$IsSetOperator$$, $tuna$tmpl$units$condition$ConditionOperator$$);
$tuna$tmpl$units$condition$IsSetOperator$$.prototype.test = function $$tuna$tmpl$units$condition$IsSetOperator$$$$test$($value$$47$$) {
  return $value$$47$$ != $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$units$condition$NotEqualsOperator$$($opt_data$$10$$) {
  this.$_data$ = $opt_data$$10$$ || ""
}
$tuna$utils$extend$$($tuna$tmpl$units$condition$NotEqualsOperator$$, $tuna$tmpl$units$condition$ConditionOperator$$);
$tuna$tmpl$units$condition$NotEqualsOperator$$.prototype.test = function $$tuna$tmpl$units$condition$NotEqualsOperator$$$$test$($value$$48$$) {
  return!($value$$48$$ == this.$_data$ || $value$$48$$ + "" == this.$_data$)
};
function $tuna$tmpl$units$condition$NotSetOperator$$() {
  this.$_data$ = ""
}
$tuna$utils$extend$$($tuna$tmpl$units$condition$NotSetOperator$$, $tuna$tmpl$units$condition$ConditionOperator$$);
$tuna$tmpl$units$condition$NotSetOperator$$.prototype.test = function $$tuna$tmpl$units$condition$NotSetOperator$$$$test$($value$$49$$) {
  return $value$$49$$ == $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$units$Unit$$($root$$) {
  this.$_rootTemplate$ = $root$$
}
$tuna$tmpl$units$Unit$$.prototype.$applyData$ = $JSCompiler_emptyFn$$();
$tuna$tmpl$units$Unit$$.prototype.$destroy$ = $JSCompiler_emptyFn$$();
function $tuna$tmpl$units$Spot$$($root$$1$$) {
  this.$_rootTemplate$ = $root$$1$$;
  this.$__pathEvaluator$ = new $tuna$tmpl$data$PathEvaluator$$;
  this.$_nodes$ = [];
  this.$_pattern$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$tmpl$units$Spot$$, $tuna$tmpl$units$Unit$$);
$tuna$tmpl$units$Spot$$.prototype.$setPath$ = function $$tuna$tmpl$units$Spot$$$$$setPath$$($path$$6$$) {
  this.$__pathEvaluator$.$setPath$($path$$6$$)
};
$tuna$tmpl$units$Spot$$.prototype.$applyData$ = function $$tuna$tmpl$units$Spot$$$$$applyData$$($dataNode$$5_value$$50$$) {
  $dataNode$$5_value$$50$$ = this.$__pathEvaluator$.evaluate($dataNode$$5_value$$50$$).$getValue$();
  this.$_pattern$ !== $JSCompiler_alias_NULL$$ && $dataNode$$5_value$$50$$ !== $JSCompiler_alias_NULL$$ && ($dataNode$$5_value$$50$$ = this.$_pattern$.join($dataNode$$5_value$$50$$));
  this.$_applyValue$($dataNode$$5_value$$50$$)
};
$tuna$tmpl$units$Spot$$.prototype.$_applyValue$ = function $$tuna$tmpl$units$Spot$$$$$_applyValue$$($i$$20_value$$51$$) {
  var $html$$1$$ = "";
  $i$$20_value$$51$$ !== $JSCompiler_alias_NULL$$ && ($html$$1$$ = $i$$20_value$$51$$.toString());
  for($i$$20_value$$51$$ = this.$_nodes$.length - 1;0 <= $i$$20_value$$51$$;) {
    this.$_nodes$[$i$$20_value$$51$$].innerHTML !== $html$$1$$ && (this.$_nodes$[$i$$20_value$$51$$].innerHTML = $html$$1$$), $i$$20_value$$51$$--
  }
};
$tuna$tmpl$units$Spot$$.prototype.$destroy$ = function $$tuna$tmpl$units$Spot$$$$$destroy$$() {
  this.$_nodes$.length = 0
};
function $tuna$tmpl$units$Attribute$$($root$$2$$, $attributeName$$2$$) {
  $tuna$tmpl$units$Spot$$.call(this, $root$$2$$);
  this.$__attributeName$ = $attributeName$$2$$;
  this.$__hasEvent$ = $JSCompiler_alias_FALSE$$;
  this.$__dispatchAttribute$ = $tuna$utils$bind$$(this.$__dispatchAttribute$, this)
}
$tuna$utils$extend$$($tuna$tmpl$units$Attribute$$, $tuna$tmpl$units$Spot$$);
$tuna$tmpl$units$Attribute$$.prototype.$_applyValue$ = function $$tuna$tmpl$units$Attribute$$$$$_applyValue$$($i$$inline_74_value$$52$$) {
  if($i$$inline_74_value$$52$$ !== $JSCompiler_alias_NULL$$) {
    for(var $i$$inline_71$$ = this.$_nodes$.length - 1;0 <= $i$$inline_71$$;) {
      this.$_nodes$[$i$$inline_71$$][this.$__attributeName$] !== $JSCompiler_alias_VOID$$ && (this.$_nodes$[$i$$inline_71$$][this.$__attributeName$] = $i$$inline_74_value$$52$$), this.$_nodes$[$i$$inline_71$$].setAttribute(this.$__attributeName$, $i$$inline_74_value$$52$$ + ""), $i$$inline_71$$--
    }
  }else {
    for($i$$inline_74_value$$52$$ = this.$_nodes$.length - 1;0 <= $i$$inline_74_value$$52$$;) {
      this.$_nodes$[$i$$inline_74_value$$52$$][this.$__attributeName$] !== $JSCompiler_alias_VOID$$ && (this.$_nodes$[$i$$inline_74_value$$52$$][this.$__attributeName$] = ""), this.$_nodes$[$i$$inline_74_value$$52$$].removeAttribute(this.$__attributeName$), $i$$inline_74_value$$52$$--
    }
  }
  this.$__hasEvent$ && setTimeout(this.$__dispatchAttribute$, 0)
};
$tuna$tmpl$units$Attribute$$.prototype.$__dispatchAttribute$ = function $$tuna$tmpl$units$Attribute$$$$$__dispatchAttribute$$() {
  for(var $i$$23$$ = this.$_nodes$.length - 1;0 <= $i$$23$$;) {
    var $element$$inline_448_element$$inline_78$$ = this.$_nodes$[$i$$23$$], $type$$inline_79$$ = this.$__attributeName$, $event$$inline_449_event$$inline_80$$ = $JSCompiler_alias_NULL$$;
    if(document.createEventObject !== $JSCompiler_alias_VOID$$) {
      var $event$$inline_449_event$$inline_80$$ = document.createEventObject(), $eventName$$inline_81$$ = "on" + $type$$inline_79$$;
      $element$$inline_448_element$$inline_78$$[$eventName$$inline_81$$] === $JSCompiler_alias_VOID$$ ? ($event$$inline_449_event$$inline_80$$.$__type$ = $type$$inline_79$$, $element$$inline_448_element$$inline_78$$.fireEvent("onhelp", $event$$inline_449_event$$inline_80$$)) : $element$$inline_448_element$$inline_78$$.fireEvent($eventName$$inline_81$$, $event$$inline_449_event$$inline_80$$)
    }else {
      $event$$inline_449_event$$inline_80$$ = document.createEvent("UIEvents"), $event$$inline_449_event$$inline_80$$.initUIEvent($type$$inline_79$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$, window, 1), $element$$inline_448_element$$inline_78$$.dispatchEvent($event$$inline_449_event$$inline_80$$)
    }
    $i$$23$$--
  }
};
function $tuna$tmpl$units$Condition$$($root$$3$$, $action$$, $operator$$) {
  $tuna$tmpl$units$Spot$$.call(this, $root$$3$$);
  this.$__action$ = $action$$;
  this.$__operator$ = $operator$$
}
$tuna$utils$extend$$($tuna$tmpl$units$Condition$$, $tuna$tmpl$units$Spot$$);
$tuna$tmpl$units$Condition$$.prototype.$_applyValue$ = function $$tuna$tmpl$units$Condition$$$$$_applyValue$$($value$$54$$) {
  for(var $testResult$$2$$ = this.$__operator$.test($value$$54$$), $i$$24$$ = this.$_nodes$.length - 1;0 <= $i$$24$$;) {
    this.$__action$.apply(this.$_nodes$[$i$$24$$], $testResult$$2$$, $value$$54$$), $i$$24$$--
  }
};
function $tuna$tmpl$units$Checkbox$$($root$$4$$) {
  $tuna$tmpl$units$Spot$$.call(this, $root$$4$$)
}
$tuna$utils$extend$$($tuna$tmpl$units$Checkbox$$, $tuna$tmpl$units$Spot$$);
$tuna$tmpl$units$Checkbox$$.prototype.$_applyValue$ = function $$tuna$tmpl$units$Checkbox$$$$$_applyValue$$($value$$55$$) {
  if($value$$55$$ !== $JSCompiler_alias_NULL$$) {
    var $i$$25$$ = this.$_nodes$.length - 1;
    if($value$$55$$ === $JSCompiler_alias_TRUE$$ || $value$$55$$ === $JSCompiler_alias_FALSE$$) {
      for(;0 <= $i$$25$$;) {
        this.$_nodes$[$i$$25$$].checked = $value$$55$$, $i$$25$$--
      }
    }else {
      if($value$$55$$ instanceof Array) {
        for(;0 <= $i$$25$$;) {
          this.$_nodes$[$i$$25$$].checked = -1 !== $tuna$utils$indexOf$$(this.$_nodes$[$i$$25$$].value, $value$$55$$), $i$$25$$--
        }
      }else {
        for($value$$55$$ += "";0 <= $i$$25$$;) {
          this.$_nodes$[$i$$25$$].checked = this.$_nodes$[$i$$25$$].value === $value$$55$$, $i$$25$$--
        }
      }
    }
  }
};
function $tuna$tmpl$units$List$$($root$$5$$) {
  this.$_rootTemplate$ = $root$$5$$;
  this.$__itemSettings$ = this.$__itemRenderer$ = this.$__templateCompiler$ = $JSCompiler_alias_NULL$$;
  this.$__itemsTable$ = {};
  this.$__pathEvaluator$ = new $tuna$tmpl$data$PathEvaluator$$;
  this.$__keyPathEvaluator$ = new $tuna$tmpl$data$PathEvaluator$$;
  this.$__listNodeRouter$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$tmpl$units$List$$, $tuna$tmpl$units$Unit$$);
$tuna$tmpl$units$List$$.prototype.$setPath$ = function $$tuna$tmpl$units$List$$$$$setPath$$($path$$7$$) {
  this.$__pathEvaluator$.$setPath$($path$$7$$)
};
$tuna$tmpl$units$List$$.prototype.$applyData$ = function $$tuna$tmpl$units$List$$$$$applyData$$($dataNode$$6_sampleNode_templateTarget$$inline_92$$) {
  var $oldItemsTable$$ = this.$__itemsTable$;
  this.$__itemsTable$ = {};
  var $dataNode$$6_sampleNode_templateTarget$$inline_92$$ = this.$__pathEvaluator$.evaluate($dataNode$$6_sampleNode_templateTarget$$inline_92$$), $sample$$ = $dataNode$$6_sampleNode_templateTarget$$inline_92$$.$getValue$(), $itemTemplate_templateTarget$$inline_86$$ = $JSCompiler_alias_NULL$$, $itemNode$$ = $JSCompiler_alias_NULL$$, $key$$19$$ = $JSCompiler_alias_NULL$$, $index$$53_template$$inline_91$$;
  for($index$$53_template$$inline_91$$ in $sample$$) {
    if($itemNode$$ = $JSCompiler_StaticMethods_growChild$$($dataNode$$6_sampleNode_templateTarget$$inline_92$$, $index$$53_template$$inline_91$$), $key$$19$$ = this.$__keyPathEvaluator$.evaluate($itemNode$$).getStringValue(), $key$$19$$ !== $JSCompiler_alias_NULL$$) {
      if($oldItemsTable$$[$key$$19$$] === $JSCompiler_alias_VOID$$) {
        if($itemTemplate_templateTarget$$inline_86$$ = this.$__itemRenderer$.cloneNode($JSCompiler_alias_TRUE$$), $itemTemplate_templateTarget$$inline_86$$ !== $JSCompiler_alias_NULL$$ && this.$__itemSettings$ !== $JSCompiler_alias_NULL$$) {
          var $template$$inline_87$$ = this.$__templateCompiler$.compile(this.$__itemSettings$, $itemTemplate_templateTarget$$inline_86$$, this.$_rootTemplate$);
          this.$__listNodeRouter$.append($itemTemplate_templateTarget$$inline_86$$);
          $itemTemplate_templateTarget$$inline_86$$ = $template$$inline_87$$
        }else {
          $itemTemplate_templateTarget$$inline_86$$ = $JSCompiler_alias_NULL$$
        }
      }else {
        $itemTemplate_templateTarget$$inline_86$$ = $oldItemsTable$$[$key$$19$$], delete $oldItemsTable$$[$key$$19$$]
      }
      $itemTemplate_templateTarget$$inline_86$$ !== $JSCompiler_alias_NULL$$ && ($itemTemplate_templateTarget$$inline_86$$.$applyData$($itemNode$$), this.$__itemsTable$[$key$$19$$] = $itemTemplate_templateTarget$$inline_86$$)
    }
  }
  var $dataNode$$6_sampleNode_templateTarget$$inline_92$$ = $index$$53_template$$inline_91$$ = $JSCompiler_alias_NULL$$, $key$$inline_93$$;
  for($key$$inline_93$$ in $oldItemsTable$$) {
    $index$$53_template$$inline_91$$ = $oldItemsTable$$[$key$$inline_93$$], $dataNode$$6_sampleNode_templateTarget$$inline_92$$ = $index$$53_template$$inline_91$$.$getTarget$(), $dataNode$$6_sampleNode_templateTarget$$inline_92$$ !== $JSCompiler_alias_NULL$$ && this.$__listNodeRouter$.remove($dataNode$$6_sampleNode_templateTarget$$inline_92$$), $index$$53_template$$inline_91$$.$destroy$()
  }
};
$tuna$tmpl$units$List$$.prototype.$destroy$ = function $$tuna$tmpl$units$List$$$$$destroy$$() {
  for(var $key$$20$$ in this.$__itemsTable$) {
    this.$__itemsTable$[$key$$20$$].$destroy$()
  }
  this.$__itemsTable$ = {}
};
function $tuna$tmpl$units$Template$$($opt_root$$) {
  this.$_rootTemplate$ = $opt_root$$ || this;
  this.$__items$ = [];
  this.$__createdChildren$ = [];
  this.$__removedChildren$ = [];
  this.$__target$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$tmpl$units$Template$$, $tuna$tmpl$units$Unit$$);
$tuna$tmpl$units$Template$$.prototype.$getTarget$ = $JSCompiler_get$$("$__target$");
$tuna$tmpl$units$Template$$.prototype.$applyData$ = function $$tuna$tmpl$units$Template$$$$$applyData$$($dataNode$$7$$) {
  for(var $i$$26$$ = this.$__items$.length - 1;0 <= $i$$26$$;) {
    this.$__items$[$i$$26$$].$applyData$($dataNode$$7$$), $i$$26$$--
  }
};
$tuna$tmpl$units$Template$$.prototype.$destroy$ = function $$tuna$tmpl$units$Template$$$$$destroy$$() {
  for(;0 < this.$__items$.length;) {
    this.$__items$.shift().$destroy$()
  }
  this.$__target$ = $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$compilers$TemplateCompiler$$() {
  this.$__itemCompilers$ = {}
}
$tuna$tmpl$compilers$TemplateCompiler$$.prototype.compile = function $$tuna$tmpl$compilers$TemplateCompiler$$$$compile$($settings$$2$$, $element$$43$$, $opt_root$$1_root$$7$$) {
  var $template$$3$$ = new $tuna$tmpl$units$Template$$($opt_root$$1_root$$7$$);
  $template$$3$$.$__target$ = $element$$43$$;
  for(var $i$$27$$ = 0, $l$$17$$ = $settings$$2$$.$getItemsCount$(), $opt_root$$1_root$$7$$ = $opt_root$$1_root$$7$$ || $template$$3$$, $compiler$$2_items$$3$$ = $JSCompiler_alias_NULL$$, $itemSettings$$2$$ = $compiler$$2_items$$3$$ = $JSCompiler_alias_NULL$$;$i$$27$$ < $l$$17$$;) {
    $itemSettings$$2$$ = $settings$$2$$.$getItemAt$($i$$27$$), $compiler$$2_items$$3$$ = this.$__itemCompilers$[$itemSettings$$2$$.$getType$()], $compiler$$2_items$$3$$ !== $JSCompiler_alias_VOID$$ && ($compiler$$2_items$$3$$ = $compiler$$2_items$$3$$.compile($element$$43$$, $itemSettings$$2$$, $opt_root$$1_root$$7$$), $compiler$$2_items$$3$$ !== $JSCompiler_alias_NULL$$ && ($template$$3$$.$__items$ = $template$$3$$.$__items$.concat($compiler$$2_items$$3$$))), $i$$27$$++
  }
  return $template$$3$$
};
function $tuna$tmpl$compilers$SpotCompiler$$() {
}
$tuna$tmpl$compilers$SpotCompiler$$.prototype.compile = function $$tuna$tmpl$compilers$SpotCompiler$$$$compile$($element$$44$$, $settings$$3$$, $root$$8_spot$$1$$) {
  return $settings$$3$$ instanceof $tuna$tmpl$settings$SpotSettings$$ ? ($root$$8_spot$$1$$ = new $tuna$tmpl$units$Spot$$($root$$8_spot$$1$$), $JSCompiler_StaticMethods__setupSpot$$($element$$44$$, $root$$8_spot$$1$$, $settings$$3$$), $root$$8_spot$$1$$) : $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods__setupSpot$$($element$$45_elements$$inline_110$$, $spot$$2$$, $selector$$12_settings$$4$$) {
  $spot$$2$$.$setPath$($selector$$12_settings$$4$$.$dataPath$);
  $selector$$12_settings$$4$$.pattern !== $JSCompiler_alias_NULL$$ && ($spot$$2$$.$_pattern$ = $selector$$12_settings$$4$$.pattern.split("$$"));
  $selector$$12_settings$$4$$ = $selector$$12_settings$$4$$.$targetSelector$;
  $tuna$dom$matchesSelector$$($element$$45_elements$$inline_110$$, $selector$$12_settings$$4$$) || ($element$$45_elements$$inline_110$$ = $tuna$dom$select$$($selector$$12_settings$$4$$, $element$$45_elements$$inline_110$$));
  $spot$$2$$.$_nodes$ = $spot$$2$$.$_nodes$.concat($element$$45_elements$$inline_110$$)
}
;function $tuna$tmpl$compilers$AttributeCompiler$$() {
}
$tuna$utils$extend$$($tuna$tmpl$compilers$AttributeCompiler$$, $tuna$tmpl$compilers$SpotCompiler$$);
$tuna$tmpl$compilers$AttributeCompiler$$.prototype.compile = function $$tuna$tmpl$compilers$AttributeCompiler$$$$compile$($element$$46$$, $settings$$5$$, $attribute$$3_root$$9$$) {
  return $settings$$5$$ instanceof $tuna$tmpl$settings$AttributeSettings$$ ? ($attribute$$3_root$$9$$ = new $tuna$tmpl$units$Attribute$$($attribute$$3_root$$9$$, $settings$$5$$.$attributeName$), $JSCompiler_StaticMethods__setupSpot$$($element$$46$$, $attribute$$3_root$$9$$, $settings$$5$$), $attribute$$3_root$$9$$.$__hasEvent$ = $settings$$5$$.$hasEvent$, $attribute$$3_root$$9$$) : $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$compilers$ConditionCompiler$$() {
  this.$__actions$ = {};
  this.$__operators$ = {}
}
$tuna$utils$extend$$($tuna$tmpl$compilers$ConditionCompiler$$, $tuna$tmpl$compilers$SpotCompiler$$);
$tuna$tmpl$compilers$ConditionCompiler$$.prototype.compile = function $$tuna$tmpl$compilers$ConditionCompiler$$$$compile$($element$$47$$, $settings$$6$$, $condition$$2_root$$10$$) {
  if($settings$$6$$ instanceof $tuna$tmpl$settings$ConditionSettings$$) {
    var $action$$2_actionPrototype$$ = this.$__actions$[$settings$$6$$.$actionType$], $operator$$2_operatorPrototype$$ = this.$__operators$[$settings$$6$$.$operatorType$];
    if($action$$2_actionPrototype$$ !== $JSCompiler_alias_VOID$$ && $operator$$2_operatorPrototype$$ !== $JSCompiler_alias_VOID$$) {
      return $action$$2_actionPrototype$$ = $action$$2_actionPrototype$$.$clone$($settings$$6$$.$actionData$), $operator$$2_operatorPrototype$$ = $operator$$2_operatorPrototype$$.$clone$($settings$$6$$.$operatorData$), $condition$$2_root$$10$$ = new $tuna$tmpl$units$Condition$$($condition$$2_root$$10$$, $action$$2_actionPrototype$$, $operator$$2_operatorPrototype$$), $JSCompiler_StaticMethods__setupSpot$$($element$$47$$, $condition$$2_root$$10$$, $settings$$6$$), $condition$$2_root$$10$$
    }
  }
  return $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$compilers$CheckboxCompiler$$() {
}
$tuna$utils$extend$$($tuna$tmpl$compilers$CheckboxCompiler$$, $tuna$tmpl$compilers$SpotCompiler$$);
$tuna$tmpl$compilers$CheckboxCompiler$$.prototype.compile = function $$tuna$tmpl$compilers$CheckboxCompiler$$$$compile$($element$$48$$, $settings$$7$$, $checkbox$$1_root$$11$$) {
  return $settings$$7$$ instanceof $tuna$tmpl$settings$CheckboxSettings$$ ? ($checkbox$$1_root$$11$$ = new $tuna$tmpl$units$Checkbox$$($checkbox$$1_root$$11$$), $JSCompiler_StaticMethods__setupSpot$$($element$$48$$, $checkbox$$1_root$$11$$, $settings$$7$$), $checkbox$$1_root$$11$$) : $JSCompiler_alias_NULL$$
};
function $tuna$tmpl$compilers$ListCompiler$$($compiler$$3$$) {
  this.$__templateCompiler$ = $compiler$$3$$
}
$tuna$tmpl$compilers$ListCompiler$$.prototype.compile = function $$tuna$tmpl$compilers$ListCompiler$$$$compile$($element$$49$$, $settings$$8$$, $root$$12$$) {
  if($settings$$8$$ instanceof $tuna$tmpl$settings$ListSettings$$) {
    var $renderer$$ = document.getElementById($settings$$8$$.$itemRendererID$);
    if($renderer$$ !== $JSCompiler_alias_NULL$$) {
      $renderer$$ = $renderer$$.cloneNode($JSCompiler_alias_TRUE$$);
      $renderer$$.removeAttribute("id");
      var $selector$$13$$ = $settings$$8$$.$targetSelector$;
      if($tuna$dom$matchesSelector$$($element$$49$$, $selector$$13$$)) {
        return $JSCompiler_StaticMethods___compileList$$(this, $element$$49$$, $renderer$$, $settings$$8$$, $root$$12$$)
      }
      for(var $lists$$ = [], $elements$$3$$ = $tuna$dom$select$$($selector$$13$$, $element$$49$$), $i$$28$$ = $elements$$3$$.length - 1;0 <= $i$$28$$;) {
        $tuna$dom$getParentMatches$$($elements$$3$$[$i$$28$$], $selector$$13$$, $element$$49$$) === $JSCompiler_alias_NULL$$ && $lists$$.push($JSCompiler_StaticMethods___compileList$$(this, $elements$$3$$[$i$$28$$], $renderer$$, $settings$$8$$, $root$$12$$)), $i$$28$$--
      }
      return $lists$$
    }
    throw'Cannot find item renderer with id: "' + $settings$$8$$.$itemRendererID$ + '"';
  }
  return $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods___compileList$$($JSCompiler_StaticMethods___compileList$self$$, $element$$50$$, $itemRenderer$$, $settings$$9$$, $root$$13$$) {
  var $list$$3$$ = new $tuna$tmpl$units$List$$($root$$13$$);
  $list$$3$$.$__templateCompiler$ = $JSCompiler_StaticMethods___compileList$self$$.$__templateCompiler$;
  $list$$3$$.$__itemRenderer$ = $itemRenderer$$;
  $list$$3$$.$__itemSettings$ = $settings$$9$$.$itemSettings$;
  $list$$3$$.$__keyPathEvaluator$.$setPath$($settings$$9$$.keyPath);
  $list$$3$$.$setPath$($settings$$9$$.$dataPath$);
  $list$$3$$.$__listNodeRouter$ = new $tuna$tmpl$units$list$ListContainerRouter$$($element$$50$$, $root$$13$$);
  return $list$$3$$
}
;var $tuna$tmpl$__compiler$$ = $JSCompiler_alias_NULL$$, $tuna$tmpl$__markupBuilder$$ = $JSCompiler_alias_NULL$$, $tuna$tmpl$__settingsTable$$ = {};
function $tuna$ui$Module$$($selector$$14$$) {
  this.$_selector$ = $selector$$14$$
}
$tuna$ui$Module$$.prototype.$init$ = function $$tuna$ui$Module$$$$$init$$($context$$2$$, $container$$1$$) {
  var $instances$$ = [], $targets_targets$$inline_179$$;
  $targets_targets$$inline_179$$ = $tuna$dom$select$$(this.$_selector$, $context$$2$$);
  $targets_targets$$inline_179$$ = $targets_targets$$inline_179$$.concat($tuna$dom$__selectorEngine$$ !== $JSCompiler_alias_NULL$$ ? $tuna$dom$__selectorEngine$$.matches(this.$_selector$, [$context$$2$$]) : []);
  for(var $i$$29$$ = 0, $l$$18$$ = $targets_targets$$inline_179$$.length, $instance_target$$inline_182$$ = $JSCompiler_alias_NULL$$;$i$$29$$ < $l$$18$$;) {
    for(var $instance_target$$inline_182$$ = $targets_targets$$inline_179$$[$i$$29$$], $context$$inline_183$$ = $context$$2$$, $JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$ = $JSCompiler_alias_TRUE$$, $isolators$$inline_185$$ = $tuna$ui$__isolators$$, $i$$inline_186$$ = 0, $l$$inline_187$$ = $isolators$$inline_185$$.length;$i$$inline_186$$ < $l$$inline_187$$;) {
      if($instance_target$$inline_182$$ !== $context$$inline_183$$) {
        if($JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$ && ($JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$ = !$tuna$dom$hasClass$$($instance_target$$inline_182$$, $isolators$$inline_185$$[$i$$inline_186$$]))) {
          for(var $JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$ = $isolators$$inline_185$$[$i$$inline_186$$], $opt_context$$inline_455$$ = $context$$inline_183$$, $parent$$inline_456$$ = $instance_target$$inline_182$$.parentNode;$parent$$inline_456$$ !== $JSCompiler_alias_NULL$$ && $parent$$inline_456$$ !== $opt_context$$inline_455$$ && !$tuna$dom$hasClass$$($parent$$inline_456$$, $JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$);) {
            $parent$$inline_456$$ = $parent$$inline_456$$.parentNode
          }
          $JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$ = ($parent$$inline_456$$ === $opt_context$$inline_455$$ ? $JSCompiler_alias_NULL$$ : $parent$$inline_456$$) === $JSCompiler_alias_NULL$$
        }
        if(!$JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$) {
          break
        }
      }
      $i$$inline_186$$++
    }
    $JSCompiler_temp$$436_JSCompiler_temp$$437_className$$inline_454_result$$inline_184$$ && ($instance_target$$inline_182$$ = this.$initInstance$($targets_targets$$inline_179$$[$i$$29$$], $container$$1$$), $instance_target$$inline_182$$ !== $JSCompiler_alias_NULL$$ && ($instances$$.push($instance_target$$inline_182$$), $JSCompiler_StaticMethods_getBooleanOption$$($instance_target$$inline_182$$, "not-init") || $instance_target$$inline_182$$.$init$()));
    $i$$29$$++
  }
  return $instances$$
};
$tuna$ui$Module$$.prototype.$destroy$ = function $$tuna$ui$Module$$$$$destroy$$($instances$$1_l$$20$$) {
  for(var $i$$31$$ = 0, $instances$$1_l$$20$$ = $instances$$1_l$$20$$.length;$i$$31$$ < $instances$$1_l$$20$$;) {
    $i$$31$$++
  }
};
$tuna$ui$Module$$.prototype.$initInstance$ = $JSCompiler_emptyFn$$();
function $tuna$ui$ModuleInstance$$($target$$40$$) {
  $tuna$events$EventDispatcher$$.call(this);
  this.$_target$ = $target$$40$$;
  this.$__defaultOptions$ = {}
}
$tuna$utils$extend$$($tuna$ui$ModuleInstance$$, $tuna$events$EventDispatcher$$);
$JSCompiler_prototypeAlias$$ = $tuna$ui$ModuleInstance$$.prototype;
$JSCompiler_prototypeAlias$$.$getTarget$ = $JSCompiler_get$$("$_target$");
$JSCompiler_prototypeAlias$$.getName = function $$JSCompiler_prototypeAlias$$$getName$() {
  return this.$_target$.getAttribute("data-name")
};
function $JSCompiler_StaticMethods_setEnabled$$($JSCompiler_StaticMethods_setEnabled$self$$) {
  $tuna$dom$setClassExist$$($JSCompiler_StaticMethods_setEnabled$self$$.$_target$, "disabled", $JSCompiler_alias_TRUE$$)
}
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!$tuna$dom$hasClass$$(this.$_target$, "disabled")
};
function $JSCompiler_StaticMethods__setDefaultOption$$($JSCompiler_StaticMethods__setDefaultOption$self$$, $name$$67$$, $option$$) {
  $option$$ === $JSCompiler_alias_NULL$$ ? delete $JSCompiler_StaticMethods__setDefaultOption$self$$.$__defaultOptions$[$name$$67$$] : $JSCompiler_StaticMethods__setDefaultOption$self$$.$__defaultOptions$[$name$$67$$] = $option$$
}
function $JSCompiler_StaticMethods_setOption$$($JSCompiler_StaticMethods_setOption$self$$, $name$$68$$, $option$$1$$) {
  $option$$1$$ ? $JSCompiler_StaticMethods_setOption$self$$.$_target$.setAttribute("data-" + $name$$68$$, $option$$1$$) : $JSCompiler_StaticMethods_setOption$self$$.$_target$.removeAttribute("data-" + $name$$68$$)
}
function $JSCompiler_StaticMethods_getOption$$($JSCompiler_StaticMethods_getOption$self$$) {
  var $option$$2$$ = $JSCompiler_StaticMethods_getOption$self$$.$_target$.getAttribute("data-popup-id");
  $option$$2$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getOption$self$$.$__defaultOptions$["popup-id"] !== $JSCompiler_alias_VOID$$ && ($option$$2$$ = $JSCompiler_StaticMethods_getOption$self$$.$__defaultOptions$["popup-id"]);
  return $option$$2$$
}
function $JSCompiler_StaticMethods_getStringOption$$($JSCompiler_StaticMethods_getStringOption$self$$, $name$$70$$) {
  var $option$$3$$ = $JSCompiler_StaticMethods_getStringOption$self$$.$_target$.getAttribute("data-" + $name$$70$$);
  $option$$3$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getStringOption$self$$.$__defaultOptions$[$name$$70$$] !== $JSCompiler_alias_VOID$$ && ($option$$3$$ = $JSCompiler_StaticMethods_getStringOption$self$$.$__defaultOptions$[$name$$70$$]);
  return $option$$3$$
}
function $JSCompiler_StaticMethods_getNumberOption$$($JSCompiler_StaticMethods_getNumberOption$self$$, $name$$71$$) {
  var $option$$4$$ = $JSCompiler_StaticMethods_getNumberOption$self$$.$_target$.getAttribute("data-" + $name$$71$$);
  $option$$4$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getNumberOption$self$$.$__defaultOptions$[$name$$71$$] !== $JSCompiler_alias_VOID$$ && ($option$$4$$ = $JSCompiler_StaticMethods_getNumberOption$self$$.$__defaultOptions$[$name$$71$$]);
  return Number($option$$4$$)
}
function $JSCompiler_StaticMethods_getBooleanOption$$($JSCompiler_StaticMethods_getBooleanOption$self$$, $name$$72$$) {
  var $option$$5$$ = $JSCompiler_StaticMethods_getBooleanOption$self$$.$_target$.getAttribute("data-" + $name$$72$$);
  $option$$5$$ === $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods_getBooleanOption$self$$.$__defaultOptions$[$name$$72$$] !== $JSCompiler_alias_VOID$$ && ($option$$5$$ = $JSCompiler_StaticMethods_getBooleanOption$self$$.$__defaultOptions$[$name$$72$$]);
  return!!$option$$5$$
}
$JSCompiler_prototypeAlias$$.$init$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$destroy$ = $JSCompiler_emptyFn$$();
function $tuna$ui$ModuleContainer$$($target$$41$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$41$$);
  this.$__modules$ = [];
  this.$__instances$ = {}
}
$tuna$utils$extend$$($tuna$ui$ModuleContainer$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$ModuleContainer$$.prototype.$isActive$ = function $$tuna$ui$ModuleContainer$$$$$isActive$$() {
  return document.getElementById(this.$_target$.id) === this.$_target$
};
function $JSCompiler_StaticMethods_initModules$$($JSCompiler_StaticMethods_initModules$self$$, $target$$42$$) {
  $target$$42$$ = $target$$42$$ || $JSCompiler_StaticMethods_initModules$self$$.$_target$;
  $target$$42$$.id === $JSCompiler_alias_NULL$$ && ($target$$42$$.id = "container_" + $tuna$ui$__lastId$$++);
  var $instances$$2_targetId$$ = $target$$42$$.id;
  $JSCompiler_StaticMethods_initModules$self$$.$__instances$[$instances$$2_targetId$$] === $JSCompiler_alias_VOID$$ && ($JSCompiler_StaticMethods_initModules$self$$.$__instances$[$instances$$2_targetId$$] = {});
  for(var $instances$$2_targetId$$ = $JSCompiler_StaticMethods_initModules$self$$.$__instances$[$instances$$2_targetId$$], $i$$32$$ = 0, $l$$21$$ = $JSCompiler_StaticMethods_initModules$self$$.$__modules$.length, $type$$72$$ = $JSCompiler_alias_NULL$$, $module$$ = $JSCompiler_alias_NULL$$;$i$$32$$ < $l$$21$$;) {
    $type$$72$$ = $JSCompiler_StaticMethods_initModules$self$$.$__modules$[$i$$32$$];
    $module$$ = $tuna$ui$__typeTable$$[$type$$72$$] !== $JSCompiler_alias_VOID$$ ? $tuna$ui$__typeTable$$[$type$$72$$] : $JSCompiler_alias_NULL$$;
    if($module$$ !== $JSCompiler_alias_NULL$$) {
      $instances$$2_targetId$$[$type$$72$$] === $JSCompiler_alias_VOID$$ && ($instances$$2_targetId$$[$type$$72$$] = []), $instances$$2_targetId$$[$type$$72$$] = $instances$$2_targetId$$[$type$$72$$].concat($module$$.$init$($target$$42$$, $JSCompiler_StaticMethods_initModules$self$$))
    }else {
      throw'Unknown module "' + $type$$72$$ + '"';
    }
    $i$$32$$++
  }
}
function $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$, $i$$33_type$$74$$, $name$$73$$) {
  var $l$$22_targetId$$2$$;
  $l$$22_targetId$$2$$ = $l$$22_targetId$$2$$ || $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.$_target$.id;
  if($JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.$__instances$[$l$$22_targetId$$2$$] !== $JSCompiler_alias_VOID$$ && $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.$__instances$[$l$$22_targetId$$2$$][$i$$33_type$$74$$] !== $JSCompiler_alias_VOID$$) {
    $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.$__instances$[$l$$22_targetId$$2$$][$i$$33_type$$74$$];
    $i$$33_type$$74$$ = 0;
    for($l$$22_targetId$$2$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$.length;$i$$33_type$$74$$ < $l$$22_targetId$$2$$;) {
      if($JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$[$i$$33_type$$74$$].getName() === $name$$73$$) {
        return $JSCompiler_StaticMethods_getModuleInstanceByName$self_instances$$3$$[$i$$33_type$$74$$]
      }
      $i$$33_type$$74$$++
    }
  }
  return $JSCompiler_alias_NULL$$
}
function $JSCompiler_StaticMethods_destroyModules$$($JSCompiler_StaticMethods_destroyModules$self$$, $target$$43$$) {
  if($target$$43$$ === $JSCompiler_alias_VOID$$) {
    for(var $targetId$$3$$ in $JSCompiler_StaticMethods_destroyModules$self$$.$__instances$) {
      $JSCompiler_StaticMethods___destroyModulesById$$($JSCompiler_StaticMethods_destroyModules$self$$, $targetId$$3$$)
    }
  }else {
    $JSCompiler_StaticMethods___destroyModulesById$$($JSCompiler_StaticMethods_destroyModules$self$$, $target$$43$$.id)
  }
}
function $JSCompiler_StaticMethods___destroyModulesById$$($JSCompiler_StaticMethods___destroyModulesById$self$$, $targetId$$4$$) {
  var $module$$1$$ = $JSCompiler_alias_NULL$$, $name$$74$$;
  for($name$$74$$ in $JSCompiler_StaticMethods___destroyModulesById$self$$.$__instances$[$targetId$$4$$]) {
    $module$$1$$ = $tuna$ui$__typeTable$$[$name$$74$$] !== $JSCompiler_alias_VOID$$ ? $tuna$ui$__typeTable$$[$name$$74$$] : $JSCompiler_alias_NULL$$, $module$$1$$ !== $JSCompiler_alias_NULL$$ && $module$$1$$.$destroy$($JSCompiler_StaticMethods___destroyModulesById$self$$.$__instances$[$targetId$$4$$][$name$$74$$]), $JSCompiler_StaticMethods___destroyModulesById$self$$.$__instances$[$targetId$$4$$][$name$$74$$].length = 0
  }
  delete $JSCompiler_StaticMethods___destroyModulesById$self$$.$__instances$[$targetId$$4$$]
}
;var $tuna$ui$__lastId$$ = 0, $tuna$ui$__typeTable$$ = {}, $tuna$ui$__isolators$$ = [];
function $tuna$ui$popups$Popup$$($target$$44$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$44$$);
  this.$__isInit$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($tuna$ui$popups$Popup$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$popups$Popup$$.prototype.$init$ = function $$tuna$ui$popups$Popup$$$$$init$$() {
  if(!this.$__isInit$) {
    var $self$$3$$ = this;
    $tuna$dom$addChildEventListener$$(this.$_target$, ".j-popup-close", "click", function($event$$15$$) {
      $tuna$dom$preventDefault$$($event$$15$$);
      $self$$3$$.close()
    });
    $tuna$dom$addChildEventListener$$(this.$_target$, ".j-popup-apply", "click", function($event$$16$$) {
      $tuna$dom$preventDefault$$($event$$16$$);
      $self$$3$$.apply()
    })
  }
};
$tuna$ui$popups$Popup$$.prototype.open = function $$tuna$ui$popups$Popup$$$$open$() {
  this.$dispatch$("open") && $tuna$dom$addClass$$(this.$_target$, "show")
};
$tuna$ui$popups$Popup$$.prototype.close = function $$tuna$ui$popups$Popup$$$$close$() {
  this.$dispatch$("close") && $tuna$dom$removeClass$$(this.$_target$, "show")
};
$tuna$ui$popups$Popup$$.prototype.apply = function $$tuna$ui$popups$Popup$$$$apply$() {
  this.$dispatch$("apply", $JSCompiler_StaticMethods___collectData$$(this)) && $tuna$dom$removeClass$$(this.$_target$, "show")
};
function $JSCompiler_StaticMethods___collectData$$($JSCompiler_StaticMethods___collectData$self_form$$) {
  $JSCompiler_StaticMethods___collectData$self_form$$ = $tuna$dom$selectOne$$("form.j-popup-form", $JSCompiler_StaticMethods___collectData$self_form$$.$_target$);
  return $JSCompiler_StaticMethods___collectData$self_form$$ !== $JSCompiler_alias_NULL$$ ? $tuna$ui$forms$serialize$$($JSCompiler_StaticMethods___collectData$self_form$$) : $JSCompiler_alias_NULL$$
}
;var $tuna$ui$popups$__idTable$$ = {}, $tuna$ui$popups$__lastId$$ = 0;
function $tuna$ui$popups$create$$($target$$45$$) {
  "" === $target$$45$$.id && ($target$$45$$.id = "popup_" + $tuna$ui$popups$__lastId$$++);
  if($tuna$ui$popups$__idTable$$[$target$$45$$.id] === $JSCompiler_alias_VOID$$) {
    var $popup$$ = new $tuna$ui$popups$Popup$$($target$$45$$);
    $popup$$.$init$();
    $tuna$ui$popups$__idTable$$[$target$$45$$.id] = $popup$$
  }
  return $tuna$ui$popups$__idTable$$[$target$$45$$.id]
}
;function $tuna$ui$buttons$Button$$($target$$48$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$48$$);
  this.$_isInit$ = $JSCompiler_alias_FALSE$$
}
$tuna$utils$extend$$($tuna$ui$buttons$Button$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$buttons$Button$$.prototype.$init$ = function $$tuna$ui$buttons$Button$$$$$init$$() {
  if(!this.$_isInit$) {
    this.$_isInit$ = $JSCompiler_alias_TRUE$$;
    var $self$$4$$ = this;
    $tuna$dom$addEventListener$$(this.$_target$, "click", function($event$$18$$) {
      $self$$4$$.isEnabled() ? $self$$4$$.$dispatch$("click") : $tuna$dom$stopPropagation$$($event$$18$$)
    })
  }
};
$tuna$ui$buttons$Button$$.prototype.setActive = function $$tuna$ui$buttons$Button$$$$setActive$($isActive$$) {
  $tuna$dom$setClassExist$$(this.$_target$, "active", $isActive$$)
};
function $tuna$ui$buttons$PopupButton$$($target$$49$$) {
  $tuna$ui$buttons$Button$$.call(this, $target$$49$$);
  this.$_popup$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$buttons$PopupButton$$, $tuna$ui$buttons$Button$$);
$tuna$ui$buttons$PopupButton$$.prototype.$init$ = function $$tuna$ui$buttons$PopupButton$$$$$init$$() {
  var $popupId_popupTarget$$ = $JSCompiler_StaticMethods_getOption$$(this);
  $popupId_popupTarget$$ !== $JSCompiler_alias_NULL$$ && ($popupId_popupTarget$$ = $tuna$dom$selectOne$$("#" + $popupId_popupTarget$$), $popupId_popupTarget$$ !== $JSCompiler_alias_NULL$$ && (this.$_popup$ = $tuna$ui$popups$create$$($popupId_popupTarget$$)));
  var $self$$5$$ = this;
  $tuna$dom$addEventListener$$(this.$_target$, "click", function($event$$19$$) {
    $self$$5$$.isEnabled() ? $self$$5$$.$dispatch$("click") && $self$$5$$.$_popup$ !== $JSCompiler_alias_NULL$$ && $self$$5$$.$_popup$.open() : $tuna$dom$stopPropagation$$($event$$19$$)
  })
};
function $JSCompiler_StaticMethods_getPopup$$($JSCompiler_StaticMethods_getPopup$self$$) {
  return $JSCompiler_StaticMethods_getPopup$self$$.$_popup$
}
;function $tuna$ui$buttons$ButtonGroup$$($target$$50$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$50$$);
  this.$__defaultAction$ = $JSCompiler_alias_NULL$$;
  this.$__isPreventDefault$ = $JSCompiler_alias_TRUE$$;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "button-selector", ".j-button")
}
$tuna$utils$extend$$($tuna$ui$buttons$ButtonGroup$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$buttons$ButtonGroup$$.prototype.$init$ = function $$tuna$ui$buttons$ButtonGroup$$$$$init$$() {
  var $self$$6$$ = this, $buttonSelector$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "button-selector");
  $buttonSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$(this.$_target$, $buttonSelector$$, "click", function($event$$20$$) {
    $self$$6$$.$__isPreventDefault$ && $tuna$dom$preventDefault$$($event$$20$$);
    var $button$$ = $tuna$ui$buttons$create$$(this), $action$$4$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$, "action");
    $action$$4$$ === $JSCompiler_alias_NULL$$ && ($action$$4$$ = $self$$6$$.$__defaultAction$);
    $action$$4$$ !== $JSCompiler_alias_NULL$$ && ($self$$6$$.$dispatch$($action$$4$$, $button$$) || $tuna$dom$stopPropagation$$($event$$20$$))
  })
};
var $tuna$ui$buttons$__idTable$$ = {}, $tuna$ui$buttons$__lastId$$ = 0;
function $tuna$ui$buttons$create$$($target$$51$$) {
  "" === $target$$51$$.id && ($target$$51$$.id = "button_" + $tuna$ui$buttons$__lastId$$++);
  if($tuna$ui$buttons$__idTable$$[$target$$51$$.id] === $JSCompiler_alias_VOID$$) {
    var $button$$1$$ = new $tuna$ui$buttons$Button$$($target$$51$$);
    $button$$1$$.$init$();
    $tuna$ui$buttons$__idTable$$[$target$$51$$.id] = $button$$1$$
  }
  return $tuna$ui$buttons$__idTable$$[$target$$51$$.id]
}
;function $tuna$ui$flash$SWF$$($target$$52$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$52$$);
  this.$__movieId$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "wmode", "opaque");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "menu", $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "allow-fullscreen", $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "allow-script-access", "always")
}
$tuna$utils$extend$$($tuna$ui$flash$SWF$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$flash$SWF$$.prototype.$init$ = function $$tuna$ui$flash$SWF$$$$$init$$() {
  this.$__movieId$ = "swf_" + $tuna$ui$flash$__lastId$$++;
  this.$_target$.innerHTML = '<div id="' + this.$__movieId$ + '"></div>';
  swfobject.embedSWF($JSCompiler_StaticMethods_getStringOption$$(this, "src"), this.$__movieId$, $JSCompiler_StaticMethods_getNumberOption$$(this, "width"), $JSCompiler_StaticMethods_getNumberOption$$(this, "height"), "10.0.0", $JSCompiler_alias_NULL$$, $JSCompiler_StaticMethods_getStringOption$$(this, "flashvars"), {wmode:$JSCompiler_StaticMethods_getStringOption$$(this, "wmode"), allowfullscreen:$JSCompiler_StaticMethods_getStringOption$$(this, "allow-fullscreen"), allowscriptaccess:$JSCompiler_StaticMethods_getStringOption$$(this, 
  "allow-script-access"), menu:$JSCompiler_StaticMethods_getStringOption$$(this, "menu")})
};
$tuna$ui$flash$SWF$$.prototype.$destroy$ = function $$tuna$ui$flash$SWF$$$$$destroy$$() {
  this.$_target$.innerHTML = "";
  this.$__movieId$ = $JSCompiler_alias_NULL$$
};
$tuna$ui$flash$SWF$$.prototype.reset = function $$tuna$ui$flash$SWF$$$$reset$() {
  this.$destroy$();
  this.$init$()
};
var $tuna$ui$flash$__lastId$$ = 0;
function $tuna$ui$forms$Form$$($target$$53$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$53$$);
  this.$__formMessage$ = $JSCompiler_alias_NULL$$;
  this.$__inputTable$ = {};
  this.$__recordName$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$forms$Form$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$forms$Form$$.prototype.$init$ = function $$tuna$ui$forms$Form$$$$$init$$() {
  this.$__recordName$ = $JSCompiler_StaticMethods_getStringOption$$(this, "record-type");
  this.$__formMessage$ = $tuna$dom$selectOne$$(".j-form-message", this.$_target$);
  var $callbackInput$$ = document.createElement("input");
  $callbackInput$$.type = "hidden";
  $callbackInput$$.name = "__callback";
  this.$_target$.appendChild($callbackInput$$);
  var $self$$7$$ = this;
  $tuna$dom$addEventListener$$(this.$_target$, "submit", function($event$$21$$) {
    $self$$7$$.isEnabled() ? ($callbackInput$$.value = "form_callback" + (Math.random() + "").substr(2), window[$callbackInput$$.value] = function $window$$callbackInput$$$value$($data$$inline_196_errors$$inline_198_response$$) {
      var $data$$inline_196_errors$$inline_198_response$$ = JSON.parse(JSON.stringify($data$$inline_196_errors$$inline_198_response$$)), $i$$inline_460_response$$inline_197$$ = $data$$inline_196_errors$$inline_198_response$$.response, $data$$inline_196_errors$$inline_198_response$$ = $data$$inline_196_errors$$inline_198_response$$.errors;
      if($i$$inline_460_response$$inline_197$$ !== $JSCompiler_alias_VOID$$) {
        $self$$7$$.$__recordName$ !== $JSCompiler_alias_NULL$$ && ($i$$inline_460_response$$inline_197$$ = $tuna$rest$populateRecords$$($i$$inline_460_response$$inline_197$$, $self$$7$$.$__recordName$)), $self$$7$$.$dispatch$("result", $i$$inline_460_response$$inline_197$$)
      }else {
        if($data$$inline_196_errors$$inline_198_response$$ !== $JSCompiler_alias_VOID$$) {
          for(var $i$$inline_460_response$$inline_197$$ = 0, $l$$inline_461$$ = $data$$inline_196_errors$$inline_198_response$$.length, $error$$inline_462_name$$inline_498$$ = $JSCompiler_alias_NULL$$;$i$$inline_460_response$$inline_197$$ < $l$$inline_461$$;) {
            $error$$inline_462_name$$inline_498$$ = $data$$inline_196_errors$$inline_198_response$$[$i$$inline_460_response$$inline_197$$];
            if($error$$inline_462_name$$inline_498$$.param !== $JSCompiler_alias_VOID$$) {
              var $JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$ = $self$$7$$, $message$$inline_464_message$$inline_504$$ = $error$$inline_462_name$$inline_498$$.message, $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$;
              $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$ = $JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$;
              var $error$$inline_462_name$$inline_498$$ = $error$$inline_462_name$$inline_498$$.param, $result$$inline_499$$ = $JSCompiler_alias_NULL$$;
              if($JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$.$__inputTable$[$error$$inline_462_name$$inline_498$$] === $JSCompiler_alias_VOID$$) {
                var $input$$inline_501_inputWrapper$$inline_500$$ = $tuna$dom$selectOne$$(".j-" + $error$$inline_462_name$$inline_498$$ + "-input", $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$.$_target$);
                $input$$inline_501_inputWrapper$$inline_500$$ !== $JSCompiler_alias_NULL$$ && ($input$$inline_501_inputWrapper$$inline_500$$ = new $tuna$ui$forms$FormInput$$($input$$inline_501_inputWrapper$$inline_500$$), $input$$inline_501_inputWrapper$$inline_500$$.$init$(), $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$.$__inputTable$[$error$$inline_462_name$$inline_498$$] = $input$$inline_501_inputWrapper$$inline_500$$)
              }
              $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$.$__inputTable$[$error$$inline_462_name$$inline_498$$] !== $JSCompiler_alias_VOID$$ && ($result$$inline_499$$ = $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$.$__inputTable$[$error$$inline_462_name$$inline_498$$]);
              $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$ = $result$$inline_499$$;
              $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$ !== $JSCompiler_alias_NULL$$ ? ($JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$ = $JSCompiler_StaticMethods___getFormInput$self$$inline_497_formInput$$inline_465$$, $tuna$dom$addClass$$($JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$.$_target$, "error"), $JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$.$__message$ !== 
              $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$.$__message$.innerHTML = $message$$inline_464_message$$inline_504$$)) : $JSCompiler_StaticMethods___showErrorMessage$$($JSCompiler_StaticMethods___showInputError$self$$inline_463_JSCompiler_StaticMethods_showErrorMessage$self$$inline_503$$, $message$$inline_464_message$$inline_504$$)
            }else {
              $JSCompiler_StaticMethods___showErrorMessage$$($self$$7$$, $error$$inline_462_name$$inline_498$$.message)
            }
            $i$$inline_460_response$$inline_197$$++
          }
          $self$$7$$.$dispatch$("error", $data$$inline_196_errors$$inline_198_response$$)
        }
      }
      window[$callbackInput$$.value] = $JSCompiler_alias_VOID$$
    }, $JSCompiler_StaticMethods___prepareTo$$($self$$7$$, $event$$21$$.type, $event$$21$$)) : $tuna$dom$preventDefault$$($event$$21$$)
  });
  $tuna$dom$addEventListener$$(this.$_target$, "reset", function($event$$22$$) {
    $self$$7$$.isEnabled() ? $JSCompiler_StaticMethods___prepareTo$$($self$$7$$, $event$$22$$.type, $event$$22$$) : $tuna$dom$preventDefault$$($event$$22$$)
  })
};
$tuna$ui$forms$Form$$.prototype.$getValue$ = function $$tuna$ui$forms$Form$$$$$getValue$$($element$$53_name$$75$$) {
  var $result$$13$$ = $JSCompiler_alias_NULL$$, $element$$53_name$$75$$ = this.$_target$.elements[$element$$53_name$$75$$];
  if($element$$53_name$$75$$ !== $JSCompiler_alias_VOID$$) {
    var $isCheck$$ = $JSCompiler_alias_FALSE$$;
    if($element$$53_name$$75$$.value === $JSCompiler_alias_VOID$$) {
      for(var $i$$34$$ = 0, $l$$23$$ = $element$$53_name$$75$$.length, $result$$13$$ = [];$i$$34$$ < $l$$23$$;) {
        $isCheck$$ = "checkbox" === $element$$53_name$$75$$[$i$$34$$].type || "radio" === $element$$53_name$$75$$[$i$$34$$].type, (!$isCheck$$ || $isCheck$$ && $element$$53_name$$75$$[$i$$34$$].checked) && $result$$13$$.push($element$$53_name$$75$$[$i$$34$$].value), $i$$34$$++
      }
    }else {
      if($isCheck$$ = "checkbox" === $element$$53_name$$75$$.type || "radio" === $element$$53_name$$75$$.type, !$isCheck$$ || $isCheck$$ && $element$$53_name$$75$$.checked) {
        $result$$13$$ = $element$$53_name$$75$$.value
      }
    }
  }
  return $result$$13$$
};
function $JSCompiler_StaticMethods_setValue$$($JSCompiler_StaticMethods_setValue$self_element$$54$$, $i$$35_name$$76$$, $index$$54_value$$56$$) {
  $JSCompiler_StaticMethods_setValue$self_element$$54$$ = $JSCompiler_StaticMethods_setValue$self_element$$54$$.$_target$.elements[$i$$35_name$$76$$];
  if($JSCompiler_StaticMethods_setValue$self_element$$54$$ !== $JSCompiler_alias_VOID$$) {
    if($JSCompiler_StaticMethods_setValue$self_element$$54$$.value === $JSCompiler_alias_VOID$$) {
      var $i$$35_name$$76$$ = 0, $l$$24$$ = $JSCompiler_StaticMethods_setValue$self_element$$54$$.length, $stringValue$$1$$ = "", $arrayValue$$ = [];
      $index$$54_value$$56$$ instanceof Array ? ($arrayValue$$ = $index$$54_value$$56$$.slice(0), $stringValue$$1$$ = $index$$54_value$$56$$.join(",")) : ($stringValue$$1$$ = $index$$54_value$$56$$ + "", $arrayValue$$ = [$stringValue$$1$$]);
      for($index$$54_value$$56$$ = -1;$i$$35_name$$76$$ < $l$$24$$;) {
        "radio" === $JSCompiler_StaticMethods_setValue$self_element$$54$$[$i$$35_name$$76$$].type ? $JSCompiler_StaticMethods_setValue$self_element$$54$$[$i$$35_name$$76$$].checked = $JSCompiler_StaticMethods_setValue$self_element$$54$$[$i$$35_name$$76$$].value === $stringValue$$1$$ : "checkbox" === $JSCompiler_StaticMethods_setValue$self_element$$54$$[$i$$35_name$$76$$].type ? ($index$$54_value$$56$$ = $tuna$utils$indexOf$$($JSCompiler_StaticMethods_setValue$self_element$$54$$[$i$$35_name$$76$$].value, 
        $arrayValue$$), $JSCompiler_StaticMethods_setValue$self_element$$54$$[$i$$35_name$$76$$].checked = -1 !== $index$$54_value$$56$$, -1 !== $index$$54_value$$56$$ && $arrayValue$$.splice($index$$54_value$$56$$, 1)) : $JSCompiler_StaticMethods_setValue$self_element$$54$$.value = $stringValue$$1$$, $i$$35_name$$76$$++
      }
    }else {
      "checkbox" === $JSCompiler_StaticMethods_setValue$self_element$$54$$.type || "radio" === $JSCompiler_StaticMethods_setValue$self_element$$54$$.type ? $JSCompiler_StaticMethods_setValue$self_element$$54$$.checked = $JSCompiler_StaticMethods_setValue$self_element$$54$$.value === $index$$54_value$$56$$ : $JSCompiler_StaticMethods_setValue$self_element$$54$$.value = $index$$54_value$$56$$
    }
  }
}
$tuna$ui$forms$Form$$.prototype.reset = function $$tuna$ui$forms$Form$$$$reset$() {
  $JSCompiler_StaticMethods___prepareTo$$(this, "reset");
  this.$_target$.reset()
};
$tuna$ui$forms$Form$$.prototype.$serialize$ = function $$tuna$ui$forms$Form$$$$$serialize$$() {
  return $tuna$ui$forms$serialize$$(this.$_target$)
};
function $JSCompiler_StaticMethods___prepareTo$$($JSCompiler_StaticMethods___prepareTo$self$$, $JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$, $event$$23$$) {
  if($JSCompiler_StaticMethods___prepareTo$self$$.$dispatch$($JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$)) {
    $JSCompiler_StaticMethods___prepareTo$self$$.$__formMessage$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___prepareTo$self$$.$__formMessage$.innerHTML = "", $tuna$dom$addClass$$($JSCompiler_StaticMethods___prepareTo$self$$.$__formMessage$, "hide"));
    for(var $name$$inline_203$$ in $JSCompiler_StaticMethods___prepareTo$self$$.$__inputTable$) {
      $JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$ = $JSCompiler_StaticMethods___prepareTo$self$$.$__inputTable$[$name$$inline_203$$], $tuna$dom$removeClass$$($JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$.$_target$, "error"), $JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$.$__message$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$.$__message$.innerHTML = $JSCompiler_StaticMethods_cleanup$self$$inline_467_type$$77$$.$__defaultMessage$)
    }
  }else {
    $event$$23$$ !== $JSCompiler_alias_VOID$$ && $tuna$dom$preventDefault$$($event$$23$$)
  }
}
function $JSCompiler_StaticMethods___showErrorMessage$$($JSCompiler_StaticMethods___showErrorMessage$self$$, $message$$12$$) {
  $JSCompiler_StaticMethods___showErrorMessage$self$$.$__formMessage$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___showErrorMessage$self$$.$__formMessage$.innerHTML += $message$$12$$ + "<br />", $tuna$dom$removeClass$$($JSCompiler_StaticMethods___showErrorMessage$self$$.$__formMessage$, "hide"))
}
;function $tuna$ui$forms$FormInput$$($target$$54$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$54$$);
  this.$__message$ = $JSCompiler_alias_NULL$$;
  this.$__defaultMessage$ = ""
}
$tuna$utils$extend$$($tuna$ui$forms$FormInput$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$forms$FormInput$$.prototype.$init$ = function $$tuna$ui$forms$FormInput$$$$$init$$() {
  this.$__message$ = $tuna$dom$selectOne$$(".j-message", this.$_target$);
  this.$__message$ !== $JSCompiler_alias_NULL$$ && (this.$__defaultMessage$ = this.$__message$.innerHTML)
};
function $tuna$ui$forms$InputFilter$$($target$$55$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$55$$);
  this.$_input$ = this.$_currentData$ = this.$_data$ = $JSCompiler_alias_NULL$$;
  this.$_itemSerializeCallback$ = function $this$$_itemSerializeCallback$$($item$$3$$) {
    return $item$$3$$.name !== $JSCompiler_alias_VOID$$ ? "" + $item$$3$$.name : ""
  };
  this.$_transformer$ = new $tuna$ui$transformers$TemplateTransformer$$($target$$55$$)
}
$tuna$utils$extend$$($tuna$ui$forms$InputFilter$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$forms$InputFilter$$.prototype.$init$ = function $$tuna$ui$forms$InputFilter$$$$$init$$() {
  this.$_input$ = $tuna$dom$selectOne$$("input.j-filtration", this.$_target$);
  if(this.$_input$ !== $JSCompiler_alias_NULL$$) {
    var $self$$8$$ = this, $lastValue$$ = $JSCompiler_alias_NULL$$;
    $tuna$dom$addEventListener$$(this.$_input$, "keyup", function() {
      this.value !== $lastValue$$ && ($self$$8$$.filter(this.value), $lastValue$$ = this.value)
    })
  }
  this.$_transformer$.$init$()
};
$tuna$ui$forms$InputFilter$$.prototype.filter = function $$tuna$ui$forms$InputFilter$$$$filter$($term$$) {
  this.$_currentData$ = $JSCompiler_StaticMethods__filterData$$(this, $term$$);
  this.update()
};
$tuna$ui$forms$InputFilter$$.prototype.update = function $$tuna$ui$forms$InputFilter$$$$update$() {
  $JSCompiler_StaticMethods_applyTransform$$(this.$_transformer$, this.$_currentData$)
};
$tuna$ui$forms$InputFilter$$.prototype.clear = function $$tuna$ui$forms$InputFilter$$$$clear$() {
  this.$_input$.value = "";
  this.filter("")
};
function $JSCompiler_StaticMethods__filterData$$($JSCompiler_StaticMethods__filterData$self$$, $term$$1$$) {
  var $result$$15$$ = [];
  if(!$term$$1$$ || 0 === $term$$1$$.length) {
    $result$$15$$ = $JSCompiler_StaticMethods__filterData$self$$.$_data$.slice(0)
  }else {
    for(var $needle$$ = $term$$1$$.toUpperCase(), $i$$38$$ = 0, $l$$27$$ = $JSCompiler_StaticMethods__filterData$self$$.$_data$.length, $core$$ = $JSCompiler_alias_NULL$$;$i$$38$$ < $l$$27$$;) {
      $core$$ = $JSCompiler_StaticMethods__filterData$self$$.$_itemSerializeCallback$($JSCompiler_StaticMethods__filterData$self$$.$_data$[$i$$38$$]), -1 !== $core$$.toUpperCase().indexOf($needle$$) && $result$$15$$.push($JSCompiler_StaticMethods__filterData$self$$.$_data$[$i$$38$$]), $i$$38$$++
    }
  }
  return $result$$15$$
}
;function $tuna$ui$forms$Autocomplete$$($target$$56$$) {
  $tuna$ui$forms$InputFilter$$.call(this, $target$$56$$);
  this.$__selectedData$ = this.$__listBody$ = $JSCompiler_alias_NULL$$;
  this.$__selectionGroup$ = new $tuna$ui$selection$SelectionGroup$$($target$$56$$, $JSCompiler_alias_NULL$$)
}
$tuna$utils$extend$$($tuna$ui$forms$Autocomplete$$, $tuna$ui$forms$InputFilter$$);
$tuna$ui$forms$Autocomplete$$.prototype.$init$ = function $$tuna$ui$forms$Autocomplete$$$$$init$$() {
  $tuna$ui$forms$InputFilter$$.prototype.$init$.call(this);
  var $self$$9$$ = this;
  this.$__listBody$ = $tuna$dom$selectOne$$(".j-autocomplete-body", this.$_target$);
  if(this.$__listBody$ !== $JSCompiler_alias_NULL$$ && this.$_input$ !== $JSCompiler_alias_NULL$$) {
    var $isOpen$$ = $JSCompiler_alias_FALSE$$;
    $tuna$dom$addEventListener$$(this.$_input$, "focus", function() {
      $isOpen$$ || (document.body !== $JSCompiler_alias_NULL$$ && $tuna$dom$addOneEventListener$$(function() {
        var $value$$inline_211$$ = $self$$9$$.$_input$.value;
        $self$$9$$.$__selectedData$ = $JSCompiler_alias_NULL$$;
        var $dataItem$$inline_212$$ = $JSCompiler_StaticMethods__filterData$$($self$$9$$, $value$$inline_211$$).shift();
        $dataItem$$inline_212$$ !== $JSCompiler_alias_VOID$$ && $self$$9$$.$_itemSerializeCallback$($dataItem$$inline_212$$) === $value$$inline_211$$ && $JSCompiler_StaticMethods___selectData$$($self$$9$$, $dataItem$$inline_212$$);
        $self$$9$$.$__selectedData$ === $JSCompiler_alias_NULL$$ && $self$$9$$.clear();
        $tuna$dom$addClass$$($self$$9$$.$__listBody$, "hide");
        $isOpen$$ = $JSCompiler_alias_FALSE$$
      }), $self$$9$$.filter(""), $tuna$dom$removeClass$$($self$$9$$.$__listBody$, "hide"), $isOpen$$ = $JSCompiler_alias_TRUE$$)
    });
    $tuna$dom$addChildEventListener$$(this.$_target$, ".j-autocomplete-item", "click", function($event$$24$$) {
      var $index$$55$$ = $self$$9$$.$__selectionGroup$.$getItemIndex$(this);
      $index$$55$$ !== $JSCompiler_alias_NULL$$ ? $self$$9$$.$selectIndex$($index$$55$$) : $tuna$dom$stopPropagation$$($event$$24$$)
    });
    $tuna$dom$addEventListener$$(this.$_input$, "click", function($event$$25$$) {
      $tuna$dom$stopPropagation$$($event$$25$$)
    });
    $JSCompiler_StaticMethods_setOption$$(this.$__selectionGroup$, "item-selector", ".j-autocomplete-item");
    this.$__selectionGroup$.$init$()
  }
};
$tuna$ui$forms$Autocomplete$$.prototype.$selectIndex$ = function $$tuna$ui$forms$Autocomplete$$$$$selectIndex$$($index$$56$$) {
  0 < this.$_currentData$.length && $JSCompiler_StaticMethods___selectData$$(this, this.$_currentData$[$index$$56$$])
};
function $JSCompiler_StaticMethods___selectData$$($JSCompiler_StaticMethods___selectData$self$$, $dataItem$$1$$) {
  $JSCompiler_StaticMethods___selectData$self$$.$__selectedData$ !== $dataItem$$1$$ && ($JSCompiler_StaticMethods___selectData$self$$.$__selectedData$ = $dataItem$$1$$, $JSCompiler_StaticMethods___selectData$self$$.$_input$.value = $JSCompiler_StaticMethods___selectData$self$$.$_itemSerializeCallback$($dataItem$$1$$), $JSCompiler_StaticMethods___selectData$self$$.$dispatch$("change"))
}
$tuna$ui$forms$Autocomplete$$.prototype.$clearSelection$ = function $$tuna$ui$forms$Autocomplete$$$$$clearSelection$$() {
  this.$__selectedData$ !== $JSCompiler_alias_NULL$$ && (this.$__selectedData$ = $JSCompiler_alias_NULL$$, this.$dispatch$("change"))
};
$tuna$ui$forms$Autocomplete$$.prototype.update = function $$tuna$ui$forms$Autocomplete$$$$update$() {
  $tuna$ui$forms$InputFilter$$.prototype.update.call(this);
  this.$__selectionGroup$.$_selectionView$.update();
  this.$clearSelection$()
};
function $tuna$ui$forms$serialize$$($elements$$4_formElement$$) {
  for(var $result$$16$$ = {}, $elements$$4_formElement$$ = $elements$$4_formElement$$.elements, $i$$39$$ = 0, $l$$28$$ = $elements$$4_formElement$$.length, $name$$81$$ = $JSCompiler_alias_NULL$$;$i$$39$$ < $l$$28$$;) {
    $name$$81$$ = $elements$$4_formElement$$[$i$$39$$].name, $result$$16$$[$name$$81$$] !== $JSCompiler_alias_VOID$$ ? ($result$$16$$[$name$$81$$] instanceof Array || ($result$$16$$[$name$$81$$] = [$result$$16$$[$name$$81$$]]), $result$$16$$[$name$$81$$].push($elements$$4_formElement$$[$i$$39$$].value)) : $result$$16$$[$name$$81$$] = $elements$$4_formElement$$[$i$$39$$].value, $i$$39$$++
  }
  return $result$$16$$
}
;function $tuna$ui$transformers$TemplateTransformer$$($target$$57$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$57$$);
  this.$__transformHandler$ = this.$__template$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$transformers$TemplateTransformer$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$transformers$TemplateTransformer$$.prototype.$init$ = function $$tuna$ui$transformers$TemplateTransformer$$$$$init$$() {
  var $conditionCompiler$$inline_473_templateId$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "template-id");
  if($conditionCompiler$$inline_473_templateId$$ !== $JSCompiler_alias_NULL$$) {
    var $conditionExtractor$$inline_470_settings$$11$$;
    $tuna$tmpl$__settingsTable$$[$conditionCompiler$$inline_473_templateId$$] === $JSCompiler_alias_VOID$$ && ($tuna$tmpl$__markupBuilder$$ === $JSCompiler_alias_NULL$$ && ($tuna$tmpl$__markupBuilder$$ = new $tuna$tmpl$markup$MarkupTemplateBuilder$$, $JSCompiler_StaticMethods_addExtractor$$(new $tuna$tmpl$markup$SpotExtractor$$), $JSCompiler_StaticMethods_addExtractor$$(new $tuna$tmpl$markup$ListExtractor$$($tuna$tmpl$__markupBuilder$$)), $JSCompiler_StaticMethods_addExtractor$$(new $tuna$tmpl$markup$AttributeExtractor$$), 
    $JSCompiler_StaticMethods_addExtractor$$(new $tuna$tmpl$markup$CheckboxExtractor$$), $conditionExtractor$$inline_470_settings$$11$$ = new $tuna$tmpl$markup$ConditionExtractor$$, $conditionExtractor$$inline_470_settings$$11$$.$__actions$.push("class"), $conditionExtractor$$inline_470_settings$$11$$.$__operators$.push("isset"), $conditionExtractor$$inline_470_settings$$11$$.$__operators$.push("notset"), $conditionExtractor$$inline_470_settings$$11$$.$__operators$.push("eq"), $conditionExtractor$$inline_470_settings$$11$$.$__operators$.push("ne"), 
    $JSCompiler_StaticMethods_addExtractor$$($conditionExtractor$$inline_470_settings$$11$$)), $tuna$tmpl$__settingsTable$$[$conditionCompiler$$inline_473_templateId$$] = $JSCompiler_StaticMethods_buildSettings$$($tuna$tmpl$__markupBuilder$$, $conditionCompiler$$inline_473_templateId$$));
    $conditionExtractor$$inline_470_settings$$11$$ = $tuna$tmpl$__settingsTable$$[$conditionCompiler$$inline_473_templateId$$];
    if($conditionExtractor$$inline_470_settings$$11$$ !== $JSCompiler_alias_NULL$$) {
      $tuna$tmpl$__compiler$$ === $JSCompiler_alias_NULL$$ && ($tuna$tmpl$__compiler$$ = new $tuna$tmpl$compilers$TemplateCompiler$$, $tuna$tmpl$__compiler$$.$__itemCompilers$.spot = new $tuna$tmpl$compilers$SpotCompiler$$, $tuna$tmpl$__compiler$$.$__itemCompilers$.attribute = new $tuna$tmpl$compilers$AttributeCompiler$$, $tuna$tmpl$__compiler$$.$__itemCompilers$.checkbox = new $tuna$tmpl$compilers$CheckboxCompiler$$, $tuna$tmpl$__compiler$$.$__itemCompilers$.list = new $tuna$tmpl$compilers$ListCompiler$$($tuna$tmpl$__compiler$$), 
      $conditionCompiler$$inline_473_templateId$$ = new $tuna$tmpl$compilers$ConditionCompiler$$, $conditionCompiler$$inline_473_templateId$$.$__actions$["class"] = new $tuna$tmpl$units$condition$ClassAction$$, $conditionCompiler$$inline_473_templateId$$.$__operators$.isset = new $tuna$tmpl$units$condition$IsSetOperator$$, $conditionCompiler$$inline_473_templateId$$.$__operators$.notset = new $tuna$tmpl$units$condition$NotSetOperator$$, $conditionCompiler$$inline_473_templateId$$.$__operators$.eq = 
      new $tuna$tmpl$units$condition$EqualsOperator$$, $conditionCompiler$$inline_473_templateId$$.$__operators$.ne = new $tuna$tmpl$units$condition$NotEqualsOperator$$, $tuna$tmpl$__compiler$$.$__itemCompilers$.condition = $conditionCompiler$$inline_473_templateId$$), this.$__template$ = $tuna$tmpl$__compiler$$.compile($conditionExtractor$$inline_470_settings$$11$$, this.$_target$)
    }else {
      throw'Unknown template with id "' + $conditionCompiler$$inline_473_templateId$$ + '"';
    }
  }
};
function $JSCompiler_StaticMethods_applyTransform$$($JSCompiler_StaticMethods_applyTransform$self$$, $data$$31$$) {
  $JSCompiler_StaticMethods_applyTransform$self$$.$__template$.$applyData$(new $tuna$tmpl$data$DataNode$$($data$$31$$));
  if($JSCompiler_StaticMethods_applyTransform$self$$.$__transformHandler$ !== $JSCompiler_alias_NULL$$) {
    for(var $JSCompiler_StaticMethods_handleTransformComplete$self$$inline_218$$ = $JSCompiler_StaticMethods_applyTransform$self$$.$__transformHandler$, $createdElements$$inline_219$$ = $JSCompiler_StaticMethods_applyTransform$self$$.$__template$.$__createdChildren$.splice(0, $JSCompiler_StaticMethods_applyTransform$self$$.$__template$.$__createdChildren$.length), $removedElements$$inline_220$$ = $JSCompiler_StaticMethods_applyTransform$self$$.$__template$.$__removedChildren$.splice(0, $JSCompiler_StaticMethods_applyTransform$self$$.$__template$.$__removedChildren$.length), 
    $i$$inline_221$$ = 0, $l$$inline_222$$ = $createdElements$$inline_219$$.length;$i$$inline_221$$ < $l$$inline_222$$;) {
      $JSCompiler_StaticMethods_initModules$$($JSCompiler_StaticMethods_handleTransformComplete$self$$inline_218$$.$_container$, $createdElements$$inline_219$$[$i$$inline_221$$]), $i$$inline_221$$++
    }
    $i$$inline_221$$ = 0;
    for($l$$inline_222$$ = $removedElements$$inline_220$$.length;$i$$inline_221$$ < $l$$inline_222$$;) {
      $JSCompiler_StaticMethods_destroyModules$$($JSCompiler_StaticMethods_handleTransformComplete$self$$inline_218$$.$_container$, $removedElements$$inline_220$$[$i$$inline_221$$]), $i$$inline_221$$++
    }
  }
}
$tuna$ui$transformers$TemplateTransformer$$.prototype.$destroy$ = function $$tuna$ui$transformers$TemplateTransformer$$$$$destroy$$() {
  this.$__template$.$destroy$();
  this.$__transformHandler$ = this.$__template$ = $JSCompiler_alias_NULL$$
};
$tuna$ui$transformers$TemplateTransformer$$.prototype.reset = function $$tuna$ui$transformers$TemplateTransformer$$$$reset$() {
  var $transformHandler$$ = this.$__transformHandler$;
  this.$destroy$();
  this.$init$();
  this.$__transformHandler$ = $transformHandler$$
};
function $tuna$ui$selection$AbstractSelectionGroup$$($target$$58$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$58$$);
  this.$_selectionRule$ = this.$_selectionView$ = this.$_itemsCollection$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$selection$AbstractSelectionGroup$$, $tuna$ui$ModuleInstance$$);
$JSCompiler_prototypeAlias$$ = $tuna$ui$selection$AbstractSelectionGroup$$.prototype;
$JSCompiler_prototypeAlias$$.$isIndexEnabled$ = function $$JSCompiler_prototypeAlias$$$$isIndexEnabled$$($index$$63$$) {
  return this.$_selectionRule$.$isIndexEnabled$($index$$63$$)
};
$JSCompiler_prototypeAlias$$.$getItemIndex$ = function $$JSCompiler_prototypeAlias$$$$getItemIndex$$($item$$5$$) {
  return this.$_itemsCollection$.$getItemIndex$($item$$5$$)
};
$JSCompiler_prototypeAlias$$.$getItemAt$ = function $$JSCompiler_prototypeAlias$$$$getItemAt$$($index$$64$$) {
  return this.$_itemsCollection$.$getItemAt$($index$$64$$)
};
$JSCompiler_prototypeAlias$$.$getSelectedIndexes$ = function $$JSCompiler_prototypeAlias$$$$getSelectedIndexes$$() {
  return this.$_selectionRule$.$getSelectedIndexes$()
};
function $JSCompiler_StaticMethods_getLastSelectedIndex$$($JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$) {
  $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$ = $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$.$_selectionRule$.$getSelectedIndexes$();
  return 0 < $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$.length ? $JSCompiler_StaticMethods_getLastSelectedIndex$self_indexes$$.pop() : $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$.$selectIndex$ = function $$JSCompiler_prototypeAlias$$$$selectIndex$$($index$$65$$) {
  return this.$_selectionRule$.$selectIndex$($index$$65$$)
};
$JSCompiler_prototypeAlias$$.$clearSelection$ = function $$JSCompiler_prototypeAlias$$$$clearSelection$$() {
  this.$_selectionRule$.$clearSelection$()
};
function $tuna$ui$selection$SelectionGroup$$($target$$59$$, $indexAttribute$$) {
  $tuna$ui$selection$AbstractSelectionGroup$$.call(this, $target$$59$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "item-selector", ".j-selection-item");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "index-attribute", $indexAttribute$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "is-multiple", $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "selection-class", "active");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "selection-event", "click")
}
$tuna$utils$extend$$($tuna$ui$selection$SelectionGroup$$, $tuna$ui$selection$AbstractSelectionGroup$$);
$tuna$ui$selection$SelectionGroup$$.prototype.$init$ = function $$tuna$ui$selection$SelectionGroup$$$$$init$$() {
  var $indexAttribute$$1$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "index-attribute");
  this.$_itemsCollection$ = $indexAttribute$$1$$ === $JSCompiler_alias_NULL$$ ? new $tuna$ui$selection$items$ElementsCollection$$ : new $tuna$ui$selection$items$NamedElementsCollection$$($indexAttribute$$1$$);
  this.$_selectionView$ = new $tuna$ui$selection$view$ClassSelectionView$$(this.$_target$);
  this.$_selectionRule$ = $JSCompiler_StaticMethods_getBooleanOption$$(this, "is-multiple") ? new $tuna$ui$selection$rule$MultipleSelectionRule$$ : new $tuna$ui$selection$rule$SingleSelectionRule$$;
  this.$_selectionView$.$_selectionClass$ = $JSCompiler_StaticMethods_getStringOption$$(this, "selection-class");
  this.$_selectionView$.$_itemSelector$ = $JSCompiler_StaticMethods_getStringOption$$(this, "item-selector");
  this.$_selectionView$.$_selectionRule$ = this.$_selectionRule$;
  this.$_selectionView$.$setItemsCollection$(this.$_itemsCollection$);
  this.$_selectionRule$.$_eventDispatcher$ = this;
  this.$_selectionRule$.$setItemsCollection$(this.$_itemsCollection$);
  this.$_selectionRule$.$_selectionView$ = this.$_selectionView$;
  this.$_selectionView$.update()
};
function $tuna$ui$selection$Navigation$$($target$$60$$) {
  $tuna$ui$ModuleInstance$$.call(this, $target$$60$$);
  this.$__navigationRule$ = $JSCompiler_alias_NULL$$;
  this.$__menuLinks$ = {};
  this.$__parent$ = $JSCompiler_alias_NULL$$;
  this.$__children$ = {};
  this.$__history$ = [];
  this.$__currentState$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "selection-class", "active");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "item-selector", ".j-navigation-page");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "menu-selector", ".j-navigation-menu")
}
$tuna$utils$extend$$($tuna$ui$selection$Navigation$$, $tuna$ui$ModuleInstance$$);
$tuna$ui$selection$Navigation$$.prototype.$init$ = function $$tuna$ui$selection$Navigation$$$$$init$$() {
  this.$__navigationRule$ = new $tuna$ui$selection$rule$NavigationSelectionRule$$;
  var $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$ = new $tuna$ui$selection$items$NamedElementsCollection$$("data-name"), $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ = new $tuna$ui$selection$view$ClassSelectionView$$(this.$_target$), $className$$inline_476_l$$inline_249_selector$$inline_479$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "selection-class");
  $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$.$_selectionClass$ = $className$$inline_476_l$$inline_249_selector$$inline_479$$;
  $className$$inline_476_l$$inline_249_selector$$inline_479$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "item-selector");
  $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$.$_itemSelector$ = $className$$inline_476_l$$inline_249_selector$$inline_479$$;
  $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$.$_selectionRule$ = this.$__navigationRule$;
  $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$.$setItemsCollection$($buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$);
  this.$__navigationRule$.$_eventDispatcher$ = this;
  this.$__navigationRule$.$_selectionView$ = $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$;
  this.$__navigationRule$.$setItemsCollection$($buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$);
  this.$__navigationRule$.$setNavigation$(this);
  $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$.update();
  $JSCompiler_StaticMethods___initControls$$(this);
  $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "menu-selector");
  $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "button-selector");
  if($i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ !== $JSCompiler_alias_NULL$$ && $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$ !== $JSCompiler_alias_NULL$$ && ($i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ = $tuna$dom$selectOne$$($i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$, this.$_target$), $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ !== 
  $JSCompiler_alias_NULL$$)) {
    for(var $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$ = $tuna$dom$select$$($buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$, $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$), $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ = 0, $className$$inline_476_l$$inline_249_selector$$inline_479$$ = $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$.length, 
    $href$$inline_250_index$$inline_251$$ = $JSCompiler_alias_NULL$$, $button$$inline_252$$ = $href$$inline_250_index$$inline_251$$ = $JSCompiler_alias_NULL$$;$i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$ < $className$$inline_476_l$$inline_249_selector$$inline_479$$;) {
      $button$$inline_252$$ = $tuna$ui$buttons$create$$($buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$[$i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$]), $href$$inline_250_index$$inline_251$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$inline_252$$, "href"), $href$$inline_250_index$$inline_251$$ !== $JSCompiler_alias_NULL$$ && ($href$$inline_250_index$$inline_251$$ = $href$$inline_250_index$$inline_251$$.split("/").shift(), 
      this.$__menuLinks$[$href$$inline_250_index$$inline_251$$] === $JSCompiler_alias_VOID$$ && (this.$__menuLinks$[$href$$inline_250_index$$inline_251$$] = []), this.$__menuLinks$[$href$$inline_250_index$$inline_251$$].push($button$$inline_252$$)), $i$$inline_248_menu$$inline_246_menuSelector$$inline_244_selectionView$$inline_241$$++
    }
  }
  $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$ = this.$__navigationRule$.$__currentIndex$;
  $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$ !== $JSCompiler_alias_NULL$$ && $JSCompiler_StaticMethods___updateMenu$$(this, $buttonSelector$$inline_245_buttons$$inline_247_currentIndex$$inline_253_itemsCollection$$inline_240$$, $JSCompiler_alias_TRUE$$)
};
function $JSCompiler_StaticMethods___initControls$$($JSCompiler_StaticMethods___initControls$self$$) {
  var $controls$$ = new $tuna$ui$buttons$ButtonGroup$$($JSCompiler_StaticMethods___initControls$self$$.$_target$);
  $JSCompiler_StaticMethods_setOption$$($controls$$, "button-selector", ".j-navigation-link");
  $controls$$.$__defaultAction$ = "navigate";
  $controls$$.addEventListener("navigate", function($event$$26$$, $button$$2$$) {
    $event$$26$$.preventDefault();
    var $index$$67$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$2$$, "href");
    if($index$$67$$ !== $JSCompiler_alias_NULL$$) {
      for(var $result$$inline_491$$ = {}, $attrs$$inline_492$$ = $button$$2$$.$_target$.attributes, $i$$inline_493$$ = 0, $l$$inline_494$$ = $attrs$$inline_492$$.length;$i$$inline_493$$ < $l$$inline_494$$;) {
        0 === $attrs$$inline_492$$[$i$$inline_493$$].name.indexOf("data-") && ($result$$inline_491$$[$attrs$$inline_492$$[$i$$inline_493$$].name.substr(5)] = $attrs$$inline_492$$[$i$$inline_493$$].value), $i$$inline_493$$++
      }
      delete $result$$inline_491$$.href;
      $JSCompiler_StaticMethods___initControls$self$$.navigate($index$$67$$, $result$$inline_491$$)
    }
  });
  $controls$$.addEventListener("back", function($event$$27$$) {
    $event$$27$$.preventDefault();
    $JSCompiler_StaticMethods___initControls$self$$.back()
  });
  $controls$$.$init$()
}
function $JSCompiler_StaticMethods___updateMenu$$($JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$, $i$$41_path$$9$$, $isSelected$$) {
  if($i$$41_path$$9$$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$ = $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$.$__menuLinks$[$i$$41_path$$9$$], $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$ !== $JSCompiler_alias_VOID$$)) {
    for(var $i$$41_path$$9$$ = 0, $l$$30$$ = $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$.length;$i$$41_path$$9$$ < $l$$30$$;) {
      $JSCompiler_StaticMethods___updateMenu$self_buttons$$1$$[$i$$41_path$$9$$].setActive($isSelected$$), $i$$41_path$$9$$++
    }
  }
}
function $JSCompiler_StaticMethods_getPathDesc$$($JSCompiler_StaticMethods_getPathDesc$self$$) {
  var $result$$17$$ = [], $index$$69$$ = $JSCompiler_StaticMethods_getPathDesc$self$$.$__navigationRule$.$__currentIndex$;
  $index$$69$$ !== $JSCompiler_alias_NULL$$ && ($result$$17$$.push($index$$69$$), $JSCompiler_StaticMethods_getPathDesc$self$$.$__children$[$index$$69$$] !== $JSCompiler_alias_VOID$$ && ($result$$17$$ = $result$$17$$.concat($JSCompiler_StaticMethods_getPathDesc$$($JSCompiler_StaticMethods_getPathDesc$self$$.$__children$[$index$$69$$]))));
  return $result$$17$$
}
function $JSCompiler_StaticMethods_getRelatedPath$$($JSCompiler_StaticMethods_getRelatedPath$self$$) {
  var $result$$18$$ = [];
  $JSCompiler_StaticMethods_getRelatedPath$self$$.$__parent$ !== $JSCompiler_alias_NULL$$ && ($result$$18$$.push($JSCompiler_StaticMethods_getRelatedPath$self$$.getName()), $result$$18$$ = $JSCompiler_StaticMethods_getRelatedPath$$($JSCompiler_StaticMethods_getRelatedPath$self$$.$__parent$).concat($result$$18$$));
  return $result$$18$$
}
$tuna$ui$selection$Navigation$$.prototype.$getRoot$ = function $$tuna$ui$selection$Navigation$$$$$getRoot$$() {
  return this.$__parent$ === $JSCompiler_alias_NULL$$ ? this : this.$__parent$.$getRoot$()
};
$tuna$ui$selection$Navigation$$.prototype.back = function $$tuna$ui$selection$Navigation$$$$back$() {
  this.$__parent$ === $JSCompiler_alias_NULL$$ ? 0 < this.$__history$.length && (this.$__currentState$ = this.$__history$.pop(), $JSCompiler_StaticMethods_navigatePath$$(this, this.$__currentState$.$__path$.slice(0), this.$__currentState$.getData())) : this.$getRoot$().back()
};
$tuna$ui$selection$Navigation$$.prototype.navigate = function $$tuna$ui$selection$Navigation$$$$navigate$($path$$10$$, $data$$33$$) {
  if($path$$10$$ instanceof Array) {
    this.$__parent$ === $JSCompiler_alias_NULL$$ ? (this.$__currentState$ === $JSCompiler_alias_NULL$$ && (this.$__currentState$ = new $NavigationState$$($JSCompiler_StaticMethods_getPathDesc$$(this))), $JSCompiler_StaticMethods_navigatePath$$(this, $path$$10$$, $data$$33$$), this.$__history$.push(this.$__currentState$), this.$__currentState$ = new $NavigationState$$($JSCompiler_StaticMethods_getPathDesc$$(this), $data$$33$$)) : $JSCompiler_StaticMethods_navigatePath$$(this, $path$$10$$, $data$$33$$)
  }else {
    var $parsedPath$$ = $path$$10$$.split("/");
    0 !== $path$$10$$.indexOf("/") && ($parsedPath$$ = $JSCompiler_StaticMethods_getRelatedPath$$(this).concat($parsedPath$$));
    this.$getRoot$().navigate($parsedPath$$, $data$$33$$)
  }
};
function $JSCompiler_StaticMethods_navigatePath$$($JSCompiler_StaticMethods_navigatePath$self$$, $path$$11$$, $data$$34$$) {
  for(var $index$$70$$ = $path$$11$$.shift();"" === $index$$70$$ && 0 < $path$$11$$.length;) {
    $index$$70$$ = $path$$11$$.shift()
  }
  $JSCompiler_StaticMethods___updateMenu$$($JSCompiler_StaticMethods_navigatePath$self$$, $JSCompiler_StaticMethods_navigatePath$self$$.$__navigationRule$.$__currentIndex$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_navigatePath$self$$.$__navigationRule$.navigate($index$$70$$, $data$$34$$ || $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods___updateMenu$$($JSCompiler_StaticMethods_navigatePath$self$$, $JSCompiler_StaticMethods_navigatePath$self$$.$__navigationRule$.$__currentIndex$, $JSCompiler_alias_TRUE$$);
  if($JSCompiler_StaticMethods_navigatePath$self$$.$__children$[$index$$70$$] !== $JSCompiler_alias_VOID$$) {
    return $JSCompiler_StaticMethods_navigatePath$$($JSCompiler_StaticMethods_navigatePath$self$$.$__children$[$index$$70$$], $path$$11$$, $data$$34$$)
  }
}
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self$$, $navigation$$) {
  if($navigation$$ instanceof $tuna$ui$selection$Navigation$$) {
    $navigation$$.$__parent$ = $JSCompiler_StaticMethods_addChild$self$$;
    var $name$$82$$ = $navigation$$.getName();
    $name$$82$$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_addChild$self$$.$__children$[$name$$82$$] = $navigation$$)
  }
}
function $NavigationState$$($path$$12$$, $data$$35$$) {
  this.$__path$ = $path$$12$$;
  this.$__data$ = $data$$35$$ || $JSCompiler_alias_NULL$$
}
$NavigationState$$.prototype.$serialize$ = function $$NavigationState$$$$$serialize$$() {
  var $result$$19$$ = "";
  this.$__data$ !== $JSCompiler_alias_NULL$$ && ($result$$19$$ = $tuna$utils$__splitUrlData$$(this.$__data$).join("&"));
  "" !== $result$$19$$ && ($result$$19$$ = "?" + $result$$19$$);
  return"/" + this.$__path$.join("/") + $result$$19$$
};
$NavigationState$$.prototype.getData = $JSCompiler_get$$("$__data$");
function $tuna$ui$selection$Carousel$$($target$$61$$) {
  $tuna$ui$selection$SelectionGroup$$.call(this, $target$$61$$, $JSCompiler_alias_NULL$$);
  this.$__shiftIndex$ = -1;
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "item-selector", ".j-carousel-item");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "next-button-selector", ".j-carousel-next");
  $JSCompiler_StaticMethods__setDefaultOption$$(this, "back-button-selector", ".j-carousel-back")
}
$tuna$utils$extend$$($tuna$ui$selection$Carousel$$, $tuna$ui$selection$SelectionGroup$$);
$tuna$ui$selection$Carousel$$.prototype.$init$ = function $$tuna$ui$selection$Carousel$$$$$init$$() {
  $tuna$ui$selection$SelectionGroup$$.prototype.$init$.call(this);
  var $self$$11$$ = this;
  this.$__shiftIndex$ = Number($JSCompiler_StaticMethods_getLastSelectedIndex$$(this));
  var $backButtonSelector_nextButtonSelector$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "next-button-selector");
  $backButtonSelector_nextButtonSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$(this.$_target$, $backButtonSelector_nextButtonSelector$$, "click", function($event$$28$$) {
    $tuna$dom$preventDefault$$($event$$28$$);
    $self$$11$$.next()
  });
  $backButtonSelector_nextButtonSelector$$ = $JSCompiler_StaticMethods_getStringOption$$(this, "back-button-selector");
  $backButtonSelector_nextButtonSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$(this.$_target$, $backButtonSelector_nextButtonSelector$$, "click", function($event$$29$$) {
    $tuna$dom$preventDefault$$($event$$29$$);
    $self$$11$$.back()
  })
};
$tuna$ui$selection$Carousel$$.prototype.next = function $$tuna$ui$selection$Carousel$$$$next$() {
  this.$__shiftIndex$++;
  this.$getItemAt$(this.$__shiftIndex$) === $JSCompiler_alias_NULL$$ && (this.$__shiftIndex$ = 0);
  this.$selectIndex$(this.$__shiftIndex$)
};
$tuna$ui$selection$Carousel$$.prototype.back = function $$tuna$ui$selection$Carousel$$$$back$() {
  this.$__shiftIndex$--;
  this.$getItemAt$(this.$__shiftIndex$) === $JSCompiler_alias_NULL$$ && (this.$__shiftIndex$ = this.$_itemsCollection$.$getItemsCount$() - 1);
  this.$selectIndex$(this.$__shiftIndex$)
};
function $tuna$ui$selection$items$ElementsCollection$$() {
  this.$__items$ = []
}
$JSCompiler_prototypeAlias$$ = $tuna$ui$selection$items$ElementsCollection$$.prototype;
$JSCompiler_prototypeAlias$$.$addItem$ = function $$JSCompiler_prototypeAlias$$$$addItem$$($item$$8$$) {
  return this.$__items$.push($item$$8$$) - 1
};
$JSCompiler_prototypeAlias$$.$getItemIndex$ = function $$JSCompiler_prototypeAlias$$$$getItemIndex$$($item$$9$$) {
  return $tuna$utils$indexOf$$($item$$9$$, this.$__items$)
};
$JSCompiler_prototypeAlias$$.$getItemAt$ = function $$JSCompiler_prototypeAlias$$$$getItemAt$$($index$$72$$) {
  return this.$__items$[$index$$72$$] || $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$__items$.length = 0
};
$JSCompiler_prototypeAlias$$.$getItemsCount$ = function $$JSCompiler_prototypeAlias$$$$getItemsCount$$() {
  return this.$__items$.length
};
function $tuna$ui$selection$items$NamedElementsCollection$$($indexAttribute$$2$$) {
  this.$__indexAttribute$ = $indexAttribute$$2$$;
  this.$__items$ = {}
}
$JSCompiler_prototypeAlias$$ = $tuna$ui$selection$items$NamedElementsCollection$$.prototype;
$JSCompiler_prototypeAlias$$.$addItem$ = function $$JSCompiler_prototypeAlias$$$$addItem$$($item$$10$$) {
  var $index$$73$$ = $item$$10$$.getAttribute(this.$__indexAttribute$);
  $index$$73$$ !== $JSCompiler_alias_NULL$$ && (this.$__items$[$index$$73$$] = $item$$10$$);
  return $index$$73$$
};
$JSCompiler_prototypeAlias$$.$getItemIndex$ = function $$JSCompiler_prototypeAlias$$$$getItemIndex$$($index$$74_item$$11$$) {
  $index$$74_item$$11$$ = $index$$74_item$$11$$.getAttribute(this.$__indexAttribute$);
  return $index$$74_item$$11$$ !== $JSCompiler_alias_NULL$$ && this.$__items$[$index$$74_item$$11$$] !== $JSCompiler_alias_VOID$$ ? $index$$74_item$$11$$ : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$getItemAt$ = function $$JSCompiler_prototypeAlias$$$$getItemAt$$($index$$75$$) {
  return this.$__items$[$index$$75$$] || $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$__items$ = {}
};
$JSCompiler_prototypeAlias$$.$getItemsCount$ = function $$JSCompiler_prototypeAlias$$$$getItemsCount$$() {
  var $i$$43$$ = 0, $_$$;
  for($_$$ in this.$__items$) {
    $i$$43$$++
  }
  return $i$$43$$
};
function $tuna$ui$selection$rule$AbstractSelectionRule$$() {
  this.$_eventDispatcher$ = this.$_selectionView$ = this.$_itemsCollection$ = $JSCompiler_alias_NULL$$;
  this.$_disabledIndexes$ = []
}
$JSCompiler_prototypeAlias$$ = $tuna$ui$selection$rule$AbstractSelectionRule$$.prototype;
$JSCompiler_prototypeAlias$$.$setItemsCollection$ = function $$JSCompiler_prototypeAlias$$$$setItemsCollection$$($collection$$) {
  this.$_itemsCollection$ = $collection$$
};
$JSCompiler_prototypeAlias$$.$getSelectedIndexes$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$selectIndex$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$clearSelection$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$isIndexEnabled$ = function $$JSCompiler_prototypeAlias$$$$isIndexEnabled$$($index$$84$$) {
  return this.$_itemsCollection$.$getItemAt$($index$$84$$) !== $JSCompiler_alias_NULL$$ && -1 === $tuna$utils$indexOf$$($index$$84$$, this.$_disabledIndexes$)
};
function $tuna$ui$selection$rule$SingleSelectionRule$$() {
  $tuna$ui$selection$rule$AbstractSelectionRule$$.call(this);
  this.$__currentIndex$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$selection$rule$SingleSelectionRule$$, $tuna$ui$selection$rule$AbstractSelectionRule$$);
$tuna$ui$selection$rule$SingleSelectionRule$$.prototype.$getSelectedIndexes$ = function $$tuna$ui$selection$rule$SingleSelectionRule$$$$$getSelectedIndexes$$() {
  return this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ ? [this.$__currentIndex$] : []
};
$tuna$ui$selection$rule$SingleSelectionRule$$.prototype.$selectIndex$ = function $$tuna$ui$selection$rule$SingleSelectionRule$$$$$selectIndex$$($index$$85$$) {
  var $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$;
  if($JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ = this.$isIndexEnabled$($index$$85$$)) {
    if($JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ = this.$__currentIndex$ !== $index$$85$$) {
      $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ = this.$__currentIndex$, $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ = ($JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ === $JSCompiler_alias_NULL$$ || this.$_eventDispatcher$.$dispatch$("deselect", $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$)) && this.$_eventDispatcher$.$dispatch$("select", $index$$85$$)
    }
  }
  return $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ ? ($JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ = this.$__currentIndex$, this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && this.$_selectionView$.$destroySelectionAt$(this.$__currentIndex$), this.$_selectionView$.$applySelectionAt$($index$$85$$), this.$__currentIndex$ = $index$$85$$, $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$ !== $JSCompiler_alias_NULL$$ && this.$_eventDispatcher$.$dispatch$("deselected", 
  $JSCompiler_temp$$10_JSCompiler_temp$$9_oldIndex_oldIndex$$inline_277$$), this.$_eventDispatcher$.$dispatch$("selected", $index$$85$$), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$tuna$ui$selection$rule$SingleSelectionRule$$.prototype.$clearSelection$ = function $$tuna$ui$selection$rule$SingleSelectionRule$$$$$clearSelection$$() {
  this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && (this.$_selectionView$.$destroySelectionAt$(this.$__currentIndex$), this.$__currentIndex$ = $JSCompiler_alias_NULL$$)
};
function $tuna$ui$selection$rule$MultipleSelectionRule$$() {
  $tuna$ui$selection$rule$AbstractSelectionRule$$.call(this);
  this.$__selectedIndexes$ = []
}
$tuna$utils$extend$$($tuna$ui$selection$rule$MultipleSelectionRule$$, $tuna$ui$selection$rule$AbstractSelectionRule$$);
$tuna$ui$selection$rule$MultipleSelectionRule$$.prototype.$getSelectedIndexes$ = function $$tuna$ui$selection$rule$MultipleSelectionRule$$$$$getSelectedIndexes$$() {
  return this.$__selectedIndexes$.slice(0)
};
$tuna$ui$selection$rule$MultipleSelectionRule$$.prototype.$selectIndex$ = function $$tuna$ui$selection$rule$MultipleSelectionRule$$$$$selectIndex$$($index$$87$$) {
  if(this.$isIndexEnabled$($index$$87$$)) {
    var $indexPosition$$1$$ = $tuna$utils$indexOf$$($index$$87$$, this.$__selectedIndexes$);
    if(-1 === $indexPosition$$1$$) {
      if(this.$_eventDispatcher$.$dispatch$("select", $index$$87$$)) {
        return this.$_selectionView$.$applySelectionAt$($index$$87$$), this.$__selectedIndexes$.push($index$$87$$), $JSCompiler_alias_TRUE$$
      }
    }else {
      if(this.$_eventDispatcher$.$dispatch$("deselect", $index$$87$$)) {
        return this.$_selectionView$.$destroySelectionAt$($index$$87$$), this.$__selectedIndexes$.splice($indexPosition$$1$$, 1), $JSCompiler_alias_TRUE$$
      }
    }
  }
  return $JSCompiler_alias_FALSE$$
};
$tuna$ui$selection$rule$MultipleSelectionRule$$.prototype.$clearSelection$ = function $$tuna$ui$selection$rule$MultipleSelectionRule$$$$$clearSelection$$() {
  for(;0 < this.$__selectedIndexes$.length;) {
    this.$_selectionView$.$destroySelectionAt$(this.$__selectedIndexes$.shift())
  }
};
function $tuna$ui$selection$rule$NavigationSelectionRule$$() {
  $tuna$ui$selection$rule$AbstractSelectionRule$$.call(this);
  this.$__openData$ = this.$__navigation$ = this.$__currentController$ = this.$__currentIndex$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$selection$rule$NavigationSelectionRule$$, $tuna$ui$selection$rule$AbstractSelectionRule$$);
$JSCompiler_prototypeAlias$$ = $tuna$ui$selection$rule$NavigationSelectionRule$$.prototype;
$JSCompiler_prototypeAlias$$.$setNavigation$ = function $$JSCompiler_prototypeAlias$$$$setNavigation$$($navigation$$2$$) {
  this.$__navigation$ = $navigation$$2$$
};
$JSCompiler_prototypeAlias$$.$getSelectedIndexes$ = function $$JSCompiler_prototypeAlias$$$$getSelectedIndexes$$() {
  return this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ ? [this.$__currentIndex$] : []
};
$JSCompiler_prototypeAlias$$.navigate = function $$JSCompiler_prototypeAlias$$$navigate$($index$$89$$, $data$$36$$) {
  this.$__openData$ = $data$$36$$;
  return this.$selectIndex$($index$$89$$)
};
$JSCompiler_prototypeAlias$$.$selectIndex$ = function $$JSCompiler_prototypeAlias$$$$selectIndex$$($index$$90_page$$inline_280$$) {
  return this.$isIndexEnabled$($index$$90_page$$inline_280$$) && this.$__currentIndex$ !== $index$$90_page$$inline_280$$ ? (this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && (this.$__currentController$ instanceof $tuna$control$PageViewController$$ && this.$__currentController$ instanceof $tuna$control$PageViewController$$ && this.$__currentController$.close(), this.$_selectionView$.$destroySelectionAt$(this.$__currentIndex$), this.$_eventDispatcher$.$dispatch$("close", this.$__currentIndex$)), 
  this.$__currentIndex$ = $index$$90_page$$inline_280$$, this.$__currentController$ = $JSCompiler_alias_NULL$$, this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && ($index$$90_page$$inline_280$$ = this.$_itemsCollection$.$getItemAt$(this.$__currentIndex$), $index$$90_page$$inline_280$$ !== $JSCompiler_alias_NULL$$ && (this.$__currentController$ = $tuna$control$__controllerTable$$[$index$$90_page$$inline_280$$.id] !== $JSCompiler_alias_VOID$$ ? $tuna$control$__controllerTable$$[$index$$90_page$$inline_280$$.id] : 
  $JSCompiler_alias_NULL$$, this.$__currentController$ !== $JSCompiler_alias_NULL$$ && !this.$__currentController$.$isActive$() && (this.$__currentController$ instanceof $tuna$control$PageViewController$$ && this.$__currentController$.$setNavigation$(this.$__navigation$), this.$__currentController$.$init$($index$$90_page$$inline_280$$)))), this.$_selectionView$.$applySelectionAt$(this.$__currentIndex$), this.$_eventDispatcher$.$dispatch$("open", this.$__currentIndex$), this.$__currentController$ !== 
  $JSCompiler_alias_NULL$$ && this.$__currentController$ instanceof $tuna$control$PageViewController$$ && this.$__currentController$.open(this.$__openData$), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$clearSelection$ = function $$JSCompiler_prototypeAlias$$$$clearSelection$$() {
  this.$__currentIndex$ !== $JSCompiler_alias_NULL$$ && (this.$_selectionView$.$destroySelectionAt$(this.$__currentIndex$), this.$__currentIndex$ = $JSCompiler_alias_NULL$$)
};
function $tuna$ui$selection$view$AbstractSelectionView$$() {
  this.$_selectionRule$ = this.$_itemsCollection$ = $JSCompiler_alias_NULL$$
}
$tuna$ui$selection$view$AbstractSelectionView$$.prototype.$setItemsCollection$ = function $$tuna$ui$selection$view$AbstractSelectionView$$$$$setItemsCollection$$($collection$$1$$) {
  this.$_itemsCollection$ = $collection$$1$$
};
$tuna$ui$selection$view$AbstractSelectionView$$.prototype.$applySelectionAt$ = $JSCompiler_emptyFn$$();
$tuna$ui$selection$view$AbstractSelectionView$$.prototype.$destroySelectionAt$ = $JSCompiler_emptyFn$$();
$tuna$ui$selection$view$AbstractSelectionView$$.prototype.update = $JSCompiler_emptyFn$$();
function $tuna$ui$selection$view$ClassSelectionView$$($target$$62$$) {
  $tuna$ui$selection$view$AbstractSelectionView$$.call(this);
  this.$_target$ = $target$$62$$;
  this.$_selectionClass$ = this.$_itemSelector$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$ui$selection$view$ClassSelectionView$$, $tuna$ui$selection$view$AbstractSelectionView$$);
$tuna$ui$selection$view$ClassSelectionView$$.prototype.$applySelectionAt$ = function $$tuna$ui$selection$view$ClassSelectionView$$$$$applySelectionAt$$($index$$100_item$$12$$) {
  $index$$100_item$$12$$ = this.$_itemsCollection$.$getItemAt$($index$$100_item$$12$$);
  $index$$100_item$$12$$ !== $JSCompiler_alias_NULL$$ && this.$_selectionClass$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addClass$$($index$$100_item$$12$$, this.$_selectionClass$)
};
$tuna$ui$selection$view$ClassSelectionView$$.prototype.$destroySelectionAt$ = function $$tuna$ui$selection$view$ClassSelectionView$$$$$destroySelectionAt$$($index$$101_item$$13$$) {
  $index$$101_item$$13$$ = this.$_itemsCollection$.$getItemAt$($index$$101_item$$13$$);
  $index$$101_item$$13$$ !== $JSCompiler_alias_NULL$$ && this.$_selectionClass$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$removeClass$$($index$$101_item$$13$$, this.$_selectionClass$)
};
$tuna$ui$selection$view$ClassSelectionView$$.prototype.update = function $$tuna$ui$selection$view$ClassSelectionView$$$$update$() {
  if(this.$_itemSelector$ !== $JSCompiler_alias_NULL$$) {
    this.$_selectionRule$.$clearSelection$();
    this.$_itemsCollection$.clear();
    for(var $possibleItems$$ = $tuna$dom$select$$(this.$_itemSelector$, this.$_target$), $i$$44$$ = 0, $l$$32$$ = $possibleItems$$.length, $index$$104$$ = $JSCompiler_alias_NULL$$, $item$$16$$ = $JSCompiler_alias_NULL$$;$i$$44$$ < $l$$32$$;) {
      $item$$16$$ = $possibleItems$$[$i$$44$$], $tuna$dom$getParentMatches$$($item$$16$$, this.$_itemSelector$, this.$_target$) === $JSCompiler_alias_NULL$$ && ($index$$104$$ = this.$_itemsCollection$.$addItem$($item$$16$$), $index$$104$$ !== $JSCompiler_alias_NULL$$ && this.$_selectionClass$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$hasClass$$($item$$16$$, this.$_selectionClass$) && this.$_selectionRule$.$selectIndex$($index$$104$$)), $i$$44$$++
    }
  }
};
var $tuna$control$__controllerTable$$ = {}, $tuna$control$__mainController$$ = $JSCompiler_alias_NULL$$;
function $tuna$control$ViewController$$() {
  this.$_container$ = $JSCompiler_alias_NULL$$;
  this.$_modules$ = []
}
$tuna$control$ViewController$$.prototype.$isActive$ = function $$tuna$control$ViewController$$$$$isActive$$() {
  return this.$_container$ !== $JSCompiler_alias_NULL$$ && this.$_container$.$isActive$()
};
$tuna$control$ViewController$$.prototype.$init$ = function $$tuna$control$ViewController$$$$$init$$($target$$64$$) {
  this.$destroy$();
  this.$_container$ = new $tuna$ui$ModuleContainer$$($target$$64$$);
  this.$_container$.$__modules$ = this.$_modules$;
  $JSCompiler_StaticMethods_initModules$$(this.$_container$);
  this.$_initActions$()
};
$tuna$control$ViewController$$.prototype.$destroy$ = function $$tuna$control$ViewController$$$$$destroy$$() {
  this.$_container$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_destroyModules$$(this.$_container$), this.$_container$ = $JSCompiler_alias_NULL$$)
};
$tuna$control$ViewController$$.prototype.$_initActions$ = $JSCompiler_emptyFn$$();
function $tuna$control$PageViewController$$() {
  $tuna$control$ViewController$$.call(this);
  this.$_navigation$ = $JSCompiler_alias_NULL$$
}
$tuna$utils$extend$$($tuna$control$PageViewController$$, $tuna$control$ViewController$$);
$tuna$control$PageViewController$$.prototype.$setNavigation$ = function $$tuna$control$PageViewController$$$$$setNavigation$$($navigation$$3$$) {
  this.$_navigation$ = $navigation$$3$$
};
$tuna$control$PageViewController$$.prototype.close = $JSCompiler_emptyFn$$();
$tuna$control$PageViewController$$.prototype.open = $JSCompiler_emptyFn$$();
function $NavigationModule$$() {
  this.$_selector$ = ".j-navigation"
}
$tuna$utils$extend$$($NavigationModule$$, $tuna$ui$Module$$);
$NavigationModule$$.prototype.$initInstance$ = function $$NavigationModule$$$$$initInstance$$($target$$65$$) {
  return new $tuna$ui$selection$Navigation$$($target$$65$$)
};
$tuna$ui$__typeTable$$.navigation = new $NavigationModule$$;
function $PopupModule$$() {
  this.$_selector$ = ".j-popup"
}
$tuna$utils$extend$$($PopupModule$$, $tuna$ui$Module$$);
$PopupModule$$.prototype.$initInstance$ = function $$PopupModule$$$$$initInstance$$($target$$66$$) {
  return $tuna$ui$popups$create$$($target$$66$$)
};
$tuna$ui$__typeTable$$.popup = new $PopupModule$$;
function $ButtonModule$$() {
  this.$_selector$ = ".j-button"
}
$tuna$utils$extend$$($ButtonModule$$, $tuna$ui$Module$$);
$ButtonModule$$.prototype.$initInstance$ = function $$ButtonModule$$$$$initInstance$$($target$$67$$) {
  return $tuna$ui$buttons$create$$($target$$67$$)
};
$tuna$ui$__typeTable$$.button = new $ButtonModule$$;
function $PopupButtonModule$$() {
  this.$_selector$ = ".j-popup-button"
}
$tuna$utils$extend$$($PopupButtonModule$$, $tuna$ui$Module$$);
$PopupButtonModule$$.prototype.$initInstance$ = function $$PopupButtonModule$$$$$initInstance$$($target$$68$$) {
  return new $tuna$ui$buttons$PopupButton$$($target$$68$$)
};
$tuna$ui$__typeTable$$["popup-button"] = new $PopupButtonModule$$;
function $SelectionGroupModule$$() {
  this.$_selector$ = ".j-selection-group"
}
$tuna$utils$extend$$($SelectionGroupModule$$, $tuna$ui$Module$$);
$SelectionGroupModule$$.prototype.$initInstance$ = function $$SelectionGroupModule$$$$$initInstance$$($target$$69$$) {
  var $selectionGroup$$ = new $tuna$ui$selection$SelectionGroup$$($target$$69$$, $JSCompiler_alias_NULL$$), $selectionEvent$$ = $JSCompiler_StaticMethods_getStringOption$$($selectionGroup$$, "selection-event"), $itemSelector$$ = $JSCompiler_StaticMethods_getStringOption$$($selectionGroup$$, "item-selector");
  $selectionEvent$$ !== $JSCompiler_alias_NULL$$ && $itemSelector$$ !== $JSCompiler_alias_NULL$$ && $tuna$dom$addChildEventListener$$($target$$69$$, $itemSelector$$, $selectionEvent$$, function() {
    var $index$$106$$ = $selectionGroup$$.$getItemIndex$(this);
    $index$$106$$ !== $JSCompiler_alias_NULL$$ && $selectionGroup$$.$selectIndex$($index$$106$$)
  });
  return $selectionGroup$$
};
$tuna$ui$__typeTable$$["selection-group"] = new $SelectionGroupModule$$;
function $TemplateTransformerModule$$() {
  this.$_selector$ = ".j-template-transformer"
}
$tuna$utils$extend$$($TemplateTransformerModule$$, $tuna$ui$Module$$);
$TemplateTransformerModule$$.prototype.$initInstance$ = function $$TemplateTransformerModule$$$$$initInstance$$($target$$70$$) {
  return new $tuna$ui$transformers$TemplateTransformer$$($target$$70$$)
};
$tuna$ui$__typeTable$$["template-transformer"] = new $TemplateTransformerModule$$;
function $ButtonGroupModule$$() {
  this.$_selector$ = ".j-button-group"
}
$tuna$utils$extend$$($ButtonGroupModule$$, $tuna$ui$Module$$);
$ButtonGroupModule$$.prototype.$initInstance$ = function $$ButtonGroupModule$$$$$initInstance$$($target$$71$$) {
  return new $tuna$ui$buttons$ButtonGroup$$($target$$71$$)
};
$tuna$ui$__typeTable$$["button-group"] = new $ButtonGroupModule$$;
function $SWFModule$$() {
  this.$_selector$ = ".j-swf"
}
$tuna$utils$extend$$($SWFModule$$, $tuna$ui$Module$$);
$SWFModule$$.prototype.$initInstance$ = function $$SWFModule$$$$$initInstance$$($target$$72$$) {
  return new $tuna$ui$flash$SWF$$($target$$72$$)
};
$tuna$ui$__typeTable$$.swf = new $SWFModule$$;
function $InputFilterModule$$() {
  this.$_selector$ = ".j-input-filter"
}
$tuna$utils$extend$$($InputFilterModule$$, $tuna$ui$Module$$);
$InputFilterModule$$.prototype.$initInstance$ = function $$InputFilterModule$$$$$initInstance$$($target$$73$$) {
  return new $tuna$ui$forms$InputFilter$$($target$$73$$)
};
$tuna$ui$__typeTable$$["input-filter"] = new $InputFilterModule$$;
function $AutocompleteModule$$() {
  this.$_selector$ = ".j-autocomplete"
}
$tuna$utils$extend$$($AutocompleteModule$$, $tuna$ui$Module$$);
$AutocompleteModule$$.prototype.$initInstance$ = function $$AutocompleteModule$$$$$initInstance$$($target$$74$$) {
  return new $tuna$ui$forms$Autocomplete$$($target$$74$$)
};
$tuna$ui$__typeTable$$.autocomplete = new $AutocompleteModule$$;
function $FormModule$$() {
  this.$_selector$ = "form.j-form"
}
$tuna$utils$extend$$($FormModule$$, $tuna$ui$Module$$);
$FormModule$$.prototype.$initInstance$ = function $$FormModule$$$$$initInstance$$($target$$75$$) {
  return new $tuna$ui$forms$Form$$($target$$75$$)
};
$tuna$ui$__typeTable$$.form = new $FormModule$$;
function $CarouselModule$$() {
  this.$_selector$ = ".j-carousel"
}
$tuna$utils$extend$$($CarouselModule$$, $tuna$ui$Module$$);
$CarouselModule$$.prototype.$initInstance$ = function $$CarouselModule$$$$$initInstance$$($target$$76$$) {
  return new $tuna$ui$selection$Carousel$$($target$$76$$)
};
$tuna$ui$__typeTable$$.carousel = new $CarouselModule$$;
window.main = function $window$main$($body$$1$$) {
  -1 === $tuna$utils$indexOf$$("j-control-container", $tuna$ui$__isolators$$) && $tuna$ui$__isolators$$.push("j-control-container");
  $tuna$dom$__selectorEngine$$ = Sizzle;
  $tuna$rest$call$$("config.get", {app:"admin-panel"}, function($result$$20$$) {
    $tuna$utils$config$$.$init$($result$$20$$);
    $tuna$control$__mainController$$.$init$($body$$1$$)
  })
};
function $MainController$$() {
  $tuna$control$ViewController$$.call(this);
  this.$_modules$ = ["template-transformer", "navigation", "popup", "form"]
}
$tuna$utils$extend$$($MainController$$, $tuna$control$ViewController$$);
$MainController$$.prototype.$_initActions$ = function $$MainController$$$$$_initActions$$() {
  var $self$$12$$ = this;
  $tuna$rest$call$$("users.getCurrent", $JSCompiler_alias_NULL$$, function($user$$) {
    $user$$ === $JSCompiler_alias_NULL$$ ? $JSCompiler_StaticMethods___showSignUpPopup$$($self$$12$$) : $JSCompiler_StaticMethods___applyUser$$($self$$12$$, $user$$)
  }, "bakery");
  $JSCompiler_StaticMethods___initSingOutForm$$(this)
};
function $JSCompiler_StaticMethods___initSingOutForm$$($JSCompiler_StaticMethods___initSingOutForm$self$$) {
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___initSingOutForm$self$$.$_container$, "form", "sign-out").addEventListener("result", function() {
    location.reload()
  })
}
function $JSCompiler_StaticMethods___showSignUpPopup$$($JSCompiler_StaticMethods___showSignUpPopup$self$$) {
  var $popup$$1$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___showSignUpPopup$self$$.$_container$, "popup", "sign-in");
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___showSignUpPopup$self$$.$_container$, "form", "sign-in").addEventListener("result", function($event$$30$$, $user$$1$$) {
    $JSCompiler_StaticMethods___applyUser$$($JSCompiler_StaticMethods___showSignUpPopup$self$$, $user$$1$$);
    $popup$$1$$.close()
  });
  $popup$$1$$.open()
}
function $JSCompiler_StaticMethods___applyUser$$($JSCompiler_StaticMethods___applyUser$self$$, $user$$2$$) {
  var $applicationFrame$$ = $tuna$dom$selectOne$$("#application_frame");
  $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "navigation", "body-container").addEventListener("open", function($event$$31$$, $page$$1$$) {
    if("application" === $page$$1$$) {
      var $bakery$$ = $model$currentBakery$$.get();
      $applicationFrame$$.src = $bakery$$ !== $JSCompiler_alias_NULL$$ ? $tuna$utils$config$$.get("app", "bakery") + "?bakery_id=" + $bakery$$.id : $tuna$utils$config$$.get("app", "site")
    }
  });
  var $globalTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "template-transformer", "body-container");
  $model$currentBakery$$.addEventListener("update", function($event$$32$$, $bakery$$1$$) {
    $globalTransformer$$.reset();
    $JSCompiler_StaticMethods_applyTransform$$($globalTransformer$$, {currentUser:$tuna$model$serialize$$($user$$2$$), currentBakery:$tuna$model$serialize$$($bakery$$1$$)});
    $bakery$$1$$ !== $JSCompiler_alias_NULL$$ && ($model$dimensions$$.load({bakery_id:$bakery$$1$$.id}), $model$recipes$$.load({bakery_id:$bakery$$1$$.id}), $model$orders$$.load({bakery_id:$bakery$$1$$.id}))
  });
  if($user$$2$$.$role$ === $model$record$User$$.$ROLE_ADMIN$) {
    var $bakeryForm$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "form", "bakery-selection");
    $bakeryForm$$.addEventListener("submit", function($event$$33_id$$5$$) {
      $event$$33_id$$5$$.preventDefault();
      $event$$33_id$$5$$ = $bakeryForm$$.$getValue$("bakery_id");
      $event$$33_id$$5$$ !== $JSCompiler_alias_VOID$$ && $model$currentBakery$$.set($JSCompiler_StaticMethods_getItemById$$($model$bakeries$$, $event$$33_id$$5$$))
    });
    var $bakeryTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$($JSCompiler_StaticMethods___applyUser$self$$.$_container$, "template-transformer", "bakery-selection");
    $model$bakeries$$.addEventListener("update", function($event$$34$$, $bakeries$$) {
      $JSCompiler_StaticMethods_applyTransform$$($bakeryTransformer$$, $tuna$model$serialize$$($bakeries$$))
    });
    $model$bakeries$$.load();
    $JSCompiler_StaticMethods_applyTransform$$($globalTransformer$$, {currentUser:$tuna$model$serialize$$($user$$2$$)})
  }else {
    $model$currentBakery$$.set($user$$2$$)
  }
}
$tuna$control$__mainController$$ = new $MainController$$;
function $ProfileController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$_modules$ = ["template-transformer", "form", "button", "popup"]
}
$tuna$utils$extend$$($ProfileController$$, $tuna$control$PageViewController$$);
$ProfileController$$.prototype.$_initActions$ = $JSCompiler_emptyFn$$();
$tuna$control$__controllerTable$$.profile_page = new $ProfileController$$;
function $DecorationsController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$__updateDecorationLists$ = $tuna$utils$bind$$(this.$__updateDecorationLists$, this);
  this.$__availableDecoTransformer$ = this.$__unusedDecoTransformer$ = $JSCompiler_alias_NULL$$;
  this.$_modules$ = ["template-transformer", "navigation", "button-group", "form", "popup-button"]
}
$tuna$utils$extend$$($DecorationsController$$, $tuna$control$PageViewController$$);
$DecorationsController$$.prototype.$_initActions$ = function $$DecorationsController$$$$$_initActions$$() {
  this.$__unusedDecoTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "decorations-list");
  this.$__availableDecoTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "available-decorations-list");
  $model$decorations$$.addEventListener("update", this.$__updateDecorationLists$);
  $model$currentBakery$$.addEventListener("update", this.$__updateDecorationLists$);
  $model$decorations$$.load();
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "available-decorations-list").addEventListener("result", function($event$$35$$, $bakery$$2$$) {
    $model$currentBakery$$.set($bakery$$2$$)
  });
  var $addDecorationPopup$$ = $JSCompiler_StaticMethods_getPopup$$($JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "popup-button", "add-decoration"));
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "add-decoration").addEventListener("result", function($event$$36$$, $decoration$$) {
    $model$decorations$$.$addItem$($decoration$$);
    $addDecorationPopup$$.close()
  });
  var $self$$14$$ = this;
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button-group", "decorations-list").addEventListener("add", function($event$$37$$, $button$$5$$) {
    var $decorationId$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$5$$, "decoration-id"), $bakery$$3$$ = $model$currentBakery$$.get();
    $bakery$$3$$.$decorationPrices$[$decorationId$$] === $JSCompiler_alias_VOID$$ && ($bakery$$3$$.$decorationPrices$[$decorationId$$] = 0);
    $self$$14$$.$__updateDecorationLists$()
  });
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button-group", "available-decorations-list").addEventListener("remove", function($event$$38$$, $button$$6$$) {
    var $decorationId$$1$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$6$$, "decoration-id"), $bakery$$4$$ = $model$currentBakery$$.get();
    $bakery$$4$$.$decorationPrices$[$decorationId$$1$$] !== $JSCompiler_alias_VOID$$ && (delete $bakery$$4$$.$decorationPrices$[$decorationId$$1$$], $self$$14$$.$__updateDecorationLists$())
  });
  this.$__updateDecorationLists$()
};
$DecorationsController$$.prototype.$__updateDecorationLists$ = function $$DecorationsController$$$$$__updateDecorationLists$$() {
  var $bakery$$5$$ = $model$currentBakery$$.get();
  if($bakery$$5$$ !== $JSCompiler_alias_NULL$$) {
    var $availableDecorations_unusedDecorations$$ = $model$decorations$$.find(function($decoration$$1$$) {
      return $bakery$$5$$.$decorationPrices$[$decoration$$1$$.id] !== $JSCompiler_alias_VOID$$
    });
    $JSCompiler_StaticMethods_applyTransform$$(this.$__availableDecoTransformer$, $tuna$model$serialize$$($availableDecorations_unusedDecorations$$, $bakery$$5$$));
    $availableDecorations_unusedDecorations$$ = $model$decorations$$.find(function($decoration$$2$$) {
      return $bakery$$5$$.$decorationPrices$[$decoration$$2$$.id] === $JSCompiler_alias_VOID$$
    });
    $JSCompiler_StaticMethods_applyTransform$$(this.$__unusedDecoTransformer$, $tuna$model$serialize$$($availableDecorations_unusedDecorations$$, $bakery$$5$$))
  }
};
var $controller$$inline_355$$ = new $DecorationsController$$;
$tuna$control$__controllerTable$$.decorations_page = $controller$$inline_355$$;
function $DimensionsController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$_modules$ = ["template-transformer", "navigation", "button-group", "form"]
}
$tuna$utils$extend$$($DimensionsController$$, $tuna$control$PageViewController$$);
$DimensionsController$$.prototype.$_initActions$ = function $$DimensionsController$$$$$_initActions$$() {
  $JSCompiler_StaticMethods_addChild$$(this.$_navigation$, $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "navigation", "dimensions"));
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button-group", "dimensions-list").addEventListener("delete", function($event$$39$$, $button$$7$$) {
    if(confirm("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0444\u043e\u0440\u043c\u0443?")) {
      var $id$$6$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$7$$, "dimension-id");
      $tuna$rest$call$$("dimensions.remove", {id:$id$$6$$}, function() {
        $JSCompiler_StaticMethods_removeItemById$$($model$dimensions$$, $id$$6$$)
      });
      $JSCompiler_StaticMethods_setEnabled$$($button$$7$$)
    }
  });
  var $dimensionsTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "dimensions-list");
  $model$dimensions$$.addEventListener("update", function($event$$40$$, $dimensions$$) {
    $JSCompiler_StaticMethods_applyTransform$$($dimensionsTransformer$$, $tuna$model$serialize$$($dimensions$$))
  });
  $JSCompiler_StaticMethods_applyTransform$$($dimensionsTransformer$$, $tuna$model$serialize$$($model$dimensions$$.get()));
  var $self$$15$$ = this;
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "add-dimension").addEventListener("result", function($event$$41$$, $dimension$$) {
    $model$dimensions$$.$addItem$($dimension$$);
    $self$$15$$.$_navigation$.back()
  })
};
$tuna$control$__controllerTable$$.dimensions_page = new $DimensionsController$$;
function $UsersController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$_modules$ = "template-transformer,navigation,button-group,form,button,popup".split(",")
}
$tuna$utils$extend$$($UsersController$$, $tuna$control$PageViewController$$);
$UsersController$$.prototype.$_initActions$ = function $$UsersController$$$$$_initActions$$() {
  $JSCompiler_StaticMethods_addChild$$(this.$_navigation$, $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "navigation", "users"));
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button-group", "list").addEventListener("delete", function($event$$42$$, $button$$8$$) {
    if(confirm("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u043e\u043d\u0434\u0438\u0442\u0435\u0440\u0441\u043a\u0443\u044e?")) {
      var $id$$7$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$8$$, "id");
      $tuna$rest$call$$("users.remove", {id:$id$$7$$}, function() {
        $JSCompiler_StaticMethods_removeItemById$$($model$bakeries$$, $id$$7$$)
      });
      $JSCompiler_StaticMethods_setEnabled$$($button$$8$$)
    }
  });
  var $listTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "list");
  $model$bakeries$$.addEventListener("update", function($event$$43$$, $bakeries$$1$$) {
    $JSCompiler_StaticMethods_applyTransform$$($listTransformer$$, $tuna$model$serialize$$($bakeries$$1$$))
  });
  $JSCompiler_StaticMethods_applyTransform$$($listTransformer$$, $tuna$model$serialize$$($model$bakeries$$.get()));
  var $self$$16$$ = this;
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "add").addEventListener("result", function($event$$44$$, $bakery$$6$$) {
    $model$bakeries$$.$addItem$($bakery$$6$$);
    $self$$16$$.$_navigation$.back()
  });
  var $citiesTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "cities-list");
  $model$cities$$.addEventListener("update", function($event$$45$$, $cities$$) {
    $JSCompiler_StaticMethods_applyTransform$$($citiesTransformer$$, $tuna$model$serialize$$($cities$$))
  });
  $JSCompiler_StaticMethods_applyTransform$$($citiesTransformer$$, $tuna$model$serialize$$($model$cities$$.get()));
  var $addCityPopup$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "popup", "add-city");
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button", "add-city").addEventListener("click", function() {
    $addCityPopup$$.open()
  });
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "add-city").addEventListener("result", function($event$$46$$, $city$$) {
    $model$cities$$.$addItem$($city$$);
    $addCityPopup$$.close()
  });
  $model$cities$$.load()
};
$tuna$control$__controllerTable$$.users_page = new $UsersController$$;
function $RecipesController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$_modules$ = ["template-transformer", "navigation", "button-group", "form"]
}
$tuna$utils$extend$$($RecipesController$$, $tuna$control$PageViewController$$);
$RecipesController$$.prototype.$_initActions$ = function $$RecipesController$$$$$_initActions$$() {
  $JSCompiler_StaticMethods_addChild$$(this.$_navigation$, $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "navigation", "recipes"));
  $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "button-group", "recipe-table").addEventListener("delete", function($event$$47$$, $button$$9$$) {
    if(confirm("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0440\u0435\u0446\u0435\u043f\u0442?")) {
      var $recipeId$$ = $JSCompiler_StaticMethods_getStringOption$$($button$$9$$, "recipe-id");
      $tuna$rest$call$$("recipes.remove", {recipe_id:$recipeId$$}, function() {
        $JSCompiler_StaticMethods_removeItemById$$($model$recipes$$, $recipeId$$)
      });
      $JSCompiler_StaticMethods_setEnabled$$($button$$9$$)
    }
  });
  var $recipeListTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "recipe-table");
  $model$recipes$$.addEventListener("update", function($event$$48$$, $recipes$$) {
    $JSCompiler_StaticMethods_applyTransform$$($recipeListTransformer$$, $tuna$model$serialize$$($recipes$$))
  });
  $JSCompiler_StaticMethods_applyTransform$$($recipeListTransformer$$, $tuna$model$serialize$$($model$recipes$$.get()))
};
$tuna$control$__controllerTable$$.recipes_page = new $RecipesController$$;
function $AddRecipeController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$__addRecipeForm$ = $JSCompiler_alias_NULL$$;
  this.$_modules$ = ["form"]
}
$tuna$utils$extend$$($AddRecipeController$$, $tuna$control$PageViewController$$);
$AddRecipeController$$.prototype.$_initActions$ = function $$AddRecipeController$$$$$_initActions$$() {
  var $self$$17$$ = this;
  this.$__addRecipeForm$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "add-recipe");
  this.$__addRecipeForm$.addEventListener("result", function($event$$49$$, $recipe$$) {
    $model$recipes$$.$addItem$($recipe$$);
    $self$$17$$.$__addRecipeForm$.reset();
    $self$$17$$.$_navigation$.back()
  })
};
$tuna$control$__controllerTable$$.add_recipe_page = new $AddRecipeController$$;
function $EditRecipeController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$__recipeForm$ = this.$__recipeFormTransformer$ = $JSCompiler_alias_NULL$$;
  this.$__recipeId$ = "";
  this.$_modules$ = ["template-transformer", "form"]
}
$tuna$utils$extend$$($EditRecipeController$$, $tuna$control$PageViewController$$);
$EditRecipeController$$.prototype.$_initActions$ = function $$EditRecipeController$$$$$_initActions$$() {
  var $self$$18$$ = this;
  this.$__recipeFormTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "edit-recipe-form");
  this.$__recipeForm$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "edit-recipe-form");
  this.$__recipeForm$.addEventListener("result", function($event$$50$$, $recipe$$1$$) {
    $self$$18$$.$_navigation$.back();
    $model$recipes$$.$addItem$($recipe$$1$$)
  });
  $model$dimensions$$.addEventListener("update", function() {
    $JSCompiler_StaticMethods___updateRecipe$$($self$$18$$)
  })
};
$EditRecipeController$$.prototype.open = function $$EditRecipeController$$$$open$($data$$37$$) {
  this.$__recipeId$ = $data$$37$$["recipe-id"];
  $JSCompiler_StaticMethods___updateRecipe$$(this)
};
function $JSCompiler_StaticMethods___updateRecipe$$($JSCompiler_StaticMethods___updateRecipe$self$$) {
  var $recipe$$2$$ = $JSCompiler_StaticMethods_getItemById$$($model$recipes$$, $JSCompiler_StaticMethods___updateRecipe$self$$.$__recipeId$);
  if($recipe$$2$$ !== $JSCompiler_alias_NULL$$) {
    var $weights$$ = [];
    $JSCompiler_StaticMethods_each$$(function($dimension$$1$$) {
      -1 === $tuna$utils$indexOf$$($dimension$$1$$.$weight$, $weights$$) && $weights$$.push($dimension$$1$$.$weight$)
    });
    $JSCompiler_StaticMethods_applyTransform$$($JSCompiler_StaticMethods___updateRecipe$self$$.$__recipeFormTransformer$, $recipe$$2$$.$serialize$($weights$$.sort()))
  }
}
$tuna$control$__controllerTable$$.edit_recipe_page = new $EditRecipeController$$;
function $OrdersController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$_modules$ = ["template-transformer", "navigation"]
}
$tuna$utils$extend$$($OrdersController$$, $tuna$control$PageViewController$$);
$OrdersController$$.prototype.$_initActions$ = function $$OrdersController$$$$$_initActions$$() {
  $JSCompiler_StaticMethods_addChild$$(this.$_navigation$, $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "navigation", "orders"));
  var $ordersListTransformer$$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "orders-list");
  $model$orders$$.addEventListener("update", function($event$$52$$, $orders$$) {
    $JSCompiler_StaticMethods_applyTransform$$($ordersListTransformer$$, $tuna$model$serialize$$($orders$$))
  })
};
$OrdersController$$.prototype.open = function $$OrdersController$$$$open$() {
  var $bakery$$7$$ = $model$currentBakery$$.get();
  $bakery$$7$$ !== $JSCompiler_alias_NULL$$ && $model$orders$$.load({bakery_id:$bakery$$7$$.id}, $JSCompiler_alias_TRUE$$)
};
$tuna$control$__controllerTable$$.orders_page = new $OrdersController$$;
function $EditOrdersController$$() {
  $tuna$control$PageViewController$$.call(this);
  this.$__orderForm$ = this.$__orderFormTransformer$ = $JSCompiler_alias_NULL$$;
  this.$_modules$ = ["template-transformer", "form"]
}
$tuna$utils$extend$$($EditOrdersController$$, $tuna$control$PageViewController$$);
$EditOrdersController$$.prototype.$_initActions$ = function $$EditOrdersController$$$$$_initActions$$() {
  var $self$$19$$ = this;
  this.$__orderFormTransformer$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "template-transformer", "edit-order-form");
  this.$__orderForm$ = $JSCompiler_StaticMethods_getModuleInstanceByName$$(this.$_container$, "form", "edit-order-form");
  this.$__orderForm$.addEventListener("result", function($event$$53$$, $order$$) {
    $self$$19$$.$_navigation$.back();
    $model$orders$$.$addItem$($order$$)
  })
};
$EditOrdersController$$.prototype.open = function $$EditOrdersController$$$$open$($data$$38_order$$1$$) {
  $data$$38_order$$1$$ = $JSCompiler_StaticMethods_getItemById$$($model$orders$$, $data$$38_order$$1$$["order-id"]);
  $data$$38_order$$1$$ !== $JSCompiler_alias_NULL$$ && ($JSCompiler_StaticMethods_applyTransform$$(this.$__orderFormTransformer$, $data$$38_order$$1$$.$serialize$()), $JSCompiler_StaticMethods_setValue$$(this.$__orderForm$, "status", $data$$38_order$$1$$.status), $JSCompiler_StaticMethods_setValue$$(this.$__orderForm$, "delivery_status", $data$$38_order$$1$$.$deliveryStatus$), $JSCompiler_StaticMethods_setValue$$(this.$__orderForm$, "payment_status", $data$$38_order$$1$$.$paymentStatus$))
};
$tuna$control$__controllerTable$$.edit_order_page = new $EditOrdersController$$;
function $User$$($data$$39$$) {
  this.$email$ = this.name = "";
  this.$role$ = -1;
  $tuna$model$Record$$.call(this, $data$$39$$)
}
$tuna$utils$extend$$($User$$, $tuna$model$Record$$);
$User$$.prototype.$populate$ = function $$User$$$$$populate$$($data$$40$$) {
  this.id = $data$$40$$.id;
  this.name = $data$$40$$.name;
  this.$email$ = $data$$40$$.email;
  this.$role$ = $data$$40$$.role
};
$User$$.prototype.$serialize$ = function $$User$$$$$serialize$$() {
  return{id:this.id, email:this.$email$, role:this.$role$, roleName:$tuna$utils$config$$.get("role", this.$role$)}
};
var $model$record$User$$ = $User$$;
$model$record$User$$.$ROLE_ADMIN$ = 0;
$model$record$User$$.$ROLE_BAKERY$ = 1;
var $record$$inline_380$$ = new $model$record$User$$;
$tuna$model$recordFactory$$.$__prototypes$.user = $record$$inline_380$$;
function $Bakery$$($data$$41$$) {
  this.$contactEmail$ = this.$contactPhone$ = this.$contactName$ = this.$address$ = this.city = "";
  this.$deliveryPrice$ = this.$cashExtraCharge$ = 0;
  this.$decorationPrices$ = {};
  $model$record$User$$.call(this, $data$$41$$)
}
$tuna$utils$extend$$($Bakery$$, $model$record$User$$);
$Bakery$$.prototype.$populate$ = function $$Bakery$$$$$populate$$($data$$42_prices$$) {
  $model$record$User$$.prototype.$populate$.call(this, $data$$42_prices$$);
  this.city = $data$$42_prices$$.city && $data$$42_prices$$.city.name || "";
  this.$address$ = $data$$42_prices$$.address || "";
  this.$contactName$ = $data$$42_prices$$.contact_name || "";
  this.$contactPhone$ = $data$$42_prices$$.contact_phone || "";
  this.$contactEmail$ = $data$$42_prices$$.contact_email || "";
  this.$deliveryPrice$ = $data$$42_prices$$.delivery_price || 0;
  this.$cashExtraCharge$ = $data$$42_prices$$.cash_extra_charge || 0;
  this.$decorationPrices$ = {};
  var $data$$42_prices$$ = $data$$42_prices$$.decoration_prices, $decorationId$$2$$;
  for($decorationId$$2$$ in $data$$42_prices$$) {
    this.$decorationPrices$[$decorationId$$2$$] = $data$$42_prices$$[$decorationId$$2$$].price
  }
};
$Bakery$$.prototype.$serialize$ = function $$Bakery$$$$$serialize$$() {
  var $result$$21$$ = $model$record$User$$.prototype.$serialize$.call(this);
  $result$$21$$.name = this.name;
  $result$$21$$.city = this.city;
  $result$$21$$.deliveryPrice = this.$deliveryPrice$;
  $result$$21$$.cashExtraCharge = this.$cashExtraCharge$;
  $result$$21$$.contactEmail = this.$contactEmail$;
  $result$$21$$.contactPhone = this.$contactPhone$;
  $result$$21$$.contactName = this.$contactName$;
  $result$$21$$.address = this.$address$;
  return $result$$21$$
};
var $record$$inline_384$$ = new $Bakery$$;
$tuna$model$recordFactory$$.$__prototypes$.bakery = $record$$inline_384$$;
function $Recipe$$($data$$43$$) {
  this.$imageUrl$ = this.$desc$ = this.name = this.$bakeryId$ = this.id = "";
  this.$dimentionPrices$ = $JSCompiler_alias_NULL$$;
  $tuna$model$Record$$.call(this, $data$$43$$)
}
$tuna$utils$extend$$($Recipe$$, $tuna$model$Record$$);
$Recipe$$.prototype.$populate$ = function $$Recipe$$$$$populate$$($data$$44$$) {
  this.id = $data$$44$$.id;
  this.$bakeryId$ = $data$$44$$.bakery_id;
  this.name = $data$$44$$.name;
  this.$desc$ = $data$$44$$.desc;
  this.$imageUrl$ = $data$$44$$.image_url;
  this.$dimentionPrices$ = $data$$44$$.dimension_prices || $JSCompiler_alias_NULL$$
};
$Recipe$$.prototype.$serialize$ = function $$Recipe$$$$$serialize$$($weights$$1$$) {
  var $result$$22$$ = {id:this.id, bakeryId:this.$bakeryId$, name:this.name, desc:this.$desc$, imageUrl:this.$imageUrl$, dimensionPrices:this.$dimentionPrices$};
  if($weights$$1$$ !== $JSCompiler_alias_VOID$$) {
    for(var $prices$$1$$ = [], $i$$46$$ = 0, $l$$34$$ = $weights$$1$$.length, $weightKey$$ = $JSCompiler_alias_NULL$$, $price$$ = $JSCompiler_alias_NULL$$;$i$$46$$ < $l$$34$$;) {
      $price$$ = {weight:$weights$$1$$[$i$$46$$]}, this.$dimentionPrices$ !== $JSCompiler_alias_NULL$$ && ($weightKey$$ = ($weights$$1$$[$i$$46$$] + "").replace(".", "_"), this.$dimentionPrices$[$weightKey$$] !== $JSCompiler_alias_VOID$$ && ($price$$.price = this.$dimentionPrices$[$weightKey$$].price)), $prices$$1$$.push($price$$), $i$$46$$++
    }
    $result$$22$$.dimensionPrices = $prices$$1$$
  }
  return $result$$22$$
};
var $record$$inline_388$$ = new $Recipe$$;
$tuna$model$recordFactory$$.$__prototypes$.recipe = $record$$inline_388$$;
function $Delivery$$($data$$45$$) {
  this.$date$ = $JSCompiler_alias_NULL$$;
  this.message = this.$comment$ = this.$address$ = "";
  $tuna$model$Record$$.call(this, $data$$45$$)
}
$tuna$utils$extend$$($Delivery$$, $tuna$model$Record$$);
$Delivery$$.prototype.$populate$ = function $$Delivery$$$$$populate$$($data$$46$$) {
  this.$date$ = new Date(1E3 * $data$$46$$.date);
  this.$address$ = $data$$46$$.address;
  this.$comment$ = $data$$46$$.comment;
  this.message = $data$$46$$.message
};
$Delivery$$.prototype.$serialize$ = function $$Delivery$$$$$serialize$$() {
  return{date:this.$date$ && this.$date$.toJSON().substring(0, 16).replace("T", " "), address:this.$address$, comment:this.$comment$, message:this.message}
};
var $record$$inline_392$$ = new $Delivery$$;
$tuna$model$recordFactory$$.$__prototypes$.delivery = $record$$inline_392$$;
function $Client$$($data$$47$$) {
  this.$phone$ = this.$email$ = this.name = "";
  this.$network$ = 0;
  this.$networkId$ = "";
  $tuna$model$Record$$.call(this, $data$$47$$)
}
$tuna$utils$extend$$($Client$$, $tuna$model$Record$$);
$Client$$.prototype.$populate$ = function $$Client$$$$$populate$$($data$$48$$) {
  this.name = $data$$48$$.name;
  this.$email$ = $data$$48$$.email;
  this.$phone$ = $data$$48$$.phone;
  this.$network$ = $data$$48$$.network;
  this.$networkId$ = $data$$48$$.network_id
};
$Client$$.prototype.$serialize$ = function $$Client$$$$$serialize$$() {
  return{name:this.name, email:this.$email$, phone:this.$phone$, network:this.$network$, networkId:this.$networkId$}
};
$Client$$.$NETWORK_NONE$ = 0;
$Client$$.$NETWORK_VK$ = 1;
$Client$$.$NETWORK_OK$ = 2;
var $record$$inline_396$$ = new $Client$$;
$tuna$model$recordFactory$$.$__prototypes$.client = $record$$inline_396$$;
function $Payment$$($data$$49$$) {
  this.$recipePrice$ = this.$deliveryPrice$ = this.$decorationPrice$ = this.$paymentMethod$ = 0;
  $tuna$model$Record$$.call(this, $data$$49$$)
}
$tuna$utils$extend$$($Payment$$, $tuna$model$Record$$);
$Payment$$.prototype.$populate$ = function $$Payment$$$$$populate$$($data$$50$$) {
  this.$paymentMethod$ = $data$$50$$.payment_method;
  this.$decorationPrice$ = $data$$50$$.decoration_price || 0;
  this.$deliveryPrice$ = $data$$50$$.delivery_price || 0;
  this.$recipePrice$ = $data$$50$$.recipe_price || 0
};
$Payment$$.prototype.$serialize$ = function $$Payment$$$$$serialize$$() {
  return{paymentMethod:this.$paymentMethod$, decorationPrice:this.$decorationPrice$, deliveryPrice:this.$deliveryPrice$, recipePrice:this.$recipePrice$, totalPrice:this.$recipePrice$ + this.$deliveryPrice$ + this.$decorationPrice$}
};
var $record$$inline_400$$ = new $Payment$$;
$tuna$model$recordFactory$$.$__prototypes$.payment = $record$$inline_400$$;
function $Dimension$$($data$$51$$) {
  this.id = "";
  this.$weight$ = 0;
  this.shape = "";
  this.$personsCount$ = this.$ratio$ = 0;
  $tuna$model$Record$$.call(this, $data$$51$$)
}
$tuna$utils$extend$$($Dimension$$, $tuna$model$Record$$);
$Dimension$$.prototype.$populate$ = function $$Dimension$$$$$populate$$($data$$52$$) {
  this.id = $data$$52$$.id;
  this.$weight$ = $data$$52$$.weight;
  this.shape = $data$$52$$.shape;
  this.$ratio$ = $data$$52$$.ratio;
  this.$personsCount$ = $data$$52$$.persons_count
};
$Dimension$$.prototype.$serialize$ = function $$Dimension$$$$$serialize$$() {
  return{id:this.id, weight:this.$weight$, shape:this.shape, shapeName:$tuna$utils$config$$.get("shape", this.shape), size:Math.round(90 / this.$ratio$) / 10, personsCount:this.$personsCount$}
};
var $record$$inline_404$$ = new $Dimension$$;
$tuna$model$recordFactory$$.$__prototypes$.dimension = $record$$inline_404$$;
function $Cake$$($data$$53$$) {
  this.$photoUrl$ = this.$imageUrl$ = "";
  this.$dimension$ = $JSCompiler_alias_NULL$$;
  $tuna$model$Record$$.call(this, $data$$53$$)
}
$tuna$utils$extend$$($Cake$$, $tuna$model$Record$$);
$Cake$$.prototype.$populate$ = function $$Cake$$$$$populate$$($data$$54$$) {
  this.$imageUrl$ = $data$$54$$.image_url;
  this.$photoUrl$ = $data$$54$$.photo_url || $JSCompiler_alias_NULL$$;
  this.$dimension$ = new $Dimension$$($data$$54$$.dimension)
};
$Cake$$.prototype.$serialize$ = function $$Cake$$$$$serialize$$() {
  return{imageUrl:this.$imageUrl$, photoUrl:this.$photoUrl$, dimension:this.$dimension$.$serialize$()}
};
var $record$$inline_408$$ = new $Cake$$;
$tuna$model$recordFactory$$.$__prototypes$.cake = $record$$inline_408$$;
function $Order$$($data$$55$$) {
  this.id = "";
  this.index = 0;
  this.$delivery$ = this.$client$ = this.$payment$ = this.$cake$ = this.$recipe$ = this.$bakery$ = this.$date$ = $JSCompiler_alias_NULL$$;
  this.$deliveryStatus$ = this.$paymentStatus$ = this.status = 0;
  $tuna$model$Record$$.call(this, $data$$55$$)
}
$tuna$utils$extend$$($Order$$, $tuna$model$Record$$);
$Order$$.prototype.$populate$ = function $$Order$$$$$populate$$($data$$56$$) {
  this.id = $data$$56$$.id;
  this.$cake$ = new $Cake$$($data$$56$$.cake);
  this.$bakery$ = new $Bakery$$($data$$56$$.bakery);
  this.$client$ = new $Client$$($data$$56$$.client);
  this.$recipe$ = new $Recipe$$($data$$56$$.recipe);
  this.$payment$ = new $Payment$$($data$$56$$.payment);
  this.$delivery$ = new $Delivery$$($data$$56$$.delivery);
  this.status = $data$$56$$.status;
  this.$paymentStatus$ = $data$$56$$.payment_status;
  this.$deliveryStatus$ = $data$$56$$.delivery_status;
  this.index = parseInt(this.id.substr(this.id.length - 8).split("0").join(""), 16);
  this.$date$ = new Date(1E3 * parseInt(this.id.substr(0, 8), 16))
};
$Order$$.prototype.$serialize$ = function $$Order$$$$$serialize$$() {
  return{id:this.id, index:this.index, date:this.$date$ && this.$date$.toJSON().substring(0, 16).replace("T", " "), bakery:this.$bakery$.$serialize$(), cake:this.$cake$.$serialize$(), payment:this.$payment$.$serialize$(), client:this.$client$.$serialize$(), delivery:this.$delivery$.$serialize$(), recipe:this.$recipe$.$serialize$(), status:this.status, paymentStatus:this.$paymentStatus$, deliveryStatus:this.$deliveryStatus$, statusName:$tuna$utils$config$$.get("order_status", this.status), paymentStatusName:$tuna$utils$config$$.get("payment_status", 
  this.$paymentStatus$), deliveryStatusName:$tuna$utils$config$$.get("delivery_status", this.$deliveryStatus$)}
};
var $record$$inline_412$$ = new $Order$$;
$tuna$model$recordFactory$$.$__prototypes$.order = $record$$inline_412$$;
function $City$$($data$$57$$) {
  this.name = this.id = "";
  $tuna$model$Record$$.call(this, $data$$57$$)
}
$tuna$utils$extend$$($City$$, $tuna$model$Record$$);
$City$$.prototype.$populate$ = function $$City$$$$$populate$$($data$$58$$) {
  this.id = $data$$58$$.id;
  this.name = $data$$58$$.name
};
$City$$.prototype.$serialize$ = function $$City$$$$$serialize$$() {
  return{id:this.id, name:this.name}
};
var $record$$inline_416$$ = new $City$$;
$tuna$model$recordFactory$$.$__prototypes$.city = $record$$inline_416$$;
function $model$record$Decoration$$($data$$59$$) {
  this.$imageUrl$ = this.name = "";
  this.$isAutorotate$ = $JSCompiler_alias_FALSE$$;
  $tuna$model$Record$$.call(this, $data$$59$$)
}
$tuna$utils$extend$$($model$record$Decoration$$, $tuna$model$Record$$);
$model$record$Decoration$$.prototype.$populate$ = function $$model$record$Decoration$$$$$populate$$($data$$60$$) {
  this.id = $data$$60$$.id;
  this.name = $data$$60$$.name;
  this.$imageUrl$ = $data$$60$$.image_url;
  this.$isAutorotate$ = $data$$60$$.is_autorotate
};
$model$record$Decoration$$.prototype.$serialize$ = function $$model$record$Decoration$$$$$serialize$$($bakery$$8$$) {
  var $price$$1$$ = 0;
  $bakery$$8$$ !== $JSCompiler_alias_VOID$$ && ($price$$1$$ = $bakery$$8$$.$decorationPrices$[this.id] || 0);
  return{id:this.id, name:this.name, imageUrl:this.$imageUrl$, isAutorotate:this.$isAutorotate$, price:$price$$1$$}
};
var $record$$inline_420$$ = new $model$record$Decoration$$;
$tuna$model$recordFactory$$.$__prototypes$.decoration = $record$$inline_420$$;
var $model$bakeries$$ = new $tuna$model$ListResource$$("users.getBakeries", "bakery"), $model$cities$$ = new $tuna$model$ListResource$$("cities.get", "city"), $model$recipes$$ = new $tuna$model$ListResource$$("recipes.get", "recipe"), $model$orders$$ = new $tuna$model$ListResource$$("orders.get", "order"), $model$dimensions$$ = new $tuna$model$ListResource$$("dimensions.get", "dimension"), $model$decorations$$ = new $tuna$model$ListResource$$("decorations.get", "decoration"), $model$currentBakery$$ = 
new $tuna$model$ItemResource$$;
function $rest$CommonMethod$$($opt_name$$4$$) {
  var $self$$20$$ = this;
  this.$__request$ = $JSCompiler_alias_NULL$$;
  this.$__completeHandler$ = $tuna$utils$bind$$(function($event$$54$$, $data$$61$$) {
    var $result$$inline_424$$ = $JSCompiler_alias_NULL$$;
    try {
      $result$$inline_424$$ = JSON.parse($data$$61$$)
    }catch($error$$inline_425$$) {
      $self$$20$$.$dispatch$("error", $data$$61$$)
    }
    $result$$inline_424$$ !== $JSCompiler_alias_NULL$$ ? $result$$inline_424$$.response !== $JSCompiler_alias_VOID$$ ? $self$$20$$.$dispatch$("result", $result$$inline_424$$.response) : $self$$20$$.$dispatch$("error", $result$$inline_424$$.errors || $result$$inline_424$$) : $self$$20$$.$dispatch$("error", $data$$61$$)
  }, this);
  $tuna$rest$DefaultMethod$$.call(this, $opt_name$$4$$)
}
$tuna$utils$extend$$($rest$CommonMethod$$, $tuna$rest$Method$$);
$rest$CommonMethod$$.prototype.$setName$ = function $$rest$CommonMethod$$$$$setName$$($name$$83$$) {
  this.$__request$ === $JSCompiler_alias_NULL$$ && (this.$__request$ = new $tuna$net$Request$$, this.$__request$.$__method$ = "POST", this.$__request$.addEventListener("complete", this.$__completeHandler$));
  this.$__request$.$__url$ = "/api/?method=" + $name$$83$$
};
$rest$CommonMethod$$.prototype.call = function $$rest$CommonMethod$$$$call$($args$$5$$) {
  this.$__request$.send($args$$5$$)
};
var $JSCompiler_StaticMethods_setDefaultMethod$self$$inline_432$$ = $tuna$rest$methodFactory$$, $method$$inline_433$$ = new $rest$CommonMethod$$;
$JSCompiler_StaticMethods_setDefaultMethod$self$$inline_432$$.$__defaultMethod$ = $method$$inline_433$$;

