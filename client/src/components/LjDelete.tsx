import { Typography, Form, Button, Switch, Row, Modal } from "antd";
import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from "axios";

export default function DeleteLJBtn(props: any){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
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
    };

    const errorModal = () => {
        Modal.error({
            content: "An error occurred deleting the Learning Journey! Please try again later.",
        });
    };


    return (
    <>
        <Button type="primary" style={{ background: "red", borderColor: "red", margin: "15px"}} onClick={showModal}>
        Delete
        </Button>
        <Modal title="Confirm Deletion?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            Learning Journey ID: {props.ljid}
        </Modal>
    </>
    );
};
