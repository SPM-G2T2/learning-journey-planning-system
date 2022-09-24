import { Form, Input, Button } from 'antd';
import "antd/dist/antd.css";

interface InputFieldsProps {
    label?: string;
  }

/**
 * This is the multiple input fields component!
 * @param {InputFieldsProps} props for React Functional Component
 * @return {React.FC}: The JSX Code for multiple input fields template component.
 */
export default function MultipleInputFields(props: InputFieldsProps) {

    return <div>
            <Form.List name="users">
            {(fields, { add, remove }) => (
            <>
                <Form.Item label={props.label}>
                    <div style={{ display: 'flex' }}>
                        <Input />
                        <Button type="primary" onClick={() => add()} style={{ marginLeft: 50 }}>
                            Add Row
                        </Button>
                    </div>
                </Form.Item>
                  
                {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                    {...restField}
                    name={[name, 'first']}
                    style={{ marginLeft: 230 }}
                    >
                    <Input style={{ width: 660 }} />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)} style={{ marginLeft: 50 }}>
                        Remove
                    </Button>
                </div>
                ))}
            </>
            )}
            </Form.List>
      </div>
} 