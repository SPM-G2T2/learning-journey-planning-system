import {
  AppstoreOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./styles/App.css";
import logo from "./assets/logo.png";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Skills from "./pages/Skills";
import Courses from "./pages/Courses";
import ManageLJPS from "./pages/ManageLJPS";

const { Content, Sider } = Layout;

const App = () => (
  <Layout>
    <BrowserRouter>
      <Sider breakpoint="lg">
        <div className="brand">
          <img
            src={logo}
            className="icon"
            alt="logo"
            style={{ marginRight: "1vw" }}
          />{" "}
          All-in-One LJPS
        </div>
        <Menu mode="inline" defaultSelectedKeys={["Home"]}>
          <Menu.Item icon={<AppstoreOutlined />} key="Home">
            <Link to="/" className="menu-item-link">
              Home
            </Link>
          </Menu.Item>
          {[
            [<BarChartOutlined />, "Roles"],
            [<BarChartOutlined />, "Skills"],
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
          <Menu.Item icon={<SettingOutlined/>} key="LJPS">
            <Link
              to="/ljps"
              className="menu-item-link"
            >
              Manage LJPS
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Button
          shape="round"
          icon={<UserOutlined />}
          style={{
            borderColor: "#DBDBDB",
            backgroundColor: "#DBDBDB",
            color: "#000000",
            position: "absolute",
            right: "4vw",
          }}
        >
          Eric
        </Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<Roles/>} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/create/2" element={<Home lj={true} />} />
          <Route path="/ljps" element={<ManageLJPS />} />
        </Routes>
      </Content>
    </BrowserRouter>
  </Layout>
);

export default App;