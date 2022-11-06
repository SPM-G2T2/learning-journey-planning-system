import { Typography, Form, Button, Switch, Row, Col } from "antd";
import InputField from "./InputField";
import InputDropdown from "./InputDropdown";
import styles from "../styles/ManageLJPS.module.css";

export default function CreateSkills(props: any) {
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
        Create a new skill
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
          <Col style={{ marginRight: "1vw" }}>
            <Form.Item>
              <Button onClick={() => props.setSkillsStep("view")}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create skill
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
