"use strict";
exports.__esModule = true;
exports["default"] = {
    first: function (array, fallback) {
        return array.reduce(function (_curr, _prev, _index, arr) {
            return arr[0];
        }, fallback);
    }
};
