import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, setProgressAVL, handleKeyDown } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { queue } from './lib/queue';

export let avls = {
    component: <AVLs />,
    description: "AVL trees are binary search trees in which the difference between the left and right subtrees of any node is less than or equal to one. Adelson, Velskii, and Landi developed the technique of balancing binary trees' height, which is why it is called an AVL tree or a balanced binary tree.",
    //description2:" AVL은 BST와 마찬가지로 모든 노드의 왼쪽 자식들은 그 노드보다 작고 오른쪽 자식들은 그 노드보다 크다. 추가적으로 Balance factor와 height가 있는데, height는 노드의 자식 중 가장 높은 height값을 가진 자식의 height + 1이고 balance facotr은 왼쪽.height - 오른쪽.height이다. 이 값이 2또는 -2로 되었을 경우, tree가 불균형하다는 뜻으로, 새롭게 균형을 맞춰준다. 이 때, 특정 자식의 balance factor가 1 또는 -1일 경우, left-right rotation 또는 right-left rotation을 할 수도 있다. 자식이 undefine일 경우 height값은 -1로 한다.",
    description2:"The idea is that whenever you’re adding or removing a data item, you check to see if the other nodes are balanced; if they’re not balanced, then you make rotations to balance the tree. AVL trees are just balanced BSTs; in other words, all AVL trees are also BSTs, but not all BSTs are AVL trees. In AVL trees, to balance a tree after adding or removing something, one or more rotations are done.",
    links: ["https://www.geeksforgeeks.org/avl-tree-set-1-insertion/", "https://www.tutorialspoint.com/data_structures_algorithms/avl_tree_algorithm.htm"],

}

