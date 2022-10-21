import "antd/dist/antd.css"
import { Typography, Form, Button, Row, Col, Modal } from 'antd';
import axios, { AxiosError, AxiosResponse } from "axios";

export default function PreviewLearningJourney(props:any){

    console.log(props)

    const { Title } = Typography;
    const { Paragraph } = Typography;


    var learningjourneys = [];
    // for (var learningjourney of props.form.Learning_journey){
    //     console.log(learningjourney)
    // }

    const learning_journey = {

        // "lj_id": props.form.Learning_journey_id,
        // "staff_id": props.form.staff_id,
        // "skill_id": props.form.skill_id,
        // "position_id": props.form.position_id,
        // "course_id": props.form.course_id,
        "staff_id": "1" ,
        "skill_id": "1" ,
        "position_id": "1", 
        "course_id": "IS141"

    }
    console.log(learning_journey)

    const submitForm = async() => {
        axios.post("http://localhost:5000/createLearningjourney", learning_journey)

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

            // if (reason.response!.status !== 400 && reason.response!.status !== 406  ){
            //     error()
            //     console.log("Network error")
            // };


            // if (reason.status === 201) {
            //     success();
            //     // return response.json();
            // } else if (response.status === 400) {
            //     console.log("Learning Journey already exists.")
            //     warning();
            // } else if (response.status === 500) {
            //     console.log("An error occurred creating the learning journey.")
            //     error();
            // }

        });
            
        // .then((data) => {
        //     console.log(data);
        //     if (data.code === 201) {
        //         lj_id = data.data.lj_id;
        //         console.log(lj_id);

    }


    // const submitForm = () => {

    //     var lj_id = null;

    //     // insert into learning journey table
    //     fetch("http://localhost:5000/createLearningjourney",
    //         {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify( learning_journey )
    //     })
        // .then((response) => {
        //     if (response.status === 201) {
        //         success();
        //         return response.json();
        //     } else if (response.status === 400) {
        //         console.log("Learning Journey already exists.")
        //         warning();
        //     } else if (response.status === 500) {
        //         console.log("An error occurred creating the learning journey.")
        //         error();
        //     }
        // })
        // .then((data) => {
        //     console.log(data);
        //     if (data.code === 201) {
        //         lj_id = data.data.lj_id;
        //         console.log(lj_id);

            //     // insert into position skill table
            //     for (var skill of props.form.Skills) {
            //         const Position_Skill = {
            //             "Position_ID": positionId,
            //             "Skill_ID": skill.split("_")[0],
            //         }
        
            //         fetch("http://localhost:5000/createPositionSkill",
            //             {
            //                 headers: {
            //                 'Content-Type': 'application/json'
            //                 },
            //                 method: "POST",
            //                 body: JSON.stringify( Position_Skill )
            //             })
            //             .then((response) => {
            //             if (response.status === 201) {
            //                 return response.json();
            //             } else if (response.status === 500) {
            //                 console.log("An error occurred adding the position.")
            //             }
            //             })
            //             .then((data) => console.log(data))
            //             .then((error) => console.log(error));
            //     }
                
    //         }
    //     })
    //     .then((error) => console.log(error));


    // }

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