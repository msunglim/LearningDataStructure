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
   // description2:"DFS는 시작 vertex와 그 이웃 vertex를 stack 안에 넣는다. stack에 넣었으면 그 넣은 vertex를 방문하고 stack에서 제거한다음 그 이웃을 찾는다. 이것을 recursively 수행하고 다 찾았으면 다시 원래지점의 이웃을 stack에 넣고 앞의 과정을 반복한다.  ",
    description2: "Problem Find a natural way to systematically visit every vertex and every edge of a graph : 1. Start from one vertex 2. Move forward all along one path (do not pass through a vertex already visited) 3.When stuck, turn back until you can step forward to an unvisited vertex 4.DFS finds some path from source vertex v to target vertex u.",
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