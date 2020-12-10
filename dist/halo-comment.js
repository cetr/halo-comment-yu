/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "5a74");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00d8":
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "044b":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0808":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("42bf");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("119ca6e8", content, shadowRoot)
};

/***/ }),

/***/ "09bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("0f7c");
var define = __webpack_require__("f367");

var implementation = __webpack_require__("7b13");
var getPolyfill = __webpack_require__("8926");
var shim = __webpack_require__("522d");

var bound = bind.call(Function.call, getPolyfill());

define(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;


/***/ }),

/***/ "0a06":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var buildURL = __webpack_require__("30b5");
var InterceptorManager = __webpack_require__("f6b4");
var dispatchRequest = __webpack_require__("5270");
var mergeConfig = __webpack_require__("4a7b");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0df6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "0e54":
/***/ (function(module, exports, __webpack_require__) {

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var defaults = createCommonjsModule(function (module) {
    function getDefaults() {
      return {
        baseUrl: null,
        breaks: false,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false
      };
    }

    function changeDefaults(newDefaults) {
      module.exports.defaults = newDefaults;
    }

    module.exports = {
      defaults: getDefaults(),
      getDefaults: getDefaults,
      changeDefaults: changeDefaults
    };
  });
  var defaults_1 = defaults.defaults;
  var defaults_2 = defaults.getDefaults;
  var defaults_3 = defaults.changeDefaults;

  /**
   * Helpers
   */
  var escapeTest = /[&<>"']/;
  var escapeReplace = /[&<>"']/g;
  var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  var escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  var getEscapeReplacement = function getEscapeReplacement(ch) {
    return escapeReplacements[ch];
  };

  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }

    return html;
  }

  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';

      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }

      return '';
    });
  }

  var caret = /(^|[^\[])\^/g;

  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    var obj = {
      replace: function replace(name, val) {
        val = val.source || val;
        val = val.replace(caret, '$1');
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: function getRegex() {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }

  var nonWordAndColonTest = /[^\w:]/g;
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      var prot;

      try {
        prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
      } catch (e) {
        return null;
      }

      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return null;
      }
    }

    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }

    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }

    return href;
  }

  var baseUrls = {};
  var justDomain = /^[^:]+:\/*[^/]*$/;
  var protocol = /^([^:]+:)[\s\S]*$/;
  var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (justDomain.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim(base, '/', true);
      }
    }

    base = baseUrls[' ' + base];
    var relativeBase = base.indexOf(':') === -1;

    if (href.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }

      return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }

      return base.replace(domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  var noopTest = {
    exec: function noopTest() {}
  };

  function merge(obj) {
    var i = 1,
        target,
        key;

    for (; i < arguments.length; i++) {
      target = arguments[i];

      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false,
          curr = offset;

      while (--curr >= 0 && str[curr] === '\\') {
        escaped = !escaped;
      }

      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
        cells = row.split(/ \|/);
    var i = 0;

    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) {
        cells.push('');
      }
    }

    for (; i < cells.length; i++) {
      // leading or trailing whitespace is ignored per the gfm spec
      cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }

    return cells;
  } // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.


  function rtrim(str, c, invert) {
    var l = str.length;

    if (l === 0) {
      return '';
    } // Length of suffix matching the invert condition.


    var suffLen = 0; // Step left until we fail to match the invert condition.

    while (suffLen < l) {
      var currChar = str.charAt(l - suffLen - 1);

      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }

    var l = str.length;
    var level = 0,
        i = 0;

    for (; i < l; i++) {
      if (str[i] === '\\') {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;

        if (level < 0) {
          return i;
        }
      }
    }

    return -1;
  }

  function checkSanitizeDeprecation(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
    }
  }

  var helpers = {
    escape: escape,
    unescape: unescape,
    edit: edit,
    cleanUrl: cleanUrl,
    resolveUrl: resolveUrl,
    noopTest: noopTest,
    merge: merge,
    splitCells: splitCells,
    rtrim: rtrim,
    findClosingBracket: findClosingBracket,
    checkSanitizeDeprecation: checkSanitizeDeprecation
  };

  var defaults$1 = defaults.defaults;
  var rtrim$1 = helpers.rtrim,
      splitCells$1 = helpers.splitCells,
      _escape = helpers.escape,
      findClosingBracket$1 = helpers.findClosingBracket;

  function outputLink(cap, link, raw) {
    var href = link.href;
    var title = link.title ? _escape(link.title) : null;
    var text = cap[1].replace(/\\([\[\]])/g, '$1');

    if (cap[0].charAt(0) !== '!') {
      return {
        type: 'link',
        raw: raw,
        href: href,
        title: title,
        text: text
      };
    } else {
      return {
        type: 'image',
        raw: raw,
        href: href,
        title: title,
        text: _escape(text)
      };
    }
  }

  function indentCodeCompensation(raw, text) {
    var matchIndentToCode = raw.match(/^(\s+)(?:```)/);

    if (matchIndentToCode === null) {
      return text;
    }

    var indentToCode = matchIndentToCode[1];
    return text.split('\n').map(function (node) {
      var matchIndentInNode = node.match(/^\s+/);

      if (matchIndentInNode === null) {
        return node;
      }

      var indentInNode = matchIndentInNode[0];

      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }

      return node;
    }).join('\n');
  }
  /**
   * Tokenizer
   */


  var Tokenizer_1 = /*#__PURE__*/function () {
    function Tokenizer(options) {
      this.options = options || defaults$1;
    }

    var _proto = Tokenizer.prototype;

    _proto.space = function space(src) {
      var cap = this.rules.block.newline.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'space',
            raw: cap[0]
          };
        }

        return {
          raw: '\n'
        };
      }
    };

    _proto.code = function code(src, tokens) {
      var cap = this.rules.block.code.exec(src);

      if (cap) {
        var lastToken = tokens[tokens.length - 1]; // An indented code block cannot interrupt a paragraph.

        if (lastToken && lastToken.type === 'paragraph') {
          return {
            raw: cap[0],
            text: cap[0].trimRight()
          };
        }

        var text = cap[0].replace(/^ {4}/gm, '');
        return {
          type: 'code',
          raw: cap[0],
          codeBlockStyle: 'indented',
          text: !this.options.pedantic ? rtrim$1(text, '\n') : text
        };
      }
    };

    _proto.fences = function fences(src) {
      var cap = this.rules.block.fences.exec(src);

      if (cap) {
        var raw = cap[0];
        var text = indentCodeCompensation(raw, cap[3] || '');
        return {
          type: 'code',
          raw: raw,
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: text
        };
      }
    };

    _proto.heading = function heading(src) {
      var cap = this.rules.block.heading.exec(src);

      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: cap[2]
        };
      }
    };

    _proto.nptable = function nptable(src) {
      var cap = this.rules.block.nptable.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
          raw: cap[0]
        };

        if (item.header.length === item.align.length) {
          var l = item.align.length;
          var i;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.cells.length;

          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells$1(item.cells[i], item.header.length);
          }

          return item;
        }
      }
    };

    _proto.hr = function hr(src) {
      var cap = this.rules.block.hr.exec(src);

      if (cap) {
        return {
          type: 'hr',
          raw: cap[0]
        };
      }
    };

    _proto.blockquote = function blockquote(src) {
      var cap = this.rules.block.blockquote.exec(src);

      if (cap) {
        var text = cap[0].replace(/^ *> ?/gm, '');
        return {
          type: 'blockquote',
          raw: cap[0],
          text: text
        };
      }
    };

    _proto.list = function list(src) {
      var cap = this.rules.block.list.exec(src);

      if (cap) {
        var raw = cap[0];
        var bull = cap[2];
        var isordered = bull.length > 1;
        var isparen = bull[bull.length - 1] === ')';
        var list = {
          type: 'list',
          raw: raw,
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : '',
          loose: false,
          items: []
        }; // Get each top-level item.

        var itemMatch = cap[0].match(this.rules.block.item);
        var next = false,
            item,
            space,
            b,
            addBack,
            loose,
            istask,
            ischecked;
        var l = itemMatch.length;

        for (var i = 0; i < l; i++) {
          item = itemMatch[i];
          raw = item; // Remove the list item's bullet
          // so it is seen as the next token.

          space = item.length;
          item = item.replace(/^ *([*+-]|\d+[.)]) */, ''); // Outdent whatever the
          // list item contains. Hacky.

          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
          } // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.


          if (i !== l - 1) {
            b = this.rules.block.bullet.exec(itemMatch[i + 1])[0];

            if (isordered ? b.length === 1 || !isparen && b[b.length - 1] === ')' : b.length > 1 || this.options.smartLists && b !== bull) {
              addBack = itemMatch.slice(i + 1).join('\n');
              list.raw = list.raw.substring(0, list.raw.length - addBack.length);
              i = l - 1;
            }
          } // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.


          loose = next || /\n\n(?!\s*$)/.test(item);

          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          if (loose) {
            list.loose = true;
          } // Check for task list items


          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;

          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          list.items.push({
            type: 'list_item',
            raw: raw,
            task: istask,
            checked: ischecked,
            loose: loose,
            text: item
          });
        }

        return list;
      }
    };

    _proto.html = function html(src) {
      var cap = this.rules.block.html.exec(src);

      if (cap) {
        return {
          type: this.options.sanitize ? 'paragraph' : 'html',
          raw: cap[0],
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    };

    _proto.def = function def(src) {
      var cap = this.rules.block.def.exec(src);

      if (cap) {
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        return {
          tag: tag,
          raw: cap[0],
          href: cap[2],
          title: cap[3]
        };
      }
    };

    _proto.table = function table(src) {
      var cap = this.rules.block.table.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          item.raw = cap[0];
          var l = item.align.length;
          var i;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.cells.length;

          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells$1(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
          }

          return item;
        }
      }
    };

    _proto.lheading = function lheading(src) {
      var cap = this.rules.block.lheading.exec(src);

      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1]
        };
      }
    };

    _proto.paragraph = function paragraph(src) {
      var cap = this.rules.block.paragraph.exec(src);

      if (cap) {
        return {
          type: 'paragraph',
          raw: cap[0],
          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
        };
      }
    };

    _proto.text = function text(src, tokens) {
      var cap = this.rules.block.text.exec(src);

      if (cap) {
        var lastToken = tokens[tokens.length - 1];

        if (lastToken && lastToken.type === 'text') {
          return {
            raw: cap[0],
            text: cap[0]
          };
        }

        return {
          type: 'text',
          raw: cap[0],
          text: cap[0]
        };
      }
    };

    _proto.escape = function escape(src) {
      var cap = this.rules.inline.escape.exec(src);

      if (cap) {
        return {
          type: 'escape',
          raw: cap[0],
          text: _escape(cap[1])
        };
      }
    };

    _proto.tag = function tag(src, inLink, inRawBlock) {
      var cap = this.rules.inline.tag.exec(src);

      if (cap) {
        if (!inLink && /^<a /i.test(cap[0])) {
          inLink = true;
        } else if (inLink && /^<\/a>/i.test(cap[0])) {
          inLink = false;
        }

        if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = true;
        } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = false;
        }

        return {
          type: this.options.sanitize ? 'text' : 'html',
          raw: cap[0],
          inLink: inLink,
          inRawBlock: inRawBlock,
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    };

    _proto.link = function link(src) {
      var cap = this.rules.inline.link.exec(src);

      if (cap) {
        var lastParenIndex = findClosingBracket$1(cap[2], '()');

        if (lastParenIndex > -1) {
          var start = cap[0].indexOf('!') === 0 ? 5 : 4;
          var linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }

        var href = cap[2];
        var title = '';

        if (this.options.pedantic) {
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = '';
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }

        href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
        var token = outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0]);
        return token;
      }
    };

    _proto.reflink = function reflink(src, links) {
      var cap;

      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = links[link.toLowerCase()];

        if (!link || !link.href) {
          var text = cap[0].charAt(0);
          return {
            type: 'text',
            raw: text,
            text: text
          };
        }

        var token = outputLink(cap, link, cap[0]);
        return token;
      }
    };

    _proto.strong = function strong(src, maskedSrc, prevChar) {
      if (prevChar === void 0) {
        prevChar = '';
      }

      var match = this.rules.inline.strong.start.exec(src);

      if (match && (!match[1] || match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
        maskedSrc = maskedSrc.slice(-1 * src.length);
        var endReg = match[0] === '**' ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
        endReg.lastIndex = 0;
        var cap;

        while ((match = endReg.exec(maskedSrc)) != null) {
          cap = this.rules.inline.strong.middle.exec(maskedSrc.slice(0, match.index + 3));

          if (cap) {
            return {
              type: 'strong',
              raw: src.slice(0, cap[0].length),
              text: src.slice(2, cap[0].length - 2)
            };
          }
        }
      }
    };

    _proto.em = function em(src, maskedSrc, prevChar) {
      if (prevChar === void 0) {
        prevChar = '';
      }

      var match = this.rules.inline.em.start.exec(src);

      if (match && (!match[1] || match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
        maskedSrc = maskedSrc.slice(-1 * src.length);
        var endReg = match[0] === '*' ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
        endReg.lastIndex = 0;
        var cap;

        while ((match = endReg.exec(maskedSrc)) != null) {
          cap = this.rules.inline.em.middle.exec(maskedSrc.slice(0, match.index + 2));

          if (cap) {
            return {
              type: 'em',
              raw: src.slice(0, cap[0].length),
              text: src.slice(1, cap[0].length - 1)
            };
          }
        }
      }
    };

    _proto.codespan = function codespan(src) {
      var cap = this.rules.inline.code.exec(src);

      if (cap) {
        var text = cap[2].replace(/\n/g, ' ');
        var hasNonSpaceChars = /[^ ]/.test(text);
        var hasSpaceCharsOnBothEnds = text.startsWith(' ') && text.endsWith(' ');

        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }

        text = _escape(text, true);
        return {
          type: 'codespan',
          raw: cap[0],
          text: text
        };
      }
    };

    _proto.br = function br(src) {
      var cap = this.rules.inline.br.exec(src);

      if (cap) {
        return {
          type: 'br',
          raw: cap[0]
        };
      }
    };

    _proto.del = function del(src) {
      var cap = this.rules.inline.del.exec(src);

      if (cap) {
        return {
          type: 'del',
          raw: cap[0],
          text: cap[1]
        };
      }
    };

    _proto.autolink = function autolink(src, mangle) {
      var cap = this.rules.inline.autolink.exec(src);

      if (cap) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
          href = 'mailto:' + text;
        } else {
          text = _escape(cap[1]);
          href = text;
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    };

    _proto.url = function url(src, mangle) {
      var cap;

      if (cap = this.rules.inline.url.exec(src)) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          var prevCapZero;

          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);

          text = _escape(cap[0]);

          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    };

    _proto.inlineText = function inlineText(src, inRawBlock, smartypants) {
      var cap = this.rules.inline.text.exec(src);

      if (cap) {
        var text;

        if (inRawBlock) {
          text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
        } else {
          text = _escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
        }

        return {
          type: 'text',
          raw: cap[0],
          text: text
        };
      }
    };

    return Tokenizer;
  }();

  var noopTest$1 = helpers.noopTest,
      edit$1 = helpers.edit,
      merge$1 = helpers.merge;
  /**
   * Block-Level Grammar
   */

  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: noopTest$1,
    table: noopTest$1,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit$1(block.def).replace('label', block._label).replace('title', block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
  block.item = edit$1(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
  block.list = edit$1(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
  block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
  block._comment = /<!--(?!-?>)[\s\S]*?-->/;
  block.html = edit$1(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block.paragraph = edit$1(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();
  block.blockquote = edit$1(block.blockquote).replace('paragraph', block.paragraph).getRegex();
  /**
   * Normal Block Grammar
   */

  block.normal = merge$1({}, block);
  /**
   * GFM Block Grammar
   */

  block.gfm = merge$1({}, block.normal, {
    nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
    + ' *([-:]+ *\\|[-| :]*)' // Align
    + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
    // Cells
    table: '^ *\\|(.+)\\n' // Header
    + ' *\\|?( *[-:]+[-| :]*)' // Align
    + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells

  });
  block.gfm.nptable = edit$1(block.gfm.nptable).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();
  block.gfm.table = edit$1(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();
  /**
   * Pedantic grammar (original John Gruber's loose markdown specification)
   */

  block.pedantic = merge$1({}, block.normal, {
    html: edit$1('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    fences: noopTest$1,
    // fences not supported
    paragraph: edit$1(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
  });
  /**
   * Inline-Level Grammar
   */

  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest$1,
    tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    // CDATA section
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    reflinkSearch: 'reflink|nolink(?!\\()',
    strong: {
      start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
      // (1) returns if starts w/ punctuation
      middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
      endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation\s]|$))/,
      // last char can't be punct, or final * must also be followed by punct (or endline)
      endUnd: /[^\s]__(?!_)(?:(?=[punctuation\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)

    },
    em: {
      start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
      // (1) returns if starts w/ punctuation
      middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
      endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation\s]|$))/,
      // last char can't be punct, or final * must also be followed by punct (or endline)
      endUnd: /[^\s]_(?!_)(?:(?=[punctuation\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)

    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest$1,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,
    punctuation: /^([\s*punctuation])/
  }; // list of punctuation marks from common mark spec
  // without * and _ to workaround cases with double emphasis

  inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
  inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex(); // sequences em should skip over [title](link), `code`, <html>

  inline._blockSkip = '\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>';
  inline._overlapSkip = '__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*';
  inline.em.start = edit$1(inline.em.start).replace(/punctuation/g, inline._punctuation).getRegex();
  inline.em.middle = edit$1(inline.em.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
  inline.em.endAst = edit$1(inline.em.endAst, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.em.endUnd = edit$1(inline.em.endUnd, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.strong.start = edit$1(inline.strong.start).replace(/punctuation/g, inline._punctuation).getRegex();
  inline.strong.middle = edit$1(inline.strong.middle).replace(/punctuation/g, inline._punctuation).replace(/blockSkip/g, inline._blockSkip).getRegex();
  inline.strong.endAst = edit$1(inline.strong.endAst, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.strong.endUnd = edit$1(inline.strong.endUnd, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.blockSkip = edit$1(inline._blockSkip, 'g').getRegex();
  inline.overlapSkip = edit$1(inline._overlapSkip, 'g').getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit$1(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit$1(inline.tag).replace('comment', block._comment).replace('attribute', inline._attribute).getRegex();
  inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit$1(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
  inline.reflink = edit$1(inline.reflink).replace('label', inline._label).getRegex();
  inline.reflinkSearch = edit$1(inline.reflinkSearch, 'g').replace('reflink', inline.reflink).replace('nolink', inline.nolink).getRegex();
  /**
   * Normal Inline Grammar
   */

  inline.normal = merge$1({}, inline);
  /**
   * Pedantic Inline Grammar
   */

  inline.pedantic = merge$1({}, inline.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: edit$1(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
    reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
  });
  /**
   * GFM Inline Grammar
   */

  inline.gfm = merge$1({}, inline.normal, {
    escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });
  inline.gfm.url = edit$1(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline.breaks = merge$1({}, inline.gfm, {
    br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
    text: edit$1(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
  });
  var rules = {
    block: block,
    inline: inline
  };

  var defaults$2 = defaults.defaults;
  var block$1 = rules.block,
      inline$1 = rules.inline;
  /**
   * smartypants text replacement
   */

  function smartypants(text) {
    return text // em-dashes
    .replace(/---/g, "\u2014") // en-dashes
    .replace(/--/g, "\u2013") // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018") // closing singles & apostrophes
    .replace(/'/g, "\u2019") // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C") // closing doubles
    .replace(/"/g, "\u201D") // ellipses
    .replace(/\.{3}/g, "\u2026");
  }
  /**
   * mangle email addresses
   */


  function mangle(text) {
    var out = '',
        i,
        ch;
    var l = text.length;

    for (i = 0; i < l; i++) {
      ch = text.charCodeAt(i);

      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }

      out += '&#' + ch + ';';
    }

    return out;
  }
  /**
   * Block Lexer
   */


  var Lexer_1 = /*#__PURE__*/function () {
    function Lexer(options) {
      this.tokens = [];
      this.tokens.links = Object.create(null);
      this.options = options || defaults$2;
      this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      var rules = {
        block: block$1.normal,
        inline: inline$1.normal
      };

      if (this.options.pedantic) {
        rules.block = block$1.pedantic;
        rules.inline = inline$1.pedantic;
      } else if (this.options.gfm) {
        rules.block = block$1.gfm;

        if (this.options.breaks) {
          rules.inline = inline$1.breaks;
        } else {
          rules.inline = inline$1.gfm;
        }
      }

      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */


    /**
     * Static Lex Method
     */
    Lexer.lex = function lex(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    }
    /**
     * Preprocessing
     */
    ;

    var _proto = Lexer.prototype;

    _proto.lex = function lex(src) {
      src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ');
      this.blockTokens(src, this.tokens, true);
      this.inline(this.tokens);
      return this.tokens;
    }
    /**
     * Lexing
     */
    ;

    _proto.blockTokens = function blockTokens(src, tokens, top) {
      if (tokens === void 0) {
        tokens = [];
      }

      if (top === void 0) {
        top = true;
      }

      src = src.replace(/^ +$/gm, '');
      var token, i, l, lastToken;

      while (src) {
        // newline
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // code


        if (token = this.tokenizer.code(src, tokens)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          } else {
            lastToken = tokens[tokens.length - 1];
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          }

          continue;
        } // fences


        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // heading


        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // table no leading pipe (gfm)


        if (token = this.tokenizer.nptable(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // hr


        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // blockquote


        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.blockTokens(token.text, [], top);
          tokens.push(token);
          continue;
        } // list


        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          l = token.items.length;

          for (i = 0; i < l; i++) {
            token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
          }

          tokens.push(token);
          continue;
        } // html


        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // def


        if (top && (token = this.tokenizer.def(src))) {
          src = src.substring(token.raw.length);

          if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }

          continue;
        } // table (gfm)


        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // lheading


        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // top-level paragraph


        if (top && (token = this.tokenizer.paragraph(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text


        if (token = this.tokenizer.text(src, tokens)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          } else {
            lastToken = tokens[tokens.length - 1];
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          }

          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    };

    _proto.inline = function inline(tokens) {
      var i, j, k, l2, row, token;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'paragraph':
          case 'text':
          case 'heading':
            {
              token.tokens = [];
              this.inlineTokens(token.text, token.tokens);
              break;
            }

          case 'table':
            {
              token.tokens = {
                header: [],
                cells: []
              }; // header

              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                token.tokens.header[j] = [];
                this.inlineTokens(token.header[j], token.tokens.header[j]);
              } // cells


              l2 = token.cells.length;

              for (j = 0; j < l2; j++) {
                row = token.cells[j];
                token.tokens.cells[j] = [];

                for (k = 0; k < row.length; k++) {
                  token.tokens.cells[j][k] = [];
                  this.inlineTokens(row[k], token.tokens.cells[j][k]);
                }
              }

              break;
            }

          case 'blockquote':
            {
              this.inline(token.tokens);
              break;
            }

          case 'list':
            {
              l2 = token.items.length;

              for (j = 0; j < l2; j++) {
                this.inline(token.items[j].tokens);
              }

              break;
            }
        }
      }

      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    ;

    _proto.inlineTokens = function inlineTokens(src, tokens, inLink, inRawBlock, prevChar) {
      if (tokens === void 0) {
        tokens = [];
      }

      if (inLink === void 0) {
        inLink = false;
      }

      if (inRawBlock === void 0) {
        inRawBlock = false;
      }

      if (prevChar === void 0) {
        prevChar = '';
      }

      var token; // String with links masked to avoid interference with em and strong

      var maskedSrc = src;
      var match; // Mask out reflinks

      if (this.tokens.links) {
        var links = Object.keys(this.tokens.links);

        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      } // Mask out other blocks


      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }

      while (src) {
        // escape
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // tag


        if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
          src = src.substring(token.raw.length);
          inLink = token.inLink;
          inRawBlock = token.inRawBlock;
          tokens.push(token);
          continue;
        } // link


        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);

          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }

          tokens.push(token);
          continue;
        } // reflink, nolink


        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);

          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }

          tokens.push(token);
          continue;
        } // strong


        if (token = this.tokenizer.strong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // em


        if (token = this.tokenizer.em(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // code


        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // br


        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // del (gfm)


        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // autolink


        if (token = this.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // url (gfm)


        if (!inLink && (token = this.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text


        if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
          src = src.substring(token.raw.length);
          prevChar = token.raw.slice(-1);
          tokens.push(token);
          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    };

    _createClass(Lexer, null, [{
      key: "rules",
      get: function get() {
        return {
          block: block$1,
          inline: inline$1
        };
      }
    }]);

    return Lexer;
  }();

  var defaults$3 = defaults.defaults;
  var cleanUrl$1 = helpers.cleanUrl,
      escape$1 = helpers.escape;
  /**
   * Renderer
   */

  var Renderer_1 = /*#__PURE__*/function () {
    function Renderer(options) {
      this.options = options || defaults$3;
    }

    var _proto = Renderer.prototype;

    _proto.code = function code(_code, infostring, escaped) {
      var lang = (infostring || '').match(/\S*/)[0];

      if (this.options.highlight) {
        var out = this.options.highlight(_code, lang);

        if (out != null && out !== _code) {
          escaped = true;
          _code = out;
        }
      }

      if (!lang) {
        return '<pre><code>' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
      }

      return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
    };

    _proto.blockquote = function blockquote(quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    };

    _proto.html = function html(_html) {
      return _html;
    };

    _proto.heading = function heading(text, level, raw, slugger) {
      if (this.options.headerIds) {
        return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
      } // ignore IDs


      return '<h' + level + '>' + text + '</h' + level + '>\n';
    };

    _proto.hr = function hr() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    };

    _proto.list = function list(body, ordered, start) {
      var type = ordered ? 'ol' : 'ul',
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
      return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    };

    _proto.listitem = function listitem(text) {
      return '<li>' + text + '</li>\n';
    };

    _proto.checkbox = function checkbox(checked) {
      return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
    };

    _proto.paragraph = function paragraph(text) {
      return '<p>' + text + '</p>\n';
    };

    _proto.table = function table(header, body) {
      if (body) body = '<tbody>' + body + '</tbody>';
      return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    };

    _proto.tablerow = function tablerow(content) {
      return '<tr>\n' + content + '</tr>\n';
    };

    _proto.tablecell = function tablecell(content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    } // span level renderer
    ;

    _proto.strong = function strong(text) {
      return '<strong>' + text + '</strong>';
    };

    _proto.em = function em(text) {
      return '<em>' + text + '</em>';
    };

    _proto.codespan = function codespan(text) {
      return '<code>' + text + '</code>';
    };

    _proto.br = function br() {
      return this.options.xhtml ? '<br/>' : '<br>';
    };

    _proto.del = function del(text) {
      return '<del>' + text + '</del>';
    };

    _proto.link = function link(href, title, text) {
      href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<a href="' + escape$1(href) + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += '>' + text + '</a>';
      return out;
    };

    _proto.image = function image(href, title, text) {
      href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<img src="' + href + '" alt="' + text + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += this.options.xhtml ? '/>' : '>';
      return out;
    };

    _proto.text = function text(_text) {
      return _text;
    };

    return Renderer;
  }();

  /**
   * TextRenderer
   * returns only the textual part of the token
   */
  var TextRenderer_1 = /*#__PURE__*/function () {
    function TextRenderer() {}

    var _proto = TextRenderer.prototype;

    // no need for block level renderers
    _proto.strong = function strong(text) {
      return text;
    };

    _proto.em = function em(text) {
      return text;
    };

    _proto.codespan = function codespan(text) {
      return text;
    };

    _proto.del = function del(text) {
      return text;
    };

    _proto.html = function html(text) {
      return text;
    };

    _proto.text = function text(_text) {
      return _text;
    };

    _proto.link = function link(href, title, text) {
      return '' + text;
    };

    _proto.image = function image(href, title, text) {
      return '' + text;
    };

    _proto.br = function br() {
      return '';
    };

    return TextRenderer;
  }();

  /**
   * Slugger generates header id
   */
  var Slugger_1 = /*#__PURE__*/function () {
    function Slugger() {
      this.seen = {};
    }
    /**
     * Convert string to unique id
     */


    var _proto = Slugger.prototype;

    _proto.slug = function slug(value) {
      var slug = value.toLowerCase().trim() // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '') // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');

      if (this.seen.hasOwnProperty(slug)) {
        var originalSlug = slug;

        do {
          this.seen[originalSlug]++;
          slug = originalSlug + '-' + this.seen[originalSlug];
        } while (this.seen.hasOwnProperty(slug));
      }

      this.seen[slug] = 0;
      return slug;
    };

    return Slugger;
  }();

  var defaults$4 = defaults.defaults;
  var unescape$1 = helpers.unescape;
  /**
   * Parsing & Compiling
   */

  var Parser_1 = /*#__PURE__*/function () {
    function Parser(options) {
      this.options = options || defaults$4;
      this.options.renderer = this.options.renderer || new Renderer_1();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new TextRenderer_1();
      this.slugger = new Slugger_1();
    }
    /**
     * Static Parse Method
     */


    Parser.parse = function parse(tokens, options) {
      var parser = new Parser(options);
      return parser.parse(tokens);
    }
    /**
     * Parse Loop
     */
    ;

    var _proto = Parser.prototype;

    _proto.parse = function parse(tokens, top) {
      if (top === void 0) {
        top = true;
      }

      var out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'space':
            {
              continue;
            }

          case 'hr':
            {
              out += this.renderer.hr();
              continue;
            }

          case 'heading':
            {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape$1(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }

          case 'code':
            {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }

          case 'table':
            {
              header = ''; // header

              cell = '';
              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.tokens.header[j]), {
                  header: true,
                  align: token.align[j]
                });
              }

              header += this.renderer.tablerow(cell);
              body = '';
              l2 = token.cells.length;

              for (j = 0; j < l2; j++) {
                row = token.tokens.cells[j];
                cell = '';
                l3 = row.length;

                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k]), {
                    header: false,
                    align: token.align[k]
                  });
                }

                body += this.renderer.tablerow(cell);
              }

              out += this.renderer.table(header, body);
              continue;
            }

          case 'blockquote':
            {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }

          case 'list':
            {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = '';

              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = '';

                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);

                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                      item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;

                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: 'text',
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }

                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }

              out += this.renderer.list(body, ordered, start);
              continue;
            }

          case 'html':
            {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }

          case 'paragraph':
            {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }

          case 'text':
            {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;

              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }

              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    }
    /**
     * Parse Inline Tokens
     */
    ;

    _proto.parseInline = function parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      var out = '',
          i,
          token;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'escape':
            {
              out += renderer.text(token.text);
              break;
            }

          case 'html':
            {
              out += renderer.html(token.text);
              break;
            }

          case 'link':
            {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }

          case 'image':
            {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }

          case 'strong':
            {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'em':
            {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'codespan':
            {
              out += renderer.codespan(token.text);
              break;
            }

          case 'br':
            {
              out += renderer.br();
              break;
            }

          case 'del':
            {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'text':
            {
              out += renderer.text(token.text);
              break;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    };

    return Parser;
  }();

  var merge$2 = helpers.merge,
      checkSanitizeDeprecation$1 = helpers.checkSanitizeDeprecation,
      escape$2 = helpers.escape;
  var getDefaults = defaults.getDefaults,
      changeDefaults = defaults.changeDefaults,
      defaults$5 = defaults.defaults;
  /**
   * Marked
   */

  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }

    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }

    if (typeof opt === 'function') {
      callback = opt;
      opt = null;
    }

    opt = merge$2({}, marked.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);

    if (callback) {
      var highlight = opt.highlight;
      var tokens;

      try {
        tokens = Lexer_1.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      var done = function done(err) {
        var out;

        if (!err) {
          try {
            out = Parser_1.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
        }

        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;
      if (!tokens.length) return done();
      var pending = 0;
      marked.walkTokens(tokens, function (token) {
        if (token.type === 'code') {
          pending++;
          setTimeout(function () {
            highlight(token.text, token.lang, function (err, code) {
              if (err) {
                return done(err);
              }

              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }

              pending--;

              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });

      if (pending === 0) {
        done();
      }

      return;
    }

    try {
      var _tokens = Lexer_1.lex(src, opt);

      if (opt.walkTokens) {
        marked.walkTokens(_tokens, opt.walkTokens);
      }

      return Parser_1.parse(_tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';

      if (opt.silent) {
        return '<p>An error occurred:</p><pre>' + escape$2(e.message + '', true) + '</pre>';
      }

      throw e;
    }
  }
  /**
   * Options
   */


  marked.options = marked.setOptions = function (opt) {
    merge$2(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };

  marked.getDefaults = getDefaults;
  marked.defaults = defaults$5;
  /**
   * Use Extension
   */

  marked.use = function (extension) {
    var opts = merge$2({}, extension);

    if (extension.renderer) {
      (function () {
        var renderer = marked.defaults.renderer || new Renderer_1();

        var _loop = function _loop(prop) {
          var prevRenderer = renderer[prop];

          renderer[prop] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var ret = extension.renderer[prop].apply(renderer, args);

            if (ret === false) {
              ret = prevRenderer.apply(renderer, args);
            }

            return ret;
          };
        };

        for (var prop in extension.renderer) {
          _loop(prop);
        }

        opts.renderer = renderer;
      })();
    }

    if (extension.tokenizer) {
      (function () {
        var tokenizer = marked.defaults.tokenizer || new Tokenizer_1();

        var _loop2 = function _loop2(prop) {
          var prevTokenizer = tokenizer[prop];

          tokenizer[prop] = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var ret = extension.tokenizer[prop].apply(tokenizer, args);

            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args);
            }

            return ret;
          };
        };

        for (var prop in extension.tokenizer) {
          _loop2(prop);
        }

        opts.tokenizer = tokenizer;
      })();
    }

    if (extension.walkTokens) {
      var walkTokens = marked.defaults.walkTokens;

      opts.walkTokens = function (token) {
        extension.walkTokens(token);

        if (walkTokens) {
          walkTokens(token);
        }
      };
    }

    marked.setOptions(opts);
  };
  /**
   * Run callback for every token
   */


  marked.walkTokens = function (tokens, callback) {
    for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
      var token = _step.value;
      callback(token);

      switch (token.type) {
        case 'table':
          {
            for (var _iterator2 = _createForOfIteratorHelperLoose(token.tokens.header), _step2; !(_step2 = _iterator2()).done;) {
              var cell = _step2.value;
              marked.walkTokens(cell, callback);
            }

            for (var _iterator3 = _createForOfIteratorHelperLoose(token.tokens.cells), _step3; !(_step3 = _iterator3()).done;) {
              var row = _step3.value;

              for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done;) {
                var _cell = _step4.value;
                marked.walkTokens(_cell, callback);
              }
            }

            break;
          }

        case 'list':
          {
            marked.walkTokens(token.items, callback);
            break;
          }

        default:
          {
            if (token.tokens) {
              marked.walkTokens(token.tokens, callback);
            }
          }
      }
    }
  };
  /**
   * Expose
   */


  marked.Parser = Parser_1;
  marked.parser = Parser_1.parse;
  marked.Renderer = Renderer_1;
  marked.TextRenderer = TextRenderer_1;
  marked.Lexer = Lexer_1;
  marked.lexer = Lexer_1.lex;
  marked.Tokenizer = Tokenizer_1;
  marked.Slugger = Slugger_1;
  marked.parse = marked;
  var marked_1 = marked;

  return marked_1;

})));


/***/ }),

/***/ "0f7c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("688e");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "1696":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "19aa":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "19e9":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	autosize 4.0.2
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else { var mod; }
})(this, function (module, exports) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			delete: function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	}();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function createEvent(name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = null;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				return;
			}

			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = '';
			ta.style.height = ta.scrollHeight + heightOffset + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that 
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight < styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map.delete(ta);
		}.bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function autosize(el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function autosize(el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	exports.default = autosize;
	module.exports = exports['default'];
});

