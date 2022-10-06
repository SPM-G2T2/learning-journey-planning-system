import { Typography, Form, Button, Row, Col } from 'antd';
import "antd/dist/antd.css";
import '../styles/App.css';

export default function PreviewSkills(props:any){
    
    const { Title } = Typography;
    const { Paragraph } = Typography;

    console.log(props.form);

    // var responsibilties = "";
    // for (var resp of values["Responsibilities"]) {
    //   console.log(resp);
    //   responsibilties += resp["resp"] + ",";
    // }
    // console.log(responsibilties.substring(0, responsibilties.length - 1));

    // const Active = "Retired";
    // if (values["Active"]) {
    //   const Active = "Active";
    // }
    // console.log(values["Skills"][0]["skill"]);

    // const position = {
    //     "Skill_ID": values['Skills'][0]['skill'],
    //     "Position_name": Title,
    //     "Position_desc": Description,
    //     "Position_dept": Department,
    //     "Position_rept": responsibilties.substring(0, responsibilties.length-1),
    //     "Position_status": Active
    //     }

    //     fetch("http://localhost:5000/createPosition",
    //         {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify( position )
    //     })
    //     .then((response) => {
    //         if (response.status === 201) {
    //         return response.json();
    //         } else if (response.status === 400) {
    //         console.log("Position Name already exists.")
    //         }
    //     })
    //     .then((data) => console.log(data))
    //     .then((error) => console.log(error));
    // // }

    // for (var skill of values['Skills']) {
    //   const position = {
    //     "Skill_ID": skill['skill'],
    //     "Position_name": Title,
    //     "Position_desc": Description,
    //     "Position_dept": Department,
    //     "Position_rept": responsibilties.substring(0, responsibilties.length-1),
    //     "Position_status": Active
    //   }

    //   fetch("http://localhost:5000/createPosition",
    //       {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify( position )
    //     })
    //     .then((response) => {
    //       if (response.status === 201) {
    //         return response.json();
    //       } else if (response.status === 400) {
    //         console.log("Position Name already exists.")
    //       }
    //     })
    //     .then((data) => console.log(data))
    //     .then((error) => console.log(error));
    // }

    return <>
        <Title level={4}>Review Skill</Title>
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
                    <Title level={5}>Courses </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { props.form.Courses[0] } </Paragraph>
                </Col>
            </Row>
            { props.form.Courses.length > 1 ? props.form.Courses.slice(1).map((eachCourse: (any)) => (
                <Row style={{ marginBottom: "2%" }}>
                    <Col span={5}>
                    </Col>
                    <Col span={19}>
                        <Paragraph> { eachCourse } </Paragraph>
                    </Col>
                </Row> 
            )) : null }
        </div>
        <Row style={{ justifyContent: "flex-end" }}>
            <Col style={{ marginRight: 20 }}>
                <Form.Item>
                    <Button>Back</Button>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item>
                    <Button type="primary">Confirm</Button>
                </Form.Item>
            </Col>
        </Row>
    </>
}