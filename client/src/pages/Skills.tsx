import { Row, Col, Button, Pagination, Input} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import SkillCard from "../components/SkillCard";
import { Skill } from "../types/Skill";
import styles from "../styles/RenderHRCard.module.css";

export default function Skills() {

  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchedCourses, setSearchedCourses] = useState<Skill[]>([]);
  const [search, setSearch] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/skills/active")
      .then((resp) => setSkills(resp.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
     <Row>
        <Col>
          <h1>Available Skills</h1>
        </Col>
        <Col style={{paddingTop: '0.2vh'}} offset={1}>
          <Input placeholder="Enter search" className={styles.search}/>
        </Col>
      </Row>
      <div style={{  width: '50vw', margin: 'auto', marginTop: '10vh' }}>
        <Row style={{ marginBottom: '5vh' }}>
          <b>
            {skills.length} Skills Displayed
          </b>
        </Row>
      </div>
      <Row gutter={[16, 24]}>
        {skills &&
          skills.map((skill) => (
            <Col span={8}>
              <SkillCard skill={skill} lj={true}/>
            </Col>
          ))}
        </Row>
    </>
  );
}