/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1cdc":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "1d2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "2057":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),

/***/ "21d0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
	} catch (_) {
		reflectApply = null;
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = reflectApply
	? function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ }),

/***/ "2266":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var bind = __webpack_require__("0366");
var getIteratorMethod = __webpack_require__("35a1");
var callWithSafeIterationClosing = __webpack_require__("9bdd");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2444":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("c532");
var normalizeHeaderName = __webpack_require__("c8af");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("b50d");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__("b50d");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2a1a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var callBind = __webpack_require__("44b7");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "2a6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

var callBound = __webpack_require__("2a1a");

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

// eslint-disable-next-line max-params
module.exports = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
	if (!$defineProperty) {
		if (!IsDataDescriptor(desc)) {
			// ES3 does not support getters/setters
			return false;
		}
		if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
			return false;
		}

		// fallback for ES3
		if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
			// a non-enumerable existing property
			return false;
		}

		// property does not exist at all, or exists but is enumerable
		var V = desc['[[Value]]'];
		// eslint-disable-next-line no-param-reassign
		O[P] = V; // will use [[Define]]
		return SameValue(O[P], V);
	}
	$defineProperty(O, P, FromPropertyDescriptor(desc));
	return true;
};


/***/ }),

/***/ "2af4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmojiList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4600");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmojiList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmojiList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmojiList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmojiList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmojiList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2b80":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * UAParser.js v0.7.21
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.21',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser
            /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,                      // Baidu Browser
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            ], [NAME, VERSION], [

            /(konqueror)\/([\w\.]+)/i                                           // Konqueror
            ], [[NAME, 'Konqueror'], VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i                          // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(Avast)\/([\w\.]+)/i                                               // Avast Secure Browser
            ], [[NAME, 'Avast Secure Browser'], VERSION], [

            /(AVG)\/([\w\.]+)/i                                                 // AVG Secure Browser
            ], [[NAME, 'AVG Secure Browser'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /(focus)\/([\w\.]+)/i                                               // Firefox Focus
            ], [[NAME, 'Firefox Focus'], VERSION], [

            /(opt)\/([\w\.]+)/i                                                 // Opera Touch
            ], [[NAME, 'Opera Touch'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(windowswechat qbcore)\/([\w\.]+)/i                                // WeChat Desktop for Windows Built-in Browser
            ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(brave)\/([\w\.]+)/i                                               // Brave browser
            ], [[NAME, 'Brave'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(baiduboxapp)[\/\s]?([\w\.]+)/i                                    // Baidu App
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
            ], [NAME, VERSION], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(sailfishbrowser)\/([\w\.]+)/i                                     // Sailfish Browser
            ], [[NAME, 'Sailfish Browser'], VERSION], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
            ], [[NAME, '360 Browser']], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i                        // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
            /android.+aft([bms])\sbuild/i                                       // Fire TV
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,                        // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i                              // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /android.+(bah2?-a?[lw]\d{2})/i                                     // Huawei MediaPad
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i                   // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i             // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [
            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
            /(lenovo)[_\s-]?([\w-]+)/i
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)[\s)]/i                                       // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel( [23])?( xl)?)[\s)]/i                              // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    
                                                                                // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
            /(mz)-([\w-]{2,})/i
            ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})[\s)]/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+;\s(PH-1)\s/i
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /[\s\/\(](smart-?tv)[;\)]/i                                         // SmartTV
            ], [[TYPE, SMARTTV]], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,     
                                                                                // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return UAParser;
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


/***/ }),

/***/ "2c92":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = __webpack_require__("4906");
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://www.ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}


/***/ }),

/***/ "2cf4":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");
var bind = __webpack_require__("0366");
var html = __webpack_require__("1be4");
var createElement = __webpack_require__("cc12");
var IS_IOS = __webpack_require__("1cdc");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    !fails(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "2d83":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("387f");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "2e67":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "30b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "35d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesToShadowDOM; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesShadow.js


function addStylesToShadowDOM (parentId, list, shadowRoot) {
  var styles = listToStyles(parentId, list)
  addStyles(styles, shadowRoot)
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

function addStyles (styles /* Array<StyleObject> */, shadowRoot) {
  const injectedStyles =
    shadowRoot._injectedStyles ||
    (shadowRoot._injectedStyles = {})
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var style = injectedStyles[item.id]
    if (!style) {
      for (var j = 0; j < item.parts.length; j++) {
        addStyle(item.parts[j], shadowRoot)
      }
      injectedStyles[item.id] = true
    }
  }
}

function createStyleElement (shadowRoot) {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  shadowRoot.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */, shadowRoot) {
  var styleElement = createStyleElement(shadowRoot)
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "387f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "38a1":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".category-title.经典{margin-top:8px!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "3934":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3d27":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES5Type = __webpack_require__("5183");

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};


/***/ }),

/***/ "3e4b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__("a0d3");

var assertRecord = __webpack_require__("c46d");

var Type = __webpack_require__("3d27");

// https://www.ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "42bf":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*!\n * Viewer.js v1.6.1\n * https://fengyuanchen.github.io/viewerjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2020-06-14T07:47:15.792Z\n */.viewer-close:before,.viewer-flip-horizontal:before,.viewer-flip-vertical:before,.viewer-fullscreen-exit:before,.viewer-fullscreen:before,.viewer-next:before,.viewer-one-to-one:before,.viewer-play:before,.viewer-prev:before,.viewer-reset:before,.viewer-rotate-left:before,.viewer-rotate-right:before,.viewer-zoom-in:before,.viewer-zoom-out:before{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-size:280px;color:transparent;display:block;font-size:0;height:20px;line-height:0;width:20px}.viewer-zoom-in:before{background-position:0 0;content:\"Zoom In\"}.viewer-zoom-out:before{background-position:-20px 0;content:\"Zoom Out\"}.viewer-one-to-one:before{background-position:-40px 0;content:\"One to One\"}.viewer-reset:before{background-position:-60px 0;content:\"Reset\"}.viewer-prev:before{background-position:-80px 0;content:\"Previous\"}.viewer-play:before{background-position:-100px 0;content:\"Play\"}.viewer-next:before{background-position:-120px 0;content:\"Next\"}.viewer-rotate-left:before{background-position:-140px 0;content:\"Rotate Left\"}.viewer-rotate-right:before{background-position:-160px 0;content:\"Rotate Right\"}.viewer-flip-horizontal:before{background-position:-180px 0;content:\"Flip Horizontal\"}.viewer-flip-vertical:before{background-position:-200px 0;content:\"Flip Vertical\"}.viewer-fullscreen:before{background-position:-220px 0;content:\"Enter Full Screen\"}.viewer-fullscreen-exit:before{background-position:-240px 0;content:\"Exit Full Screen\"}.viewer-close:before{background-position:-260px 0;content:\"Close\"}.viewer-container{bottom:0;direction:ltr;font-size:0;left:0;line-height:0;overflow:hidden;position:absolute;right:0;-webkit-tap-highlight-color:transparent;top:0;-ms-touch-action:none;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.viewer-container::-moz-selection,.viewer-container ::-moz-selection{background-color:transparent}.viewer-container::selection,.viewer-container ::selection{background-color:transparent}.viewer-container img{display:block;height:auto;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.viewer-canvas{bottom:0;left:0;overflow:hidden;position:absolute;right:0;top:0}.viewer-canvas>img{height:auto;margin:15px auto;max-width:90%!important;width:auto}.viewer-footer{bottom:0;left:0;overflow:hidden;position:absolute;right:0;text-align:center}.viewer-navbar{background-color:rgba(0,0,0,.5);overflow:hidden}.viewer-list{-webkit-box-sizing:content-box;box-sizing:content-box;height:50px;margin:0;overflow:hidden;padding:1px 0}.viewer-list>li{color:transparent;cursor:pointer;float:left;font-size:0;height:50px;line-height:0;opacity:.5;overflow:hidden;-webkit-transition:opacity .15s;transition:opacity .15s;width:30px}.viewer-list>li:hover{opacity:.75}.viewer-list>li+li{margin-left:1px}.viewer-list>.viewer-loading{position:relative}.viewer-list>.viewer-loading:after{border-width:2px;height:20px;margin-left:-10px;margin-top:-10px;width:20px}.viewer-list>.viewer-active,.viewer-list>.viewer-active:hover{opacity:1}.viewer-player{background-color:#000;bottom:0;cursor:none;display:none;right:0}.viewer-player,.viewer-player>img{left:0;position:absolute;top:0}.viewer-toolbar>ul{display:inline-block;margin:0 auto 5px;overflow:hidden;padding:3px 0}.viewer-toolbar>ul>li{background-color:rgba(0,0,0,.5);border-radius:50%;cursor:pointer;float:left;height:24px;overflow:hidden;-webkit-transition:background-color .15s;transition:background-color .15s;width:24px}.viewer-toolbar>ul>li:hover{background-color:rgba(0,0,0,.8)}.viewer-toolbar>ul>li:before{margin:2px}.viewer-toolbar>ul>li+li{margin-left:1px}.viewer-toolbar>ul>.viewer-small{height:18px;margin-bottom:3px;margin-top:3px;width:18px}.viewer-toolbar>ul>.viewer-small:before{margin:-1px}.viewer-toolbar>ul>.viewer-large{height:30px;margin-bottom:-3px;margin-top:-3px;width:30px}.viewer-toolbar>ul>.viewer-large:before{margin:5px}.viewer-tooltip{background-color:rgba(0,0,0,.8);border-radius:10px;color:#fff;display:none;font-size:12px;height:20px;left:50%;line-height:20px;margin-left:-25px;margin-top:-10px;position:absolute;text-align:center;top:50%;width:50px}.viewer-title{color:#ccc;display:inline-block;font-size:12px;line-height:1;margin:0 5% 5px;max-width:90%;opacity:.8;overflow:hidden;text-overflow:ellipsis;-webkit-transition:opacity .15s;transition:opacity .15s;white-space:nowrap}.viewer-title:hover{opacity:1}.viewer-button{background-color:rgba(0,0,0,.5);border-radius:50%;cursor:pointer;height:80px;overflow:hidden;position:absolute;right:-40px;top:-40px;-webkit-transition:background-color .15s;transition:background-color .15s;width:80px}.viewer-button:focus,.viewer-button:hover{background-color:rgba(0,0,0,.8)}.viewer-button:before{bottom:15px;left:15px;position:absolute}.viewer-fixed{position:fixed}.viewer-open{overflow:hidden}.viewer-show{display:block}.viewer-hide{display:none}.viewer-backdrop{background-color:rgba(0,0,0,.5)}.viewer-invisible{visibility:hidden}.viewer-move{cursor:move;cursor:-webkit-grab;cursor:grab}.viewer-fade{opacity:0}.viewer-in{opacity:1}.viewer-transition{-webkit-transition:all .3s;transition:all .3s}@-webkit-keyframes viewer-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes viewer-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.viewer-loading:after{-webkit-animation:viewer-spinner 1s linear infinite;animation:viewer-spinner 1s linear infinite;border:4px solid hsla(0,0%,100%,.1);border-left-color:hsla(0,0%,100%,.5);border-radius:50%;content:\"\";display:inline-block;height:40px;left:50%;margin-left:-20px;margin-top:-20px;position:absolute;top:50%;width:40px;z-index:1}@media (max-width:767px){.viewer-hide-xs-down{display:none}}@media (max-width:991px){.viewer-hide-sm-down{display:none}}@media (max-width:1199px){.viewer-hide-md-down{display:none}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "437b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fe24");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("e060ca56", content, shadowRoot)
};

/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44b7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("0f7c");

var GetIntrinsic = __webpack_require__("e9ac");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

module.exports = function callBind() {
	return $reflectApply(bind, $call, arguments);
};

module.exports.apply = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44de":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "4600":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("38a1");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("0ebc04d1", content, shadowRoot)
};

/***/ }),

/***/ "467f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("2d83");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4906":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = __webpack_require__("fffd");
var DefineOwnProperty = __webpack_require__("2a6d");

var FromPropertyDescriptor = __webpack_require__("9dc9");
var IsAccessorDescriptor = __webpack_require__("9c74");
var IsDataDescriptor = __webpack_require__("3e4b");
var IsPropertyKey = __webpack_require__("63d2");
var SameValue = __webpack_require__("dbbe");
var ToPropertyDescriptor = __webpack_require__("ee7e");
var Type = __webpack_require__("3d27");

// https://www.ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "4a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "4d63":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var inheritIfRequired = __webpack_require__("7156");
var defineProperty = __webpack_require__("9bf2").f;
var getOwnPropertyNames = __webpack_require__("241c").f;
var isRegExp = __webpack_require__("44e7");
var getFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var setInternalState = __webpack_require__("69f3").set;
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5156":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__("1696");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "5183":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://www.ecma-international.org/ecma-262/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};


/***/ }),

/***/ "522d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__("be77");

var getPolyfill = __webpack_require__("8926");
var define = __webpack_require__("f367");

module.exports = function shimPromiseFinally() {
	requirePromise();

	var polyfill = getPolyfill();
	define(Promise.prototype, { 'finally': polyfill }, {
		'finally': function testFinally() {
			return Promise.prototype['finally'] !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "5270":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var transformData = __webpack_require__("c401");
var isCancel = __webpack_require__("2e67");
var defaults = __webpack_require__("2444");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5a74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (Object({"NODE_ENV":"production","BASE_URL":"/"}).NEED_CURRENTSCRIPT_POLYFILL) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("8bbf");
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./node_modules/@vue/web-component-wrapper/dist/vue-wc-wrapper.js
const camelizeRE = /-(\w)/g;
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
};

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
};

function getInitialProps (propsList) {
  const res = {};
  propsList.forEach(key => {
    res[key] = undefined;
  });
  return res
}

function injectHook (options, key, hook) {
  options[key] = [].concat(options[key] || []);
  options[key].unshift(hook);
}

function callHooks (vm, hook) {
  if (vm) {
    const hooks = vm.$options[hook] || [];
    hooks.forEach(hook => {
      hook.call(vm);
    });
  }
}

function createCustomEvent (name, args) {
  return new CustomEvent(name, {
    bubbles: false,
    cancelable: false,
    detail: args
  })
}

const isBoolean = val => /function Boolean/.test(String(val));
const isNumber = val => /function Number/.test(String(val));

function convertAttributeValue (value, name, { type } = {}) {
  if (isBoolean(type)) {
    if (value === 'true' || value === 'false') {
      return value === 'true'
    }
    if (value === '' || value === name) {
      return true
    }
    return value != null
  } else if (isNumber(type)) {
    const parsed = parseFloat(value, 10);
    return isNaN(parsed) ? value : parsed
  } else {
    return value
  }
}

function toVNodes (h, children) {
  const res = [];
  for (let i = 0, l = children.length; i < l; i++) {
    res.push(toVNode(h, children[i]));
  }
  return res
}

function toVNode (h, node) {
  if (node.nodeType === 3) {
    return node.data.trim() ? node.data : null
  } else if (node.nodeType === 1) {
    const data = {
      attrs: getAttributes(node),
      domProps: {
        innerHTML: node.innerHTML
      }
    };
    if (data.attrs.slot) {
      data.slot = data.attrs.slot;
      delete data.attrs.slot;
    }
    return h(node.tagName, data)
  } else {
    return null
  }
}

function getAttributes (node) {
  const res = {};
  for (let i = 0, l = node.attributes.length; i < l; i++) {
    const attr = node.attributes[i];
    res[attr.nodeName] = attr.nodeValue;
  }
  return res
}

function wrap (Vue, Component) {
  const isAsync = typeof Component === 'function' && !Component.cid;
  let isInitialized = false;
  let hyphenatedPropsList;
  let camelizedPropsList;
  let camelizedPropsMap;

  function initialize (Component) {
    if (isInitialized) return

    const options = typeof Component === 'function'
      ? Component.options
      : Component;

    // extract props info
    const propsList = Array.isArray(options.props)
      ? options.props
      : Object.keys(options.props || {});
    hyphenatedPropsList = propsList.map(hyphenate);
    camelizedPropsList = propsList.map(camelize);
    const originalPropsAsObject = Array.isArray(options.props) ? {} : options.props || {};
    camelizedPropsMap = camelizedPropsList.reduce((map, key, i) => {
      map[key] = originalPropsAsObject[propsList[i]];
      return map
    }, {});

    // proxy $emit to native DOM events
    injectHook(options, 'beforeCreate', function () {
      const emit = this.$emit;
      this.$emit = (name, ...args) => {
        this.$root.$options.customElement.dispatchEvent(createCustomEvent(name, args));
        return emit.call(this, name, ...args)
      };
    });

    injectHook(options, 'created', function () {
      // sync default props values to wrapper on created
      camelizedPropsList.forEach(key => {
        this.$root.props[key] = this[key];
      });
    });

    // proxy props as Element properties
    camelizedPropsList.forEach(key => {
      Object.defineProperty(CustomElement.prototype, key, {
        get () {
          return this._wrapper.props[key]
        },
        set (newVal) {
          this._wrapper.props[key] = newVal;
        },
        enumerable: false,
        configurable: true
      });
    });

    isInitialized = true;
  }

  function syncAttribute (el, key) {
    const camelized = camelize(key);
    const value = el.hasAttribute(key) ? el.getAttribute(key) : undefined;
    el._wrapper.props[camelized] = convertAttributeValue(
      value,
      key,
      camelizedPropsMap[camelized]
    );
  }

  class CustomElement extends HTMLElement {
    constructor () {
      super();
      this.attachShadow({ mode: 'open' });

      const wrapper = this._wrapper = new Vue({
        name: 'shadow-root',
        customElement: this,
        shadowRoot: this.shadowRoot,
        data () {
          return {
            props: {},
            slotChildren: []
          }
        },
        render (h) {
          return h(Component, {
            ref: 'inner',
            props: this.props
          }, this.slotChildren)
        }
      });

      // Use MutationObserver to react to future attribute & slot content change
      const observer = new MutationObserver(mutations => {
        let hasChildrenChange = false;
        for (let i = 0; i < mutations.length; i++) {
          const m = mutations[i];
          if (isInitialized && m.type === 'attributes' && m.target === this) {
            syncAttribute(this, m.attributeName);
          } else {
            hasChildrenChange = true;
          }
        }
        if (hasChildrenChange) {
          wrapper.slotChildren = Object.freeze(toVNodes(
            wrapper.$createElement,
            this.childNodes
          ));
        }
      });
      observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    }

    get vueComponent () {
      return this._wrapper.$refs.inner
    }

    connectedCallback () {
      const wrapper = this._wrapper;
      if (!wrapper._isMounted) {
        // initialize attributes
        const syncInitialAttributes = () => {
          wrapper.props = getInitialProps(camelizedPropsList);
          hyphenatedPropsList.forEach(key => {
            syncAttribute(this, key);
          });
        };

        if (isInitialized) {
          syncInitialAttributes();
        } else {
          // async & unresolved
          Component().then(resolved => {
            if (resolved.__esModule || resolved[Symbol.toStringTag] === 'Module') {
              resolved = resolved.default;
            }
            initialize(resolved);
            syncInitialAttributes();
          });
        }
        // initialize children
        wrapper.slotChildren = Object.freeze(toVNodes(
          wrapper.$createElement,
          this.childNodes
        ));
        wrapper.$mount();
        this.shadowRoot.appendChild(wrapper.$el);
      } else {
        callHooks(this.vueComponent, 'activated');
      }
    }

    disconnectedCallback () {
      callHooks(this.vueComponent, 'deactivated');
    }
  }

  if (!isAsync) {
    initialize(Component);
  }

  return CustomElement
}

/* harmony default export */ var vue_wc_wrapper = (wrap);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/runtime/api.js
var api = __webpack_require__("24fb");

// EXTERNAL MODULE: ./node_modules/vue-style-loader/lib/addStylesShadow.js + 1 modules
var addStylesShadow = __webpack_require__("35d6");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Comment.vue?vue&type=template&id=b2dd5b4c&shadow
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.mergedConfigs.darkMode ? 'halo-comment dark-mode': 'halo-comment',attrs:{"id":"halo-comment"}},[_c('div',{staticClass:"comment-count"},[_c('span',{staticClass:"vnum",domProps:{"innerHTML":_vm._s(_vm.commentCount)}}),_vm._v(" 条评论 ")]),(!_vm.mergedConfigs.autoLoad && !_vm.loaded)?_c('div',{staticClass:"comment-load-button"},[_c('a',{staticClass:"button-load",attrs:{"href":"javascript:void(0)","rel":"nofollow noopener"},on:{"click":_vm.loadComments}},[_vm._v("加载评论")])]):_vm._e(),_c('comment-loading',{directives:[{name:"show",rawName:"v-show",value:(_vm.commentLoading),expression:"commentLoading"}],attrs:{"configs":typeof _vm.configs === 'string' ? JSON.parse(_vm.configs) : _vm.configs}}),(_vm.comments.length>=1)?_c('ol',{ref:"gallery",staticClass:"comment-nodes",attrs:{"id":"comment-nodes"}},[_vm._l((_vm.comments),function(comment,index){return [_c('CommentNode',{key:index,attrs:{"targetId":_vm.id,"target":_vm.target,"comment":comment,"options":_vm.options,"configs":_vm.mergedConfigs}})]})],2):_vm._e(),(_vm.loaded && !_vm.commentLoading && _vm.comments.length<=0)?_c('div',{staticClass:"comment-empty"},[_vm._v("暂无评论 ")]):_vm._e(),(_vm.pagination.pages>1)?_c('div',{staticClass:"comment-page"},[_c('pagination',{attrs:{"page":_vm.pagination.page,"size":_vm.pagination.size,"total":_vm.pagination.total},on:{"change":_vm.handlePaginationChange}})],1):_vm._e(),_c('comment-editor',{attrs:{"targetId":_vm.id,"target":_vm.target,"options":_vm.options,"configs":_vm.mergedConfigs}}),_c('div',{staticClass:"edition"},[_c('a',{attrs:{"href":"https://github.com/coortop/halo-comment-alex#readme","target":"_blank"}},[_vm._v("alex")]),_vm._v(" "+_vm._s(_vm.alexVersion)+" ")])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Comment.vue?vue&type=template&id=b2dd5b4c&shadow

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentEditor.vue?vue&type=template&id=d68498fc&
var CommentEditorvue_type_template_id_d68498fc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"comment-editor",attrs:{"role":"form"}},[_c('div',{staticClass:"inner"},[_c('h4',{staticClass:"comment-reply-title"},[_vm._v("发表评论")]),_c('form',{staticClass:"comment-form"},[_c('div',{staticClass:"comment-textarea"},[_vm._m(0),(!_vm.previewMode)?_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.comment.content),expression:"comment.content"}],ref:"commentTextarea",staticClass:"comment-preview",style:({'height': _vm.textareaHeight}),attrs:{"id":"comment","required":"required","aria-required":"true","tabindex":"4","placeholder":_vm.options.comment_content_placeholder || '撰写评论...'},domProps:{"value":(_vm.comment.content)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.comment, "content", $event.target.value)}}}):_c('div',{staticClass:"markdown-body comment-preview isPreview",domProps:{"innerHTML":_vm._s(_vm.renderedContent)}})]),_c('ul',{staticClass:"comment-buttons"},[_c('li',{staticClass:"middle",staticStyle:{"margin-right":"5px"}},[_c('div',{staticClass:"preview-btn",class:{'actived':_vm.previewMode},attrs:{"href":"javascript:void(0)","rel":"nofollow noopener"},on:{"click":_vm.handlePreviewContent}},[_c('span',{staticClass:"comment-icon"},[_c('svg',{attrs:{"viewBox":"0 0 1024 1024","version":"1.1","xmlns":"http://www.w3.org/2000/svg","p-id":"17688","width":"16","height":"16"}},[_c('path',{attrs:{"d":"M502.390154 935.384615a29.538462 29.538462 0 1 1 0 59.076923H141.430154C79.911385 994.461538 29.538462 946.254769 29.538462 886.153846V137.846154C29.538462 77.745231 79.950769 29.538462 141.390769 29.538462h741.218462c61.44 0 111.852308 48.206769 111.852307 108.307692v300.268308a29.538462 29.538462 0 1 1-59.076923 0V137.846154c0-26.899692-23.355077-49.230769-52.775384-49.230769H141.390769c-29.420308 0-52.775385 22.331077-52.775384 49.230769v748.307692c0 26.899692 23.355077 49.230769 52.775384 49.230769h360.999385z","p-id":"17689"}}),_c('path',{attrs:{"d":"M196.923077 216.615385m29.538461 0l374.153847 0q29.538462 0 29.538461 29.538461l0 0q0 29.538462-29.538461 29.538462l-374.153847 0q-29.538462 0-29.538461-29.538462l0 0q0-29.538462 29.538461-29.538461Z","p-id":"17690"}}),_c('path',{attrs:{"d":"M649.846154 846.769231a216.615385 216.615385 0 1 0 0-433.230769 216.615385 216.615385 0 0 0 0 433.230769z m0 59.076923a275.692308 275.692308 0 1 1 0-551.384616 275.692308 275.692308 0 0 1 0 551.384616z","p-id":"17691"}}),_c('path',{attrs:{"d":"M807.398383 829.479768m20.886847-20.886846l0 0q20.886846-20.886846 41.773692 0l125.321079 125.321079q20.886846 20.886846 0 41.773693l0 0q-20.886846 20.886846-41.773693 0l-125.321078-125.321079q-20.886846-20.886846 0-41.773693Z","p-id":"17692"}})])]),_c('span',{staticClass:"comment-text"},[_vm._v("预览")])]),_c('div',{staticClass:"emoji-btn",class:{'actived': _vm.showEmoji},attrs:{"href":"javascript:void(0)","rel":"nofollow noopener"},on:{"click":_vm.handleToogleDialogEmoji}},[_c('span',{staticClass:"comment-icon"},[_c('svg',{attrs:{"viewBox":"0 0 1024 1024","version":"1.1","xmlns":"http://www.w3.org/2000/svg","p-id":"16172","width":"16","height":"16"}},[_c('path',{attrs:{"d":"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z","p-id":"16173"}}),_c('path',{attrs:{"d":"M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z","p-id":"16174"}}),_c('path',{attrs:{"d":"M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z","p-id":"16175"}}),_c('path',{attrs:{"d":"M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z","p-id":"16176"}})])]),_c('span',{staticClass:"comment-text"},[_vm._v("表情")])])]),_c('li',{staticClass:"middle"})]),_c('div',{staticClass:"comment-emoji-wrap"},[_c('VEmojiPicker',{directives:[{name:"show",rawName:"v-show",value:(_vm.emojiDialogVisible),expression:"emojiDialogVisible"}],attrs:{"pack":_vm.emojiPack,"labelSearch":"搜索表情"},on:{"select":_vm.handleSelectEmoji}})],1),_c('div',{staticClass:"author-info"},[_c('div',{staticClass:"commentator commentator-author"},[_vm._m(1),_c('span',{staticClass:"input-avatar"},[_c('img',{staticClass:"avatar-img",attrs:{"src":_vm.avatar}})]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.comment.author),expression:"comment.author"}],staticClass:"comment-input author ",attrs:{"type":"text","id":"author","tabindex":"1","required":"required","aria-required":"true","placeholder":"填写QQ号自动获取昵称和邮箱"},domProps:{"value":(_vm.comment.author)},on:{"blur":_vm.pullInfo,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.comment, "author", $event.target.value)}}})]),_c('div',{staticClass:"commentator commentator-email"},[_vm._m(2),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.comment.email),expression:"comment.email"}],staticClass:"comment-input email",attrs:{"type":"text","id":"email","tabindex":"2","required":"required","aria-required":"true","placeholder":"用于获取头像和接收回复通知"},domProps:{"value":(_vm.comment.email)},on:{"blur":_vm.pullInfo,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.comment, "email", $event.target.value)}}})]),_c('div',{staticClass:"commentator commentator-authorUrl"},[_c('label',{attrs:{"for":"authorUrl"}},[_vm._v("地址")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.comment.authorUrl),expression:"comment.authorUrl"}],staticClass:"comment-input link",attrs:{"type":"text","id":"authorUrl","tabindex":"3","placeholder":"网站或博客地址"},domProps:{"value":(_vm.comment.authorUrl)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.comment, "authorUrl", $event.target.value)}}})])]),_c('div',{staticClass:"comment-buttons SubmitBtn"},[_c('button',{staticClass:"button-submit",attrs:{"href":"javascript:void(0)","tabindex":"5","rel":"nofollow noopener","type":"button"},on:{"click":_vm.handleSubmitClick}},[_vm._v("发表评论 ")])]),_c('div',{staticClass:"comment-alert"},[(_vm.infoAlertVisiable)?_vm._l((_vm.infoes),function(info,index){return _c('div',{key:index,staticClass:"alert info"},[_c('span',{staticClass:"closebtn",on:{"click":_vm.clearAlertClose}},[_vm._v("×")]),_c('strong',[_vm._v(_vm._s(info))])])}):_vm._e(),(_vm.successAlertVisiable)?_vm._l((_vm.successes),function(success,index){return _c('div',{key:index,staticClass:"alert success"},[_c('span',{staticClass:"closebtn",on:{"click":_vm.clearAlertClose}},[_vm._v("×")]),_c('strong',[_vm._v(_vm._s(success))])])}):_vm._e(),(_vm.warningAlertVisiable)?_vm._l((_vm.warnings),function(warning,index){return _c('div',{key:index,staticClass:"alert warning"},[_c('span',{staticClass:"closebtn",on:{"click":_vm.clearAlertClose}},[_vm._v("×")]),_c('strong',[_vm._v(_vm._s(warning))])])}):_vm._e()],2)])])])}
var CommentEditorvue_type_template_id_d68498fc_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{attrs:{"for":"comment"}},[_vm._v("评论 "),_c('span',[_vm._v("*")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{attrs:{"for":"author"}},[_vm._v(" 名称 "),_c('span',[_vm._v("*")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{attrs:{"for":"email"}},[_vm._v(" 邮箱 "),_c('span',[_vm._v("*")])])}]


// CONCATENATED MODULE: ./src/components/CommentEditor.vue?vue&type=template&id=d68498fc&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/marked/lib/marked.js
var marked = __webpack_require__("0e54");
var marked_default = /*#__PURE__*/__webpack_require__.n(marked);

// EXTERNAL MODULE: ./node_modules/md5/md5.js
var md5 = __webpack_require__("6821");
var md5_default = /*#__PURE__*/__webpack_require__.n(md5);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=template&id=b7fcbf60&
var VEmojiPickervue_type_template_id_b7fcbf60_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"EmojiPicker"}},[(_vm.showCategory)?_c('Categories',{on:{"select":function($event){return _vm.onChangeCategory($event)}}}):_vm._e(),(_vm.showSearch)?_c('InputSearch',{attrs:{"placeholder":_vm.labelSearch},model:{value:(_vm.filterEmoji),callback:function ($$v) {_vm.filterEmoji=$$v},expression:"filterEmoji"}}):_vm._e(),_c('EmojiList',{attrs:{"data":_vm.emojis,"category":_vm.category,"filter":_vm.filterEmoji,"emojisByRow":_vm.emojisByRow,"continuousList":_vm.continuousList},on:{"select":function($event){return _vm.onSelectEmoji($event)}}})],1)}
var VEmojiPickervue_type_template_id_b7fcbf60_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=template&id=b7fcbf60&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/Categories.vue?vue&type=template&id=4f139121&
var Categoriesvue_type_template_id_4f139121_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"Categories"}},_vm._l((_vm.categories),function(categorie,index){return _c('div',{key:index,class:['category', { active: index === _vm.active }],on:{"click":function($event){return _vm.onSelect(index)}}},[_c('VSvg',{attrs:{"name":categorie.icon}})],1)}),0)}
var Categoriesvue_type_template_id_4f139121_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/Categories.vue?vue&type=template&id=4f139121&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/VSvg.vue?vue&type=template&id=2ef72dbc&
var VSvgvue_type_template_id_2ef72dbc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{style:(_vm.styleSVG),attrs:{"id":"VSvg"},domProps:{"innerHTML":_vm._s(_vm.icon)}})}
var VSvgvue_type_template_id_2ef72dbc_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/VSvg.vue?vue&type=template&id=2ef72dbc&

