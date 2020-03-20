/*
 *project: XUI Widgets Libs
 *version: 2.0
 *create: 2013-3-10
 *update: 2013-7-3 11:00
 *update: 2013-9-24 18:27
 *author: F2E xiechengxiong
 */
(function (win, doc) {
  var X = win['X'] || {};
  X = {
    $: function (id) {
      return doc.getElementById(id);
    },
    accordion: function (obj, step, num, type) {
      obj.timer && clearInterval(obj.timer);
      obj.timer = setInterval(function () {
        X.accordion(obj, step, num, type);
      }, 10);
      var curWidth = type === 'width' ? obj.clientWidth : obj.clientHeight;
      if (curWidth === num) {
        clearInterval(obj.timer);
        obj.timer = null;
      } else {
        obj.style[type] = curWidth + step + 'px';
      }
    },
    addClass: function (node, className) {
      if (!this.hasClass(node, className)) {
        node.className = node.className + ' ' + className;
      }
    },
    addCss: function (url, fn) {
      var link = doc.createElement('link');
      link.href = url;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      this.onload(link, fn);
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    addScript: function (url, fn) {
      var script = doc.createElement('script');
      script.type = 'text/javascript';
      this.onload(script, fn);
      doc.getElementsByTagName('head')[0].appendChild(script);
      script.src = url;
      return script;
    },
    ajax: function (opts) {
      var dataType = opts['dataType'].toLocaleLowerCase();
      var data = decodeURIComponent(typeof opts.data === 'undefined' ? '' : typeof opts.data === 'object' ? this.obj2str(opts.data) : opts.data);
      if (dataType === 'jsonp') {
        var fnName = 'jsonp_' + Math.floor(Math.random() * 10E10) + '_' + new Date().getTime();
        opts.url = opts.url + '?callback=' + fnName + '&' + data + '&' + 'r=' + new Date().getTime();
        var script = this.addScript(opts.url, null);
        (function(fn, sucFn, script) {
          win[fnName] = function (data) {
            sucFn && sucFn(data);
            doc.getElementsByTagName('head')[0].removeChild(script);
          };
        })(fnName, opts['sucFn'], script);
      } else {
        var req = win.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var type = typeof opts.type === 'undefined' ? 'get' : opts.type;
        if (type && type.toLocaleLowerCase() === 'post') {
          req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        } else if (data !== '') {
          opts.url = opts.url + '?' + data;
        }
        req.open(type, opts.url, true);
        req.send(data);
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            if (req.status === 200) {
              opts['sucFn'] && opts['sucFn'](dataType === 'json' ? X.parseJSON(req.responseText) : req.responseText);
            } else {
              opts['failFn'] && opts['failFn'](req.status);
            }
          }
        };
      }
    },
    append: function (node, parent) {
      if (typeof node === 'object') {
        parent.appendChild(node);
      } else {
        var fragment = doc.createDocumentFragment();
        fragment.innerHTML = node;
        parent.appendChild(fragment);
      }
    },
    attr: function (element, attrName, attrVal) {
      if (arguments.length === 2 && typeof attrName === 'string') {
        return element.getAttribute(attrName);
      } else {
        var attr = {};
        if (typeof attrName === 'string') {
          attr[attrName] = attrVal;
        } else {
          attr = attrName;
        }
        for (var n in attr) {
          element.setAttribute(n, attr[n]);
        }
      }
      return element;
    },
    child: function(element) {
      var childes = element.childNodes;
      var list = [];
      for(var i = 0, len = childes.length; i < len; i++){
        var child = childes[i];
        if(child.nodeName !== '#text' || /\s/.test(child.nodeValue)) {
          list.push(child);
        }
      }
      list.each = function (fn) {
        X.each.call(list, fn);
      };
      return list;
    },
    /**
     * 深度克隆对象或数组，阻止js中的引用传递
     * @param obj 被克隆的对象或数组
     * @returns {*} 返回克隆出来的对象或数组
     */
    clone: function (obj) {
      var newObj;
      if (typeof obj === 'object') {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
          newObj = [];
          var i = obj.length;
          while (i--) {
            newObj[i] = X.clone(obj[i]);
          }
          return newObj;
        } else {
          newObj = {};
          for (var j in obj) {
            newObj[j] = X.clone(obj[j]);
          }
        }
      } else {
        return obj;
      }
      return newObj;
    },
    css: function(node, attr, value) {
      if(arguments.length === 2) {
        if (attr != 'opacity') {
          return parseInt(node.currentStyle ? node.currentStyle[attr] : document.defaultView.getComputedStyle(node, false)[attr]);
        } else {
          return Math.round(100 * parseFloat(node.currentStyle ? node.currentStyle[attr] : document.defaultView.getComputedStyle(node, false)[attr]));
        }
      } else if(arguments.length === 3) {
        switch (attr) {
          case 'width':
          case 'height':
          case 'paddingLeft':
          case 'paddingTop':
          case 'paddingRight':
          case 'paddingBottom': value = Math.max(value, 0);
          case 'left':
          case 'top':
          case 'right':
          case 'bottom':
          case 'marginLeft':
          case 'marginTop':
          case 'marginRight':
          case 'marginBottom':
            node.style[attr] = value + 'px';
            break;
          case 'opacity':
            node.style.filter = 'alpha(opacity:' + value + ')';
            node.style.opacity = value / 100;
            break;
          default: node.style[attr] = value;
        }
      }
      return node;
    },
    data: function(element, key, value) {
      this.dataObj = this.dataObj || {};
      var id = this.attr(element, 'data-data');
      if(!id) {
        id = 'tid'+new Date().getTime();
        this.attr(element, 'data-data', id);
      }
      this.dataObj[id] = this.dataObj[id] || {};
      if (arguments.length === 2 && typeof key === 'string') {
        return this.dataObj[id][key];
      } else {
        var keys = {};
        if (typeof key === 'string') {
          keys[key] = value;
        } else {
          keys = key;
        }
        for (var n in keys) {
          this.dataObj[id][n] = keys[n];
        }
      }
      return element;
    },
    delClass: function (node, className) {
      if (this.hasClass(node, className)) {
        var cls = node.className;
        if (className === cls) {
          cls = '';
        } else {
          cls = cls.replace(' ' + className, '').replace(className + ' ', '');
        }
        node.className = cls;
      }
    },
    delEvent: function (node, type, fn) {
      if (node.removeEventListener) {
        node.removeEventListener(type, fn, false);
      } else if (node.detachEvent) {
        node.detachEvent("on" + type, fn);
      } else {
        node["on" + type] = null;
      }
    },
    dir: function (data) {
      try {
        console.dir(data);
      } catch (ex) {
      }
    },
    each: function (fn) {
      for (var i = 0; i < this.length; i++) {
        if (fn && fn.call(this[i], i) === false) {
          break;
        }
      }
    },
    extend: function() {
      var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
      if(typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if(typeof target !== 'object' && !this.type(target) === 'function') {
        target = {};
      }
      if(length === i) {
        target = this;
        --i;
      }
      for(; i < length; i++) {
        if((options = arguments[i]) != null) {
          for(name in options) {
            src = target[name];
            copy = options[name];
            if(target === copy) {
              continue;
            }
            if(deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
              if(copyIsArray) {
                copyIsArray = false;
                clone = src && this.isArray(src) ? src : [];
              } else {
                clone = src && this.isPlainObject(src) ? src : {};
              }
              target[name] = this.extend(deep, clone, copy);
            } else if(copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    },
    fadeIn: function (obj) {
      if (obj.timer) {
        clearInterval(obj.timer);
      }
      obj.timer = setInterval(function () {
        X.fadeIn(obj);
      }, 100);
      if (!win['xcxFadeInOpacity']) {
        win['xcxFadeInOpacity'] = 0;
        obj.style.display = '';
      }
      win['xcxFadeInOpacity'] += 0.1;
      obj.style.opacity = win['xcxFadeInOpacity'] + '';
      if (win['xcxFadeInOpacity'] >= 1) {
        win['xcxFadeInOpacity'] = 0;
        clearInterval(obj.timer);
      }
    },
    fadeOut: function (obj) {
      if (obj.timer) {
        clearInterval(obj.timer);
      }
      obj.timer = setInterval(function () {
        X.fadeOut(obj);
      }, 100);
      if (!win['xcxFadeOutOpacity']) {
        win['xcxFadeOutOpacity'] = 1;
      }
      win['xcxFadeOutOpacity'] -= 0.1;
      obj.style.opacity = win['xcxFadeOutOpacity'] + '';
      if (win['xcxFadeOutOpacity'] <= 0) {
        obj.style.display = 'none';
        win['xcxFadeOutOpacity'] = 1;
        clearInterval(obj.timer);
      }
    },
    filter: function (list, fn) {
      var reList = [];
      this.each.call(list, function () {
        if (fn.call(this)) {
          reList.push(this);
        }
      });
      reList.each = function (fn) {
        X.each.call(reList, fn);
      };
      return reList;
    },
    getBrowser: function () {
      var bs = {};
      var u = win.navigator.userAgent.toLocaleLowerCase(),
        sougou = /se 2.x metasr 1.0/,
        qqbrowser = /(qqbrowser)\/([\d.]+)/,
        msie = /(msie) ([\d.]+)/,
        chrome = /(chrome)\/([\d.]+)/,
        firefox = /(firefox)\/([\d.]+)/,
        safari = /(safari)\/([\d.]+)/,
        opera = /(opera)\/([\d.]+)/,
        b = u.match(sougou) || u.match(qqbrowser) || u.match(msie) || u.match(chrome) || u.match(firefox) || u.match(safari) || u.match(opera) || [0, 0, 0];
      if (b[1] === 'opera' || b[1] === 'safari') {
        b[2] = u.match(/(version)\/([\d.]+)/)[2];
      }
      if (u.match(sougou)) {
        b = [];
        b[1] = 'sougo';
        b[2] = 'msie7.0';
      }
      bs[b[1]] = b[2];
      bs['name'] = b[1];
      bs['version'] = b[2];
      return bs;
    },
    getByAttr: function (attrName, attrVal, parent) {
      parent = parent || doc.body;
      var list = [];
      var elements = parent.getElementsByTagName('*');
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var reg = new RegExp(attrVal.replace(/,/g, '|'), 'g');
        if (reg.test(element.getAttribute(attrName))) {
          list.push(element);
        }
      }
      list.each = function (fn) {
        X.each.call(list, fn);
      };
      return list;
    },
    getByClass: function (className, parent) {
      var node = parent || doc;
      var list = [];
      if (node.getElementsByClassName) {
        list = node.getElementsByClassName(className);
      } else {
        var nodes = node.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
          if (this.hasClass(nodes[i], className)) {
            list.push(nodes[i]);
          }
        }
      }
      list.each = function (fn) {
        X.each.call(list, fn);
      };
      return list;
    },
    getByTag: function (tagName, parent) {
      parent = parent || doc.body;
      var list = [];
      var tags = tagName.split(',');
      for (var i = 0, len = tags.length; i < len; i++) {
        var nl = parent.getElementsByTagName(tags[i]);
        for (var j = 0, jLen = nl.length; j < jLen; j++) {
          list.push(nl[j]);
        }
      }
      list.each = function (fn) {
        X.each.call(list, fn);
      };
      return list;
    },
    getEventXY: function (e, isEnd) {
      e = e || win.event;
      if (!('ontouchstart' in win)) {
        return [e['pageX'], e['pageY']];
      } else if (isEnd) {
        return [e['changedTouches'][0]['pageX'], e['changedTouches'][0]['pageY']];
      }
      return [e['touches'][0]['pageX'], e['touches'][0]['pageY']];
    },
    getOffset: function (obj) {
      var arr = (function (o) {
        var l = 0, t = 0;
        while (o !== null && o !== doc.body) {
          l += o.offsetLeft;
          t += o.offsetTop;
          o = o.offsetParent;
        }
        return [l, t];
      })(obj);
      arr.push(obj.offsetWidth);
      arr.push(obj.offsetHeight);
      return arr;
    },
    getQueryStringArgs: function () {
      var qs = (win.location.search.length > 0 ? win.location.search.substring(1) : '');
      var args = {};
      var items = qs.length ? qs.split('&') : [];
      var len = items.length;
      for (var i = 0; i < len; i++) {
        var item = items[i].split('=');
        var name = decodeURIComponent(item[0]);
        var value = decodeURIComponent(item[1]);
        if (name.length) {
          args[name] = value;
        }
      }
      return args;
    },
    hasClass: function (node, className) {
      var names = node.className.split(/\s+/);
      for (var i = 0; i < names.length; i++) {
        if (names[i] === className) {
          return true;
        }
      }
      return false;
    },
    index: function(element) {
      var index = 0;
      var nodes = this.child(element.parentNode);
      for(var i = 0, len = nodes.length; i < len; i++) {
        if(nodes[i] === element) {
          index = i;
          break;
        }
      }
      return index;
    },
    isArray: function (o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    },
    isLeapYear: function (y) {
      var flag = false;
      if ((y % 400 === 0) || (y % 100 !== 0) && (y % 4 === 0)) {
        flag = true;
      }
      return flag;
    },
    isPlainObject: function( obj ) {
      if ( !obj || this.type(obj) !== 'object' || obj.nodeType || (obj != null && obj == obj.window) ) {
        return false;
      }
      try {
        if ( obj.constructor &&
          !Object.prototype.hasOwnProperty.call(obj, 'constructor') &&
          !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf') ) {
          return false;
        }
      } catch ( e ) {
        return false;
      }
      var key;
      for ( key in obj ) {}
      return key === undefined || Object.prototype.hasOwnProperty.call( obj, key );
    },
    log: function (data) {
      try {
        console.log(data);
      } catch (ex) {
      }
    },
    obj2str: function (obj) {
      var str = [];
      switch (true) {
        case typeof obj === 'undefined':
          str = '';
          break;
        case typeof obj === 'string':
          str = '\"' + obj.replace(/([\"\\])/g, '\\$1').replace(/(\n)/g, '\\n').replace(/(\r)/g, '\\r').replace(/(\t)/g, '\\t') + '\"';
          break;
        case typeof obj === 'object':
          if (!this.isArray(obj)) {
            for (var i in obj) {
              str.push('\"' + i + '\":' + this.obj2str(obj[i]));
            }
            if (!!doc.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(obj.toString)) {
              str.push('toString:' + obj.toString.toString());
            }
            str = '{' + str.join() + '}';
          } else {
            for (var j = 0; j < obj.length; j++) {
              str.push(this.obj2str(obj[j]));
            }
            str = '[' + str.join() + ']';
          }
          break;
        default:
          str = obj.toString().replace(/\"\:/g, '":""');
          break;
      }
      return str;
    },
    on: function (node, type, fn) {
      if (node.addEventListener) {
        node.addEventListener(type, fn, false);
      } else if (node.attachEvent) {
        node.attachEvent('on' + type, fn);
      } else {
        node['on' + type] = fn;
      }
    },
    onload: function (obj, fn) {
      obj.onload = function () {
        fn();
      };
      if (this.getBrowser().name === 'msie') {
        var t = win.setInterval(function () {
          if (obj.readyState === 'loaded' || obj.readyState === 'complete') {
            win.clearInterval(t);
            fn();
          }
        }, 10);
      }
    },
    parseJSON: function (data) {
      if (!data || typeof data !== "string") {
        return null;
      }
      data = this.trim(data);
      if (win.JSON && win.JSON.parse) {
        return win.JSON.parse(data);
      }
      return (new Function("return " + data))();
    },
    preventDefault: function (e) {
      e = e || win.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    query: function (selector, container) {
      var result = [];
      function get(element, index, arr) {
        element = element ? element : doc.body;
        if (!X.isArray(element)) {
          element = [element];
        }
        if (arr[index]) {
          result = [];
          var match = /^#(.+)$|^\.(.+)$|^([\w\d]+)$/.exec(arr[index]);
          if (match[1]) {
            result = doc.getElementById(match[1]);
          } else if(match[2]) {
            for(var i = 0, len = element.length; i < len; i++) {
              X.getByClass(match[2], element[i]).each(function(){
                result.push(this);
              });
            }
          } else if(match[3]) {
            for(var j = 0, jLen = element.length; j < jLen; j++) {
              X.getByTag(match[3], element[j]).each(function() {
                result.push(this);
              });
            }
          }
          index++;
          get(result, index, arr);
        }
      }
      get(container, 0, selector.split(/\s/));
      result.each = function (fn) {
        X.each.call(result, fn);
      };
      return result;
    },
    stopPropagation: function (e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    swipe: function (obj, sFn, mFn, eFn) {
      var canMove, xy;
      this.on(obj, 'touchstart', function (e) {
        canMove = 0;
        xy = X.getEventXY(e);
        sFn && sFn(e, xy[0], xy[1]);
      });
      this.on(obj, 'touchmove', function (e) {
        var mxy = X.getEventXY(e);
        if (canMove === 0) {
          if (Math.abs(mxy[0] - xy[0]) > Math.abs(mxy[1] - xy[1])) {
            canMove = 1;
          } else {
            canMove = 2;
            return;
          }
        }
        var result = mFn && mFn(e, xy[0], mxy[0]);
        if (!result) {
          e.preventDefault();
          e.stopPropagation();
        }
      });

      this.on(obj, 'touchend', function (e) {
        var exy = X.getEventXY(e, 'true');
        if (canMove !== 2) {
          eFn && eFn(e, xy[0], exy[0]);
          canMove = 2;
        }
      });
    },
    touch: function (obj, fn) {
      var duration = 0, fixDistance = 10, time, xy;
      this.on(obj, 'touchstart', function (e) {
        time = new Date().valueOf();
        xy = X.getEventXY(e);
      });
      this.on(obj, 'touchend', function (e) {
        var result = true;
        var endTime = new Date().valueOf();
        var endXY = X.getEventXY(e, true);
        if (endTime - time > duration && Math.abs(endXY[0] - xy[0]) < fixDistance && Math.abs(endXY[1] - xy[1]) < fixDistance) {
          result = fn && fn(e);
        }
        if (!result) {
          e.preventDefault();
          //e.stopPropagation();
        }
      });
    },
    trim: function (text) {
      return text == null ? '' : text.replace(/(^\s*)|(\s*$)/g, '');
    },
    type: function( obj ) {
      var class2type = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'Regexp', 'Object', 'Null', 'Undefined', 'global'];
      for(var i = 0, len = class2type.length; i < len; i++) {
        var name = class2type[i];
        class2type['[object '+ name +']'] = name.toLowerCase();
      }
      var localType = Object.prototype.toString.call(obj);
      return obj == null ?
        String(obj) :
        /\[object\s*HTML.*Element\]/.test(localType) ? 'element' :
        class2type[localType] || 'undefined';
    }
  };
  Array.prototype.distinct = function () {
    var sameObj = function (a, b) {
      var tag = true;
      if (!a || !b) {
        return false;
      }
      for (var x in a) {
        if (!b[x]) {
          return false;
        }
        if (typeof(a[x]) === 'object') {
          tag = sameObj(a[x], b[x]);
        } else {
          if (a[x] !== b[x]) {
            return false;
          }
        }
      }
      return tag;
    };
    var newArr = [], obj = {};
    for (var i = 0, len = this.length; i < len; i++) {
      if (!sameObj(obj[typeof(this[i]) + this[i]], this[i])) {
        newArr.push(this[i]);
        obj[typeof(this[i]) + this[i]] = this[i];
      }
    }
    return newArr;
  };
  win.X = X;
})(window, document);