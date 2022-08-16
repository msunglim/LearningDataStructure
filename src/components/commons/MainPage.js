import { Layout } from 'antd';

import Side from "./Side"
import Head from "./Head"
import Contents from "./Contents"
import { BrowserRouter } from 'react-router-dom';
import { useWindowDimensions } from 'react-native';

function MainPage() {
    const { height, width } = useWindowDimensions();
    return (
        <BrowserRouter>
            <Layout >
                <Head />
                <Layout style={{display:'-webkit-box'}}>
                    {width > 760 &&
                        <Side />
                    }
                    <Contents />
                </Layout>
            </Layout>
        </BrowserRouter>
    )
}

export default MainPage