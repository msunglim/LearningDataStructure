import styles from '../algorithmCSS.module.css'
import Svg, { Line, Rect, Text, TSpan, Circle, Defs, Marker, Path } from 'react-native-svg'
import { vertexDistance } from './vertexDistance';
import { edge } from './edge';
import { vertex } from './vertex';
import { HashTable } from './hashtable';
import { ArrayList } from './arrayList';

let g;
export function getGraph() {
    refreshGraph(true)
    return g
}
//if isDirect, show marker at the end of edge.
//curr: currently visited vertex
//neighbor: curr's neighbor connected by an edge.
function Vertex(vertex_arr , vlist, curr ,neighbor){
    let xList = [75, 225, 34, 150, 260]
    let yList = [60, 120, 180, 240, 300]
    let x_curr = 0
    let y_curr = 0
    let layer = 0
    let layer_element = 0
    for (let i = 0; i < vlist.length; i++) {
        let stroke = (vlist[i].getVisited()) ? 'green' : (vlist[i] === curr) ? 'purple' : ((vlist[i] === neighbor) ? 'grey' : '')
        let strokeWidth = (stroke !== '') ? '5' : '0'
        let fill = (vlist[i].getVisited()) ? 'green' : (stroke === 'purple') ? 'red' : ((stroke === 'grey') ? 'aliceblue' : 'pink')
        vertex_arr.push(
            <Svg>
                <Circle stroke={stroke} strokeWidth={strokeWidth} cx={xList[x_curr % 5]} cy={yList[y_curr]} r="15" fill={fill} />
                <Text>
                    <TSpan
                        fontSize="20"
                        fontWeight="bold"
                        x={xList[x_curr % 5] - 5}
                        y={yList[y_curr] + 5}
                    >
                        {vlist[i].getValue()}
                    </TSpan>
                </Text>

            </Svg>
        )
        vlist[i].setX(xList[x_curr % 5])
        vlist[i].setY(yList[y_curr])
        x_curr++
        layer_element++
        if ((layer % 2 === 0 && layer_element % 2 === 0) || (layer % 2 !== 0 && layer_element % 3 === 0)) {
            //layer%2는 그냥 짝/홀층을 의미할뿐 거기에 몇개의 element가 드가는진 관계x
            //1개만들어가야하는 층에, 1개가 들어갔다는 뜻
            //2개가 들어가야하는 층에, 2개가 들어갔따는뜻
            //그럼 다음층으로! layer_element는 초기화.
            y_curr++
            layer++
            layer_element = 0
        }
    }
    return vertex_arr
}

function Edge(edge_arr, elist, isDirected){
    
    for (let j = 0; j < elist.length; j++) {
        //if direct, destination is little bit away from the location of destination vertice to avoid the arrow marker is hidden.
        let destinationX = (isDirected) ? elist[j].getU().getX() + (elist[j].getV().getX() - elist[j].getU().getX()) * 0.75 : elist[j].getV().getX()
        let destinationY = (isDirected) ? elist[j].getU().getY() + (elist[j].getV().getY() - elist[j].getU().getY()) * 0.75 : elist[j].getV().getY()
        let stroke = (elist[j].getVisited())? 'red' : 'black'
        let strokeWidth = (elist[j].getVisited())? '4' : '2'
        edge_arr.push(
            <Svg>
                {isDirected &&
                    <Defs>
                        <Marker
                            id="Triangle"
                            viewBox="0 0 10 10"
                            refX="0"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="10"
                            markerHeight="10"
                            orient="auto"
                        >
                            <Path d="M 0 0 L 10 5 L 0 10 z" />
                        </Marker>
                    </Defs>
                }
                <Line
                    x1={elist[j].getU().getX()}
                    y1={elist[j].getU().getY()}
                    x2={destinationX}
                    y2={destinationY}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    markerEnd='url(#Triangle)'
                >
                </Line>
                <Text>
                    <TSpan
                        fontSize="25"
                        fontWeight="bold"
                        fill='red'
                        x={(elist[j].getU().getX() + elist[j].getV().getX()) / 2}
                        y={(elist[j].getU().getY() + elist[j].getV().getY()) / 2}
                    >
                        {elist[j].getWeight()}
                    </TSpan>
                </Text>
            </Svg>
        )
    }
    return edge_arr
}
export function drawGraph(vlist, elist, adjlist, isDirected, curr, neighbor) {

    let vertex_arr = Vertex([] , vlist, curr, neighbor)
    let edge_arr = Edge([], elist, isDirected)
   
    return (

        <Svg height='300' width='300'>
            {/* background */}
            <Rect
                x="0"
                y="0"
                width="300"
                height="300"
                fill="rgb(235,235,235)"
                strokeWidth="3"
                stroke="rgb(0,0,0)"
            >
            </Rect>
            {edge_arr}
            {vertex_arr}
        </Svg>
    )
}


