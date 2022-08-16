import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, handleKeyDown, setProgressGraphBFSDFS } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { Queue, queue } from './lib/queue';


import { drawGraph, getGraph, Graph_direct, refreshGraph } from './lib/graph';

export let bfs = {
    component: <BFS />,
    description: "Breadth-first search is an algorithm for searching a tree data structure for a node that satisfies a given property. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. ",
    //description2:"BFS는 시작 vertex의 이웃들을 Queue에 넣고 Queue가 다 소진될때까지 pop하면서 계속 이웃을 찾는다. 방문한 순서는 queue에 들어간 순이다.  ",
    description2:"The Breadth-First Search algorithm is quite the same algorithm as the iterative DFS, you simply replace the stack with a queue BFS is classic method to find a path with the fewest nodes from source vertex v to target vertex u.",
    links: ["https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", "https://www.tutorialspoint.com/data_structures_algorithms/breadth_first_traversal.htm"],

}

function BFS() {
    const [vertexValue, setVertexValue] = useState()
    const [graph, setGraph] = useState()

    function search() {

        // setProgressGraph()
        let graph = getGraph()
        let vlist = graph.getVertices()
        let elist = graph.getEdges()
        let adjlist = graph.getAdj()

        let curr = graph.getVertex(vertexValue)
        let queue = new Queue()
        queue.push(curr)
        setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, curr,),
            queue.getQueue(), queue.getArray(), true)
        // setProgressGraphBFS(drawGraph(vlist, elist, adjlist, true), )

        while (!queue.isEmpty()) {
            curr = queue.pop()
            curr.setVisited(true)
            setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, curr,),
                queue.getQueue(), queue.getArray(), true)

            for (let edge of elist) {

                if (edge.getU() === curr && !edge.getV().getVisited()) {
                    let neighbor = edge.getV()
                    queue.push(neighbor)
                    setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, curr, neighbor),
                        queue.getQueue(), queue.getArray(), true)
                }
            }
        }
        setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, curr, curr),
        queue.getQueue(), queue.getArray(), true)
        setVertexValue('')
        setGraph(graph)

    }
    function refresh() {
        setGraph(getGraph())
        setVertexValue(vertexValue === '' ? ' ' : '')
        refreshGraph()
    }

    function clear() {
        queue.clear()
        emptyProgressList()
        setVertexValue(vertexValue === '' ? ' ' : '')
        refreshGraph(true)
    }



    return (

        <div>
            <div className={styles.methodBox}>
                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Search/Refresh</div>
                    <div className={styles.methodButton} >
                        <Input placeholder='start V' className='input' value={vertexValue}
                            onKeyDown={e => {
                                if (e.target.value.replaceAll(' ', '') !== '') { handleKeyDown(e, search, setVertexValue) }
                            }}
                            onChange={e => { setVertexValue(e.target.value) }} style={{ width: '75px' }} />
                        <Button type="primary" onClick={search}>search</Button>
                        <Button type="primary" onClick={refresh}>refresh</Button>
                    </div>
                </div>

            </div>
            <Button style={{ margin: '10px' }} type="primary" onClick={clear}>Clear</Button>
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>
                BFS

                <Progress />
                <Graph_direct />
            </span>
        </div>
    )
}
export default BFS