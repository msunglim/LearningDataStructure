import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, handleKeyDown, setProgressKruskal } from './progress/Progress';
import styles from './algorithmCSS.module.css'
import { Queue, queue } from './lib/queue';


import { drawGraph, getGraph, Graph_undirect, refreshGraph } from './lib/graph';
import { PriorityQueue, PriorityQueueDijkstra, PriorityQueueKruskals } from './lib/priorityQueue';
import { vertexDistance } from './lib/vertexDistance';
import { HashTable } from './lib/hashtable';
import { DisjointSet } from './lib/DisjointSet';
import { findDOMNode } from 'react-dom';
export let kruskal = {
    component: <Kruskal />,
    description: "Kruskal's algorithm finds a minimum spanning forest of an undirected edge-weighted graph. If the graph is connected, it finds a minimum spanning tree. It is a greedy algorithm in graph theory as in each step it adds the next lowest-weight edge that will not form a cycle to the minimum spanning forest.",
    links: ["https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", "https://www.tutorialspoint.com/data_structures_algorithms/kruskals_spanning_tree_algorithm.htm"],

}

function Kruskal() {

    const [graph, setGraph] = useState()

    function search() {
        // setProgressGraph()
        let graph = getGraph()
        let vlist = graph.getVertices()
        let elist = graph.getEdges()
        let adjlist = graph.getAdj()

        let ds = new DisjointSet(vlist)
        let pq = new PriorityQueueKruskals(elist)

        
        let mst = []
        while (mst.length < elist.length && !pq.isEmpty()) {
            setProgressKruskal(drawGraph(vlist, elist, adjlist, false), pq)
            let curr = pq.remove()
            let u = curr.getU()
            let v = curr.getV()
            if (ds.find(u) !== ds.find(v)) {
                curr.setVisited(true)
                mst.push(curr)
                ds.union(u, v)
                
            }
        
        }
        setProgressKruskal(drawGraph(vlist, elist, adjlist, false), pq)

        setGraph(graph)
    }

    function refresh() {
        setGraph(getGraph())
        emptyProgressList()

        refreshGraph()
    }



    return (

        <div>
            <div className={styles.methodBox}>
                <div className={styles.methodElement} >
                    <div className={styles.methodName}>Search/Refresh</div>
                    <div className={styles.methodButton} >

                        <Button type="primary" onClick={search}>search</Button>

                        <Button type="primary" onClick={refresh}>refresh</Button>
                    </div>
                </div>

            </div>
          
            <hr />

            <span style={{ fontSize: '30px', height: '120px', WebkitBoxAlign: 'center' }}>
                Kruskal

                <Progress />
                <Graph_undirect />
            </span>
        </div>
    )
}
export default Kruskal