let vlist
let elist
let adjlist

//dontchange graph = clear method
export function refreshGraph(dontChangeGraph) {
    smallGraph = (dontChangeGraph) ? smallGraph : !smallGraph
    if (smallGraph) {
        let v0 = new vertex('A')
        let v1 = new vertex('B')
        let v2 = new vertex('C')
        let v3 = new vertex('D')
        let v4 = new vertex('E')
        let v5 = new vertex('F')
        let v6 = new vertex('G')
        let v7 = new vertex('H')
        let e0 = new edge(v0, v1, 5)
        let e1 = new edge(v0, v2, 7)
        let e2 = new edge(v2, v3, 6)
        let e3 = new edge(v0, v4, 2)
        let e4 = new edge(v2, v5, 9)
        let e5 = new edge(v5, v6, 3)
        let e6 = new edge(v6, v7, 4)
        let e7 = new edge(v0, v3, 1)
        vlist = [v0, v1, v2, v3, v4, v5, v6, v7]
        elist = [e0, e1, e2, e3, e4, e5, e6,e7]

        // let v0 = new vertex(0)
        // let v1 = new vertex(1)
        // let v2 = new vertex(2)
        // let v3 = new vertex(3)
        // let v4 = new vertex(4)

        // let e0 = new edge(v0,v1, 10)
        // let e1 = new edge(v0,v2, 3)
        // let e2 = new edge(v1,v2,1)
        // let e3 = new edge(v1,v3,2)
        // let e4 = new edge(v2,v3,8)
        // let e5 = new edge(v2,v4, 2)
        // let e6 = new edge(v2,v1,4)
        // let e7 = new edge(v3,v4,7)
        // let e8 = new edge(v4, v3, 9)
        // vlist = [v0,v1,v2,v3,v4]
        // elist  = [e0,e1,e2,e3,e4,e5,e6,e7,e8]
    } else {
        let v0 = new vertex('A')
        let v1 = new vertex('B')
        let v2 = new vertex('C')
        let v3 = new vertex('D')
        let v4 = new vertex('E')
        let v5 = new vertex('F')
        let v6 = new vertex('G')
        let v7 = new vertex('H')
        let v8 = new vertex('I')
        let v9 = new vertex('J')
        

        let e0 = new edge(v0, v4, 5)
        let e1 = new edge(v0, v1, 7)
        let e2 = new edge(v2, v3, 2)
        let e3 = new edge(v3, v5, 2)
        let e4 = new edge(v4, v6, 9)
        let e5 = new edge(v5, v6, 3)
        let e6 = new edge(v5, v7, 4)
        let e7 = new edge(v7, v8, 1)
        let e8 = new edge(v6, v9, 12)
        let e9 = new edge(v2, v7, 12)
        let e10 = new edge(v1, v4, 3)
        let e11 = new edge(v6, v8, 7)
        vlist = [v0, v1, v2, v3, v4, v5, v6, v7, v8, v9]
        elist = [e0, e1, e2, e3, e4, e5, e6, e7, e8, e9,e10,e11]
    }

    adjlist = new HashTable()
    // let vd1 = new vertexDistance(v2, 5)
    // let vd2 = new vertexDistance(v3, 7)
    for (let v of vlist) {
        adjlist.add(v, new ArrayList())
    }
    for (let e of elist) {
        //if starting vertex exists in adjlist
        if (adjlist.getIndexOfKey(e.getU()) !== -1) {
            //    adjlist.add(e.getU(), new vertexDistance(e.getV(), e.getWeight()))
            adjlist.getValue(e.getU()).add(new vertexDistance(e.getV(), e.getWeight()))
        }

    }
    // // console.log(adjlist)
    // function graph(vlist, elist, adjlist) {
    //     this.vertices = vlist
    //     this.edges = elist
    //     this.adj = adjlist

    //     this.getVertices = function () {
    //         return this.vertices
    //     }
    //     this.getEdges = function () {
    //         return this.edges
    //     }
    //     this.getAdj = function () {
    //         return this.adj
    //     }
    // }

    g = new graph(vlist, elist, adjlist)
}
//initial graph setting 
let smallGraph = true
let v0 = new vertex('A')
let v1 = new vertex('B')
let v2 = new vertex('C')
let v3 = new vertex('D')
let v4 = new vertex('E')
let v5 = new vertex('F')
let v6 = new vertex('G')
let v7 = new vertex('H')
let e0 = new edge(v0, v1, 5)
let e1 = new edge(v0, v2, 7)
let e2 = new edge(v2, v3, 6)
let e3 = new edge(v0, v4, 2)
let e4 = new edge(v2, v5, 9)
let e5 = new edge(v5, v6, 3)
let e6 = new edge(v6, v7, 4)
let e7 = new edge(v0, v3, 1)
vlist = [v0, v1, v2, v3, v4, v5, v6, v7]
elist = [e0, e1, e2, e3, e4, e5, e6,e7]
//  let v0 = new vertex(0)
//  let v1 = new vertex(1)
//  let v2 = new vertex(2)
//  let v3 = new vertex(3)
//  let v4 = new vertex(4)

