import { Layout } from 'antd';
import "antd/dist/antd.css";
import {  Route, Routes,useParams } from 'react-router-dom';


import Algorithms from '../contents/Algorithms';

import WelcomeContent from './WelcomeContent';
const { Content } = Layout;

function Contents() {
    
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
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