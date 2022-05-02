import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, handleKeyDown, setProgressGraphBFSDFS } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { Queue, queue } from './lib/queue';


import { drawGraph, getGraph, Graph_direct, refreshGraph } from './lib/graph';
import { Stack } from './lib/stack';

export let dfs = {
    component: <DFS />,
    description: "Depth-first search is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. ",

    links: ["https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/", "https://www.tutorialspoint.com/data_structures_algorithms/depth_first_traversal.htm"],

}

function DFS() {
    const [vertexValue, setVertexValue] = useState()
    const [graph, setGraph] = useState()

    function search() {

        // setProgressGraph()
        let graph = getGraph()
        let vlist = graph.getVertices()
        let elist = graph.getEdges()
        let adjlist = graph.getAdj()

        let curr = graph.getVertex(vertexValue)
        let stack = new Stack()

        let output = []
        dfs(vlist, elist, adjlist, curr, stack, output)

        setVertexValue('')
        setGraph(graph)
    }
    function dfs(vlist, elist, adjlist, curr, stack, output) {
        if (curr === undefined) {
            return
        }
        curr.setVisited(true)
        stack.push(curr)
        output.push(curr)
        setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, curr,),
            stack.getStack(), output, false)
        for (let edge of elist) {
            if (curr === edge.getU() && !edge.getV().getVisited()) {
                setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, curr, edge.getV()),
                    stack.getStack(), output, false)
                dfs(vlist, elist, adjlist, edge.getV(), stack, output)
            }
        }
        stack.pop()
        setProgressGraphBFSDFS(drawGraph(vlist, elist, adjlist, true, undefined,),
            stack.getStack(), output, false)

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
                DFS

                <Progress />
                <Graph_direct />
            </span>
        </div>
    )
}
export default DFS