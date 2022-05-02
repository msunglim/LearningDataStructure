export function ArrayList() {
    this.array = []
    this.getArrayList = function () {
        return this.array
    }
    this.add = function (data) {
        this.array.push(data)
    }
    this.remove = function (data) {
        let index = 0
        for (let e of this.array) {
            if (e === data) {
                break
            }
            index++
        }
        this.array = this.array.slice(0, index).concat(this.array.slice(index + 1, this.array.length))
    }
    this.contains = function (data) {
        let tf = false
        for (let e of this.array) {
            if (e === data) {
                tf = true
                return tf
            }
        }
        return tf
    }
    this.get = function(index){
        return this.array[index]
    }
    this.length = function(){
        return this.array.length
    }
}