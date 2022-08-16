import styles from '../algorithmCSS.module.css'
import { queue } from '../lib/queue';

export let progressList = [];

export function setProgressKruskal(graph, pq) {
    let pqList = []
    pqList.push(
        <tr className={styles.graphTableRow}>
            <th className={styles.graphTable}>Edge</th>
            <th className={styles.graphTable}>Distance</th>
        </tr>
    )
    pqList.push(pq.array.map((element, i) => (
        <tr className={styles.graphTableRow}>
            {element !== undefined &&
                <th className={styles.graphTable}>

                    <span >
                        {element.getU().getValue()}
                    </span>

                    -

                    <span >
                        {element.getV().getValue()}
                    </span>

                </th>
            }

            {element !== undefined &&
                <th className={styles.graphTable}>
                    {element.getWeight()}
                </th>
            }


        </tr>
    )))

    progressList.push(
        <div style={{ textAlign: '-webkit-center' }}>
            {graph}
            <hr />
            Priority Queue{pqList}
            <hr />
            {/* Distance Map
            {dmList} */}

        </div>
    )
}
//pq: priority queue
//dm: distanceMap
export function setProgressDijkstra(graph, pq, dm) {
    let pqList = []
    pqList.push(
        <tr className={styles.graphTableRow}>
            <th className={styles.graphTable}>Vertex</th>
            <th className={styles.graphTable}> Distance </th>
        </tr>
    )
    pqList.push(pq.array.map((element, i) => (
        <tr className={styles.graphTableRow}>
            <td className={styles.graphTable}>
                {element !== undefined &&
                    <span >
                        {element.getVertex().getValue()}
                    </span>
                }
            </td>
            <td className={styles.graphTable}>
                {element !== undefined &&
                    <span>
                        {element.getDistance()}
                    </span>
                }
            </td>
        </tr>
    )))

    let dmList = []
    dmList.push(
        <tr className={styles.graphTableRow}>
            <th className={styles.graphTable}>Vertex</th>
            <th className={styles.graphTable}> Distance </th>
        </tr>
    )
    let startIndex = 65
    let dmElement = dm.array[String.fromCharCode(startIndex)]
    let count = 0
    let dmArray = []
    while (dmElement !== undefined) {
        dmArray.push(dmElement)
        count++
        dmElement = dm.array[String.fromCharCode(startIndex + count)]
    }
    dmList.push(
        dmArray.map((element, i) => (
            <tr className={styles.graphTableRow}>
                <td className={styles.graphTable}>
                    <span>
                        {element.key.value}
                    </span>
                </td>
                <td className={styles.graphTable}>
                    <span>
                        {element.value}
                    </span>
                </td>
            </tr>
        ))
    )
    progressList.push(
        <div style={{ textAlign: '-webkit-center' }}>
            {graph}
            <hr />
            Priority Queue{pqList}
            <hr />
            Distance Map
            {dmList}

        </div>
    )
}
//ds: data structure could be stack or queue
//output: the visited order 
//isBFS BFS, else DFS
export function setProgressGraphBFSDFS(graph, ds, output, isBFS) {
    let array = []
    array.push(ds.map((element, i) => (

        <span className={styles.arrayElement}>
            {element.getValue()}
        </span >

    ))
    )
    let o = []
    o.push(output.map((element, i) => (
        <span className={styles.arrayElement}>
            {element.getValue()}
        </span >

    )))
    progressList.push(
        <div>
            {graph}
            <hr />
            {isBFS &&
                <>   Queue: {array}</>
            }
            {/* is DFS  */}
            {!isBFS &&
                <>   Stack: {array}</>
            }
            <hr />
            Output: {o}
        </div>
    )
}
//the result of pattern matching.
//highlight matched elements.
//match: array of starting index of matching part.
export function setProgressPattern2(text, pattern, matched) {
    let element = []
    let matchIndex = 0
    for (let i = 0; i < text.length; i++) {
        let textElement = text.charAt(i) === ' ' ? '_' : text.charAt(i)
        if ((i >= matched[matchIndex] && i < matched[matchIndex] + pattern.length) || (matched[matchIndex + 1] !== undefined && i === matched[matchIndex + 1])) {
            element.push(
                <container className={styles.container}>
                    <element className={styles.element}>{i}</element>
                    {
                        < element style={{ background: 'springgreen' }} className={styles.element}>{text.charAt(i)} </element>
                    }
                </container >
            )
        } else {
            element.push(
                <container className={styles.container}>
                    <element className={styles.element}>{i}</element>
                    {
                        < element className={styles.element}>{textElement} </element>
                    }
                </container >
            )
        }
        if (i === matched[matchIndex] + pattern.length - 1) {
            matchIndex++

        }


    }
    progressList.push(element)
}
//shift: curr starting index such i and j
//curr : end of pattern (i + pattern.length)
export function setProgressPatternrk(text, pattern, shift, curr, allMatched, textHash, patternHash) {
    let element = []

    for (let i = 0; i < text.length; i++) {
        let textElement = text.charAt(i) === ' ' ? '_' : text.charAt(i)
        element.push(
            <container className={styles.container}>
                {i === shift &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{i}</element>
                }
                {i !== shift &&
                    <element className={styles.element}>{i}</element>
                }
                {i === shift &&
                    <element style={{ background: 'yellow' }} className={styles.element}>
                        {textElement}</element>
                }
                {i !== shift &&
                    <element className={styles.element}>{textElement}</element>
                }
                {(allMatched && i >= shift && i <= curr) &&
                    <element style={{ background: 'springgreen' }} className={styles.element}>
                        {pattern.charAt(i - shift)}</element>
                }
                {(allMatched && (i < shift || i > curr)) &&
                    <element style={{ background: 'red' }} className={styles.element}>
                        {pattern.charAt(i - shift)}</element>
                }
                {(i === shift && !allMatched) &&
                    <element style={{ background: 'yellow' }} className={styles.element}>
                        {pattern.charAt(i - shift)}</element>
                }
                {(i !== shift && !allMatched) &&
                    <element className={styles.element}>
                        {pattern.charAt(i - shift)}</element>
                }
                {i === shift && textHash !== undefined &&
                    <div style={{fontSize:'small', width:'maxContent'}}>
                        {textHash}
                        <hr/>
                    </div>
                }
                {i === shift && textHash !== undefined &&
                    <div style={{fontSize:'small', width:'maxContent'}}>
                        {patternHash}
                    </div>
                }

            </container>
        )
    }

    progressList.push(element)
}

