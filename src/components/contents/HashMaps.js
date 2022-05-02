import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, setProgressHashMaps, handleKeyDown } from './progress/Progress';
import styles from './algorithmCSS.module.css'


export let hashmaps = {
    component: <HashMaps />,
    description: "In computing, a hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found. put/get이 왜 보통 O(1)이냐면 보통은 Load Factor때문에라도 넉넉한 총량의 배열이 주어지기때문에 특정 key를 넣었을 때 그위치에는 이미 해당 key가 있어서 바로 찾아서 교체할수있고 probing에 따라 빠르게 해당 key의 hashcode에 맞는 영역들을 검색할 수 있음.. 단, 찾는 원소나 넣을 key가 배열에 없을 경우에는 탐색에 O(n)정도걸릴거로 생각됨..<-(좋지않은 hashCode를 가졌을때 최악의 수)하지만 배열이 정말크고 들어오는값들이 배열의 크기보다 작은수라면 언제나 O(1)이 될수 있음 왜냐? hashCode가 항상 자기자리만을 찾아가기때문임. 10의크기를 가진 배열에서 0~9안에 숫자가 들어온다고 생각해봐. key가들어왔을때 자기 자리에없으면 없는거고 있으면 바로찾을 수 있고 그때는 linear probing도 쓸 일이 없을거임.. 그래서 다른 예시에서도 넓은 배열에 각각의 원소들을 자기자리에 맞게 잘 배치시켜주는 (well distributed) hashCode가 필요한거임..LF가 있기때문에 좀 collision이 발생할것같으면 resize로 재배치 시켜주기때문에 찾기/넣기/지우기 O(1)을 유지할 수 있게 든든함.",

    links: ["https://www.geeksforgeeks.org/java-util-hashmap-in-java-with-examples/", "https://www.tutorialspoint.com/java/java_hashmap_class.htm"],

}

function HashMaps() {
    const [addKey, setAddKey] = useState()
    const [addValue, setAddValue] = useState()
    const [removeKey, setRemoveKey] = useState()

    let entry = {
        key: '',
        value: ''

    }
    let initialHash = [entry, entry, entry];
    //initial length of hashmap is 3.
    const [hashmap, setHashmap] = useState(initialHash)


    function setProgress(hashmap, setKey, setValue) {
        setProgressHashMaps(hashmap)
        setKey('')
        setHashmap(hashmap)
        if (setValue != undefined) {
            setValue('')
        }

    }

    function resize() {
        let new_hashmap = []
        let new_length = hashmap.length * 2

        for (let i = 0; i < hashmap.length * 2; i++) {
            new_hashmap[i] = {
                key: '',
                value: ''
            }
        }
        //rearrange backing array.
        for (let i = 0; i < hashmap.length; i++) {
            let entry = {
                key: hashmap[i].key,
                value: hashmap[i].value
            }

            //we dont need to worry about duplicated key!
            if (new_hashmap[entry.key % new_length].key == '') {
                new_hashmap[entry.key % new_length] = entry

            } else {

                let count = 0;
                while (count < hashmap.length) {
                    if (new_hashmap[(parseInt(entry.key) + count) % new_length].key == '') {
                        new_hashmap[(parseInt(entry.key) + count) % new_length] = entry
                        break;
                    } else {
                        count++
                    }
                }
            }
        }

        return new_hashmap
    }
    //value, setAddInput could be defined in addIndex. otherwise, follow the value at add to front.
    function put() {
        if (addKey != '' && addValue != '') {
            let entry = {
                key: addKey,
                value: addValue
            }
            // if (hashmap[addKey % hashmap.length].key == '') {
            //     hashmap[addKey % hashmap.length] = entry
            //     setProgress(hashmap, setAddKey, setAddValue)
            // } else {

            let count = 0;
            let flag;
            while (count < hashmap.length) {

                if (hashmap[(parseInt(addKey) + count) % hashmap.length].key == addKey) {
                    hashmap[(parseInt(addKey) + count) % hashmap.length] = entry
                    break;
                } else if (hashmap[(parseInt(addKey) + count) % hashmap.length].key == '') {
                    //find first null place.
                    // hashmap[(parseInt(addKey) + count) % hashmap.length] = entry
                    if (flag == undefined) {
                        flag = (parseInt(addKey) + count) % hashmap.length;
                    }


                }
                count++
            }
            //means there was the same key
            if (count != hashmap.length) {
                setProgress(hashmap, setAddKey, setAddValue)

            } else if (count == hashmap.length && flag!=undefined) {
                //means there wasn't the same key but empty space.
                hashmap[flag] = entry;
                setProgress(hashmap, setAddKey, setAddValue)
            } else {


                //need to resize 
                let new_hashmap = resize()
                let count2 = 0;

                while (count2 < new_hashmap.length) {

                    if (new_hashmap[(parseInt(addKey) + count2) % new_hashmap.length].key == '') {
                        new_hashmap[(parseInt(addKey) + count2) % new_hashmap.length] = entry

                        break;
                    } else {
                        count2++
                    }
                }

                setProgress(new_hashmap, setAddKey, setAddValue)
            }

        }
    }
    function remove() {

        for (let i = 0; i < hashmap.length; i++) {
            if (hashmap[i].key == removeKey) {
                hashmap[i] = {
                    key: '',
                    value: ''
                }
            }
        }
        setProgress(hashmap, setRemoveKey)
    }
    function clear() {
        let initialHash = [entry, entry, entry];
        setHashmap(initialHash)

        emptyProgressList()
    }


    return (
        <div>
            <div className={styles.methodBox}>


                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Put Entry</div>
                    <div className={styles.methodButton} >

                        <Input placeholder='key' className='input' value={addKey}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, put, setAddKey) }
                            }}
                            onChange={e => { setAddKey(e.target.value) }} style={{ width: '75px' }} />
                        <Input placeholder='value' className='input' value={addValue}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, put, setAddValue) }
                            }}
                            onChange={e => { setAddValue(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={put}>add</Button>
                    </div>
                </div>

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Remove Entry</div>
                    <div className={styles.methodButton} >
                        <Input placeholder='key' className='input' value={removeKey}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, remove, setRemoveKey) }
                            }}
                            onChange={e => { setRemoveKey(e.target.value) }} style={{ width: '75px' }} />

                        <Button type="primary" onClick={remove}>remove</Button>
                    </div>
                </div>

            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>
                {/* ArrayList: <ShowArrayList /> */}
                HashMaps <Progress />
            </span>
        </div>
    )
}
export default HashMaps