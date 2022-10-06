import {
    MinusCircleOutlined
  } from "@ant-design/icons";
import { Form, Input, Button, Space } from 'antd';
import "antd/dist/antd.css";

interface InputFieldsProps {
    label?: string;
    name?: string;
  }

/**
 * This is the multiple input fields component!
 * @param {InputFieldsProps} props for React Functional Component
 * @return {React.FC}: The JSX Code for multiple input fields template component.
 */
export default function MultipleInputFields(props: InputFieldsProps) {

    return <>
            <Form.List name="Responsibilities">
            {(fields, { add, remove }) => (
                <>
                    {/* <Space align="baseline" style={{ marginRight: 750 }}> */}
                        <Form.Item label={props.label} name={[0, 'resp']} tooltip="This is a required field" 
                            rules={[
                            {
                            required: true,
                            message: "Please enter a responsibility",
                            }
                        ]}
                        >
                            <Input style={{ marginBottom: 10 }} />
                        </Form.Item>
                        <Button onClick={() => add()} style={{ marginBottom: 10 }}>
                            Add Row
                        </Button>
                    {/* </Space> */}

                {fields.map(({ key, name, ...restField }) => (
                    <Space style={{ display: 'flex',  marginBottom: 8 }} align="baseline"> 
                        <Form.Item
                        {...restField}
                        name={[name, 'resp']}
                        key={key}
                        style={{ marginLeft: 120 }}
                        tooltip="This is a required field"
                        rules={[{ required: true, message: "Please enter a responsibility" }]}
                        >
                        <Input style={{ width: 320 }} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 10 }} />
                    </Space>
                ))}
                </>
            )}
            </Form.List>
        </>
} 