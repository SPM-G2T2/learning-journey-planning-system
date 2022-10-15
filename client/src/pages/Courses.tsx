import { useState, useEffect } from "react";
import { Steps, Row, Col, Button, Form } from 'antd';
import RoleCourseCard from '../components/RoleCourseCard';


  type Skill = {
    Skill_Name: string
    Skill_ID: number
    Skill_Desc: string
    Skill_Status: string
  }

export default function Courses({ lj }: { lj?: boolean }) {

  const [skills, setSkills] = useState<Skill[]>([]);
  const skillIds = [1, 2];

  useEffect(() => {

    // To change based on props from prev step
    // const skillsArr:Skill[] = [];

    let i = 0

    for (let skillId of skillIds) {
      
      if (skills.length >= skillIds.length){
        break
      }

      console.log(skillId);
      
      fetch('http://127.0.0.1:5000/getSkillById/' + skillId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setSkills(oldSkills => [...oldSkills, data.data])
        console.log(skills)
        // skillsArr.push(data.data);
      })
      .then((error) => console.log(error));

    }

    // setSkills(skillsArr)

  }, [])

  function checkSkills(){
    console.log("hi")
    console.log(skills);
    for (let skill of skills){
      console.log(skill)
    }
  }

  // const arrs = ["bob", "billy"]


  return (
    <>
      <h1 style={{ fontWeight: 700 }}>Create Your Desired Learning Journey</h1>
      {/* {skills && <Button>{skills[0]["Skill_Name"]}</Button>} */}
      <Button onClick={checkSkills}>test</Button>
      {/* {skills.map(skill => (<div>{skill.Skill_ID}</div>))} */}
      {skills.map((skill) => (
         <Button key={skill.Skill_ID}>{ skill.Skill_Name }</Button>
      ))}

      <div
        style={{
          width: "70vw",
          margin: "auto",
          marginTop: "3vh",
        }}
      >
        <Steps labelPlacement="vertical" current={2}>
          <Steps.Step title="Choose a role" />
          <Steps.Step title="Choose skills" />
          <Steps.Step title="Choose courses" />
        </Steps>
        <div style={{ display: "flex", justifyContent: "center", margin:"2vh 0 0vh 0", color:"#3649F9" }}>
          <p style={{ fontWeight: 700, marginRight: "1vh" }}>Role Selected:</p><p>Full-stack Developer</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin:"0vh 0 0vh 0", color:"#3649F9" }}>
          <p style={{ fontWeight: 700, marginRight: "1vh" }}>Skills Selected:</p><p>Web Architecture, Database Management</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin:"0vh 0 2vh 0", color:"#3649F9" }}>
          <p style={{ fontWeight: 700, marginRight: "1vh" }}>Courses Selected:</p><p></p>
        </div>

        <Row>
          <Col span={5}>
            <Button style={{ marginBottom: '2vh' }}>Web Architecture</Button>
            <Button>Database Management</Button>
            {/* { skills.map((skill: any, i: number) => 
              <Button key={i}>{ skill['skill_name'] }</Button>
            )} */}
          </Col>
          <Col span={19}>
            <RoleCourseCard/>
            <RoleCourseCard/>
            <RoleCourseCard/>
          </Col>
        </Row>

        <Row style={{  marginTop: "3vh", justifyContent: "flex-end" }}>
            <Col style={{ marginRight: 20 }}>
                <Form.Item>
                    <Button>Back</Button>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item>
                    <Button type="primary">Next</Button>
                </Form.Item>
            </Col>
        </Row>

      </div>
    </>
  );
}
