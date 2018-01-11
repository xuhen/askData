/*! askData v1.0.0 | (c) 2018 @xuhen | github.com/xuhen/askData */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.askData = factory(root);
  }
})(this, function (root) {

  'use strict';

  var exports = {};

  var config = {
    contentType: 'application/x-www-form-urlencoded'
  };

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  var xhr = function (type, url, data) {
    var json = (type === "POST" || type === "PUT") ? JSON.stringify(data) : null;


    var methods = {
      success: function () {},
      error: function () {},
      always: function () {}
    };
    var XHR = root.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');

    request.open(type, url, true);
    request.setRequestHeader('Content-type', config.contentType);
    request.onreadystatechange = function () {
      var req;
      if (request.readyState === 4) {
        req = parse(request);
        if (request.status >= 200 && request.status < 300) {
          methods.success.apply(methods, req);
        } else {
          methods.error.apply(methods, req);
        }
        methods.always.apply(methods, req);
      }
    };
    request.send(json);

    var atomXHR = {
      success: function (callback) {
        methods.success = callback;
        return atomXHR;
      },
      error: function (callback) {
        methods.error = callback;
        return atomXHR;
      },
      always: function (callback) {
        methods.always = callback;
        return atomXHR;
      }
    };

    return atomXHR;
  };

  exports.get = function (src) {
    return xhr('GET', src);
  };

  exports.put = function (url, data) {
    console.log("put");
    return xhr('PUT', url, data);
  };

  exports.post= function (url, data) {
    return xhr('POST', url, data);
  };

  exports.delete = function (url) {
    return xhr('DELETE', url);
  };

  exports.setContentType = function(value) {
    config.contentType = value;
  };

  return exports;

});