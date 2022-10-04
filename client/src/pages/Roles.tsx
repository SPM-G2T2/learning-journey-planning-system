import { Typography, Form, Button, Switch, Row } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import "../styles/App.css";
import InputField from "../components/InputField";
import MultipleInputFields from "../components/MultipleInputFields";
import InputDropdown from "../components/InputDropdown";
import { useNavigate } from "react-router-dom";
import { setConstantValue } from "typescript";


export default function Roles() {
  
  const { Title } = Typography;
  const [form] = Form.useForm();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dept, setDept] = useState("");
  const [res, setRes] = useState([]);
  const [skills, setSkills] = useState([]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Errors:", errorInfo);
  };

  const onFinish = (values: any) => {
    console.log("Form:", values);
    console.log("Title:", values["Title"]);
    console.log("Description:", values["Description"]);
    console.log("Department:", values["Department"]);
    console.log("Responsibilities:", values["Responsibilities"]);
    console.log("Skills:", values["Skills"]);
    console.log("Active:", values["Active"]);

    setTitle(values["Title"]);
    setDesc(values["Description"]);
    setDept(values["Department"]);
    console.log(title)
    routeChange();

  };

  let navigate = useNavigate(); 

  const routeChange = () => { 
      let path = "/preview-role"; 
      navigate(path, { state: { title: title, desc: desc, dept: dept, resp: ['manage', 'ppl'], skills: ['programming', 'idk'] }});
  }
  

  return (
    <>
      <Title level={3}>Create a new role</Title>
      <Form
        name="userForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        style={{ marginLeft: "15%" }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <InputField label="Title" name="Title"></InputField>
        <InputField label="Description" name="Description"></InputField>
        <InputDropdown label="Department" name="Department"></InputDropdown>
        <MultipleInputFields
          label="Responsibilities"
          name="Responsibilities"
        ></MultipleInputFields>
        <InputDropdown label="Skills" name="Skills"></InputDropdown>
        <Form.Item label="Active" name="Active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Row style={{ justifyContent: "flex-end" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create role
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
}
