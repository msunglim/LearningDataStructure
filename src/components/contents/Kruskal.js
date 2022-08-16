import { Input, Button } from 'antd';
import { useState } from 'react';
import { emptyProgressList, Progress, handleKeyDown, setProgressKruskal } from './progress/Progress';
import styles from './algorithmCSS.module.css'

import { drawGraph, getGraph, Graph_undirect, refreshGraph } from './lib/graph';
import { PriorityQueue, PriorityQueueDijkstra, PriorityQueueKruskals } from './lib/priorityQueue';

import { DisjointSet } from './lib/DisjointSet';

export let kruskal = {
    component: <Kruskal />,
    description: "Kruskal's algorithm finds a minimum spanning forest of an undirected edge-weighted graph. If the graph is connected, it finds a minimum spanning tree. It is a greedy algorithm in graph theory as in each step it adds the next lowest-weight edge that will not form a cycle to the minimum spanning forest. ",
    //description2:"Kruskal은 priority queue를 사용하여 minimum spanning tree를 찾는다. edge의 크기대로 priority queue에 넣고 하나씩 pop하여 vertex간의 cycle이 발생하지않는 선에서 minimum spanning tree를 만든다. vertex를 이미 방문했는지를 추적하기위하여 disjointSet을 사용하는데, 이것은 edge가 추가될 수록 vertex끼리 조합을 이루는 것이다. 새로운 조합과 기존 조합을 합치면서 minimum spanning tree를 만들어간다. 더 자세하게 설명하자면, vertex간에 서열을 만들어 새로운 조합끼리 합쳐질 경우 서로의 최고서열을 비교하여 같을 경우 이것은 cycle을 만든다는 의미이므로 합치지않고, 다를 경우에만 두 조합을 합친뒤 다시 서열을 매긴다. priority queue가 모두 pop되거나 minimum spanning tree의 edge수가 기존 edge수와 비등해졌을때 종료한다.",
    description2: "Kruskal algorithms uses minimum spanning tree to find the shortest path. A minimum spanning tree (MST) of an edge-weighted graph is a spanning tree that connects all vertices in G and has a minimum total weight Concept: Let V be any subset of the vertices of G, and let edge e be the smallest edge connecting V to G-V. Then e is part of the minimum spanning tree.",
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
            
            // let index = 1
            // let e = pq.array[index]
            // console.group()
            // while(e!==undefined){
            //    console.log('u', e.getU().getValue(),'v',e.getV().getValue(),'w', e.getWeight())
            //     index ++
            //     e = pq.array[index]
            // }

            let curr = pq.remove()
            let u = curr.getU()
            let v = curr.getV()
            // console.log('pq', pq.array,'u:', u.getValue(), 'v:', v.getValue())
            // console.groupEnd()
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