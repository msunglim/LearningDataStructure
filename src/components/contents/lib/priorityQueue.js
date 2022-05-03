export function PriorityQueue() {
    //initial length 3
    this.array = [undefined, , ,]
    this.size = 0
    this.add = function (data) {
        //where new data goes
        let index = this.size + 1
        //extend the array twice
        if (this.size + 1 == this.array.length) {
            let arrLength = this.array.length
            for (let i = 0; i < arrLength + 1; i++) {

                this.array.push(undefined)
            }
        }
        let curr = 1

        while (curr <= index) {
            if (curr === index) {//heap was empty or it reaches to the end.
                this.array[curr] = data
                let parentIndex = curr / 2

                let child = this.array[curr]
                let parent = this.array[parseInt(parentIndex)]
                while (parentIndex >= 1 && parent > child) {
                    this.array[parseInt(parentIndex)] = child
                    this.array[curr] = parent

                    curr = parseInt(parentIndex)
                    parentIndex = curr / 2
                    child = this.array[parseInt(curr)]
                    parent = this.array[parseInt(parentIndex)]

                }
                this.size++
                break
            } else {
                curr++
            }
        }

    }
    this.remove = function () {
        let copy = this.array[1]
        this.array[1] = this.array[this.size]

        let parentIndex = this.size / 2
        this.array[this.size] = undefined

        if (parentIndex >= 1) {
            let index = 1
            while (index * 2 <= this.size - 1) {
                let curr = this.array[index]

                let smallerChild;
                let left = this.array[index * 2]
                let right = this.array[index * 2 + 1]

                if (right !== undefined) {
                    smallerChild = (left <= right) ? left : right
                } else {
                    smallerChild = left
                }
                if (smallerChild <= curr) {
                    this.array[index] = smallerChild
                    let copyIndex = index
                    if (smallerChild === left) {
                        this.array[index * 2] = curr
                        index = index * 2
                    } else {
                        this.array[index * 2 + 1] = curr
                        index = index * 2 + 1
                    }


                } else {
                    this.size--
                    break;
                }

            }
        }
        return copy
    }
    this.isEmpty = function () {
        return this.size === 0
    }
}


//element of pq is vertexDistance.
export function PriorityQueueDijkstra() {
    //initial length 3
    this.array = [undefined, , ,]
    this.size = 0
    this.add = function (data) {
        //where new data goes
        let index = this.size + 1
        //extend the array twice
        if (this.size + 1 == this.array.length) {
            let arrLength = this.array.length
            for (let i = 0; i < arrLength + 1; i++) {

                this.array.push(undefined)
            }
        }
        let curr = 1

        while (curr <= index) {
            if (curr === index) {//heap was empty or it reaches to the end.
                this.array[curr] = data
                let parentIndex = curr / 2

                let child = this.array[curr]
                let parent = this.array[parseInt(parentIndex)]
                while (parentIndex >= 1 && parent.distance > child.distance) {
                    this.array[parseInt(parentIndex)] = child
                    this.array[curr] = parent

                    curr = parseInt(parentIndex)
                    parentIndex = curr / 2
                    child = this.array[parseInt(curr)]
                    parent = this.array[parseInt(parentIndex)]

                }
                this.size++
                break
            } else {
                curr++
            }
        }

    }
    this.remove = function () {
        let copy = this.array[1]
        this.array[1] = this.array[this.size]

        let parentIndex = this.size / 2
        this.array[this.size] = undefined

        if (parentIndex >= 1) {
            let index = 1
            while (index * 2 <= this.size - 1) {
                let curr = this.array[index]

                let smallerChild;
                let left = this.array[index * 2]
                let right = this.array[index * 2 + 1]

                if (right !== undefined) {
                    smallerChild = (left.distance <= right.distance) ? left : right
                } else {
                    smallerChild = left
                }
                if (smallerChild.distance <= curr.distance) {
                    this.array[index] = smallerChild

                    if (smallerChild.distance === left.distance) {
                        this.array[index * 2] = curr
                        index = index * 2
                    } else {
                        this.array[index * 2 + 1] = curr
                        index = index * 2 + 1
                    }


                } else {

                    break;
                }

            }
        }
        this.size--
        return copy
    }
    this.isEmpty = function () {
        return this.size === 0
    }
}



//element of pq is edge.
//list : edge list
//들어오는 순간 바로 araay 생성해버리자. 
export function PriorityQueueKruskals(list) {
    //initial length 3
    this.array = [undefined]
    this.array.concat(Array(list.length))
    this.size = 0
    
    
    this.add = function(data) {
        //where new data goes
        let index = this.size + 1
        //extend the array twice
        if (this.size + 1 == this.array.length) {
            let arrLength = this.array.length
            for (let i = 0; i < arrLength + 1; i++) {

                this.array.push(undefined)
            }
        }
        let curr = 1

        while (curr <= index) {
            if (curr === index) {//heap was empty or it reaches to the end.
                this.array[curr] = data
                let parentIndex = curr / 2

                let child = this.array[curr]
                let parent = this.array[parseInt(parentIndex)]
                while (parentIndex >= 1 && parent.getWeight() > child.getWeight()) {
                    this.array[parseInt(parentIndex)] = child
                    this.array[curr] = parent

                    curr = parseInt(parentIndex)
                    parentIndex = curr / 2
                    child = this.array[parseInt(curr)]
                    parent = this.array[parseInt(parentIndex)]

                }
                this.size++
                break
            } else {
                curr++
            }
        }
     
    }

    for(let i = 0; i< list.length;i++){
        this.add(list[i])
    }

    this.remove = function () {
        let copy = this.array[1]
        this.array[1] = this.array[this.size]

        let parentIndex = this.size / 2
        this.array[this.size] = undefined

        if (parentIndex >= 1) {
            let index = 1
            while (index * 2 <= this.size - 1) {
                let curr = this.array[index]

                let smallerChild;
                let left = this.array[index * 2]
                let right = this.array[index * 2 + 1]

                if (right !== undefined) {
                    smallerChild = (left.getWeight() <= right.getWeight()) ? left : right
                } else {
                    smallerChild = left
                }
                if (smallerChild.getWeight() <= curr.getWeight()) {
                    this.array[index] = smallerChild

                    if (smallerChild.getWeight() === left.getWeight()) {
                        this.array[index * 2] = curr
                        index = index * 2
                    } else {
                        this.array[index * 2 + 1] = curr
                        index = index * 2 + 1
                    }


                } else {

                    break;
                }

            }
        }
        this.size--
        return copy
    }
    this.isEmpty = function () {
        return this.size === 0
    }
}