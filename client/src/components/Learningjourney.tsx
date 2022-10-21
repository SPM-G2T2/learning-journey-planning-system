import "antd/dist/antd.css"
import { Typography, Form, Button, Row, Col, Modal } from 'antd';
import axios, { AxiosError, AxiosResponse } from "axios";

export default function PreviewLearningJourney(props:any){

    console.log(props)

    const { Title } = Typography;
    const { Paragraph } = Typography;

    const learning_journey = {

        // "staff_id": props.form.staff_id,
        // "skill_id": props.form.skill_id,
        // "position_id": props.form.position_id,
        // "course_id": props.form.course_id,
        "staff_id": "1" ,
        "position_id": "1", 
        "skill_id": "1" ,
        "course_id": "IS141"

    }
    console.log(learning_journey)

    const submitForm = async() => {
        axios.post("http://127.0.0.1:5000/create_learning_journey", learning_journey)

        .then((response: AxiosResponse) => {
            console.log(response.status)
            success()
        }
        )
        .catch((reason: AxiosError) => {
            console.log(reason.response!.status)
            if (reason.response!.status === 500){
                error()
                console.log("An error occurred creating the learning journey.")
            }
            if (reason.response!.status === 400){
                warning()
                console.log("Learning journey already exist")
            };

        });
    }   

    const success = () => {
        Modal.success({
        content: 'Learning journey has been successfully created!',
        });
        goToForm();
    };

    const warning = () => {
        Modal.warning({
        content: 'Learning journey already exists. Please add other courses.', //Not too sure what to put here
        });
    };

    const error = () => {
        Modal.error({
        content: 'An error occurred creating the learning journey! Please try again later.',
        });
    };

    const goToForm = () => {
        props.setNext("form");
    }

return (
    <>
    <Button type="primary" onClick={submitForm}> Test </Button>
    </>
)
}