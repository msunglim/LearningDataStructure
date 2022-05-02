import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function A() {
    return (
        <div>

            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>

        </div>
    )
}
function B() {
    return (

        <SubMenu key="sub2" title="B">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>

            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>

    )
}
function C() {
    //var menu = <Menu mode="inline" theme="dark">

    var items = <><Menu.Item key="5">Option 5</Menu.Item><Menu.Item key="6">Option 6</Menu.Item><Menu.Item key="7">Option 7</Menu.Item><Menu.Item key="8">Option 8</Menu.Item></>

    var submenu = <SubMenu key="sub1" icon={<MailOutlined />} title="A">
        {items}
    </SubMenu>;

    var items2 = <>    <Menu.Item key="9">Option 9</Menu.Item>
    <Menu.Item key="10">Option 10</Menu.Item>

    <Menu.Item key="11">Option 11</Menu.Item>
    <Menu.Item key="12">Option 12</Menu.Item></>
    var submenu2 = <SubMenu key="sub2" icon={<MailOutlined />} title="A">
        {items2}
    </SubMenu>;
    var menu = <Menu
        mode="inline"
        style={{ borderRight: 0 }}

    >
        {submenu}
        {submenu2}
    </Menu>;
    return (
        <div>
            {menu}
        </div>
    )

}
function Test() {
    return (
        <div style={{ width: 256 }}>


            <C />
        </div >
    );
}

export default Test;