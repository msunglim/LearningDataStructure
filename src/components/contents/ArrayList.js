import { Input, Button } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressArrayList } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let arraylist = {
    component: <ArrayList />,
    description: "The ArrayList class is a resizable array, which can be found in the java.util package.The difference between a built-in array and an ArrayList in Java, is that the size of an array cannot be modified (if you want to add or remove elements to/from an array, you have to create a new one). While elements can be added and removed from an ArrayList whenever you want.",
    description2: "ArrayList는 크기가 정해지지않은 dynamic 배열이다. 크기가 정해져있지않아 add할 때 제약이없고 array의 특성을 모두 가지고 있어 어느 index에든 접근이 가능하다. ",
    links: ["https://www.geeksforgeeks.org/arraylist-in-java/#:~:text=ArrayList%20is%20a%20part%20of,class%20is%20found%20in%20java.", "https://www.tutorialspoint.com/java/java_arraylist_class.htm"]
}

function ArrayList() {
    const [arraylist, setArraylist] = useState([])

    //states for add function
    const [addIndex, setAddIndex] = useState()
    const [addFront, setAddFront] = useState()
    const [addBack, setAddBack] = useState()
    const [Index, setIndex] = useState()



    function setProgress(new_arraylist, setState) {
        setProgressArrayList(new_arraylist)
        setArraylist(new_arraylist)
        if (setState !== undefined) {
            setState("")
        }
    }
    // add input to new array and copy arraylist state.
    // set the copied arraylist arraylist.
    // Finally, empty the input field.
    function addAtIndex() {
        let new_arraylist = []
        // console.log(Index)
        let temp = 0
        if (parseInt(Index) == arraylist.length) {
            new_arraylist = [...arraylist]
            new_arraylist.push(parseInt(addIndex))
        } else {
            for (var i = 0; i < arraylist.length; i++) {

                if (i == parseInt(Index)) {
                    new_arraylist[temp] = parseInt(addIndex)
                    // console.log('index', Index, ' added', addIndex)
                    temp++;
                }
                new_arraylist[temp] = arraylist[i]
                temp++;
            }
        }
        // console.log('arraylist', new_arraylist)
        setProgress(new_arraylist, setAddIndex)

    }

    // add input to new array and copy arraylist state.
    // set the copied arraylist arraylist.
    // Finally, empty the input field.
    function addToFront() {
        let new_arraylist;
        if (arraylist.length >= 1) {
            new_arraylist = [parseInt(addFront), ...arraylist]
        } else {
            new_arraylist = [parseInt(addFront)]
        }
        setProgress(new_arraylist, setAddFront)

    }

    //copy arraylist state and add input and
    // set the copied arraylist arraylist.
    // Finally, empty the input field.
    function addToBack() {
        let new_arraylist = [...arraylist]
        new_arraylist.push(parseInt(addBack))
        setProgress(new_arraylist, setAddBack)

    }

    function removeAtIndex() {

        if (parseInt(Index) == arraylist.length - 1) {
            removeFromBack()
        } else {
            let new_arraylist = []
            let temp = 0
            for (let i = 0; i < arraylist.length; i++) {
                if (i != parseInt(Index)) {
                    new_arraylist[temp] = arraylist[i]
                    temp++
                }
            }
            // console.log('new arr', new_arraylist)
            setProgress(new_arraylist)
        }
    }

    // remove front from old array and copy arraylist state.
    // set the copied arraylist arraylist.
    // Finally, empty the input field.
    function removeFromFront() {
        if (arraylist.length != 0) {


            let new_arraylist;
            if (arraylist.length >= 1) {
                new_arraylist = [...arraylist.slice(1, arraylist.length)]
            } else {
                new_arraylist = []
            }
            setProgress(new_arraylist)
        }
    }

    //copy arraylist state and remove the last and
    // set the copied arraylist arraylist.
    // Finally, empty the input field.
    function removeFromBack() {
        if (arraylist.length != 0) {
            let new_arraylist = [...arraylist]
            new_arraylist.pop()
            setProgress(new_arraylist)
        }
    }

    //clear the list
    function clear() {
        emptyProgressList()
        setArraylist([])
    }


    // //e : used to get input value
    // //method : used to perform a method such as add, remove, etc..
    // //inputfield : used to clear input field because enter is pressed (method is already performed).
    // function handleKeyDown(e, method, inputField) {
    //     if (e.key === "Enter") {
    //         method(e.target.value)
    //         inputField("")
    //     }
    // }

    return (
        <div>

            <div className={styles.methodBox}>
                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Add At Index/Remove At Index</div>
                    <div className={styles.methodButton} >
                        <Input value={Index} onChange={e => { setIndex(e.target.value) }} style={{ width: '60px' }} placeholder={'index'} />

                        <Input className='input' value={addIndex} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addAtIndex, setAddIndex) } }}
                            onChange={e => { setAddIndex(e.target.value) }} style={{ width: '75px' }} />

                        <Button type="primary" onClick={addAtIndex}>add</Button>
                        <Button type="primary" onClick={removeAtIndex}>remove</Button>
                    </div>
                </div>

                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Add To Front/Remove From Front</div>
                    <div className={styles.methodButton} >
                        <Input className='input' value={addFront} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addToFront, setAddFront) } }}
                            onChange={e => { setAddFront(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={addToFront}>add</Button>
                        <Button type="primary" onClick={removeFromFront}>remove</Button>
                    </div>
                </div>

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Add To Back/Remove From Back</div>
                    <div className={styles.methodButton} >
                        <Input className='input' value={addBack} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addToBack, setAddBack) } }}
                            onChange={e => { setAddBack(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={addToBack}>add</Button>
                        <Button type="primary" onClick={removeFromBack}>remove</Button>
                    </div>
                </div>
            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>
                {/* ArrayList: <ShowArrayList /> */}
                ArrayList <Progress />
            </span>
            <hr />

        </div >

    )
}
export default ArrayList