import { Typography, Form, Button, Row, Col } from 'antd';
import "antd/dist/antd.css";
import '../styles/App.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PreviewRoles(){
    
    const { Title } = Typography;
    const { Paragraph } = Typography;

    const navigate = useNavigate();
    const location = useLocation()
    console.log(location.state);

    const title = location.state.title
    const desc = location.state.desc
    const department = location.state.dept
    const res = location.state.resp
    const skills = location.state.skills
    console.log(title, desc, department)

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
    // }

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
        <Title level={3}>Review role</Title>
        <div style={{ marginLeft: "15%", marginRight: "15%" }}>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Title </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { title } </Paragraph>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Description </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { desc } </Paragraph>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Department </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { department } </Paragraph>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col span={5}>
                    <Title level={5}>Responsibilities </Title>
                </Col>
                <Col span={19}>
                    <Paragraph> { res[0] } </Paragraph>
                </Col>
            </Row>
            { res.length > 1 ? res.slice(1,).map((eachRes: (any)) => (
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
                    <Paragraph>Operating stuffs </Paragraph>
                </Col>
            </Row>
        </div>
        <Row style={{ justifyContent: "flex-end" }}>
            <Col style={{ marginRight: 20 }}>
                <Form.Item>
                    <Button onClick={() => navigate(-1)}>Back</Button>
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