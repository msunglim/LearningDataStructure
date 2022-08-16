import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList, emptySortProcess, setProgessSort, setProgessSorting, setProgressRadixSort } from './progress/Progress';

import styles from './algorithmCSS.module.css'
import { Queue } from './lib/queue';
export let lsdradixsort = {
    component: <LSDRadixSort />,
    description: "In computer science, radix sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix.",
    //description2:"Radix Sort는 element끼리 비교하여 sort하지 않고, 자릿수를 0~9까지의 양동이 queue에 담아 들어간 순대로 다시 array를 만들고, 한단계 더 높은 자릿수를 0~9까지의 양동이 queue에 담고 재배열하는 작업을 element 중 가장 높은 자릿수만큼 반복한다.",
    description2:" Radix sort is different than all of the previous sorting algorithms in that no comparisons are actually done. However, radix sort can only be done on numbers of some base (base 10, base 8, base 16, base 256 (this lets you perform radix sort on ASCII letters), etc.) LSD(Least Significant Digit) Radix sort starts by looking at the least significant digit and works upwards. ",
    links: ["https://www.geeksforgeeks.org/radix-sort/", "https://www.tutorialspoint.com/c-program-for-radix-sort"],

}

function LSDRadixSort() {
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
    //radix sort
    //and then empty the array!
    //show all the progress
    function sort() {

        setProgessSorting(array, array.length, array.length)

        let max = array[0]
        for (let a = 0; a < array.length; a++) {
            if (array[a] > max) {
                max = array[a]
            }
        }
        let iteration = 0;
        while (max > 0) {
            max = parseInt(max/10)
            iteration++
        }
        let sorted = [...array]
        let lsd = 10

        while (iteration > 0) {
            let buckets = []
            let bucketForProgress = []
            //10 buckets for each digits 0~9
            for (let i = 0; i < 10; i++) {
                buckets.push(new Queue())
                bucketForProgress[i] = []
            }
            for (let i = 0; i < sorted.length; i++) {
                let remainder = parseInt((sorted[i] % lsd) /((lsd/10)))
                buckets[remainder].push(sorted[i])
                bucketForProgress[remainder].push(sorted[i])
            }

            setProgressRadixSort(bucketForProgress)
            
            let new_sorted = []
            for (let j = 0; j < buckets.length; j++) {
                while (!buckets[j].isEmpty()) {
                    new_sorted.push(buckets[j].pop())

                }
            }

            sorted = [...new_sorted]

            
            setProgessSorting(sorted, array.length, array.length)
            lsd *= 10
            iteration--
        }
        setProgessSort()
        setArray([...sorted])
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

                LSDRadixSort
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
export default LSDRadixSort