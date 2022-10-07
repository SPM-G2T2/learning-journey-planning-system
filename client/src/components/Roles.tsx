/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Form, Button, Switch, Row } from 'antd';
import "antd/dist/antd.css";
import '../styles/App.css';
import InputField  from "./InputField";
import MultipleInputFields from "./MultipleInputFields";
import InputDropdown from "./InputDropdown";

export default function Roles() {

    const { Title } = Typography;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Form:', values);
        console.log('Title:', values['Title'])
        console.log('Description:', values['Description'])
        console.log('Department:', values['Department'])
        console.log('Responsibilities:', values['Responsibilities'])
        console.log('Skills:', values['Skills'])
        console.log('Active:', values['Active'])

        const Title = values['Title']
        const Description = values['Description']
        const Department = values['Department']

        var responsibilties = ""
        for (var resp of values['Responsibilities']) {
        console.log(resp)
        responsibilties += resp['resp'] + ","
        }
        console.log(responsibilties.substring(0, responsibilties.length-1))

        function Status() {
            if (values['Active']) {
              return "Active";
            }
            return "Retired";
          }
        const Active = Status() 

        console.log(values['Skills'][0]['skill']);

        const position = {
            "Skill_ID": values['Skills'][0]['skill'], 
            "Position_name": Title,
            "Position_desc": Description,
            "Position_dept": Department, 
            "Position_rept": responsibilties.substring(0, responsibilties.length-1),
            "Position_status": Active
            }

            fetch("http://localhost:5000/createPosition", 
                {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify( position )
            })
            .then((response) => {
                if (response.status === 201) {
                return response.json();
                } else if (response.status === 400) {
                console.log("Position Name already exists.")
                }
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Errors:', errorInfo);
    };


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
                onFinishFailed={onFinishFailed}>
                <InputField label="Title" name="Title"></InputField>
                <InputField label="Description" name="Description"></InputField>
                <InputDropdown label="Department" name="Department"></InputDropdown>
                <MultipleInputFields label="Responsibilities" name="Responsibilities"></MultipleInputFields>
                <InputDropdown label="Skills" name="Skills"></InputDropdown>
                <Form.Item label="Active" name="Active" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Row style={{ justifyContent: "flex-end" }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Create role</Button>
                    </Form.Item>
                </Row>
            </Form>
        </>
    );
}