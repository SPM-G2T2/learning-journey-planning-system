import { Row, Col, Input, Button } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/RenderRoleCourseCard.module.css";
import RoleCourseCard from "../components/RoleCourseCard";
import { Role } from "../types/Role";


export default function RenderRoles(props: any) {

  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    axios
    .get("http://localhost:5000/positions/all")
    .then((resp) => setRoles(resp.data.data))
    .catch((err) => console.log(err));
  }, []);

  console.log(roles);

  return (
    <>
      <div className={styles.container}>
        <Row style={{ width: '100%', marginBottom: '5vh' }}>
          <Col span={8}>
            <Input placeholder="Enter search" className={styles.search}/>
          </Col>
          <Col span={4} offset={12}>
            <Button type="primary" onClick={() => props.setRolesStep("form")}>Create role</Button>
          </Col>
        </Row>
      {roles && roles.map((role) => (
        <RoleCourseCard role={role} edit={true}/>
      ))}
      </div>
    </>
  );
}