//  let e0 = new edge(v0,v1, 10)
//  let e1 = new edge(v0,v2, 3)
//  let e2 = new edge(v1,v2,1)
//  let e3 = new edge(v1,v3,2)
//  let e4 = new edge(v2,v3,8)
//  let e5 = new edge(v2,v4, 2)
//  let e6 = new edge(v2,v1,4)
//  let e7 = new edge(v3,v4,7)
//  let e8 = new edge(v4, v3, 9)
//  vlist = [v0,v1,v2,v3,v4]
//  elist  = [e0,e1,e2,e3,e4,e5,e6,e7,e8]
adjlist = new HashTable()
// let vd1 = new vertexDistance(v2, 5)
// let vd2 = new vertexDistance(v3, 7)
for (let v of vlist) {
    adjlist.add(v, new ArrayList())
}
for (let e of elist) {
    //if starting vertex exists in adjlist
    if (adjlist.getIndexOfKey(e.getU()) !== -1) {
        //    adjlist.add(e.getU(), new vertexDistance(e.getV(), e.getWeight()))
        adjlist.getValue(e.getU()).add(new vertexDistance(e.getV(), e.getWeight()))
    }

}

function graph(vlist, elist, adjlist) {
    this.vertices = vlist
    this.edges = elist
    this.adj = adjlist

    this.getVertices = function () {
        return this.vertices
    }
    this.getEdges = function () {
        return this.edges
    }
    this.getAdj = function () {
        return this.adj
    }
    this.getVertex = function (char) {
        let index = char.charCodeAt(0)

        if (index >= 65 && index <= 74) {
            return this.vertices[index - 65]
        }

    }
}

g = new graph(vlist, elist, adjlist)


export function Graph_direct() {
    return drawGraph(vlist, elist, adjlist, true)
}

export function Graph_undirect() {
    return drawGraph(vlist, elist, adjlist, false)
}

// export function getVertex(char) {
//     let index = char.charCodeAt(0)
//     if (index >= 65 && index <= 74) {
//         return vlist[index - 65]
//     }

// }