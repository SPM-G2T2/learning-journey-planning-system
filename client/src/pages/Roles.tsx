import { Row, Input, Col } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import RoleCourseCard from "../components/RoleCourseCard";
import { Role } from "../types/Role";
import styles from "../styles/RenderRoleCourseCard.module.css";

export default function Roles() {

    const [roles, setRoles] = useState<Role[]>([]);
  
    useEffect(() => {
      axios
      .get("http://localhost:5000/positions/active")
      .then((resp) => setRoles(resp.data.data))
      .catch((err) => console.log(err));
    }, []);

  return (
    <>
      <Row>
        <Col>
          <h1>Available Roles</h1>
        </Col>
        <Col style={{paddingTop: '0.2vh'}} offset={1}>
          <Input placeholder="Enter search" className={styles.search}/>
        </Col>
      </Row>
      <div style={{  width: '50vw', margin: 'auto', marginTop: '10vh' }}>
        <Row style={{ marginBottom: '5vh' }}>
          <b>
            {roles.length} Roles Displayed
          </b>
        </Row>
      {roles && roles.map((role) => (
        <RoleCourseCard role={role} purpose="view"/>
      ))}
      </div>
    </>
  );
}