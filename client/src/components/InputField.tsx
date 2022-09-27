import { Form, Input } from 'antd';
import { useState } from 'react'
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

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // const handleChange = (value: string | string[]) => {
    //   console.log(`Selected: ${value}`);
    // };

    return <div>
      { props.label === "Title" ?
        <Form.Item label={props.label}>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </Form.Item> : 
        <Form.Item label={props.label}>
          <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        }
      </div>
}