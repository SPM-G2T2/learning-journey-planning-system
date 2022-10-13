import {
  AppstoreOutlined,
  BarChartOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./styles/App.css";
import logo from "./logo.png";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Skills from "./pages/Skills";
import Courses from "./pages/Courses";

const { Content, Sider } = Layout;

const App = () => (
  <Layout>
    <BrowserRouter>
      <Sider breakpoint="lg">
        <div className="brand">
          <img src={logo} className="logo" /> All-in-One LJPS
        </div>
        <Menu mode="inline" defaultSelectedKeys={["Home"]}>
          <Menu.Item icon={<AppstoreOutlined />} key="Home">
            <Link to="/" className="menu-item-link">
              Home
            </Link>
          </Menu.Item>
          {[
            [<BarChartOutlined />, "Roles"],
            [<MessageOutlined />, "Skills"],
            [<SettingOutlined />, "Courses"],
          ].map((navItem) => (
            <Menu.Item icon={navItem[0]} key={navItem[1] as string}>
              <Link
                to={(navItem[1] as string).toLowerCase()}
                className="menu-item-link"
              >
                {navItem[1]}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Content>
    </BrowserRouter>
  </Layout>
);

export default App;