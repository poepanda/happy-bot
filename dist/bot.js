'use strict';

var _botkit = require('botkit');

var _botkit2 = _interopRequireDefault(_botkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('hi');

var fn = function fn(_ref) {
    var hi = _ref.hi,
        there = _ref.there,
        more = _ref.more;
    var a = more.a,
        b = more.b;

    console.log(hi, there, a, b);
};

fn({ hi: 'hi', there: 'there', more: { a: 1, b: 2 } });
