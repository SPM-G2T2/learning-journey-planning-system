import React from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import InputField  from "./components/InputField";
import MultipleInputFields from "../src/components/MultipleInputFields";
import InputDropdown from "../src/components/InputDropdown";
import { Form } from 'antd';

function App() {
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
        layout="horizontal">
        <InputField label="Title"></InputField>
        <InputField label="Description"></InputField>
        <InputDropdown label="Department"></InputDropdown>
        <MultipleInputFields label="Responsibilities"></MultipleInputFields>
        <InputDropdown label="Skills"></InputDropdown>
      </Form>
    </div>
  );
}

export default App;
