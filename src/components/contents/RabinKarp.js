import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressText, setProgressPatternbm, setProgressPattern2, setProgressPatternrk } from './progress/Progress';

import styles from './algorithmCSS.module.css'
export let rabinkarp = {
    component: <RabinKarp />,
    description: "In computer science, the Rabin–Karp algorithm or Karp–Rabin algorithm is a string-searching algorithm created by Richard M. Karp and Michael O. Rabin that uses hashing to find an exact match of a pattern string in a text. ",
    // description2:"Rabin Karp는 pattern의 hash를 미리 구해두고 pattern의 크기만큼 text에서 처음부분의 hash를 구한다. 서로 같을 경우, 글자하나하나 대조해본다. 다를 경우, text에서 한칸 더 뒤의 같은 크기의 부분의 hash를 구한뒤 다음 비교때 같이 비교해준다. ",
    description2:" Rabin-Karp uses a rolling hash to calculate a hash of the pattern and a hash of the substring (that is the same length as the pattern) of the text. If these hashes are not equal, then it is guaranteed that there is not a match starting at this index, and the rolling hash “slides” to the right by one character. If these hashes are equal, then there may be (but not guaranteed to be, because hashes can collide) a match starting at this index. At this point, each character is compared.",
    links: ["https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/", "https://www.tutorialspoint.com/Rabin-Karp-Algorithm"],

}


function RabinKarp() {
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

    function find() {
        //temporarily set T as ealeasealle
        //after testing, use t for tempT, and pattern for tempP

        //temporarily use the e~~lle. for text.
     
        let matched = false;
        let matchedIndex = []
        let BASE = 101
        let currBase = 1
        let patternHash = 0
        let textHash = 0
        for (let i = pattern.length - 1; i >= 0; i--) {
            patternHash += pattern.charCodeAt(i) * currBase
            textHash += t.charCodeAt(i) * currBase
            currBase *= BASE

        }
        currBase /= BASE
        setProgressPatternrk(t, pattern, t.length, t.length, false)
        for (let i = 0; i < t.length - pattern.length; i++) {
          
            if (textHash === patternHash) {
                matched = true
                setProgressPatternrk(t, pattern, i, i+pattern.length, true, textHash, patternHash)
                for (let j = i; j < i + pattern.length; j++) {
                    setProgressPatternrk(t, pattern, i, j, true, textHash, patternHash)
                    if (t[j] !== pattern[j - i]) {
                        matched = false
                        break
                    }
                }
                if (matched) {
                    matchedIndex.push(i)
                }
                textHash = BASE * (textHash - (t.charCodeAt(i) * currBase)) + t.charCodeAt(i + pattern.length)

            } else {
                setProgressPatternrk(t, pattern, i, i, false, textHash, patternHash)
                textHash = BASE * (textHash - (t.charCodeAt(i) * currBase)) + t.charCodeAt(i + pattern.length)

            }
        }

        setProgressPattern2(t, pattern, matchedIndex)
        setT('')
        setPattern('')
        setProgress(setPattern)
    }

    function clear() {
        setT('')
        setPattern('')
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

                Rabin Karp
                <Progress />
            </span>
            <hr />

        </div>
    )
}
export default RabinKarp