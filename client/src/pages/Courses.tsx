import { useState, useEffect } from "react";
import { Steps, Row, Col, Button, Form } from "antd";
import RoleCourseCard from "../components/RoleCourseCard";
import styles from "../styles/ChooseCourse.module.css";
import { Skill } from "../types/Skill";
import { Course } from "../types/Course";

export default function Courses({ lj }: { lj?: boolean }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [skillName, setSkillName] = useState<String[]>([]);

  // To change based on props from prev step
  const skillIds = [1, 2];

  useEffect(() => {
    for (let skillId of skillIds) {
      console.log(skillId);

      fetch("http://127.0.0.1:5000/skills/" + skillId)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setSkills((oldSkills) => [...oldSkills, data.data]);
          setSkillName((oldSkillName) => [
            ...oldSkillName,
            data.data.skill_name,
          ]);
          console.log(skills);
          console.log(skillName);
        })
        .then((error) => console.log(error));
    }
    getCourseBySkill(skillIds[0]);
  }, []);

  // function checkSkills(){
  //   console.log("hi")
  //   console.log(skills);
  //   for (let skill of skills){
  //     console.log(skill)
  //   }
  // }

  const getCourseBySkill = (skillId: number) => {
    console.log(skillId);

    fetch("http://127.0.0.1:5000/skills/" + skillId + "/courses/active")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCourses(data.data);
      })
      .then((error) => console.log(error));
  };

  return (
    <>
      <h1 style={{ fontWeight: 700 }}>Create Your Desired Learning Journey</h1>
      {/* <Button onClick={checkSkills}>test</Button> */}
      {/* {skills.map(skill => (<div>{skill.Skill_ID}</div>))} */}
      {/* {skills.map((skill) => (
         <Button key={skill.Skill_ID}>{ skill.Skill_Name }</Button>
      ))} */}

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

        <p className={styles.selectionLabel}>
          Role Selected:{" "}
          <span className={styles.selectionContent}>Full-stack Developer</span>
        </p>
        <p className={styles.selectionLabel}>
          Skills Selected:{" "}
          <span className={styles.selectionContent}>
            {skillName.join(" , ")}
          </span>
        </p>
        <p className={styles.selectionLabel}>
          Courses Selected: <span className={styles.selectionContent}></span>
        </p>

        <Row>
          <Col span={5}>
            {skills.map((skill) => (
              <Button
                className={styles.selectedButton}
                key={skill.skill_id}
                onClick={() => getCourseBySkill(skill.skill_id)}
              >
                {skill.skill_name}
              </Button>
            ))}
          </Col>
          <Col span={19}>
            {courses.map((course) => (
              <RoleCourseCard
                course={course}
                key={course.course_id}
                handleClick={() => console.log("hi")}
              />
            ))}
          </Col>
        </Row>

        <Row style={{ marginTop: "3vh", justifyContent: "flex-end" }}>
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