//shift: how right the pattern is shifted for being compared to the text. 
//curr: current index of comparison.
export function setProgressPatternbm(text, pattern, lt, shift, curr, allMatched, ltIndex) {
    let element = []
    // console.log('text', text, 'pattern', pattern, 'lt', lt)
    //i - shift can be accessed to proper index of pattern.
    // console.log('itindex', ltIndex)
    for (let i = 0; i < text.length; i++) {
        let textElement = text.charAt(i) === ' ' ? '_' : text.charAt(i)
        element.push(
            <container className={styles.container}>

                <element className={styles.element}>{i}</element>
                {(i >= shift && i < shift + pattern.length && allMatched === true) &&
                    <element style={{ background: 'springgreen' }} className={styles.element}>{textElement} </element>
                }
                {((i < shift || i >= shift + pattern.length) && allMatched === true) &&
                    <element className={styles.element}>{textElement} </element>
                }

                {(curr === i && allMatched === false) &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{textElement} </element>
                }
                {(curr !== i && allMatched === false) &&
                    <element className={styles.element}>{textElement} </element>
                }

                {(i >= shift && i < shift + pattern.length && allMatched === true) &&
                    <element style={{ background: 'springgreen' }} className={styles.element}>{pattern.charAt(i - shift)} </element>
                }
                {((i < shift || i >= shift + pattern.length) && allMatched === true) &&
                    <element className={styles.element}>{pattern.charAt(i - shift)} </element>
                }

                {(i >= curr && i < shift + pattern.length && allMatched === false) &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{pattern.charAt(i - shift)}</element>
                }
                {((i < curr || i >= shift + pattern.length) && allMatched === false) &&
                    <element className={styles.element}>{pattern.charAt(i - shift)}</element>
                }
                {(i == shift + pattern.length && pattern.length + 1 === lt.length) &&
                    <element className={styles.element}>_</element>
                }


                {(ltIndex !== -1 && i - shift === ltIndex && lt[i - shift] !== undefined) &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{lt[i - shift][0]}</element>
                }
                {(ltIndex !== -1 && i - shift !== ltIndex && lt[i - shift] !== undefined) &&
                    <element className={styles.element}>{lt[i - shift][0]}</element>
                }
                {ltIndex === -1 && i < shift + pattern.length && lt[i - shift] !== undefined &&
                    <element className={styles.element}>{lt[i - shift][0]}</element>
                }
                {ltIndex === -1 && i === shift + pattern.length && lt[i - shift] !== undefined &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{lt[lt.length - 1][0]}</element>
                }


                {(ltIndex !== -1 && i - shift === ltIndex && lt[i - shift] !== undefined) &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{lt[i - shift][1]}</element>
                }
                {(ltIndex !== -1 && i - shift !== ltIndex && lt[i - shift] !== undefined) &&
                    <element className={styles.element}>{lt[i - shift][1]}</element>
                }
                {ltIndex === -1 && i < shift + pattern.length && lt[i - shift] !== undefined &&
                    <element className={styles.element}>{lt[i - shift][1]}</element>
                }
                {ltIndex === -1 && i === shift + pattern.length && lt[i - shift] !== undefined &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{lt[lt.length - 1][1]}</element>
                }



            </container>
        )
    }
    progressList.push(element)
}
//curr: curr element of pattern. 
//KMP
export function setProgressPatternkmp(text, pattern, ft, shift, curr, allMatched) {
    let element = []
    for (let i = 0; i < text.length; i++) {
        let textElement = text.charAt(i) === ' ' ? '_' : text.charAt(i)
        element.push(
            <container className={styles.container}>
                <element className={styles.element}>{i}</element>
                {curr === i &&
                    <element style={{ background: 'yellow' }} className={styles.element}>{textElement} </element>
                }
                {curr !== i &&
                    <element className={styles.element}>{textElement} </element>
                }
                {(allMatched === true && pattern.charAt(i - shift) !== undefined) &&
                    <element style={{ background: 'springgreen' }} className={styles.element}>
                        {pattern.charAt(i - shift)}
                    </element>
                }
                {(allMatched !== true && curr >= i && pattern.charAt(i - shift) !== undefined) &&
                    <element style={{ background: 'yellow' }} className={styles.element}>
                        {pattern.charAt(i - shift)}
                    </element>
                }
                {(allMatched !== true && curr < i && pattern.charAt(i - shift) !== undefined) &&
                    <element className={styles.element}>
                        {pattern.charAt(i - shift)}
                    </element>
                }
                {(ft[i - shift] !== undefined && allMatched === true && i === curr) &&
                    <element style={{ background: 'red' }} className={styles.element}>
                        {ft[i - shift]}
                    </element>
                }
                {(ft[i - shift] !== undefined && allMatched === true && i !== curr) &&
                    <element className={styles.element}>
                        {ft[i - shift]}
                    </element>
                }
                {(ft[i - shift] !== undefined && allMatched === false && i - shift === curr - shift - 1) &&
                    <element style={{ background: 'red' }} className={styles.element}>
                        {ft[i - shift]}
                    </element>
                }
                {(ft[i - shift] !== undefined && allMatched === false && i - shift !== curr - shift - 1) &&
                    <element className={styles.element}>
                        {ft[i - shift]}
                    </element>
                }
                {(ft[i - shift] !== undefined && allMatched === undefined) &&
                    <element className={styles.element}>
                        {ft[i - shift]}
                    </element>
                }
            </container>
        )
    }
    progressList.push(element)
}
export function setProgressText(text) {
    let element = []
    for (let i = 0; i < text.length; i++) {
        let textElement = text.charAt(i) === ' ' ? '_' : text.charAt(i)
        element.push(
            <container className={styles.container}>
                <element className={styles.element}>{i}</element>
                <element className={styles.element}>{textElement} </element>
            </container>
        )
    }
    progressList.push(element)
}