// CONCATENATED MODULE: ./src/components/EmojiPicker/_icons.js
const categories = {
  activity: `
  <svg style="max-height:18px" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 303.6 303.6" fill="gray">
  <path d="M291.503 11.6c-10.4-10.4-37.2-11.6-48.4-11.6-50.4 0-122.4 18.4-173.6 69.6-77.2 76.8-78.4 201.6-58.4 222 10.8 10.4 35.6 12 49.2 12 49.6 0 121.2-18.4 173.2-70 76.4-76.4 80.4-199.6 58-222zm-231.2 277.2c-24.4 0-36-4.8-38.8-7.6-5.2-5.2-8.4-24.4-6.8-49.6l57.2 56.8c-4 .4-8 .4-11.6.4zm162.8-66c-38.8 38.8-90.4 57.2-132.4 63.6l-74-73.6c6-42 24-94 63.2-133.2 38-38 88-56.4 130.8-62.8l75.6 75.6c-6 40.8-24.4 91.6-63.2 130.4zm65.2-148.8l-58.8-59.2c4.8-.4 9.2-.4 13.6-.4 24.4 0 35.6 4.8 38 7.2 5.6 5.6 9.2 25.6 7.2 52.4z"/>
  <path d="M215.103 139.6l-20.8-20.8 13.2-13.2c2.8-2.8 2.8-7.6 0-10.4s-7.6-2.8-10.4 0l-13.2 13.6-20.8-20.8c-2.8-2.8-7.6-2.8-10.4 0-2.8 2.8-2.8 7.6 0 10.4l20.8 20.8-22 22-20.8-20.8c-2.8-2.8-7.6-2.8-10.4 0s-2.8 7.6 0 10.4l20.8 20.8-22 22-20.8-20.8c-2.8-2.8-7.6-2.8-10.4 0s-2.8 7.6 0 10.4l20.8 20.8-13.2 13.2c-2.8 2.8-2.8 7.6 0 10.4 1.6 1.6 3.2 2 5.2 2s3.6-.8 5.2-2l13.2-13.2 20.8 20.8c1.6 1.6 3.2 2 5.2 2s3.6-.8 5.2-2c2.8-2.8 2.8-7.6 0-10.4l-20.8-21.2 22-22 20.8 20.8c1.6 1.6 3.2 2 5.2 2s3.6-.8 5.2-2c2.8-2.8 2.8-7.6 0-10.4l-20.8-20.8 22-22 20.8 20.8c1.6 1.6 3.2 2 5.2 2s3.6-.8 5.2-2c2.8-2.8 2.8-7.6 0-10.4zM169.103 47.6c-1.2-4-5.2-6-9.2-4.8-3.2 1.2-80.8 25.6-110.4 98-1.6 4 0 8.4 4 9.6.8.4 2 .4 2.8.4 2.8 0 5.6-1.6 6.8-4.4 27.2-66 100.4-89.6 101.2-89.6 4-1.2 6-5.2 4.8-9.2z"/>
  </svg>
  `,
  flags: `
  <svg style="max-height:18px" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="gray">
  <path d="M472.928 34.72c-4.384-2.944-9.984-3.52-14.912-1.568-1.088.448-106.528 42.176-195.168.384C186.752-2.4 102.944 14.4 64 25.76V16c0-8.832-7.168-16-16-16S32 7.168 32 16v480c0 8.832 7.168 16 16 16s16-7.168 16-16V315.296c28.352-9.248 112.384-31.232 185.184 3.168 34.592 16.352 70.784 21.792 103.648 21.792 63.2 0 114.016-20.128 117.184-21.408 6.016-2.464 9.984-8.32 9.984-14.848V48c0-5.312-2.656-10.272-7.072-13.28zM448 292.672c-28.512 9.248-112.512 31.136-185.184-3.168C186.752 253.6 102.944 270.4 64 281.76V59.328c28.352-9.248 112.384-31.232 185.184 3.168 76 35.872 159.872 19.104 198.816 7.712v222.464z"/>
  </svg>
  `,
  foods: `
  <svg style="max-height:18px" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" fill="gray">
  <path d="M413.949 155.583a10.153 10.153 0 0 0-3.24-2.16c-.61-.25-1.24-.44-1.87-.57-3.25-.66-6.701.41-9.03 2.73a10.093 10.093 0 0 0-2.93 7.07 10.098 10.098 0 0 0 1.69 5.56c.36.54.779 1.05 1.24 1.52 1.86 1.86 4.44 2.93 7.07 2.93.65 0 1.31-.07 1.96-.2.63-.13 1.26-.32 1.87-.57a10.146 10.146 0 0 0 3.24-2.16c.47-.47.88-.98 1.25-1.52a10.098 10.098 0 0 0 1.49-3.6 10.038 10.038 0 0 0-2.74-9.03zM115.289 385.873c-.12-.64-.32-1.27-.57-1.87-.25-.6-.55-1.18-.91-1.73-.37-.54-.79-1.06-1.25-1.52a9.57 9.57 0 0 0-1.52-1.24c-.54-.36-1.12-.67-1.72-.92-.61-.25-1.24-.44-1.88-.57a9.847 9.847 0 0 0-3.9 0c-.64.13-1.27.32-1.87.57-.61.25-1.19.56-1.73.92-.55.36-1.06.78-1.52 1.24-.46.46-.88.98-1.24 1.52-.36.55-.67 1.13-.92 1.73-.25.6-.45 1.23-.57 1.87-.13.651-.2 1.3-.2 1.96 0 .65.07 1.3.2 1.95.12.64.32 1.27.57 1.87.25.6.56 1.18.92 1.73.36.54.78 1.06 1.24 1.52.46.46.97.88 1.52 1.24.54.36 1.12.67 1.73.92.6.25 1.23.44 1.87.57s1.3.2 1.95.2c.65 0 1.31-.07 1.95-.2.64-.13 1.27-.32 1.88-.57.6-.25 1.18-.56 1.72-.92.55-.36 1.059-.78 1.52-1.24.46-.46.88-.98 1.25-1.52.36-.55.66-1.13.91-1.73.25-.6.45-1.23.57-1.87.13-.65.2-1.3.2-1.95 0-.66-.07-1.31-.2-1.96z"/>
  <path d="M511.999 222.726c0-14.215-9.228-26.315-22.007-30.624-1.628-74.155-62.456-133.978-136.994-133.978H159.002c-74.538 0-135.366 59.823-136.994 133.978C9.228 196.411 0 208.51 0 222.726a32.076 32.076 0 0 0 3.847 15.203 44.931 44.931 0 0 0-.795 8.427v.708c0 14.06 6.519 26.625 16.693 34.833-10.178 8.275-16.693 20.891-16.693 35.001 0 15.114 7.475 28.515 18.921 36.702v26.668c0 40.588 33.021 73.608 73.608 73.608h320.836c40.588 0 73.608-33.021 73.608-73.608V353.6c11.446-8.186 18.921-21.587 18.921-36.702 0-13.852-6.354-26.385-16.361-34.702 9.983-8.212 16.361-20.656 16.361-34.562v-.708c0-2.985-.294-5.944-.877-8.845a32.082 32.082 0 0 0 3.93-15.355zM44.033 173.229h322.441c5.523 0 10-4.477 10-10s-4.477-10-10-10H49.737c16.896-43.883 59.503-75.106 109.265-75.106h193.996c62.942 0 114.438 49.953 116.934 112.295H42.068c.234-5.848.9-11.588 1.965-17.189zM23.052 316.896c0-13.837 11.257-25.094 25.094-25.094h117.298l55.346 50.188H48.146c-13.837 0-25.094-11.256-25.094-25.094zm.976-62.945c.422.111.847.215 1.275.309 7.421 1.634 14.68 8.002 22.365 14.744a576.29 576.29 0 0 0 3.206 2.799h-3.081c-11.253-.001-20.774-7.551-23.765-17.852zm308.727 89.752l57.233-51.899 49.904.57-81.871 74.24-25.266-22.911zm7.861 34.126H295.12l17.467-15.839h10.563l17.466 15.839zm19.599-86.027l-82.499 74.811-82.499-74.811h164.998zm-59.529-20c.849-.842 1.677-1.675 2.49-2.493 9.531-9.587 17.059-17.16 32.89-17.16 15.832 0 23.359 7.573 32.89 17.162.812.817 1.64 1.65 2.489 2.491h-70.759zm-160.13 0a485.82 485.82 0 0 0 2.489-2.492c9.531-9.588 17.059-17.161 32.89-17.161 15.83 0 23.358 7.573 32.888 17.16.813.818 1.641 1.651 2.49 2.493h-70.757zm275.862 162.073H95.582c-29.56 0-53.608-24.049-53.608-53.608v-18.275h200.872l17.467 15.839H145.897c-5.523 0-10 4.477-10 10s4.477 10 10 10H467.07c-7.288 20.958-27.242 36.044-50.652 36.044zm53.608-56.046h-94.6l17.467-15.839h77.133v15.839zm-6.174-35.837h-48.906l54.624-49.533c11.135 2.604 19.376 12.665 19.376 24.439 0 13.836-11.257 25.094-25.094 25.094zm-2.728-70.19l.262-.227.101-.087.342-.298c.848-.738 1.682-1.469 2.501-2.187 4.105-3.601 8.089-7.095 12.04-9.819 3.446-2.375 6.868-4.164 10.326-4.925l.359-.081.04-.01.317-.076.065-.016a22.897 22.897 0 0 0 .42-.107l.196-.052a.374.374 0 0 0 .048-.012c-2.433 9.276-10.129 16.443-19.691 18.102a9.984 9.984 0 0 0-2.016-.205h-5.31zm21.271-37.073a40.746 40.746 0 0 0-4.536 1.281c-10.109 3.489-18.327 10.602-26.283 17.58l-.434.381c-9.178 8.052-17.923 15.723-29.033 17.834h-13.146c-11.249-1.93-17.833-8.552-25.823-16.591-10.213-10.275-22.923-23.062-47.074-23.062-24.15 0-36.86 12.786-47.074 23.06-7.992 8.04-14.576 14.663-25.829 16.593h-14.327c-11.253-1.93-17.837-8.553-25.829-16.593-10.213-10.274-22.923-23.06-47.072-23.06-24.151 0-36.861 12.787-47.074 23.062-7.991 8.039-14.574 14.661-25.824 16.591h-7.065c-14.134 0-24.325-8.939-35.113-18.404-9.248-8.112-18.81-16.501-31.252-19.241a12.237 12.237 0 0 1-7.025-4.453 10.027 10.027 0 0 0-1.153-1.252 12.234 12.234 0 0 1-1.428-5.727c-.001-6.788 5.52-12.309 12.307-12.309h447.384c6.787 0 12.308 5.521 12.308 12.308 0 5.729-4.039 10.776-9.605 12.002z"/>
  </svg>
  `,
  frequenty: `
  <svg style="max-height:18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.15 219.15" width="24" height="24" fill="gray">
  <path d="M109.575 0C49.156 0 .001 49.155.001 109.574c0 60.42 49.154 109.576 109.573 109.576 60.42 0 109.574-49.156 109.574-109.576C219.149 49.155 169.995 0 109.575 0zm0 204.15c-52.148 0-94.573-42.427-94.573-94.576C15.001 57.426 57.427 15 109.575 15c52.148 0 94.574 42.426 94.574 94.574 0 52.15-42.426 94.576-94.574 94.576z"/>
  <path d="M166.112 108.111h-52.051V51.249a7.5 7.5 0 0 0-15 0v64.362a7.5 7.5 0 0 0 7.5 7.5h59.551a7.5 7.5 0 0 0 0-15z"/>
  </svg>
  `,
  nature: `
  <svg style="max-height:18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="gray">
  <path d="M490.815 3.784C480.082 5.7 227.049 51.632 148.477 130.203c-39.153 39.153-64.259 87.884-70.694 137.218-5.881 45.081 4.347 85.929 28.878 116.708L.001 490.789 21.212 512l106.657-106.657c33.094 26.378 75.092 34.302 116.711 28.874 49.334-6.435 98.065-31.541 137.218-70.695C460.368 284.951 506.3 31.918 508.216 21.185L511.999 0l-21.184 3.784zm-43.303 39.493L309.407 181.383l-7.544-98.076c46.386-15.873 97.819-29.415 145.649-40.03zm-174.919 50.64l8.877 115.402-78.119 78.119-11.816-153.606c19.947-13.468 47.183-26.875 81.058-39.915zm-109.281 64.119l12.103 157.338-47.36 47.36c-39.246-52.892-24.821-139.885 35.257-204.698zm57.113 247.849c-26.548-.001-51.267-7.176-71.161-21.938l47.363-47.363 157.32 12.102c-40.432 37.475-89.488 57.201-133.522 57.199zm157.743-85.421l-153.605-11.816 78.118-78.118 115.403 8.877c-13.04 33.876-26.448 61.111-39.916 81.057zm50.526-110.326l-98.076-7.544L468.725 64.485c-10.589 47.717-24.147 99.232-40.031 145.653z"/>
  </svg>
  `,
  objects: `
  <svg style="max-height:18px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 792 792" fill="gray">
  <path d="M425.512 741.214H365.58c-14.183 0-25.164 11.439-25.164 25.622S351.397 792 365.58 792h59.932c15.101 0 26.54-10.981 26.54-25.164s-11.44-25.622-26.54-25.622zM472.638 671.209H319.821c-14.183 0-26.081 10.98-26.081 25.163s11.898 25.164 26.081 25.164h152.817c14.183 0 25.164-10.981 25.164-25.164s-10.982-25.163-25.164-25.163zM639.188 138.634c-25.164-42.548-59.181-76.135-102.49-101.113C493.526 12.621 446.566 0 395.771 0 320.28 0 247.19 31.684 197.205 81.445c-49.761 49.527-81.904 121.24-81.904 196.282 0 33.861 7.779 68.629 22.879 103.866 15.1 35.228 38.565 78.614 70.005 130.396 7.448 12.269 15.764 31.205 25.623 56.271 12.104 30.757 22.87 51.713 31.566 63.602 5.027 6.872 11.899 10.063 20.596 10.063h228.766c9.605 0 16.359-4.188 21.504-11.898 6.754-10.132 13.987-27.516 22.42-51.693 8.951-25.691 16.838-43.982 23.329-55.364 30.571-53.587 54.446-99.747 70.464-137.717 16.018-37.979 24.246-74.124 24.246-107.526 0-49.878-12.347-96.545-37.511-139.093zm-35.696 232.437c-15.012 34.348-36.398 76.974-65.427 126.736-9.41 16.125-18.458 37.003-26.989 63.592-3.367 10.474-7.32 20.596-11.439 30.2H300.153c-6.862-11.439-12.26-25.837-18.761-42.089-12.718-31.801-23.338-52.621-30.2-64.061-28.824-48.043-49.868-87.39-64.051-118.957s-20.537-60.859-21.044-88.766c-2.235-121.718 106.13-228.991 229.674-226.941 41.631.693 80.527 10.063 115.765 30.659 35.227 20.586 63.134 48.043 83.729 82.812 20.586 34.768 31.108 72.748 31.108 113.47-.001 27.449-7.692 58.596-22.881 93.345z"/>
  </svg>
  `,
  peoples: `
  <svg style="max-height:18px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 106.059 106.059" fill="gray">
  <path d="M90.544 90.542c20.687-20.684 20.685-54.341.002-75.024-20.688-20.689-54.347-20.689-75.031-.006-20.688 20.687-20.686 54.346.002 75.034 20.682 20.684 54.341 20.684 75.027-.004zM21.302 21.3c17.494-17.493 45.959-17.495 63.457.002 17.494 17.494 17.492 45.963-.002 63.455-17.494 17.494-45.96 17.496-63.455.003-17.498-17.498-17.496-45.966 0-63.46zM27 69.865s-2.958-11.438 6.705-8.874c0 0 17.144 9.295 38.651 0 9.662-2.563 6.705 8.874 6.705 8.874C73.539 86.824 53.03 85.444 53.03 85.444S32.521 86.824 27 69.865zm6.24-31.194a6.202 6.202 0 1 1 12.399.001 6.202 6.202 0 0 1-12.399-.001zm28.117 0a6.202 6.202 0 1 1 12.403.001 6.202 6.202 0 0 1-12.403-.001z"/>
  </svg>
  `,
  places: `
  <svg style="max-height:18px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 611.999 611.998" fill="gray">
  <path d="M596.583 15.454C586.226 5.224 573.354.523 558.423.523c-15.597 0-31.901 4.906-49.452 14.599-17.296 9.551-32.851 20.574-46.458 32.524h-.665c-2.655 2.322-10.953 10.287-25.219 24.553-14.272 14.272-26.217 26.223-35.845 36.51L112.401 26.406c-6.896-1.968-12.928.014-17.593 4.645L46.687 78.839c-4.326 4.297-5.805 9.268-4.977 15.597.829 6.287 3.979 10.627 9.629 13.607L280.32 228.839 161.514 347.978l-95.91 3.32c-4.645.164-8.637 1.643-12.276 5.311L5.872 404.397c-4.312 4.34-6.641 9.289-5.643 16.262 1.657 6.967 5.31 11.611 11.618 13.602l117.142 48.787 48.787 117.148c2.421 5.812 6.634 9.621 13.607 11.279h3.313c4.977 0 9.296-1.658 12.942-5.311l47.456-47.457c3.653-3.645 5.494-7.965 5.643-12.275l3.32-95.91 118.807-118.807 121.128 228.99c2.988 5.643 7.32 8.793 13.607 9.621 6.329.836 11.271-1.316 15.597-5.643l47.456-47.457c4.978-4.977 6.945-10.697 4.978-17.586l-82.296-288.389 59.732-59.739c10.287-10.287 21.699-24.149 33.183-45.134 5.777-10.542 10.032-20.886 12.942-31.194 5.722-20.218 3.258-44.07-12.608-59.73zm-59.4 110.176l-67.039 67.372c-5.628 5.657-6.811 11.122-4.977 17.586l81.637 288.388-22.563 22.238L403.438 292.89c-2.98-5.643-7.299-8.963-12.941-9.621-6.301-1.331-11.611.325-16.263 4.977l-141.37 141.37c-2.987 2.986-4.644 6.973-5.643 11.949l-3.32 95.904-22.896 23.236-41.48-98.566c-1.331-4.645-4.553-8.184-9.629-10.287L51.338 411.03l23.229-22.895 95.578-3.654c5.643-.99 9.622-2.654 12.276-5.309l141.37-141.371c4.651-4.645 6.308-9.954 4.984-16.262-.666-5.643-3.986-9.954-9.629-12.942L90.829 87.47l22.231-22.238 288.389 81.637c6.464 1.833 11.951.666 17.587-4.977l28.545-28.539 26.217-25.884 11.278-11.285 1.331-.666c27.873-23.895 55.088-38.16 72.016-38.16 5.969 0 9.954 1.324 11.611 3.979 18.917 18.585-21.099 72.484-32.851 84.293z"/>
  </svg>
  `,
  symbols: `
  <svg style="max-height:18px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 511.626 511.626" fill="gray">
  <path d="M475.366 71.949c-24.175-23.606-57.575-35.404-100.215-35.404-11.8 0-23.843 2.046-36.117 6.136-12.279 4.093-23.702 9.615-34.256 16.562-10.568 6.945-19.65 13.467-27.269 19.556a263.828 263.828 0 0 0-21.696 19.414 264.184 264.184 0 0 0-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556-10.564-6.95-21.985-12.468-34.261-16.562-12.275-4.089-24.316-6.136-36.116-6.136-42.637 0-76.039 11.801-100.211 35.404C12.087 95.55 0 128.286 0 170.16c0 12.753 2.24 25.891 6.711 39.398 4.471 13.514 9.566 25.031 15.275 34.546 5.708 9.514 12.181 18.792 19.414 27.834 7.233 9.041 12.519 15.272 15.846 18.698 3.33 3.426 5.948 5.903 7.851 7.427L243.25 469.938c3.427 3.426 7.614 5.144 12.562 5.144s9.138-1.718 12.563-5.144l177.87-171.31c43.588-43.58 65.38-86.406 65.38-128.472.001-41.877-12.085-74.61-36.259-98.207zm-53.961 199.846L255.813 431.391 89.938 271.507C54.344 235.922 36.55 202.133 36.55 170.156c0-15.415 2.046-29.026 6.136-40.824 4.093-11.8 9.327-21.177 15.703-28.124 6.377-6.949 14.132-12.607 23.268-16.988 9.141-4.377 18.086-7.328 26.84-8.85 8.754-1.52 18.079-2.281 27.978-2.281 9.896 0 20.557 2.424 31.977 7.279 11.418 4.853 21.934 10.944 31.545 18.271 9.613 7.332 17.845 14.183 24.7 20.557 6.851 6.38 12.559 12.229 17.128 17.559 3.424 4.189 8.091 6.283 13.989 6.283 5.9 0 10.562-2.094 13.99-6.283 4.568-5.33 10.28-11.182 17.131-17.559 6.852-6.374 15.085-13.222 24.694-20.557 9.613-7.327 20.129-13.418 31.553-18.271 11.416-4.854 22.08-7.279 31.977-7.279s19.219.761 27.977 2.281c8.757 1.521 17.702 4.473 26.84 8.85 9.137 4.38 16.892 10.042 23.267 16.988 6.376 6.947 11.612 16.324 15.705 28.124 4.086 11.798 6.132 25.409 6.132 40.824-.002 31.977-17.89 65.86-53.675 101.639z"/>
  </svg>
  `
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/VSvg.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//

/* harmony default export */ var VSvgvue_type_script_lang_js_ = ({
  name: 'VSvg',
  props: {
    name: {
      type: String,
      required: true
    },
    styles: {
      type: Object
    }
  },
  computed: {
    icon() {
      return categories[this.name];
    },

    styleSVG() {
      return _objectSpread2({}, this.styles);
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/VSvg.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_VSvgvue_type_script_lang_js_ = (VSvgvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/VSvg.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = normalizeComponent(
  EmojiPicker_VSvgvue_type_script_lang_js_,
  VSvgvue_type_template_id_2ef72dbc_render,
  VSvgvue_type_template_id_2ef72dbc_staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var VSvg = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/Categories.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Categoriesvue_type_script_lang_js_ = ({
  name: 'Categories',
  components: {
    VSvg: VSvg
  },
  data: () => ({
    categories: [{
      name: 'Frequenty',
      icon: 'frequenty'
    }, {
      name: 'Peoples',
      icon: 'peoples'
    }, {
      name: 'Nature',
      icon: 'nature'
    }, {
      name: 'Foods',
      icon: 'foods'
    }, {
      name: 'Activity',
      icon: 'activity'
    }, {
      name: 'Objects',
      icon: 'objects'
    }, {
      name: 'Places',
      icon: 'places'
    }, {
      name: 'Symbols',
      icon: 'symbols'
    }, {
      name: 'Flags',
      icon: 'flags'
    }],
    active: 1
  }),
  methods: {
    onSelect(index) {
      this.active = index;
      const _category = this.categories[index];
      this.$emit('select', _category);
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/Categories.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_Categoriesvue_type_script_lang_js_ = (Categoriesvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/Categories.vue



function Categories_injectStyles (context) {
  
  
}

/* normalize component */

var Categories_component = normalizeComponent(
  EmojiPicker_Categoriesvue_type_script_lang_js_,
  Categoriesvue_type_template_id_4f139121_render,
  Categoriesvue_type_template_id_4f139121_staticRenderFns,
  false,
  Categories_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var Categories = (Categories_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/EmojiList.vue?vue&type=template&id=f4623c9c&
var EmojiListvue_type_template_id_f4623c9c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"Emojis"}},[_c('div',{ref:"container-emoji",staticClass:"container-emoji"},[(_vm.continuousList)?_vm._l((_vm.dataFilteredByCategory),function(category,category_name){return _c('div',{key:category_name,staticClass:"category-line"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(category.length),expression:"category.length"}],ref:category_name,refInFor:true,staticClass:"category-title",class:category_name},[_vm._v(" "+_vm._s(category_name)+" ")]),(category.length)?_c('div',{staticClass:"grid-emojis"},_vm._l((category),function(emoji,index_e){return _c('Emoji',{key:(category_name + "-" + index_e),attrs:{"data":emoji},nativeOn:{"click":function($event){return _vm.onSelect(emoji)}}})}),1):_vm._e()])}):_c('div',{staticClass:"grid-emojis"},_vm._l((_vm.dataFiltered),function(emoji,index){return _c('Emoji',{key:index,attrs:{"data":emoji},nativeOn:{"click":function($event){return _vm.onSelect(emoji)}}})}),1)],2)])}
var EmojiListvue_type_template_id_f4623c9c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiList.vue?vue&type=template&id=f4623c9c&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/Emoji.vue?vue&type=template&id=433dab23&
var Emojivue_type_template_id_433dab23_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"emoji",class:_vm.data['category'],domProps:{"innerHTML":_vm._s(_vm.data['emoji'])}})}
var Emojivue_type_template_id_433dab23_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/Emoji.vue?vue&type=template&id=433dab23&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/Emoji.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var Emojivue_type_script_lang_js_ = ({
  name: 'Emoji',
  props: {
    data: {
      type: String
    }
  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/Emoji.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_Emojivue_type_script_lang_js_ = (Emojivue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/Emoji.vue



function Emoji_injectStyles (context) {
  
  var style0 = __webpack_require__("845e")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Emoji_component = normalizeComponent(
  EmojiPicker_Emojivue_type_script_lang_js_,
  Emojivue_type_template_id_433dab23_render,
  Emojivue_type_template_id_433dab23_staticRenderFns,
  false,
  Emoji_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var Emoji = (Emoji_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/EmojiList.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var EmojiListvue_type_script_lang_js_ = ({
  name: 'EmojiList',
  components: {
    Emoji: Emoji
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    emojisByRow: {
      type: Number,
      required: true
    },
    filter: {
      type: String
    },
    continuousList: {
      type: Boolean
    },
    category: {
      type: String
    }
  },
  methods: {
    onSelect(emoji) {
      this.$emit('select', emoji);
    }

  },
  computed: {
    gridDynamic() {
      const percent = 100 / 20;
      return {
        gridTemplateColumns: `repeat(${this.emojisByRow}, ${percent}%)`
      };
    },

    dataFiltered() {
      let data = this.data[this.category];
      const searchValue = this.filter.trim();

      if (searchValue) {
        data = data.filter(item => item.aliases.some(alias => alias.includes(searchValue.toLowerCase())));
      }

      return data;
    },

    dataFilteredByCategory() {
      let _data = Object.assign({}, this.data);

      const searchValue = this.filter.trim();

      if (searchValue) {
        this.categories.forEach(category => {
          _data[category] = this.data[category].filter(item => item.aliases.some(alias => alias.includes(searchValue.toLowerCase())));
        });
      }

      return _data;
    },

    categories() {
      return Object.keys(this.data);
    }

  },
  watch: {
    data() {
      this.$refs['container-emoji'].scrollTop = 0;
    },

    category(new_category) {
      if (this.continuousList) {
        const firstItemCategory = this.$refs[new_category][0];
        const scrollTop = firstItemCategory.offsetTop - 80;
        this.$refs['container-emoji'].scrollTop = scrollTop;
      }
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiList.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_EmojiListvue_type_script_lang_js_ = (EmojiListvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiList.vue



function EmojiList_injectStyles (context) {
  
  var style0 = __webpack_require__("2af4")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var EmojiList_component = normalizeComponent(
  EmojiPicker_EmojiListvue_type_script_lang_js_,
  EmojiListvue_type_template_id_f4623c9c_render,
  EmojiListvue_type_template_id_f4623c9c_staticRenderFns,
  false,
  EmojiList_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var EmojiList = (EmojiList_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/InputSearch.vue?vue&type=template&id=19ee402d&
var InputSearchvue_type_template_id_19ee402d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"InputSearch"}},[_c('div',{staticClass:"container-search"},[_c('input',{attrs:{"type":"text","placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"keyup":function($event){return _vm.onKeyUp($event)}}})])])}
var InputSearchvue_type_template_id_19ee402d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/InputSearch.vue?vue&type=template&id=19ee402d&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/InputSearch.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var InputSearchvue_type_script_lang_js_ = ({
  name: 'InputSearch',
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  methods: {
    // Emit value of v-model
    onKeyUp(event) {
      this.$emit('input', event.target.value);
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/InputSearch.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_InputSearchvue_type_script_lang_js_ = (InputSearchvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/InputSearch.vue



function InputSearch_injectStyles (context) {
  
  
}

/* normalize component */

var InputSearch_component = normalizeComponent(
  EmojiPicker_InputSearchvue_type_script_lang_js_,
  InputSearchvue_type_template_id_19ee402d_render,
  InputSearchvue_type_template_id_19ee402d_staticRenderFns,
  false,
  InputSearch_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var InputSearch = (InputSearch_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var VEmojiPickervue_type_script_lang_js_ = ({
  name: 'VEmojiPicker',
  props: {
    pack: {
      type: Array,
      required: false
    },
    labelSearch: {
      type: String
    },
    showCategory: {
      type: Boolean,
      default: false
    },
    emojisByRow: {
      type: Number,
      default: 10
    },
    showSearch: {
      type: Boolean,
      default: () => false
    },
    continuousList: {
      type: Boolean,
      default: () => true
    }
  },
  components: {
    Categories: Categories,
    EmojiList: EmojiList,
    InputSearch: InputSearch
  },
  data: () => ({
    mapEmojis: {},
    category: 'Peoples',
    filterEmoji: ''
  }),

  created() {
    this.mapperData(this.pack);
  },

  methods: {
    onChangeCategory(category) {
      this.category = category.name;
      this.$emit('changeCategory', this.category);
    },

    onSelectEmoji(emoji) {
      // this.updateFrequenty(emoji)
      this.$emit('select', emoji);
    },

    updateFrequenty(emoji) {
      this.mapEmojis['Frequenty'] = [...new Set([...this.mapEmojis['Frequenty'], emoji])];
    },

    mapperData(dataEmojis) {
      this.$set(this.mapEmojis, 'Frequenty', []);
      dataEmojis.forEach(emoji => {
        const _category = emoji['category'];

        if (!this.mapEmojis[_category]) {
          this.$set(this.mapEmojis, _category, [emoji]);
        } else {
          this.mapEmojis[_category].push(emoji);
        }
      });
    }

  },

  beforeDestroy() {
    delete this.mapEmojis;
  },

  computed: {
    emojis() {
      return this.mapEmojis;
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_VEmojiPickervue_type_script_lang_js_ = (VEmojiPickervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/VEmojiPicker.vue



function VEmojiPicker_injectStyles (context) {
  
  
}

/* normalize component */

var VEmojiPicker_component = normalizeComponent(
  EmojiPicker_VEmojiPickervue_type_script_lang_js_,
  VEmojiPickervue_type_template_id_b7fcbf60_render,
  VEmojiPickervue_type_template_id_b7fcbf60_staticRenderFns,
  false,
  VEmojiPicker_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var VEmojiPicker = (VEmojiPicker_component.exports);
// EXTERNAL MODULE: ./src/components/EmojiPicker/data/emojis.js
var emojis = __webpack_require__("7282");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// CONCATENATED MODULE: ./src/utils/util.js




/**
 * time ago
 * @param {*} time
 */
function timeAgo(time) {
  var currentTime = new Date().getTime();
  var between = currentTime - time;
  var days = Math.floor(between / (24 * 3600 * 1000));

  if (days === 0) {
    var leave1 = between % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));

    if (hours === 0) {
      var leave2 = leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));

      if (minutes === 0) {
        var leave3 = leave2 % (60 * 1000);
        var seconds = Math.round(leave3 / 1000);
        return seconds + ' 秒前';
      }

      return minutes + ' 分钟前';
    }

    return hours + ' 小时前';
  }

  if (days < 0) return '刚刚';

  if (days < 1) {
    return days + ' 天前';
  } else {
    return formatDate(time, 'yyyy/MM/dd hh:mm');
  }
}

function formatDate(date, fmt) {
  date = new Date(date);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
} // From <https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php>


function isUrl(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
function isEmpty(content) {
  return content === null || content === undefined || content === '';
}
function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}
function validEmail(email) {
  var re = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,8}$/;
  return re.test(email);
}
const queryStringify = query => {
  const queryString = Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');
  return queryString;
};
function getUrlKey(name) {
  return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || "")[1].replace(/\+/g, "%20")) || null;
}
function decodeHTML(html) {
  var output,
      elem = document.createElement('div');
  elem.innerHTML = html;
  output = elem.innerText || elem.textContent;
  elem = null;
  return output;
}
function isQQ(qq) {
  var re = /^[1-9][0-9]{4,9}$/gim;
  return re.test(qq);
}
function renderedEmojiHtml(html) {
  const emojiData = __webpack_require__("7282");

  for (let i = 0; i < emojiData["default"].length; i++) {
    let aliases = emojiData["default"][i]["aliases"].toString().trim();

    if (aliases != null && aliases != "") {
      html = html.replace(new RegExp(aliases, 'g'), emojiData["default"][i].emoji);
    }
  }

  return html;
}
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/utils/service.js



__webpack_require__("09bd").shim();

const service = axios_default.a.create({
  baseURL:  true ? '' : undefined,
  timeout: 5000,
  withCredentials: true
});
service.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});
service.interceptors.response.use(response => {
  return response;
}, error => {
  if (axios_default.a.isCancel(error)) {
    // Vue.$log.debug("Cancelled uploading by user.");
    return Promise.reject(error);
  } // Vue.$log.error("Response failed", error);


  const response = error.response; // const status = response ? response.status : -1;
  // Vue.$log.error("Server response status", status);

  const data = response ? response.data : null;

  if (data) {
    // Business response
    // Vue.$log.error("Business response status", data.status);
    if (data.status === 400) {// TODO handle 400 status error
    } else if (data.status === 401) {// TODO Handle 401 status error
    } else if (data.status === 403) {// TODO handle 403 status error
    } else if (data.status === 404) {// TODO handle 404 status error
    } else if (data.status === 500) {// TODO handle 500 status error
    }
  } else {// TODO Server unavailable
    }

  return Promise.reject(error);
});
/* harmony default export */ var utils_service = (service);
// CONCATENATED MODULE: ./src/api/comment.js

const baseUrl = '/api/content';
const commentApi = {};

commentApi.createComment = (target, comment) => {
  return utils_service({
    url: `${baseUrl}/${target}/comments`,
    method: 'post',
    data: comment
  });
};

commentApi.listComments = (target, targetId, view = 'tree_view', pagination) => {
  return utils_service({
    url: `${baseUrl}/${target}/${targetId}/comments/${view}`,
    params: pagination,
    method: 'get'
  });
};

/* harmony default export */ var api_comment = (commentApi);
// EXTERNAL MODULE: ./node_modules/autosize/dist/autosize.js
var autosize = __webpack_require__("19e9");
var autosize_default = /*#__PURE__*/__webpack_require__.n(autosize);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentEditor.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var CommentEditorvue_type_script_lang_js_ = ({
  name: "CommentEditor",
  components: {
    VEmojiPicker: VEmojiPicker
  },
  props: {
    targetId: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: "posts",
      validator: function (value) {
        return ["posts", "sheets", "journals"].indexOf(value) !== -1;
      }
    },
    replyComment: {
      type: Object,
      required: false,
      default: () => {}
    },
    options: {
      required: false,
      default: []
    },
    configs: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      emojiPack: emojis["default"],
      emojiDialogVisible: false,
      comment: {
        author: null,
        authorUrl: null,
        email: null,
        content: ""
      },
      previewMode: false,
      showEmoji: false,
      infoes: [],
      warnings: [],
      successes: []
    };
  },

  computed: {
    renderedContent() {
      let str = this.comment.content ? marked_default()(this.comment.content) : "";
      return renderedEmojiHtml(str);
    },

    avatar() {
      let gravatar = this.options.comment_gravatar_default == 'mm' ? "" : this.options.comment_gravatar_default;

      if (!this.comment.email || !validEmail(this.comment.email)) {
        return this.configs.gravatarSource + "?d=" + gravatar;
      }

      const gravatarMd5 = md5_default()(this.comment.email);
      return this.configs.gravatarSource + `/${gravatarMd5}?s=256&d=` + gravatar;
    },

    commentValid() {
      return !isEmpty(this.comment.author) && !isEmpty(this.comment.email) && !isEmpty(this.comment.content);
    },

    infoAlertVisiable() {
      return this.infoes !== null && this.infoes.length > 0;
    },

    warningAlertVisiable() {
      return this.warnings !== null && this.warnings.length > 0;
    },

    successAlertVisiable() {
      return this.successes !== null && this.successes.length > 0;
    }

  },

  created() {
    // Get info from local storage
    var author = localStorage.getItem("comment-author");
    var authorUrl = localStorage.getItem("comment-authorUrl");
    var email = localStorage.getItem("comment-email");
    this.comment.author = author ? author : "";
    this.comment.authorUrl = authorUrl ? authorUrl : "";
    this.comment.email = email ? email : ""; // this.handleGetGithubUser();
  },

  mounted() {
    // autosize(this.$refs.commentTextArea);
    autosize_default()(document.querySelector("textarea"));
  },

  methods: {
    handleSubmitClick() {
      if (isEmpty(this.comment.author)) {
        // this.comment.author = '匿名';
        this.warnings.push("评论者昵称不能为空");
        return;
      }

      if (isEmpty(this.comment.email)) {
        this.warnings.push("邮箱不能为空");
        return;
      }

      if (isEmpty(this.comment.content)) {
        this.warnings.push("评论内容不能为空");
        return;
      }

      const content = this.comment.content; // Submit the comment

      this.comment.postId = this.targetId;

      if (this.replyComment) {
        // Set parent id if available
        this.comment.parentId = this.replyComment.id;
      }

      api_comment.createComment(this.target, _objectSpread2(_objectSpread2({}, this.comment), {}, {
        content
      })).then(response => {
        // Store comment author, email, authorUrl
        localStorage.setItem("comment-author", this.comment.author);
        localStorage.setItem("comment-email", this.comment.email);
        localStorage.setItem("comment-authorUrl", this.comment.authorUrl); // clear comment

        this.comment.content = "";
        this.handleCommentCreated(response.data.data);
      }).catch(error => {
        this.handleFailedToCreateComment(error.response);
      });
    },

    handlePreviewContent() {
      if (this.comment.content.length > 0) {
        this.previewMode = !this.previewMode;
        this.showEmoji = false;
        this.emojiDialogVisible = false;
      }
    },

    handleCommentCreated(createdComment) {
      this.clearAlertClose();

      if (createdComment.status === "PUBLISHED") {
        this.successes.push("评论成功，刷新即可显示最新评论！");
      } else {
        // Show tips
        this.infoes.push("您的评论已经投递至博主，等待博主审核！");
      }
    },

    handleFailedToCreateComment(response) {
      this.clearAlertClose();

      if (response.status === 400) {
        this.warnings.push(response.data.message);

        if (response.data) {
          const errorDetail = response.data.data;

          if (isObject(errorDetail)) {
            Object.keys(errorDetail).forEach(key => {
              this.warnings.push(errorDetail[key]);
            });
          }
        }
      }
    },

    handleToogleDialogEmoji() {
      this.previewMode = false;
      this.showEmoji = !this.showEmoji;
      this.emojiDialogVisible = !this.emojiDialogVisible;
    },

    handleSelectEmoji(emoji) {
      if (emoji.aliases != null && emoji.aliases != "") {
        this.comment.content += emoji.aliases;
      } else {
        this.comment.content += emoji.emoji;
      }
    },

    pullInfo() {
      let author = this.comment.author;

      if (author.length != 0 && isQQ(author)) {
        this.pullQQInfo(() => {
          this.warnings.push("拉取QQ信息失败！");
        });
        return;
      }
    },

    pullQQInfo(errorQQCallback) {
      let _self = this;

      axios_default.a.get("https://api.lixingyong.com/api/qq", {
        params: {
          id: _self.comment.author
        }
      }).then(function (res) {
        let data = res.data;

        if (!!data.code && data.code == 500) {
          errorQQCallback();
        }

        _self.comment.author = data.nickname;
        _self.comment.email = data.email; // _self.avatar = data.avatar;
      }).catch(() => {
        errorQQCallback();
      });
    },

    handleGithubLogin() {
      const githubOauthUrl = "http://github.com/login/oauth/authorize";
      const query = {
        client_id: "a1aacd842bc158abd65b",
        redirect_uri: window.location.href,
        scope: "public_repo"
      };
      window.location.href = `${githubOauthUrl}?${queryStringify(query)}`;
    },

    handleGetGithubUser() {
      const accessToken = this.handleGetGithubAccessToken();
      axios_default.a.get("https://cors-anywhere.herokuapp.com/https://api.github.com/user", {
        params: {
          access_token: accessToken
        }
      }).then(function (response) {
        alert(response);
      }).catch(error => {
        alert(error);
      });
    },

    handleGetGithubAccessToken() {
      const code = getUrlKey("code");

      if (code) {
        axios_default.a.get("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token", {
          params: {
            client_id: "a1aacd842bc158abd65b",
            client_secret: "0daedb3923a4cdeb72620df511bdb11685dfe282",
            code: code
          }
        }).then(function (response) {
          let args = response.split("&");
          let arg = args[0].split("=");
          let access_token = arg[1];
          alert(access_token);
          return access_token;
        }).catch(error => {
          alert(error);
        });
      }
    },

    clearAlertClose() {
      this.infoes = [];
      this.warnings = [];
      this.successes = [];
    }

  }
});
// CONCATENATED MODULE: ./src/components/CommentEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommentEditorvue_type_script_lang_js_ = (CommentEditorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/CommentEditor.vue





/* normalize component */

var CommentEditor_component = normalizeComponent(
  components_CommentEditorvue_type_script_lang_js_,
  CommentEditorvue_type_template_id_d68498fc_render,
  CommentEditorvue_type_template_id_d68498fc_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var CommentEditor = (CommentEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentNode.vue?vue&type=template&id=54e2dcec&
var CommentNodevue_type_template_id_54e2dcec_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"comment",class:_vm.isChild?'':'index-1',attrs:{"id":'li-comment-'+_vm.comment.id,"itemtype":"http://schema.org/Comment","itemprop":"comment"}},[_c('div',{staticClass:"comment-body",attrs:{"id":'comment-'+_vm.comment.id}},[_c('div',{staticClass:"comment-avatar"},[_c('img',{staticClass:"avatar",attrs:{"alt":_vm.comment.author+"'s avatar","src":_vm.avatar}})]),_c('div',{staticClass:"contain-main"},[_c('div',{staticClass:"comment-meta"},[_c('div',{staticClass:"comment-author",attrs:{"itemprop":"author"}},[(_vm.comment.authorUrl != null && _vm.comment.authorUrl != '')?_c('a',{staticClass:"author-name",attrs:{"href":_vm.comment.authorUrl,"rel":"nofollow","target":"_blank"}},[_vm._v(_vm._s(_vm.comment.author))]):_c('a',{staticClass:"author-name"},[_vm._v(_vm._s(_vm.comment.author))]),(_vm.comment.isAdmin)?_c('span',{staticClass:"is-admin"},[_vm._v("博主")]):_vm._e(),(_vm.configs.showUserAgent)?_c('span',{staticClass:"useragent-info"},[_vm._v(_vm._s(_vm.compileUserAgent)+" ")]):_vm._e()]),_c('div',{staticClass:"comment-info"},[_c('time',{staticClass:"comment-time",attrs:{"itemprop":"datePublished","datetime":_vm.comment.createTime}},[_vm._v(_vm._s(this.timeAgo(_vm.comment.createTime))+" ")])])]),_c('div',{staticClass:"comment-content markdown-body",attrs:{"itemprop":"description"},domProps:{"innerHTML":_vm._s(_vm.compileContent)}}),_c('div',{staticClass:"comment-info"},[_c('span',{staticClass:"comment-reply",on:{"click":_vm.handleReplyClick}},[_vm._v(_vm._s(_vm.editing?'取消回复':'回复'))])])])]),(_vm.editing)?_c('comment-editor',{attrs:{"targetId":_vm.targetId,"target":_vm.target,"replyComment":_vm.comment,"options":_vm.options,"configs":_vm.configs}}):_vm._e(),(_vm.comment.children)?_c('ol',{staticClass:"children"},[_vm._l((_vm.comment.children),function(children,index){return [_c('CommentNode',{key:index,attrs:{"isChild":true,"targetId":_vm.targetId,"target":_vm.target,"comment":children,"options":_vm.options,"configs":_vm.configs}})]})],2):_vm._e()],1)}
var CommentNodevue_type_template_id_54e2dcec_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommentNode.vue?vue&type=template&id=54e2dcec&

// EXTERNAL MODULE: ./node_modules/ua-parser-js/src/ua-parser.js
var ua_parser = __webpack_require__("2b80");
var ua_parser_default = /*#__PURE__*/__webpack_require__.n(ua_parser);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentNode.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var CommentNodevue_type_script_lang_js_ = ({
  name: "CommentNode",
  props: {
    isChild: {
      type: Boolean,
      required: false,
      default: false
    },
    targetId: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: "posts",
      validator: function (value) {
        return ["posts", "sheets", "journals"].indexOf(value) !== -1;
      }
    },
    comment: {
      type: Object,
      required: false,
      default: () => {}
    },
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    configs: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      editing: false
    };
  },

  computed: {
    avatar() {
      let gravatar = this.options.comment_gravatar_default == 'mm' ? "" : this.options.comment_gravatar_default;
      return this.configs.gravatarSource + `/${this.comment.gravatarMd5}?s=256&d=` + gravatar;
    },

    compileContent() {
      var at = "";

      if (this.comment.parentId !== null && this.comment.parentId > 0) {
        at = '<a>@' + this.comment.parentAuthor + '</a>';
      }

      let str = at + marked_default()(decodeHTML(this.comment.content));
      return renderedEmojiHtml(str);
    },

    createTimeAgo() {
      return timeAgo(this.comment.createTime);
    },

    compileUserAgent() {
      var parser = new ua_parser_default.a();
      parser.setUA(this.comment.userAgent);
      var result = parser.getResult();
      return result.browser.name + " " + result.browser.version + " in " + result.os.name + " " + result.os.version;
    }

  },
  methods: {
    handleReplyClick() {
      this.editing = !this.editing;
    },

    timeAgo(dateTimeStamp) {
      //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
      const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示

      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7; // const halfamonth = day * 15;

      const month = day * 30;
      const now = new Date().getTime(); //获取当前时间毫秒

      const diffValue = now - dateTimeStamp; //时间差

      if (diffValue < 0) {
        return;
      }

      const minC = diffValue / minute; //计算时间差的分，时，天，周，月

      const hourC = diffValue / hour;
      const dayC = diffValue / day;
      const weekC = diffValue / week;
      const monthC = diffValue / month;
      let result;

      if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前";
      } else if (weekC >= 1 && weekC <= 4) {
        if (weekC > 4) {
          result = " " + Math.floor(weekC) + "周前";
        } else {
          result = " " + parseInt(weekC) + "周前";
        }
      } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前";
      } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前";
      } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前";
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚";
      } else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "/" + Nmonth + "/" + Ndate + " " + Nhour + ":" + Nminute + ":" + Nsecond;
      }

      return result;
    }

  }
});
// CONCATENATED MODULE: ./src/components/CommentNode.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommentNodevue_type_script_lang_js_ = (CommentNodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/CommentNode.vue





/* normalize component */

var CommentNode_component = normalizeComponent(
  components_CommentNodevue_type_script_lang_js_,
  CommentNodevue_type_template_id_54e2dcec_render,
  CommentNodevue_type_template_id_54e2dcec_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var CommentNode = (CommentNode_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentLoading.vue?vue&type=template&id=1f98d647&
var CommentLoadingvue_type_template_id_1f98d647_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"comment-loader-container"},[(_vm.configs.loadingStyle==='default')?_c('div',{staticClass:"comment-loader-default"},[_c('span'),_c('span'),_c('span'),_c('span')]):(_vm.configs.loadingStyle==='circle')?_c('div',{staticClass:"comment-loader-circle"}):(_vm.configs.loadingStyle==='balls')?_c('div',{staticClass:"comment-loader-balls"},[_c('div'),_c('div'),_c('div')]):_vm._e()])}
var CommentLoadingvue_type_template_id_1f98d647_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommentLoading.vue?vue&type=template&id=1f98d647&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentLoading.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CommentLoadingvue_type_script_lang_js_ = ({
  name: "CommentLoading",
  props: {
    configs: {
      type: Object,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/CommentLoading.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommentLoadingvue_type_script_lang_js_ = (CommentLoadingvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/CommentLoading.vue





/* normalize component */

var CommentLoading_component = normalizeComponent(
  components_CommentLoadingvue_type_script_lang_js_,
  CommentLoadingvue_type_template_id_1f98d647_render,
  CommentLoadingvue_type_template_id_1f98d647_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var CommentLoading = (CommentLoading_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"57ca8778-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Pagination.vue?vue&type=template&id=bf3a59d0&
var Paginationvue_type_template_id_bf3a59d0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"page"},[_c('li',{staticClass:"page-item",class:{ disabled: !_vm.hasPrev }},[_c('a',{staticClass:"prev-button",attrs:{"tabindex":"-1"},on:{"click":_vm.handlePrevClick}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 16 16","width":"16","height":"16"}},[_c('path',{attrs:{"fill-rule":"evenodd","d":"M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"}})])])]),(_vm.firstPage != null)?_c('li',{staticClass:"page-item",class:{ active: _vm.page === _vm.firstPage}},[_c('a',{class:{ active: _vm.page === _vm.firstPage},on:{"click":function($event){return _vm.handlePageItemClick(_vm.firstPage)}}},[_vm._v(_vm._s(_vm.firstPage + 1)+" ")])]):_vm._e(),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasMorePrev),expression:"hasMorePrev"}],staticClass:"page-item"},[_c('a',[_vm._v(" ... ")])]),_vm._l((_vm.middlePages),function(middlePage){return _c('li',{key:middlePage,staticClass:"page-item",class:{ active: middlePage === _vm.page }},[_c('a',{class:{ active: middlePage === _vm.page },on:{"click":function($event){return _vm.handlePageItemClick(middlePage)}}},[_vm._v(" "+_vm._s(middlePage + 1)+" ")])])}),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasMoreNext),expression:"hasMoreNext"}],staticClass:"page-item"},[_c('a',[_vm._v(" ... ")])]),(_vm.lastPage)?_c('li',{staticClass:"page-item",class:{ active: _vm.page === _vm.lastPage}},[_c('a',{class:{ active: _vm.page === _vm.lastPage},on:{"click":function($event){return _vm.handlePageItemClick(_vm.lastPage)}}},[_vm._v(" "+_vm._s(_vm.lastPage + 1)+" ")])]):_vm._e(),_c('li',{staticClass:"page-item",class:{ disabled: !_vm.hasNext }},[_c('a',{staticClass:"next-button",on:{"click":_vm.handleNextClick}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 16 16","width":"16","height":"16"}},[_c('path',{attrs:{"fill-rule":"evenodd","d":"M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"}})])])])],2)}
var Paginationvue_type_template_id_bf3a59d0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Pagination.vue?vue&type=template&id=bf3a59d0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Pagination.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Paginationvue_type_script_lang_js_ = ({
  name: "Pagination",
  model: {
    prop: "page",
    event: "change"
  },
  props: {
    page: {
      type: Number,
      required: false,
      default: 0
    },
    size: {
      type: Number,
      required: false,
      default: 10
    },
    total: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data() {
    return {
      middleSize: 3
    };
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.size);
    },

    hasNext() {
      return this.page < this.pages - 1;
    },

    hasPrev() {
      return this.page > 0;
    },

    firstPage() {
      if (this.pages === 0) {
        return null;
      }

      return 0;
    },

    hasMorePrev() {
      if (this.firstPage === null || this.pages <= this.middleSize + 2) {
        return false;
      }

      return this.page >= 2 + this.middleSize / 2;
    },

    hasMoreNext() {
      if (this.lastPage === null || this.pages <= this.middleSize + 2) {
        return false;
      }

      return this.page < this.lastPage - 1 - this.middleSize / 2;
    },

    middlePages() {
      if (this.pages <= 2) {
        return [];
      }

      if (this.pages <= 2 + this.middleSize) {
        return this.range(1, this.lastPage);
      }

      const halfMiddleSize = Math.floor(this.middleSize / 2);
      let left = this.page - halfMiddleSize;
      let right = this.page + halfMiddleSize;

      if (this.page <= this.firstPage + halfMiddleSize + 1) {
        left = this.firstPage + 1;
        right = left + this.middleSize - 1;
      } else if (this.page >= this.lastPage - halfMiddleSize - 1) {
        right = this.lastPage - 1;
        left = right - this.middleSize + 1;
      }

      return this.range(left, right + 1);
    },

    lastPage() {
      if (this.pages === 0 || this.pages === 1) {
        return 0;
      }

      return this.pages - 1;
    }

  },
  methods: {
    handleNextClick() {
      if (this.hasNext) {
        this.$emit("change", this.page + 1);
      }
    },

    handlePrevClick() {
      if (this.hasPrev) {
        this.$emit("change", this.page - 1);
      }
    },

    handlePageItemClick(page) {
      this.$emit("change", page);
    },

    range(left, right) {
      if (left >= right) {
        return [];
      }

      const result = [];

      for (let i = left; i < right; i++) {
        result.push(i);
      }

      return result;
    }

  }
});
// CONCATENATED MODULE: ./src/components/Pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Paginationvue_type_script_lang_js_ = (Paginationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Pagination.vue



function Pagination_injectStyles (context) {
  
  
}

/* normalize component */

var Pagination_component = normalizeComponent(
  components_Paginationvue_type_script_lang_js_,
  Paginationvue_type_template_id_bf3a59d0_render,
  Paginationvue_type_template_id_bf3a59d0_staticRenderFns,
  false,
  Pagination_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var Pagination = (Pagination_component.exports);
// CONCATENATED MODULE: ./src/components/index.js





const _components = {
  CommentEditor: CommentEditor,
  CommentNode: CommentNode,
  CommentLoading: CommentLoading,
  Pagination: Pagination
};
const components = {};
Object.keys(_components).forEach(key => {
  components[key] = external_Vue_default.a.component(key, _components[key]);
});
/* harmony default export */ var src_components = (components);
// CONCATENATED MODULE: ./src/api/option.js

const option_baseUrl = '/api/content/options';
const optionApi = {};

optionApi.list = () => {
  return utils_service({
    url: `${option_baseUrl}/comment`,
    method: 'get'
  });
};

/* harmony default export */ var api_option = (optionApi);
// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__("9224");

// EXTERNAL MODULE: ./node_modules/viewerjs/dist/viewer.js
var viewer = __webpack_require__("c82c");
var viewer_default = /*#__PURE__*/__webpack_require__.n(viewer);

// EXTERNAL MODULE: ./node_modules/viewerjs/dist/viewer.css
var dist_viewer = __webpack_require__("0808");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Comment.vue?vue&type=script&lang=js&shadow




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var Commentvue_type_script_lang_js_shadow = ({
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      required: false,
      default: "post",
      validator: function (value) {
        return ["post", "sheet", "journal"].indexOf(value) !== -1;
      }
    },
    configs: {
      type: Object,
      required: false,
      default: () => ({
        // auto load comment,default true
        autoLoad: true,
        showUserAgent: true,
        gravatarSource: "//cdn.v2ex.com/gravatar",
        loadingStyle: "default",
        darkMode: false
      })
    }
  },

  data() {
    return {
      comments: [],
      commentAuthor: new Map(),
      pagination: {
        pages: 0,
        page: 0,
        sort: "",
        size: 5,
        total: 0
      },
      commentCount: 0,
      commentLoading: false,
      loaded: false,
      repliedSuccess: null,
      replyingComment: null,
      alexVersion: package_0.version,
      options: {
        comment_gravatar_default: ""
      }
    };
  },

  computed: {
    target() {
      // pluralize it
      return `${this.type}s`;
    },

    mergedConfigs() {
      let propConfigs = this.configs;

      if (typeof this.configs === 'string') {
        propConfigs = JSON.parse(this.configs);
      }

      return Object.assign({
        autoLoad: true,
        showUserAgent: true,
        gravatarSource: "//cdn.v2ex.com/gravatar",
        loadingStyle: "default",
        darkMode: false
      }, propConfigs);
    }

  },

  created() {
    if (this.mergedConfigs.autoLoad) {
      this.loadComments();
    }

    this.loadOptions();
  },

  updated() {
    // 评论图片灯箱
    const gallery = this.$refs.gallery;

    if (gallery) {
      new viewer_default.a(gallery, {
        inline: false,

        filter(image) {
          const clsName = image.className + '';
          return clsName.indexOf('avatar') < 0;
        }

      });
    }
  },

  methods: {
    loadComments() {
      this.comments = [];
      this.commentLoading = true;
      api_comment.listComments(this.target, this.id, "tree_view", this.pagination).then(response => {
        this.commentCount = response.data.data.commentCount;
        this.comments = response.data.data.content;
        this.pagination.size = response.data.data.rpp;
        this.pagination.total = response.data.data.total;
        this.pagination.pages = response.data.data.pages;

        if (this.comments) {
          this.comments.forEach(comment => {
            this.setCommentAuthor(comment);
          });
        }
      }).finally(() => {
        this.commentLoading = false;
        this.loaded = true;
      });
    },

    setCommentAuthor(comment) {
      if (comment.children) {
        this.commentAuthor.set(comment.id, comment.author);
        this.setCommentAuthor(comment.children);
      }

      if (comment instanceof Array) {
        comment.forEach(c => {
          if (c.parentId > 0) {
            c.parentAuthor = this.commentAuthor.get(c.parentId);
            this.setCommentAuthor(c);
          }
        });
        comment.sort(this.sortComment);
      }
    },

    sortComment(a, b) {
      return a.id - b.id;
    },

    loadOptions() {
      api_option.list().then(response => {
        this.options = response.data.data;
      });
    },

    handlePaginationChange(page) {
      this.pagination.page = page;
      this.loadComments();
    }

  }
});
// CONCATENATED MODULE: ./src/components/Comment.vue?vue&type=script&lang=js&shadow
 /* harmony default export */ var components_Commentvue_type_script_lang_js_shadow = (Commentvue_type_script_lang_js_shadow); 
// CONCATENATED MODULE: ./src/components/Comment.vue?shadow



function Commentshadow_injectStyles (context) {
  
  var style0 = __webpack_require__("a85a")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Commentshadow_component = normalizeComponent(
  components_Commentvue_type_script_lang_js_shadow,
  render,
  staticRenderFns,
  false,
  Commentshadow_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var Commentshadow = (Commentshadow_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-wc.js




// runtime shared by every component chunk





window.customElements.define('halo-comment', vue_wc_wrapper(external_Vue_default.a, Commentshadow))

/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "63d2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://www.ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__("00d8"),
      utf8 = __webpack_require__("9a63").utf8,
      isBuffer = __webpack_require__("044b"),
      bin = __webpack_require__("9a63").bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "688e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7282":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e01a");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_0__);


class Emoji {
  constructor(emoji, description, category, aliases, tags) {
    this.emoji = emoji;
    this.description = description;
    this.category = category;
    this.aliases = aliases;
    this.tags = tags;
  }

}

/* harmony default export */ __webpack_exports__["default"] = ([new Emoji("<img alt=\"smile\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e3/2018new_weixioa02_org.png\">", "", "", " :smile: ", []), new Emoji("<img alt=\"lovely\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/2018new_keai_org.png\">", "", "", " :lovely: ", []), new Emoji("<img alt=\"happy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/2018new_taikaixin_org.png\">", "", "", " :happy: ", []), new Emoji("<img alt=\"clap\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_guzhang_thumb.png\">", "", "", " :clap: ", []), new Emoji("<img alt=\"whee\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/33/2018new_xixi_thumb.png\">", "", "", " :whee: ", []), new Emoji("<img alt=\"haha\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/2018new_haha_thumb.png\">", "", "", " :haha: ", []), new Emoji("<img alt=\"laugh and cry\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/2018new_xiaoku_thumb.png\">", "", "", " :laugh and cry: ", []), new Emoji("<img alt=\"wink\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/43/2018new_jiyan_org.png\">", "", "", " :wink: ", []), new Emoji("<img alt=\"greddy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fa/2018new_chanzui_org.png\">", "", "", " :greddy: ", []), new Emoji("<img alt=\"awkward\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a3/2018new_heixian_thumb.png\">", "", "", " :awkward: ", []), new Emoji("<img alt=\"sweat\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/28/2018new_han_org.png\">", "", "", " :sweat: ", []), new Emoji("<img alt=\"pick nose\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9a/2018new_wabi_thumb.png\">", "", "", " :pick nose: ", []), new Emoji("<img alt=\"hum\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/2018new_heng_thumb.png\">", "", "", " :hum: ", []), new Emoji("<img alt=\"angry\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f6/2018new_nu_thumb.png\">", "", "", " :angry: ", []), new Emoji("<img alt=\"grievance\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/2018new_weiqu_thumb.png\">", "", "", " :grievance: ", []), new Emoji("<img alt=\"poor\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/2018new_kelian_org.png\">", "", "", " :poor: ", []), new Emoji("<img alt=\"disappoint\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/aa/2018new_shiwang_thumb.png\">", "", "", " :disappoint: ", []), new Emoji("<img alt=\"sad\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ee/2018new_beishang_org.png\">", "", "", " :sad: ", []), new Emoji("<img alt=\"tear\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_leimu_org.png\">", "", "", " :tear: ", []), new Emoji("<img alt=\"no way\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/83/2018new_kuxiao_org.png\">", "", "", " :no way: ", []), new Emoji("<img alt=\"shy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c1/2018new_haixiu_org.png\">", "", "", " :shy: ", []), new Emoji("<img alt=\"dirt\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/10/2018new_wu_thumb.png\">", "", "", " :dirt: ", []), new Emoji("<img alt=\"love you\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f6/2018new_aini_org.png\">", "", "", " :love you: ", []), new Emoji("<img alt=\"kiss\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2c/2018new_qinqin_thumb.png\">", "", "", " :kiss: ", []), new Emoji("<img alt=\"amorousness\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/2018new_huaxin_org.png\">", "", "", " :amorousness: ", []), new Emoji("<img alt=\"longing\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c9/2018new_chongjing_org.png\">", "", "", " :longing: ", []), new Emoji("<img alt=\"desire\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3e/2018new_tianping_thumb.png\">", "", "", " :desire: ", []), new Emoji("<img alt=\"bad laugh\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4d/2018new_huaixiao_org.png\">", "", "", " :bad laugh: ", []), new Emoji("<img alt=\"blackness\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/2018new_yinxian_org.png\">", "", "", " :blackness: ", []), new Emoji("<img alt=\"laugh without word\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2d/2018new_xiaoerbuyu_org.png\">", "", "", " :laugh without word: ", []), new Emoji("<img alt=\"titter\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/2018new_touxiao_org.png\">", "", "", " :titter: ", []), new Emoji("<img alt=\"cool\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c4/2018new_ku_org.png\">", "", "", " :cool: ", []), new Emoji("<img alt=\"not easy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/aa/2018new_bingbujiandan_thumb.png\">", "", "", " :not easy: ", []), new Emoji("<img alt=\"think\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/30/2018new_sikao_org.png\">", "", "", " :think: ", []), new Emoji("<img alt=\"question\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b8/2018new_ningwen_org.png\">", "", "", " :question: ", []), new Emoji("<img alt=\"no idea\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2a/2018new_wenhao_thumb.png\">", "", "", " :no idea: ", []), new Emoji("<img alt=\"dizzy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/07/2018new_yun_thumb.png\">", "", "", " :dizzy: ", []), new Emoji("<img alt=\"bomb\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a2/2018new_shuai_thumb.png\">", "", "", " :bomb: ", []), new Emoji("<img alt=\"bone\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a1/2018new_kulou_thumb.png\">", "", "", " :bone: ", []), new Emoji("<img alt=\"be quiet\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b0/2018new_xu_org.png\">", "", "", " :be quiet: ", []), new Emoji("<img alt=\"shut up\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/2018new_bizui_org.png\">", "", "", " :shut up: ", []), new Emoji("<img alt=\"stupid\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/dd/2018new_shayan_org.png\">", "", "", " :stupid: ", []), new Emoji("<img alt=\"surprise \" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/2018new_chijing_org.png\">", "", "", " :surprise : ", []), new Emoji("<img alt=\"vomit\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/08/2018new_tu_org.png\">", "", "", " :vomit: ", []), new Emoji("<img alt=\"cold\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/2018new_kouzhao_thumb.png\">", "", "", " :cold: ", []), new Emoji("<img alt=\"sick\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3b/2018new_shengbing_thumb.png\">", "", "", " :sick: ", []), new Emoji("<img alt=\"bye\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fd/2018new_baibai_thumb.png\">", "", "", " :bye: ", []), new Emoji("<img alt=\"look down on\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/da/2018new_bishi_org.png\">", "", "", " :look down on: ", []), new Emoji("<img alt=\"white eye\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ef/2018new_landelini_org.png\">", "", "", " :white eye: ", []), new Emoji("<img alt=\"left hum\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/43/2018new_zuohengheng_thumb.png\">", "", "", " :left hum: ", []), new Emoji("<img alt=\"right hum\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c1/2018new_youhengheng_thumb.png\">", "", "", " :right hum: ", []), new Emoji("<img alt=\"crazy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/17/2018new_zhuakuang_org.png\">", "", "", " :crazy: ", []), new Emoji("<img alt=\"scold \" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/87/2018new_zhouma_thumb.png\">", "", "", " :scold : ", []), new Emoji("<img alt=\"hit on face\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cb/2018new_dalian_org.png\">", "", "", " :hit on face: ", []), new Emoji("<img alt=\"wow\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/2018new_ding_org.png\">", "", "", " :wow: ", []), new Emoji("<img alt=\"fan\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/86/2018new_hufen02_org.png\">", "", "", " :fan: ", []), new Emoji("<img alt=\"money\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a2/2018new_qian_thumb.png\">", "", "", " :money: ", []), new Emoji("<img alt=\"yawn\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/55/2018new_dahaqian_org.png\">", "", "", " :yawn: ", []), new Emoji("<img alt=\"sleepy\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/2018new_kun_thumb.png\">", "", "", " :sleepy: ", []), new Emoji("<img alt=\"sleep\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e2/2018new_shuijiao_thumb.png\">", "", "", " :sleep: ", []), new Emoji("<img alt=\"watermelon \" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/01/2018new_chigua_thumb.png\">", "", "", " :watermelon : ", []), new Emoji("<img alt=\"doge\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a1/2018new_doge02_org.png\">", "", "", " :doge: ", []), new Emoji("<img alt=\"dog\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/22/2018new_erha_org.png\">", "", "", " :dog: ", []), new Emoji("<img alt=\"cat\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7b/2018new_miaomiao_thumb.png\">", "", "", " :cat: ", []), new Emoji("<img alt=\"thumb\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e6/2018new_zan_org.png\">", "", "", " :thumb: ", []), new Emoji("<img alt=\"good\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8a/2018new_good_org.png\">", "", "", " :good: ", []), new Emoji("<img alt=\"ok\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/45/2018new_ok_org.png\">", "", "", " :ok: ", []), new Emoji("<img alt=\"yeah\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/2018new_ye_thumb.png\">", "", "", " :yeah: ", []), new Emoji("<img alt=\"shack hand\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/2018new_woshou_thumb.png\">", "", "", " :shack hand: ", []), new Emoji("<img alt=\"bow\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e7/2018new_zuoyi_org.png\">", "", "", " :bow: ", []), new Emoji("<img alt=\"come\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/42/2018new_guolai_thumb.png\">", "", "", " :come: ", []), new Emoji("<img alt=\"punch\" referrerpolicy=\"no-referrer\" class=\"vemoji\" src=\"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/86/2018new_quantou_thumb.png\">", "", "", " :punch: ", []), new Emoji(" OωO ", "", "颜文字", "", []), new Emoji(" |´・ω・) ノ ", "", "颜文字", "", []), new Emoji(" ヾ (≧∇≦*) ゝ ", "", "颜文字", "", []), new Emoji(" (☆ω☆) ", "", "颜文字", "", []), new Emoji(" (ง ˙o˙)ว ", "", "颜文字", "", []), new Emoji(" (/ω＼) ", "", "颜文字", "", []), new Emoji(" (๑•̀ㅁ•́ฅ) ", "", "颜文字", "", []), new Emoji(" ୧(๑•̀⌄•́๑)૭ ", "", "颜文字", "", []), new Emoji(" (๑◕ܫ￩๑)b ", "", "颜文字", "", []), new Emoji(" (;-_-)ᴇᴍᴍᴍ ", "", "颜文字", "", []), new Emoji(" ฅ'ω'ฅ♪ ", "", "颜文字", "", []), new Emoji(" →_→ ", "", "颜文字", "", []), new Emoji(" ٩(ˊᗜˋ*)و ", "", "颜文字", "", []), new Emoji(" (ノ °ο°) ノ ", "", "颜文字", "", []), new Emoji(" (´இ皿இ｀) ", "", "颜文字", "", []), new Emoji(" (ó﹏ò｡) ", "", "颜文字", "", []), new Emoji(" Σ(っ °Д °;) っ ", "", "颜文字", "", []), new Emoji(" (ฅ´ω`ฅ) ", "", "颜文字", "", []), new Emoji(" (╯°A°)╯︵○○○ ", "", "颜文字", "", []), new Emoji(" φ(￣∇￣o) ", "", "颜文字", "", []), new Emoji(" ヾ (´･ ･｀｡) ノ \" ", "", "颜文字", "", []), new Emoji(" (ง ᵒ̌皿ᵒ̌)ง⁼³₌₃ ", "", "颜文字", "", []), new Emoji(" (ó﹏ò｡) ", "", "颜文字", "", []), new Emoji(" (,,´･ω･)ﾉ\"(´ っ ω･｀｡) ", "", "颜文字", "", []), new Emoji(" ╮(╯▽╰)╭ ", "", "颜文字", "", []), new Emoji(" o(*////▽////*)q ", "", "颜文字", "", []), new Emoji(" ＞﹏＜ ", "", "颜文字", "", []), new Emoji(" ( ๑´•ω•) \"(ㆆᴗㆆ) ", "", "颜文字", "", []), new Emoji(" (｡•ˇ‸ˇ•｡) ", "", "颜文字", "", []), new Emoji("😀", "", "经典", "", []), new Emoji("😃", "", "经典", "", []), new Emoji("😄", "", "经典", "", []), new Emoji("😁", "", "经典", "", []), new Emoji("😆", "", "经典", "", []), new Emoji("😅", "", "经典", "", []), new Emoji("😂", "", "经典", "", []), new Emoji("🤣", "", "经典", "", []), new Emoji("😌", "", "经典", "", []), new Emoji("😊", "", "经典", "", []), new Emoji("😇", "", "经典", "", []), new Emoji("🙂", "", "经典", "", []), new Emoji("🙃", "", "经典", "", []), new Emoji("😉", "", "经典", "", []), new Emoji("😌", "", "经典", "", []), new Emoji("😍", "", "经典", "", []), new Emoji("😘", "", "经典", "", []), new Emoji("😗", "", "经典", "", []), new Emoji("😙", "", "经典", "", []), new Emoji("😚", "", "经典", "", []), new Emoji("😋", "", "经典", "", []), new Emoji("😜", "", "经典", "", []), new Emoji("😝", "", "经典", "", []), new Emoji("😛", "", "经典", "", []), new Emoji("🤑", "", "经典", "", []), new Emoji("🤗", "", "经典", "", []), new Emoji("🤓", "", "经典", "", []), new Emoji("😎", "", "经典", "", []), new Emoji("🤠", "", "经典", "", []), new Emoji("😏", "", "经典", "", []), new Emoji("😒", "", "经典", "", []), new Emoji("😞", "", "经典", "", []), new Emoji("😔", "", "经典", "", []), new Emoji("😟", "", "经典", "", []), new Emoji("😕", "", "经典", "", []), new Emoji("🙁", "", "经典", "", []), new Emoji("☹️", "", "经典", "", []), new Emoji("😣", "", "经典", "", []), new Emoji("😖", "", "经典", "", []), new Emoji("😫", "", "经典", "", []), new Emoji("😩", "", "经典", "", []), new Emoji("😤", "", "经典", "", []), new Emoji("😠", "", "经典", "", []), new Emoji("😡", "", "经典", "", []), new Emoji("😶", "", "经典", "", []), new Emoji("😐", "", "经典", "", []), new Emoji("😑", "", "经典", "", []), new Emoji("😯", "", "经典", "", []), new Emoji("😦", "", "经典", "", []), new Emoji("😧", "", "经典", "", []), new Emoji("😮", "", "经典", "", []), new Emoji("😲", "", "经典", "", []), new Emoji("😵", "", "经典", "", []), new Emoji("😳", "", "经典", "", []), new Emoji("😱", "", "经典", "", []), new Emoji("😨", "", "经典", "", []), new Emoji("😰", "", "经典", "", []), new Emoji("😢", "", "经典", "", []), new Emoji("😥", "", "经典", "", []), new Emoji("🤤", "", "经典", "", []), new Emoji("😭", "", "经典", "", []), new Emoji("😓", "", "经典", "", []), new Emoji("😪", "", "经典", "", []), new Emoji("😴", "", "经典", "", []), new Emoji("🙄", "", "经典", "", []), new Emoji("🤔", "", "经典", "", []), new Emoji("🤥", "", "经典", "", []), new Emoji("😬", "", "经典", "", []), new Emoji("🤐", "", "经典", "", []), new Emoji("🤢", "", "经典", "", []), new Emoji("🤧", "", "经典", "", []), new Emoji("😷", "", "经典", "", []), new Emoji("🤒", "", "经典", "", []), new Emoji("🤕", "", "经典", "", [])]);

/***/ }),

/***/ "72f2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://www.ecma-international.org/ecma-262/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "791b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e64f");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("6193bffe", content, shadowRoot)
};

/***/ }),

/***/ "7a77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "7aac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7b13":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__("be77");

requirePromise();

var IsCallable = __webpack_require__("7f73");
var SpeciesConstructor = __webpack_require__("8253");
var Type = __webpack_require__("3d27");

var promiseResolve = function PromiseResolve(C, value) {
	return new C(function (resolve) {
		resolve(value);
	});
};

var OriginalPromise = Promise;

var createThenFinally = function CreateThenFinally(C, onFinally) {
	return function (value) {
		var result = onFinally();
		var promise = promiseResolve(C, result);
		var valueThunk = function () {
			return value;
		};
		return promise.then(valueThunk);
	};
};

var createCatchFinally = function CreateCatchFinally(C, onFinally) {
	return function (reason) {
		var result = onFinally();
		var promise = promiseResolve(C, result);
		var thrower = function () {
			throw reason;
		};
		return promise.then(thrower);
	};
};

var promiseFinally = function finally_(onFinally) {
	/* eslint no-invalid-this: 0 */

	var promise = this;

	if (Type(promise) !== 'Object') {
		throw new TypeError('receiver is not an Object');
	}

	var C = SpeciesConstructor(promise, OriginalPromise); // may throw

	var thenFinally = onFinally;
	var catchFinally = onFinally;
	if (IsCallable(onFinally)) {
		thenFinally = createThenFinally(C, onFinally);
		catchFinally = createCatchFinally(C, onFinally);
	}

	return promise.then(thenFinally, catchFinally);
};

if (Object.getOwnPropertyDescriptor) {
	var descriptor = Object.getOwnPropertyDescriptor(promiseFinally, 'name');
	if (descriptor && descriptor.configurable) {
		Object.defineProperty(promiseFinally, 'name', { configurable: true, value: 'finally' });
	}
}

module.exports = promiseFinally;


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f73":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://www.ecma-international.org/ecma-262/5.1/#sec-9.11

module.exports = __webpack_require__("21d0");


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "8253":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = __webpack_require__("2c92");
var Type = __webpack_require__("3d27");

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "83b9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__("d925");
var combineURLs = __webpack_require__("e683");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "845e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emoji_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("437b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emoji_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emoji_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emoji_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emoji_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emoji_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8926":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__("be77");

var implementation = __webpack_require__("7b13");

module.exports = function getPolyfill() {
	requirePromise();
	return typeof Promise.prototype['finally'] === 'function' ? Promise.prototype['finally'] : implementation;
};


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ "8df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("7a77");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9224":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"halo-comment-alex\",\"version\":\"v1.1.4\",\"private\":false,\"scripts\":{\"serve\":\"vue-cli-service serve\",\"build\":\"vue-cli-service build\",\"build-comment\":\"cross-env vue-cli-service build --target wc --name halo-comment 'src/components/Comment.vue'\",\"lint\":\"vue-cli-service lint\"},\"dependencies\":{\"vue\":\"^2.6.10\",\"autosize\":\"^4.0.2\",\"axios\":\"^0.19.0\",\"highlight\":\"^0.2.4\",\"highlight.js\":\"^10.4.1\",\"highlightjs\":\"^9.16.2\",\"marked\":\"^1.1.0\",\"md5\":\"^2.2.1\",\"cross-env\":\"7.0.2\",\"promise.prototype.finally\":\"^3.1.2\",\"ua-parser-js\":\"^0.7.21\",\"viewerjs\":\"^1.6.1\"},\"devDependencies\":{\"@vue/cli-plugin-babel\":\"^4.1.0\",\"@vue/cli-plugin-eslint\":\"^4.1.0\",\"@vue/cli-service\":\"^4.1.0\",\"babel-eslint\":\"^10.0.3\",\"eslint\":\"^5.16.0\",\"eslint-plugin-vue\":\"^5.0.0\",\"node-sass\":\"^4.13.0\",\"sass-loader\":\"^8.0.0\",\"vue-template-compiler\":\"^2.6.10\"},\"eslintConfig\":{\"root\":true,\"env\":{\"node\":true},\"extends\":[\"plugin:vue/essential\",\"eslint:recommended\"],\"rules\":{\"no-console\":\"off\"},\"parserOptions\":{\"parser\":\"babel-eslint\"}},\"browserslist\":[\"> 1%\",\"last 2 versions\"],\"description\":\"<h1 align=\\\"center\\\"><a href=\\\"https://github.com/halo-dev\\\" target=\\\"_blank\\\">halo-comment-normal</a></h1> > 适用于 Halo 的评论组件。\",\"main\":\"babel.config.js\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/coortop/halo-comment-alex.git\"},\"author\":\"弥枳\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/coortop/halo-comment-alex/issues\"},\"homepage\":\"https://github.com/coortop/halo-comment-alex#readme\"}");

/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9a63":
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9c74":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__("a0d3");

var assertRecord = __webpack_require__("c46d");

var Type = __webpack_require__("3d27");

// https://www.ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};


/***/ }),

/***/ "9dc9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assertRecord = __webpack_require__("c46d");

var Type = __webpack_require__("3d27");

// https://www.ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a0d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("0f7c");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a79d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var NativePromise = __webpack_require__("fea9");
var fails = __webpack_require__("d039");
var getBuiltIn = __webpack_require__("d066");
var speciesConstructor = __webpack_require__("4840");
var promiseResolve = __webpack_require__("cdf9");
var redefine = __webpack_require__("6eeb");

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}


/***/ }),

/***/ "a85a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("791b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b189":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__("d4ab"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "b50d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var settle = __webpack_require__("467f");
var buildURL = __webpack_require__("30b5");
var buildFullPath = __webpack_require__("83b9");
var parseHeaders = __webpack_require__("c345");
var isURLSameOrigin = __webpack_require__("3934");
var createError = __webpack_require__("2d83");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("7aac");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "b575":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var classof = __webpack_require__("c6b6");
var macrotask = __webpack_require__("2cf4").set;
var IS_IOS = __webpack_require__("1cdc");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "bc3a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cee4");

/***/ }),

/***/ "be77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function requirePromise() {
	if (typeof Promise !== 'function') {
		throw new TypeError('`Promise.prototype.finally` requires a global `Promise` be available.');
	}
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c345":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "c401":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c46d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = __webpack_require__("a0d3");

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};


/***/ }),

