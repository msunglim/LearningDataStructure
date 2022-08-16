export function HashTable() {
    this.array = [];
    this.size = 0
    this.add = function (key, value) {
        let obj = {
            key: key,
            value: value
        }
        // for (let i = 0; i < this.array.length; i++) {
        //     if (key === this.array[i].key) {
        //         this.array[i] = obj
        //         return;
        //     }
        // }
       
        if (typeof(key)==='string' || typeof(key)==='number') {
            this.array[key] = value
        } else {
            let index = key.getValue()
            this.array[index] = obj
        }
        this.size++
        // this.array.push(obj)
    }
    //return the value of key. if not exist, return -1
    this.getValue = function (key) {
        // let value;
        // for (let i = 0; i < this.array.length; i++) {
        //     if (this.array[i].key === key) {
        //         value = this.array[i].value
        //         return value
        //     }
        // }
        if (typeof(key)==='string' || typeof(key)==='number') {
            if (this.array[key] === undefined) {
                return -1
            } else {
                return this.array[key]
            }
        } else {
            let index = key.getValue()
            if (this.array[index] === undefined) {
                return -1
            } else {
                return this.array[index].value
            }
        }
        // return -1
    }
    //return where the key is. if not exist, return -1
    this.getIndexOfKey = function (key) {
        // let index = -1;
        // for(let i = 0; i<this.array.length; i++){
        //     if(this.array[i].key === key){
        //         index = i;
        //         return index
        //     }
        // }
        // return index
        if (typeof(key)==='string' || typeof(key)==='number') {
            let lt = Object.entries(this.array)
            let ret = -1
            for(let i = 0 ; i < lt.length; i++){
                if(lt[i][0] === key){
                    ret = i
                    return ret
                }
            }
            return ret
        } else {
            let index = key.getValue()
            if (this.array[index] === undefined) {
                return -1
            } else {
                return this.array[index].key
            }
        }
    }

}