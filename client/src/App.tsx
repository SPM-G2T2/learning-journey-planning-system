// import logo from './logo.svg';
import './styles/App.css';
import InputField  from "./components/InputField";
import MultipleInputFields from "../src/components/MultipleInputFields";
import InputDropdown from "../src/components/InputDropdown";
import { Form, Button, Switch } from 'antd';

function App() {

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

    
    const Active = values['Active'] ? "Active" : "Retired" 
    

    // mock data first
    // const position = {
    //   "Skill_ID": 1, 
    //   "Position_name": Title,
    //   "Position_desc": Description,
    //   "Position_dept": Department, 
    //   "Position_rept": "Coding everyday",
    //   "Position_status": Active
    // }

    // fetch("http://localhost:5000/createPosition", 
    //     {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       method: "POST",
    //       body: JSON.stringify( position )
    //   })
    //   .then((response) => {
    //     if (response.status === 201) {
    //       return response.json();
    //     } else if (response.status === 400) {
    //       console.log("Position Name already exists.")
    //     }
    //   })
    //   .then((data) => console.log(data))
    //   .then((error) => console.log(error));
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Errors:', errorInfo);
  };


  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <Form 
        name="userForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
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
          <Switch defaultChecked/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ marginLeft: '80%' }} htmlType="submit">Create role</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;