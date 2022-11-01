import { Row, Col, Input, Button } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/RenderRoleCourseCard.module.css";
import SkillCard from "../components/SkillCard";
import { Skill } from "../types/Skill";


export default function RenderSkills(props: any) {

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    axios
    .get("http://localhost:5000/skills/all")
    .then((resp) => setSkills(resp.data.data))
    .catch((err) => console.log(err));
  }, []);

  console.log(skills);

  return (
    <>
      <div className={styles.container}>
        <Row style={{ width: '100%', marginBottom: '5vh' }}>
          <Col span={8}>
            <Input placeholder="Enter search" className={styles.search}/>
          </Col>
          <Col span={4} offset={12}>
            <Button type="primary" onClick={() => props.setSkillsStep("form")}>Create skill</Button>
          </Col>
        </Row>
      {skills && skills.map((skill) => (
        <SkillCard skill={skill} lj={false}/>
      ))}
      </div>
    </>
  );
}