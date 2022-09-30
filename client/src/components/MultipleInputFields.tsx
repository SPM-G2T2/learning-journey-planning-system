import { Form, Input, Button } from 'antd';
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
                <>
                    <Form.Item label={props.label} name={[0, 'resp']}  key={0} tooltip="This is a required field" 
                        rules={[
                        {
                        required: true,
                        message: "Please enter a responsibility",
                        }
                    ]}
                    >
                        <Input style={{ width: 200, marginBottom: 10 }} />
                    </Form.Item>
                    <Button onClick={() => add()} style={{ marginLeft: 50,  marginBottom: 10 }}>
                            Add Row
                    </Button>
                </>

                {fields.map(({ key, name, ...restField }) => (
                <>
                    <Form.Item
                    {...restField}
                    name={[name+1, 'resp']}
                    key={key+1}
                    style={{ display: 'inline', marginBottom: 8, marginLeft: 230 }}
                    tooltip="This is a required field"
                    rules={[{ required: true, message: "Please enter a responsibility" }]}
                    >
                    <Input style={{ width: 200 }} />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)} style={{ marginLeft: 50 }}>
                        Remove
                    </Button>
                </>
                ))}
            </>
            )}
            </Form.List>
      </>
} 