//this sort progress exists for each sorting progress. 
//Since one sorting takes a lot of process, they must be contained another container from progressList
let sortProgress = []

//for general sort
//add sorting progress to progressList after indicating each order by an arrow.
export function setProgessSort() {
    let sortingProgress = sortProgress.reverse().map((element, i) => (
        <>
            {i !== 0 && <>← {element}</>}
            {i === 0 && <>{element}</>}
        </>
    ))
    progressList.push(sortingProgress)
    let result = sortProgress[0].props.children
    progressList.push(result)
    emptySortProcess()
}
//for merge sort
export function setProgessSort2() {
    let sortingProgress = sortProgress.map((element, i) => (
        <>
            {i !== 0 && <>↓<hr /> {element}</>}
            {i === 0 && <>{element}</>}
        </>
    ))
    progressList.push(sortingProgress)
    let result = sortProgress[sortProgress.length - 1].props.children
    progressList.push(result)
    emptySortProcess()
}
export function emptySortProcess() {
    sortProgress = [];
}
//radix sort
export function setProgressRadixSort(buckets) {


    let list = [];
    for (let j = 0; j < buckets.length; j++) {
        let number = <number style={{
            color: 'red',
            border: '1px solid grey'
        }}>
            {j}
        </number>
        let element = [];

        let iter = 0
        while (iter < buckets[j].length) {

            let val = buckets[j][iter]
            element.push(<element style={{ position: 'static', color: 'black', borderBottom: '1px solid grey' }}>{val}</element>)
            iter++
        }

        list[j] = <container style={{ border: '2px solid black', display: 'inline-grid' }}>
            {number} {element}</container>



    }
    sortProgress.push(list)
}

