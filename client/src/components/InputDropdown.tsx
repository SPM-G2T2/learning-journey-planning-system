import { Form, Select, Button } from 'antd';
import "antd/dist/antd.css"

interface InputDropdownProps {
    label?: string;
    name?: string;
  }

/**
 * This is the input dropdown component!
 * @param {InputFieldsProps} props for React Functional Component
 * @return {React.FC}: The JSX Code for input dropdown template component.
 */
export default function InputDropdown(props: InputDropdownProps) {
   
    const { Option } = Select;

    return <>
      { props.label === "Skills" ?
          <Form.List name="Skills">
          {(fields, { add, remove }) => (
          <div style={{ display: 'inline', marginLeft: 200, marginBottom: 30 }}>
              <Form.Item label={props.label} name={[0, 'skill']} key={0} tooltip="This is a required field" rules={[{ required: true, message: 'Please select a skill' }]}>
                  <Select style={{ width: 200 }}>
                    <Option value="1">Programming</Option>
                    <Option value="2">Sleeping</Option>
                    <Option value="3">Pooping</Option>
                  </Select>
              </Form.Item>
              <Button onClick={() => add()} style={{ marginLeft: 50 }}>
                Add Skill
              </Button>
                
              {fields.map(({ key, name, ...restField }) => (
                <>
                    <Form.Item
                      label={props.label}
                      name={[name+1, 'skill']}
                      tooltip="This is a required field"
                      rules={[{ required: true, message: 'Please select a skill' }]}
                      style={{  display: 'inline', marginLeft: 200, marginBottom: 30 }}
                      key={key+1} 
                    >
                    <Select>
                      <Option value="1">Programming</Option>
                      <Option value="2">Sleeping</Option>
                      <Option value="3">Pooping</Option>
                    </Select>
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name+1)}>
                        Remove
                    </Button>
                </>
              ))}
          </div>
          )}
          </Form.List>
        : null }
      { props.label === "Courses" ?
         <Form.Item label={props.label} name={props.label} tooltip="This is a required field" rules={[{ required: true, message: 'Please select a course' }]}>
            <Select style={{ width: 200 }}>
              <Option value="CS123">Intro to Programming</Option>
            </Select>
          </Form.Item>
        : null }
      { props.label === "Department" ?
          <Form.Item label={props.label} name={props.label} tooltip="This is a required field" rules={[{ required: true, message: 'Please select a department' }]}> 
            <Select style={{ width: 200 }}>
              <Option value="HR">Human Resource</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Operations">Operations</Option>
              <Option value="IT Team">IT Team</Option>
            </Select>
          </Form.Item>
      : null }
      </>
}