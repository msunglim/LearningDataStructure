import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, setProgressDoublyLinkedList, handleKeyDown } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let doublylinkedlist = {

    component: <DoublyLinkedList />,
    description: "In computer science, a doubly linked list is a linked data structure that consists of a set of sequentially linked records called nodes. Each node contains three fields: two link fields and one data field.",
    // description2:" LinkedList는 앞뒤의 element끼리 서로의 정보를 저장하고 있다. 이것이 빛을 발하는 때는, 추가/삭제할때인데 그 이유는 그 변경되는 부분만 조정을 해주면 나머지는 영향이 없기때문이다.",
    description2: "A doubly linked list is a version of a linked list where each node has a pointer to the next node and a pointer to the previous node. Doubly linked lists can be traversed forward and backward.",
    links: ["https://www.geeksforgeeks.org/doubly-linked-list/", "https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm"],

}
function DoublyLinkedList() {

    const [Index, setIndex] = useState()
    const [addIndex, setAddIndex] = useState()
    const [addFront, setAddFront] = useState()
    const [addBack, setAddBack] = useState()

    let node = {
        next: '',
        prev: '',
        value: ''
    }
    const [Size, setSize] = useState(0)
    const [Head, setHead] = useState(node)
    const [Tail, setTail] = useState(node)


    function setProgress(newHead, setState) {

        setProgressDoublyLinkedList(newHead)

        if (setState !== undefined) {
            setState("")
        
        }
    }
    function addAtIndex() {
        if (parseInt(Index) == Size) {
            addToBack(parseInt(addIndex))
        } else if (parseInt(Index) == 0) {
            addToFront(parseInt(addIndex))
        } else {
            // 0< index < size

            let curr = Head
            let newNode
            for (let i = 0; i < Size; i++) {
                if (i == parseInt(Index)) {
                    newNode = {
                        next: curr,
                        prev: curr.prev,
                        value: parseInt(addIndex)
                    }
                    curr.prev.next = newNode
                    curr.prev = newNode

                    setSize(Size + 1)
                    break
                }
                curr = curr.next
            }
            setProgress(Head, setAddIndex)
        }
    }
    //value, setAddInput could be defined in addIndex. otherwise, follow the value at add to front.
    function addToFront(value) {
        let data = (value !=undefined) ? value : parseInt(addFront)
        let setAdd = (value != undefined) ? setAddIndex : setAddFront
        let newHead;
        if (Size == 0) {
            newHead = {
                next: '',
                prev: '',
                value: data
            }
            setHead(newHead)
            setTail(newHead)

            setSize(1)
        } else {
            newHead = {
                next: Head,
                prev: '',
                value: data
            }
            Head.prev = newHead
            setHead(newHead)
            setSize(Size + 1)
        }
       
        setProgress(newHead, setAdd)
    }
    function addToBack(value) {
        let data = (value != undefined) ? value : parseInt(addBack)
        let setAdd = (value != undefined) ? setAddIndex : setAddBack
    
        let newTail;
        let currHead;
        if (Size == 0) {
            newTail = {
                next: '',
                prev: '',
                value: data
            }
            currHead = newTail
            setHead(newTail)
            setTail(newTail)
            setSize(1)
        } else {
            newTail = {
                next: '',
                prev: Tail,
                value: data
            }
            currHead = Head

            Tail.next = newTail
            setTail(newTail)
            setSize(Size + 1)
        }

        setProgress(currHead, setAdd)
    }
    function clear() {

        let node = {
            next: '',
            prev: '',
            value: ''
        }
        setSize(0)
        setHead(node)
        setTail(node)
        emptyProgressList()
    }
    function removeAtIndex() {
        if (parseInt(Index) == Size - 1) {
            removeFromBack()
        } else if (parseInt(Index) == 0) {
            removeFromFront()
        } else {
            let curr = Head
            for (let i = 0; i < Size; i++) {
                if (i == parseInt(Index)) {
                    curr.prev.next = curr.next
                    curr.next.prev = curr.prev
                }
                curr = curr.next
            }
            setSize(Size - 1)
            setProgress(Head)
        }
    }
    function removeFromFront() {
        if (Size != 0) {
            let newHead;
            if (Size == 1) {
                setHead()
                setTail()

            } else {
                newHead = Head.next
                newHead.prev = ''
                setHead(newHead)

            }
            setSize(Size - 1)
            setProgress(newHead)
        }
    }
    function removeFromBack() {
        if (Size != 0) {
            if (Size == 1) {
                setHead()
                setTail()
                setSize(0)
                setProgress()
            } else {

                Tail.prev.next = ''
                setTail(Tail.prev)
                setSize(Size - 1)
                setProgress(Head)
            }
        }
    }



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
                        <Button type="primary" onClick={e=>{addToFront()}}>add</Button>
                        <Button type="primary" onClick={removeFromFront}>remove</Button>
                    </div>
                </div>

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Add To Back/Remove From Back</div>
                    <div className={styles.methodButton} >
                        <Input className='input' value={addBack} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addToBack, setAddBack) } }}
                            onChange={e => { setAddBack(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={e=>{addToBack()}}>add</Button>
                        <Button type="primary" onClick={removeFromBack}>remove</Button>
                    </div>
                </div>
            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>
                {/* ArrayList: <ShowArrayList /> */}
                DoublyLinkedList <Progress />
            </span>
        </div>
    )
}
export default DoublyLinkedList