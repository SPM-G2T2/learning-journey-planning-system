import "antd/dist/antd.css"
import { Typography, Form, Button, Row, Col, Modal } from 'antd';

export default function PreviewLearningJourney(props:any){
    const { Title } = Typography;
    const { Paragraph } = Typography;

    const learning_journey = {
        "lj_id": props.form.Learning_journey_id,
        "staff_id": props.form.staff_id,
        "skill_id": props.form.skill_id,
        "position_id": props.form.position_id,
        "course_id": props.form.course_id,

    }
    console.log(learning_journey)



    const submitForm = () => {

        var lj_id = null;

        // insert into learning journey table
        fetch("http://localhost:5000/createLearningjourney",
            {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify( learning_journey )
        })
        .then((response) => {
            if (response.status === 201) {
                success();
                return response.json();
            } else if (response.status === 400) {
                console.log("Learning Journey already exists.")
                warning();
            } else if (response.status === 500) {
                console.log("An error occurred creating the learning journey.")
                error();
            }
        })
        .then((data) => {
            console.log(data);
            if (data.code === 201) {
                lj_id = data.data.lj_id;
                console.log(lj_id);

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
                
            }
        })
        .then((error) => console.log(error));


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






}