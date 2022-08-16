import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, setProgressBST, handleKeyDown } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { queue } from './lib/queue';




export let binary_search_tree = {
    component: <BinarySearchTrees />,
    description: "In computer science, a binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.",
    // description2:" BST는 노드의 왼쪽 자식들은 그 노드보다 작은 값들로 이루어져 있고, 오른쪽 자식들은 그 노드보다 큰 값들로 이루어져있다. remove시 여기서는 Predecessor를 찾아 그 자리를 대체하게 하는데, Predessor은 삭제당할 노드의 왼쪽 child의 가장 오른쪽 child를 의미한다.",
    description2:"A binary tree is a tree where each node has at most two children (a left and right child) that are an ordered pair. A binary tree is a tree containing a single node, or a tree whose root has an ordered pair of children that are hemselves binary trees. Applications are arithmetic expressions, decision processes, searching.",
    links: ["https://www.geeksforgeeks.org/binary-search-tree-data-structure/", "https://www.tutorialspoint.com/data_structures_algorithms/binary_search_tree.htm"],

}

function BinarySearchTrees() {

    const [addValue, setAddValue] = useState()


    const [BST, setBST] = useState({
        root: undefined
    })

    const [order, setOrder] = useState([])


    function setProgress(bst) {
        setProgressBST(bst)
        setAddValue()
        setBST(bst)

    }


    function put() {
        if (addValue !== undefined) {
            let newNode = {
                left: undefined,
                right: undefined,
                value: parseInt(addValue)
            }
            let newBST = BST;
            if (BST.root == undefined) {
                // bst was empty
                newBST.root = newNode
            } else {
                putHelper(newBST.root, newNode)

            }
            setProgress(newBST)
        }


    }
    function putHelper(curr, newNode) {

        if (newNode.value > curr.value) {
            if (curr.right === undefined) {
                curr.right = newNode
            } else {
                putHelper(curr.right, newNode)
            }
        } else {     //new node value <= bst root value
            if (curr.left === undefined) {
                curr.left = newNode
            } else {
                putHelper(curr.left, newNode)
            }
        }
    }
    function remove() {
        if (addValue !== undefined) {
            //doesn't need to code like this, but i just did it..
            let newBST = BST
            newBST.root = removeHelper(newBST.root, parseInt(addValue))
            setProgress(newBST)
        }

    }
    function removeHelper(bst, target) {
        if (bst.value > target && bst.left !== undefined) {
            bst.left = removeHelper(bst.left, target)
            return bst
        } else if (bst.value < target && bst.right !== undefined) {
            bst.right = removeHelper(bst.right, target)
            return bst
        } else if (bst.value === target) { //find target value
            if (bst.left === undefined && bst.right === undefined) {
                return undefined
            } else if (bst.left !== undefined && bst.right !== undefined) {
                let copy = bst

                let replace = findPredecessor(bst.left)
                replace.right = copy.right
                if (replace.value != copy.left.value) {
                    replace.left = copy.left
                }

                return replace

            } else if (bst.left !== undefined) {
                return bst.left
            } else {//bst.right !=undefined
                return bst.right
            }
        } else {//not found
            return bst
        }
    }
    function findPredecessor(bst) {
        if (bst.right === undefined) {
            return bst
        } else if (bst.right !== undefined) {
            if (bst.right.right === undefined && bst.right.left !== undefined) {
                let copy = bst.right
                bst.right = bst.right.left
                return copy
            } else if (bst.right.right !== undefined) { //left is undefined

                return findPredecessor(bst.right)
            } else { //left and right are undefined
                let copy = bst.right
                bst.right = undefined
                return copy
            }
        }
    }
    function clear() {
        let newBST = {
            root: undefined
        }
        queue.clear()
        setOrder([])
        emptyProgressList()
        setProgress(newBST)
    }

    function preorder(curr) {
        if (curr !== undefined) {

            let newOrder = [curr.value]

            let left = preorder(curr.left)
            let right = preorder(curr.right)
            if (left.length != 0) {
                left.map((element, i) => {
                    newOrder.push(element)
                })

            }
            if (right.length != 0) {
                right.map((element, i) => {
                    newOrder.push(element)
                })


            }
            setOrder(newOrder)

            return newOrder
        } else {
            return []
        }

    }
    function inorder(curr) {
        if (curr !== undefined) {

            let left = inorder(curr.left)
            let newOrder = [];
            if (left.length != 0) {

                left.map((element, i) => {
                    newOrder.push(element)
                })
                newOrder.push([curr.value])
            } else {
                newOrder = [curr.value]
            }
            let right = inorder(curr.right)
            if (right.length != 0) {
                right.map((element, i) => {
                    newOrder.push(element)
                })
            }
            setOrder(newOrder)
            return newOrder
        } else {
            return []
        }

    }
    function postorder(curr) {
        if (curr !== undefined) {

            let newOrder = []
            let left = postorder(curr.left)
            if (left.length != 0) {

                left.map((element, i) => {
                    newOrder.push(element)
                })

            }
            let right = postorder(curr.right)
            if (right.length != 0) {
                right.map((element, i) => {
                    newOrder.push(element)
                })
            }

            newOrder.push([curr.value])
            setOrder(newOrder)

            return newOrder
        } else {
            return []
        }

    }
    function GetOrders() {
        let ord = order.map((element, i) => (
            <span>
                {i !== order.length - 1 &&
                    <span key={i}>{element} ,</span>
                }
                {i === order.length - 1 &&
                    <span key={i}>{element}</span>
                }
            </span>
        ))
        return (
            <span>
                {ord}
            </span>
        )
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

                <div className={styles.methodElement}>
                    <div className={styles.methodName}>Order</div>
                    <div className={styles.methodButton} >

                        <Button type="primary" onClick={e => { preorder(BST.root) }}>preorder</Button>
                        <Button type="primary" onClick={e => { inorder(BST.root) }}>inorder</Button>
                        <Button type="primary" onClick={e => { postorder(BST.root) }}>postorder</Button>
                    </div>
                </div>

            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>

                BinarySearchTrees
                <div>
                    Order: {<GetOrders />}
                </div>
                <Progress />
            </span>
        </div>
    )
}
export default BinarySearchTrees