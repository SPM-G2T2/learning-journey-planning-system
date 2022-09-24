import { Form, Input } from 'antd';
import "antd/dist/antd.css"

interface InputFieldsProps {
    label?: string;
  }

/**
 * This is the input field component!
 * @param {InputFieldsProps} props for React Functional Component
 * @return {React.FC}: The JSX Code for input field template component.
 */
export default function InputField(props: InputFieldsProps) {
    const { TextArea } = Input;

    return <div>
      { props.label === "Title" ?
        <Form.Item label={props.label}>
          <Input />
        </Form.Item> : 
        <Form.Item label={props.label}>
          <TextArea rows={4} />
        </Form.Item>
        }
      </div>
}