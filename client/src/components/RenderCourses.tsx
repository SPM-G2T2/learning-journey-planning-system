import { Row, Col, Input } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/RenderRoleCourseCard.module.css";
import RoleCourseCard from "../components/RoleCourseCard";
import { Course } from "../types/Course";


export default function RenderCourses(props: any) {

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
    .get("http://localhost:5000/courses/all")
    .then((resp) => setCourses(resp.data.data))
    .catch((err) => console.log(err));
  }, []);

  console.log(courses);

  return (
    <>
      <div className={styles.container}>
        <Row style={{ width: '100%', marginBottom: '5vh' }}>
          <Col span={8}>
            <Input placeholder="Enter search" className={styles.search}/>
          </Col>
        </Row>
      {courses.map((course) => (
        <RoleCourseCard course={course} edit={true}/>
      ))}
      </div>
    </>
  );
}