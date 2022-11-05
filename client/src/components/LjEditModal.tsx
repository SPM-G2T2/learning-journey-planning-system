import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { Space, Typography } from 'antd';
import axios, { AxiosResponse, AxiosError } from "axios";


export default function LjEdit(props: any){
    // props: ljid, role, courses, skills
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const newLearningJourney = {
        ljid: props.ljid,
        role: props.roles,
        position: props.position,
        courses: props.courses,
        skills: props.skills
    }

    const handleOk = () => {
        var url = "http://127.0.0.1:5000/learning_journeys/edit"
        axios.post(url, newLearningJourney)
        
        .then(response => {
            console.log(response.data);
        })
        
        .catch(error => {
            console.log(error.message);
        })
        successModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const successModal = () => {
        setIsModalOpen(false);
        Modal.success({
            content: "Learning Journey has been edited!",
            onOk: () => {window.location.reload()}
        });
    };

    // Skills String
    var skillString = "";
    var skills = props.skills;
    for (var i = 0; i < skills.length; i++) {
        skillString += skills[i].skill_name + ", ";
    };
    skillString = skillString.slice(0, skillString.length - 2);
    //Skills String
    
    //Courses String
    var courseString = "";
    var courses = props.courses;
    for (var i = 0; i < courses.length; i++) {
        courseString += courses[i].course_name + ", ";
    };
    courseString = courseString.slice(0, courseString.length - 2)
    //Courses String

    return (
        <>
        <Button type="primary" onClick={showModal}>
            Next
        </Button>
        <Modal title="Confirm Learning Journey Edit?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p style={{ fontWeight: 'bold'}}>You are editing a learning journey for the following:</p>
            <p style={{ fontWeight: '600'}}>Learning Journey Id: <span style={{ fontWeight: 'normal'}}>{props.ljid}</span></p> 
            <p style={{ fontWeight: '600'}}>Role: <span style={{ fontWeight: 'normal'}}>{props.roles.name}</span></p>
            <p style={{ fontWeight: '600'}}>Position: <span style={{ fontWeight: 'normal'}}>{props.position.position_name}</span></p>
            <p style={{ fontWeight: '600'}}>Skills: <span style={{ fontWeight: 'normal'}}>{skillString}</span></p>
            <p style={{ fontWeight: '600'}}>Courses: <span style={{ fontWeight: 'normal'}}>{courseString}</span></p>
        </Modal>
        </>
    );
};