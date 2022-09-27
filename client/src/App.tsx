import React from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import InputField  from "./components/InputField";
import MultipleInputFields from "../src/components/MultipleInputFields";
import InputDropdown from "../src/components/InputDropdown";
import { Form, Button } from 'antd';

function App() {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    
    // mock data first
    const position = {
      "Skill_ID": 1, 
      "Position_name": "Lowest Form",
      "Position_desc": "Coding IDK",
      "Position_dept": "SWE", 
      "Position_rept": "Coding everyday",
      "Position_status": "Active"
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
      .then((error) => console.log(error));
    
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}>
        <InputField label="Title"></InputField>
        <InputField label="Description"></InputField>
        <InputDropdown label="Department"></InputDropdown>
        <MultipleInputFields label="Responsibilities"></MultipleInputFields>
        <InputDropdown label="Skills"></InputDropdown>
        <Button type="primary" style={{ marginLeft: '80%' }} htmlType="submit">Create role</Button>
      </Form>
    </div>
  );
}

export default App;
