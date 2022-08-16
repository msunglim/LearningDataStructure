import { useParams } from 'react-router-dom';
import { Typography, Divider, Table } from 'antd';

import { emptyProgressList } from '../contents/progress/Progress';
import { table } from '../contents/textData.js';
import Lab from './sections/Lab.js';
import { algorithms } from './algorithmsManager.js';
const { Title, Paragraph, Text, Link } = Typography;

function setIndexSwitch(title) {
    let index;
    switch (title) {
        case 'ArrayList': index = 0; break;
        case 'DoublyLinkedList': index = 1; break;
        case 'Deques': index = 2; break;
        case 'HashMaps': index = 3; break;
        case 'BinarySearchTrees': index = 4; break;
        case 'Heaps': index = 5; break;
        case 'AVLs': index = 6; break;
        case 'Selection Sort': index = 7; break;
        case 'Insertion Sort': index = 8; break;
        case 'Cocktail Sort': index = 9; break;
        case 'Merge Sort': index = 10; break;
        case 'Quick Sort': index = 11; break;
        case 'LSD Radix Sort': index = 12; break;
        case 'Knuth-Morris-Pratt': index = 13; break;
        case 'Boyer-Moore': index = 14; break;
        case 'Rabin-Karp': index = 15; break;
        case 'BFS': index = 16; break;
        case 'DFS': index = 17; break;
        case 'Dijkstra\'s': index = 18; break;
        case 'Kruskal\'s': index = 19; break;

    }
    return index
}

function Algorithms() {
    emptyProgressList()
    let { title } = useParams();

    let index = setIndexSwitch(title)
    return (

        <Typography>
            {index != undefined && <>

                {/* will go down after constructed completely */}
                <Title level={2}>Labs!</Title>
                <Lab index={index} />

                <Divider style={{ fontSize: '30px', borderTopColor: 'darkslategray' }} orientation="left" orientationMargin="0">
                    Definition of {title}
                </Divider>
                <Paragraph>
                    {algorithms[index].description}
                </Paragraph>

                <Divider style={{ fontSize: '30px', borderTopColor: 'darkslategray' }} orientation="left" orientationMargin="0">
                    How {title} works
                </Divider>
                <Paragraph>
                    {algorithms[index].description2}
                </Paragraph>

                <Title level={2}>Methods in {title}</Title>
                <Table pagination={false} dataSource={table.datasource[index]} columns={table.col} />

                <Paragraph>
                    For more informations visit links below

                    <ul>
                        <li>
                            <Link href={algorithms[index].links[0]}>Geeksforgeeks</Link>
                        </li>
                        <li>
                            <Link href={algorithms[index].links[1]}>TutorialsPoint</Link>
                        </li>

                    </ul>

                </Paragraph>

                <Divider />


            </>}
        </Typography >
    )
}
export default Algorithms