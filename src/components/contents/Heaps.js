import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, setProgressHeaps, handleKeyDown, setProgressArrayToHeaps } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { queue } from './lib/queue';

export let heaps = {
    component: <Heaps />,
    description: "In computer science, a heap is a specialized tree-based data structure which is essentially an almost complete tree that satisfies the heap property: in a max heap, for any given node C, if P is a parent node of C, then the key (the value) of P is greater than or equal to the key of C.",
    // description2:" Min Heap은 크기가 정해진 array의 index 0은 사용하지않고 index 1에 가장 작은값이 위치하게 한다. Remove할 때 array의 index 1값을 return하고 새로 가장 작은 값을 index 1에 위치시킨다. 이 과정에서 처음에는 array[size]의 값을 index 1에 위치시켜놓고 아래값들과 비교하여, 현재값이 아랫값보다 클 경우 아랫값과 위치를 바꾸어주고 자식이 더이상 존재하지않거나 현재값이 양쪽 자식의 값보다 작을 경우, 그대로 둔다. 사실 heap은 tree의 모양으로 나타내서 그렇지, array의 모양을 가지고 있다.",
    description2:" Heaps are commonly represented as a binary tree, where the root is either the largest or smallest item in the heap. In a heap, the parent node is always larger (in the case of a maxheap) or smaller (in the case of a minheap) than its children. There is no relationship between the children. A heap is always complete. At any point, each level of the tree is completely filled, except for the last level which may be filled from left to right with no gaps.",
    links: ["https://www.geeksforgeeks.org/heap-data-structure/", "https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm"],

}

