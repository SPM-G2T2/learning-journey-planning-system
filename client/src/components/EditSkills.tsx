import { Typography, Form, Button, Switch, Row } from "antd";
import InputField from "./InputField";
import InputDropdown from "./InputDropdown";
import styles from "../styles/ManageLJPS.module.css";

export default function EditSkills(props: any) {
  const { Title } = Typography;
  const [form2] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Errors:", errorInfo);
  };

  const onFinish = (values: any) => {
    console.log("Form:", values);
    console.log("Title:", values["Title"]);
    console.log("Description:", values["Description"]);
    console.log("Courses:", values["Courses"]);
    console.log("Active:", values["Active"]);
    props.setForm(values);
    props.setNext("preview");
  };

  return (
    <>
      <Title
        className={`${styles.tabTitleColor} ${styles.tabTitleSpacing}`}
        level={4}
      >
        Edit skill
      </Title>
      <Form
        name="userForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        initialValues={{ remember: true }}
        form={form2}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginLeft: 10 }}
      >
        <InputField label="Title" name="Title"></InputField>
        <InputField label="Description" name="Description"></InputField>
        <InputDropdown label="Courses" name="Courses"></InputDropdown>
        <Form.Item label="Active" name="Active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Row style={{ justifyContent: "flex-end" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Edit skill
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
}
