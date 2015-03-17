if (belowIE9) {
  addFunctions();
}

var $ = function (selector) {

  selectorSymbols = /(?=#)|(?=\.)/;
  selectors = selector.split(selectorSymbols);

  switch(selectors.length) {
    case 1:
      return getElements(selectors[0]);
    case 2:
      return getElements(selectors[0]).filter(selector2);
    case 3:
      return getElements(selectors[0]).filter(selector2).filter(selector3);
  }
}

function getElements(s) {
  return toArray(getNodeList(s));
}

function getNodeList(s) {
  var firstChar = s.charAt(0);
  switch(firstChar) {
    case '.':
      return document.getElementsByClassName(s.slice(1));
    case '#':
      return document.getElementById(s.slice(1));
    default:
      return document.getElementsByTagName(s);
  }
}

function toArray(obj) {
  var array = [];
  if (obj.length in window) {
    array.push(obj);
  } else {
    for (i = 0; i < obj.length; i++) {
      array[i] = obj[i];
    } 
  }
  return array;
}

function selector2(n) {
  return getElements(selectors[1]).indexOf(n) != -1;
}

function selector3(n) {
  return getElements(selectors[2]).indexOf(n) != -1;
}

function belowIE9() {
  return !document.addEventListener;
}

function addFunctions() {
  
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };

  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };

  document.getElementsByClassName = function(search) {
    var d = document, elements, pattern, i, results = [];
    if (d.querySelectorAll) {
      return d.querySelectorAll("." + search);
    }
    if (d.evaluate) {
      pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
      elements = d.evaluate(pattern, d, null, 0, null);
      while ((i = elements.iterateNext())) {
        results.push(i);
      }
    } else {
      elements = d.getElementsByTagName("*");
      pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
      for (i = 0; i < elements.length; i++) {
        if ( pattern.test(elements[i].className) ) {
          results.push(elements[i]);
        }
      }
    }
    return results;
  };

}