function Heaps() {

    const [addValue, setAddValue] = useState()

    //initial length = 3
    const [heap, setHeap] = useState([undefined, , ,])
    //current number of element.
    const [size, setSize] = useState(0)

    const [array, setArray] = useState([undefined])
    const [arrayInput, setArrayInput] = useState()

    function setProgress(new_heap) {
        // console.log(new_heap)
        setHeap(new_heap)
        setProgressHeaps(new_heap)
    }
    function setProgressBuildHeap(heap) {

        setProgressArrayToHeaps(heap)

    }

    function put() {
        //destination
        let index = size + 1
        let entry = {
            left: undefined,
            right: undefined,
            value: parseInt(addValue)
        }
        // console.log(heap, maxSize, size+1)
        // console.log('heap', heap, 'length', heap.length, 'size', size)
        if (size + 1 == heap.length) {
            let heapLength = heap.length + 1
            for (let i = 0; i < heapLength; i++) {
                heap.push(undefined)

            }
        }
        let curr = 1
        while (curr <= index) {
            if (curr === index) { //heap was empty or it reaches to the end.
                heap[curr] = entry
                let parentIndex = curr / 2
                if (curr !== 1) {
                    if (parentIndex % 1 === 0) { //entry is left child of parent
                        heap[parentIndex].left = entry
                    } else { //right child
                        heap[parseInt(parentIndex)].right = entry
                    }
                }

                let child = heap[curr]
                let parent = heap[parseInt(parentIndex)]

                while (parentIndex >= 1 && parent.value > child.value) {

                    // console.log('cur', child.value, 'parent', parentIndex)
                    if (parentIndex % 1 === 0) {
                        heap[parseInt(parentIndex)] = child
                        heap[parseInt(parentIndex)].left = parent
                        heap[parseInt(parentIndex)].right = parent.right
                        // console.log('a')

                    } else {
                        heap[parseInt(parentIndex)] = child
                        heap[parseInt(parentIndex)].left = parent.left
                        heap[parseInt(parentIndex)].right = parent
                        // console.log(heap[parseInt(parentIndex)].value, 'left:', parent.left.value, 'right', parent.value)
                    }

                    heap[curr] = parent
                    heap[curr].left = heap[2 * curr]
                    heap[curr].right = heap[2 * curr + 1]

                    if (parentIndex / 2 >= 1 && (parseInt(parentIndex) / 2) % 1 == 0) {
                        heap[parseInt(parentIndex / 2)].left = heap[parseInt(parentIndex)]
                    } else if (parentIndex / 2 >= 1 && (parseInt(parentIndex) / 2) % 1 != 0) {
                        heap[parseInt(parentIndex / 2)].right = heap[parseInt(parentIndex)]
                    }

                    curr = parseInt(parentIndex)
                    parentIndex = curr / 2
                    child = heap[parseInt(curr)]
                    parent = heap[parseInt(parentIndex)]


                }

                break;
            } else {
                curr++
            }
        }
        setSize(index)
        // console.log(heap)
        setProgress(heap)

    }

    function remove() {

        let copy = heap[1]
        heap[1] = heap[size]
        heap[1].left = copy.left
        heap[1].right = copy.right

        let parentIndex = size / 2
        heap[size] = undefined

        if (parentIndex >= 1) {

            if (parentIndex % 1 == 0) {
                heap[parseInt(parentIndex)].left = undefined
            } else {
                heap[parseInt(parentIndex)].right = undefined
            }

            let index = 1

            while (index * 2 <= size - 1) {

                let curr = heap[index]
                let left = curr.left
                let right
                let rightIndex = index * 2 + 1
                // if (rightIndex < possibleMaxIndex) {
                    right = curr.right
                // }
                let smallerChild;
                if (right !== undefined) {
                    smallerChild = (left.value <= right.value) ? left : right

                } else {
                    smallerChild = left
                }
                // console.log('smallest ', smallerChild.value,'curr index', index,'left', left,'right',right,'heap',heap)
                if (smallerChild.value <= curr.value) {
                    heap[index] = smallerChild
                    let copyIndex = index
                    if (smallerChild.value === left.value) {
                        heap[index * 2] = curr
                        heap[index].left = heap[index * 2]
                        heap[index].right = heap[index * 2 + 1]

                        heap[index * 2].left = heap[index * 4]
                        heap[index * 2].right = heap[index * 4 + 1]

                        // console.log('top', heap[index], 'left', heap[index].left, 'right', heap[index].right)
                        index = 2 * index
                    } else { //smaller child is right
                        heap[index * 2 + 1] = curr
                        heap[index].left = heap[index * 2]
                        heap[index].right = heap[index * 2 + 1]

                        heap[index * 2 + 1].left = heap[index * 4 + 2]
                        heap[index * 2 + 1].right = heap[index * 4 + 3]

                        index = 2 * index + 1
                    }
                    // console.log(index)
                    if (copyIndex / 2 >= 1) {
                        let grandparent = heap[parseInt(copyIndex / 2)]
                        if (copyIndex % 2 == 0) {
                            grandparent.left = heap[copyIndex]
                        } else {
                            grandparent.right = heap[copyIndex]
                        }
                    }
                } else {
                   break;
                }

            }
        }
        setSize(size - 1)
        setProgress(heap)

    }


    function clear() {
        queue.clear()
        emptyProgressList()
        setSize(0)
        let new_heap = [undefined, , ,]
        setProgress(new_heap)

        setArray([undefined])

    }

    function makeArray() {
        array.push(parseInt(arrayInput))

        // setArray(array)
        setProgressBuildHeap(array)
        setArrayInput('')
    }
    function makeHeap() {
        //return 1 if a is smaller than b else, -1.
        //a<b means they don't need to be switched.
        function compare(a, b) {

            return (a <= b) ? 1 : -1
        }
        function switchElement(indexCopy, arr) {
            while (indexCopy * 2 + 1 <= arrLength) {
                let smallest2 = arr[indexCopy * 2 + 1] === undefined ?
                    arr[indexCopy * 2] :
                    (arr[indexCopy * 2] <= arr[indexCopy * 2 + 1]) ?
                        arr[indexCopy * 2] : arr[indexCopy * 2 + 1]

                let copy = arr[indexCopy]
                if (compare(arr[indexCopy], smallest2) > 0) {
                    break;
                } else {
                    if (smallest2 === arr[indexCopy * 2]) {

                        arr[indexCopy] = arr[indexCopy * 2]
                        arr[indexCopy * 2] = copy
                        indexCopy = indexCopy * 2
                    } else {

                        arr[indexCopy] = arr[indexCopy * 2 + 1]
                        arr[indexCopy * 2 + 1] = copy
                        indexCopy = indexCopy * 2 + 1
                    }
                }
            }
        }
        let arr = array
        let arrLength = arr.length
        let index = parseInt((arr.length - 1) / 2)
        let smallest
        while (index > 0) {

            let curr = arr[index]
            smallest = arr[index * 2 + 1] === undefined ? arr[index * 2] : (arr[index * 2] <= arr[index * 2 + 1]) ? arr[index * 2] : arr[index * 2 + 1]

            if (compare(curr, smallest) < 0) {
                //meaning curr is bigger than smallest. must be switched.
                if (smallest === arr[index * 2]) {
                    //curr is switched with its left child
                    arr[index] = arr[index * 2]
                    arr[index * 2] = curr
                    let indexCopy = index * 2

                    switchElement(indexCopy, arr)
                } else {
                    //curr is switched with its right child
                    arr[index] = arr[index * 2 + 1]
                    arr[index * 2 + 1] = curr
                    let indexCopy = index * 2 + 1
                    switchElement(indexCopy, arr)
                  
                }
            }
            index--

        }

        setProgressBuildHeap(arr)
        setArray([undefined])
    }

    return (
        <div>
            <div className={styles.methodBox}>


                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Add/Remove</div>
                    <div className={styles.methodButton} >

                        <Input placeholder='value' className='input' value={addValue}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, put, setAddValue) }
                            }}
                            onChange={e => { setAddValue(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={put}>add</Button>
                        <Button type="primary" onClick={remove}>remove</Button>
                    </div>
                </div>

                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Build Heap</div>
                    <div className={styles.methodButton} >

                        <Input placeholder='value' className='input' value={arrayInput}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, makeArray, setArrayInput) }
                            }}
                            onChange={e => { setArrayInput(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={makeArray}>1. add</Button>
                        <Button type="primary" onClick={makeHeap}>2. make Heap</Button>
                    </div>
                </div>

            </div>

            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>

                Min Heaps

                <Progress />
            </span>
        </div>
    )
}
export default Heaps