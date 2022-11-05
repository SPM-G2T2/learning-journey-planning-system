import { Row, Input, Col } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import SkillCard from "../components/SkillCard";
import { Skill } from "../types/Skill";
import styles from "../styles/RenderHRCard.module.css";

export default function Skills() {
  const [step] = useState<number>(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchedSkills, setSearchedSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/skills/active")
      .then((resp) => setSkills(resp.data.data))
      .catch((err) => console.log(err));
  }, []);

    function handleChange(event: any) {
      console.log(event.target.value);
      console.log(event.target.value.length);
      var tempSearchedRoles = [];
      for (let skill of skills) {
          if (skill.skill_name.toLowerCase().includes(event.target.value.toLowerCase())) {
            tempSearchedRoles.push(skill);
          }
      }
      setSearchedSkills(tempSearchedRoles);
      console.log(searchedSkills);
      setSearch(true);
      if (event.target.value.length === 0) {
          setSearch(false);
      } 
    }

    return (
    <>
      <Row>
        <Col>
          <h1>Available Skills</h1>
        </Col>
        <Col style={{paddingTop: '0.2vh'}} offset={1}>
          <Input placeholder="Enter search" className={styles.search} onChange={handleChange}/>
        </Col>
      </Row>
      <div style={{  width: '50vw', margin: 'auto', marginTop: '10vh' }}>
        <Row style={{ marginBottom: '5vh' }}>
          <b>
            {search ? searchedSkills.length : skills.length} Roles Displayed
          </b>
        </Row>
      <Row gutter={[0, 30]}>
      { search ? searchedSkills && searchedSkills.map((searchedSkill) => (
        <SkillCard skill={searchedSkill} lj={false}/>
      )) : skills && skills.map((skill) => (
        <SkillCard skill={skill} lj={false}/>
      )) }
      </Row>
      </div>
    </>
  );
}