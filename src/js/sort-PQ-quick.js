



function Sort(arr, fn) {
    this.fn = fn
    this.container = [null].concat(arr)
}

Sort.prototype.less = function (i, j) {
    return this.container[i] < this.container[j]
}

Sort.prototype.exch = function (i, j) {
    var t = this.container[i]
    this.container[i] = this.container[j]
    this.container[j] = t
}

//下沉
Sort.prototype.sink = function (k, N) {
    while (2 * k <= N) {
        var j = 2 * k
        if (j < N && this.less(j, j + 1)) {
            j++
        }
        if (!this.less(k, j)) break;
        this.exch(k, j)
        k = j
    }
}

Sort.prototype.sort = function () {
    var n = this.container.length - 1
    for (var i = Math.floor(n / 2); i >= 1; i--) {
        this.sink(i, n)
    }
    //已经是堆有序
    while (n > 1) {
        this.exch(1, n--)
        this.sink(1, n)
        if (n % 3 || n == 2) {
            this.fn(this.container)
        }
    }
    return this.container.slice(1, this.container.length - 1)
}


export default function (arr, fn) {
    const s = new Sort(arr, fn)
    s.sort()
}
