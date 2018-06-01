let Common = {
    isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        };
    },
};

module.exports = Common;