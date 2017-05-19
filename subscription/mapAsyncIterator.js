'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapAsyncIterator;

var _iterall = require('iterall');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Copyright (c) 2017, Facebook, Inc.
                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   */

/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */
function mapAsyncIterator(iterable, callback) {
  // Fixes a temporary issue with Regenerator/Babel
  // https://github.com/facebook/regenerator/pull/290
  var iterator = iterable.next ? iterable : (0, _iterall.getAsyncIterator)(iterable);

  function mapResult(result) {
    return result.done ? result : Promise.resolve(callback(result.value)).then(function (mapped) {
      return { value: mapped, done: false };
    });
  }

  return _defineProperty({
    next: function next() {
      return iterator.next().then(mapResult);
    },
    'return': function _return() {
      if (typeof iterator.return === 'function') {
        return iterator.return().then(mapResult);
      }
      return Promise.resolve({ value: undefined, done: true });
    },
    'throw': function _throw(error) {
      if (typeof iterator.throw === 'function') {
        return iterator.throw(error).then(mapResult);
      }
      return Promise.reject(error);
    }
  }, _iterall.$$asyncIterator, function () {
    return this;
  });
}