/***/ "c532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("1d2b");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c82c":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Viewer.js v1.6.1
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-06-14T07:47:18.114Z
 */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var DEFAULTS = {
    /**
     * Enable a modal backdrop, specify `static` for a backdrop
     * which doesn't close the modal on click.
     * @type {boolean}
     */
    backdrop: true,

    /**
     * Show the button on the top-right of the viewer.
     * @type {boolean}
     */
    button: true,

    /**
     * Show the navbar.
     * @type {boolean | number}
     */
    navbar: true,

    /**
     * Specify the visibility and the content of the title.
     * @type {boolean | number | Function | Array}
     */
    title: true,

    /**
     * Show the toolbar.
     * @type {boolean | number | Object}
     */
    toolbar: true,

    /**
     * Custom class name(s) to add to the viewer's root element.
     * @type {string}
     */
    className: '',

    /**
     * Define where to put the viewer in modal mode.
     * @type {string | Element}
     */
    container: 'body',

    /**
     * Filter the images for viewing. Return true if the image is viewable.
     * @type {Function}
     */
    filter: null,

    /**
     * Enable to request fullscreen when play.
     * @type {boolean}
     */
    fullscreen: true,

    /**
     * Define the extra attributes to inherit from the original image.
     * @type {Array}
     */
    inheritedAttributes: ['crossOrigin', 'decoding', 'isMap', 'loading', 'referrerPolicy', 'sizes', 'srcset', 'useMap'],

    /**
     * Define the initial index of image for viewing.
     * @type {number}
     */
    initialViewIndex: 0,

    /**
     * Enable inline mode.
     * @type {boolean}
     */
    inline: false,

    /**
     * The amount of time to delay between automatically cycling an image when playing.
     * @type {number}
     */
    interval: 5000,

    /**
     * Enable keyboard support.
     * @type {boolean}
     */
    keyboard: true,

    /**
     * Indicate if show a loading spinner when load image or not.
     * @type {boolean}
     */
    loading: true,

    /**
     * Indicate if enable loop viewing or not.
     * @type {boolean}
     */
    loop: true,

    /**
     * Min width of the viewer in inline mode.
     * @type {number}
     */
    minWidth: 200,

    /**
     * Min height of the viewer in inline mode.
     * @type {number}
     */
    minHeight: 100,

    /**
     * Enable to move the image.
     * @type {boolean}
     */
    movable: true,

    /**
     * Enable to rotate the image.
     * @type {boolean}
     */
    rotatable: true,

    /**
     * Enable to scale the image.
     * @type {boolean}
     */
    scalable: true,

    /**
     * Enable to zoom the image.
     * @type {boolean}
     */
    zoomable: true,

    /**
     * Enable to zoom the current image by dragging on the touch screen.
     * @type {boolean}
     */
    zoomOnTouch: true,

    /**
     * Enable to zoom the image by wheeling mouse.
     * @type {boolean}
     */
    zoomOnWheel: true,

    /**
     * Enable to slide to the next or previous image by swiping on the touch screen.
     * @type {boolean}
     */
    slideOnTouch: true,

    /**
     * Indicate if toggle the image size between its natural size
     * and initial size when double click on the image or not.
     * @type {boolean}
     */
    toggleOnDblclick: true,

    /**
     * Show the tooltip with image ratio (percentage) when zoom in or zoom out.
     * @type {boolean}
     */
    tooltip: true,

    /**
     * Enable CSS3 Transition for some special elements.
     * @type {boolean}
     */
    transition: true,

    /**
     * Define the CSS `z-index` value of viewer in modal mode.
     * @type {number}
     */
    zIndex: 2015,

    /**
     * Define the CSS `z-index` value of viewer in inline mode.
     * @type {number}
     */
    zIndexInline: 0,

    /**
     * Define the ratio when zoom the image by wheeling mouse.
     * @type {number}
     */
    zoomRatio: 0.1,

    /**
     * Define the min ratio of the image when zoom out.
     * @type {number}
     */
    minZoomRatio: 0.01,

    /**
     * Define the max ratio of the image when zoom in.
     * @type {number}
     */
    maxZoomRatio: 100,

    /**
     * Define where to get the original image URL for viewing.
     * @type {string | Function}
     */
    url: 'src',

    /**
     * Event shortcuts.
     * @type {Function}
     */
    ready: null,
    show: null,
    shown: null,
    hide: null,
    hidden: null,
    view: null,
    viewed: null,
    zoom: null,
    zoomed: null
  };

  var TEMPLATE = '<div class="viewer-container" touch-action="none">' + '<div class="viewer-canvas"></div>' + '<div class="viewer-footer">' + '<div class="viewer-title"></div>' + '<div class="viewer-toolbar"></div>' + '<div class="viewer-navbar">' + '<ul class="viewer-list"></ul>' + '</div>' + '</div>' + '<div class="viewer-tooltip"></div>' + '<div role="button" class="viewer-button" data-viewer-action="mix"></div>' + '<div class="viewer-player"></div>' + '</div>';

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'viewer'; // Actions

  var ACTION_MOVE = 'move';
  var ACTION_SWITCH = 'switch';
  var ACTION_ZOOM = 'zoom'; // Classes

  var CLASS_ACTIVE = "".concat(NAMESPACE, "-active");
  var CLASS_CLOSE = "".concat(NAMESPACE, "-close");
  var CLASS_FADE = "".concat(NAMESPACE, "-fade");
  var CLASS_FIXED = "".concat(NAMESPACE, "-fixed");
  var CLASS_FULLSCREEN = "".concat(NAMESPACE, "-fullscreen");
  var CLASS_FULLSCREEN_EXIT = "".concat(NAMESPACE, "-fullscreen-exit");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_HIDE_MD_DOWN = "".concat(NAMESPACE, "-hide-md-down");
  var CLASS_HIDE_SM_DOWN = "".concat(NAMESPACE, "-hide-sm-down");
  var CLASS_HIDE_XS_DOWN = "".concat(NAMESPACE, "-hide-xs-down");
  var CLASS_IN = "".concat(NAMESPACE, "-in");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_LOADING = "".concat(NAMESPACE, "-loading");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move");
  var CLASS_OPEN = "".concat(NAMESPACE, "-open");
  var CLASS_SHOW = "".concat(NAMESPACE, "-show");
  var CLASS_TRANSITION = "".concat(NAMESPACE, "-transition"); // Events

  var EVENT_CLICK = 'click';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_DRAG_START = 'dragstart';
  var EVENT_HIDDEN = 'hidden';
  var EVENT_HIDE = 'hide';
  var EVENT_KEY_DOWN = 'keydown';
  var EVENT_LOAD = 'load';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_SHOW = 'show';
  var EVENT_SHOWN = 'shown';
  var EVENT_TRANSITION_END = 'transitionend';
  var EVENT_VIEW = 'view';
  var EVENT_VIEWED = 'viewed';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom';
  var EVENT_ZOOMED = 'zoomed'; // Data keys

  var DATA_ACTION = "".concat(NAMESPACE, "Action"); // RegExps

  var REGEXP_SPACES = /\s\s*/; // Misc

  var BUTTONS = ['zoom-in', 'zoom-out', 'one-to-one', 'reset', 'prev', 'play', 'next', 'rotate-left', 'rotate-right', 'flip-horizontal', 'flip-vertical'];

  /**
   * Check if the given value is a string.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a string, else `false`.
   */

  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Check if the given value is not a number.
   */

  var isNaN = Number.isNaN || WINDOW.isNaN;
  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */

  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */

  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */

  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }

    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }
  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */

  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length)
      /* array-like */
      ) {
          var length = data.length;
          var i;

          for (i = 0; i < length; i += 1) {
            if (callback.call(data, data[i], i, data) === false) {
              break;
            }
          }
        } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }

    return data;
  }
  /**
   * Extend the given object.
   * @param {*} obj - The object to be extended.
   * @param {*} args - The rest objects which will be merged to the first object.
   * @returns {Object} The extended object.
   */

  var assign = Object.assign || function assign(obj) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (isObject(obj) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            obj[key] = arg[key];
          });
        }
      });
    }

    return obj;
  };
  var REGEXP_SUFFIX = /^(?:width|height|left|top|marginLeft|marginTop)$/;
  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */

  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value += 'px';
      }

      style[property] = value;
    });
  }
  /**
   * Escape a string for using in HTML.
   * @param {String} value - The string to escape.
   * @returns {String} Returns the escaped string.
   */

  function escapeHTMLEntities(value) {
    return isString(value) ? value.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : value;
  }
  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */

  function hasClass(element, value) {
    if (!element || !value) {
      return false;
    }

    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }
  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */

  function addClass(element, value) {
    if (!element || !value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.add(value);
      return;
    }

    var className = element.className.trim();

    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }
  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */

  function removeClass(element, value) {
    if (!element || !value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.remove(value);
      return;
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }
  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */

  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    } // IE10-11 doesn't support the second parameter of `classList.toggle`


    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */

  function hyphenate(value) {
    return value.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
  }
  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */

  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }

    if (element.dataset) {
      return element.dataset[name];
    }

    return element.getAttribute("data-".concat(hyphenate(name)));
  }
  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */

  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(hyphenate(name)), data);
    }
  }

  var onceSupported = function () {
    var supported = false;

    if (IS_BROWSER) {
      var once = false;

      var listener = function listener() {};

      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },

        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }

    return supported;
  }();
  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */


  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;

        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];

          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }

          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }

      element.removeEventListener(event, handler, options);
    });
  }
  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */

  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
            listeners = _element$listeners === void 0 ? {} : _element$listeners;

        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          listener.apply(element, args);
        };

        if (!listeners[event]) {
          listeners[event] = {};
        }

        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }

        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }

      element.addEventListener(event, _handler, options);
    });
  }
  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */

  function dispatchEvent(element, type, data) {
    var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }

    return element.dispatchEvent(event);
  }
  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */

  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */

  function getTransforms(_ref) {
    var rotate = _ref.rotate,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        translateX = _ref.translateX,
        translateY = _ref.translateY;
    var values = [];

    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }

    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    } // Rotate should come first before scale to match orientation transform


    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }

    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }

    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }

    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }
  /**
   * Get an image name from an image url.
   * @param {string} url - The target url.
   * @example
   * // picture.jpg
   * getImageNameFromURL('https://domain.com/path/to/picture.jpg?size=1280×960')
   * @returns {string} A string contains the image name.
   */

  function getImageNameFromURL(url) {
    return isString(url) ? decodeURIComponent(url.replace(/^.*\//, '').replace(/[?&#].*$/, '')) : '';
  }
  var IS_SAFARI = WINDOW.navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(WINDOW.navigator.userAgent);
  /**
   * Get an image's natural sizes.
   * @param {string} image - The target image.
   * @param {Object} options - The viewer options.
   * @param {Function} callback - The callback function.
   * @returns {HTMLImageElement} The new image.
   */

  function getImageNaturalSizes(image, options, callback) {
    var newImage = document.createElement('img'); // Modern browsers (except Safari)

    if (image.naturalWidth && !IS_SAFARI) {
      callback(image.naturalWidth, image.naturalHeight);
      return newImage;
    }

    var body = document.body || document.documentElement;

    newImage.onload = function () {
      callback(newImage.width, newImage.height);

      if (!IS_SAFARI) {
        body.removeChild(newImage);
      }
    };

    forEach(options.inheritedAttributes, function (name) {
      var value = image.getAttribute(name);

      if (value !== null) {
        newImage.setAttribute(name, value);
      }
    });
    newImage.src = image.src; // iOS Safari will convert the image automatically
    // with its orientation once append it into DOM

    if (!IS_SAFARI) {
      newImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
      body.appendChild(newImage);
    }

    return newImage;
  }
  /**
   * Get the related class name of a responsive type number.
   * @param {string} type - The responsive type.
   * @returns {string} The related class name.
   */

  function getResponsiveClass(type) {
    switch (type) {
      case 2:
        return CLASS_HIDE_XS_DOWN;

      case 3:
        return CLASS_HIDE_SM_DOWN;

      case 4:
        return CLASS_HIDE_MD_DOWN;

      default:
        return '';
    }
  }
  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */

  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);

    var ratios = [];
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        ratios.push(ratio);
      });
    });
    ratios.sort(function (a, b) {
      return Math.abs(a) < Math.abs(b);
    });
    return ratios[0];
  }
  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */

  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
        pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      timeStamp: Date.now(),
      startX: pageX,
      startY: pageY
    }, end);
  }
  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */

  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
          startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initViewer();
      this.initList();
      this.renderViewer();
    },
    initBody: function initBody() {
      var ownerDocument = this.element.ownerDocument;
      var body = ownerDocument.body || ownerDocument.documentElement;
      this.body = body;
      this.scrollbarWidth = window.innerWidth - ownerDocument.documentElement.clientWidth;
      this.initialBodyPaddingRight = body.style.paddingRight;
      this.initialBodyComputedPaddingRight = window.getComputedStyle(body).paddingRight;
    },
    initContainer: function initContainer() {
      this.containerData = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    initViewer: function initViewer() {
      var options = this.options,
          parent = this.parent;
      var viewerData;

      if (options.inline) {
        viewerData = {
          width: Math.max(parent.offsetWidth, options.minWidth),
          height: Math.max(parent.offsetHeight, options.minHeight)
        };
        this.parentData = viewerData;
      }

      if (this.fulled || !viewerData) {
        viewerData = this.containerData;
      }

      this.viewerData = assign({}, viewerData);
    },
    renderViewer: function renderViewer() {
      if (this.options.inline && !this.fulled) {
        setStyle(this.viewer, this.viewerData);
      }
    },
    initList: function initList() {
      var _this = this;

      var element = this.element,
          options = this.options,
          list = this.list;
      var items = []; // initList may be called in this.update, so should keep idempotent

      list.innerHTML = '';
      forEach(this.images, function (image, index) {
        var src = image.src;
        var alt = image.alt || getImageNameFromURL(src);

        var url = _this.getImageURL(image);

        if (src || url) {
          var item = document.createElement('li');
          var img = document.createElement('img');
          forEach(options.inheritedAttributes, function (name) {
            var value = image.getAttribute(name);

            if (value !== null) {
              img.setAttribute(name, value);
            }
          });
          img.src = src || url;
          img.alt = alt;
          img.setAttribute('data-index', index);
          img.setAttribute('data-original-url', url || src);
          img.setAttribute('data-viewer-action', 'view');
          img.setAttribute('role', 'button');
          item.appendChild(img);
          list.appendChild(item);
          items.push(item);
        }
      });
      this.items = items;
      forEach(items, function (item) {
        var image = item.firstElementChild;
        setData(image, 'filled', true);

        if (options.loading) {
          addClass(item, CLASS_LOADING);
        }

        addListener(image, EVENT_LOAD, function (event) {
          if (options.loading) {
            removeClass(item, CLASS_LOADING);
          }

          _this.loadImage(event);
        }, {
          once: true
        });
      });

      if (options.transition) {
        addListener(element, EVENT_VIEWED, function () {
          addClass(list, CLASS_TRANSITION);
        }, {
          once: true
        });
      }
    },
    renderList: function renderList(index) {
      var i = index || this.index;
      var width = this.items[i].offsetWidth || 30;
      var outerWidth = width + 1; // 1 pixel of `margin-left` width
      // Place the active item in the center of the screen

      setStyle(this.list, assign({
        width: outerWidth * this.length
      }, getTransforms({
        translateX: (this.viewerData.width - width) / 2 - outerWidth * i
      })));
    },
    resetList: function resetList() {
      var list = this.list;
      list.innerHTML = '';
      removeClass(list, CLASS_TRANSITION);
      setStyle(list, getTransforms({
        translateX: 0
      }));
    },
    initImage: function initImage(done) {
      var _this2 = this;

      var options = this.options,
          image = this.image,
          viewerData = this.viewerData;
      var footerHeight = this.footer.offsetHeight;
      var viewerWidth = viewerData.width;
      var viewerHeight = Math.max(viewerData.height - footerHeight, footerHeight);
      var oldImageData = this.imageData || {};
      var sizingImage;
      this.imageInitializing = {
        abort: function abort() {
          sizingImage.onload = null;
        }
      };
      sizingImage = getImageNaturalSizes(image, options, function (naturalWidth, naturalHeight) {
        var aspectRatio = naturalWidth / naturalHeight;
        var width = viewerWidth;
        var height = viewerHeight;
        _this2.imageInitializing = false;

        if (viewerHeight * aspectRatio > viewerWidth) {
          height = viewerWidth / aspectRatio;
        } else {
          width = viewerHeight * aspectRatio;
        }

        width = Math.min(width * 0.9, naturalWidth);
        height = Math.min(height * 0.9, naturalHeight);
        var imageData = {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: aspectRatio,
          ratio: width / naturalWidth,
          width: width,
          height: height,
          left: (viewerWidth - width) / 2,
          top: (viewerHeight - height) / 2
        };
        var initialImageData = assign({}, imageData);

        if (options.rotatable) {
          imageData.rotate = oldImageData.rotate || 0;
          initialImageData.rotate = 0;
        }

        if (options.scalable) {
          imageData.scaleX = oldImageData.scaleX || 1;
          imageData.scaleY = oldImageData.scaleY || 1;
          initialImageData.scaleX = 1;
          initialImageData.scaleY = 1;
        }

        _this2.imageData = imageData;
        _this2.initialImageData = initialImageData;

        if (done) {
          done();
        }
      });
    },
    renderImage: function renderImage(done) {
      var _this3 = this;

      var image = this.image,
          imageData = this.imageData;
      setStyle(image, assign({
        width: imageData.width,
        height: imageData.height,
        // XXX: Not to use translateX/Y to avoid image shaking when zooming
        marginLeft: imageData.left,
        marginTop: imageData.top
      }, getTransforms(imageData)));

      if (done) {
        if ((this.viewing || this.zooming) && this.options.transition) {
          var onTransitionEnd = function onTransitionEnd() {
            _this3.imageRendering = false;
            done();
          };

          this.imageRendering = {
            abort: function abort() {
              removeListener(image, EVENT_TRANSITION_END, onTransitionEnd);
            }
          };
          addListener(image, EVENT_TRANSITION_END, onTransitionEnd, {
            once: true
          });
        } else {
          done();
        }
      }
    },
    resetImage: function resetImage() {
      // this.image only defined after viewed
      if (this.viewing || this.viewed) {
        var image = this.image;

        if (this.viewing) {
          this.viewing.abort();
        }

        image.parentNode.removeChild(image);
        this.image = null;
      }
    }
  };

  var events = {
    bind: function bind() {
      var options = this.options,
          viewer = this.viewer,
          canvas = this.canvas;
      var document = this.element.ownerDocument;
      addListener(viewer, EVENT_CLICK, this.onClick = this.click.bind(this));
      addListener(viewer, EVENT_DRAG_START, this.onDragStart = this.dragstart.bind(this));
      addListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown = this.pointerdown.bind(this));
      addListener(document, EVENT_POINTER_MOVE, this.onPointerMove = this.pointermove.bind(this));
      addListener(document, EVENT_POINTER_UP, this.onPointerUp = this.pointerup.bind(this));
      addListener(document, EVENT_KEY_DOWN, this.onKeyDown = this.keydown.bind(this));
      addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));

      if (options.zoomable && options.zoomOnWheel) {
        addListener(viewer, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }

      if (options.toggleOnDblclick) {
        addListener(canvas, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }
    },
    unbind: function unbind() {
      var options = this.options,
          viewer = this.viewer,
          canvas = this.canvas;
      var document = this.element.ownerDocument;
      removeListener(viewer, EVENT_CLICK, this.onClick);
      removeListener(viewer, EVENT_DRAG_START, this.onDragStart);
      removeListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown);
      removeListener(document, EVENT_POINTER_MOVE, this.onPointerMove);
      removeListener(document, EVENT_POINTER_UP, this.onPointerUp);
      removeListener(document, EVENT_KEY_DOWN, this.onKeyDown);
      removeListener(window, EVENT_RESIZE, this.onResize);

      if (options.zoomable && options.zoomOnWheel) {
        removeListener(viewer, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }

      if (options.toggleOnDblclick) {
        removeListener(canvas, EVENT_DBLCLICK, this.onDblclick);
      }
    }
  };

  var handlers = {
    click: function click(event) {
      var target = event.target;
      var options = this.options,
          imageData = this.imageData;
      var action = getData(target, DATA_ACTION); // Cancel the emulated click when the native click event was triggered.

      if (IS_TOUCH_DEVICE && event.isTrusted && target === this.canvas) {
        clearTimeout(this.clickCanvasTimeout);
      }

      switch (action) {
        case 'mix':
          if (this.played) {
            this.stop();
          } else if (options.inline) {
            if (this.fulled) {
              this.exit();
            } else {
              this.full();
            }
          } else {
            this.hide();
          }

          break;

        case 'hide':
          this.hide();
          break;

        case 'view':
          this.view(getData(target, 'index'));
          break;

        case 'zoom-in':
          this.zoom(0.1, true);
          break;

        case 'zoom-out':
          this.zoom(-0.1, true);
          break;

        case 'one-to-one':
          this.toggle();
          break;

        case 'reset':
          this.reset();
          break;

        case 'prev':
          this.prev(options.loop);
          break;

        case 'play':
          this.play(options.fullscreen);
          break;

        case 'next':
          this.next(options.loop);
          break;

        case 'rotate-left':
          this.rotate(-90);
          break;

        case 'rotate-right':
          this.rotate(90);
          break;

        case 'flip-horizontal':
          this.scaleX(-imageData.scaleX || -1);
          break;

        case 'flip-vertical':
          this.scaleY(-imageData.scaleY || -1);
          break;

        default:
          if (this.played) {
            this.stop();
          }

      }
    },
    dblclick: function dblclick(event) {
      event.preventDefault();

      if (this.viewed && event.target === this.image) {
        // Cancel the emulated double click when the native dblclick event was triggered.
        if (IS_TOUCH_DEVICE && event.isTrusted) {
          clearTimeout(this.doubleClickImageTimeout);
        }

        this.toggle();
      }
    },
    load: function load() {
      var _this = this;

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = false;
      }

      var element = this.element,
          options = this.options,
          image = this.image,
          index = this.index,
          viewerData = this.viewerData;
      removeClass(image, CLASS_INVISIBLE);

      if (options.loading) {
        removeClass(this.canvas, CLASS_LOADING);
      }

      image.style.cssText = 'height:0;' + "margin-left:".concat(viewerData.width / 2, "px;") + "margin-top:".concat(viewerData.height / 2, "px;") + 'max-width:none!important;' + 'position:absolute;' + 'width:0;';
      this.initImage(function () {
        toggleClass(image, CLASS_MOVE, options.movable);
        toggleClass(image, CLASS_TRANSITION, options.transition);

        _this.renderImage(function () {
          _this.viewed = true;
          _this.viewing = false;

          if (isFunction(options.viewed)) {
            addListener(element, EVENT_VIEWED, options.viewed, {
              once: true
            });
          }

          dispatchEvent(element, EVENT_VIEWED, {
            originalImage: _this.images[index],
            index: index,
            image: image
          });
        });
      });
    },
    loadImage: function loadImage(event) {
      var image = event.target;
      var parent = image.parentNode;
      var parentWidth = parent.offsetWidth || 30;
      var parentHeight = parent.offsetHeight || 50;
      var filled = !!getData(image, 'filled');
      getImageNaturalSizes(image, this.options, function (naturalWidth, naturalHeight) {
        var aspectRatio = naturalWidth / naturalHeight;
        var width = parentWidth;
        var height = parentHeight;

        if (parentHeight * aspectRatio > parentWidth) {
          if (filled) {
            width = parentHeight * aspectRatio;
          } else {
            height = parentWidth / aspectRatio;
          }
        } else if (filled) {
          height = parentWidth / aspectRatio;
        } else {
          width = parentHeight * aspectRatio;
        }

        setStyle(image, assign({
          width: width,
          height: height
        }, getTransforms({
          translateX: (parentWidth - width) / 2,
          translateY: (parentHeight - height) / 2
        })));
      });
    },
    keydown: function keydown(event) {
      var options = this.options;

      if (!this.fulled || !options.keyboard) {
        return;
      }

      switch (event.keyCode || event.which || event.charCode) {
        // Escape
        case 27:
          if (this.played) {
            this.stop();
          } else if (options.inline) {
            if (this.fulled) {
              this.exit();
            }
          } else {
            this.hide();
          }

          break;
        // Space

        case 32:
          if (this.played) {
            this.stop();
          }

          break;
        // ArrowLeft

        case 37:
          this.prev(options.loop);
          break;
        // ArrowUp

        case 38:
          // Prevent scroll on Firefox
          event.preventDefault(); // Zoom in

          this.zoom(options.zoomRatio, true);
          break;
        // ArrowRight

        case 39:
          this.next(options.loop);
          break;
        // ArrowDown

        case 40:
          // Prevent scroll on Firefox
          event.preventDefault(); // Zoom out

          this.zoom(-options.zoomRatio, true);
          break;
        // Ctrl + 0

        case 48: // Fall through
        // Ctrl + 1
        // eslint-disable-next-line no-fallthrough

        case 49:
          if (event.ctrlKey) {
            event.preventDefault();
            this.toggle();
          }

          break;
      }
    },
    dragstart: function dragstart(event) {
      if (event.target.tagName.toLowerCase() === 'img') {
        event.preventDefault();
      }
    },
    pointerdown: function pointerdown(event) {
      var options = this.options,
          pointers = this.pointers;
      var buttons = event.buttons,
          button = event.button;

      if (!this.viewed || this.showing || this.viewing || this.hiding // Handle mouse event and pointer event and ignore touch event
      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && ( // No primary button (Usually the left button)
      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 // Open context menu
      || event.ctrlKey)) {
        return;
      } // Prevent default behaviours as page zooming in touch devices.


      event.preventDefault();

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        pointers[event.pointerId || 0] = getPointer(event);
      }

      var action = options.movable ? ACTION_MOVE : false;

      if (options.zoomOnTouch && options.zoomable && Object.keys(pointers).length > 1) {
        action = ACTION_ZOOM;
      } else if (options.slideOnTouch && (event.pointerType === 'touch' || event.type === 'touchstart') && this.isSwitchable()) {
        action = ACTION_SWITCH;
      }

      if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
        removeClass(this.image, CLASS_TRANSITION);
      }

      this.action = action;
    },
    pointermove: function pointermove(event) {
      var pointers = this.pointers,
          action = this.action;

      if (!this.viewed || !action) {
        return;
      }

      event.preventDefault();

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }

      this.change(event);
    },
    pointerup: function pointerup(event) {
      var _this2 = this;

      var options = this.options,
          action = this.action,
          pointers = this.pointers;
      var pointer;

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          pointer = pointers[touch.identifier];
          delete pointers[touch.identifier];
        });
      } else {
        pointer = pointers[event.pointerId || 0];
        delete pointers[event.pointerId || 0];
      }

      if (!action) {
        return;
      }

      event.preventDefault();

      if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
        addClass(this.image, CLASS_TRANSITION);
      }

      this.action = false; // Emulate click and double click in touch devices to support backdrop and image zooming (#210).

      if (IS_TOUCH_DEVICE && action !== ACTION_ZOOM && pointer && Date.now() - pointer.timeStamp < 500) {
        clearTimeout(this.clickCanvasTimeout);
        clearTimeout(this.doubleClickImageTimeout);

        if (options.toggleOnDblclick && this.viewed && event.target === this.image) {
          if (this.imageClicked) {
            this.imageClicked = false; // This timeout will be cleared later when a native dblclick event is triggering

            this.doubleClickImageTimeout = setTimeout(function () {
              dispatchEvent(_this2.image, EVENT_DBLCLICK);
            }, 50);
          } else {
            this.imageClicked = true; // The default timing of a double click in Windows is 500 ms

            this.doubleClickImageTimeout = setTimeout(function () {
              _this2.imageClicked = false;
            }, 500);
          }
        } else {
          this.imageClicked = false;

          if (options.backdrop && options.backdrop !== 'static' && event.target === this.canvas) {
            // This timeout will be cleared later when a native click event is triggering
            this.clickCanvasTimeout = setTimeout(function () {
              dispatchEvent(_this2.canvas, EVENT_CLICK);
            }, 50);
          }
        }
      }
    },
    resize: function resize() {
      var _this3 = this;

      if (!this.isShown || this.hiding) {
        return;
      }

      if (this.fulled) {
        this.close();
        this.initBody();
        this.open();
      }

      this.initContainer();
      this.initViewer();
      this.renderViewer();
      this.renderList();

      if (this.viewed) {
        this.initImage(function () {
          _this3.renderImage();
        });
      }

      if (this.played) {
        if (this.options.fullscreen && this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
          this.stop();
          return;
        }

        forEach(this.player.getElementsByTagName('img'), function (image) {
          addListener(image, EVENT_LOAD, _this3.loadImage.bind(_this3), {
            once: true
          });
          dispatchEvent(image, EVENT_LOAD);
        });
      }
    },
    wheel: function wheel(event) {
      var _this4 = this;

      if (!this.viewed) {
        return;
      }

      event.preventDefault(); // Limit wheel speed to prevent zoom too fast

      if (this.wheeling) {
        return;
      }

      this.wheeling = true;
      setTimeout(function () {
        _this4.wheeling = false;
      }, 50);
      var ratio = Number(this.options.zoomRatio) || 0.1;
      var delta = 1;

      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, true, event);
    }
  };

  var methods = {
    /** Show the viewer (only available in modal mode)
     * @param {boolean} [immediate=false] - Indicates if show the viewer immediately or not.
     * @returns {Viewer} this
     */
    show: function show() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var element = this.element,
          options = this.options;

      if (options.inline || this.showing || this.isShown || this.showing) {
        return this;
      }

      if (!this.ready) {
        this.build();

        if (this.ready) {
          this.show(immediate);
        }

        return this;
      }

      if (isFunction(options.show)) {
        addListener(element, EVENT_SHOW, options.show, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_SHOW) === false || !this.ready) {
        return this;
      }

      if (this.hiding) {
        this.transitioning.abort();
      }

      this.showing = true;
      this.open();
      var viewer = this.viewer;
      removeClass(viewer, CLASS_HIDE);

      if (options.transition && !immediate) {
        var shown = this.shown.bind(this);
        this.transitioning = {
          abort: function abort() {
            removeListener(viewer, EVENT_TRANSITION_END, shown);
            removeClass(viewer, CLASS_IN);
          }
        };
        addClass(viewer, CLASS_TRANSITION); // Force reflow to enable CSS3 transition

        viewer.initialOffsetWidth = viewer.offsetWidth;
        addListener(viewer, EVENT_TRANSITION_END, shown, {
          once: true
        });
        addClass(viewer, CLASS_IN);
      } else {
        addClass(viewer, CLASS_IN);
        this.shown();
      }

      return this;
    },

    /**
     * Hide the viewer (only available in modal mode)
     * @param {boolean} [immediate=false] - Indicates if hide the viewer immediately or not.
     * @returns {Viewer} this
     */
    hide: function hide() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var element = this.element,
          options = this.options;

      if (options.inline || this.hiding || !(this.isShown || this.showing)) {
        return this;
      }

      if (isFunction(options.hide)) {
        addListener(element, EVENT_HIDE, options.hide, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_HIDE) === false) {
        return this;
      }

      if (this.showing) {
        this.transitioning.abort();
      }

      this.hiding = true;

      if (this.played) {
        this.stop();
      } else if (this.viewing) {
        this.viewing.abort();
      }

      var viewer = this.viewer;

      if (options.transition && hasClass(this.image, CLASS_TRANSITION) && !immediate) {
        var hidden = this.hidden.bind(this);

        var hide = function hide() {
          // XXX: It seems the `event.stopPropagation()` method does not work here
          setTimeout(function () {
            addListener(viewer, EVENT_TRANSITION_END, hidden, {
              once: true
            });
            removeClass(viewer, CLASS_IN);
          }, 0);
        };

        this.transitioning = {
          abort: function abort() {
            if (this.viewed) {
              removeListener(this.image, EVENT_TRANSITION_END, hide);
            } else {
              removeListener(viewer, EVENT_TRANSITION_END, hidden);
            }
          }
        }; // Note that the `CLASS_TRANSITION` class will be removed on pointer down (#255)

        if (this.viewed) {
          addListener(this.image, EVENT_TRANSITION_END, hide, {
            once: true
          });
          this.zoomTo(0, false, false, true);
        } else {
          hide();
        }
      } else {
        removeClass(viewer, CLASS_IN);
        this.hidden();
      }

      return this;
    },

    /**
     * View one of the images with image's index
     * @param {number} index - The index of the image to view.
     * @returns {Viewer} this
     */
    view: function view() {
      var _this = this;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.initialViewIndex;
      index = Number(index) || 0;

      if (this.hiding || this.played || index < 0 || index >= this.length || this.viewed && index === this.index) {
        return this;
      }

      if (!this.isShown) {
        this.index = index;
        return this.show();
      }

      if (this.viewing) {
        this.viewing.abort();
      }

      var element = this.element,
          options = this.options,
          title = this.title,
          canvas = this.canvas;
      var item = this.items[index];
      var img = item.querySelector('img');
      var url = getData(img, 'originalUrl');
      var alt = img.getAttribute('alt');
      var image = document.createElement('img');
      forEach(options.inheritedAttributes, function (name) {
        var value = img.getAttribute(name);

        if (value !== null) {
          image.setAttribute(name, value);
        }
      });
      image.src = url;
      image.alt = alt;

      if (isFunction(options.view)) {
        addListener(element, EVENT_VIEW, options.view, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_VIEW, {
        originalImage: this.images[index],
        index: index,
        image: image
      }) === false || !this.isShown || this.hiding || this.played) {
        return this;
      }

      this.image = image;
      removeClass(this.items[this.index], CLASS_ACTIVE);
      addClass(item, CLASS_ACTIVE);
      this.viewed = false;
      this.index = index;
      this.imageData = {};
      addClass(image, CLASS_INVISIBLE);

      if (options.loading) {
        addClass(canvas, CLASS_LOADING);
      }

      canvas.innerHTML = '';
      canvas.appendChild(image); // Center current item

      this.renderList(); // Clear title

      title.innerHTML = ''; // Generate title after viewed

      var onViewed = function onViewed() {
        var imageData = _this.imageData;
        var render = Array.isArray(options.title) ? options.title[1] : options.title;
        title.innerHTML = escapeHTMLEntities(isFunction(render) ? render.call(_this, image, imageData) : "".concat(alt, " (").concat(imageData.naturalWidth, " \xD7 ").concat(imageData.naturalHeight, ")"));
      };

      var onLoad;
      addListener(element, EVENT_VIEWED, onViewed, {
        once: true
      });
      this.viewing = {
        abort: function abort() {
          removeListener(element, EVENT_VIEWED, onViewed);

          if (image.complete) {
            if (this.imageRendering) {
              this.imageRendering.abort();
            } else if (this.imageInitializing) {
              this.imageInitializing.abort();
            }
          } else {
            // Cancel download to save bandwidth.
            image.src = '';
            removeListener(image, EVENT_LOAD, onLoad);

            if (this.timeout) {
              clearTimeout(this.timeout);
            }
          }
        }
      };

      if (image.complete) {
        this.load();
      } else {
        addListener(image, EVENT_LOAD, onLoad = this.load.bind(this), {
          once: true
        });

        if (this.timeout) {
          clearTimeout(this.timeout);
        } // Make the image visible if it fails to load within 1s


        this.timeout = setTimeout(function () {
          removeClass(image, CLASS_INVISIBLE);
          _this.timeout = false;
        }, 1000);
      }

      return this;
    },

    /**
     * View the previous image
     * @param {boolean} [loop=false] - Indicate if view the last one
     * when it is the first one at present.
     * @returns {Viewer} this
     */
    prev: function prev() {
      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var index = this.index - 1;

      if (index < 0) {
        index = loop ? this.length - 1 : 0;
      }

      this.view(index);
      return this;
    },

    /**
     * View the next image
     * @param {boolean} [loop=false] - Indicate if view the first one
     * when it is the last one at present.
     * @returns {Viewer} this
     */
    next: function next() {
      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var maxIndex = this.length - 1;
      var index = this.index + 1;

      if (index > maxIndex) {
        index = loop ? 0 : maxIndex;
      }

      this.view(index);
      return this;
    },

    /**
     * Move the image with relative offsets.
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} offsetY - The relative offset distance on the y-axis.
     * @returns {Viewer} this
     */
    move: function move(offsetX, offsetY) {
      var imageData = this.imageData;
      this.moveTo(isUndefined(offsetX) ? offsetX : imageData.left + Number(offsetX), isUndefined(offsetY) ? offsetY : imageData.top + Number(offsetY));
      return this;
    },

    /**
     * Move the image to an absolute point.
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Viewer} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var imageData = this.imageData;
      x = Number(x);
      y = Number(y);

      if (this.viewed && !this.played && this.options.movable) {
        var changed = false;

        if (isNumber(x)) {
          imageData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          imageData.top = y;
          changed = true;
        }

        if (changed) {
          this.renderImage();
        }
      }

      return this;
    },

    /**
     * Zoom the image with a relative ratio.
     * @param {number} ratio - The target ratio.
     * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
     * @param {Event} [_originalEvent=null] - The original event if any.
     * @returns {Viewer} this
     */
    zoom: function zoom(ratio) {
      var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var imageData = this.imageData;
      ratio = Number(ratio);

      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      this.zoomTo(imageData.width * ratio / imageData.naturalWidth, hasTooltip, _originalEvent);
      return this;
    },

    /**
     * Zoom the image to an absolute ratio.
     * @param {number} ratio - The target ratio.
     * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
     * @param {Event} [_originalEvent=null] - The original event if any.
     * @param {Event} [_zoomable=false] - Indicates if the current zoom is available or not.
     * @returns {Viewer} this
     */
    zoomTo: function zoomTo(ratio) {
      var _this2 = this;

      var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _zoomable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var element = this.element,
          options = this.options,
          pointers = this.pointers,
          imageData = this.imageData;
      var width = imageData.width,
          height = imageData.height,
          left = imageData.left,
          top = imageData.top,
          naturalWidth = imageData.naturalWidth,
          naturalHeight = imageData.naturalHeight;
      ratio = Math.max(0, ratio);

      if (isNumber(ratio) && this.viewed && !this.played && (_zoomable || options.zoomable)) {
        if (!_zoomable) {
          var minZoomRatio = Math.max(0.01, options.minZoomRatio);
          var maxZoomRatio = Math.min(100, options.maxZoomRatio);
          ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
        }

        if (_originalEvent && ratio > 0.95 && ratio < 1.05) {
          ratio = 1;
        }

        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;
        var offsetWidth = newWidth - width;
        var offsetHeight = newHeight - height;
        var oldRatio = width / naturalWidth;

        if (isFunction(options.zoom)) {
          addListener(element, EVENT_ZOOM, options.zoom, {
            once: true
          });
        }

        if (dispatchEvent(element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: oldRatio,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }

        this.zooming = true;

        if (_originalEvent) {
          var offset = getOffset(this.viewer);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          }; // Zoom from the triggering point of the event

          imageData.left -= offsetWidth * ((center.pageX - offset.left - left) / width);
          imageData.top -= offsetHeight * ((center.pageY - offset.top - top) / height);
        } else {
          // Zoom from the center of the image
          imageData.left -= offsetWidth / 2;
          imageData.top -= offsetHeight / 2;
        }

        imageData.width = newWidth;
        imageData.height = newHeight;
        imageData.ratio = ratio;
        this.renderImage(function () {
          _this2.zooming = false;

          if (isFunction(options.zoomed)) {
            addListener(element, EVENT_ZOOMED, options.zoomed, {
              once: true
            });
          }

          dispatchEvent(element, EVENT_ZOOMED, {
            ratio: ratio,
            oldRatio: oldRatio,
            originalEvent: _originalEvent
          });
        });

        if (hasTooltip) {
          this.tooltip();
        }
      }

      return this;
    },

    /**
     * Rotate the image with a relative degree.
     * @param {number} degree - The rotate degree.
     * @returns {Viewer} this
     */
    rotate: function rotate(degree) {
      this.rotateTo((this.imageData.rotate || 0) + Number(degree));
      return this;
    },

    /**
     * Rotate the image to an absolute degree.
     * @param {number} degree - The rotate degree.
     * @returns {Viewer} this
     */
    rotateTo: function rotateTo(degree) {
      var imageData = this.imageData;
      degree = Number(degree);

      if (isNumber(degree) && this.viewed && !this.played && this.options.rotatable) {
        imageData.rotate = degree;
        this.renderImage();
      }

      return this;
    },

    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Viewer} this
     */
    scaleX: function scaleX(_scaleX) {
      this.scale(_scaleX, this.imageData.scaleY);
      return this;
    },

    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Viewer} this
     */
    scaleY: function scaleY(_scaleY) {
      this.scale(this.imageData.scaleX, _scaleY);
      return this;
    },

    /**
     * Scale the image.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Viewer} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (this.viewed && !this.played && this.options.scalable) {
        var changed = false;

        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          changed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          changed = true;
        }

        if (changed) {
          this.renderImage();
        }
      }

      return this;
    },

    /**
     * Play the images
     * @param {boolean} [fullscreen=false] - Indicate if request fullscreen or not.
     * @returns {Viewer} this
     */
    play: function play() {
      var _this3 = this;

      var fullscreen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.isShown || this.played) {
        return this;
      }

      var options = this.options,
          player = this.player;
      var onLoad = this.loadImage.bind(this);
      var list = [];
      var total = 0;
      var index = 0;
      this.played = true;
      this.onLoadWhenPlay = onLoad;

      if (fullscreen) {
        this.requestFullscreen();
      }

      addClass(player, CLASS_SHOW);
      forEach(this.items, function (item, i) {
        var img = item.querySelector('img');
        var image = document.createElement('img');
        image.src = getData(img, 'originalUrl');
        image.alt = img.getAttribute('alt');
        image.referrerPolicy = img.referrerPolicy;
        total += 1;
        addClass(image, CLASS_FADE);
        toggleClass(image, CLASS_TRANSITION, options.transition);

        if (hasClass(item, CLASS_ACTIVE)) {
          addClass(image, CLASS_IN);
          index = i;
        }

        list.push(image);
        addListener(image, EVENT_LOAD, onLoad, {
          once: true
        });
        player.appendChild(image);
      });

      if (isNumber(options.interval) && options.interval > 0) {
        var play = function play() {
          _this3.playing = setTimeout(function () {
            removeClass(list[index], CLASS_IN);
            index += 1;
            index = index < total ? index : 0;
            addClass(list[index], CLASS_IN);
            play();
          }, options.interval);
        };

        if (total > 1) {
          play();
        }
      }

      return this;
    },
    // Stop play
    stop: function stop() {
      var _this4 = this;

      if (!this.played) {
        return this;
      }

      var player = this.player;
      this.played = false;
      clearTimeout(this.playing);
      forEach(player.getElementsByTagName('img'), function (image) {
        removeListener(image, EVENT_LOAD, _this4.onLoadWhenPlay);
      });
      removeClass(player, CLASS_SHOW);
      player.innerHTML = '';
      this.exitFullscreen();
      return this;
    },
    // Enter modal mode (only available in inline mode)
    full: function full() {
      var _this5 = this;

      var options = this.options,
          viewer = this.viewer,
          image = this.image,
          list = this.list;

      if (!this.isShown || this.played || this.fulled || !options.inline) {
        return this;
      }

      this.fulled = true;
      this.open();
      addClass(this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(list, CLASS_TRANSITION);

        if (this.viewed) {
          removeClass(image, CLASS_TRANSITION);
        }
      }

      addClass(viewer, CLASS_FIXED);
      viewer.setAttribute('style', '');
      setStyle(viewer, {
        zIndex: options.zIndex
      });
      this.initContainer();
      this.viewerData = assign({}, this.containerData);
      this.renderList();

      if (this.viewed) {
        this.initImage(function () {
          _this5.renderImage(function () {
            if (options.transition) {
              setTimeout(function () {
                addClass(image, CLASS_TRANSITION);
                addClass(list, CLASS_TRANSITION);
              }, 0);
            }
          });
        });
      }

      return this;
    },
    // Exit modal mode (only available in inline mode)
    exit: function exit() {
      var _this6 = this;

      var options = this.options,
          viewer = this.viewer,
          image = this.image,
          list = this.list;

      if (!this.isShown || this.played || !this.fulled || !options.inline) {
        return this;
      }

      this.fulled = false;
      this.close();
      removeClass(this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(list, CLASS_TRANSITION);

        if (this.viewed) {
          removeClass(image, CLASS_TRANSITION);
        }
      }

      removeClass(viewer, CLASS_FIXED);
      setStyle(viewer, {
        zIndex: options.zIndexInline
      });
      this.viewerData = assign({}, this.parentData);
      this.renderViewer();
      this.renderList();

      if (this.viewed) {
        this.initImage(function () {
          _this6.renderImage(function () {
            if (options.transition) {
              setTimeout(function () {
                addClass(image, CLASS_TRANSITION);
                addClass(list, CLASS_TRANSITION);
              }, 0);
            }
          });
        });
      }

      return this;
    },
    // Show the current ratio of the image with percentage
    tooltip: function tooltip() {
      var _this7 = this;

      var options = this.options,
          tooltipBox = this.tooltipBox,
          imageData = this.imageData;

      if (!this.viewed || this.played || !options.tooltip) {
        return this;
      }

      tooltipBox.textContent = "".concat(Math.round(imageData.ratio * 100), "%");

      if (!this.tooltipping) {
        if (options.transition) {
          if (this.fading) {
            dispatchEvent(tooltipBox, EVENT_TRANSITION_END);
          }

          addClass(tooltipBox, CLASS_SHOW);
          addClass(tooltipBox, CLASS_FADE);
          addClass(tooltipBox, CLASS_TRANSITION); // Force reflow to enable CSS3 transition

          tooltipBox.initialOffsetWidth = tooltipBox.offsetWidth;
          addClass(tooltipBox, CLASS_IN);
        } else {
          addClass(tooltipBox, CLASS_SHOW);
        }
      } else {
        clearTimeout(this.tooltipping);
      }

      this.tooltipping = setTimeout(function () {
        if (options.transition) {
          addListener(tooltipBox, EVENT_TRANSITION_END, function () {
            removeClass(tooltipBox, CLASS_SHOW);
            removeClass(tooltipBox, CLASS_FADE);
            removeClass(tooltipBox, CLASS_TRANSITION);
            _this7.fading = false;
          }, {
            once: true
          });
          removeClass(tooltipBox, CLASS_IN);
          _this7.fading = true;
        } else {
          removeClass(tooltipBox, CLASS_SHOW);
        }

        _this7.tooltipping = false;
      }, 1000);
      return this;
    },
    // Toggle the image size between its natural size and initial size
    toggle: function toggle() {
      if (this.imageData.ratio === 1) {
        this.zoomTo(this.initialImageData.ratio, true);
      } else {
        this.zoomTo(1, true);
      }

      return this;
    },
    // Reset the image to its initial state
    reset: function reset() {
      if (this.viewed && !this.played) {
        this.imageData = assign({}, this.initialImageData);
        this.renderImage();
      }

      return this;
    },
    // Update viewer when images changed
    update: function update() {
      var _this8 = this;

      var element = this.element,
          options = this.options,
          isImg = this.isImg; // Destroy viewer if the target image was deleted

      if (isImg && !element.parentNode) {
        return this.destroy();
      }

      var images = [];
      forEach(isImg ? [element] : element.querySelectorAll('img'), function (image) {
        if (isFunction(options.filter)) {
          if (options.filter.call(_this8, image)) {
            images.push(image);
          }
        } else if (_this8.getImageURL(image)) {
          images.push(image);
        }
      });

      if (!images.length) {
        return this;
      }

      this.images = images;
      this.length = images.length;

      if (this.ready) {
        var indexes = [];
        forEach(this.items, function (item, i) {
          var img = item.querySelector('img');
          var image = images[i];

          if (image && img) {
            if (image.src !== img.src) {
              indexes.push(i);
            }
          } else {
            indexes.push(i);
          }
        });
        setStyle(this.list, {
          width: 'auto'
        });
        this.initList();

        if (this.isShown) {
          if (this.length) {
            if (this.viewed) {
              var index = indexes.indexOf(this.index);

              if (index >= 0) {
                this.viewed = false;
                this.view(Math.max(this.index - (index + 1), 0));
              } else {
                addClass(this.items[this.index], CLASS_ACTIVE);
              }
            }
          } else {
            this.image = null;
            this.viewed = false;
            this.index = 0;
            this.imageData = {};
            this.canvas.innerHTML = '';
            this.title.innerHTML = '';
          }
        }
      } else {
        this.build();
      }

      return this;
    },
    // Destroy the viewer
    destroy: function destroy() {
      var element = this.element,
          options = this.options;

      if (!element[NAMESPACE]) {
        return this;
      }

      this.destroyed = true;

      if (this.ready) {
        if (this.played) {
          this.stop();
        }

        if (options.inline) {
          if (this.fulled) {
            this.exit();
          }

          this.unbind();
        } else if (this.isShown) {
          if (this.viewing) {
            if (this.imageRendering) {
              this.imageRendering.abort();
            } else if (this.imageInitializing) {
              this.imageInitializing.abort();
            }
          }

          if (this.hiding) {
            this.transitioning.abort();
          }

          this.hidden();
        } else if (this.showing) {
          this.transitioning.abort();
          this.hidden();
        }

        this.ready = false;
        this.viewer.parentNode.removeChild(this.viewer);
      } else if (options.inline) {
        if (this.delaying) {
          this.delaying.abort();
        } else if (this.initializing) {
          this.initializing.abort();
        }
      }

      if (!options.inline) {
        removeListener(element, EVENT_CLICK, this.onStart);
      }

      element[NAMESPACE] = undefined;
      return this;
    }
  };

  var others = {
    getImageURL: function getImageURL(image) {
      var url = this.options.url;

      if (isString(url)) {
        url = image.getAttribute(url);
      } else if (isFunction(url)) {
        url = url.call(this, image);
      } else {
        url = '';
      }

      return url;
    },
    open: function open() {
      var body = this.body;
      addClass(body, CLASS_OPEN);
      body.style.paddingRight = "".concat(this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0), "px");
    },
    close: function close() {
      var body = this.body;
      removeClass(body, CLASS_OPEN);
      body.style.paddingRight = this.initialBodyPaddingRight;
    },
    shown: function shown() {
      var element = this.element,
          options = this.options;
      this.fulled = true;
      this.isShown = true;
      this.render();
      this.bind();
      this.showing = false;

      if (isFunction(options.shown)) {
        addListener(element, EVENT_SHOWN, options.shown, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_SHOWN) === false) {
        return;
      }

      if (this.ready && this.isShown && !this.hiding) {
        this.view(this.index);
      }
    },
    hidden: function hidden() {
      var element = this.element,
          options = this.options;
      this.fulled = false;
      this.viewed = false;
      this.isShown = false;
      this.close();
      this.unbind();
      addClass(this.viewer, CLASS_HIDE);
      this.resetList();
      this.resetImage();
      this.hiding = false;

      if (!this.destroyed) {
        if (isFunction(options.hidden)) {
          addListener(element, EVENT_HIDDEN, options.hidden, {
            once: true
          });
        }

        dispatchEvent(element, EVENT_HIDDEN);
      }
    },
    requestFullscreen: function requestFullscreen() {
      var document = this.element.ownerDocument;

      if (this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        var documentElement = document.documentElement; // Element.requestFullscreen()

        if (documentElement.requestFullscreen) {
          documentElement.requestFullscreen();
        } else if (documentElement.webkitRequestFullscreen) {
          documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (documentElement.mozRequestFullScreen) {
          documentElement.mozRequestFullScreen();
        } else if (documentElement.msRequestFullscreen) {
          documentElement.msRequestFullscreen();
        }
      }
    },
    exitFullscreen: function exitFullscreen() {
      var document = this.element.ownerDocument;

      if (this.fulled && (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        // Document.exitFullscreen()
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    change: function change(event) {
      var options = this.options,
          pointers = this.pointers;
      var pointer = pointers[Object.keys(pointers)[0]];
      var offsetX = pointer.endX - pointer.startX;
      var offsetY = pointer.endY - pointer.startY;

      switch (this.action) {
        // Move the current image
        case ACTION_MOVE:
          this.move(offsetX, offsetY);
          break;
        // Zoom the current image

        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), false, event);
          break;

        case ACTION_SWITCH:
          {
            this.action = 'switched';
            var absoluteOffsetX = Math.abs(offsetX);

            if (absoluteOffsetX > 1 && absoluteOffsetX > Math.abs(offsetY)) {
              // Empty `pointers` as `touchend` event will not be fired after swiped in iOS browsers.
              this.pointers = {};

              if (offsetX > 1) {
                this.prev(options.loop);
              } else if (offsetX < -1) {
                this.next(options.loop);
              }
            }

            break;
          }
      } // Override


      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    },
    isSwitchable: function isSwitchable() {
      var imageData = this.imageData,
          viewerData = this.viewerData;
      return this.length > 1 && imageData.left >= 0 && imageData.top >= 0 && imageData.width <= viewerData.width && imageData.height <= viewerData.height;
    }
  };

  var AnotherViewer = WINDOW.Viewer;

  var Viewer = /*#__PURE__*/function () {
    /**
     * Create a new Viewer.
     * @param {Element} element - The target element for viewing.
     * @param {Object} [options={}] - The configuration options.
     */
    function Viewer(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Viewer);

      if (!element || element.nodeType !== 1) {
        throw new Error('The first argument is required and must be an element.');
      }

      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.action = false;
      this.fading = false;
      this.fulled = false;
      this.hiding = false;
      this.imageClicked = false;
      this.imageData = {};
      this.index = this.options.initialViewIndex;
      this.isImg = false;
      this.isShown = false;
      this.length = 0;
      this.played = false;
      this.playing = false;
      this.pointers = {};
      this.ready = false;
      this.showing = false;
      this.timeout = false;
      this.tooltipping = false;
      this.viewed = false;
      this.viewing = false;
      this.wheeling = false;
      this.zooming = false;
      this.init();
    }

    _createClass(Viewer, [{
      key: "init",
      value: function init() {
        var _this = this;

        var element = this.element,
            options = this.options;

        if (element[NAMESPACE]) {
          return;
        }

        element[NAMESPACE] = this;
        var isImg = element.tagName.toLowerCase() === 'img';
        var images = [];
        forEach(isImg ? [element] : element.querySelectorAll('img'), function (image) {
          if (isFunction(options.filter)) {
            if (options.filter.call(_this, image)) {
              images.push(image);
            }
          } else if (_this.getImageURL(image)) {
            images.push(image);
          }
        });
        this.isImg = isImg;
        this.length = images.length;
        this.images = images;
        this.initBody(); // Override `transition` option if it is not supported

        if (isUndefined(document.createElement(NAMESPACE).style.transition)) {
          options.transition = false;
        }

        if (options.inline) {
          var count = 0;

          var progress = function progress() {
            count += 1;

            if (count === _this.length) {
              var timeout;
              _this.initializing = false;
              _this.delaying = {
                abort: function abort() {
                  clearTimeout(timeout);
                }
              }; // build asynchronously to keep `this.viewer` is accessible in `ready` event handler.

              timeout = setTimeout(function () {
                _this.delaying = false;

                _this.build();
              }, 0);
            }
          };

          this.initializing = {
            abort: function abort() {
              forEach(images, function (image) {
                if (!image.complete) {
                  removeListener(image, EVENT_LOAD, progress);
                }
              });
            }
          };
          forEach(images, function (image) {
            if (image.complete) {
              progress();
            } else {
              addListener(image, EVENT_LOAD, progress, {
                once: true
              });
            }
          });
        } else {
          addListener(element, EVENT_CLICK, this.onStart = function (_ref) {
            var target = _ref.target;

            if (target.tagName.toLowerCase() === 'img' && (!isFunction(options.filter) || options.filter.call(_this, target))) {
              _this.view(_this.images.indexOf(target));
            }
          });
        }
      }
    }, {
      key: "build",
      value: function build() {
        if (this.ready) {
          return;
        }

        var element = this.element,
            options = this.options;
        var parent = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var viewer = template.querySelector(".".concat(NAMESPACE, "-container"));
        var title = viewer.querySelector(".".concat(NAMESPACE, "-title"));
        var toolbar = viewer.querySelector(".".concat(NAMESPACE, "-toolbar"));
        var navbar = viewer.querySelector(".".concat(NAMESPACE, "-navbar"));
        var button = viewer.querySelector(".".concat(NAMESPACE, "-button"));
        var canvas = viewer.querySelector(".".concat(NAMESPACE, "-canvas"));
        this.parent = parent;
        this.viewer = viewer;
        this.title = title;
        this.toolbar = toolbar;
        this.navbar = navbar;
        this.button = button;
        this.canvas = canvas;
        this.footer = viewer.querySelector(".".concat(NAMESPACE, "-footer"));
        this.tooltipBox = viewer.querySelector(".".concat(NAMESPACE, "-tooltip"));
        this.player = viewer.querySelector(".".concat(NAMESPACE, "-player"));
        this.list = viewer.querySelector(".".concat(NAMESPACE, "-list"));
        addClass(title, !options.title ? CLASS_HIDE : getResponsiveClass(Array.isArray(options.title) ? options.title[0] : options.title));
        addClass(navbar, !options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
        toggleClass(button, CLASS_HIDE, !options.button);

        if (options.backdrop) {
          addClass(viewer, "".concat(NAMESPACE, "-backdrop"));

          if (!options.inline && options.backdrop !== 'static') {
            setData(canvas, DATA_ACTION, 'hide');
          }
        }

        if (isString(options.className) && options.className) {
          // In case there are multiple class names
          options.className.split(REGEXP_SPACES).forEach(function (className) {
            addClass(viewer, className);
          });
        }

        if (options.toolbar) {
          var list = document.createElement('ul');
          var custom = isPlainObject(options.toolbar);
          var zoomButtons = BUTTONS.slice(0, 3);
          var rotateButtons = BUTTONS.slice(7, 9);
          var scaleButtons = BUTTONS.slice(9);

          if (!custom) {
            addClass(toolbar, getResponsiveClass(options.toolbar));
          }

          forEach(custom ? options.toolbar : BUTTONS, function (value, index) {
            var deep = custom && isPlainObject(value);
            var name = custom ? hyphenate(index) : value;
            var show = deep && !isUndefined(value.show) ? value.show : value;

            if (!show || !options.zoomable && zoomButtons.indexOf(name) !== -1 || !options.rotatable && rotateButtons.indexOf(name) !== -1 || !options.scalable && scaleButtons.indexOf(name) !== -1) {
              return;
            }

            var size = deep && !isUndefined(value.size) ? value.size : value;
            var click = deep && !isUndefined(value.click) ? value.click : value;
            var item = document.createElement('li');
            item.setAttribute('role', 'button');
            addClass(item, "".concat(NAMESPACE, "-").concat(name));

            if (!isFunction(click)) {
              setData(item, DATA_ACTION, name);
            }

            if (isNumber(show)) {
              addClass(item, getResponsiveClass(show));
            }

            if (['small', 'large'].indexOf(size) !== -1) {
              addClass(item, "".concat(NAMESPACE, "-").concat(size));
            } else if (name === 'play') {
              addClass(item, "".concat(NAMESPACE, "-large"));
            }

            if (isFunction(click)) {
              addListener(item, EVENT_CLICK, click);
            }

            list.appendChild(item);
          });
          toolbar.appendChild(list);
        } else {
          addClass(toolbar, CLASS_HIDE);
        }

        if (!options.rotatable) {
          var rotates = toolbar.querySelectorAll('li[class*="rotate"]');
          addClass(rotates, CLASS_INVISIBLE);
          forEach(rotates, function (rotate) {
            toolbar.appendChild(rotate);
          });
        }

        if (options.inline) {
          addClass(button, CLASS_FULLSCREEN);
          setStyle(viewer, {
            zIndex: options.zIndexInline
          });

          if (window.getComputedStyle(parent).position === 'static') {
            setStyle(parent, {
              position: 'relative'
            });
          }

          parent.insertBefore(viewer, element.nextSibling);
        } else {
          addClass(button, CLASS_CLOSE);
          addClass(viewer, CLASS_FIXED);
          addClass(viewer, CLASS_FADE);
          addClass(viewer, CLASS_HIDE);
          setStyle(viewer, {
            zIndex: options.zIndex
          });
          var container = options.container;

          if (isString(container)) {
            container = element.ownerDocument.querySelector(container);
          }

          if (!container) {
            container = this.body;
          }

          container.appendChild(viewer);
        }

        if (options.inline) {
          this.render();
          this.bind();
          this.isShown = true;
        }

        this.ready = true;

        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }

        if (dispatchEvent(element, EVENT_READY) === false) {
          this.ready = false;
          return;
        }

        if (this.ready && options.inline) {
          this.view(this.index);
        }
      }
      /**
       * Get the no conflict viewer class.
       * @returns {Viewer} The viewer class.
       */

    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Viewer = AnotherViewer;
        return Viewer;
      }
      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */

    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);

    return Viewer;
  }();

  assign(Viewer.prototype, render, events, handlers, methods, others);

  return Viewer;

})));


