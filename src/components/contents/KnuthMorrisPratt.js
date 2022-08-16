import { Input, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { handleKeyDown, emptyProgressList, Progress, setProgressText, setProgressPatternkmp, setProgressPattern2, } from './progress/Progress';

import styles from './algorithmCSS.module.css'

export let kmp = {
    component: <KnuthMorrisPratt />,
    description: "In computer science, the Knuth–Morris–Pratt string-searching algorithm (or KMP algorithm) searches for occurrences of a \"word\" W within a main \"text string\" S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin, thus bypassing re-examination of previously matched characters.",
    // description2:"KMP는 pattern의 failure table을 만들고 시작한다. text의 좌측부터 비교를 시작해서 전부 일치하였을 경우, 다음 index에 현재index의 failure table의 값을 index로 가지는 pattern이 오도록 오른쪽으로 shift한다. 불일치가 일어났을 경우에는 현재 index에 failture table의 값을 index로 가지는 pattern을 오도록 위해 오른쪽으로 shift한다. 처음부터 불일치일경우 그냥 오른쪽으로 1칸이동한다." ,
    description2:" Knuth-Morris-Pratt (KMP) string searching constructs a failure table (also known as a failure function) to determine how much to shift the pattern by on a mismatch. KMP initially starts searching from the beginning of the pattern. However, when the pattern is shifted over, it may or may not restart from the beginning of the pattern. If they do match, then go to the next character in the pattern and the text, and repeat the previous step. If you’ve compared all of the characters in the pattern, you’ve found a match. If they don’t match and the mismatch is on the first letter of the pattern, then shift the pattern to the right by one and restart comparing the pattern and the text from the first letter of the pattern. If they don’t match and the mismatch is not on the first letter of the pattern, then, use the failure table to determine how much to shift the pattern by",
    links: ["https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/", "https://www.tutorialspoint.com/Knuth-Morris-Pratt-Algorithm"],

}

function KnuthMorrisPratt() {
    const [t, setT] = useState()
    const [text, setText] = useState()
    const [p, setP] = useState()
    const [pattern, setPattern] = useState()


    function setProgress(setState) {

        setState()
    }
    function displayText() {
        setProgressText(text)
        setT(text)
        setProgress(setText)
    }
    function findFailureTable(temp) {
        //failure table
        let ft = []
        let i = 0, j = 1;
        ft[0] = 0
        while (j < temp.length) {
            if (temp.charAt(i) === temp.charAt(j)) {
                ft[j] = i + 1
                i++
                j++
            } else {//two elements are different 
                if (i === 0) {
                    ft[j] = 0
                    j++
                } else {
                    i--
                }
            }
        }
        return ft
    }
    function find() {
        //temporarily set T as ealeasealle

        //temporarily use the e~~lle. for text.
       

        let ft = findFailureTable(pattern)
        let shift = 0
        //shift는 pattern이 얼마나 우측으로 이동되어있는지를 알려주자..
        //i-sfhit로 ft[]에 access하자.
        setProgressPatternkmp(t, pattern, ft, shift) //the second paramter should be pattern
        let matched = []
        for (let i = 0; i < t.length; i++) {
            if (t[i] !== pattern[i - shift]) {
                if (i - shift === 0) {
                    setProgressPatternkmp(t, pattern, ft, shift, i)
                    shift = i + 1
                    // if(shift+pattern.length > t.length){
                    //     break;
                    // }
                } else {
                    setProgressPatternkmp(t, pattern, ft, shift, i, false)
                    let target = ft[i - shift - 1]
                    shift = i - target
                    //shift: where the pattern is aligned
                    //target: how many elements are already equal. so that we can move forward by target.
                    // -1: because i will be increased by one 
                    i = shift + target - 1
                    // if(shift+pattern.length > t.length){
                    //     break;
                    // }
                }
            } else {
                setProgressPatternkmp(t, pattern, ft, shift, i)
                if (i - shift === ft.length - 1) {//the pattern is matched fully.
                    matched.push(i-pattern.length+1)
                    setProgressPatternkmp(t, pattern, ft, shift, i, true)
                    let target = ft[i - shift]
                    shift += ft.length - ft[i - shift]
                    i = shift - 1 + target

                   
                }
            }
            if(shift+pattern.length > t.length){
                break;
            }

        }

        setProgressPattern2(t, pattern, matched)
        
        setT()
        setP()

        setProgress(setPattern)
    }

    function clear() {
        emptyProgressList()
        setT('')
        setP('')
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

                KMP
                <Progress />
            </span>
            <hr />

        </div>
    )
}
export default KnuthMorrisPratt