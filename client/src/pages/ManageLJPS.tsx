import { Tabs, } from 'antd';
import "antd/dist/antd.css";
import "../styles/App.css";
import Roles from "./Roles";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function ManageLJPS() {

    const items = ['Roles', 'Skills', 'Courses']
    const navigate = useNavigate();

    return (<Tabs
        style = {{ marginTop: "5vw" }}
        onChange={() => {
            navigate(`/roles`); // <-- sibling path
          }}
        defaultActiveKey="1"
        centered
        items={items.map((item, i) => {
            const id = String(i + 1);
        return {
            label: `${item}`,
            key: id,
            children: "hello",
        };
        })}
  />)
}