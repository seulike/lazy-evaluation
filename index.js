class Lazy {
    constructor(arr) {
        if (!Array.isArray(arr)) throw new Error('Sorry,only array is supported.');
        if (!arr.length) throw new Error('Sorry,array cannot be empty.');
        this.sourceData = arr;
        this.filterNum = arr.length;
        //Initialize the final calculation function
        this.fin = function () { return arguments[0] };
        Function.prototype.after = function (fn) {
            var self = this;
            return function () {
                var result = self.apply(this, arguments);
                //used for filter function to filter some item
                if (result === 'stop') return 'stop';
                //empty function will return undefined
                //filter function
                if (typeof result === 'boolean') return fn.apply(this, arguments);
                return fn.call(this, result);
            }
        };
        return this;
    }
    map(fn) {
        if (typeof fn === 'function') this.fin = this.fin.after(fn);
        return this;
    }
    filter(fn) {
        if (!(typeof fn === 'function')) return this;
        var self = this;
        function tmp() {
            if (!fn.apply(self, arguments)) return 'stop';
            return arguments[0];
        }
        this.fin = this.fin.after(tmp);
        return this;
    }
    take(filterNum) {
        if (typeof filterNum === 'number'
            && filterNum > 0
            && filterNum <= this.filterNum)
            this.filterNum = filterNum;
        return this;
    }
    exe() {
        var result = [];
        var count = 0;
        var arr = this.sourceData;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            let tmp = this.fin(arr[i]);
            if (tmp !== 'stop') {
                result.push(tmp);
                count++;
            };
            if (count === this.filterNum) break;
        }
        return result;
    }
}