import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList, emptySortProcess, setProgessSort, setProgessSorting, setProgressQuickSort } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let quicksort = {
    component: <QuickSort />,
    description: "Quicksort is an in-place sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting. When implemented well, it can be somewhat faster than merge sort and about two or three times faster than heapsort.",
   // description2:"Quick sort는 첫번째로 아무 위치를 pivot으로 잡은뒤 그것과 index0을 바꾼다. 그리고 가장 오른쪽 index와 index 1을 pivot과 비교하여, index 1은 pivot보다 클경우 오른쪽으로 이동, 오른쪽 index는 pivot보다 작을 경우 왼쪽으로 이동시킨다. 단, 이 때 서로 더이상 움직이지 못할 상황이 되었을 경우에는 새로운 pivot을 찾고 이 과정을 반복한다. 왼쪽 index와 오른쪽 index의 값이 교차를 이루었을 경우, 빨간색 파란색 박스로 표시하고 가장 왼쪽 index와 빨간색박스안의 값을 바꾼다. 그리고 하늘색박스를 기준으로 array를 양분하여 이 과정을 element가 1개로 쪼개질 때까지 recursively 반복한다.",
    description2:" In quick sort, choose an item at random to be the pivot.  Swap the pivot with the first item.  Have a left “marker” that starts with the second item (the item after the pivot), and a right “marker” that starts at the last item. If the item pointed to by the left marker is smaller than the pivot, move the marker one item to the right. Repeat this step until the marker points to an item that is larger than the pivot or goes beyond the right marker (they cross over). (If the item and the pivot are equal, then either can be done.)  If the item pointed to by the right marker is larger than the pivot, move the marker one item to the left. Repeat this step until the marker points to an item that is smaller than the pivot or goes beyond the left marker. (If the item and the pivot are equal, then either can be done.)  After the markers cross over, swap the pivot with the right marker (note that the right marker is now to the left of the left marker).  The pivot is now in the right place within the final sorted array. All items to the left of the pivot (if there are any) are smaller than the pivot, and all items to the right of the pivot (if there are any) are larger than the pivot. Perform quicksort on the smaller items and on the larger items.",
    links: ["https://www.geeksforgeeks.org/quick-sort/", "https://www.tutorialspoint.com/data_structures_algorithms/quick_sort_algorithm.htm"],

}

function QuickSort() {
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

        setProgessSorting(array, array.length, array.length)

        // setProgessSortingIterative(arrayCopy, i, i)
        quicksort(array, 0, array.length)

        setProgessSorting(array, array.length, array.length)
        setProgessSort()
        setArray([...array])
    }
    function quicksort(arr, a, b) {
        if (a === b) return;

        //a<= p < b
        let p = parseInt(Math.random() * (b - a)) + a
        let copy = arr[p]

        arr[p] = arr[a]
        arr[a] = copy


        let sort = []
        setProgressQuickSort(array, a, p, 0, sort)
        let left = a + 1
        let right = b - 1
        p = a

        while (left <= right) {
            if (arr[p] >= arr[left]) {
                left++
            }
            if (arr[p] <= arr[right]) {
                right--
            }
            if (arr[p] < arr[left] && arr[p] > arr[right] && left <= right) {
                let copy = arr[left]
                arr[left] = arr[right]
                arr[right] = copy
                setProgressQuickSort(array, left, right, 1, sort)
                left = a + 1
                right = b - 1
            }
        }
        if (left > right) {

            let copy = arr[right]
            arr[right] = arr[p]
            arr[p] = copy

            setProgressQuickSort(array, right, p, 2, sort)
            p = right

            quicksort(arr, a, p)
            quicksort(arr, p + 1, b)
        }
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

                QuickSort
                <Tooltip placement="top" title=" the items in the array passed in should not
get copied over to another data structure.">
                    <span className={styles.bandage_positive}>in-place</span>
                </Tooltip>
                <Tooltip placement="top" title=" duplicates must not remain in the same relative
positions after sorting as they were before sorting.">
                    <span className={styles.bandage_negative}>unstable</span>
                </Tooltip>
                <Tooltip placement="top" title="the algorithm doesn't advantage of existing
order in the input array.">
                    <span className={styles.bandage_negative}>not adaptive</span>
                </Tooltip>
                <Progress />
            </span>
            <hr />

            <ul>
                <li><b>Purple box</b>: the element in the purple box was in a pivot index and switched with the element in the grey box. If a grey box isn't shown, the index of purple box was a pivot index. </li>
                <li><b>Red/Blue box</b>: the element in the red box was at the 'Right pointer' and the element in the blue box was at the 'Left pointer'. Since both of 'Right' & 'Left' pointer can't move to cross, the elements in both pointers were switched.</li>
                <li><b>Cyan box</b>: the element in the cyan box was switched with the element in grey box and now it is sorted. If a grey box isn't shown, it had been sorted before this sorting. The index of the cyan box is where 'Left' and 'Right' pointer have been crossed.</li>
                <li><b>Green box</b>: the green box that contains arrays and arrows represents one sorting progress</li>
           
            </ul>
        </div>
    )
}
export default QuickSort