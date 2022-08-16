import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList, emptySortProcess, setProgessSort, setProgessSorting } from './progress/Progress';

import styles from './algorithmCSS.module.css'
export let cocktailsort = {
    component: <CocktailSort />,
    description: "Cocktail shaker sort, also known as bidirectional bubble sort, cocktail sort, shaker sort, ripple sort, shuffle sort, or shuttle sort, is an extension of bubble sort. The algorithm extends bubble sort by operating in two directions.",
    // description2:"Cocktail Sort는 정직하다. 시작index i와 그 옆 index j의 값을 비교한다. 비교해서 왼쪽값이 오른쪽 값보다 클 경우 서로 위치를 바꾸고 i++, j++해준다. 그리고 끝까지가면 이번엔 i--, j--를 해주고 왼쪽끝까지 서치/비교/교체해준다. 단, 이 과정에서 양끝은 이미 sort 되었을 것이므로, 다음 서치때는 제외한다. 추가적으로 마지막 비교때 바꾸지않았다면 거기까지도 sorted된 영역으로 인정한다.",
    description2:"Remembering where you last swapped will enable some optimization for cocktail sort. For example, traversing the array from smaller indices to larger indices, if you remember the index of your last swap, you know after that index, there are only the largest elements in order. Therefore, on the next traversal down the array, you start at the last swapped index, and on the next traversal up the array, you stop at the last swapped index.",
    links: ["https://www.geeksforgeeks.org/cocktail-sort/", "https://www.tutorialspoint.com/java-program-for-cocktail-sort"],

}

function CocktailSort() {
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
    //merge sort
    //show all the progress
    function sort() {

        setProgessSorting(array, array.length, array.length)
        let lastSwapped;
        do {
            let index = lastSwapped===undefined ? 0 : lastSwapped
            lastSwapped = undefined
            for (let i = index; i < array.length - 1; i++) {

                if (array[i] > array[i + 1]) {
                    lastSwapped = i
                    let copy = array[i]
                    array[i] = array[i + 1]
                    array[i + 1] = copy
                }
                setProgessSorting(array, i, i+1)
            }
            if (lastSwapped !== undefined) {
                let copy = lastSwapped
                lastSwapped = undefined;
                for (let i = copy; i > 0; i--) {
                  
                    if (array[i] < array[i - 1]) {
                        lastSwapped = i
                        let copy = array[i]
                        array[i] = array[i - 1]
                        array[i - 1] = copy
                        
                    }
                    setProgessSorting(array, i, i-1)
                }
            }
        } while (lastSwapped !== undefined)

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

                CocktailSort
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
export default CocktailSort