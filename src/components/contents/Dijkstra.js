import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, handleKeyDown, setProgressGraphBFSDFS, setProgressDijkstra } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { Queue, queue } from './lib/queue';


import { drawGraph, getGraph, Graph_direct, refreshGraph } from './lib/graph';
import { PriorityQueue, PriorityQueueDijkstra } from './lib/priorityQueue';
import { vertexDistance } from './lib/vertexDistance';
import { HashTable } from './lib/hashtable';
export let dijkstra = {
    component: <Dijkstra />,
    description: "Dijkstra's algorithm (/ˈdaɪkstrəz/ DYKE-strəz) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later. ",
    //description2:"Dijkstra는 distance map과 priority queue를 사용한다. distance map에는 모든 vertex와의 거리를 무한대로 둔다. 시작 vertex가 정해지면 그것을 priority queue에 넣는다. 그리고 distance map에서 해당 vertex까지의 거리는 0으로둔다. priority queue에 현재 vertex의 이웃들을 모두넣고 distance map에 있는 현재 vertex까지의 거리 + 이웃까지의 거리를 distance map에 있는 이웃 vertex의 distance로 설정해준다. priority queue에선 거리가 작은 순대로 pop하여 이 과정을 priority queue가 모두 소진되거나 모든 vertex를 방문할 때까지 반복한다.",
    description2:"Find the shortest path for weighted directional graphs: 1.Start from one vertex, choose stop vertex 2. Move forward all along shortest path (do not pass through a vertex already visited) using BFS 3. Keep track of the distance of the path as compared to other paths. 4.If you do not reach stop vertex, the path is disregarded",
    links: ["https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", "https://www.tutorialspoint.com/dijkstra-s-algorithm-to-compute-the-shortest-path-through-a-graph"],

}

function Dijkstra() {
    const [vertexValue, setVertexValue] = useState()
    const [graph, setGraph] = useState()

    function search() {
        // setProgressGraph()
        let graph = getGraph()
        let vlist = graph.getVertices()
        let elist = graph.getEdges()
        let adjlist = graph.getAdj()

        //starting vertex
        let curr = graph.getVertex(vertexValue)

        let distanceMap = new HashTable()
        for (let i = 0; i < vlist.length; i++) {
            distanceMap.add(vlist[i], Number.POSITIVE_INFINITY)
        }
        let pq = new PriorityQueueDijkstra()
        // console.log('what is dm', distanceMap)
        setProgressDijkstra(drawGraph(vlist, elist, adjlist, true,), pq, distanceMap)
        
        let visited = new HashTable()
        pq.add(new vertexDistance(curr, 0))
        setProgressDijkstra(drawGraph(vlist, elist, adjlist, true, curr), pq, distanceMap)
        while (!pq.isEmpty() && visited.size !== vlist.length) {
            curr = pq.remove()
            if (!curr.getVertex().getVisited()) {
                visited.add(curr.getVertex())
                curr.getVertex().setVisited(true)
                //starting vertex
                let v = curr.getVertex()
                let d = curr.getDistance()
                distanceMap.add(v, d)
                setProgressDijkstra(drawGraph(vlist, elist, adjlist, true, curr.getVertex(),), pq, distanceMap)
                let adj = adjlist.getValue(v)
                for (let i = 0; i < adj.length(); i++) {
                    let next = adj.get(i)
                    pq.add(new vertexDistance(next.getVertex(), d + next.getDistance()))
                    setProgressDijkstra(drawGraph(vlist, elist, adjlist, true, curr.getVertex(), next.getVertex()), pq, distanceMap)
                }
            }
        }
        setProgressDijkstra(drawGraph(vlist, elist, adjlist, true, curr,), pq, distanceMap)

        setVertexValue('')
    }

    function refresh() {
        setGraph(getGraph())
        setVertexValue(vertexValue === '' ? ' ' : '')
        emptyProgressList()

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
                        <Input placeholder='start v' className='input' value={vertexValue}
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
                Dijkstra

                <Progress />
                <Graph_direct />
            </span>
        </div>
    )
}
export default Dijkstra