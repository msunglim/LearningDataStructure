import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, setProgreessDeque, handleKeyDown } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let deques = {
    component: <Deques />,
    description: "In computer science, a double-ended queue is an abstract data type that generalizes a queue, for which elements can be added to or removed from either the front or back. It is also often called a head-tail linked list, though properly this refers to a specific data structure implementation of a deque.",
    // description2:" Deque는 Front와 Rear을 가지고 있다. 오로지 그것이 가르키고 있는 지점에만 추가/삭제할 수 있는데, 그 위치는 mod 계산을 통해 정해진다. 단, add는 크기가 정해진 array안에서 이루어지기 때문에, 용량이 초과되면 array 사이즈를 2배로 늘려준 뒤 Front->Rear순으로 추가 한다. Front/Rear을 삭제할 때 그 위치의 조정이 있을 수 있다.",
    description2: "Deque ahs Front and Rear. We can only add and remove data at where head and rear point. The head and rear location are determined by mod calculation. When adding, if it exceeds the size of the array, it doubles the size and add all datas from front to rear. When removing data at front and rear, their location can be changed." , 
    links: ["https://www.geeksforgeeks.org/deque-set-1-introduction-applications/", "https://www.tutorialspoint.com/deque-in-java#:~:text=The%20dequeue%20is%20a%20double,a%20subtype%20of%20the%20java."],

}

function Deques() {

    const [addFirst, setAddFirst] = useState()
    const [addLast, setAddLast] = useState()

    const [Size, setSize] = useState(0)
    const [Front, setFront] = useState(0)
    //initial length of deque is 3.
    const [deque, setDeque] = useState(['', '', ''])

    function getMod(index) {
        return (index % deque.length >= 0) ? index % deque.length : (index % deque.length) + deque.length
    }


    function setProgress(deque, front, rear, setState) {
        setProgreessDeque(deque, front, rear)
        if (setState != undefined) {
      
            setState("")
        }
    }

    //value, setAddInput could be defined in addIndex. otherwise, follow the value at add to front.
    function addToFirst() {

        //deque is empty
        if (Size == 0) {
            let newFront = getMod(Front - 1)
         
            deque[newFront] = addFirst
            setSize(1)
            setFront(newFront)
            setDeque(deque)
            setProgress(deque, newFront,newFront, setAddFirst)

        } else if (Size < deque.length) {

            let mod = getMod(Front - 1)
            deque[mod] = addFirst
            setFront(mod)
            setSize(Size + 1)
            setDeque(deque)
            setProgress(deque, getMod(Front - 1),
                getMod(Size + deque.length + Front - 1),setAddFirst)
        } else { //(Size == deque.length)

            let new_deque = []
            new_deque[0] = addFirst

            for (let i = 1; i < Size + 1; i++) {
                new_deque[i] = deque[getMod(Front - 1 + i)]
            }
            for (let i = Size + 1; i < Size * 2; i++) {
                new_deque[i] = ''
            }
            setFront(0)
            setSize(Size + 1)
            setDeque(new_deque)
            setProgress(new_deque, 0, Size, setAddFirst)
        }
    }

    function addToLast() {
        if (Size == 0) {  //dont need to update Front 
            deque[Front] = addLast
            
            setSize(Size + 1)
            setDeque(deque)
            setProgress(deque, Front, Front, setAddLast)
        } else if (Size < deque.length) {  //dont need to update Front 
            let mod = getMod(Front + Size + deque.length)
            deque[mod] = addLast
            setSize(Size + 1)
            setDeque(deque)
            setProgress(deque, Front, mod,setAddLast)

        } else { //(Size == deque.length)
            let new_deque = []

            for (let i = 0; i < Size; i++) {
                new_deque[i] = deque[getMod(Front + i)]
            }
            new_deque[Size] = addLast
            for (let i = Size + 1; i < Size * 2; i++) {
                new_deque[i] = ''
            }

            setFront(0)
            setSize(Size + 1)
            setDeque(new_deque)
            setProgress(new_deque, 0, Size,setAddLast)
        }
    }
    function clear() {
        emptyProgressList()
        let new_deque = ['', '', '']
        setSize(0)
        setFront(0)
        setDeque(new_deque)
        setProgress(new_deque)
    }

    function removeFromFirst() {
        if (Size != 0) {
            deque[Front] = ''
            let newFront = getMod(Front + 1)
            setFront(newFront)
            setSize(Size - 1)
            setDeque(deque)
            setProgress(deque, newFront, getMod(Size + deque.length + Front - 1))
        }
    }
    function removeFromLast() {
        if (Size != 0) {
            let last = getMod(Size + deque.length + Front - 1)
            deque[last] = ''
            setSize(Size - 1)
            setDeque(deque)
            setProgress(deque, Front, getMod(Size - 1 + deque.length + Front - 1))
        }
    }

    return (
        <div>
            <div className={styles.methodBox}>
            

                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Add To First/Remove From First</div>
                    <div className={styles.methodButton} >
                        <Input className='input' value={addFirst} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addToFirst, setAddFirst) } }}
                            onChange={e => { setAddFirst(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={addToFirst}>add</Button>
                        <Button type="primary" onClick={removeFromFirst}>remove</Button>
                    </div>
                </div>

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Add To Last/Remove From Last</div>
                    <div className={styles.methodButton} >
                        <Input className='input' value={addLast} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, addToLast, setAddLast) } }}
                            onChange={e => { setAddLast(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={addToLast}>add</Button>
                        <Button type="primary" onClick={removeFromLast}>remove</Button>
                    </div>
                </div>
            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>
                {/* ArrayList: <ShowArrayList /> */}
                Deques <Progress />
            </span>
            <div>
                <span style={{border:'4px solid pink'}}>Head</span>
                <span style={{border:'4px solid skyblue'}}>Rear</span>
            </div>
        </div>
    )
}
export default Deques