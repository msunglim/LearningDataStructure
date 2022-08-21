import { Layout, Menu, Button, MenuProps } from 'antd';
import {
    UserOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css";
import { Link, BrowserRouter } from "react-router-dom";
import { useState } from 'react';
import styles from '../contents/algorithmCSS.module.css'
import { useWindowDimensions } from 'react-native';


const { SubMenu } = Menu;
const { Sider } = Layout;


const arrays = ['DynamicArray', 'DoublyLinkedList', 'Deques', 'HashMaps']
const trees = ['BinarySearchTrees', 'Heaps', 'AVLs']
const sorting = ['Selection Sort', 'Insertion Sort', 'Cocktail Sort', 'Merge Sort', 'Quick Sort', 'LSD Radix Sort']
const patternMatching = ['Knuth-Morris-Pratt', 'Boyer-Moore', 'Rabin-Karp']
const graphAlgorithms = ['BFS', 'DFS', 'Dijkstra\'s', 'Kruskal\'s']


function SideMenu(props) {
    function createSubMenu(index, list, title) {
        var sub, baseIndex;
        switch (index) {
            case 0: sub = "sub1"; baseIndex = 0; break;
            case 1: sub = "sub2"; baseIndex = arrays.length; break;
            case 2: sub = "sub3"; baseIndex = arrays.length + trees.length; break;
            case 3: sub = "sub4"; baseIndex = arrays.length + trees.length + sorting.length; break;
            case 4: sub = "sub5"; baseIndex = arrays.length + trees.length + sorting.length + patternMatching.length; break;

        }
        function closeSideMenu() {
            if (props.width < 760) {
                props.close()
            }
        }
        
        var menu = list.map((algorithmsName, i) =>
        (<Menu.Item key={baseIndex + i + 1} style={{ background: 'white' }}
        >
            <Link to={algorithmsName} onClick={closeSideMenu} >
                {algorithmsName}
            </Link>
        </Menu.Item>))

        var submenu = <SubMenu key={sub} icon={<UserOutlined />}
            title={title}  >
            {menu}
        </SubMenu>

        return submenu
    }

    var sub1 = createSubMenu(0, arrays, "Arrays")
    var sub2 = createSubMenu(1, trees, "Trees")
    var sub3 = createSubMenu(2, sorting, "Sorting")
    var sub4 = createSubMenu(3, patternMatching, "Pattern Matching")
    var sub5 = createSubMenu(4, graphAlgorithms, "Graph Algorithms")

    var menu = <Menu mode="inline" style={{ borderRight: 0 }}   >
        {sub1}
        {sub2}
        {sub3}
        {sub4}
        {sub5}
    </Menu >

    return menu

}

function Side() {

    let [currentItem, setCurrentItem] = useState()
    const { height, width } = useWindowDimensions();
    function changeCurrentItem(e) {
        setCurrentItem(e.key)
        // console.log(currentItem)
    }
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);

    };


    return (
        <side height={width > 760 ? height : 500} className={styles.sider}   >
            {width <= 760 &&
                <>
                    <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    </Button>
                    {collapsed ? <SideMenu width={width} close={toggleCollapsed} /> : <></>}
                </>
            }
            {width > 760 &&
                <SideMenu />
            }


        </side >
    )
}
export default Side