import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList, emptySortProcess, setProgessSort, setProgessSorting } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let insertionsort = {
    component: <InsertionSort />,
    description: "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",

    links: ["https://www.geeksforgeeks.org/insertion-sort/", "https://www.tutorialspoint.com/data_structures_algorithms/insertion_sort_algorithm.htm"],

}

function InsertionSort() {
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
    //insertion sort
    //show all the progress
    function sort() {

        //first
        setProgessSorting(array, 0, 0)
    
        for (let i = 1; i < array.length; i++) {
            let curr = array[i]
            let index = i
            if (curr >= array[index - 1]) {
                setProgessSorting(array, index, index)
            } else {
                while (curr < array[index - 1] && index - 1 >= 0){
                    // setProgessSelectionSort(array,index,index)
                    let copy = array[index-1]
                    array[index-1] = curr
                    array[index] = copy
                    setProgessSorting(array, index-1,index)
                    index--
                }
            }
        }

        //last 
        setProgessSorting(array, array.length, array.length)
        setProgessSort()
        setArray([...array])
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

                InsertionSort

                <Tooltip placement="top" title=" the items in the array passed in should not
get copied over to another data structure.">
                    <span className={styles.bandage_positive}>in-place</span>
                </Tooltip>
                <Tooltip placement="top" title=" duplicates must remain in the same relative
positions after sorting as they were before sorting.">
                    <span className={styles.bandage_positive}>stable</span>
                </Tooltip>
                <Tooltip placement="top" title="the algorithm takes advantage of existing
order in the input array.">
                    <span className={styles.bandage_positive}>adaptive</span>
                </Tooltip>
                <Progress />
            </span>
            <hr />

        </div>
    )
}
export default InsertionSort