/***/ }),

/***/ "c8af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "cdf9":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var newPromiseCapability = __webpack_require__("f069");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "cee4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var bind = __webpack_require__("1d2b");
var Axios = __webpack_require__("0a06");
var mergeConfig = __webpack_require__("4a7b");
var defaults = __webpack_require__("2444");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("7a77");
axios.CancelToken = __webpack_require__("8df4");
axios.isCancel = __webpack_require__("2e67");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("0df6");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d4ab":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "d6c7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__("d4ab");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__("b189");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d925":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dbbe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = __webpack_require__("2057");

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e64f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".halo-comment{position:relative;font-family:PingFang SC,Hiragino Sans GB,Microsoft YaHei,STHeiti,WenQuanYi Micro Hei,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:1.8;margin:0 auto;color:#313131;overflow:hidden;zoom:1;text-rendering:geometricPrecision;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.halo-comment a{text-decoration:none;color:#666}.halo-comment input::-webkit-input-placeholder,.halo-comment textarea::-webkit-input-placeholder{color:#ccc}.halo-comment *{-webkit-box-sizing:border-box;box-sizing:border-box}.halo-comment a,.halo-comment abbr,.halo-comment acronym,.halo-comment address,.halo-comment applet,.halo-comment big,.halo-comment blockquote,.halo-comment body,.halo-comment caption,.halo-comment cite,.halo-comment code,.halo-comment dd,.halo-comment del,.halo-comment dfn,.halo-comment div,.halo-comment dl,.halo-comment dt,.halo-comment em,.halo-comment fieldset,.halo-comment figure,.halo-comment form,.halo-comment h1,.halo-comment h2,.halo-comment h3,.halo-comment h4,.halo-comment h5,.halo-comment h6,.halo-comment html,.halo-comment iframe,.halo-comment ins,.halo-comment kbd,.halo-comment label,.halo-comment legend,.halo-comment li,.halo-comment object,.halo-comment ol,.halo-comment p,.halo-comment pre,.halo-comment q,.halo-comment s,.halo-comment samp,.halo-comment small,.halo-comment span,.halo-comment strike,.halo-comment strong,.halo-comment sub,.halo-comment sup,.halo-comment table,.halo-comment tbody,.halo-comment td,.halo-comment tfoot,.halo-comment th,.halo-comment thead,.halo-comment tr,.halo-comment tt,.halo-comment ul,.halo-comment var{border:0;font-size:100%;font-style:inherit;font-weight:inherit;margin:0;outline:0;padding:0;vertical-align:baseline}.halo-comment button,.halo-comment input,.halo-comment textarea{-webkit-appearance:none;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.halo-comment button:focus,.halo-comment input:focus,.halo-comment textarea:focus{outline:none}.halo-comment ol,.halo-comment ul{list-style:none}.halo-comment .comment-count{margin-bottom:15px}.halo-comment .comment-reply-title{font-size:18px;margin-bottom:15px}.halo-comment .middle{display:inline-block;vertical-align:middle}.halo-comment .avatar{display:block;-o-object-fit:cover;object-fit:cover;border-radius:20%;width:40px;height:40px;cursor:pointer;-webkit-transition:all .8s;transition:all .8s;border:1px solid #e1e1e1;-webkit-box-shadow:2px 2px 3px #e1e1e1;box-shadow:2px 2px 3px #e1e1e1}.halo-comment span.input-avatar{display:block;position:absolute;left:20px;bottom:0}.halo-comment span.input-avatar img.avatar-img{width:22px;height:22px;border-radius:100%;cursor:pointer;-webkit-transition:all .8s;transition:all .8s}.halo-comment .comment-editor{position:relative;z-index:1;-webkit-animation:top20 .5s;animation:top20 .5s}.halo-comment .comment-editor .inner{margin:auto;padding:40px 0 0}.halo-comment .comment-form{border-radius:4px;overflow:hidden;position:relative}.halo-comment .comment-form input,.halo-comment .comment-form textarea{-webkit-box-shadow:none;box-shadow:none;resize:vertical;font-size:14px;line-height:20px;padding:6px 12x;background:#fff;border:none;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0;color:#333;outline:none;-webkit-appearance:none}.halo-comment .comment-form input:focus,.halo-comment .comment-form textarea:focus{border-color:#ccc}.halo-comment .comment-input#author{padding-left:40px}.halo-comment .author-info{position:relative;overflow:hidden;margin:0 -10px 15px}.halo-comment .author-info .commentator{position:relative;float:left;padding:0 10px;width:33.333333%}.halo-comment .author-info .commentator label{font-weight:400;display:inline-block;max-width:100%;margin-bottom:5px}.halo-comment .author-info .commentator label span{color:#f05050;-webkit-box-sizing:border-box;box-sizing:border-box}.halo-comment .author-info .commentator input{font-size:12px;width:100%;padding:6px 12px;border:1px solid #ccc;border-color:rgba(135,150,165,.15);color:inherit;border-radius:2px}.halo-comment .author-info .commentator input#authorUrl{margin:0}.halo-comment .comment-textarea{position:relative;width:100%}.halo-comment .comment-textarea label{font-weight:400;display:inline-block;max-width:100%;margin-bottom:5px}.halo-comment .comment-textarea label span{color:#f05050;-webkit-box-sizing:border-box;box-sizing:border-box}.halo-comment .comment-textarea .comment-preview{background:url(data:image/png;base64,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) 100% 100% no-repeat;border:1px solid #efefef;border-radius:2px;background-size:contain;font-size:14px;line-height:18px;width:100%;min-height:120px;-webkit-transition:all .25s ease-in-out 0s;transition:all .25s ease-in-out 0s;color:#000;overflow:hidden;overflow-wrap:break-word;resize:none;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.halo-comment .comment-textarea .comment-preview.markdown-body{background-image:none}.halo-comment .comment-textarea textarea:focus{background-position-y:105px;-webkit-transition:all .25s ease-in-out 0s;transition:all .25s ease-in-out 0s}.halo-comment .comment.index-1>ol.children{padding-left:50px}.halo-comment .children img.avatar{width:2.225em;height:2.225em}.halo-comment .children .contain-main{margin-left:43px}.halo-comment .children .comment-time{margin-top:3px}.halo-comment .comment-preview{position:relative;width:100%;min-height:90px;-webkit-box-shadow:none;box-shadow:none;border:1px solid #e1e8ed;border-radius:5px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:6px 12px;margin-bottom:10px;overflow-wrap:break-word}.halo-comment .comment-preview img{max-width:100%}.halo-comment .comment-preview.isPreview img.vemoji{max-width:20px!important}.halo-comment .comment-emoji-wrap{margin-bottom:15px}.halo-comment .comment-buttons{font-size:12px;text-align:right;display:-webkit-box;display:-ms-flexbox;display:flex;display:-webkit-flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.halo-comment .comment-buttons.SubmitBtn{margin-bottom:15px}.halo-comment .comment-buttons .button-preview-edit,.halo-comment .comment-buttons .button-submit{color:#fff;border:none;background:#448bff linear-gradient(45deg,#448bff,#44e9ff);padding-top:6px;padding-bottom:6px;-webkit-transition:all .2s ease;transition:all .2s ease;border-radius:50px;padding-left:30px;padding-right:30px;cursor:pointer}.halo-comment .comment-buttons .button-preview-edit:hover,.halo-comment .comment-buttons .button-submit:hover{color:#f4f4f4;opacity:.8;-webkit-transition:all .2s ease;transition:all .2s ease}.halo-comment .comment-buttons .emoji-btn,.halo-comment .comment-buttons .preview-btn{display:inline-block;padding:0;width:66px;height:24px;border-radius:4px;position:relative;z-index:101;font-size:12px;text-align:center;line-height:23px;margin-top:3px;cursor:pointer;color:#99a2aa;fill:#99a2aa}.halo-comment .comment-buttons .emoji-btn .comment-icon,.halo-comment .comment-buttons .preview-btn .comment-icon{vertical-align:-3px;margin-right:4px}.halo-comment .comment-buttons .emoji-btn.actived,.halo-comment .comment-buttons .preview-btn.actived{color:#66b1ff;fill:#66b1ff}.halo-comment .comment-loader-container{-webkit-animation:top20 .5s;animation:top20 .5s;position:relative;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:30px 0}.halo-comment .comment-loader-container .comment-loader-default{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:30px}.halo-comment .comment-loader-container .comment-loader-default span{width:4px;height:15px;background-color:#898c7b}.halo-comment .comment-loader-container .comment-loader-default span:first-of-type{-webkit-animation:grow 1s ease-in-out -.45s infinite;animation:grow 1s ease-in-out -.45s infinite}.halo-comment .comment-loader-container .comment-loader-default span:nth-of-type(2){-webkit-animation:grow 1s ease-in-out -.3s infinite;animation:grow 1s ease-in-out -.3s infinite}.halo-comment .comment-loader-container .comment-loader-default span:nth-of-type(3){-webkit-animation:grow 1s ease-in-out -.15s infinite;animation:grow 1s ease-in-out -.15s infinite}.halo-comment .comment-loader-container .comment-loader-default span:nth-of-type(4){-webkit-animation:grow 1s ease-in-out infinite;animation:grow 1s ease-in-out infinite}@-webkit-keyframes grow{0%,to{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(2);transform:scaleY(2)}}@keyframes grow{0%,to{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(2);transform:scaleY(2)}}.halo-comment .comment-loader-container .comment-loader-circle{border:3px solid #898c7b;border-top-color:#fff;border-radius:50%;width:2.5em;height:2.5em;-webkit-animation:spin .7s linear infinite;animation:spin .7s linear infinite}@-webkit-keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.halo-comment .comment-loader-container .comment-loader-balls{width:3.5em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.halo-comment .comment-loader-container .comment-loader-balls div{width:.7em;height:.7em;border-radius:50%;background-color:#898c7b;-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-animation:wave .7s ease-in-out infinite alternate;animation:wave .7s ease-in-out infinite alternate}.halo-comment .comment-loader-container .comment-loader-balls div:first-of-type{-webkit-animation-delay:-.4s;animation-delay:-.4s}.halo-comment .comment-loader-container .comment-loader-balls div:nth-of-type(2){-webkit-animation-delay:-.2s;animation-delay:-.2s}@-webkit-keyframes wave{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes wave{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}.halo-comment .comment-nodes{-webkit-animation:top20 1s;animation:top20 1s;position:relative}.halo-comment .comment-nodes .comment-editor{-webkit-animation:bottom20 .5s;animation:bottom20 .5s}.halo-comment .comment-nodes .comment-editor .inner{padding:7px 0 12px}.halo-comment .comment-empty,.halo-comment .comment-load-button{margin:30px 0;text-align:center}.halo-comment .comment-empty{color:#8899a6}.halo-comment .comment-page{text-align:center;margin-top:25px}.halo-comment .comment-page .page{display:inline-block;padding:0;margin:0}.halo-comment .comment-page .page li{display:inline}.halo-comment .comment-page .page a{position:relative;font-size:inherit;font-family:inherit;padding:5px 10px;border:none;border-top:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;cursor:pointer;-webkit-transition:all .8s;transition:all .8s;font-weight:400;color:#111;background-color:#fff}.halo-comment .comment-page .page .prev-button{border-radius:4px 0 0 4px;border-left:1px solid #d9d9d9;padding:5px 7px}.halo-comment .comment-page .page .next-button{border-radius:0 4px 4px 0;border-right:1px solid #d9d9d9;padding:5px 7px}.halo-comment .comment-page .page svg{vertical-align:middle}.halo-comment .comment-page .page a.active{border-color:#111;background:#111;color:#fff}.halo-comment .comment-nodes .index-1{overflow:hidden;padding-bottom:10px}.halo-comment .comment-nodes li:last-child{border:0}.halo-comment .comment-nodes .commentator a:after,.halo-comment .comment-nodes .commentator a:before{display:none}.halo-comment .comment-body{position:relative;margin:0 auto;padding:0}.halo-comment .comment-avatar{position:relative;z-index:1;float:left;padding:0}.halo-comment .contain-main{margin-left:50px}.halo-comment .comment-meta{line-height:1}.halo-comment .comment-meta .useragent-info{font-size:10px;color:#b3b3b3}.halo-comment .comment-author{font-size:14px}.halo-comment .comment-author .author-name{font-size:16px;font-weight:700;margin-right:6px}.halo-comment .comment-author .is-admin{cursor:pointer;min-width:30px;display:inline-block;text-align:center;font-size:12px;color:#fff;border-radius:3px;font-weight:400;margin-right:6px;padding:1px;background:#fb7299;height:15px;vertical-align:bottom}.halo-comment .comment-time{display:block;margin-top:11px;font-size:10px;color:#b3b3b3}.halo-comment .comment-id{display:block;float:right;margin-top:6px;font-size:12px;color:#657786}.halo-comment .comment-content{padding-bottom:10px;font-size:14px;color:#4a5568}.halo-comment .comment-content p{margin:0}.halo-comment .comment-content p img{max-width:50%}.halo-comment .comment-content img.vemoji{max-width:20px!important}.halo-comment .comment-content.markdown-body a{color:#1890ff}.halo-comment .comment-info{margin-bottom:15px}.halo-comment .comment-info .comment-reply{cursor:pointer;font-size:12px;padding:1px 5px;border-radius:3px;line-height:1.5;color:#dcf2f8;background-color:#23b7e5;font-weight:700;border-radius:.25em;line-height:1;padding:.2em .6em .3em;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.halo-comment .comment-pre-content{padding:7px;-webkit-box-shadow:0 0 1px #f0f0f0;box-shadow:0 0 1px #f0f0f0}.halo-comment .alert{-webkit-animation:top20 .5s;animation:top20 .5s;border-radius:4px;padding:8px 16px;background-color:#f44336;color:#fff;opacity:1;-webkit-transition:opacity .6s;transition:opacity .6s;margin-top:10px}.halo-comment .alert.success{background-color:#4caf50}.halo-comment .alert.info{background-color:#2196f3}.halo-comment .alert.warning{background-color:#ff9800}.halo-comment .alert .closebtn{margin-left:15px;color:#fff;font-weight:700;float:right;font-size:22px;line-height:16px;cursor:pointer;-webkit-transition:.3s;transition:.3s}.halo-comment .alert .closebtn:hover{color:#000}@-webkit-keyframes top20{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes top20{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes bottom20{0%{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes bottom20{0%{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}.halo-comment #EmojiPicker{font-family:Noto,Twemoji,NotomojiColor,Notomoji,Symbola,sans-serif;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.halo-comment #EmojiPicker,.halo-comment #EmojiPicker #Categories{-webkit-box-direction:normal;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%}.halo-comment #EmojiPicker #Categories{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;border-bottom:1px solid #e4e4e4;background:#f0f0f0;color:#fff}.halo-comment #EmojiPicker .category{-webkit-box-flex:1;-ms-flex:1;flex:1;padding-top:5px;padding-bottom:5px;text-align:center;cursor:pointer}.halo-comment #EmojiPicker .category.active{border-bottom:3px solid #009688;-webkit-filter:saturate(3);filter:saturate(3);padding-bottom:2px}.halo-comment #EmojiPicker .category>img{width:22px;height:22px}.halo-comment #EmojiPicker .category:hover{-webkit-filter:saturate(3);filter:saturate(3)}.halo-comment #EmojiPicker #InputSearch{display:block;width:100%;max-width:100%}.halo-comment #EmojiPicker .container-search{display:block;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;margin:5px 0;padding:0 5%}.halo-comment #EmojiPicker .container-search input{width:100%;font-size:14px;padding:8px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px;background:#f6f6f6;color:#4a4a4a;border:1px solid #e2e2e2}.halo-comment #EmojiPicker #Emojis{display:block;width:100%;max-width:100%}.halo-comment #EmojiPicker #Emojis ::-webkit-scrollbar{border-radius:4px;width:4px;background:hsla(0,0%,48.6%,.36)}.halo-comment #EmojiPicker #Emojis ::-webkit-scrollbar-track{border-radius:4px}.halo-comment #EmojiPicker #Emojis ::-webkit-scrollbar-thumb{border-radius:4px;background:rgba(0,0,0,.22)}.halo-comment #EmojiPicker #Emojis ::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.38)}.halo-comment #EmojiPicker .container-emoji{overflow-x:hidden;overflow-y:scroll;max-height:200px}.halo-comment #EmojiPicker .category-title{text-transform:uppercase;font-size:.8em;color:#848484}.halo-comment #EmojiPicker .category-title:not(:first-of-type){padding:10px 0 0 16px}.halo-comment #EmojiPicker .grid-emojis{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin:5px 0 0 0;-webkit-box-align:start;-ms-flex-align:start;align-items:start}.halo-comment #EmojiPicker .emoji{display:inline-block;text-align:center;font-size:16px;padding:5px 10px;cursor:pointer}.halo-comment #EmojiPicker #VSvg{display:inline-block;vertical-align:middle}.halo-comment .vemoji{max-width:25px!important;vertical-align:text-bottom;margin:0 1px;display:inline-block}.halo-comment .edition{float:right;color:#999;font-size:.75em;padding:.5em 0 0}.dark-mode input,.dark-mode textarea{background-color:#232125!important;color:#a9a9b3!important;border:none!important}.dark-mode img{-webkit-filter:brightness(.6)!important;filter:brightness(.6)!important}.dark-mode .comment-form{border-radius:0}.dark-mode .comment-pre-content{background-color:#232125!important;-webkit-box-shadow:none!important;box-shadow:none!important}.dark-mode .comment-pre-content .markdown-body{color:#a9a9b3!important}.dark-mode .comment-content{background-color:#292a2d!important;color:#a9a9b3!important;border:none!important}.dark-mode .comment-preview{background-color:#232125!important;color:#a9a9b3!important;border:none!important}.dark-mode .comment-buttons .preview-btn{background:none!important}.dark-mode .comment-nodes .index-1{border-bottom:3px solid #36393c}.dark-mode .comment-page{border-top:3px solid #36393c}.dark-mode .comment-page .page button{background-color:#676a6c;color:#fff;border:1px solid #676a6c}@media (max-width:520px){.halo-comment .author-info .commentator{width:100%;margin-bottom:15px}.halo-comment .useragent-info{display:block;margin-top:10px}.halo-comment .comment-meta>.comment-info{margin-bottom:10px}.halo-comment .comment-time{margin-top:10px}.halo-comment .children .useragent-info{margin-top:2px}.halo-comment .children .comment-time{margin-top:10px}}@font-face{font-family:octicons-link;src:url(data:font/woff;charset=utf-8;base64,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) format(\"woff\")}.markdown-body{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:16px;line-height:1.5;word-wrap:break-word}.markdown-body .octicon{display:inline-block;fill:currentColor;vertical-align:text-bottom}.markdown-body .anchor{float:left;line-height:1;margin-left:-20px;padding-right:4px}.markdown-body .anchor:focus{outline:none}.markdown-body details{display:block}.markdown-body details summary{cursor:pointer}.markdown-body summary{display:list-item}.markdown-body a{background-color:transparent;text-decoration:none}.markdown-body a:hover{text-decoration:underline}.markdown-body a:not([href]){color:inherit;text-decoration:none}.markdown-body strong{font-weight:inherit;font-weight:bolder;font-weight:600}.markdown-body h1{margin:.67em 0;font-size:32px;font-size:2em}.markdown-body img{border-style:none;background-color:#fff;max-width:100%}.markdown-body hr,.markdown-body img{-webkit-box-sizing:content-box;box-sizing:content-box}.markdown-body hr{overflow:visible;background:transparent;border-bottom:1px solid #dfe2e5;height:0;margin:15px 0;overflow:hidden;background-color:#e1e4e8;border:0;height:.25em;margin:24px 0;padding:0;border-bottom-color:#eee}.markdown-body hr:after,.markdown-body hr:before{content:\"\";display:table}.markdown-body hr:after{clear:both}.markdown-body input{font:inherit;margin:0;overflow:visible;font-family:inherit;font-size:inherit;line-height:inherit}.markdown-body [type=checkbox]{padding:0}.markdown-body *,.markdown-body [type=checkbox]{-webkit-box-sizing:border-box;box-sizing:border-box}.markdown-body table{border-collapse:collapse;border-spacing:0;display:block;overflow:auto;width:100%}.markdown-body table th{font-weight:600}.markdown-body table tr{background-color:#fff;border-top:1px solid #c6cbd1}.markdown-body table tr:nth-child(2n){background-color:#f6f8fa}.markdown-body h2{font-size:24px;font-size:1.5em}.markdown-body h3{font-size:20px;font-size:1.25em}.markdown-body h4{font-size:16px;font-size:1em}.markdown-body h5{font-size:14px;font-size:.875em}.markdown-body h6{font-size:12px;color:#6a737d;font-size:.85em}.markdown-body p{margin-bottom:10px;margin-top:0}.markdown-body blockquote{margin:0;border-left:.25em solid #dfe2e5;color:#6a737d;padding:0 1em}.markdown-body blockquote>:first-child{margin-top:0}.markdown-body blockquote>:last-child{margin-bottom:0}.markdown-body dd{margin-left:0}.markdown-body pre{margin-bottom:0;margin-top:0;word-wrap:normal}.markdown-body pre>code{background:transparent;border:0;font-size:100%;margin:0;padding:0;white-space:pre;word-break:normal}.markdown-body pre code{background-color:transparent;border:0;display:inline;line-height:inherit;margin:0;max-width:auto;overflow:visible;padding:0;word-wrap:normal}.markdown-body li{word-wrap:break-all}.markdown-body li>p{margin-top:16px}.markdown-body li+li{margin-top:.25em}.markdown-body dl{padding:0}.markdown-body dl dt{font-size:1em;font-style:italic;font-weight:600;margin-top:16px;padding:0}.markdown-body dl dd{margin-bottom:16px;padding:0 16px}.markdown-body img[align=right]{padding-left:20px}.markdown-body img[align=left]{padding-right:20px}.markdown-body code{background-color:rgba(27,31,35,.05);border-radius:3px;font-size:85%;margin:0;padding:.2em .4em}.markdown-body .highlight{margin-bottom:16px}.markdown-body .highlight pre{margin-bottom:0;word-break:normal}.markdown-body a:active,.markdown-body a:hover{outline-width:0}.markdown-body code,.markdown-body pre{font-family:monospace,monospace;font-size:1em}.markdown-body td,.markdown-body th{padding:0}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-bottom:0;margin-top:0;font-weight:600;line-height:1.25;margin-bottom:16px;margin-top:24px}.markdown-body h1,.markdown-body h2{font-weight:600;border-bottom:1px solid #eaecef;padding-bottom:.3em}.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{font-weight:600}.markdown-body ol,.markdown-body ul{margin-bottom:0;margin-top:0;padding-left:0;padding-left:2em}.markdown-body ol ol,.markdown-body ul ol{list-style-type:lower-roman}.markdown-body ol ol ol,.markdown-body ol ul ol,.markdown-body ul ol ol,.markdown-body ul ul ol{list-style-type:lower-alpha}.markdown-body code,.markdown-body pre{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:12px}.markdown-body input::-webkit-inner-spin-button,.markdown-body input::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}.markdown-body blockquote,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{margin-bottom:16px;margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-bottom:0;margin-top:0}.markdown-body table td,.markdown-body table th{border:1px solid #dfe2e5;padding:6px 13px}.markdown-body .highlight pre,.markdown-body pre{background-color:#f6f8fa;border-radius:3px;font-size:85%;line-height:1.45;overflow:auto;padding:16px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e667":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "e683":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "e6cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var NativePromise = __webpack_require__("fea9");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var setSpecies = __webpack_require__("2626");
var isObject = __webpack_require__("861d");
var aFunction = __webpack_require__("1c0b");
var anInstance = __webpack_require__("19aa");
var classof = __webpack_require__("c6b6");
var inspectSource = __webpack_require__("8925");
var iterate = __webpack_require__("2266");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var speciesConstructor = __webpack_require__("4840");
var task = __webpack_require__("2cf4").set;
var microtask = __webpack_require__("b575");
var promiseResolve = __webpack_require__("cdf9");
var hostReportErrors = __webpack_require__("44de");
var newPromiseCapabilityModule = __webpack_require__("f069");
var perform = __webpack_require__("e667");
var InternalStateModule = __webpack_require__("69f3");
var isForced = __webpack_require__("94ca");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "e9ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__("5156")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%': generator ? getProto(generator()) : undefined,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = __webpack_require__("0f7c");
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};


/***/ }),

/***/ "ee7e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__("a0d3");

var GetIntrinsic = __webpack_require__("e9ac");

var $TypeError = GetIntrinsic('%TypeError%');

var Type = __webpack_require__("3d27");
var ToBoolean = __webpack_require__("72f2");
var IsCallable = __webpack_require__("7f73");

// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};


/***/ }),

/***/ "f069":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "f367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__("d6c7");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f6b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "fe24":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".emoji.颜文字{background:rgba(252,228,236,.25)!important;border:1px solid rgba(252,228,236,.18)!important;border-radius:5px!important;font-size:12px!important;margin:5px!important;padding:0!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "fea9":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global.Promise;


/***/ }),

/***/ "fffd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var has = __webpack_require__("a0d3");
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};


/***/ })

/******/ });
//# sourceMappingURL=halo-comment.js.map