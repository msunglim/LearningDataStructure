import { Layout } from 'antd';
import { Link, BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";


const { Header } = Layout;


function Head() {
    return (
        <Header className="header">
            <div style={{ color: 'white', fontSize: 'large', fontWeight: 'bold' }}>
               
                    <Link to="" >Datastructures</Link>
                
            </div>
        </Header>
    )
}

export default Head