// let quick_sort 
export function setProgressQuickSort(arr, i, j, code, quick_sort) {
    let progress;
    switch (code) {
        case 0:

            progress = arr.map((element, index) => (
                <quick_sort>
                    {
                        (index === i) &&
                        <span style={{ border: 'purple solid 5px' }} className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                    {
                        (index === j && j !== i) &&
                        <span style={{ border: ' grey solid 5px' }} className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                    {
                        (index !== i && index !== j) &&
                        <span className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                </quick_sort>
            ))
            quick_sort.push(progress)
            quick_sort.push('←')
            break;
        case 1:
            progress = arr.map((element, index) => (
                <quick_sort>
                    {
                        (index === i) &&
                        <span style={{ border: 'red solid 5px' }} className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                    {
                        (index === j && j !== i) &&
                        <span style={{ border: ' blue solid 5px' }} className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                    {
                        (index !== i && index !== j) &&
                        <span className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                </quick_sort>
            ))
            quick_sort.push(progress)
            quick_sort.push('←')
            break;
        case 2:
            progress = arr.map((element, index) => (
                <quick_sort>
                    {
                        (index === i) &&
                        <span style={{ border: 'cyan solid 5px' }} className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                    {
                        (index === j && j !== i) &&
                        <span style={{ border: 'grey solid 5px' }} className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                    {
                        (index !== i && index !== j) &&
                        <span className={styles.arrayElement}>
                            {element}
                        </span>
                    }
                </quick_sort>
            ))
            quick_sort.push(progress)

            sortProgress.push(
                <qs style={{ border: 'green 5px solid' }}>
                    {quick_sort.reverse()}
                </qs>)
            quick_sort = []
            break;
    }
}


//for merge sort, if right is null it means the input left is the same as the result.
//if right is undefined, it means the left input is the only input due to division.
//if none of input are undefined, it means there are two array input.
//display only child grey, left red, right blue, result purple.
export function setProgessMergeSort(left, right) {

    let arr_left = left.map((element, index) => (

        <span className={styles.arrayElement}>
            {element}
        </span>
    ))
    let arr_right = (right === undefined || right === null) ? undefined : right.map((element, index) => (
        <span className={styles.arrayElement}>
            {element}
        </span>
    ))

    let new_progress = <div>
        {right === null &&
            <><span style={{ border: 'purple solid 3px' }}>{arr_left}</span></>

        }
        {(right === undefined && right !== null) &&
            <><span style={{ border: 'grey solid 3px' }}>{arr_left}</span></>

        }
        {(right !== undefined && right !== null) &&
            <><span style={{ border: 'red solid 3px' }}>{arr_left}</span><span style={{ border: 'blue solid 3px' }}>{arr_right}</span></>

        }
    </div>

    sortProgress.push(new_progress)
}
//i: index of switching element (smaller) 
//j: index of switched element  (bigger)
export function setProgessSorting(array, i, j) {
    let new_progress = array.map((element, index) => (

        <sort>
            {index === i &&
                <span style={{ border: 'red 5px solid' }} className={styles.arrayElement}>
                    {element}
                </span>
            }
            {(index === j && index !== i) &&
                <span style={{ border: 'blue 5px solid' }} className={styles.arrayElement}>
                    {element}
                </span>
            }
            {(index !== i && index !== j) &&
                <span className={styles.arrayElement}>
                    {element}
                </span>
            }

        </sort>
    ))
    sortProgress.push(
        <sort style={{ border: '2px solid green', padding: '3px' }}>
            {new_progress}
        </sort>
    )
}
//avl
export function setProgressAVL(avl) {
    let new_progress = [];
    queue.clear()


    let curr = avl.root;
    let layer = 1;
    let count = 0;
    let branch = ''
    let allNullLayer = true;

    //literally unique key for tree element
    let uniqkey = 0
    queue.push(curr)
    while (!queue.isEmpty()) {
        curr = queue.pop()
        if (curr === null) {
            //null is added to queue in order to increase count for each layer.
            count++

            queue.push(null)
            queue.push(null)

        } else {
            new_progress.push(
                <node style={{ display: 'inline-grid' }}>
                    <avl>
                        <span style={{ color: 'red' }}>{curr.height}</span><span style={{ color: 'blue', marginLeft: '5px' }}>{curr.balanceFactor}</span>
                    </avl>
                    <span style={{
                        marginTop: '0px',
                        width: '50px',
                        height: '50px',
                        lineHeight: 'normal'
                    }} key={uniqkey} className={styles.treeElement}>
                        {curr.value}
                    </span>
                </node >
            )
            uniqkey++
            count++

            if (curr.left !== undefined) {
                branch += '/'
                allNullLayer = false
                queue.push(curr.left)
            } else {
                queue.push(null)
            }
            if (curr.right !== undefined) {
                branch += '\\'
                allNullLayer = false
                queue.push(curr.right)
            } else {
                queue.push(null)
            }

            if (count < layer) {
                for (let j = 0; j < layer * 2; j++) {
                    branch += '\u00a0'
                }
            }
        }
        if (count == layer) {
            count = 0;
            layer = 2 * layer

            new_progress.push(
                <div >
                    {branch}
                    <hr />
                </div>
            )
            branch = ''
            if (allNullLayer) {
                break;
            } else {
                allNullLayer = true
            }
        }


    }

    progressList.push(new_progress)
}

//heaps: array to heap
export function setProgressArrayToHeaps(arr) {
    let new_progress = []
    let progress_array = []

    let count = 0;
    let layer = 1;
    let branch = ''
    progress_array.push(
        <span className={styles.arrayElement}>
            X
        </span>)
    for (let i = 1; i < arr.length; i++) {

        new_progress.push(
            <span className={styles.treeElement}>
                {arr[i]}
            </span>

        )


        progress_array.push(
            <span className={styles.arrayElement}>
                {arr[i]}
            </span>
        )

        if (arr[i * 2] !== undefined) {
            branch += '/'
        }
        if (arr[i * 2 + 1] !== undefined) {
            branch += '\\'
        }

        if (count < layer) {
            for (let j = 0; j < layer * 2; j++) {
                branch += '\u00a0'
            }
        }
        count++
        if (count == layer) {
            count = 0
            layer = layer * 2
            new_progress.push(
                <div >
                    {branch}
                    <hr />
                </div>
            )
            branch = ''
        }

    }
    new_progress.push(
        <div >
            <hr />
        </div>
    )
    let compilation =
        <div>
            {new_progress}
            {progress_array}
        </div>
    progressList.push(compilation)
}
//heap: add element one by one
export function setProgressHeaps(heap) {
    let new_progress = []
    let progress_array = []
    queue.clear()
    let curr = heap[1];
    let layer = 1;
    let count = 0;
    let branch = ''
    let allNullLayer = true;
    //literally unique key for tree element
    let uniqkey = 0

    //count number of elements that are added to progress_array for empty space in array.
    let added = 0;
    progress_array.push(
        <span key={uniqkey} className={styles.arrayElement}>
            X
        </span>
    )
    queue.push(curr)
    while (!queue.isEmpty()) {
        curr = queue.pop()
        if (curr === null) {
            //null is added to queue in order to increase count for each layer.
            count++

            queue.push(null)
            queue.push(null)

        } else {
            new_progress.push(
                <span key={uniqkey} className={styles.treeElement}>
                    {curr.value}
                </span>

            )
            progress_array.push(
                <span key={uniqkey} className={styles.arrayElement}>
                    {curr.value}
                </span>
            )
            uniqkey++
            count++
            added++

            if (curr.left !== undefined) {
                branch += '/'
                allNullLayer = false
                queue.push(curr.left)
            } else {
                queue.push(null)
            }
            if (curr.right !== undefined) {
                branch += '\\'
                allNullLayer = false
                queue.push(curr.right)
            } else {
                queue.push(null)
            }

            if (count < layer) {
                for (let j = 0; j < layer * 2; j++) {
                    branch += '\u00a0'
                }
            }
        }
        if (count == layer) {
            count = 0;
            layer = 2 * layer


            new_progress.push(
                <div >
                    {branch}
                    <hr />
                </div>
            )
            branch = ''
            if (allNullLayer) {
                break;
            } else {
                allNullLayer = true
            }
        }


    }
    for (let i = 0; i < heap.length - added; i++) {

        progress_array.push(
            <span className={styles.arrayElement}>
                null
            </span>
        )
    }

    let compilation =
        <div>
            {new_progress}
            {progress_array}
        </div>
    progressList.push(compilation)
}
//bst
export function setProgressBST(bst) {
    let new_progress = [];
    queue.clear()


    let curr = bst.root;
    let layer = 1;
    let count = 0;
    let branch = ''
    let allNullLayer = true;

    //literally unique key for tree element
    let uniqkey = 0
    queue.push(curr)
    while (!queue.isEmpty()) {
        curr = queue.pop()
        if (curr === null) {
            //null is added to queue in order to increase count for each layer.
            count++

            queue.push(null)
            queue.push(null)

        } else {
            new_progress.push(
                <span key={uniqkey} className={styles.treeElement}>
                    {curr.value}
                </span>

            )
            uniqkey++
            count++

            if (curr.left !== undefined) {
                branch += '/'
                allNullLayer = false
                queue.push(curr.left)
            } else {
                queue.push(null)
            }
            if (curr.right !== undefined) {
                branch += '\\'
                allNullLayer = false
                queue.push(curr.right)
            } else {
                queue.push(null)
            }

            if (count < layer) {
                for (let j = 0; j < layer * 2; j++) {
                    branch += '\u00a0'
                }
            }
        }
        if (count == layer) {
            count = 0;
            layer = 2 * layer

            new_progress.push(
                <div >
                    {branch}
                    <hr />
                </div>
            )
            branch = ''
            if (allNullLayer) {
                break;
            } else {
                allNullLayer = true
            }
        }


    }

    progressList.push(new_progress)
}
//hashmap
export function setProgressHashMaps(hashmap) {
    let new_progress = [];
    for (let i = 0; i < hashmap.length; i++) {

        if (hashmap[i].key != '') {
            new_progress.push(

                <span style={{ display: 'inline-grid' }} key={i} className={styles.arrayElement}>
                    <span style={{ fontSize: '16px', background: 'lightgrey', textAlign: 'center' }}>{hashmap[i].key}</span>
                    <span style={{ fontSize: '30px', textAlign: 'center' }}>{hashmap[i].value}</span>

                </span>)
        } else {
            new_progress.push(

                <span style={{ display: 'inline-grid' }} key={i} className={styles.arrayElement}>
                    <span style={{ fontSize: '16px', background: 'lightgrey', textAlign: 'center' }}>key</span>
                    <span style={{ fontSize: '30px', textAlign: 'center' }}>value</span>

                </span>)
        }


    }

    progressList.push(new_progress)

}
//deque
export function setProgreessDeque(deque, front, rear) {
    let new_progress = [];

    for (let i = 0; i < deque.length; i++) {

        if (i == front) {

            new_progress.push(
                <span key={i} style={{ border: '10px solid pink' }} className={styles.arrayElement}>
                    {deque[i]}
                </span>
            )
        } else if (i == rear) {
            new_progress.push(
                <span key={i} style={{ border: '10px solid lightblue' }} className={styles.arrayElement}>
                    {deque[i]}
                </span>
            )
        } else {
            new_progress.push(
                <span key={i} className={styles.arrayElement}>
                    {deque[i]}
                </span>
            )
        }
    }
    progressList.push(new_progress)
}
//ddl
export function setProgressDoublyLinkedList(newHead) {
    let new_progress = [];
    let curr = newHead;

    while (curr != undefined && curr.next != undefined) {

        new_progress.push(
            <>
                <span className={styles.arrayElement}>
                    {curr.value}
                </span>
                {curr.next.value != undefined && '↔'}

            </>
        )
        curr = curr.next;

    }

    progressList.push(new_progress)
}
//progress for arraylist. why? because there is not arrow between elements. if the list is linkedlist, it must have link between elements.
export function setProgressArrayList(progress) {

    let new_progress = progress.map((element, i) => (
        <span key={i} className={styles.arrayElement}>
            {element}
        </span>
    ))

    progressList.push(new_progress)

}

export function emptyProgressList() {
    progressList = []
}
//progress for any array form algorithms
//after properly demonstrating each process, return html
export function Progress() {

    let progressSection = [...progressList].reverse().map((progress, i) => (
        <div key={i}>
            {i !== 0 &&
                <div key={i}>
                    <span>←</span>
                    <section key={i} style={{ textAlign: 'center', margin: '10px', border: '3px solid grey', width: 'max-content', background: 'white', float: 'right' }}>
                        {progress}
                    </section>
                </div>}
            {i == 0 &&
                <section key={i} style={{ textAlign: 'center', margin: '10px', border: '3px solid red', width: 'max-content', background: 'white', float: 'right' }}>
                    {progress}
                </section>}
        </div>
    ))
    return (

        <main style={{ border: '1px solid black', overflowX: 'scroll', display: '-webkit-box', background: 'lightcyan' }}>
            {progressSection}

        </main>

    )
}

//e : used to get input value
//method : used to perform a method such as add, remove, etc..
//inputfield : used to clear input field because enter is pressed (method is already performed).
export function handleKeyDown(e, method, inputField) {

    if (e.key === "Enter") {
        method(e.target.value)
        inputField("")
    }
}