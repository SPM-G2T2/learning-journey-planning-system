import { Typography, Form, Button, Switch, Row } from "antd";
// import { useState, useEffect } from "react";
import InputField from "./InputField";
import MultipleInputFields from "./MultipleInputFields";
import InputDropdown from "./InputDropdown";
import styles from "../styles/ManageLJPS.module.css"

export default function CreateRoles(props:any) {

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Errors:", errorInfo);
  };

  const onFinish = (values: any) => {
    console.log("before")
    console.log("Form:", values);
    console.log("Title:", values['Title']);
    console.log("Description:", values["Description"]);
    console.log("Department:", values["Department"]);
    console.log("Responsibilities:", values["Responsibilities"]);
    console.log("Skills:", values["Skills"]);
    console.log("Active:", values["Active"]);
    props.setForm(values)
    props.setNext("preview")

  };

  return (
    <>
      <Title className={`${styles.tabTitleColor} ${styles.tabTitleSpacing}`} level={4}>Create a new role</Title>
      <Form
        name="userForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginLeft: 10 }}
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
