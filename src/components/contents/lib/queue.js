export function Queue(){
    this.head= undefined;
    this.array= [];
    this.push= function(data){
        if (data === undefined) {
            return;
        } else {
            if (this.head === undefined) {
                this.head = 0
                this.array[this.head] = data
            } else {
                this.array.push(data)
            }
        }
    };
    this.pop= function(){
        if (this.head !== undefined) {
            let ret = this.array[this.head]
            this.head = this.head + 1
            return ret;
        }
    };
    this.clear= function () {
        this.head = undefined
        this.array = []
    };
    this.isEmpty= function (){
        return (this.array[this.head]===undefined)
    };
    this.getQueue=  function(){
        return this.array.slice(this.head, this.array.length)
    }
    this.getArray = function(){
        return this.array
    }
}

export let queue = {
    head: undefined,
    array: [],
    push: push,
    pop: pop,
    clear: clear,
    isEmpty: isEmpty

}

function pop() {
    
    if (queue.head !== undefined) {
        let ret = queue.array[queue.head]
        queue.head = queue.head + 1
        return ret;
    }
}

function push(data) {
    
    if (data === undefined) {
        return;
    } else {
        if (queue.head === undefined) {
            queue.head = 0
            queue.array[queue.head] = data
        } else {
            queue.array.push(data)
        }
    }

}

function clear() {
    queue.head = undefined
    queue.array = []
}
function isEmpty(){
    return (queue.array[queue.head]===undefined)
}