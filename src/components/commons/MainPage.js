import { Layout } from 'antd';

import Side from "./Side"
import Head from "./Head"
import Contents from "./Contents"
import { BrowserRouter } from 'react-router-dom';




function MainPage() {


    return (
        <BrowserRouter>
            <Layout>

                <Head />
                <Layout>
                    <Side />
                    <Contents />
                </Layout>
            </Layout>
        </BrowserRouter>
    )
}

export default MainPage