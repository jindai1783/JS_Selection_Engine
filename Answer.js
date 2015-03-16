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