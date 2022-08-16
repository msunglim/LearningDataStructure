export function Stack() {
    this.tail = undefined
    this.array = [];
    this.push = function (data) {
        if (data === undefined) {
            return;
        } else {
            if (this.tail === undefined) {
                this.tail = 0
            } else {
                this.tail++
            }
            this.array[this.tail] = data
        }
    };
    this.pop = function () {
        if (this.array.length > 0) {
            let ret = this.array[this.tail]
            this.tail--
            return ret;
        }
    };
    this.clear = function () {
        this.array = []
    };
    this.isEmpty = function () {
        return (this.array.length === 0)
    };
    this.getStack = function () {
        return this.array.slice(0,this.tail+1)
    }
   

}
