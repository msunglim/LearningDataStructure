import { Layout } from 'antd';
import "antd/dist/antd.css";
import {  Route, Routes,useParams } from 'react-router-dom';
import Algorithms from '../contents/Algorithms';
import styles from '../contents/algorithmCSS.module.css'
import WelcomeContent from './WelcomeContent';

const { Content } = Layout;

function Contents() {
    
    return (
        <Layout style={{ padding: '0 24px 24px' }} className={styles.content}>
            
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    display:'block'
                }}
            >
                <Routes>
                    <Route path="/" element={<WelcomeContent />} />
                    <Route path="/:title" element={<Algorithms/>}/>
                    

                    
                </Routes>

            </Content>

        </Layout>

    )
}
export default Contents