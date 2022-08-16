import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList, emptySortProcess, setProgessSort, setProgessSorting } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let selectionsort = {
    component: <SelectionSort />,
    description: "In computer science, selection sort is an in-place comparison sorting algorithm. It has an O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.",
    // description2:" Selection sort의 과정을 서술하겠다. 1. array를 훑어서 가장 작은값을 index 0에 두고 원래 걔가 있던 자리에는 index 0에 있었던 값을 넣어준다. 2. 거기+1과 거기+2부터 array 끝까지를 비교하고 거기+1의 값이 그 뒤의 값보다 크다면 서로 위치를 바꾸고, 그렇지않다면 그럴때까지 계속 오른쪽으로 전진한다. 3. 그리고 빨간색비교칸을 한칸씩 우측으로 이동하고 파란색은 항상 빨간색 바로 오른쪽에서 끝까지 서치한다. ",
    description2:"In selection sort, search the entire array for the smallest item (start by assuming the first item you see is the smallest item). Swap that item with the first item. Then, search the entire array (excluding the first item) for the next smallest item. Swap that item with the second item. Repeat until the entire array is sorted",
    links: ["https://www.geeksforgeeks.org/selection-sort/", "https://www.tutorialspoint.com/data_structures_algorithms/selection_sort_algorithm.htm"],

}

function SelectionSort() {
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
    //show all the progress
    function sort() {
        
        let arrayCopy = array
        setProgessSorting(arrayCopy, array.length, array.length)
        for (let i = 0; i < arrayCopy.length; i++) {
            let min = arrayCopy[i]
            let index = i

            for (let j = i + 1; j < arrayCopy.length; j++) {

                if (arrayCopy[index] > arrayCopy[j]) {
                    index = j
                }

            }

            if (min > arrayCopy[index]) {
                let copy = arrayCopy[index]
                arrayCopy[index] = arrayCopy[i]
                arrayCopy[i] = copy
                setProgessSorting(arrayCopy, i, index)

            } else {
                setProgessSorting(arrayCopy, i, i)
            }
            //setProgress(array)
        }
        setProgessSorting(arrayCopy, array.length, array.length)
        // setProgessSort()
        setProgessSort()
        setArray([...arrayCopy])
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

                SelectionSort
                <Tooltip placement="top" title=" the items in the array passed in should not
get copied over to another data structure.">
                    <span className={styles.bandage_positive}>in-place</span>
                </Tooltip>
                <Tooltip placement="top" title=" duplicates don't have to remain in the same relative
positions after sorting as they were before sorting.">
                    <span className={styles.bandage_negative}>unstable</span>
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
export default SelectionSort