function AVLs() {

    const [addValue, setAddValue] = useState()


    const [AVL, setAVL] = useState({
        root: undefined
    })




    function setProgress(avl) {
        setProgressAVL(avl)
        setAddValue()
        setAVL(avl)

    }

    function getHeight(curr) {
        if (curr === undefined) {
            return -1
        } else {
            return curr.height
        }
    }

    function getBF(curr) {
        if (curr === undefined) {
            return -1
        } else {
            return curr.balanceFactor
        }
    }

    //return max height
    function getMax(a, b) {
        if (a === undefined && b === undefined) {
            return -1
        } else if (a === undefined && b !== undefined) {
            return b.height
        } else if (a !== undefined && b === undefined) {
            return a.height
        } else {
            //both of children are not undefined.
            return (a.height > b.height) ? a.height : b.height
        }
    }
    function setNewHeightAndBF(curr) {
        curr.height = getMax(curr.left, curr.right) + 1

        curr.balanceFactor = getHeight(curr.left) - getHeight(curr.right)
    }
    function put() {
        if (addValue !== undefined) {
            let newNode = {
                left: undefined,
                right: undefined,
                value: parseInt(addValue),
                height: 0,
                balanceFactor: 0
            }
            let newAVL = AVL;
            if (AVL.root == undefined) {
                // bst was empty
                newAVL.root = newNode
            } else {
                newAVL.root = putHelper(newAVL.root, newNode)
                //setNewHeightAndBF(newAVL.root)
                // makeBalanceTree(newAVL.root)
            }
            setProgress(newAVL)
        }
    }

    function putHelper(curr, newNode) {

        if (newNode.value > curr.value) {
            if (curr.right === undefined) {
                curr.right = newNode
            } else {
                curr.right = putHelper(curr.right, newNode)
                // setNewHeightAndBF(curr.right)
            }
        } else {     //new node value <= curr value
            if (curr.left === undefined) {
                curr.left = newNode
            } else {
                curr.left = putHelper(curr.left, newNode)
                // setNewHeightAndBF(curr.left)

            }
        }


        curr = makeBalanceTree(curr)

        return curr

    }
    function makeBalanceTree(curr) {
        setNewHeightAndBF(curr)
        if (curr.balanceFactor === 2) {
            if (curr.left !== undefined && curr.left.balanceFactor === -1) {
                //left right rotation
                // console.log('LRR target', curr.value)
                curr.left = rotateLeft(curr.left)
                curr = rotateRight(curr)
            } else {
                //right rotation
                // console.log('RR target', curr.value)
                curr = rotateRight(curr)
            }
        } else if (curr.balanceFactor === -2) {
            if (curr.right !== undefined && curr.right.balanceFactor === 1) {
                //right left roatiton
                // console.log('RLR target', curr.value)
                curr.right = rotateRight(curr.right)
                curr = rotateLeft(curr)
            } else {
                //left rotation
                // console.log('LR target', curr.value)
                curr = rotateLeft(curr)
            }
        }
        return curr
    }

    function rotateRight(curr) {
        let copy = curr.left
        curr.left = curr.left.right
        copy.right = curr
        setNewHeightAndBF(copy.right)
        setNewHeightAndBF(copy)
        return copy
    }
    function rotateLeft(curr) {
        let copy = curr.right
        curr.right = curr.right.left
        copy.left = curr
        setNewHeightAndBF(copy.left)
        setNewHeightAndBF(copy)
        return copy
    }
    function remove() {
        if (addValue !== undefined) {
            //doesn't need to code like this, but i just did it..
            let newAVL = AVL
            newAVL.root = removeHelper(newAVL.root, parseInt(addValue))
            //??해야할까?    setNewHeightAndBF(newAVL.root)
            setProgress(newAVL)
        }

    }
    function removeHelper(avl, target) {
        if (avl.value > target && avl.left !== undefined) {
            avl.left = removeHelper(avl.left, target)

            // return avl
        } else if (avl.value < target && avl.right !== undefined) {
            avl.right = removeHelper(avl.right, target)
            //  return avl
        } else if (avl.value === target) { //find target value
            if (avl.left === undefined && avl.right === undefined) {
                return undefined
            } else if (avl.left !== undefined && avl.right !== undefined) {
                let copy = avl
                let replace = findSuccessor(avl.right)
                replace.left = copy.left
                if (replace.value != copy.right.value) {
                    replace.right = copy.right
                }
                replace = makeBalanceTree(replace)
                return replace

            } else if (avl.left !== undefined) {
                return avl.left
            } else {//bst.right !=undefined
                return avl.right
            }
        } else {//not found
            return avl
        }
        avl = makeBalanceTree(avl)
        return avl
    }
    //
    function findSuccessor(avl) {
        if (avl.left === undefined) {
            return avl
        } else if (avl.left !== undefined) {
            if (avl.left.left === undefined && avl.left.right !== undefined) {
                let copy = avl.left
                avl.left = avl.left.right
                makeBalanceTree(avl)
                return copy
            } else if (avl.left.left !== undefined) { //right is undefined
                makeBalanceTree(avl)
                return findSuccessor(avl.left)
            } else { //left and right are undefined
                let copy = avl.left
                avl.left = undefined

                makeBalanceTree(avl)
                return copy
            }
        }
    }
    function clear() {
        let newAVL = {
            root: undefined
        }
        queue.clear()

        emptyProgressList()
        setProgress(newAVL)
    }


    return (
        <div>
            <div className={styles.methodBox}>


                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Add/Remove</div>
                    <div className={styles.methodButton} >

                        <Input placeholder='value' className='input' value={addValue}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, put, setAddValue) }
                            }}
                            onChange={e => { setAddValue(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={put}>add</Button>
                        <Button type="primary" onClick={remove}>remove</Button>
                    </div>
                </div>


            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>

                AVL
                <span style={{color:'red', marginLeft:'10px'}}>Height</span><span style={{color:'blue', marginLeft:'10px'}}>Balance Factor</span>
                <Progress />
            </span>
        </div>
    )
}
export default AVLs