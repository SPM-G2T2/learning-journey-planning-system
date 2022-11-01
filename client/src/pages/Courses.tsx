import { Row, Input, Col } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import RoleCourseCard from "../components/RoleCourseCard";
import { Course } from "../types/Course";
import styles from "../styles/RenderRoleCourseCard.module.css";

export default function Roles() {

    const [courses, setCourses] = useState<Course[]>([]);
  
    useEffect(() => {
      axios
      .get("http://localhost:5000/courses/all_active")
      .then((resp) => setCourses(resp.data.data))
      .catch((err) => console.log(err));
    }, []);

  return (
    <>
      <Row>
        <Col>
          <h1>Available Courses</h1>
        </Col>
        <Col style={{paddingTop: '0.2vh'}} offset={1}>
          <Input placeholder="Enter search" className={styles.search}/>
        </Col>
      </Row>
      <div style={{  width: '50vw', margin: 'auto', marginTop: '10vh' }}>
        <Row style={{ marginBottom: '5vh' }}>
          <b>
            {courses.length} Courses Displayed
          </b>
        </Row>
      {courses && courses.map((course) => (
        <RoleCourseCard course={course}/>
      ))}
      </div>
    </>
  );
}