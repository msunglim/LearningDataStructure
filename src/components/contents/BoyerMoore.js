import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressText, setProgressPatternbm, setProgressPattern2 } from './progress/Progress';

import styles from './algorithmCSS.module.css'
import { HashTable } from './lib/hashtable';

export let boyermoore = {
    component: <BoyerMoore />,
    description: "In computer science, the Boyer–Moore string-search algorithm is an efficient string-searching algorithm that is the standard benchmark for practical string-search literature. It was developed by Robert S. Boyer and J Strother Moore in 1977. ",
    // description2:"BM은 pattern의 last table을 먼저 만든다. 그리고 pattern과 text를 비교하는데, pattern의 후미부터 비교한다. 만약 현재 보고 있는 text의 값이, last table에 있을 경우, 현재 index에 last table을 index로 가지는 pattern의 값이 오도록 pattern을 오른쪽으로 shift한다. 왼쪽으로 갈경우에는 오른쪽으로 1칸 shift한다. 전체가 맞았을 경우 오른쪽으로 1칸 shift한다. 만약 없었을 경우, pattern의 크기만큼 오른쪽으로 shift한다.",
    description2:"Boyer-Moore string searching constructs a last table to determine how much to shift the pattern by on a mismatch. In addition, the algorithm starts from the back of the pattern instead of the front. If the text and pattern do match, then go to the previous character in the pattern and the text, and repeat the previous step. If you’ve compared all of the characters in the pattern, you’ve found a match. If they don’t match, then take the character in the text, and look up the value in the last table to get the next alignment of the pattern.",
    links: ["https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/", "https://www.tutorialspoint.com/automata_theory/moore_and_mealy_machines.htm"],

}

function BoyerMoore() {
    //input = t -> (add button) -> set text !
    const [t, setT] = useState()
    const [text, setText] = useState()

    const [pattern, setPattern] = useState()


    function setProgress(setState) {

        setState()
    }
    function displayText() {
        setProgressText(text)
        setT(text)
        setProgress(setText)
    }
    function findLastTable(temp) {
        let lt = new HashTable()
        for (let i = 0; i < temp.length; i++) {
            lt.add(temp.charAt(i), i)
        }
        lt.add('*', -1)
        return lt;
    }
    function find() {
        //temporarily set T as ealeasealle
        //after testing, use t for tempT, and pattern for tempP

        //temporarily use the e~~lle. for text.
        let lastTable = findLastTable(pattern)
        let lt = Object.entries(lastTable.array)
        let shift = 0
        let matched = false;
        let matchedIndex = []
        setProgressPatternbm(t, pattern, lt, shift, -1, false, -2) //-2 to avoid highligting * in last table
        let curr = pattern.length - 1 //the compared index of pattern
        while (curr >= 0 && curr + shift < t.length) {
            let char = t.charAt(shift + curr)
            //looked element in last table. = current character of text.
            let index = lastTable.getIndexOfKey(char)
            setProgressPatternbm(t, pattern, lt, shift, shift + curr, false, index)
            if (char !== pattern.charAt(curr)) {
                matched = false
                if (index < 0) { //current character doesn't even exist in the table
                    shift += pattern.length

                } else {
                    //current character does exist in the table. 
                    let lt_val = lastTable.getValue(char)
                    if (curr - lt_val < 0) {
                        shift++;
                    } else {
                        shift += curr - lt_val
                    }
                }
                curr = pattern.length - 1
            } else {

                curr--
                if (curr < 0 && matched) {
                    matchedIndex.push(shift)
                    setProgressPatternbm(t, pattern, lt, shift, shift + curr + 1, true, -2)
                    shift++;
                    curr = pattern.length - 1
                    matched = false
                } else {
                    matched = true
                }
            }

        }
        setProgressPattern2(t, pattern, matchedIndex)
        setT('')
        setPattern('')
        setProgress(setPattern)
    }

    function clear() {
        setT()
        setPattern()
        emptyProgressList()

    }

    return (
        <div>


            <div className={styles.methodBox}>

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Set Text / Find Pattern</div>
                    <div className={styles.methodButton} >
                        <Input placeholder='text' className='input' value={text} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, displayText, setText) } }}
                            onChange={e => { setText(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={displayText}>add</Button>
                        <Input placeholder='pattern' className='input' value={pattern} onKeyDown={e => { if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, find, setPattern) } }}
                            onChange={e => { setPattern(e.target.value) }} style={{ width: '75px' }} />

                        <Button type="primary" onClick={find}>find</Button>

                    </div>
                </div>


            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>

            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>

                Boyer-Moore
                <Progress />
            </span>
            <hr />

        </div>
    )
}
export default BoyerMoore