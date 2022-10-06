// import { useState } from 'react';
import { Typography, Form, Button, Row, Col, Modal } from 'antd';
import "antd/dist/antd.css";
import '../styles/App.css';

export default function PreviewRoles(props:any){
    
    const { Title } = Typography;
    const { Paragraph } = Typography;
    // const [active, setActive] = useState("Retired");
    // const [positionId, setPositionId] = useState(null);

    console.log(props.form);

    var responsibilities = "";
    for (var resp of props.form.Responsibilities) {
      console.log(resp);
      responsibilities += resp + ",";
    }
    console.log(responsibilities.substring(0, responsibilities.length - 1));

    var active = "Retired";
    if (props.form.Active) {
        active = "Active";
    }

    console.log(active);

    console.log(props.form.Skills);
    console.log(props.form.Skills[0].split("_")[0]);

    const position = {
        "Skill_ID": props.form.Skills[0].split("_")[0],
        "Position_name": props.form.Title,
        "Position_desc": props.form.Description,
        "Position_dept": props.form.Department,
        "Position_rept": responsibilities.substring(0, responsibilities.length-1),
        "Position_status": active
    }
    console.log(position)


    const submitForm = () => {

        var positionId = null;

        // if position only has one skill
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
                success();
                return response.json();
            } else if (response.status === 400) {
                console.log("Position Name already exists.")
                warning();
            } else if (response.status === 500) {
                console.log("An error occurred creating the position.")
                error();
            }
        })
        .then((data) => {
            console.log(data);
            // positionId = data.data.Position_ID;
            // console.log(positionId);
        })
        .then((error) => console.log(error));


        // if position has more than one skill
        // if (props.form.Skills.length > 1 ) {
        //     for (var skill of props.form.Skills.slice(1)) {
        //         const samePosition = {
        //             "Position_ID": positionId,
        //             "Skill_ID": skill.split("_")[0],
        //             "Position_name": props.form.Title,
        //             "Position_desc": props.form.Description,
        //             "Position_dept": props.form.Department,
        //             "Position_rept": responsibilities.substring(0, responsibilities.length-1),
        //             "Position_status": active
        //         }
    
        //         fetch("http://localhost:5000/createPosition",
        //             {
        //                 headers: {
        //                 'Content-Type': 'application/json'
        //                 },
        //                 method: "POST",
        //                 body: JSON.stringify( samePosition )
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
        // }
       
    }

    const success = () => {
        Modal.success({
          content: 'Role has been successfully created!',
        });
        goToForm();
    };

    const warning = () => {
        Modal.warning({
          content: 'Role name already exists. Please try another name.',
        });
    };

    const error = () => {
        Modal.error({
          content: 'An error occurred creating the role! Please try again later.',
        });
    };

    const goToForm = () => {
        props.setNext("form");
    }

    return <>
        <Title level={4}>Review role</Title>
        <div style={{ marginLeft: 10 }}>
            <Row style={{ marginTop: "5%" }}>
                <Col span={5}>
                    <Title level={5}>Title </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { props.form.Title }</Paragraph>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Description </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { props.form.Description } </Paragraph>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Department </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { props.form.Department } </Paragraph>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Responsibilities </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { props.form.Responsibilities[0] } </Paragraph>
                </Col>
            </Row>
            { props.form.Responsibilities.length > 1 ? props.form.Responsibilities.slice(1).map((eachRes: (any)) => (
                <Row style={{ marginBottom: "2%" }}>
                    <Col span={5}>
                    </Col>
                    <Col span={19}>
                        <Paragraph> { eachRes } </Paragraph>
                    </Col>
                </Row> 
            )) : null }
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Skills </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { props.form.Skills[0].split("_")[1] } </Paragraph>
                </Col>
            </Row>
            { props.form.Skills.length > 1 ? props.form.Skills.slice(1).map((eachSkill: (any)) => (
                <Row style={{ marginBottom: "2%" }}>
                    <Col span={5}>
                    </Col>
                    <Col span={19}>
                        <Paragraph> { eachSkill.split("_")[1] } </Paragraph>
                    </Col>
                </Row> 
            )) : null }
        </div>
        <Row style={{ justifyContent: "flex-end" }}>
            <Col style={{ marginRight: 20 }}>
                <Form.Item>
                    <Button onClick={goToForm}>Back</Button>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item>
                    <Button type="primary" onClick={submitForm}>Confirm</Button>
                </Form.Item>
            </Col>
        </Row>
    </>
}