import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

interface InputFieldsProps {
  label?: string;
  name?: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

/**
 * This is the multiple input fields component!
 * @param {InputFieldsProps} props for React Functional Component
 * @return {React.FC}: The JSX Code for multiple input fields template component.
 */
export default function MultipleInputFields(props: InputFieldsProps) {
  return (
    <>
      <Form.List name="Responsibilities">
        {(fields, { add, remove }, { errors }) => (
          <>
            <Form.Item {...formItemLayout} label="Responsibilities">
              <Form.Item style={{ display: "inline-block" }}>
                <TextArea
                  placeholder="Responsibilities"
                  style={{ width: "30vw" }}
                />
              </Form.Item>
              <Form.Item style={{ display: "inline-block" }}>
                <Button onClick={() => add()}>Add field</Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </Form.Item>
            {fields.map((field) => (
              <Form.Item {...formItemLayoutWithOutLabel} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <TextArea
                    placeholder="Responsibilities"
                    style={{ width: "30vw" }}
                  />
                </Form.Item>
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              </Form.Item>
            ))}
            {/* <Space align="baseline" style={{ marginRight: 750 }}> */}
            {/* <Form.Item label={props.label} name={[0, 'resp']} tooltip="This is a required field" 
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
                        </Button> */}
            {/* </Space> */}

            {/* {fields.map(({ key, name, ...restField }) => (
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
                ))} */}
          </>
        )}
      </Form.List>
    </>
  );
}
