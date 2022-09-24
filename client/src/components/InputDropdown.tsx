import { Form, Select } from 'antd';
import "antd/dist/antd.css"

interface InputDropdownProps {
    label?: string;
  }

/**
 * This is the input dropdown component!
 * @param {InputFieldsProps} props for React Functional Component
 * @return {React.FC}: The JSX Code for input dropdown template component.
 */
export default function InputDropdown(props: InputDropdownProps) {
   
    const { Option } = Select;

    const handleChange = (value: string | string[]) => {
      console.log(`Selected: ${value}`);
    };

    return <div>
      <Form.Item label={props.label}>
      { props.label === "Skills" ?
          <Select defaultValue="Programming" onChange={handleChange} style={{ width: 200 }}>
            <Option key="S123">Programming</Option>
          </Select>
        : null }
      { props.label === "Courses" ?
          <Select defaultValue="Intro to Programming" onChange={handleChange} style={{ width: 200 }}>
            <Option key="C123">Intro to Programming</Option>
          </Select>
        : null }
      { props.label === "Department" ?
          <Select defaultValue="Human Resource" onChange={handleChange} style={{ width: 200 }}>
            <Option key="R123">Human Resource</Option>
          </Select>
      : null }
       </Form.Item>
      </div>
}