import { Typography, Form, Button, Switch, Row, Modal } from "antd";
import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from "axios";
import styles from "../styles/Home.module.css"

export default function DeleteLJBtn(props: any){

    console.log(props.ljid[0]); // lj_id
    console.log(props.ljid[1]); // lj_id details

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        // getCourses()
        setIsModalOpen(true);
    };

    const handleOk = () => {
        var url = "http://127.0.0.1:5000/learning_journeys/";
        url += props.ljid;
        url += "/deleteLearningjourney"
        console.log(url)

        axios.post(url, {
        })
        
        .then(Axiosresponse => {
            console.log(Axiosresponse.data.code)
            if(Axiosresponse.data.code === 201){
                successModal();
                console.log(Axiosresponse.data.code);
            }
            if(Axiosresponse.data.code === 500){
                errorModal();
                console.log(Axiosresponse.data.code);
            }

        })
        
        .catch((reason: AxiosError) => {
            console.log(reason.response!.status);
            if(reason.response!.status === 500){
                errorModal()
            }
        })

        setIsModalOpen(false);
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const successModal = () => {
        Modal.success({
            content: "Learning Journey has been succesfully deleted!",
        });
        window.location.reload()
    };

    const errorModal = () => {
        Modal.error({
            content: "An error occurred deleting the Learning Journey! Please try again later.",
        });
    };


    // async function getCourses() {
    //     const url = "http://127.0.0.1:5000/learning_journeys/" + props.ljid + "/filterLearningjourneyById";
    //     // console.log(url)
    //     let learningJourneys;
    //     const res = await fetch(url);
    //     learningJourneys = await res.json();
    //     learningJourneys = learningJourneys.data;

    //     var courseString = ""
        
    //     for (var i = 0; i < learningJourneys.length; i++) {
    //         var courseId = learningJourneys[i].course_id;
    //         // console.log(courseId);
    //         const course_url = "http://127.0.0.1:5000/courses/" + courseId + "/filterCourseById";
    //         // console.log(course_url);
    //         let course;
    //         const course_res = await fetch(course_url);
    //         course = await course_res.json();
    //         course = course.data.course_name;
    //         courseString += course + ", ";
    //     };

    //     courseString = courseString.slice(0, courseString.length - 2);
    //     console.log(courseString);
    //     return courseString;
    // }

    // console.log(getCourses());


    return (
    <>
        <Button type="primary" className={styles.deleteButton} onClick={showModal}>
            Delete
        </Button>
        <Modal title="Confirm Deletion?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Learning Journey ID: {props.ljid[0]}</p>
        </Modal>
    </>
    );
};
