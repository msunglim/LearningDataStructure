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
        if (!(isNaN(parseInt(key)) || typeof(key)==='object' )) {
            this.array[key] = obj
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
        if (!(isNaN(parseInt(key)) || typeof(key)==='object' )) {
            if (this.array[key] === undefined) {
                return -1
            } else {
                return this.array[key].value
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
        if (!(isNaN(parseInt(key)) || typeof(key)==='object' )) {
            if (this.array[key] === undefined) {
                return -1
            } else {
                return this.array[key].key
            }
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