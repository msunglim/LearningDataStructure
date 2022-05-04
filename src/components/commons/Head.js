import { Layout } from 'antd';
import { Link, BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import Side from './Side';
import { useWindowDimensions } from 'react-native';
import styles from '../contents/algorithmCSS.module.css'
const { Header } = Layout;

function Head() {
    const { height, width } = useWindowDimensions();

    return (
        <Header className="header">
            <div style={{ color: 'white', fontSize: 'large', fontWeight: 'bold', display:'inline-flex' }}>

                {width <= 760 &&
                    <Side />
                }
                <Link to="/LearningDataStructure" className={styles.link} >Datastructures</Link>


            </div>
        </Header>
    )
}

export default Head