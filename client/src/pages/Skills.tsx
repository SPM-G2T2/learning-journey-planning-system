import React,{useEffect, useState} from 'react';
import axios from "axios";
import { ObjectType } from 'typescript';
import { Typography, Form, Button, Switch, Row } from 'antd';
import "antd/dist/antd.css";
import '../styles/App.css';
import InputField  from "../components/InputField";
import MultipleInputFields from "../components/MultipleInputFields";
import InputDropdown from "../components/InputDropdown";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Skills() {

  const { Title } = Typography;
const [form] = Form.useForm();

// const [data, setData] = useState({
//   skill_name: "",
//   description:"",
//   status:"",
//   courses: []
// })



// const handlechange = (e:any) => {
//   const name = e.target.name
//   const value = e. target.value
//   setData((prev)=>{
//     return {...prev,[name]: value}
//    })
// };


const handleSubmit = async(e:any)=>{
console.log(e)
try{
    await fetch("http://127.0.0.1:5000/add_skill", {
        method: "POST",
        body: JSON.stringify({
        skill_name: e.skill_name,
        skill_description: e.skill_description,
        skill_status: e.skill_status,
        courses: e.courses
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
    

} catch (error){}

};
  return (
    <>
      {/* <h2>to input css ltr</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label>Name</label>
        <input onChange={handlechange} name="name" type="text" required></input>
        <br></br>
        <label>Description</label>
        <input onChange={handlechange} name="description"  type="text" required></input>
        <br></br>
        <label>Status</label>
        <input onChange={handlechange} name="status" type="text" required></input>
        <button type="submit" >Add skill</button>
      </form>
      </div> */}

    </>
  );
}