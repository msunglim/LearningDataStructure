import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList, emptySortProcess, setProgessSort2, setProgessSorting, setProgessMergeSort } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let mergesort = {
    component: <MergeSort />,
    description: "In computer science, merge sort is an efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output.",
    //description2:"Merge sort는 recursively 1개남을때까지 array를 반씩 쪼갠다. 1개가 되었다면, sibling들과 합치는데, 그 때 합쳐지는 array는 작은순서대로 합친다. 그대로 더 큰 sibling들과 합치다보면 맨 마지막은 정렬된 array를 반환하게된다. ",
    description2: "In merge sort, divide the array into 2 equal parts; one part contains the elements from the left half of the array while the other part contains the elements from the right half of the array. (If there is an odd number of  elements, the middle element will go to either the first part or the second part.) Then, perform merge sort on each half of the array. After this is done, each part should be sorted.  Finally, merge the two parts together. To do this, have a marker on the first item in each part. Take the smaller of the two items and add that into the larger (merged) array, and move that marker forward. Repeat until all of the items have been added into the  merged array. Note that while merging the two parts together, if all of the items in one of the parts have been added into the larger array, you can directly copy over the remaining items from the other part into the larger array.",
    links: ["https://www.geeksforgeeks.org/merge-sort/", "https://www.tutorialspoint.com/data_structures_algorithms/merge_sort_algorithm.htm"],

}

function MergeSort() {
    //array to be sorted
    const [array, setArray] = useState([])
    //state for add function
    const [addValue, setAddValue] = useState()



    function setProgress(new_arraylist, setState) {
        setProgressArrayList(new_arraylist)
        setArray(new_arraylist)
        if (setState !== undefined) {
            setState("")
        }
    }


    //copy arraylist state and add input and
    // set the copied arraylist arraylist.
    // Finally, empty the input field.
    function addToBack() {
        let new_arraylist = [...array]
        new_arraylist.push(parseInt(addValue))
        setProgress(new_arraylist, setAddValue)

    }

    //clear the list
    function clear() {
        emptyProgressList()
        emptySortProcess()
        setArray([])
    }
    //selection sort
    //and then empty the array!
    //show all the progress
    function sort() {

        // setProgessSortingIterative(array, array.length, array.length)

        let sorted = mergeSort(array)

        setProgessSorting(sorted, array.length, array.length)
        setProgessSort2()
        setArray([...sorted])
    }
    function mergeSort(arr) {
        if (arr.length === 1) {
            setProgessMergeSort(arr, )
            return arr
        }
        setProgessMergeSort(arr.slice(0, arr.length / 2), arr.slice(arr.length / 2, arr.length))
       
        let left = mergeSort(arr.slice(0, arr.length / 2))
        let right = mergeSort(arr.slice(arr.length / 2, arr.length))
        let result = []
        let leftIndex = 0
        let rightIndex = 0
        for (let i = 0; i < arr.length; i++) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex])
                leftIndex++
                if (leftIndex === left.length) {
                    while(rightIndex < right.length){
                        result.push(right[rightIndex])
                        rightIndex++
                    }
                    break;
                }
            } else { // left[leftindex] > right[rightindex] 
                result.push(right[rightIndex])
                rightIndex++
                if (rightIndex === right.length) {
                    while(leftIndex < left.length){
                        result.push(left[leftIndex])
                        leftIndex++
                    }
                    break;
                }
            }
        }
        setProgessMergeSort(result, null)
        // setProgessSortingIterative(result, result.length, result.length)
        return result
    }

    return (
        <div>


            <div className={styles.methodBox}>

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Add To Back/Remove From Back</div>
                    <div className={styles.methodButton} >
                        <Input className='input' value={addValue} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addToBack, setAddValue) } }}
                            onChange={e => { setAddValue(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={addToBack}>add</Button>
                        <Button type="primary" onClick={sort}>sort</Button>

                    </div>
                </div>


            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>

            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>

                MergeSort
                <Tooltip placement="top" title=" the items in the array passed in should
get copied over to another data structure.">
                    <span className={styles.bandage_negative}>out-of-place</span>
                </Tooltip>
                <Tooltip placement="top" title=" duplicates must remain in the same relative
positions after sorting as they were before sorting.">
                    <span className={styles.bandage_positive}>stable</span>
                </Tooltip>
                <Tooltip placement="top" title="the algorithm doesn't take advantage of existing
order in the input array.">
                    <span className={styles.bandage_negative}>not adaptive</span>
                </Tooltip>
                <Progress />
            </span>
            <hr />

        </div>
    )
}
export default MergeSort