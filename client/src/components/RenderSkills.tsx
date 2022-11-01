import { Row, Col, Input, Button } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/RenderHRCard.module.css";
import SkillCard from "../components/SkillCard";
import { Skill } from "../types/Skill";


export default function RenderSkills(props: any) {

  const [skills, setSkills] = useState<Skill[][]>([]);

  useEffect(() => {
    axios
    .get("http://localhost:5000/skills/all")
    .then((resp) => {
        const rows = [];
        let row = [];
        for (let col of resp.data.data) {
            if (row.length === 3) {
                rows.push(row);
                row = [];
            }
            row.push(col);
        }
        if (row.length > 0) {
            rows.push(row);
        }
        setSkills(rows) 
    })
    .catch((err) => console.log(err));
  }, []);

  console.log(skills);

  return (
    <>
        {/* <div className={styles.container}> */}
            <Row style={{ width: '100%', margin: '5vh auto 5vh auto' }}>
            <Col span={12}>
                <Input placeholder="Enter search" className={styles.search}/>
            </Col>
            <Col span={1} offset={11}>
                <Button type="primary" onClick={() => props.setSkillsStep("form")}>Create skill</Button>
            </Col>
            </Row>
        {/* </div> */}
        <div className={styles.content}>
            {skills && skills.map((row) => (
            <Row className={styles.skill}>
                {row.map((skill) => (
                <Col key={skill.skill_id}>
                    <SkillCard skill={skill} lj={false}/>
                </Col>
                ))}
            </Row>
            ))}
        </div>
    </>
  );
}