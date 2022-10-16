import { Typography, Form, Button, Row, Col, Modal } from 'antd';
import styles from "../styles/ManageLJPS.module.css";

export default function PreviewRoles(props:any){
    
    const { Title } = Typography;
    const { Paragraph } = Typography;

    console.log(props.form);

    var responsibilities = "";
    for (var resp of props.form.Responsibilities) {
      console.log(resp);
      responsibilities += resp + ";";
    }
    console.log(responsibilities.substring(0, responsibilities.length - 1));

    var active = "Retired";
    if (props.form.Active) {
        active = "Active";
    }

    console.log(active);

    const skillsArr = props.form.Skills;
    console.log(props.form.Skills);
    console.log(props.form.Skills[0].split("_")[0]);

    function containsDuplicates(skillsArr: number[] ) {
      if (skillsArr.length !== new Set(skillsArr).size) {
        return true;
      }
    
      return false;
    }

    const position = {
        "position_name": props.form.Title,
        "position_desc": props.form.Description,
        "position_dept": props.form.Department,
        "position_res": responsibilities.substring(0, responsibilities.length-1),
        "position_status": active
    }
    console.log(position)


    const submitForm = () => {

        if (containsDuplicates(skillsArr)) {
          warningForDuplicateSkill();
        } else {
          var positionId = null;

          // insert into position table
          fetch("http://localhost:5000/create_position",
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
                  warningForRoleName();
              } else if (response.status === 500) {
                  console.log("An error occurred creating the position.")
                  error();
              }
          })
          .then((data) => {
              console.log(data);
              if (data.code === 201) {
                  positionId = data.data.position_id;
                  console.log(positionId);
  
                  // insert into position skill table
                  for (var skill of props.form.Skills) {
                      const Position_Skill = {
                          "position_id": positionId,
                          "skill_id": skill.split("_")[0],
                      }
          
                      fetch("http://localhost:5000/create_position_skill",
                          {
                              headers: {
                              'Content-Type': 'application/json'
                              },
                              method: "POST",
                              body: JSON.stringify( Position_Skill )
                          })
                          .then((response) => {
                          if (response.status === 201) {
                              return response.json();
                          } else if (response.status === 500) {
                              console.log("An error occurred adding the position.")
                          }
                          })
                          .then((data) => console.log(data))
                          .then((error) => console.log(error));
                  }
                  
              }
          })
          .then((error) => console.log(error));
  
        }
       
    }

    const success = () => {
        Modal.success({
          content: 'Role has been successfully created!',
        });
        goToForm();
    };

    const warningForRoleName = () => {
        Modal.warning({
          content: 'Role name already exists. Please try another name.',
        });
    };

    const warningForDuplicateSkill = () => {
      Modal.warning({
        content: 'There is duplicate skill. Please select another skill or remove duplicated skill.',
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

    return (
      <>
        <Title
          className={`${styles.tabTitleColor} ${styles.tabTitleSpacing}`}
          level={4}
        >
          Review role
        </Title>
        <div style={{ marginLeft: 10 }}>
          <Row style={{ marginTop: "5%" }}>
            <Col span={5}>
              <Title level={5}>Title </Title>
            </Col>
            <Col span={19}>
              <Paragraph> {props.form.Title}</Paragraph>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2%" }}>
            <Col span={5}>
              <Title level={5}>Description </Title>
            </Col>
            <Col span={19}>
              <Paragraph> {props.form.Description} </Paragraph>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2%" }}>
            <Col span={5}>
              <Title level={5}>Department </Title>
            </Col>
            <Col span={19}>
              <Paragraph> {props.form.Department} </Paragraph>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2%" }}>
            <Col span={5}>
              <Title level={5}>Responsibilities </Title>
            </Col>
            <Col span={19}>
              <Paragraph> {props.form.Responsibilities[0]} </Paragraph>
            </Col>
          </Row>
          {props.form.Responsibilities.length > 1
            ? props.form.Responsibilities.slice(1).map((eachRes: any) => (
                <Row style={{ marginBottom: "2%" }}>
                  <Col span={5}></Col>
                  <Col span={19}>
                    <Paragraph> {eachRes} </Paragraph>
                  </Col>
                </Row>
              ))
            : null}
          <Row style={{ marginBottom: "2%" }}>
            <Col span={5}>
              <Title level={5}>Skills </Title>
            </Col>
            <Col span={19}>
              <Paragraph> {props.form.Skills[0].split("_")[1]} </Paragraph>
            </Col>
          </Row>
          {props.form.Skills.length > 1
            ? props.form.Skills.slice(1).map((eachSkill: any) => (
                <Row style={{ marginBottom: "2%" }}>
                  <Col span={5}></Col>
                  <Col span={19}>
                    <Paragraph> {eachSkill.split("_")[1]} </Paragraph>
                  </Col>
                </Row>
              ))
            : null}
        </div>
        <Row style={{ justifyContent: "flex-end" }}>
          <Col style={{ marginRight: 20 }}>
            <Form.Item>
              <Button onClick={goToForm}>Back</Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" onClick={submitForm}>
                Confirm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
}
