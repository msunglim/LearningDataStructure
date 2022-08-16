import { Layout, Breadcrumb } from 'antd';
import { Typography } from 'antd';
import "antd/dist/antd.css";
import { Outlet, Route, Routes, Link, BrowserRouter } from 'react-router-dom';


const { Title } = Typography;

const arrays = ['Dynamic Array', 'DoublyLinkedList', 'Deques', 'HashMaps']
const trees = ['BinaryTrees', 'Heaps', 'AVLs']
const sorting = ['Selection Sort', 'Insertion Sort', 'Cocktail Sort', 'Merge Sort', 'Quick Sort', 'LSD Radix Sort']
const patternMatching = ['Knuth-Morris-Pratt', 'Boyer-Moore', 'Rabin-Karp']
const graphAlgorithms = ['BFS', 'DFS', 'Dijkstra\'s', 'Kruskal\'s']


function GetList(props) {

    var algorithmsNames = props.list.map((element, i) => (<li key={i}>{element}</li>))
    return (
        <ul>
            {algorithmsNames}
        </ul>
    )
}


function WelcomeContent() {
    return (

        <div>
            <Title>
                {/* 자료구조의 기본기들을 배워봅시다. */}
                Let's Learn Data Structures & Algorithms!
            </Title>
            <hr />

            <Title level={3}>
            {/* 자료구조란? */}
            What's the data structures?
            </Title>
            <div>
                {/* 이 과목이 자료구조를 직접 활용하기 때문에 중요하다기 보다는, 프로그램을 작성할 때 되는대로 막 짜는 게 아니라 한 번이라도 전체적인 프로그램의 흐름(혹은 구조)에 대해 생각하게 만들기 때문에 중요하다. 한국에서 거의 이러한 일이 일어나지 않지만, 운영체제 또는 특정 목적으로 동작하는 프로그램 엔진 등을 제작하게 될 때에는 정말 잘 알아야 하는 과목이다. 자료 구조에 따라 프로그램 자체의 지원 가능한 기능과 성능 자체가 확확 바뀌는 경우가 발생하기 때문이다. 이러저러한 이유로 여러 컴퓨터과학 전공과목 중에서 전공심화 과목들은 기본적으로 이 과목을 요구하는 경우가 많다. */}
                In computer science, a data structure is a data organization, management, and storage format that is usually chosen for efficient access to data. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data, i.e., it is an algebraic structure about data.

            </div>
            <div>
                <Title level={3}>Arrays</Title>
                <GetList list={arrays} />
                {/* <div dangerouslySetInnerHTML={{ __html: getList(arrays) }} /> */}
            </div>
            <div>
                <Title level={3}>Trees</Title>
                <GetList list={trees} />
                {/* <div dangerouslySetInnerHTML={{ __html: getList(trees) }} /> */}
            </div>
            <div>
                <Title level={3}>Sorting</Title>
                <GetList list={sorting} />

                {/* <div dangerouslySetInnerHTML={{ __html: getList(sorting) }} /> */}
            </div>
            <div>
                <Title level={3}>Pattern Matching</Title>
                <GetList list={patternMatching} />

                {/* <div dangerouslySetInnerHTML={{ __html: getList(patternMatching) }} /> */}
            </div>
            <div>
                <Title level={3}>Graph Algorithms</Title>

                <GetList list={graphAlgorithms} />

                {/* <div dangerouslySetInnerHTML={{ __html: getList(graphAlgorithms) }} /> */}
            </div>
        </div>

    )
}

export default WelcomeContent